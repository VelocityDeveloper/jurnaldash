<template>
  <div class="grid border-gray-300 bg-gray-100 sticky top-0 z-10" :style="gridTemplate">
    <div v-for="day in daysInMonth" :key="day.date" class="p-2 text-center border-gray-300">
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