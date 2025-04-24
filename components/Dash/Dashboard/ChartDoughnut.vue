<template>
  
  <Card class="md:h-[100%] dark:bg-zinc-800">
    <template #content>

      <div>
        <div class="text-sm dark:text-zinc-400">Hari ini</div>
      </div>
      <div>
        <Chart type="doughnut" :data="chartData" :options="chartOptions" class="h-[400px]" />
      </div>
    
    </template>
  </Card>

</template>

<script setup lang="ts">
const client = useSanctumClient();
const { data, status, error, refresh } = await useAsyncData(
    'dashboard-hariini',
    async () => {
      await new Promise(resolve => setTimeout(resolve, 2000)); // delay 2 detik
      return client('/api/dashboard/hariini')
    }
)

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();
const setChartData = () => {
    const documentStyle = getComputedStyle(document.body);

    return {
        labels: data.value?.labels,
        datasets: [
            {
                data: data.value?.data              
            }
        ]
    };
};

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');

    return {
        plugins: {
            legend: {
                labels: {
                    cutout: '60%',
                    color: textColor
                }
            }
        }
    };
};
</script>
