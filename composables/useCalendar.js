import { computed } from "vue";

export function useCalendar() {
  const getDaysInMonth = (year, month) => {
    const totalDays = new Date(year, month + 1, 0).getDate(); // Jumlah hari dalam bulan

    return Array.from({ length: totalDays }, (_, i) => {
      const date = new Date(year, month, i + 1); // Mulai dari tanggal 1
      const localDate = formatDateLocal(date); // Format: yyyy-mm-dd
      return {
        index: i + 1,
        date: localDate,
      };
    });
  };

  // Fungsi untuk memformat tanggal lokal tanpa timezone
  const formatDateLocal = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const daysInMonth = computed(() => {
    const now = new Date();
    const getDaysInMonthJJJ = getDaysInMonth(now.getFullYear(), now.getMonth());
    console.log(getDaysInMonthJJJ);
    return getDaysInMonthJJJ;
  });

  const gridTemplate = computed(() => {
    return `grid-template-columns: 200px repeat(${daysInMonth.value.length}, minmax(30px, auto));`;
  });

  const isInRange = (task, date) => {
    const taskStartDate = new Date(task.start);
    const taskEndDate = new Date(task.end);
    const targetDate = new Date(date);

    // Atur jam, menit, dan detik ke 0
    taskStartDate.setHours(0, 0, 0, 0);
    taskEndDate.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    return targetDate >= taskStartDate && targetDate <= taskEndDate;
  };

  return {
    daysInMonth,
    gridTemplate,
    isInRange,
  };
}
