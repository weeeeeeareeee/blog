<template>
    <div class="valueTransmission-wrapper">
        <ElInput v-bind="$attrs">
            <template v-for="(_, name) in $slots" #[name]="value">
                <slot :name="name" v-bind="value" />
            </template>
        </ElInput>
    </div>
</template>
<script setup>
import { ElInput } from 'element-plus'
import { getCurrentInstance } from 'vue';
console.log(getCurrentInstance().slots);
</script>
<style lang='scss'></style>