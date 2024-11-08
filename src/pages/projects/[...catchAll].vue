<script setup lang="ts">
import { ref } from 'vue'

const message = ref('404 Not Found')
</script>
<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>
