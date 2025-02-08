<template>

  <div class="text-end mb-3">
    <Button type="button" @click="openDialog(null,'add')" size="small">
        <Icon name="lucide:plus" mode="svg"/> Tambah
    </Button>
  </div>

  <div>    
    <DataTable :value="data.data" size="small" stripedRows scrollable>
      <Column field="name" header="Name"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="role" header="Role"></Column>
      <Column field="options" header="">
        <template #body="slotProps">
          <Button type="button" @click="displayPop($event, slotProps.data)" variant="text" severity="secondary" rounded>
            <Icon name="lucide:ellipsis-vertical" mode="svg"/>
          </Button>
        </template>
      </Column>
    </DataTable>
  </div>

  <Popover ref="op" :dismissable="true">
    <div v-if="selectedItem" class="rounded flex flex-col">
      <div class="text-xs border-b pb-1 mb-1 opacity-50">
        {{ selectedItem.domain }}
      </div>
      <Button type="button" @click="openDialog(selectedItem,'edit')" severity="secondary" variant="text" class="!p-1 !flex !justify-start">
        <Icon name="lucide:pen" mode="svg"/> Edit
      </Button>
      <Button type="button" @click="confirmDelete(selectedItem)" severity="danger" variant="text" class="!p-1 !flex !justify-start">
        <Icon name="lucide:trash" mode="svg"/> Delete
      </Button>
    </div>
  </Popover>

  <Dialog v-model:visible="dialog" :header="selectedItem ? 'Edit User' : 'Tambah User'" :style="{ width: '40rem', minHeight: '50vh' }" :breakpoints="{ '1000px': '40rem', '768px': '90vw' }" :modal="true">
      <UserForm :data="selectedItem" :action="dialogAction" @close="dialog = false" @update="refresh"/>
  </Dialog>
  <ConfirmDialog/>
</template>

<script setup lang="ts">
definePageMeta({
    title: "Users",
});
const confirm = useConfirm();
const dialog = ref(false);
const dialogAction = ref('view');
const selectedItem = ref();
const op = ref();
const route = useRoute();
const page = ref(route.query.page ? Number(route.query.page) : 1);
const client = useSanctumClient();
const { data, status, error, refresh } = await useAsyncData(
    'users-page-'+page.value,
    () => client('/api/users?page='+page.value)
)

const displayPop = async (event: Event, data: any) => {
  dialog.value = false;  
  op.value.hide();
  selectedItem.value = data;
  await op.value.show(event);
}

const openDialog = (data: any, action: any) => {
    op.value.hide();
    dialog.value = true;
    selectedItem.value = data;    
    dialogAction.value = action;
}

const confirmDelete = (id: any) => {    
    confirm.require({
        message: 'Are you sure you want to delete this user?',
        header: 'Delete User',
        accept: () => {
            client(`/api/users/${id.id}`, {
                method: 'DELETE',
            }).then(() => {
                refresh();
            });
        },
        reject: () => {
            //callback to execute when user rejects to delete
        }
    });
}

</script>
