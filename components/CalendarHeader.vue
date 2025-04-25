<template>
  <div class="grid border-gray-300 bg-gray-100 dark:bg-zinc-900 dark:border-zinc-800 sticky top-0 z-20" :style="gridTemplate">
    <div class="sticky start-0 top-0 z-20 p-2 text-start font-medium border-gray-300 bg-gray-100 dark:border-zinc-800 dark:bg-zinc-900">
      
      
        <div v-if="selectedUser" class="flex items-center gap-1 text-primary-500">
          <img v-if="selectedUser.avatar_url" :src="selectedUser?.avatar_url" alt="Avatar" class="w-8 h-8 rounded-full">
          {{ selectedUser.label }}
        </div>
        <div v-else>
          Task
        </div>
        
    </div>
    <div 
      v-for="day in daysInMonth" 
      :key="day.date" 
      class="py-2 text-center border-gray-300 dark:border-zinc-800"
      :class="[
        toDay==day.date ? 'bg-blue-200 dark:bg-zinc-700' : '',
      ]"
    >
      {{ day.index }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  daysInMonth: Array,
  gridTemplate: String,
  user: Number | null,
  users: Array,
});
const sUser = computed(() => props.user);
const Getusers = computed(() => props.users);
import { useDayjs } from '#dayjs'
const dayjs = useDayjs()
const toDay = dayjs().format('YYYY-MM-DD')

const selectedUser = computed(() => {
  return Getusers.value.find((item) => item.value === sUser.value);
});

//get user by users
const getUser = (user) => {
  const userData = Getusers.value.find((item) => item.value === user);
  return userData.avatar_url;  
}
</script>