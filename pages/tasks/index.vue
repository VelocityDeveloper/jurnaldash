<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Task</h1>

    <div class="border rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
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
</template>

<script setup>
definePageMeta({
    title: "Tasks",
});
const client = useSanctumClient();
const { data, status, error, refresh } = await useAsyncData(
    'task',
    () => client('/api/task')
)

const { daysInMonth, gridTemplate, isInRange } = useCalendar();

</script>