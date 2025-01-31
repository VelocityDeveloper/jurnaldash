<template>
  <form @submit.prevent="handleSubmit" ref="form" class="mt-[30px] flex flex-col gap-4" >
      <IftaLabel>
          <InputText id="paket" v-model="params.paket" class="w-full" type="text" variant="filled"/>
          <label for="paket">Paket</label>
      </IftaLabel>
      <IftaLabel>
          <InputText id="bobot" v-model="params.bobot" class="w-full" type="number" variant="filled"/>
          <label for="bobot">Bobot</label>
      </IftaLabel>
      <div>
          <Button label="Simpan" type="submit" class="w-full" />
      </div>
  </form>
</template>

<script lang="ts" setup>
  const client = useSanctumClient()
  const params = ref({} as any)
  const dialogRef = inject('dialogRef') as any
  const emit = defineEmits(['refreshData']);
  onMounted(() => {
      params.value = dialogRef.value.data;
  })

  const handleSubmit = async () => {
    try {
      // jika param id_paket ada, maka update data
      if(params.value.id_paket){
        await client(`/api/paket/${params.value.id_paket}`, {
          method: 'PUT',
          body: params.value,
        })
      } else {
        await client(`/api/paket`, {
          method: 'POST',
          body: params.value,
        })
      }
      emit('refreshData')
      dialogRef.value.close()
      
    }
    catch (err: any) {
      // console.log(err);
    }
  }
</script>