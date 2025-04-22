<template>
  <div>

    <div class="flex justify-end md:justify-between gap-2 mb-2">
      <Button size="small" @click="openDialog(null, 'add')" severity="info">
        <Icon name="lucide:plus" /> Tambah
      </Button>
      <form class="flex justify-end gap-2">
        <DatePicker 
          locale="id-ID" 
          v-model="formSearch.monthYear" 
          view="month" 
          dateFormat="mm/yy" 
          size="small" 
        />
        <Select 
          v-model="formSearch.user" 
          :options="optionUsers" 
          optionLabel="label" 
          optionValue="value" 
          placeholder="Pilih Pengguna" 
        />
      </form>
    </div>
    
    <div class="mt-4 mb-3 overflow-x-auto"> 
      <div class="flex flex-row gap-2">    
        <div @click="selectCategory('')" class="cursor-pointer relative border rounded p-3 text-nowrap min-w-[8em] bg-teal-100 dark:bg-teal-900 dark:border-zinc-600">
          <div class="text-sm opacity-50">Semua</div>
          <div class="text-lg font-bold">{{ summarySum }}</div>
        </div>
        <div v-for="item in summaryArray" :key="item.category" @click="selectCategory(item.category)" class="cursor-pointer relative border dark:border-zinc-600 rounded p-3 text-nowrap min-w-[8em]" :class="[item.category === 'Project' ? 'bg-sky-100 dark:bg-sky-900' : item.category === 'Pengembangan' ? 'bg-amber-100 dark:bg-amber-900' : 'bg-zinc-100 dark:bg-zinc-900']">
          <div class="text-sm opacity-50">{{ item.category }}</div>
          <div class="text-lg font-bold">{{ item.count }}</div>
          <span v-if="item.category === selectedCategory" class="w-3 h-3 rounded-full bg-sky-400 dark:bg-sky-800 absolute top-1 right-1"></span>
        </div>
      </div> 
    </div>

    <div class="border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
      <div class="overflow-auto max-h-[70vh]">
        <div class="min-w-max list-task">
          <CalendarHeader :daysInMonth="theDays" :gridTemplate="gridTemplate" />
          <div v-if="status === 'pending'">
            <Skeleton v-for="i in 15" :key="i" width="100%" height="2rem" class="mb-2 mx-1" />
          </div>
          <div v-else>

            <TaskRow 
              v-for="task in tasks" 
              :key="task.id" 
              :task="task" 
              :daysInMonth="theDays" 
              :gridTemplate="gridTemplate" 
              :isInRange="isInRange" 
              :selectedCategory="selectedCategory"
              @goToDetail="openDialog(task, 'preview')" 
              @goToEdit="openDialog(task, 'add')" 
              class="odd:bg-slate-100 even:bg-white relative dark:odd:bg-zinc-800 dark:even:bg-zinc-900" 
            />

            <div v-if="tasks && !tasks.length" class="p-2 text-center">
              <div class="text-sm opacity-50">Tidak ada data</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
  
  <Dialog 
  v-model:visible="dialog" 
  :header="dialogTitle" 
  :modal="true"
  :style="{ width: '40rem', minHeight: '50vh' }"
  >
    <TaskFormAdd v-if="dialogAction === 'add'" :item="selectedItem" @add="onAdd" @update="onUpdate" @delete="onDelete" />
    <TaskPreview v-else :item="selectedItem" />
  </Dialog>
</template>

<script setup lang="ts">
definePageMeta({
    title: "Tasks",
});
const client = useSanctumClient();
const route = useRoute();
const router = useRouter();

interface User {
  id: number;
  name: string;
  email: string;
}
const user = useSanctumUser() as Ref<User | null>;

const formSearch = ref({
  monthYear: new Date(),
  user: user.value?.id || null,
});

const optionUsers = ref([]);
const dialog = ref(false);
const dialogAction = ref<'add' | 'preview'>('add');
const selectedItem = ref(null);

