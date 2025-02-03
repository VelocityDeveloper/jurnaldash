<template>
  <div class="grid border-gray-100 border-b" :style="gridTemplate">
    
    <div class="sticky p-2 start-0 top-0 z-10 bg-white border-e border-gray-200 me-2">
      <span class="truncate block text-sm">
        {{ task.title }}
      </span>
    </div>

    <div v-for="day in daysInMonth" :key="day.date" class="flex items-center z-1">
      
      <span
        v-if="isInRange(task, day.date)"
        class="px-2 text-xs text-white w-full inline-block py-1 min-h-5 cursor-pointer"
        :class="[
          setColor(task.status),
          formatDatenoClock(task.start)==day.date ? 'rounded-s-lg' : '',
          formatDatenoClock(task.end)==day.date ? 'rounded-e-lg' : '',
        ]"
      >
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

//set color
const setColor = (status) => {
  if (status == 'completed') {
    return 'bg-green-500'
  } else if (status == 'cancelled') {
    return 'bg-red-500'
  } else if (status == 'archived') {
    return 'bg-amber-500'
  } else {
    return 'bg-gray-500'
  }
}

//tanggal tanpa jam
const formatDatenoClock = (date) => {
  const tanggal = new Date(date);
  const tanggalSaja = tanggal.toISOString().split('T')[0];
  return tanggalSaja; 
}

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