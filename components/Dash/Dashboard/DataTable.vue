<template>
  <Card class="md:h-[100%] dark:bg-zinc-800">
    <template #content>
      
      <div class="mb-3">
        <div class="dark:text-zinc-400">Task Terbaru</div>
      </div>

      <DataTable v-if="data" :value="data.data" size="small" class="text-sm" stripedRows scrollable>
        <Column field="title" header="Title" />
        <Column field="user" header="User">
          <template #body="slotProps">
            <div class="flex items-center gap-2">
              <Avatar
              :image="slotProps.data.user.avatar_url"
              shape="circle"
              :pt="{
                image: (options) => ({
                    class: [
                        '!object-cover',
                    ]
                })
              }"
              v-tooltip.top="slotProps.data.user.name"
              />
              {{ slotProps.data?.user?.name }}
            </div>
          </template>
        </Column>
        <Column field="category" header="Category" />
        <Column field="start" header="Start" />
        <Column field="status" header="Status">
          <template #body="slotProps">
            <TaskStatus :value="slotProps.data.status" />
          </template>
        </Column>
        
      </DataTable>

    </template>
  </Card>

  <Dialog v-model:visible="dialog" header="Post" :style="{ width: '40rem', minHeight: '50vh' }" :breakpoints="{ '1000px': '40rem', '768px': '90vw' }" :modal="true">
    <PostPreview :data="selectedItem" />
  </Dialog>

</template>

<script setup lang="ts">
const client = useSanctumClient();
const { data, status, error, refresh } = await useAsyncData(
    'dashboard-datatable',
    () => client('/api/dashboard/datatable')
)

const dialog = ref(false);
const selectedItem = ref();
const openDialog = (data: any) => {
    dialog.value = true;
    selectedItem.value = data;   
}
</script>