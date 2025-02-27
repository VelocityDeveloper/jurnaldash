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

    <div class="flex justify-end gap-1 mt-4">
      <Button type="submit" label="Simpan" :loading="isLoading">          
        <span v-if="isLoading" class="flex items-center gap-1">
          <Icon name="lucide:loader-circle" class="animate-spin" mode="svg"/> Memproses..
        </span>
        <span v-else class="flex items-center gap-1">
          <Icon name="lucide:save" mode="svg"/> Simpan
        </span> 
      </Button>
      <Button v-if="isLoadingDelete" class="flex items-center" severity="danger" size="small" >
        <Icon name="lucide:loader-2" class="animate-spin" />
      </Button>
      <Button v-else class="flex items-center" severity="danger" size="small" @click="deleteData(props.item.id)">
        <Icon name="lucide:trash" /> Hapus
      </Button>
    </div>
    <ConfirmPopup/>
  </form>
</template>

<script setup lang="ts">
const props = defineProps(['item'])
const emits = defineEmits(['add','update','delete'])
const client = useSanctumClient()
const isLoading = ref(false)
const isLoadingDelete = ref(false)
const toast = useToast()
const confirm = useConfirm()

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

const deleteData = async (id: number) => {
  confirm.require({
    message: 'Apakah Anda yakin ingin menghapus data ini?',
    header: 'Konfirmasi',
    icon: 'lucide:alert-triangle',
    rejectProps: {
      label: 'Batal',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Hapus'
    },
    accept: async () => {
      isLoadingDelete.value = true;
      const response = await client(`/api/task/${id}`, {
        method: 'DELETE',
      });
      isLoadingDelete.value = false;
      emits('delete', props.item.id);
      toast.add({ severity: 'success', summary: 'Sukses', detail: 'Konsumen berhasil dihapus!', life: 3000 });
    },
  });
}

onMounted(() => {
  if(props.item) {
    form.title = props.item.title;
    form.description = props.item.description;
    form.start = props.item.start;
    form.end = props.item.end;
    form.status = props.item.status;
    form.category = props.item.category;
    form.priority = props.item.priority;
  }
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
  if(props.item) {
    try {
      const responseUpdate = await client(`/api/task/${props.item.id}`, {
        method: 'PUT',
        body: form
      });
      emits('update', responseUpdate);
      toast.add({
        severity: 'success',
        summary: 'Berhasil!',
        detail: 'Data task berhasil diupdate',
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
  } else {
    try {
      const responseAdd = await client(`/api/task`, {
        method: 'POST',
        body: form
      });
      emits('add', responseAdd);
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
  }

  isLoading.value = false;
};
</script>
