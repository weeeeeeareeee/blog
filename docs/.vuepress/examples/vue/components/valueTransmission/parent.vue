<template>
    <div class="valueTransmission-wrapper">
        <son v-model="value" :a="1" :b="2" :c="3" placeholder="123">
            <template #prepend>
                Http://
            </template>
        </son>
    </div>
</template>
<script setup>
import son from "./son.vue";
import { ref } from "vue";

const value = ref("")
</script>
<style lang='scss'>
.valueTransmission-wrapper {
    padding: 20px;
}
</style>