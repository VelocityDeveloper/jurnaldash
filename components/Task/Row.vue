<template>
  <div class="grid border-gray-100 dark:border-zinc-800 border-b" :style="gridTemplate">
    <div class="sticky p-2 start-0 top-0 z-10 bg-white border-e border-gray-200 me-2 dark:bg-zinc-900 dark:border-zinc-800">
      <div class="truncate text-sm flex items-center">
        <AvatarGroup>
            <Avatar shape="circle" class="me-1" size="small" v-tooltip="`Priority: ${task.priority}`"
              :style="task.priority === 'high' ? 'background-color: #fbbf24' : 
                      task.priority === 'medium' ? 'background-color: #fcd34d' : 
                      task.priority === 'low' ? 'background-color: #d1d5db' : ''">
              <Icon :name="task.priority === 'high' ? 'lucide:alert-triangle' : 
                            task.priority === 'medium' ? 'lucide:alert-circle' : 
                            task.priority === 'low' ? 'lucide:info' : ''" />
            </Avatar>
            <Avatar shape="circle" class="me-1" size="small" v-tooltip="`Status: ${task.status}`"
              :style="task.status === 'completed' ? 'background-color: #4ade80; color: #fff' : 
                      task.status === 'ongoing' ? 'background-color: #3b82f6; color: #fff' : 
                      task.status === 'cancelled' ? 'background-color: #f87171; color: #fff' : 
                      task.status === 'archived' ? 'background-color: #6b7280; color: #fff' : ''">
                <Icon :name="task.status === 'completed' ? 'lucide:check-circle' : 
                            task.status === 'ongoing' ? 'lucide:box' : 
                            task.status === 'cancelled' ? 'lucide:x-circle' : 
                            task.status === 'archived' ? 'lucide:archive' : ''" />
            </Avatar>
            <!-- jika Project badkground=#3b82f6 -->
            <Avatar shape="circle" class="me-1" :style="task.category === 'Project' ? 'background-color: #3b82f6; color: #fff' : ''" size="small" v-tooltip="`Category: ${task.category}`">
                {{ task.category.charAt(0) }} 
            </Avatar>
            <Avatar shape="circle" class="me-1 cursor-pointer" style="background-color: #333; color: #fff" size="small" @click="emits('goToEdit', task)" v-tooltip="'Edit Task'">
                <Icon name="lucide:pen" mode="svg"/>
            </Avatar>
        </AvatarGroup>
        <span @click="emits('goToDetail')" class="cursor-pointer">
          {{ task.title }}
        </span>
        
      </div>
    </div>

    <div v-for="day in daysInMonth" :key="day.date" class="flex items-center z-1">
      <span
        v-if="isInRange(task, day.date)"
        class="px-2 text-xs text-white w-full inline-block py-1 min-h-5 cursor-pointer"
        @click="emits('goToDetail')"
        :class="[
          task.category === 'Project' ? 'h-7' : 'h-2',
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
const emits = defineEmits(['goToDetail', 'goToEdit']);
//set color
const setColor = (status) => {
  if (status == 'completed') {
    return 'bg-green-500'
  } else if (status == 'cancelled') {
    return 'bg-red-500'
  } else if (status == 'archived') {
    return 'bg-gray-500'
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