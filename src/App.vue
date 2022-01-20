<script setup lang="ts">
import { useStore } from "./store";

const { dispatch } = useStore();

dispatch("reviveUserSession");
</script>

<template>
	<div id="error-message"></div>
	<router-view></router-view>
</template>

<style lang="scss">
@import "./scss/reset.scss";
#error-message {
	z-index: 100;
	position: fixed;
	top: 1rem;
	left: 50%;
	transform: translateX(-50%);
	font-family: $ff-accent;
	font-size: 1.6rem;
	text-transform: uppercase;
	color: rgba($clr-accent-red, 1);
	& > div {
		padding-inline: 2rem;
		padding-block: 1rem;
		background-color: rgba($clr-white, 1);
	}
}
</style>
