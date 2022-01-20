import { ErrorResponse } from "@/@types";

export default class BaseClient {
	public BASE_URL = import.meta.env.DEV
		? "http://localhost:3000"
		: "https://adrian-nowek-satellites-server.herokuapp.com";
	constructor(specifier: "users" | "satellites") {
		this.BASE_URL = `${this.BASE_URL}/${specifier}`;
	}

	public makeHeaders() {
		return {} as Record<string, string>;
	}
	public async returnValue<T>(response: globalThis.Response): Promise<T> {
		return (await response.json()) as unknown as T;
	}
	public errorResponse(message: any | unknown): ErrorResponse {
		return { status: 500, message: message as string };
	}
}
