<script lang="ts" setup>
import BasePageWrapper from "@/components/BasePageWrapper.vue";
import AddSatellite from "@/components/AddSatellite.vue";
import UpdateSatellite from "@/components/UpdateSatellite.vue";
import { computed, onActivated, onMounted, reactive, ref } from "vue";
import { useStore } from "@/store";
import { Satellite } from "@/@types";
import SatelliteCard from "@/components/SatelliteCard.vue";
import BaseButton from "@/components/BaseButton.vue";

const { getters, dispatch, commit } = useStore();
const panel = reactive({
	left: false,
	right: false,
});

const satellites = computed(() => getters.getSatellites);
const president = computed(() => getters.getCurrentUser);

const selectedSatellite = computed({
	get(): Satellite | null {
		return getters.getSelected;
	},
	set(value: Satellite | null): void {
		if (value) commit("SET_SELECTED", value);
		else commit("CLEAR_SELECTED");
	},
});

const closePanel = (side: "left" | "right") => {
	panel[side] = false;
	selectedSatellite.value = null;
};

const openInEditMode = (satellite: Satellite) => {
	selectedSatellite.value = satellite;
	panel.right = true;
};
const openCreatePanel = () => {
	panel.left = true;
};

const deleteSatellite = async (id: string) =>
	await dispatch("deleteSatellite", id);

onMounted(async () => {
	await dispatch("getSatellites");
});
onActivated(async () => {
	await dispatch("getSatellites");
});
</script>

<template>
	<base-page-wrapper>
		<add-satellite @close-panel="closePanel('left')" :active="panel.left" />

		<main>
			<teleport to="#create-satellite-button">
				<base-button
					@click="openCreatePanel"
					@keyup.enter="openCreatePanel"
					label="Add Satellite"
					icon="add"
					dense
					bgColor="#ffffff1a"
				/>
			</teleport>
			<header>
				<h1>Welcome {{ president ? president.fullName : "Mr. President" }}</h1>
				<h4>Your satellites are ready for your inspections.</h4>
			</header>
			<div class="board">
				<satellite-card
					@open-edit-mode="openInEditMode"
					@delete-satellite="deleteSatellite"
					v-for="(item, id) in satellites"
					:key="id"
					:satellite="item"
				/>
			</div>
		</main>
		<update-satellite
			@close-panel="closePanel('right')"
			:active="panel.right"
			side="right"
			:satellite="selectedSatellite"
		/>
	</base-page-wrapper>
</template>

<style lang="scss" scoped>
main {
	width: 100%;
	& > header {
		text-align: center;
	}
}
.board {
	display: flex;
	flex-direction: column;
	row-gap: 4rem;
	align-items: center;
	padding-block: 4rem;
}
</style>
