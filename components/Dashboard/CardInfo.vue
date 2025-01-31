<template>
  
  <div class="overflow-x-auto">
    <div class="flex flex-row gap-4">

        <div v-for="item in items" :key="item.title" class="basis-[100%] md:basis-[50%] border p-4 rounded-lg min-w-[10rem]">
        
          <div class="flex justify-between">
            <div class="text-sky-500">
              <Icon :name="item.icon" mode="svg" size="1.5rem"/>
            </div>
            <div class="opacity-50 text-sm">
              {{ item.title }}
            </div>
          </div>
          <div class="text-2xl font-bold text-end mt-2">
            {{ item.value }}
          </div>
        </div>

    </div>
</div>

</template>

<script setup lang="ts">
const items = [
  {
    title: 'Customer',
    value: '575',
    icon: 'lucide:users',
  },
  {
    title: 'Product',
    value: '25',
    icon: 'lucide:box',
  },
  {
    title: 'Topup hari ini',
    value: 'Rp 1.000.000',
    icon: 'lucide:coins',
  },
  {
    title: 'Transaksi hari ini',
    value: '1.000',
    icon: 'lucide:chart-pie',
  }
];
</script>
