import { Module, GetterTree, MutationTree, ActionTree } from "vuex";
import { StoreState } from "@/store";
import { Actions, Getters, Mutations } from "./module-types";

import type { RootStore, State } from "./module-types";
import UserClient from "@/api/UserClient";
import { President } from "@/@types";

export { RootStore, State };

// MODULE STATE
export const state: State = {
	activeSession: false,
	activeUserToken: null,
	president: null,
};

// MODULE GETTERS
export const getters: GetterTree<State, StoreState> & Getters = {
	isActiveSession: (state: State) => state.activeSession,
	getUserToken: (state: State) => state.activeUserToken,
	getCurrentUser: (state: State) => state.president,
};

// MODULE MUTATIONS
export const mutations: MutationTree<State> & Mutations = {
	SAVE_ACTIVE_SESSION: (state, payload: any) => {
		const activeSession = {
			userToken: payload.token,
			president: payload.president,
		};
		sessionStorage.setItem("active-session", JSON.stringify(activeSession));
		state.activeSession = true;
		state.activeUserToken = payload.token!;
		state.president = payload.president!;
	},
};

// MODULE ACTIONS
export const actions: ActionTree<State, StoreState> & Actions = {
	reviveUserSession({ state }) {
		const session = sessionStorage.getItem("active-session");
		if (session != null) {
			const activeSession = JSON.parse(session) as {
				userToken: string;
				president: President;
			};
			state.president = activeSession.president;
			state.activeUserToken = activeSession.userToken;
			state.activeSession = true;
			console.log("Session revived...");
		}
	},
	async registerUser({ commit }, payload) {
		const response = await UserClient.registerUser(payload);
		if (response.status === 200) {
			commit("SAVE_ACTIVE_SESSION", response);
		}
		return response;
	},
	async loginUser({ commit }, payload) {
		const response = await UserClient.loginUser(payload);
		if (response.status == 200) {
			commit("SAVE_ACTIVE_SESSION", response);
		}
		return response;
	},

	async logoutUser({ state, rootState }) {
		state.activeSession = false;
		state.activeUserToken = null;
		state.president = null;
		sessionStorage.removeItem("active-session");
		rootState.satellites.all = [];
	},
};

// EXPORT MODULE
export const store: Module<State, StoreState> = {
	state,
	getters,
	mutations,
	actions,
};
