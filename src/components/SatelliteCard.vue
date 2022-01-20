<script lang="ts" setup>
import { Satellite } from "@/@types";
import BaseButton from "./BaseButton.vue";

defineEmits(["deleteSatellite", "openEditMode"]);
withDefaults(
	defineProps<{
		satellite: Satellite;
	}>(),
	{}
);
</script>

<template>
	<div class="satellite-card">
		<div class="data">
			<div class="data__cool-img-container">
				<img
					src="@/assets/satellite-icon.svg"
					alt="Icon representing a satellite"
				/>
			</div>
			<div class="data__info">
				<ul class="data__info__basic">
					<span>Producent information</span>
					<li>
						Producent: <span>{{ satellite.producent }}</span>
					</li>
					<li>
						Model: <span>{{ satellite.model }}</span>
					</li>
					<li>
						Side number: <span>{{ satellite.sideNumber }}</span>
					</li>
					<li>
						Production year: <span>{{ satellite.builtAt }}</span>
					</li>
				</ul>
				<ul class="data__info__military">
					<span>Military data</span>
					<li>
						Launched: <span>{{ satellite.launchedAt }}</span>
					</li>
					<li>
						Current software version: <span>{{ satellite.version }}</span>
					</li>
					<li>
						Artificial Inteligence: <span>{{ satellite.isAI }}</span>
					</li>
					<li>
						Number of missiles: <span>{{ satellite.numberOfMissiles }}</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="actions">
			<base-button
				@click="$emit('openEditMode', satellite)"
				@keyup.enter="$emit('openEditMode')"
				only-icon
				icon="edit"
				dense
			/>
			<base-button
				@click="$emit('deleteSatellite', satellite._id)"
				@keyup.enter="$emit('deleteSatellite')"
				only-icon
				icon="delete"
				dense
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
.satellite-card {
	$box-shadow: 0px 0px 10px 0px rgba($clr-primary, 0.15),
		inset 0px 0px 100px 0px rgba($clr-primary, 0.05);

	isolation: isolate;
	position: relative;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: auto 1fr;
	grid-template-areas: "actions" "data";
	padding: 2rem;
	row-gap: 2rem;
	width: 100%;
	max-width: 100rem;
	box-shadow: $box-shadow;
	.actions {
		grid-area: actions;
		display: flex;
		justify-content: flex-end;
		column-gap: 1rem;
		padding-block-end: 1rem;
		border-bottom: 2px solid rgba($clr-primary, 1);
	}
	.data {
		grid-area: data;
		display: grid;
		grid-template-columns: 1fr;
		@include mq(tablet-large) {
			grid-template-columns: 20rem 1fr;
			column-gap: 2rem;
		}

		&__cool-img-container {
			position: absolute;
			inset: 0;
			z-index: -1;
			opacity: 0.05;
			overflow: hidden;
			@include mq(tablet-large) {
				opacity: 1;
				position: static;
			}
		}
		&__info {
			display: flex;
			font-size: 2.4rem;
			gap: 4rem;
			flex-wrap: wrap;
			justify-content: center;
			& > ul {
				min-width: 30rem;
				margin-block: 0;
				padding-inline-start: 0;
				list-style-type: none;
				@include mq(tablet) {
					min-width: unset;
				}
				& > li {
					margin-inline-start: none;
					& > span {
						font-weight: 700;
					}
				}
				& > span:first-child {
					font-family: $ff-accent;
				}
			}
		}
	}
}
</style>
