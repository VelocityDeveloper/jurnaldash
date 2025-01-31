<template>

<Tabs value="0">
    <TabList>
        <Tab value="0">Edit Akun</Tab>
        <Tab value="1">Ubah Password</Tab>
    </TabList>
    <TabPanels>
        <TabPanel value="0">
          
          <form @submit.prevent="submitEditAkun">
              <div class="mb-3">
                  <label for="name" class="block mb-1">Nama</label>
                  <InputText type="text" id="name" class="w-full" v-model="form.name" />
              </div>
                      
              <div class="mb-3">
                  <label for="email" class="block mb-1">Email</label>
                  <InputText type="text" id="email" class="w-full" v-model="form.email" />
              </div> 

              <div class="flex justify-end mt-4">
                  <Button type="submit" label="Simpan" :loading="isLoading">
                      <Icon name="lucide:save" mode="svg"/>  Simpan              
                  </Button>
              </div>
          </form>

        </TabPanel>
        <TabPanel value="1">
          
          <form @submit.prevent="submitEditPassword">
              
              <div class="mb-3">
                  <label for="password" class="block mb-1">Password Baru</label>
                  <InputText type="password" id="password" class="w-full" v-model="formPassword.password" autocomplete="off"/>
              </div>
              <div class="mb-3">
                  <label for="password_confirmation" class="block mb-1">Konfirmasi Password Baru</label>
                  <InputText type="password" id="password_confirmation" class="w-full" v-model="formPassword.password_confirmation" />
              </div>
              
              <template v-if="errorPassword">
                <Message v-for="(value, key) in errorPassword" :key="key" class="mb-2 font-bold" severity="error">
                  {{ value[0] }}
                </Message>
              </template>

              <div class="flex justify-end mt-4">
                  <Button type="submit" label="Simpan" :loading="isLoading">
                      <Icon name="lucide:save" mode="svg"/>  Simpan              
                  </Button>
              </div>
              
          </form>

        </TabPanel>
    </TabPanels>
</Tabs>

</template>

<script setup lang="ts">
const client = useSanctumClient();
const toast = useToast();
const isLoading = ref(false);

// Mendefinisikan tipe untuk user
interface User {
    id: number;
    name: string;
    email: string;
}
const { isAuthenticated, user, refreshIdentity } = useSanctumAuth()
const form = ref({
    name: (user.value as User).name || '', 
    email: (user.value as User).email || '',
})

const submitEditAkun = async () => {
  isLoading.value = true;
  try {
      await client('/api/users/'+(user.value as User).id, { method: 'PUT', body: form.value });
      await refreshIdentity();
      toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Akun berhasil diperbarui', life: 3000 });
  } catch (error) {
      toast.add({ severity: 'warn', summary: 'Gagal', detail: 'Silahkan coba lagi', life: 3000 });
      console.error(error);    
  }
  isLoading.value = false;
}

const formPassword = ref({
    password: '',
    password_confirmation: ''
})
const errorPassword = ref({} as any);
const submitEditPassword = async () => {
  isLoading.value = true;
  errorPassword.value = {};
  try {
      await client('/api/users/password/'+(user.value as User).id, { method: 'POST', body: formPassword.value });
      toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Password berhasil diperbarui', life: 3000 });
      refreshIdentity();
  } catch (error) {
    const er = useSanctumError(error);
    errorPassword.value = er.bag;
    toast.add({ severity: 'warn', summary: 'Gagal', detail: er.msg, life: 3000 });
  }
  isLoading.value = false;
}

</script>
