<template>
  <div class="grid border-gray-300" :style="gridTemplate">
    <div v-for="day in daysInMonth" :key="day.date" class="text-center border-gray-300">
      <span
        v-if="isInRange(task, day.date)"
        class="px-2 py-1 text-xs text-white w-full inline-block"
        :class="[task.status, 
                day.date === task.startDate ? 'rounded-l' : '',
                day.date === task.endDate ? 'rounded-r' : '']"
      >
        <span v-if="day.date === task.startDate">
          {{ task.name }}
        </span>
        <span v-else>
          <Icon name="lucide:circle-chevron-left" />
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
</script>