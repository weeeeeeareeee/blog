<template>
  <div v-for=" item in columns">
    <ElButton>
      {{ item.name }}
    </ElButton>
  </div>
</template>
<script setup lang="ts">
const columns = [
  { name: "1", label: "1" },
  { name: "2", label: "2" },
  { name: "3", label: "3" },
  { name: "4", label: "4" },
  { name: "5", label: "5" },
  { name: "6", label: "6" },
  { name: "7", label: "77" },
];
</script>
