<template>
  <Card class="!bg-primary-100 dark:!bg-zinc-800 shadow-sm">
    <template #content>

      <div class="grid grid-cols-12">
        <div class="lg:col-span-9 md:col-span-7 sm:col-span-12 col-span-12">

          <div class="font-bold text-primary-500 dark:text-white">
              Selamat Datang,
          </div>
          
          <AvatarGroup v-if="data.users" class="mt-3 mb-5">
            <Avatar
              v-for="user in data.users"
              :image="user.avatar"
              shape="circle"
              :pt="{
                image: (options) => ({
                    class: [
                        '!object-cover',
                    ]
                })
              }"
              v-tooltip.top="user.name"
              />
          </AvatarGroup>

          <div class="flex items-center gap-6">
            <div class="border-r border-gray-200 pr-6">
              <div class="text-2xl md:text-3xl text-zinc-900 dark:text-white">
                {{ data.total_task }}
              </div>
              <div class="text-sm dark:text-zinc-400">Total Task Bulan ini</div>
            </div>
            <div>
              <div class="text-2xl md:text-3xl text-zinc-900 dark:text-white">
                {{ data.percentage_increase }} %
              </div>
              <div class="text-sm dark:text-zinc-400">Performa</div>
            </div>
          </div>

      </div>
      <div class="lg:col-span-3 md:col-span-5 sm:col-span-12 col-span-12 text-end">
        <img src="~/public/charts.webp" alt="Image" class="w-full max-w-[180px] mx-auto md:ml-auto md:mr-0 md:mt-[-1em]" />
      </div>

    </div>

    </template>
  </Card>
</template>

<script setup lang="ts">
const useConfig = useConfigStore()

const client = useSanctumClient();
const { data, status, error, refresh } = await useAsyncData(
    'dashboard-welcome',
    () => client('/api/dashboard/welcome')
)
</script>