<template>
  <div>
    
    <div v-for="field in fields" :key="field.key" class="flex flex-col md:flex-row gap-2 border-b py-2">
      <div class="md:basis-1/4 font-bold">{{ field.label }}</div>
      <div class="md:flex-1">

        <TaskStatus v-if="field.key=='status'" :value="item[field.key]" />

        <TaskCategory v-else-if="field.key=='category'" :value="item[field.key]" />

        <span v-else>
          {{ item[field.key] }}
        </span>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const props = defineProps(['item'])
const item = props.item

const fields = [
  { key: 'title', label: 'Title'},
  { key: 'description', label: 'Description'},
  { key: 'start', label: 'Start'},
  { key: 'end', label: 'End'},
  { key: 'status', label: 'Status'},
  { key: 'category', label: 'Category'},
  { key: 'priority', label: 'Priority'},
];

</script>
