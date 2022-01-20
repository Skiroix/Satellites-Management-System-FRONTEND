<script lang="ts" setup>
import getCountries from "@/composables/getCountries";
import { computed } from "vue";

const props = defineProps<{
	modelValue: string;
}>();

const emits = defineEmits(["update:modelValue", "countryError"]);
const countries = getCountries();

const searchMatch = computed(() => {
	const query = props.modelValue.trim();
	if (query == "") return [];

	const regexp = new RegExp(query.toLowerCase());
	const matches = Object.values(countries).filter((country) =>
		country.toLowerCase().trim().match(regexp)
	);
	if (matches.length == 1 && matches[0].toLowerCase() === query.toLowerCase())
		return [];
	// else if (matches.length < 1) emitError(true);
	else emitError(false);
	return matches.filter((_, index) => index <= 6);
});

const emitError = (err: boolean) => emits("countryError", err);

const emitValue = (e: Event) => {
	const target = e.target as HTMLInputElement;
	emits("update:modelValue", target.value);
};

const setThisValue = (value: string) => {
	emits("update:modelValue", value);
};
</script>

<template>
	<div class="base-form-input">
		<label class="base-form-input__label" for="base-form-input-countries"
			>Country</label
		>
		<div class="base-form-input__input" id="base-form-input-countries">
			<input :value="modelValue" @input="emitValue" autocomplete="dsdsdsds" />
		</div>
		<div class="search-results">
			<div
				v-for="item in searchMatch"
				@click="setThisValue(item)"
				@keyup.enter="setThisValue(item)"
				:key="item"
				tabindex="0"
				class="item"
			>
				{{ item }}
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.base-form-input {
	position: relative;
	display: grid;
	width: 100%;
	isolation: isolate;
	&:not(:focus-within) .search-results {
		display: none;
	}
	&__label {
		font-size: 2.4rem;
		margin-bottom: 1rem;
	}
	&__input {
		display: flex;
		width: 100%;
		background-color: rgba($clr-primary, 0.1);
		border: 2px solid transparent;
		margin-block-end: 1rem;
		isolation: isolate;
		& > input {
			border: none;
			outline: none;
			padding-block: 0.5em;
			padding-inline: 0.2em;
			width: 100%;
			background-color: transparent;
			font-size: 2rem;
		}
	}
}

.search-results {
	z-index: 1;
	position: absolute;
	top: 100%;
	width: 100%;
	background-color: rgba($clr-primary, 1);
	color: rgba($clr-white, 1);
	font-size: 2rem;
	& > div {
		cursor: pointer;
		padding-block: 0.5rem;
		padding-inline: 1rem;
		text-transform: uppercase;
		&:hover,
		&:focus {
			outline: none;
			background-color: rgba($clr-white, 0.1);
		}
	}
}
</style>
