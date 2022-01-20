<script lang="ts" setup>
import { computed, ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const props = withDefaults(
	defineProps<{
		active: boolean;
		side?: "left" | "right";
	}>(),
	{
		side: "left",
		active: false,
	}
);
const emits = defineEmits(["closePanel"]);

const panel = ref(null);
const transition = computed(() => {
	return props.side;
});

onClickOutside(panel, () => {
	emits("closePanel");
});
</script>

<template>
	<transition :name="transition">
		<aside v-if="active" ref="panel" class="base-aside-wrapper" :class="side">
			<header>
				<button @click="$emit('closePanel')" @keyup.enter="$emit('closePanel')">
					<span class="material-icons">close</span>
				</button>
				<div><slot name="header-message"></slot></div>
			</header>
			<slot></slot>
		</aside>
	</transition>
</template>

<style lang="scss" scoped>
.base-aside-wrapper {
	z-index: 99;
	position: fixed;
	top: 8rem;
	bottom: 0;
	width: clamp(24rem, 100%, 50rem);
	background-color: rgba($clr-primary, 1);
	color: rgba($clr-white, 1);
	padding-block: 1rem;
	padding-inline: 1rem;
	& > header {
		display: flex;
		column-gap: 1rem;
		& > div {
			text-align: center;
			font-size: 2.4rem;
			display: inline-block;
			width: 100%;
			font-family: $ff-accent;
		}
		& > button {
			cursor: pointer;
			display: grid;
			place-items: center;
			height: 4rem;
			width: 4rem;
			background-color: rgba($clr-primary, 1);
			color: rgba($clr-primary, 1);
			border-radius: 1rem;
			box-shadow: inset 0px 0px 100px 0px rgba($clr-white, 0.5);
			transition: all 220ms ease;
			&:hover {
				background-color: rgba($clr-white, 1);
			}
			@include apply-focus($inverse: true) {
				color: rgba($clr-white, 1);
			}
			&:focus:hover {
				color: rgba($clr-primary, 1);
			}
		}
	}
	&.left > header {
		flex-direction: row-reverse;
		// justify-content: flex-end;
	}
	&.right > header {
		justify-content: flex-start;
	}
}

.base-aside-wrapper.left {
	left: 0;
	box-shadow: 2px 0px 4px 0px rgba($clr-white, 0.35),
		2px 0px 6px 0px rgba($clr-primary, 0.75);
}
.base-aside-wrapper.right {
	right: 0;
	box-shadow: -2px 0px 4px 0px rgba($clr-white, 0.35),
		-2px 0px 6px 0px rgba($clr-primary, 0.75);
}
</style>
