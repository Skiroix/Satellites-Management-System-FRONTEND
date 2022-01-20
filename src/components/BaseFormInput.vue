<script lang="ts" setup>
import { computed, reactive } from "vue";

const props = withDefaults(
	defineProps<{
		label: string;
		modelValue: string | number;
		error: string;
		fieldId: string;
		type?: "password" | "text" | "number";
		theme?: "light" | "dark";
		placeholder?: string;
	}>(),
	{
		label: "Default label",
		type: "text",
		theme: "light",
	}
);

const isErrorClass = computed(() => (props.error != "" ? "error" : ""));
const theme = reactive({
	bgColor: computed(() => {
		const v = props.theme == "light" ? "#00171f1a" : "#ffffff1a";
		return v;
	}),
	color: computed(() => {
		const v = props.theme == "light" ? "#00171f" : "#ffffff";
		return v;
	}),
});

const emits = defineEmits(["update:modelValue"]);

const emitValue = (e: Event) => {
	const target = e.target as HTMLInputElement;
	emits("update:modelValue", target.value);
};
</script>

<template>
	<div class="base-form-input" :class="isErrorClass">
		<label class="base-form-input__label" :for="fieldId">{{
			$props.label
		}}</label>
		<div class="base-form-input__input" :id="fieldId">
			<input
				:placeholder="placeholder"
				autocomplete="dsdsdsds"
				:type="$props.type"
				@input="emitValue"
				:value="$props.modelValue"
			/>
		</div>
		<div class="base-form-input__errors">
			{{ error }}
		</div>
	</div>
</template>

<style lang="scss" scoped>
.base-form-input {
	display: grid;
	width: 100%;
	// margin-block-end: 2rem;
	&__label {
		font-size: 2.4rem;
		margin-bottom: 1rem;
	}
	&__input {
		display: flex;
		width: 100%;
		// background-color: rgba($clr-primary, 0.1);
		background-color: v-bind("theme.bgColor");
		border: 2px solid transparent;
		margin-block-end: 1rem;
		& > input {
			border: none;
			outline: none;
			padding-block: 0.5em;
			padding-inline: 0.2em;
			width: 100%;
			background-color: transparent;
			font-size: 2rem;
			color: v-bind("theme.color");
		}
		& > input::-webkit-outer-spin-button,
		& > input::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
		& > input[type="number"] {
			-moz-appearance: textfield;
		}
	}
	&__errors {
		height: 1.6rem;
		font-size: 1.4rem;
		color: rgba($clr-accent-red, 1);
	}

	&.error .base-form-input__input {
		border-color: rgba($clr-accent-red, 0.5);
	}
}
</style>
