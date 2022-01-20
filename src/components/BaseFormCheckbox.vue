<script lang="ts" setup>
withDefaults(
	defineProps<{
		fieldId: string;
		label: string;
		modelValue: boolean;
	}>(),
	{ label: "Checkbox field" }
);

const emits = defineEmits(["update:modelValue"]);

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
		box-shadow: 0px 0px 0px 2px rgba($clr-primary, 1);
		width: 3rem;
		height: 3rem;
		* {
			pointer-events: none;
		}
	}
	&.checked .base-form-checkbox__fake-checkbox {
		background-color: rgba($clr-accent-green, 1);
		color: rgba($clr-white, 1);
	}
}
</style>
