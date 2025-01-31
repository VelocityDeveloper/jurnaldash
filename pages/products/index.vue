<template>
  <div>

    <div class="flex justify-end items-center mb-3">
      <Button @click="reloadRelay()" size="small" severity="success">
        <Icon name="lucide:refresh-ccw-dot" mode="svg"/> Perbarui Relay
      </Button>
    </div>

    <div v-if="status=='pending'">
      <template v-for="i in 10" :key="i">
        <Skeleton height="3rem" class="mb-1"></Skeleton>
      </template>
    </div>

    <div v-else>
      <DataTable :value="data.data" size="small" stripedRows scrollable>
        <Column field="product_name" header="Name">
          <template #body="slotProps">
              <div @click="openDialog(slotProps.data,'view')" class="cursor-pointer hover:underline">
                {{ slotProps.data.product_name }}
              </div>
          </template>
        </Column>
        <Column field="category" header="Category" class="hidden md:table-cell"></Column>
        <Column field="brand" header="Brand" class="hidden lg:table-cell"></Column>
        <Column field="type" header="Type" class="hidden lg:table-cell"></Column>
        <Column field="price" header="Price" class="hidden sm:table-cell"></Column>
        <Column field="stock" header="Stock" class="hidden md:table-cell">
          <template #body="slotProps">
            <span v-if="slotProps.data.unlimited_stock == true">
              Unlimited
            </span>
            <span v-else>
              {{ slotProps.data.stock }}
            </span>
          </template>
        </Column>
        <Column field="status" header="Status" class="hidden sm:table-cell">
          <template #body="slotProps">
            <span v-if="slotProps.data.status == true" class="bg-green-400 text-zinc-900 text-xs px-2 py-1 rounded">
              Aktif
            </span>
            <span v-else class="bg-red-400 text-zinc-900 text-xs px-2 py-1 rounded">
              Tidak Aktif
            </span>
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
                    
          <Button @click="openDialog(selectedItem,'edit')" severity="info" variant="text" size="small" class="w-full !justify-start">
              <Icon name="lucide:pencil" mode="svg"/> Edit
          </Button>
          <Button @click="confirmDelete(selectedItem.id)" severity="danger" variant="text" size="small" class="w-full !justify-start">
              <Icon name="lucide:trash" mode="svg"/> Hapus
          </Button>

      </div>
  </Popover>

  <Dialog v-model:visible="dialog" :header="selectedItem ? selectedItem.product_name : 'Produk'" :style="{ width: '30rem', minHeight: '50vh' }" :breakpoints="{ '1000px': '40rem', '768px': '90vw' }" :modal="true">
    <ProductsEditForm v-if="dialogAction == 'edit'" :product="selectedItem"/>
    <ProductsPreview v-else :product="selectedItem" @edit="openDialog(selectedItem,'edit')"/>
  </Dialog>

</template>

<script lang="ts" setup>
  definePageMeta({
      title: "Products",
  });
  const confirm = useConfirm();
  const toast = useToast();
  const route = useRoute();
  const page = ref(route.query.page ? Number(route.query.page) : 1);
  const selectedItem = ref();
  const op = ref();
  const dialog = ref(false);
  const dialogAction = ref('view');
  const client = useSanctumClient();
  const { data, status, error, refresh } = await useAsyncData(
      'products-page-'+page.value,
      () => client('/api/products?page='+page.value)
  )

  const onPaginate = (event: { page: number }) => {
        page.value = event.page + 1; 
        refresh()
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        navigateTo('/products?page='+page.value)
    };

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

  const confirmDelete = (id : any) => {
      confirm.require({
          message: 'Yakin untuk menghapus produk ini ?',
          header: 'Hapus Produk',
          icon: 'pi pi-info-circle',
          rejectLabel: 'Cancel',
          rejectProps: {
              label: 'Cancel',
              severity: 'secondary',
              outlined: true
          },
          acceptProps: {
              label: 'Delete',
              severity: 'danger'
          },
          accept: async () => {
              await client('/api/products/'+id, { method: 'DELETE' })   
              refresh()
              toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Berhasil dihapus', life: 3000 });
          },
      });
  };
  
  const reloadRelay = async () => {
    status.value = 'pending';
    await client('/api/relay');
    toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Data Produk berhasil diperbarui', life: 3000 });
    refresh();
  };

</script>
