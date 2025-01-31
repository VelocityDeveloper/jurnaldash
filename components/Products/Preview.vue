<template>
  
  <div v-for="field in fields" :key="field.key" class="border-b py-1">
    <div class="font-bold mb-1">{{ field.label }}</div>
    <div> {{ product[field.key] }} </div>
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
  { key: 'buyer_sku_code', label: 'SKU Code' },
  { key: 'status', label: 'Status' },
  { key: 'product_name', label: 'Product Name' },
  { key: 'desc', label: 'Description' },
  { key: 'category', label: 'Category' },
  { key: 'type', label: 'Type' },
  { key: 'brand', label: 'Brand' },
  { key: 'price', label: 'Price' },
  { key: 'stock', label: 'Stock' },
  { key: 'unlimited_stock', label: 'Unlimited Stock' },
  { key: 'seller_name', label: 'Seller Name' },
  { key: 'buyer_product_status', label: 'Buyer Product Status' },
  { key: 'seller_product_status', label: 'Seller Product Status' },
  { key: 'start_cut_off', label: 'Start Cut Off' },
  { key: 'end_cut_off', label: 'End Cut Off' },
]

</script>
