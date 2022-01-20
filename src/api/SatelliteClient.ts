import {
	CreateSatellitePayload,
	CreateSatelliteResponse,
	DeleteSatelliteResponse,
	GetSatelliteResponse,
	GetSatellitesResponse,
	UpdateSatellitePayload,
	UpdateSatelliteResponse,
} from "@/@types";
import BaseClient from "./BaseClient";

class SatelliteClient extends BaseClient {
	constructor() {
		super("satellites");
	}

	async createSatellite(token: string, requestBody: CreateSatellitePayload) {
		try {
			let headers = {} as Record<string, string>;
			headers["Content-Type"] = "application/json";
			headers["Authorization"] = `Bearer ${token}`;
			const response = await fetch(`${this.BASE_URL}`, {
				method: "POST",
				headers: headers,
				body: JSON.stringify(requestBody),
			});
			return await this.returnValue<CreateSatelliteResponse>(response);
		} catch ({ message }) {
			return this.errorResponse(message);
		}
	}
	async updateSatellite(token: string, requestBody: UpdateSatellitePayload) {
		try {
			let headers = this.makeHeaders();
			headers["Content-Type"] = "application/json";
			headers["Authorization"] = `Bearer ${token}`;
			const response = await fetch(`${this.BASE_URL}`, {
				method: "PUT",
				headers,
				body: JSON.stringify(requestBody),
			});

			return await this.returnValue<UpdateSatelliteResponse>(response);
		} catch ({ message }) {
			return this.errorResponse(message);
		}
	}
	async getSatellites(token: string) {
		try {
			let headers = this.makeHeaders();
			// headers["Content-Type"] = "application/json";
			headers["Authorization"] = `Bearer ${token}`;
			const response = await fetch(`${this.BASE_URL}`, {
				method: "GET",
				headers,
			});

			return await this.returnValue<GetSatellitesResponse>(response);
		} catch ({ message }) {
			return this.errorResponse(message);
		}
	}
	async getSatellite(token: string, satelliteId: string) {
		try {
			let headers = this.makeHeaders();
			// headers["Content-Type"] = "application/json";
			headers["Authorization"] = `Bearer ${token}`;
			const response = await fetch(`${this.BASE_URL}/${satelliteId}`, {
				method: "GET",
				headers,
			});

			return await this.returnValue<GetSatelliteResponse>(response);
		} catch ({ message }) {
			return this.errorResponse(message);
		}
	}
	async deleteSatellite(token: string, satelliteId: string) {
		try {
			let headers = this.makeHeaders();
			headers["Authorization"] = `Bearer ${token}`;
			const response = await fetch(`${this.BASE_URL}/${satelliteId}`, {
				method: "DELETE",
				headers: headers,
			});

			return await this.returnValue<DeleteSatelliteResponse>(response);
		} catch ({ message }) {
			return this.errorResponse(message);
		}
	}
}

export default new SatelliteClient();
