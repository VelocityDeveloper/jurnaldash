<template>
  <div>

    <div class="flex justify-end md:justify-between gap-2 mb-2">

      <Button size="small" @click="openDialog(null,'add')" severity="info">
        <Icon name="lucide:plus" />  Tambah
      </Button>

      <form class="flex justify-end gap-2">
        <DatePicker locale="id-ID" v-model="formSearch.monthYear" view="month" dateFormat="mm/yy" size="small" />
        <Select v-model="formSearch.user" :options="optionUsers" optionLabel="label" optionValue="value" placeholder="Select User" />
      </form>

    </div>

    <div class="border rounded-lg overflow-hidden">
      <div class="overflow-auto max-h-[70vh]">
        <div class="min-w-max list-task">

          <CalendarHeader :daysInMonth="daysInMonth" :gridTemplate="gridTemplate" />
          
          <div v-if="status=='pending'">
            <Skeleton v-for="i in 15" :key="i" width="100%" height="2rem" class="mb-2 mx-1"></Skeleton>
          </div>

          <div v-else>

            <TaskRow
              v-if="data.length > 0"
              v-for="task in data"
              :key="task.id"
              :task="task"
              :daysInMonth="daysInMonth"
              :gridTemplate="gridTemplate"
              :isInRange="isInRange"
              @click="openDialog(task,'preview')"
              class="odd:bg-slate-100 even:bg-white relative"
            />

            <div v-else class="p-2 text-center">
              <div class="text-sm opacity-50">Tidak ada data</div>
            </div>
            
          </div>

        </div>
      </div>
    </div>
  </div>
  
  <Dialog v-model:visible="dialog" :header="selectedItem ? 'Preview Task' : 'Tambah Task'" :style="{ width: '30rem', minHeight: '50vh' }" :breakpoints="{ '1000px': '40rem', '768px': '90vw' }" :modal="true">
    <TaskFormAdd v-if="dialogAction == 'add'" />
    <TaskPreview v-else :item="selectedItem"/>
  </Dialog>

</template>

<script setup lang="ts">
definePageMeta({
    title: "Tasks",
});
const client = useSanctumClient();
const user = useSanctumUser() as any;

const formSearch = ref({
  monthYear:  new Date(),
  user: null
});

const optionUsers = ref([] as any);

onMounted( async () => {
  if(user.value){
    formSearch.value.user = user.value.id
  }
  try {
    const response = await client('/api/options/users');
    optionUsers.value = response;
  } catch (error) {
    console.error(error);
  }
})

const { data, status, error, refresh } = await useAsyncData(
    'tasks',
    fetchTasks
)


function fetchTasks() {
  const params = new URLSearchParams();

  if(formSearch.value.monthYear){
    const month = formSearch.value.monthYear.getMonth() + 1;
    const year = formSearch.value.monthYear.getFullYear();
    params.append('date',year.toString()+'-'+month.toString()+'-'+'01 00:00:00');
  }

  if(formSearch.value.user){
    params.append('user_id', formSearch.value.user);
  }
  return client(`/api/task?${params.toString()}`);
}

//watch perubahan formSearch
watch(formSearch.value, () => {
  refresh();
})

const selectedItem = ref();
const dialog = ref(false);
const dialogAction = ref('add');

const openDialog = (data: any, action: any) => {
    dialog.value = true;
    selectedItem.value = data;
    dialogAction.value = action;
}

const { daysInMonth, gridTemplate, isInRange } = useCalendar();
</script>