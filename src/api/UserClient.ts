import BaseClient from "./BaseClient";
import {
	LoginUserPayload,
	LoginUserResponse,
	RegisterUserPayload,
	RegisterUserResponse,
} from "@/@types";

class UserClient extends BaseClient {
	constructor() {
		super("users");
	}

	async loginUser(payload: LoginUserPayload) {
		try {
			const response = await fetch(`${this.BASE_URL}/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			return await this.returnValue<LoginUserResponse>(response);
		} catch ({ message }) {
			return this.errorResponse(message);
		}
	}

	async registerUser(payload: RegisterUserPayload) {
		try {
			const response = await fetch(`${this.BASE_URL}/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			return await this.returnValue<RegisterUserResponse>(response);
		} catch ({ message }) {
			return this.errorResponse(message);
		}
	}
}

export default new UserClient();
