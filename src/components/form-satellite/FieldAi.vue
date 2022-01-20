<script lang="ts" setup>
import { computed, reactive } from "vue";

const props = withDefaults(
	defineProps<{
		fieldId: string;
		modelValue: boolean;
		theme?: "dark" | "light";
		label?: string;
	}>(),
	{ label: "Artifical Inteligence?", theme: "dark" }
);

const emits = defineEmits(["update:modelValue"]);

const theme = reactive({
	boxShadow: computed(() => {
		const v = props.theme == "light" ? "#00171f1a" : "#ffffff1a";
		return v;
	}),
	color: computed(() => {
		const v = props.theme == "light" ? "#00171f" : "#ffffff";
		return v;
	}),
});

const emitValue = (e: Event) => {
	const target = e.target as HTMLInputElement;
	emits("update:modelValue", target.checked);
};
</script>

<template>
	<div class="base-form-checkbox" :class="{ checked: modelValue }">
		<label class="base-form-checkbox__label"> {{ label }}</label>
		<input
			hidden
			type="checkbox"
			:id="`base-form-checkbox-${fieldId}`"
			:checked="modelValue"
			@input="emitValue"
		/>
		<label
			tabindex="0"
			@keyup.enter="() => emits('update:modelValue', !modelValue)"
			class="base-form-checkbox__fake-checkbox"
			:for="`base-form-checkbox-${fieldId}`"
		>
			<span class="material-icons">done</span>
		</label>
	</div>
</template>

<style lang="scss" scoped>
.base-form-checkbox {
	display: grid;
	width: 100%;
	&__label {
		font-size: 2.4rem;
		margin-bottom: 1rem;
	}
	&__fake-checkbox {
		cursor: pointer;
		display: grid;
		place-items: center;
		margin-left: 0.2rem;
		width: 3rem;
		height: 3rem;
		color: transparent;
		box-shadow: 0px 0px 0px 2px rgba($clr-white, 0.5); //
		* {
			pointer-events: none;
		}
	}
	&.checked .base-form-checkbox__fake-checkbox {
		background-color: rgba($clr-accent-green, 1);
		color: rgba($clr-white, 1); //
	}
}
</style>
