<template>
	<form class="form-container">
		<header class="form-header" v-if="$slots.header">
			<slot name="header"></slot>
		</header>
		<div class="form-body">
			<slot></slot>
		</div>
		<footer class="form-footer" v-if="$slots.footer">
			<slot name="footer"></slot>
		</footer>
	</form>
</template>

<style lang="scss" scoped>
.form-body {
	display: flex;
	flex-direction: column;
	row-gap: 1rem;
	// padding-block-end: 8rem;
}
</style>
