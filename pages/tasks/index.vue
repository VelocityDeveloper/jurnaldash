<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Project Manager - ClickUp Style</h1>

    <div class="border rounded-lg overflow-hidden">
      <!-- Wrapper dengan scroll horizontal -->
      <div class="overflow-x-auto">
        <div class="min-w-max">
          <!-- Header dengan Tanggal -->
          <div class="grid border-b border-gray-300 bg-gray-100 sticky top-0 z-10" :style="gridTemplate">
            <div class="p-2 font-bold border-r border-gray-300 min-w-[200px] sticky left-0 z-10 bg-gray-200">Proyek / Tugas</div>
            <div v-for="day in daysInMonth" :key="day.date" class="p-2 text-center border-r border-gray-300">
              {{ day.index }}
            </div>
          </div>

          <!-- Data Tugas -->
          <div v-for="task in tasks" :key="task.id" class="grid border-b border-gray-300" :style="gridTemplate">
            <!-- Nama Proyek -->
            <div class="p-2 font-semibold border-r border-gray-300 min-w-[200px] bg-white sticky left-0 z-10">
              {{ task.name }}
            </div>

            <!-- Status Per Hari -->
            <div v-for="day in daysInMonth" :key="day.date" class="p-2 text-center border-r border-gray-300">
              <span
                v-if="isInRange(task, day.date)"
                class="px-2 py-1 text-xs text-white"
                :class="[
                  task.status,
                  day.date === task.startDate ? 'rounded-l' : '',
                  day.date === task.endDate ? 'rounded-r' : '',
                ]"
              >
                {{ task.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

// Hitung jumlah hari dalam bulan ini
const getDaysInMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const totalDays = new Date(year, month + 1, 0).getDate();

  return Array.from({ length: totalDays }, (_, i) => {
    const date = new Date(year, month, i + 1);
    return {
      index: i + 1,
      date: date.toISOString().split("T")[0],
    };
  });
};

// Daftar proyek / tugas (data dummy)
const tasks = computed(() => [
  { id: 1, name: "Landing Page", status: "bg-green-500", startDate: "2025-01-03", endDate: "2025-01-04" },
  { id: 2, name: "API Backend", status: "bg-yellow-500", startDate: "2025-01-10", endDate: "2025-01-12" },
  { id: 3, name: "Mobile App", status: "bg-blue-500", startDate: "2025-01-15", endDate: "2025-01-18" },
  { id: 4, name: "Testing", status: "bg-red-500", startDate: "2025-01-25", endDate: "2025-01-27" },
]);

// Data computed untuk looping di template
const daysInMonth = computed(() => getDaysInMonth());

// CSS Grid Dynamic untuk jumlah hari dalam bulan
const gridTemplate = computed(() => {
  return `grid-template-columns: 200px repeat(${daysInMonth.value.length}, 1fr);`;
});

// Fungsi untuk mengecek apakah hari termasuk dalam rentang tugas
const isInRange = (task, date) => {
  return date >= task.startDate && date <= task.endDate;
};
</script>
