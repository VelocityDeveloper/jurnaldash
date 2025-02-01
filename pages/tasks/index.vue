<template>
  <div>

    <div class="flex justify-end mb-2">
      <Button size="small" @click="openDialog(null,'add')">
        <Icon name="lucide:plus" />  Tambah
      </Button>
    </div>

    <div class="border rounded-lg overflow-hidden">
      <div class="overflow-auto max-h-[70vh]">
        <div class="min-w-max">
          <CalendarHeader :daysInMonth="daysInMonth" :gridTemplate="gridTemplate" />
          
          <TaskRow
            v-for="task in data"
            :key="task.id"
            :task="task"
            :daysInMonth="daysInMonth"
            :gridTemplate="gridTemplate"
            :isInRange="isInRange"
          />

        </div>
      </div>
    </div>
  </div>
  
  <Dialog v-model:visible="dialog" :header="selectedItem ? selectedItem.product_name : 'Tambah Task'" :style="{ width: '30rem', minHeight: '50vh' }" :breakpoints="{ '1000px': '40rem', '768px': '90vw' }" :modal="true">
    <TaskFormAdd v-if="dialogAction == 'add'" />
  </Dialog>

</template>

<script setup lang="ts">
definePageMeta({
    title: "Tasks",
});
const client = useSanctumClient();
const { data, status, error, refresh } = await useAsyncData(
    'task',
    () => client('/api/task')
)
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