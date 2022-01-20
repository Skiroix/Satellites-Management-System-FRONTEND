<script setup lang="ts">
import { computed, h, reactive, resolveComponent, useSlots } from "vue";
import { RouteLocationRaw } from "vue-router";

interface Props {
	label?: string;
	icon?: string;
	type?: "button" | "submit" | "reset";
	to?: RouteLocationRaw;
	noIcon?: boolean;
	onlyIcon?: boolean;
	dense?: boolean;
	rounded?: boolean;
	letterSpacing?: boolean;
	square?: boolean;
	disabled?: boolean;
	noShadow?: boolean;
	loading?: boolean;
	bgColor?: string;
}

const slots = useSlots();

const props = withDefaults(defineProps<Props>(), {
	label: "Button",
	icon: "face",
	type: "button",
	noIcon: false,
	onlyIcon: false,
	dense: false,
	rounded: false,
	letterSpacing: false,
	square: false,
	disabled: false,
	noShadow: false,
	loading: false,
});

const style = reactive({
	borderRadius: computed(() => {
		if (props.square) {
			return "none";
		} else if (props.rounded && props.onlyIcon) {
			return "100%";
		} else return "1rem";
	}),
	letterSpacing: computed(() => {
		if (props.letterSpacing) return "0.1em";
		return "none";
	}),
	paddingInline: computed(() => (props.dense ? ".6rem" : "1.4rem")),
	paddingBlock: computed(() => (props.dense ? ".6rem" : "1.4rem")),
	bgColor: computed(() => (props.bgColor ? props.bgColor : "#00171f")),
	// height: computed(() => (props.dense ? "4rem" : "5.6rem")),
	boxShadow: computed(() =>
		props.noShadow ? "none" : "0px 0px 10px #073b4c59"
	),
});

const renderIcon = () =>
	h("span", { class: "base-button__icon material-icons" }, props.icon);

const renderLabel = () =>
	h("span", { class: "base-button__label" }, props.label);

const renderChildren = () => {
	if (props.onlyIcon) return renderIcon();
	else if (props.noIcon) return renderLabel();
	else return [renderLabel(), renderIcon()];
};
const render = () => {
	if (props.to)
		return h(
			resolveComponent("RouterLink"),
			{ class: "base-button", to: props.to },
			() => (slots.default ? slots.default() : renderChildren())
		);
	else
		return h(
			"button",
			{ class: "base-button", disabled: props.disabled },
			slots.default ? slots.default() : renderChildren()
		);
};
</script>

<template>
	<render />
</template>

<style lang="scss">
.base-button {
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	column-gap: 0.25em;
	padding-inline: v-bind("style.paddingInline");
	padding-block: v-bind("style.paddingBlock");
	// height: v-bind("style.height");
	width: fit-content;
	min-width: 12rem;
	background-color: v-bind("style.bgColor");
	font-size: 1.6rem;
	font-family: $ff-accent;
	text-transform: uppercase;
	text-decoration: none;
	line-height: 2.4rem;
	letter-spacing: v-bind("style.letterSpacing");
	color: rgba($clr-white, 1);
	border-radius: v-bind("style.borderRadius");
	box-shadow: v-bind("style.boxShadow");
	@include apply-focus($inverse: true) {
		transform: scale(0.95);
	}
	&:hover {
		transform: scale(0.95);
	}
	&:disabled {
		cursor: not-allowed;
		opacity: 0.6;
	}
}
</style>
