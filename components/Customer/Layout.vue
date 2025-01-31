<template>

  <div class="md:min-h-[8rem] bg-gradient-to-r from-sky-700 to-blue-400 dark:from-cyan-900 dark:to-blue-900 text-slate-50 rounded-t-lg flex items-bottom p-4 md:p-6">
    <div class="flex items-center">
      <Icon name="lucide:globe" mode="svg" size="3rem" class="mr-2 w-6 md:w-20"/>
      <div>
        <div class="md:text-2xl font-bold">
          {{ dataCust.domain }} 
          <a :href="'https://'+dataCust.domain" target="_blank">
            <Icon name="lucide:external-link" mode="svg" size="1rem" class="inline"/>
          </a>
        </div>
        <div class="text-xs md:text-base opacity-50">          
        {{ dataCust.name }}
        </div>
      </div>
    </div>
  </div>
  <Tabs :value="activeTab" scrollable>
      <TabList>
          <Tab v-for="tab in itemMenus" :key="tab.label" :value="tab.route">
              <span @click="navigateTo('/customer/'+idCust+tab.route)" dto="'/customer/'+idCust+tab.route" class="flex items-center gap-2 text-inherit">
                <span>{{ tab.label }}</span>
              </span>
          </Tab>
      </TabList>
  </Tabs>

  <div class="py-4">
    <slot/>
  </div>

</template>

<script setup lang="ts">
const props = defineProps(['activeTab'])
const activeTab = props.activeTab
const dataCust = ref({} as any)
const route = useRoute()
const idCust = route.params.id

const itemMenus = [  
  { route: '/', label: 'Profil'},
  { route: '/transaksi', label: 'Transaksi'},
  { route: '/saldo', label: 'Saldo'},
  { route: '/edit', label: 'Edit'},
]

const client = useSanctumClient();
const { data, status, error, refresh } = await useAsyncData(
    'customer-'+idCust,
    () => client('/api/customer/'+idCust)
)
dataCust.value = data.value;

</script>
