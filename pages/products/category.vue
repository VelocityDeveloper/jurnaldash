<template>
  <div>
    
    <div v-if="status=='pending'">
      <template v-for="i in 10" :key="i">
        <Skeleton height="3rem" class="mb-1"></Skeleton>
      </template>
    </div>

    <div v-else>
      <DataTable :value="data.data" size="small" stripedRows scrollable>
        <Column field="category_name" header="Category">
          <template #body="slotProps">
              <div @click="openDialog(slotProps.data,'view')" class="cursor-pointer hover:underline">
                {{ slotProps.data.category_name }}
              </div>
          </template>
        </Column>
        <Column field="category_description" header="Description" class="hidden md:table-cell"></Column>
        <Column field="category_logo" header="">
          <template #body="slotProps">
            <img v-if="slotProps.data.logo_url" :src="slotProps.data.logo_url" class="w-8 aspect-square object-cover" alt="Logo" />
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

    <Dialog v-model:visible="dialog" :header="selectedItem ? selectedItem.category_name : 'Category Product'" :style="{ width: '30rem', minHeight: '50vh' }" :breakpoints="{ '1000px': '40rem', '768px': '90vw' }" :modal="true">
      <ProductCategoryEditForm v-if="dialogAction == 'edit'" :item="selectedItem"/>
      <ProductCategoryPreview v-else :product="selectedItem" @edit="openDialog(selectedItem,'edit')"/>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
definePageMeta({
    title: "Category Product",
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
    'products-category-'+page.value,
    () => client('/api/product-category?page='+page.value)
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

