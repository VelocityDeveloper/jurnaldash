import { computed } from "vue";

export function useCalendar() {
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

  const daysInMonth = computed(() => getDaysInMonth());

  const gridTemplate = computed(() => {
    return `grid-template-columns: 200px repeat(${daysInMonth.value.length}, minmax(100px, auto));`;
  });

  const isInRange = (task, date) => {
    const taskStartDate = new Date(task.startDate);
    const taskEndDate = new Date(task.endDate);
    const targetDate = new Date(date);

    taskStartDate.setHours(0, 0, 0, 0);
    taskEndDate.setHours(23, 59, 59, 999);
    targetDate.setHours(0, 0, 0, 0);

    return targetDate >= taskStartDate && targetDate <= taskEndDate;
  };

  return {
    daysInMonth,
    gridTemplate,
    isInRange,
  };
}
