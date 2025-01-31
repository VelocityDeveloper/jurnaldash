<template>
  <Message class="mb-2 font-bold">
    Edit {{ itemData.domain }}
  </Message>
  
  
  <form @submit.prevent="handleFormSubmit">
    <div v-for="field in fields" :key="field.key" class="border-b py-2 flex flex-col md:flex-row">
      <div class="md:basis-1/4">
        <label>{{ field.label }}</label>
      </div>
      <div class="md:flex-1">
        <InputText :id="field.key" v-model="itemData[field.key]" class="w-full" :type="field.type" />
      </div>
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

<script setup lang="ts">
definePageMeta({
    title: `EditProfil Customer`,
});
const props = defineProps({
  item: Object
})
const itemData = props.item as any;
const idItem = itemData.id;
const isLoading = ref(false);
const toast = useToast();
const client = useSanctumClient();

const fields = [
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'domain', label: 'Domain', type: 'text' },
  { key: 'telepon', label: 'Telepon', type: 'text' },
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'status', label: 'Status', type: 'toggle' },
]

const handleFormSubmit = async () => {
  isLoading.value = true;
  try {
    const response = await client(`/api/customer/${idItem}`, {
      method: 'PUT',
      body: {
        name: itemData.name,
        domain: itemData.domain,
        telepon: itemData.telepon,
        email: itemData.email,
        status: itemData.status
      }
    });
    toast.add({
      severity: 'success',
      summary: 'Berhasil!',
      detail: 'Data customer berhasil diupdate',
      life: 3000
    });
  } catch (error) {
    console.error(error);
    toast.add({
      severity: 'error',
      summary: 'Gagal!',
      detail: 'Terjadi kesalahan saat mengupdate data customer',
      life: 3000
    });
  } finally {
    isLoading.value = false;
  }
}

</script>