const dialogTitle = computed(() =>
  dialogAction.value === 'add' ? 'Task' : 'Preview Task'
);

onMounted(async () => {
  try {
    const response = await client('/api/options/users');
    optionUsers.value = response;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
  loadQuery();
});

function loadQuery() {
  if (route.query.user) {
    formSearch.value.user = Number(route.query.user);
  }
  if (route.query.monthYear && typeof route.query.monthYear === 'string') {
    const [month, year] = route.query.monthYear.split('-');
    formSearch.value.monthYear = new Date(Number(year), Number(month) - 1);
  }
}

interface Task {
  id: number;
  name: string;
  status: string;
  category: string;
}

const { data: tasks, status, refresh } = useAsyncData<Task[]>('tasks', fetchTasks);

async function fetchTasks() {
  const params = new URLSearchParams();
  if (formSearch.value.monthYear) {
    const month = formSearch.value.monthYear.getMonth() + 1;
    const year = formSearch.value.monthYear.getFullYear();
    params.append('date', `${year}-${month}-01 00:00:00`);
  }
  if (formSearch.value.user) {
    params.append('user_id', formSearch.value.user.toString());
  }
  return client(`/api/task?${params.toString()}`);
}

watch(
  () => formSearch.value,
  () => {
    const { monthYear, user } = formSearch.value;
    router.replace({
      path: '/tasks',
      query: {
        monthYear: `${monthYear.getMonth() + 1}-${monthYear.getFullYear()}`,
        user,
      },
    });
    refresh();
  },
  { deep: true }
);

function onAdd(response: any) {
  if (tasks.value) {
    tasks.value = [...tasks.value, response];
    dialog.value = false;
  }
}

function onUpdate(response: any) {
  if (tasks.value) {
    tasks.value = tasks.value.map(task =>
      task.id === response.id ? response : task
    );
  }
}

function onDelete(id: any) {
  if (tasks.value) {
    dialog.value = false;
    tasks.value = tasks.value.filter(task => task.id !== id);
  }
}

function openDialog(data: any, action: 'add' | 'preview') {
  dialog.value = true;
  selectedItem.value = data;
  dialogAction.value = action;
}

const { getDaysInMonth, isInRange } = useCalendar();
const gridTemplate = computed(() => `grid-template-columns: 250px repeat(${theDays.value.length}, minmax(30px, auto));`);

const theDays = ref([] as any);
onMounted(() => {
  theDays.value = getDaysInMonth(
    formSearch.value.monthYear.getFullYear(),
    formSearch.value.monthYear.getMonth()
  )
})

const selectedCategory = ref('');
const selectCategory = (category: string) => {
  selectedCategory.value = category;
}

// Reactive state untuk menyimpan rangkuman
const summary = ref<Record<string, number>>({});

// Fungsi untuk membuat rangkuman berdasarkan kategori
function summarizeByCategory(tasks: Task[] | null): Record<string, number> {
  if (!tasks) return {};

  return tasks.reduce((summary, task) => {
    const category = task.category || 'uncategorized'; // Handle jika category tidak ada
    summary[category] = (summary[category] || 0) + 1;
    return summary;
  }, {} as Record<string, number>);
}

// Watch untuk memperbarui summary ketika tasks.value berubah
watch(
  () => tasks.value,
  (newTasks) => {
    if (newTasks) {
      summary.value = summarizeByCategory(newTasks);
      theDays.value = getDaysInMonth(
        formSearch.value.monthYear.getFullYear(),
        formSearch.value.monthYear.getMonth()
      )
      selectedCategory.value = '';
    }
  },
  { immediate: true } // Jalankan segera setelah komponen diinisialisasi
);

const summaryArray = computed(() => {
  return Object.entries(summary.value).map(([category, count]) => ({
    category,
    count,
  }));
});
const summarySum = computed(() => {
  return summaryArray.value.reduce((total, item) => total + item.count, 0);
});


</script>
