<template>
  <Message class="mb-2 font-bold">
    Edit {{ item.brand_name }}
  </Message>
  <form @submit.prevent="handleFormSubmit">
    <div v-for="field in fields" :key="field.key" class="pt-1 pb-2">

        <label class="block mb-1" :for="field.key">{{ field.label }}</label>

        <div>
          <img v-if="previewLogo && field.type=='file'" :src="previewLogo" class="w-16 h-16" alt="Logo" />
        </div>

        <InputText v-if="field.type=='file'" @change="handleFileUpload" :id="field.key" class="w-full" :type="field.type" />

        <InputText v-else :id="field.key" v-model="item[field.key]" class="w-full" :type="field.type" />

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
  item: Object
})
const item = props.item;
const idItem = item.id;
const isLoading = ref(false)
const toast = useToast();
const client = useSanctumClient();
const previewLogo = ref(item.logo_url);
const fileLogo = ref(null);

const fields = [
  { key: 'brand_name', label: 'Brand Name', type: 'text' },
  { key: 'brand_description', label: 'Description', type: 'text' },
  { key: 'brand_logo', label: 'Logo', type: 'file' },
]

const handleFileUpload = (event) => {
  fileLogo.value = event.target.files[0];
  previewLogo.value = URL.createObjectURL(event.target.files[0]);
}

const handleFormSubmit = async () => {
  isLoading.value = true;

  const formData = new FormData();
  formData.append('brand_name', item.brand_name);
  formData.append('brand_description', item.brand_description);
  if(fileLogo.value){
    formData.append('brand_logo_file', fileLogo.value);
  }

  try {
    await client('/api/product-brand/'+idItem, { method: 'PUT', body: formData });
    isLoading.value = false;
    toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Brand berhasil diubah', life: 3000 });
  } catch (error) {
    isLoading.value = false;
    toast.add({ severity: 'error', summary: 'Gagal', detail: 'Brand gagal diubah '+error.message, life: 3000 });
  }
  
}

</script>
