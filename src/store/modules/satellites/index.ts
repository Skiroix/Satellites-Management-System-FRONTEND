import { Module, GetterTree, MutationTree, ActionTree } from "vuex";
import { StoreState } from "@/store";
import { Actions, Getters, Mutations } from "./module-types";

import type { State, SatellitesStore } from "./module-types";
import SatelliteClient from "@/api/SatelliteClient";

export { SatellitesStore, State };

// MODULE STATE
export const state: State = {
	all: [],
	selected: null,
};

// MODULE GETTERS
export const getters: GetterTree<State, StoreState> & Getters = {
	getSatellites: (state) => state.all,
	getSelected: (state) => state.selected,
};

const filterByDate = <T>(array: T & { createdAt: number }[]) => {
	return array.sort((a, b) => {
		if (a.createdAt > b.createdAt) return -1;
		else if (a.createdAt < b.createdAt) return 1;
		else return 0;
	});
};

// MODULE MUTATIONS
export const mutations: MutationTree<State> & Mutations = {
	APPEND_SATELLITE: (state, payload) => {
		const withAppended = [...state.all, payload];
		state.all = filterByDate(withAppended);
	},
	UPDATE_SATELLITE: (state, payload) => {
		const mapped = [...state.all].map((el) =>
			el._id != payload._id ? el : payload
		);
		state.all = filterByDate(mapped);
	},
	REMOVE_SATELLITE: (state, payload) => {
		const filtered = [...state.all].filter((el) => el._id !== payload._id);
		state.all = filterByDate(filtered);
	},
	SET_SELECTED: (state, payload) => {
		state.selected = payload;
	},
	CLEAR_SELECTED: (state) => {
		state.selected = null;
	},
};

// MODULE ACTIONS
export const actions: ActionTree<State, StoreState> & Actions = {
	async createSatellite({ state, rootState, commit }, payload) {
		const token = rootState.root.activeUserToken!;
		const response = await SatelliteClient.createSatellite(token, payload);
		if (response.status === 200) {
			commit("APPEND_SATELLITE", response.satellite);
		}
		return response;
	},
	async updateSatellite({ rootState, commit }, payload) {
		const token = rootState.root.activeUserToken!;
		const response = await SatelliteClient.updateSatellite(token, payload);
		const success = response.status === 200;
		if (success) {
			commit("UPDATE_SATELLITE", response.satellite);
			commit("SET_SELECTED", response.satellite);
		}
		return success;
	},
	async getSatellite({ rootState }, payload) {
		const token = rootState.root.activeUserToken!;
		const response = await SatelliteClient.getSatellite(token, payload);
		return response;
	},
	async getSatellites({ rootState, state }) {
		const token = rootState.root.activeUserToken!;
		const response = await SatelliteClient.getSatellites(token);
		if (response.status === 200) {
			state.all = response.satellites!;
		}
		return response;
	},
	async deleteSatellite({ rootState, commit }, payload) {
		const token = rootState.root.activeUserToken!;
		const response = await SatelliteClient.deleteSatellite(token, payload);
		if (response.status === 200) {
			console.log(response.satellite);
			commit("REMOVE_SATELLITE", response.satellite);
		}
		return response;
	},
};

// EXPORT MODULE
export const store: Module<State, StoreState> = {
	state,
	getters,
	mutations,
	actions,
};
