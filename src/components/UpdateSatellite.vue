<script setup lang="ts">
import { computed, onActivated, reactive, ref, toRef, watch } from "vue";
import { useStore } from "@/store";
import { Satellite, UpdateSatellitePayload } from "@/@types";
import BaseAsideWrapper from "./BaseAsideWrapper.vue";
import BaseButton from "./BaseButton.vue";
import BaseForm from "./BaseForm.vue";
import FieldBuildDate from "./form-satellite/FieldBuildDate.vue";
import FieldLauchDate from "./form-satellite/FieldLauchDate.vue";
import BaseFormInput from "./BaseFormInput.vue";
import FieldMissiles from "./form-satellite/FieldMissiles.vue";
import FieldOrbitAltitude from "./form-satellite/FieldOrbitAltitude.vue";
import FieldAi from "./form-satellite/FieldAi.vue";

const props = withDefaults(
	defineProps<{
		satellite: Satellite | null;
	}>(),
	{}
);

const { dispatch } = useStore();

const initial = reactive({
	builtAt: computed(() => props.satellite?.builtAt ?? 0),
	launchedAt: computed(() => props.satellite?.launchedAt ?? ""),
	sideNumber: computed(() => props.satellite?.sideNumber ?? ""),
	model: computed(() => props.satellite?.model ?? ""),
	producent: computed(() => props.satellite?.producent ?? ""),
	version: computed(() => props.satellite?.version ?? ""),
	numberOfMissiles: computed(() => props.satellite?.numberOfMissiles ?? 0),
	orbitAltitude: computed(() => props.satellite?.orbitAltitude ?? 0),
	isAI: computed(() => props.satellite?.isAI ?? false),
});

const builtAt = reactive({
	value: 0,
	error: true,
});
const launchedAt = reactive({
	value: "",
	error: true,
});
const sideNumber = reactive({
	value: "",
	error: true,
});
const model = reactive({
	value: "",
	error: true,
});
const producent = reactive({
	value: "",
	error: true,
});
const version = reactive({
	value: "",
	error: true,
});
const numberOfMissiles = reactive({
	value: 0,
	error: true,
});
const orbitAltitude = reactive({
	value: 0,
	error: true,
});
const isAI = reactive({
	value: false,
	error: true,
});

const errorMessage = ref("");
const successMessage = ref("");

watch(toRef(builtAt, "value"), (c) => {
	if (c == initial.builtAt) builtAt.error = true;
	else if (c === 0) builtAt.error = true;
	else builtAt.error = false;
});
watch(toRef(launchedAt, "value"), (c) => {
	if (c === initial.launchedAt) launchedAt.error = true;
	else if (c == "") launchedAt.error = true;
	else launchedAt.error = false;
});
watch(toRef(sideNumber, "value"), (c) => {
	if (c === initial.sideNumber) sideNumber.error = true;
	else if (c == "") sideNumber.error = true;
	else sideNumber.error = false;
});
watch(toRef(model, "value"), (c) => {
	if (c === initial.model) model.error = true;
	else if (c == "") model.error = true;
	else model.error = false;
});
watch(toRef(producent, "value"), (c) => {
	if (c === initial.producent) producent.error = true;
	else if (c == "") producent.error = true;
	else producent.error = false;
});
watch(toRef(version, "value"), (c) => {
	if (c === initial.version) version.error = true;
	else if (c == "") version.error = true;
	else version.error = false;
});
watch(toRef(numberOfMissiles, "value"), (c) => {
	if (c === initial.numberOfMissiles) numberOfMissiles.error = true;
	else if (c === 0) numberOfMissiles.error = true;
	else numberOfMissiles.error = false;
});
watch(toRef(orbitAltitude, "value"), (c) => {
	if (c === initial.orbitAltitude) orbitAltitude.error = true;
	else if (c < 100) orbitAltitude.error = true;
	else orbitAltitude.error = false;
});
watch(toRef(isAI, "value"), (c) => {
	if (c === initial.isAI) isAI.error = true;
	else isAI.error = false;
});
watch(props, (c) => setupStates(), { immediate: true });

function setupStates() {
	if (props.satellite == null) return;
	const i = { ...initial };

	builtAt.value = i.builtAt;
	launchedAt.value = i.launchedAt;
	sideNumber.value = i.sideNumber;
	model.value = i.model;
	producent.value = i.producent;
	version.value = i.version;
	numberOfMissiles.value = i.numberOfMissiles;
	orbitAltitude.value = i.orbitAltitude;
	isAI.value = i.isAI;
}

function handleErrorSwitch(
	key: keyof Omit<UpdateSatellitePayload, "satelliteId">
) {
	switch (key) {
		case "builtAt":
			builtAt.error = true;
			break;
		case "launchedAt":
			launchedAt.error = true;
			break;
		case "sideNumber":
			sideNumber.error = true;
			break;
		case "model":
			model.error = true;
			break;
		case "producent":
			producent.error = true;
			break;
		case "version":
			version.error = true;
			break;
		case "numberOfMissiles":
			numberOfMissiles.error = true;
			break;
		case "orbitAltitude":
			orbitAltitude.error = true;
			break;
		case "isAI":
			isAI.error = true;
			break;
		default:
			return;
	}
}

const updateSatellite = async (
	key: keyof Omit<UpdateSatellitePayload, "satelliteId">,
	value: any
) => {
	try {
		const requestPayload: UpdateSatellitePayload = {
			satelliteId: props.satellite!._id,
		};
		requestPayload[key] = value;
		if (!(await dispatch("updateSatellite", requestPayload)))
			throw new Error("Error while updating satellite's data!");
		else {
			successMessage.value = "Satellite's data updated!";
			handleErrorSwitch(key);
		}
	} catch ({ message }) {
		errorMessage.value = message as string;
	} finally {
		setTimeout(() => {
			errorMessage.value = "";
			successMessage.value = "";
		}, 1000);
	}
};
</script>

