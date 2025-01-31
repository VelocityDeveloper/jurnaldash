<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Task</h1>

    <div class="border rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <div class="min-w-max">
          <CalendarHeader :daysInMonth="daysInMonth" :gridTemplate="gridTemplate" />
          <TaskRow
            v-for="task in tasks"
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
const { daysInMonth, gridTemplate, isInRange } = useCalendar();

const tasks = ref([
  { id: 1, name: "Landing Page", status: "bg-green-500", startDate: "2025-01-01", endDate: "2025-01-04" },
  { id: 2, name: "API Backend", status: "bg-yellow-500", startDate: "2025-01-04", endDate: "2025-01-04" },
  { id: 3, name: "Mobile App", status: "bg-blue-500", startDate: "2025-01-06", endDate: "2025-01-10" },
  { id: 4, name: "Testing", status: "bg-red-500", startDate: "2025-01-07", endDate: "2025-01-09" },
  { id: 5, name: "Deployment", status: "bg-gray-500", startDate: "2025-01-25", endDate: "2025-01-27" },
  { id: 6, name: "Maintenance", status: "bg-gray-500", startDate: "2025-01-05", endDate: "2025-01-07" },
  { id: 7, name: "Support", status: "bg-gray-500", startDate: "2025-01-08", endDate: "2025-01-10" },
  { id: 8, name: "Monitoring", status: "bg-gray-500", startDate: "2025-01-12", endDate: "2025-01-14" },
  { id: 9, name: "Security", status: "bg-gray-500", startDate: "2025-01-15", endDate: "2025-01-17" },
  { id: 10, name: "Analytics", status: "bg-gray-500", startDate: "2025-01-18", endDate: "2025-01-20" },
  { id: 11, name: "Data Analysis", status: "bg-gray-500", startDate: "2025-01-21", endDate: "2025-01-23" },
  { id: 12, name: "Data Visualization", status: "bg-gray-500", startDate: "2025-01-24", endDate: "2025-01-26" },
  { id: 13, name: "Data Cleaning", status: "bg-gray-500", startDate: "2025-01-27", endDate: "2025-01-29" },
  { id: 14, name: "Data Processing", status: "bg-gray-500", startDate: "2025-01-30", endDate: "2025-01-31" },
]);
</script>