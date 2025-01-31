<template>

  <div class="mb-10">    
    <DashboardCardInfo />  
  </div>

  <div class="flex flex-col md:flex-row gap-4">

      <div class="basis-[100%] md:basis-[70%]">
        <div class="border p-4 rounded-lg min-h-[20rem]">
          <div class="font-bold mb-2">
            Grafik Transaksi
          </div>
          <DashboardChartTransaksi />          
        </div>
      </div>

      <div class="basis-[100%] md:basis-[30%]">
        <div class="border p-4 rounded-lg min-h-[20rem] overflow-x-auto">
          <div class="font-bold mb-2">
            Transaksi Terbaru
          </div>
            <DashboardTransaksiTerbaru />
        </div>
      </div>

  </div>
</template>

<script lang="ts" setup>
  definePageMeta({
      title: "Dashboard",
  });
</script>