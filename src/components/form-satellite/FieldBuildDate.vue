<script lang="ts" setup>
import { debouncedWatch } from "@vueuse/core";
import { reactive, toRef } from "vue";
import BaseFormInput from "../BaseFormInput.vue";

// const CURRENT_YEAR = new Date().getFullYear();

const props = withDefaults(
	defineProps<{
		modelValue: number;
		minYear?: number;
		maxYear?: number;
	}>(),
	{
		minYear: 1900,
		maxYear: new Date().getFullYear(),
	}
);

const emits = defineEmits(["update:modelValue"]);

const state = reactive({
	value: props.maxYear,
});

debouncedWatch(
	toRef(state, "value"),
	(cVal) => {
		if (cVal > props.maxYear) {
			state.value = props.maxYear;
			emits("update:modelValue", props.maxYear);
		} else if (cVal < 1900) {
			state.value = props.minYear;
			emits("update:modelValue", props.minYear);
		} else emits("update:modelValue", cVal);
	},
	{ debounce: 2000 }
);
</script>

<template>
	<BaseFormInput
		class="input"
		label="Production year"
		v-model.number="state.value"
		type="number"
		field-id="field-production-date"
		error=""
		theme="dark"
	/>
</template>
