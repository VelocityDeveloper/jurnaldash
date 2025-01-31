<template>
  <div>
    Edit {{ product.product_name }}
  </div>
  <form @submit.prevent="handleFormSubmit">
    <div v-for="field in fields" :key="field.key" class="pt-1 pb-2">

        <label class="block mb-1" :for="field.key">{{ field.label }}</label>

        <ToggleSwitch v-if="field.type == 'toggle'" :defaultValue="product[field.key]=='1'? true : false" v-model="product[field.key]" />
        <InputText v-else :id="field.key" v-model="product[field.key]" class="w-full" :type="field.type" />

    </div>

    <div class="flex justify-end mt-4">
      <Button type="submit" label="Simpan" :loading="isLoading">
          <Icon name="lucide:save" mode="svg"/> 
          <span v-if="isLoading">
              Memproses..         
          </span>  
          <span v-else>
              Simpan        
          </span> 

        </Button>
    </div>
  </form>
</template>

<script setup>
const props = defineProps({
  product: Object
})
const product = props.product;
const idProduct = product.id;
const isLoading = ref(false)
const toast = useToast();
const client = useSanctumClient();

const fields = [
  { key: 'status', label: 'Status', type: 'toggle' },
  { key: 'product_name', label: 'Product Name', type: 'text' },
  // { key: 'category', label: 'Category', type: 'text' },
  // { key: 'brand', label: 'Brand', type: 'text' },
  // { key: 'type', label: 'Type', type: 'text' },
  // { key: 'seller_name', label: 'Seller Name', type: 'text' },
  // { key: 'price', label: 'Price', type: 'number' },
  // { key: 'buyer_sku_code', label: 'SKU Code', type: 'text' },
  // { key: 'buyer_product_status', label: 'Buyer Product Status', type: 'text' },
  // { key: 'seller_product_status', label: 'Seller Product Status', type: 'text' },
  // { key: 'unlimited_stock', label: 'Unlimited Stock', type: 'text' },
  // { key: 'stock', label: 'Stock', type: 'number' },
  // { key: 'multi', label: 'Multi', type: 'text' },
  // { key: 'start_cut_off', label: 'Start Cut Off', type: 'text' },
  // { key: 'end_cut_off', label: 'End Cut Off', type: 'text' },
  { key: 'desc', label: 'Description', type: 'text' },
]

const handleFormSubmit = async () => {
  isLoading.value = true;
  await client('/api/products/'+idProduct, { method: 'PUT', body: product });
  isLoading.value = false;
  toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Berhasil diubah', life: 3000 });
}

</script>

