import { computed } from "vue";

export function useCalendar() {
  const getDaysInMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: totalDays }, (_, i) => {
      const date = new Date(year, month, i + 1);
      const localDate = date.toLocaleDateString("en-CA"); // Format YYYY-MM-DD
      return {
        index: i + 1,
        date: localDate,
      };
    });
  };

  const daysInMonth = computed(() => getDaysInMonth());

  const gridTemplate = computed(() => {
    return `grid-template-columns: 200px repeat(${daysInMonth.value.length}, minmax(100px, auto));`;
  });

  const isInRange = (task, date) => {
    const taskStartDate = new Date(task.start);
    const taskEndDate = new Date(task.end);
    const targetDate = new Date(date);

    return targetDate >= taskStartDate && targetDate <= taskEndDate;
  };

  return {
    daysInMonth,
    gridTemplate,
    isInRange,
  };
}
