<script lang="ts" setup>
import { debouncedWatch } from "@vueuse/core";
import { reactive, toRef } from "vue";
import BaseFormInput from "../BaseFormInput.vue";

const props = withDefaults(
	defineProps<{
		modelValue: number;
		max?: number;
	}>(),
	{}
);

const emits = defineEmits(["update:modelValue"]);

const state = reactive({
	value: props.modelValue,
});

debouncedWatch(
	toRef(state, "value"),
	(cVal) => {
		if (cVal.toString().length < 1) {
			state.value = 0;
			emits("update:modelValue", 0);
		}
		if (cVal < 0) {
			state.value = 0;
			emits("update:modelValue", 0);
		} else if (props.max) {
			if (cVal > props.max) {
				state.value = props.max;
				emits("update:modelValue", props.max);
			}
		} else {
			emits("update:modelValue", cVal);
		}
	},
	{ debounce: 1000 }
);
</script>

<template>
	<BaseFormInput
		class="input"
		label="Number of missiles"
		v-model.number="state.value"
		type="number"
		field-id="field-missiles"
		error=""
		theme="dark"
	/>
</template>
