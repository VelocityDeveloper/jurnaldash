<template>
  <Message class="mb-2 font-bold">
    Edit {{ item.category_name }}
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
  { key: 'category_name', label: 'Category Name', type: 'text' },
  { key: 'category_description', label: 'Description', type: 'text' },
  { key: 'category_logo', label: 'Logo', type: 'file' },
]

const handleFileUpload = (event) => {
  fileLogo.value = event.target.files[0];
  previewLogo.value = URL.createObjectURL(event.target.files[0]);
}

const handleFormSubmit = async () => {
  isLoading.value = true;

  const formData = new FormData();
  formData.append('category_name', item.category_name);
  formData.append('category_description', item.category_description);
  if(fileLogo.value){
    formData.append('category_logo_file', fileLogo.value);
  }

  try {
    await client('/api/product-category/'+idItem, { method: 'PUT', body: formData });
    isLoading.value = false;
    toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Category berhasil diubah', life: 3000 });
  } catch (error) {
    isLoading.value = false;
    toast.add({ severity: 'error', summary: 'Gagal', detail: 'Category gagal diubah '+error.message, life: 3000 });
  }
  
}

</script>
