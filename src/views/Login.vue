<script setup lang="ts">
import { reactive, ref, toRef, watch } from "vue";
import BasePageWrapper from "@/components/BasePageWrapper.vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseFormInput from "@/components/BaseFormInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import { validateEmail, validatePassword } from "@/composables/validators";
import { useStore } from "@/store";
import { useRouter } from "vue-router";

const { dispatch } = useStore();
const router = useRouter();
const form = reactive({
	email: "",
	password: "",
});

const formErrors = reactive({
	email: "",
	password: "",
});

const errorCheck = reactive({
	email: true,
	password: true,
});

const errorMessage = ref("");
const disabled = ref(true);
type Type = typeof errorCheck;

type Errors = keyof Type;

const fieldRequiredError = () => {
	throw new Error("This field is required and can't be empty.");
};

const minLengthError = (min: number) => {
	throw new Error(`This field can't be less than ${min} characters.`);
};

const passwordValidationError = () => {
	throw new Error(
		"Password must consist of at least 6 characters, 1 special character and one number."
	);
};

const emailValidationError = () => {
	throw new Error(
		"Email must be a valid email address and can't be longer than 255 characters."
	);
};

const finalDecision = (error: string | null, key: Errors) => {
	if (error) {
		formErrors[key] = error;
		errorCheck[key] = true;
	} else {
		formErrors[key] = "";
		errorCheck[key] = false;
	}
};

watch(toRef(form, "password"), (c) => {
	let error: string | null = null;
	try {
		const l = c.length;
		if (l === 0) fieldRequiredError();
		if (l < 6) minLengthError(6);
		if (!validatePassword(c)) passwordValidationError();
	} catch ({ message }) {
		error = message as string;
	} finally {
		finalDecision(error, "password");
	}
});

watch(toRef(form, "email"), (c) => {
	let error: string | null = null;
	try {
		const l = c.length;
		if (l === 0) fieldRequiredError();
		if (!validateEmail(c)) emailValidationError();
	} catch ({ message }) {
		error = message as string;
	} finally {
		finalDecision(error, "email");
	}
});

watch(errorCheck, (c) => {
	disabled.value = Object.values(c).some((err) => err);
});

const onSubmit = async () => {
	try {
		const errorsHappened = Object.values(errorCheck);
		if (errorsHappened.some((err) => err)) {
			console.log("Can't submit form.");
			return;
		}
		const { email, password } = form;

		const requestBody = {
			email,
			password,
		};

		const result = await dispatch("loginUser", requestBody);
		if (result.status !== 200) throw new Error(result.message);

		router.push({ name: "Satellites" });
	} catch ({ message }) {
		errorMessage.value = message as string;
		setTimeout(() => (errorMessage.value = ""), 3000);
	}
};
</script>

<template>
	<base-page-wrapper>
		<base-form @submit.prevent="onSubmit" class="form">
			<template #header>
				<h1>Mr. President, your account awaits!</h1>
			</template>
			<template #default>
				<base-form-input
					label="Email"
					type="text"
					v-model="form.email"
					:error="formErrors.email"
					field-id="field-email"
				/>
				<base-form-input
					label="Password"
					type="password"
					v-model="form.password"
					:error="formErrors.password"
					field-id="field-password"
				/>

				<div class="form-submit">
					<base-button
						type="submit"
						label="Log in"
						no-icon
						:disabled="disabled"
					/>
				</div>
				<teleport to="#error-message">
					<div v-if="errorMessage">{{ errorMessage }}</div>
				</teleport>
			</template>
		</base-form>
	</base-page-wrapper>
</template>

<style lang="scss" scoped>
.form {
	margin-inline: auto;
}
.form-group {
	@include mq(tablet) {
		display: flex;
		align-items: flex-start;
		column-gap: 1rem;
	}
}
.form-country {
	width: clamp(20rem, 40rem, 100%);
}
.form-submit {
	margin-top: 4rem;
	margin-block-end: 4rem;
}
</style>
