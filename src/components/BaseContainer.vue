<template>
	<div class="base-container">
		<slot></slot>
	</div>
</template>

<style lang="scss" scoped>
.base-container {
	display: flex;
	margin-inline: auto;
	padding-inline: 2rem;
	height: 100%;
	width: 100%;
	max-width: 140rem;
}
</style>
