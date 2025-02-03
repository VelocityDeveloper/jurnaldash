<template>

<span>
  {{ value }}
</span>

</template>

<script setup lang="ts">

const props = defineProps(['value'])
const value = props.value

</script>