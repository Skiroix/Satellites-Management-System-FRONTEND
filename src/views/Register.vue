<script setup lang="ts">
import { reactive, ref, toRef, watch } from "vue";
import BasePageWrapper from "@/components/BasePageWrapper.vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseFormInput from "@/components/BaseFormInput.vue";
import BaseFormCheckbox from "@/components/BaseFormCheckbox.vue";
import BaseButton from "@/components/BaseButton.vue";
import { validateEmail, validatePassword } from "@/composables/validators";
import BaseFormCountries from "@/components/BaseFormCountries.vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";

const { dispatch } = useStore();
const router = useRouter();
const form = reactive({
	fName: "",
	lName: "",
	country: "",
	email: "",
	isRedButton: false,
	password: "",
	confirmPassword: "",
});

const formErrors = reactive({
	fName: "",
	lName: "",
	country: "",
	email: "",
	password: "",
	confirmPassword: "",
});

const errorCheck = reactive({
	fName: true,
	lName: true,
	country: true,
	email: true,
	password: true,
	confirmPassword: true,
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

const finalDecition = (error: string | null, key: Errors) => {
	if (error) {
		formErrors[key] = error;
		errorCheck[key] = true;
	} else {
		formErrors[key] = "";
		errorCheck[key] = false;
	}
};

watch(toRef(form, "fName"), (c) => {
	let error: string | null = null;
	try {
		const l = c.length;
		if (l === 0) fieldRequiredError();
		if (l < 3) minLengthError(3);
	} catch ({ message }) {
		error = message as string;
	} finally {
		finalDecition(error, "fName");
	}
});

watch(toRef(form, "lName"), (c) => {
	let error: string | null = null;
	try {
		const l = c.length;
		if (l === 0) fieldRequiredError();
		if (l < 3) minLengthError(3);
	} catch ({ message }) {
		error = message as string;
	} finally {
		finalDecition(error, "lName");
	}
});

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
		finalDecition(error, "password");
	}
});

watch(toRef(form, "confirmPassword"), (c) => {
	let error: string | null = null;
	try {
		const l = c.length;
		if (l === 0) fieldRequiredError();
		if (l < 6) minLengthError(6);
		if (!validatePassword(c)) passwordValidationError();
		if (c !== form.password) throw new Error("Passwords are not equal.");
	} catch ({ message }) {
		error = message as string;
	} finally {
		finalDecition(error, "confirmPassword");
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
		finalDecition(error, "email");
	}
});

watch(
	errorCheck,
	(c) => (disabled.value = Object.values(c).some((err) => err))
);

const onSubmit = async () => {
	try {
		const errorsHappened = Object.values(errorCheck);
		console.log(errorsHappened);
		if (errorsHappened.some((err) => err)) {
			console.log("Can't submit form.");
			return;
		}
		const { fName, lName, email, password, country, isRedButton } = form;

		const fullName = `${fName} ${lName}`;

		const requestBody = {
			fullName,
			email,
			password,
			country,
			isRedButton,
		};

		const result = await dispatch("registerUser", requestBody);
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
				<h1>Join the world's hottest club!</h1>
			</template>
			<template #default>
				<div class="form-group">
					<base-form-input
						label="First name"
						v-model="form.fName"
						:error="formErrors.fName"
						field-id="field-first-name"
					/>
					<base-form-input
						label="Last name"
						v-model="form.lName"
						:error="formErrors.lName"
						field-id="field-last-name"
					/>
				</div>

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
				<base-form-input
					label="Confirm password"
					type="password"
					v-model="form.confirmPassword"
					:error="formErrors.confirmPassword"
					field-id="field-confirm-password"
				/>

				<div class="form-country">
					<base-form-countries
						v-model="form.country"
						@country-error="(e) => (errorCheck.country = e)"
					/>
				</div>
				<base-form-checkbox
					v-model="form.isRedButton"
					label="Have atomic button?"
					field-id="isRedButton"
				/>
				<div class="form-submit">
					<base-button
						type="submit"
						label="Register"
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
