<script setup lang="ts">
import { reactive, ref, toRef, watch } from "vue";
import BaseAsideWrapper from "./BaseAsideWrapper.vue";
import BaseButton from "./BaseButton.vue";
import BaseForm from "./BaseForm.vue";
import FieldBuildDate from "./form-satellite/FieldBuildDate.vue";
import FieldLauchDate from "./form-satellite/FieldLauchDate.vue";
import BaseFormInput from "./BaseFormInput.vue";
import FieldMissiles from "./form-satellite/FieldMissiles.vue";
import FieldOrbitAltitude from "./form-satellite/FieldOrbitAltitude.vue";
import FieldAi from "./form-satellite/FieldAi.vue";
import { useStore } from "@/store";
import { CreateSatellitePayload } from "@/@types";

const { dispatch } = useStore();

const form = reactive({
	builtAt: new Date().getFullYear(),
	launchedAt: "",
	sideNumber: "",
	model: "",
	producent: "",
	version: "",
	numberOfMissiles: 0,
	isAI: false,
	orbitAltitude: 0,
});

const errors = reactive({
	builtAt: true,
	launchedAt: true,
	sideNumber: true,
	model: true,
	producent: true,
	version: true,
	orbitAltitude: true,
});

const disableSubmit = ref(true);

watch(
	[
		toRef(form, "launchedAt"),
		toRef(form, "sideNumber"),
		toRef(form, "model"),
		toRef(form, "producent"),
		toRef(form, "version"),
		toRef(form, "builtAt"),
		toRef(form, "orbitAltitude"),
	],
	(c) => {
		const launchedAt = c[0];
		const sideNumber = c[1];
		const model = c[2];
		const producent = c[3];
		const version = c[4];
		const builtAt = c[5];
		const orbitAltitude = c[6];

		/* numberOfMissiles AREN'T VALIDATED BECAUSE 0 IS A VALID AMOUNT */

		if (launchedAt == "") errors.launchedAt = true;
		else errors.launchedAt = false;

		if (sideNumber == "") errors.sideNumber = true;
		else errors.sideNumber = false;

		if (model == "") errors.model = true;
		else errors.model = false;

		if (producent == "") errors.producent = true;
		else errors.producent = false;

		if (version == "") errors.version = true;
		else errors.version = false;

		if (builtAt == 0) errors.builtAt = true;
		else errors.builtAt = false;

		if (orbitAltitude < 100) errors.orbitAltitude = true;
		else errors.orbitAltitude = false;
	}
);

watch(errors, (c) => {
	const isError = Object.values(c).some((err) => err);
	if (isError) disableSubmit.value = true;
	else disableSubmit.value = false;
});

const addNewSatellite = async () => {
	try {
		const requestPayload: CreateSatellitePayload = {
			...form,
		};
		const result = await dispatch("createSatellite", requestPayload);
		if (result.status != 200) throw new Error(result.message);
		else successMessage.value = "Satellite updated!";
	} catch ({ message }) {
		errorMessage.value = message as string;
	} finally {
		setTimeout(() => {
			errorMessage.value = "";
			successMessage.value = "";
		}, 1000);
	}
};

const errorMessage = ref("");
const successMessage = ref("");
</script>

<template>
	<base-aside-wrapper side="left">
		<template #header-message>
			<span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
			<span v-if="successMessage" class="success-message">{{
				successMessage
			}}</span>
		</template>
		<base-form class="form" @submit.prevent="addNewSatellite">
			<template #header>
				<h1>Satellite</h1>
			</template>
			<template #default>
				<base-form-input
					label="Producent"
					v-model="form.producent"
					error=""
					theme="dark"
					field-id="field-producent"
					placeholder="General Electrics"
				/>
				<base-form-input
					label="Model"
					v-model="form.model"
					error=""
					theme="dark"
					field-id="field-model"
					placeholder="Storm"
				/>
				<base-form-input
					label="Side number"
					v-model="form.sideNumber"
					error=""
					theme="dark"
					field-id="field-side-number"
					placeholder="US001"
				/>
				<base-form-input
					label="Software version"
					v-model="form.version"
					error=""
					theme="dark"
					field-id="field-software-version"
					placeholder="v81"
				/>
				<field-build-date v-model:modelValue="form.builtAt" theme="dark" />
				<field-missiles v-model.number="form.numberOfMissiles" />
				<field-lauch-date v-model="form.launchedAt" theme="dark" />
				<field-orbit-altitude v-model="form.orbitAltitude" theme="dark" />
				<field-ai v-model="form.isAI" theme="dark" field-id="field-ai" />
				<div class="form__submit">
					<base-button
						label="Add Satellite"
						no-icon
						dense
						bg-color="#ffffff1a"
						:disabled="disableSubmit"
					/>
				</div>
			</template>
		</base-form>
	</base-aside-wrapper>
</template>

<style lang="scss" scoped>
.error-message {
	color: rgba($clr-accent-red, 1);
}
.success-message {
	color: rgba($clr-accent-green, 1);
}
.form {
	margin-block-start: 2rem;
	height: calc(100vh - 18rem); // im not sure why this needs to be set here ;/
	overflow-y: scroll;
	scrollbar-width: thick;
	scrollbar-color: $clr-white transparent;
	&::-webkit-scrollbar {
		width: 0.6rem;
	}

	&::-webkit-scrollbar-thumb {
		background-color: $clr-white;
		border-radius: 1rem;
	}
	h1 {
		text-align: center;
	}
	&__submit {
		display: flex;
		justify-content: center;
		padding-block: 4rem;
	}
}
</style>
