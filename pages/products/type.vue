<template>
  <div>
    
    <div v-if="status=='pending'">
      <template v-for="i in 10" :key="i">
        <Skeleton height="3rem" class="mb-1"></Skeleton>
      </template>
    </div>

    <div v-else>
      <DataTable :value="data.data" size="small" stripedRows scrollable>
        <Column field="type_name" header="Type">
          <template #body="slotProps">
              <div @click="openDialog(slotProps.data,'view')" class="cursor-pointer hover:underline">
                {{ slotProps.data.type_name }}
              </div>
          </template>
        </Column>
        <Column field="type_description" header="Description" class="hidden md:table-cell"></Column>
        <Column field="type_logo" header="" class="hidden md:table-cell">
          <template #body="slotProps">
            <img v-if="slotProps.data.logo_url" :src="slotProps.data.logo_url" class="w-10 h-10" alt="Logo" />
          </template>
        </Column>
        <Column :exportable="false"  header="">
          <template #body="slotProps">
                <div class="flex justify-end gap-1">
                  <Button @click="openDialog(slotProps.data,'edit')" variant="text" size="small">
                    <Icon name="lucide:edit" mode="svg" />
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

    <Dialog v-model:visible="dialog" :header="selectedItem ? selectedItem.type_name : 'Type Product'" :style="{ width: '30rem', minHeight: '50vh' }" :breakpoints="{ '1000px': '40rem', '768px': '90vw' }" :modal="true">
      <ProductTypeEditForm v-if="dialogAction == 'edit'" :item="selectedItem"/>
      <ProductTypePreview v-else :product="selectedItem" @edit="openDialog(selectedItem,'edit')"/>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
definePageMeta({
    title: "Type Product",
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
    'products-type-'+page.value,
    () => client('/api/product-type?page='+page.value)
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

const openDialog = (data: any, action: any) => {
      dialog.value = true;
      selectedItem.value = data;    
      dialogAction.value = action;
}

</script>

