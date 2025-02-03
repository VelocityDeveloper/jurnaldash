<template>
  <form @submit.prevent="handleSubmit">
    
    <div v-for="item in fields" :key="item.key" class="flex flex-col md:flex-row border-b py-1">
        <div class="md:basis-1/4 mb-1">
          <label class="font-bold" :for="item.key">{{ item.label }}</label>
        </div>
        <div class="md:flex-1">
          
          <div v-if="item.type=='select'">
            <Select :id="item.key" v-model="form[item.key]" :options="item.options" optionLabel="label" optionValue="value" class="w-full" required/>
          </div>

          <InputText v-else :id="item.key" :type="item.type" v-model="form[item.key]" class="w-full" required/>

        </div>
    </div>

    <div class="text-end mt-3">
      <Button type="submit">
        <span v-if="isLoading" class="flex items-center gap-1">
          <Icon name="lucide:loader-circle" mode="svg" class="mr-1 animate-spin" /> proses..
        </span>
        <span v-else class="flex items-center gap-1">
          <Icon name="lucide:save" mode="svg" class="mr-1" /> Simpan
        </span>
      </Button>
    </div>
    
  </form>
</template>

<script setup lang="ts">
const emit = defineEmits(['update'])
const props = defineProps(['data','action'])
const data = props.data
const action = props.action
const client = useSanctumClient();
const isLoading = ref(false)
const toast = useToast();

const fields = [
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'password', label: 'Password', type: 'password' },
  { key: 'password_confirmation', label: 'Confirm Password', type: 'password' },
  { key: 'role', label: 'Role', type: 'select', options: [{ label: 'Admin', value: 'admin' }, { label: 'Web Developer', value: 'webdeveloper' }] },
];

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  role: '',
} as any)

//update form dari data
if (data) {
  form.name = data.name
  form.email = data.email
  form.role = data.role
}

const handleSubmit = async () => {
  isLoading.value = true

  try {
    if (action == 'add') {      
      const response = await client(`/api/users`, {
        method: 'POST',
        body: form
      })
      toast.add({
        severity: 'success',
        summary: 'Berhasil!',
        detail: 'Data User berhasil ditambah',
        life: 3000
      });
    } else if (action == 'edit') {
      const response = await client(`/api/users/${data.id}`, {
        method: 'PUT',
        body: form
      })
      toast.add({
        severity: 'success',
        summary: 'Berhasil!',
        detail: 'Data User berhasil disimpan',
        life: 3000
      });
    }
    emit('update') 
  } catch (error) {
    const er = useSanctumError(error)  
    console.error(er) 
    toast.add({
        severity: 'error',
        summary: 'Gagal!',
        detail: er.msg ? er.msg : 'Terjadi kesalahan saat mengupdate data',
        life: 3000
    });
  }
  
  isLoading.value = false
}

</script>
