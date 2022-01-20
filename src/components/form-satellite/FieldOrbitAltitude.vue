<script lang="ts" setup>
import { debouncedWatch } from "@vueuse/core";
import { reactive, toRef } from "vue";
import BaseFormInput from "../BaseFormInput.vue";

const props = withDefaults(
	defineProps<{
		modelValue: number;
		max?: number;
		min?: number;
		theme?: "dark" | "light";
	}>(),
	{
		min: 100,
		theme: "dark",
	}
);

const emits = defineEmits(["update:modelValue"]);

const state = reactive({
	value: props.modelValue,
});

debouncedWatch(
	toRef(state, "value"),
	(cVal) => {
		if (cVal < props.min) {
			state.value = props.min;
			emits("update:modelValue", props.min);
		} else if (props.max) {
			if (cVal > props.max) {
				state.value = props.max;
				emits("update:modelValue", props.max);
			}
		} else {
			state.value = cVal;
			emits("update:modelValue", cVal);
		}
	},
	{ debounce: 1000 }
);
</script>

<template>
	<BaseFormInput
		class="input"
		label="Orbit (km)"
		v-model.number="state.value"
		type="number"
		field-id="field-orbit-altitude"
		error=""
		:theme="theme"
	/>
</template>
