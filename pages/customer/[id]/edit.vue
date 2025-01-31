<template>
  <CustomerLayout activeTab="/edit">
    
    
  <form @submit.prevent="handleFormSubmit">    
    <div v-for="field in fields" :key="field.key" class="border-b py-2 flex flex-col md:flex-row">
      <div class="md:basis-1/4">
        <label>{{ field.label }}</label>
      </div>
      <div class="md:flex-1">
        <InputText :id="field.key" v-model="datas[field.key]" class="w-full" :type="field.type" />
      </div>
    </div>
    <div class="flex justify-end mt-4">
      <Button type="submit" label="Simpan" :loading="isLoading">          
          <span v-if="isLoading" class="flex items-center g-2">
            <Icon name="lucide:loader-circle" mode="svg" class="animate-spin mr-1"/> Memproses..         
          </span>  
          <span v-else class="flex items-center g-2">
            <Icon name="lucide:save" mode="svg" class="mr-1" /> Simpan        
          </span> 

        </Button>
    </div>
  </form>

  </CustomerLayout>
</template>

<script setup lang="ts">
const isLoading = ref(false);
const route = useRoute()
const idCust = route.params.id
const toast = useToast();
const datas = ref({} as any);
const client = useSanctumClient();
const { data, status, error, refresh } = await useAsyncData(
    'customer-'+idCust,
    () => client('/api/customer/'+idCust)
)
datas.value = data.value;

const fields = [
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'domain', label: 'Domain', type: 'text' },
  { key: 'telepon', label: 'Telepon', type: 'text' },
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'status', label: 'Status', type: 'toggle' },
]


const handleFormSubmit = async () => {
  isLoading.value = true;
}

</script>

