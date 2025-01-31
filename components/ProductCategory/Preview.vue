<template>
  
  <div v-for="field in fields" :key="field.key" class="border-b py-1">
    <div class="font-bold mb-1">{{ field.label }}</div>
    <div v-if="field.key != 'category_logo'"> {{ product[field.key] }} </div>
    <img v-if="field.key == 'category_logo' && product['logo_url']" :src="product['logo_url']" class="w-16 h-16" alt="Logo" />
  </div>

  <div class="flex justify-end mt-4">
    <Button type="submit" severity="info" @click="$emit('edit')">
        <Icon name="lucide:edit" mode="svg"/> Edit
    </Button>
  </div>
  
</template>

<script setup>
defineEmits(['edit'])
const props = defineProps({
  product: Object
})
const product = props.product;

const fields = [
  { key: 'category_name', label: 'Category Name' },
  { key: 'category_description', label: 'Description' },
  { key: 'category_logo', label: 'Logo' },
]

</script>
