<template>
  
  <div v-for="field in fields" :key="field.key" class="border-b py-2 flex flex-col md:flex-row">

    <div class="md:basis-1/4 font-bold mb-1">
      {{ field.label }}
    </div>
    <div class="md:flex-1">
      
      <Badge v-if="field.key == 'status'" :severity="item[field.key] == true ? 'success' : 'danger'" class="!font-normal">
          {{ item[field.key] == true ? 'Aktif' : 'Tidak Aktif' }}
      </Badge>
      <span v-else>
        {{ item[field.key] }}
      </span>

    </div>

  </div>
  
</template>

<script setup>
defineEmits(['edit'])
const props = defineProps({
  item: Object
})
const item = props.item;

const fields = [
  { key: 'customer_code', label: 'Code' },
  { key: 'name', label: 'Name' },
  { key: 'domain', label: 'Domain' },
  { key: 'email', label: 'Email' },
  { key: 'telepon', label: 'Telepon' },
  { key: 'status', label: 'Status' },
]

</script>
