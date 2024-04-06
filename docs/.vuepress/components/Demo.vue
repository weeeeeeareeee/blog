<template>
	<div class="example">
		<div class="example-showcase">
			<ClientOnly>
				<component :is="demo" v-if="demo" v-bind="$attrs" />
			</ClientOnly>
		</div>
		<el-divider class="example-divider" />
		<div class="op-btns">
			<ElTooltip content="复制" :show-arrow="false" :trigger="['hover', 'focus']" :trigger-keys="[]">
				<el-button @click="copyCode">复制</el-button>
			</ElTooltip>
			<ElTooltip content="查看源代码" :show-arrow="false" :trigger="['hover', 'focus']" :trigger-keys="[]">
				<el-button @click="isShowSource = !isShowSource">查看源代码</el-button>
			</ElTooltip>
		</div>
		<ElCollapseTransition>
			<div class="example-source language-vue" v-show="isShowSource" v-html="decoded">
			</div>
		</ElCollapseTransition>
	</div>
</template>
<script setup>
import { computed, inject, ref, getCurrentInstance } from 'vue'
import { isClient, useClipboard, useToggle } from '@vueuse/core'
defineOptions({
	name: 'demo'
})

const props = defineProps({
	sourceFilePath: {
		type: [String, Number],
		default: ''
	},
	source: {
		type: String,
		default: ''
	},
	rawSource: {
		type: String,
		default: ''
	}
})
const vm = getCurrentInstance()

const demos = inject('demos') || {}

const demo = computed(() => demos[props.sourceFilePath] ?? {})

const isShowSource = ref(false)

const decoded = computed(() => {
	return decodeURIComponent(`<pre v-pre><code>${props.source}</code></pre>`)
})

const { copy, isSupported } = useClipboard({
	source: decodeURIComponent(props.rawSource),
	read: false,
})

const copyCode = async () => {
	const { $message } = vm.appContext.config.globalProperties
	if (!isSupported) {
		$message.error('复制失败')
	}
	try {
		await copy()
		$message.success('复制成功')
	} catch (e) {
		$message.error(e.message)
	}
}


</script>
<style lang='scss'>
.example {
	border: 1px solid var(--c-border);
	border-radius: var(--el-border-radius-base);
	margin-top: 5px;

	&-showcase {
		padding: 1.5rem;
		margin: 0.5px;
		background-color: var(--bg-color);
	}

	&-source {
		background-color: var(--c-bg-light);
		transition: all 0.3s ease-in-out;
	}

	&-divider {
		margin: 0;
	}

	.language-vue {
		margin: 0;
	}

	.op-btns {
		padding: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		height: 2.5rem;
	}
}
</style>