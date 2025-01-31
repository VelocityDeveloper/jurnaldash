<template>
  <CustomerLayout activeTab="/">
    <div class="flex flex-col md:flex-row gap-4">

      <div class="md:flex-1">

        <div class="flex flex-col md:flex-row gap-2">

          <div class="md:flex-1">
            <div class="rounded-lg p-3 border relative">
              <div class="opacity-50">Saldo</div>
              <div class="font-bold text-2xl mt-3">
                Rp 20.000
              </div>
              <div class="absolute top-0 end-0 p-3">
                <Icon name="lucide:wallet" size="2rem" mode="svg" class="opacity-50"/>
              </div>
            </div>
          </div>

          <div class="md:basis-1/2">
            <div class="rounded-lg p-3 border relative">
              <div class="opacity-50">Total Transaksi</div>
              <div class="font-bold text-2xl mt-3">
                120
              </div>
              <div class="absolute top-0 end-0 p-3">
                <Icon name="lucide:chart-no-axes-combined" size="2rem" mode="svg" class="opacity-50"/>
              </div>
            </div>
          </div>

        </div>
        
        <div class="rounded-lg p-3 border relative my-3">
          <div class="font-bold mb-2">
            Transaksi Terbaru
          </div>          

          <DataTable :value="newTransaksi" size="small" stripedRows scrollable>          
            <Column field="invoice" header="Invoice"></Column>            
            <Column field="product" header="Product"></Column>          
            <Column field="tanggal" header="Tanggal"></Column>         
            <Column field="total" header="Total"></Column>
          </DataTable>

        </div>

      </div>

      <div class="md:basis-1/3">

        <div class="border rounded-lg p-3">
          <div class="font-bold mb-2">
            Informasi Customer
          </div>          
          <div v-for="field in fields" :key="field.key" class="border-b py-2 flex flex-col md:flex-row">
            <div class="md:basis-1/5 opacity-70">
              {{ field.label }}
            </div>
            <div class="md:flex-1">
              <span v-if="field.key=='status'">
                <Badge :severity="datas[field.key] == true ? 'success' : 'danger'" class="!font-normal">
                  {{ datas[field.key] == true ? 'Aktif' : 'Tidak Aktif' }}
                </Badge>
              </span>
              <span v-else>
                {{ datas[field.key] }}
              </span>
            </div>
          </div>
        </div>
        
        <div class="border rounded-lg p-3 mt-5">
          <div class="font-bold mb-2">
            Access Key
          </div>          
          <CustomerKeyInfo :item="datas"/>
        </div>

      </div>
      
    </div>
  </CustomerLayout>
</template>

<script setup lang="ts">
definePageMeta({
    title: `Profil Customer`,
});
const route = useRoute()
const idCust = route.params.id
const datas = ref({} as any)

const client = useSanctumClient();
const { data, status, error, refresh } = await useAsyncData(
    'customer-'+idCust,
    () => client('/api/customer/'+idCust)
)
datas.value = data.value;

const fields = [
  { key: 'customer_code', label: 'Code' },
  { key: 'name', label: 'Name' },
  { key: 'domain', label: 'Domain' },
  { key: 'email', label: 'Email' },
  { key: 'telepon', label: 'Telepon' },
  { key: 'status', label: 'Status' },
]

const newTransaksi = [
  {
    id: 1,
    invoice: 'INV-123',
    product: 'Product 1',
    tanggal: '2023-01-25',
    total: 20000
  },
  {
    id: 2,
    invoice: 'INV-122',
    product: 'Product 2',
    tanggal: '2023-01-24',
    total: 15000
  },
  {
    id: 3,
    invoice: 'INV-123',
    product: 'Product 3',
    tanggal: '2023-01-23',
    total: 35000
  },
  {
    id: 4,
    invoice: 'INV-123',
    product: 'Product 4',
    tanggal: '2023-01-22',
    total: 50000
  },
  {
    id: 5,
    invoice: 'INV-123',
    product: 'Product 5',
    tanggal: '2023-01-21',
    total: 25000
  },
  {
    id: 6,
    invoice: 'INV-123',
    product: 'Product 6',
    tanggal: '2023-01-20',
    total: 30000
  },
  {
    id: 7,
    invoice: 'INV-123',
    product: 'Product 7',
    tanggal: '2023-01-19',
    total: 40000
  },
  {
    id: 8,
    invoice: 'INV-123',
    product: 'Product 8',
    tanggal: '2023-01-18',
    total: 50000
  }
];
</script>
