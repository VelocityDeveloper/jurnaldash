<template>
  <div>

    <template v-if="status === 'pending'">
      <Skeleton height="4rem"></Skeleton>
    </template>

    <template v-else>
      <div v-for="product in data.products" :key="product.id">
        <div class="border-t pt-2 mt-2">
          {{ product.title }}
          <div class="text-xs opacity-50 flex justify-between mt-1">
            <span class="flex gap-1 items-center">
              <Icon name="lucide:clock" mode="svg" />
              {{ ubahTanggal(product.meta.createdAt) }}
            </span>
            <span>
              Rp {{ product.price }}
            </span>
          </div>
        </div>
      </div>
    </template>
    
  </div>
</template>

<script setup>
  const { data , status, error, refresh, clear } = await useFetch('https://dummyjson.com/products?limit=8');

  //ubah tanggal ke format indonesia
  const ubahTanggal = (tanggal) => {
    const date = new Date(tanggal);
    return date.toLocaleString('id-ID', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      });
  }

</script>

