<template>
  <div>

    <div class="border-b py-2">
      <div class="mb-1">
        Customer Code
      </div>
      <div>  
        <div class="flex">
          <InputText :value="data.customer_code" type="text" class="w-full !rounded-e-none" disabled/>
          <Button severinity="secondary" @click="copyClipboard(data.customer_code)" class="!rounded-s-none">
            <Icon name="lucide:copy"/>
          </Button>
         </div> 
      </div>
    </div>    
    <div class="border-b py-2">
      <div class="mb-1">
        Secret Key
      </div>
      <div>
        <div class="flex">
          <Skeleton v-if="status=='pending'" height="3rem" class="w-full"/>
          <InputText v-else :value="data.license.secret_key" type="text" class="w-full !rounded-e-none" disabled/>
          <Button severinity="secondary" @click="copyClipboard(data.license.secret_key)" class="!rounded-s-none">
            <Icon name="lucide:copy"/>
          </Button>
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-5">
      <Button severity="danger" @click="confirmGenerate(item.id)" :loading="isLoading">
        <Icon v-if="status=='pending'" name="lucide:loader" mode="svg" class="animate-spin"/>
        <Icon v-else name="lucide:refresh-cw" mode="svg"/>
        Perbarui Key
      </Button>
    </div>

  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  item: Object
})
const item = props.item||{};
const idCustomer = item.id;
const isLoading = ref(false);
const toast = useToast();
const confirm = useConfirm();
const client = useSanctumClient();
const datas = ref({} as any)

const { data, status, error, refresh } = await useAsyncData(
    'customersy-'+idCustomer,
    () => client('/api/customer/key/'+idCustomer)
)
datas.value = data.value;

const copyClipboard = (text: any) => {
  navigator.clipboard.writeText(text);
  toast.add({
      severity: 'success',
      summary: 'Berhasil!',
      detail: 'Berhasil disalin ke clipboard',
      life: 1000
  });
}

const confirmGenerate = (id : any) => {
  confirm.require({
    message: 'Mengubah secret key mungkin akan berpengaruh ke aplikasi yang digunakan Customer',
    header: 'Generate ulang secret key ?',
    rejectLabel: 'Cancel',
    rejectProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
    },
    acceptProps: {
        label: 'Generate',
        severity: 'danger'
    },
    accept: () => {
      try {
        isLoading.value = true;
        client('/api/customer/generatekey/'+id, {
          method: 'POST',
          body: {
            secret_key: datas.value.license.secret_key,
            customer_code: datas.value.customer_code
          }
        });
        toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Key telah diubah', life: 3000 });
        refresh()
      } catch (error) {
        toast.add({ severity: 'warn', summary: 'Gagal', detail: 'Key gagal diubah', life: 3000 });        
      }
      isLoading.value = false;
    },
});
};

</script>