<template>
  <div class="grid border-gray-300" :style="gridTemplate">
    <div v-for="day in daysInMonth" :key="day.date" class="text-center border-gray-300">
      <span
        v-if="isInRange(task, day.date)"
        class="px-2 text-xs text-white w-full inline-block py-1 min-h-4"
        :class="[
          task.status=='ongoing' ? 'bg-green-500' : 'bg-gray-500'
        ]"
      >
        <span v-if="isActive(task, day)" class="truncate">
          {{ task.title }}
        </span>
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  task: Object,
  daysInMonth: Array,
  gridTemplate: String,
  isInRange: Function,
});

// Format tanggal tanpa jam
const formatDateJam = (date) => {
  if (date instanceof Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } else if (typeof date === 'string') {
    return date.split("T")[0]; // Pastikan format yyyy-mm-dd
  }
  return '';
};

const isActive = (task, day) => {
  const taskStartDate = new Date(task.start);
  const currentDate = new Date(day.date);

  // Jika task dimulai di bulan sebelumnya, tampilkan di tanggal 1 bulan ini
  if (
    taskStartDate.getFullYear() < currentDate.getFullYear() || // Jika tahun sebelumnya
    (taskStartDate.getFullYear() === currentDate.getFullYear() &&
      taskStartDate.getMonth() < currentDate.getMonth()) // Jika bulan sebelumnya
  ) {
    if (currentDate.getDate() === 1) {
      return true;
    }
  }

  // Jika task dimulai di bulan yang sama, tampilkan di hari pertama task
  if (formatDateJam(taskStartDate) === formatDateJam(currentDate)) {
    return true;
  }

  return false;
};
</script>