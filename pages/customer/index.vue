<template>
  <div>    
    
    <div v-if="status=='pending'">
      <template v-for="i in 10" :key="i">
        <Skeleton height="2.5rem" class="mb-1"></Skeleton>
      </template>
    </div>

    <div v-else>
      <DataTable :value="data.data" size="small" stripedRows scrollable>        
        <Column field="customer_code" header="Code" class="hidden 2xl:table-cell"></Column>
        <Column field="domain" header="Domain">
          <template #body="slotProps">
              <NuxtLink :to="`/customer/${slotProps.data.id}`" class="cursor-pointer hover:underline">
                {{ slotProps.data.domain }}
              </NuxtLink>
          </template>
        </Column>
        <Column field="name" header="Name" class="hidden md:table-cell"></Column>
        <Column field="email" header="Email" class="hidden xl:table-cell"></Column>
        <Column field="telepon" header="Telp" class="hidden xl:table-cell"></Column>
        <Column field="status" header="Status" class="hidden md:table-cell text-nowrap">
          <template #body="slotProps">
            <Badge :severity="slotProps.data.status == true ? 'success' : 'danger'" class="!font-normal">
              {{ slotProps.data.status == true ? 'Aktif' : 'Tidak Aktif' }}
            </Badge>
          </template>
        </Column>
        <Column :exportable="false"  header="">
          <template #body="slotProps">             
            <div class="flex justify-end">
              <Button type="button" @click="displayPop($event, slotProps.data)" variant="text" severity="secondary" rounded>
                <Icon name="lucide:ellipsis-vertical" mode="svg"/>
              </Button>
            </div>
          </template>
        </Column>
      </DataTable>
      <Paginator
            :rows="data.per_page"
            :totalRecords="data.total"
            @page="onPaginate"
            :pt="{
                root: (event) => {
                    const itemForPage =  data.per_page;
                    const currentPage =  page - 1;
                    event.state.d_first = itemForPage * currentPage;
                },
            }"
            >
        </Paginator>
    </div>

  </div>

  <Popover ref="op" :dismissable="true">
    <div v-if="selectedItem" class="rounded flex flex-col">
      <div class="text-xs border-b pb-1 mb-1 opacity-50">
        {{ selectedItem.domain }}
      </div>
      <Button type="button" @click="openDialog(selectedItem,'view')" severity="secondary" variant="text" class="!p-1 !flex !justify-start">
          <Icon name="lucide:eye" mode="svg"/> Profil
      </Button>
      <Button type="button" @click="openDialog(selectedItem,'edit')" severity="secondary" variant="text" class="!p-1 !flex !justify-start">
        <Icon name="lucide:pen" mode="svg"/> Edit
      </Button>
      <Button type="button" @click="openDialog(selectedItem,'key')" severity="secondary" variant="text" class="!p-1 !flex !justify-start">
        <Icon name="lucide:key-round" mode="svg"/> Access Key
      </Button>
    </div>
  </Popover>

  <Dialog v-model:visible="dialog" :header="selectedItem ? selectedItem.domain : 'Customer'" :style="{ width: '40rem', minHeight: '50vh' }" :breakpoints="{ '1000px': '40rem', '768px': '90vw' }" :modal="true">
     
    <Tabs :value="dialogAction" class="mb-4" scrollable>
          <TabList>
              <Tab v-for="tab in items" :key="tab.label" :value="tab.action" class="!py-2" @click="openDialog(selectedItem,tab.action)">
                  <span>{{ tab.label }}</span>
              </Tab>
          </TabList>
    </Tabs>
    
    <CustomerEditForm v-if="dialogAction == 'edit'" :item="selectedItem"/>
    <CustomerKeyInfo v-else-if="dialogAction == 'key'" :item="selectedItem"/>
    <CustomerPreview v-else :item="selectedItem" @edit="openDialog(selectedItem,'edit')"/>
  </Dialog>

</template>

<script lang="ts" setup>
  definePageMeta({
      title: "Customers",
  });
  const dialog = ref(false);
  const dialogAction = ref('view');
  const selectedItem = ref();
  const op = ref();
  const route = useRoute();
  const page = ref(route.query.page ? Number(route.query.page) : 1);
  const client = useSanctumClient();
  const { data, status, error, refresh } = await useAsyncData(
      'customers-page-'+page.value,
      () => client('/api/customer?page='+page.value)
  )

  const onPaginate = (event: { page: number }) => {
      page.value = event.page + 1; 
      refresh()
      window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
      });
      navigateTo('/customer?page='+page.value)
  };

  const openDialog = (data: any, action: any) => {
      op.value.hide();
      dialog.value = true;
      selectedItem.value = data;    
      dialogAction.value = action;
  }

  const items = ref([
      { action: 'view', label: 'Profil'},
      { action: 'edit', label: 'Edit'},
      { action: 'key', label: 'Access Key'},
  ]);

  const displayPop = async (event: Event, data: any) => {
    dialog.value = false;  
    op.value.hide();
    selectedItem.value = data;
    await op.value.show(event);
  }

</script>
