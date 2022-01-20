<script setup lang="ts">
import { computed, reactive } from "vue";

const emits = defineEmits(["update:modelValue"]);
const props = withDefaults(
	defineProps<{
		modelValue: string;
		theme?: "light" | "dark";
	}>(),
	{
		theme: "light",
	}
);

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

const arr = new Date().toLocaleDateString().split(".");
const maxDate = `${arr[2]}-${arr[1]}-${arr[0]}`;

const updateDate = (e: Event) => {
	const target = e.target as HTMLInputElement;
	emits("update:modelValue", target.value);
};
</script>

<template>
	<div class="field-date-picker">
		<label class="field-date-picker__label" for="form-field-lauch-date"
			>Lauch Date</label
		>
		<div class="field-date-picker__input-wrapper">
			<input
				@input="updateDate"
				type="date"
				id="form-field-lauch-date"
				min="1970-01-01"
				:value="modelValue"
				:max="maxDate"
			/>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.field-date-picker {
	display: grid;
	width: 100%;
	&__label {
		font-size: 2.4rem;
		margin-bottom: 1rem;
	}
	&__input-wrapper {
		display: flex;
		width: 100%;
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
		& > input::-webkit-calendar-picker-indicator {
			cursor: pointer;
			padding: 0.35rem;
			background-color: rgba($clr-white, 0.75);
			border-radius: 50%;
		}
		& > input::-webkit-outer-spin-button,
		& > input::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
	}
}
</style>