<template>
	<base-aside-wrapper>
		<template #header-message>
			<span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
			<span v-if="successMessage" class="success-message">{{
				successMessage
			}}</span>
		</template>
		<div class="forms-container">
			<base-form
				class="forms-container__form"
				@submit.prevent="() => updateSatellite('producent', producent.value)"
			>
				<template #default>
					<base-form-input
						label="Producent"
						v-model="producent.value"
						theme="dark"
						error=""
						field-id="field-producent"
						placeholder="General Electronics"
					/>
					<base-button
						:disabled="producent.error"
						type="submit"
						class="forms-container__form__submit"
						dense
						label="Update"
						no-icon
						bg-color="#ffffff1a"
					/>
				</template>
			</base-form>
			<base-form
				class="forms-container__form"
				@submit.prevent="() => updateSatellite('model', model.value)"
			>
				<template #default>
					<base-form-input
						label="Model"
						v-model="model.value"
						theme="dark"
						error=""
						field-id="field-model"
						placeholder="Storm"
					/>
					<base-button
						:disabled="model.error"
						type="submit"
						class="forms-container__form__submit"
						dense
						label="Update"
						no-icon
						bg-color="#ffffff1a"
					/>
				</template>
			</base-form>
			<base-form
				class="forms-container__form"
				@submit.prevent="() => updateSatellite('sideNumber', sideNumber.value)"
			>
				<template #default>
					<base-form-input
						label="Side number"
						v-model="sideNumber.value"
						theme="dark"
						error=""
						field-id="field-sideNumber"
						placeholder="US001"
					/>
					<base-button
						:disabled="sideNumber.error"
						type="submit"
						class="forms-container__form__submit"
						dense
						label="Update"
						no-icon
						bg-color="#ffffff1a"
					/>
				</template>
			</base-form>
			<base-form
				class="forms-container__form"
				@submit.prevent="() => updateSatellite('version', version.value)"
			>
				<template #default>
					<base-form-input
						label="Software version"
						v-model="version.value"
						theme="dark"
						error=""
						field-id="field-version"
						placeholder="v81"
					/>
					<base-button
						:disabled="version.error"
						type="submit"
						class="forms-container__form__submit"
						dense
						label="Update"
						no-icon
						bg-color="#ffffff1a"
					/>
				</template>
			</base-form>
			<base-form
				class="forms-container__form"
				@submit.prevent="() => updateSatellite('builtAt', builtAt.value)"
			>
				<template #default>
					<field-build-date v-model:modelValue="builtAt.value" theme="dark" />
					<base-button
						:disabled="builtAt.error"
						type="submit"
						class="forms-container__form__submit"
						dense
						label="Update"
						no-icon
						bg-color="#ffffff1a"
					/>
				</template>
			</base-form>
			<base-form
				class="forms-container__form"
				@submit.prevent="
					() => updateSatellite('numberOfMissiles', numberOfMissiles.value)
				"
			>
				<template #default>
					<field-missiles v-model.number="numberOfMissiles.value" />
					<base-button
						:disabled="numberOfMissiles.error"
						type="submit"
						class="forms-container__form__submit"
						dense
						label="Update"
						no-icon
						bg-color="#ffffff1a"
					/>
				</template>
			</base-form>
			<base-form
				class="forms-container__form"
				@submit.prevent="() => updateSatellite('launchedAt', launchedAt.value)"
			>
				<template #default>
					<field-lauch-date v-model="launchedAt.value" theme="dark" />
					<base-button
						:disabled="launchedAt.error"
						type="submit"
						class="forms-container__form__submit"
						dense
						label="Update"
						no-icon
						bg-color="#ffffff1a"
					/>
				</template>
			</base-form>
			<base-form
				class="forms-container__form"
				@submit.prevent="
					() => updateSatellite('orbitAltitude', orbitAltitude.value)
				"
			>
				<template #default>
					<field-orbit-altitude v-model="orbitAltitude.value" theme="dark" />
					<base-button
						:disabled="orbitAltitude.error"
						type="submit"
						class="forms-container__form__submit"
						dense
						label="Update"
						no-icon
						bg-color="#ffffff1a"
					/>
				</template>
			</base-form>
			<base-form
				class="forms-container__form"
				@submit.prevent="() => updateSatellite('isAI', isAI.value)"
			>
				<template #default>
					<field-ai v-model="isAI.value" theme="dark" field-id="field-ai" />
					<base-button
						:disabled="isAI.error"
						type="submit"
						class="forms-container__form__submit"
						dense
						label="Update"
						no-icon
						bg-color="#ffffff1a"
					/>
				</template>
			</base-form>
		</div>
	</base-aside-wrapper>
</template>

<style lang="scss" scoped>
.error-message {
	color: rgba($clr-accent-red, 1);
}
.success-message {
	color: rgba($clr-accent-green, 1);
}
.forms-container {
	overflow-y: scroll;
	margin-block-start: 2rem;
	height: calc(100vh - 18rem); // im not sure why this needs to be set here ;/
	scrollbar-width: thick;
	scrollbar-color: $clr-white transparent;

	&::-webkit-scrollbar {
		width: 0.6rem;
	}

	&::-webkit-scrollbar-thumb {
		background-color: $clr-white;
		border-radius: 1rem;
	}

	&__form {
		padding-block: 2rem;
		& + & {
			border-top: 1px solid rgba($clr-white, 0.25);
			margin-top: 4rem;
		}
		&__submit {
			margin-inline: auto;
		}
	}
}
</style>
