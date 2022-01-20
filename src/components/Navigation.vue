<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "@/store";
import BaseContainer from "./BaseContainer.vue";
import BaseButton from "./BaseButton.vue";

const { getters, dispatch } = useStore();
const route = useRoute();
const router = useRouter();

const dynamicLink = computed(() => {
	const { name } = route;
	let _name: string, _icon: string;

	if (name == "Login") {
		_name = "Register";
		_icon = "account_circle";
	} else {
		_name = "Login";
		_icon = "login";
	}
	return { name: _name, icon: _icon };
});

const activeSession = computed(() => getters.isActiveSession);

const logoutUser = () => {
	dispatch("logoutUser");
	router.push({ name: "Login" });
};
</script>

<template>
	<header class="navigation">
		<base-container>
			<div class="navigation__links">
				<div id="create-satellite-button" class="--left"></div>
				<div class="--right">
					<base-button
						v-if="activeSession"
						@click="logoutUser"
						@keyup.enter="logoutUser"
						label="logout"
						dense
						icon="logout"
						bgColor="#ffffff1a"
					/>
					<router-link
						v-else
						class="link --light"
						:to="{ name: dynamicLink.name }"
						>{{ dynamicLink.name }}</router-link
					>
				</div>
			</div>
		</base-container>
	</header>
</template>

<style lang="scss" scoped>
.navigation {
	z-index: 99;
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	height: 8rem;
	background-color: rgba($clr-primary, 1);
	box-shadow: 0px 4px 10px 0px rgba($clr-primary, 0.35);
	&__links {
		font-size: 2.4rem;
		display: flex;
		align-items: center;
		column-gap: 1rem;
		height: 100%;
		width: 100%;
		& > .--right {
			margin-left: auto;
		}
		& > a {
			padding-inline: 1rem;
			padding-block: 0.5rem;
			&:hover {
				background-color: rgba($clr-white, 0.1);
			}
		}
	}
}
</style>
