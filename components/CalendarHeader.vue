<template>
  <div class="grid border-gray-300 bg-gray-100 dark:bg-zinc-900 dark:border-zinc-800 sticky top-0 z-20" :style="gridTemplate">
    <div class="sticky start-0 top-0 z-20 p-2 text-start font-bold border-gray-300 bg-gray-100 dark:border-zinc-800 dark:bg-zinc-900">
      Task
    </div>
    <div v-for="day in daysInMonth" :key="day.date" class="p-2 text-center border-gray-300 dark:border-zinc-800">
      {{ day.index }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  daysInMonth: Array,
  gridTemplate: String,
});
</script>