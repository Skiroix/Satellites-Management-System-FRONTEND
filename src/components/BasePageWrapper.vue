<script lang="ts" setup>
import BaseContainer from "./BaseContainer.vue";
</script>

<template>
	<div class="base-page-wrapper">
		<base-container>
			<slot></slot>
		</base-container>
	</div>
</template>

<style lang="scss" scoped>
.base-page-wrapper {
	overflow-y: auto;
	padding-top: 8rem;
	height: 100vh;
	width: 100%;
	background-color: $clr-white;
	color: $clr-primary;
}
</style>
