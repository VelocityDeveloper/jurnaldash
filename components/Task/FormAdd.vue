<template>
  <form @submit.prevent="handleFormSubmit">
    
    <div v-for="field in fields" :key="field.key" class="pt-1 pb-2">

      <label class="block mb-1" :for="field.key">{{ field.label }}</label>

      <Textarea v-if="field.type=='textarea'" :id="field.key" v-model="form[field.key]" class="w-full" :type="field.type" />

      <DatePicker v-else-if="field.type=='date'" dateFormat="yy-mm-dd" showTime hourFormat="24" :id="field.key" v-model="form[field.key]" class="w-full" :type="field.type" />

      <div v-else-if="field.type=='select'">
        <Select :id="field.key" v-model="form[field.key]" :options="field.options" optionLabel="label" optionValue="value" class="w-full" />
      </div>
      
      <div v-else-if="field.type=='textarea'&&field.key=='category'">
        <Select :id="field.key" v-model="form[field.key]" :options="field.options" optionLabel="code" optionValue="code" class="w-full" />
      </div>

      <InputText v-else :id="field.key" v-model="form[field.key]" class="w-full" :type="field.type" />

    </div>

    <div class="flex justify-end mt-4">
      <Button type="submit" label="Simpan" :loading="isLoading">          
          <span v-if="isLoading" class="flex items-center gap-1">
            <Icon name="lucide:loader-circle" class="animate-spin" mode="svg"/> Memproses..
          </span>
          <span v-else class="flex items-center gap-1">
            <Icon name="lucide:save" mode="svg"/> Simpan
          </span> 
        </Button>
    </div>

  </form>
</template>

<script setup lang="ts">
const client = useSanctumClient();
const isLoading = ref(false)
const toast = useToast();

//dapatkan option category
const categorys = ref([]);
const getOptionCategory = async () => {
  try {
    const response = await client('/api/category');
    categorys.value = response;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getOptionCategory();
});

const fields = ref([
  { key: 'title', label: 'Title', type:'text'},
  { key: 'description', label: 'Description', type:'textarea' },
  { key: 'start', label: 'Start', type:'date' },
  { key: 'end', label: 'End', type:'date' },
  { key: 'status', label: 'Status', type:'select', options: [{ label: 'Proses', value: 'ongoing' },{ label: 'Selesai', value: 'completed' },{ label: 'Batal', value: 'cancelled' }]},
  { key: 'category', label: 'Category', type:'select', options: categorys },
  { key: 'priority', label: 'Priority', type:'select', options:[{ label: 'Low', value: 'low' }, { label: 'Medium', value: 'medium' }, { label: 'High', value: 'high' }] },
]);

const dateNow = new Date();

const form = reactive({
  title: 'Project',
  description: 'Pengerjaan Project',
  start: dateNow,
  end: dateNow,
  status: 'completed',
  category: 'Project',
  priority: 'medium',
} as any)

const handleFormSubmit = async () => {
  isLoading.value = true;
  try {
    const response = await client(`/api/task`, {
      method: 'POST',
      body: form
    });
    toast.add({
      severity: 'success',
      summary: 'Berhasil!',
      detail: 'Data task berhasil ditambah',
      life: 3000
    });
  } catch (error) {
    console.error(error);
    toast.add({
      severity: 'error',
      summary: 'Gagal!',
      detail: 'Terjadi kesalahan saat mengupdate data',
      life: 3000
    });
  }
  isLoading.value = false;
};
</script>
