<template>

  <Badge :severity="setSeverity(value)" class="capitalize">
     {{ value }}
  </Badge>

</template>

<script setup lang="ts">

const props = defineProps(['value'])
const value = props.value

const setSeverity = (value: any) => {   
  if(value == 'completed'){
    return 'success'
  } else if(value == 'cancelled'){
    return 'danger'
  } else if(value == 'archived'){
    return 'warn'
  } else {
    return 'secondary'
  }
}

</script>