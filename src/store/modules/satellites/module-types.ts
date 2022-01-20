import {
	CreateSatellitePayload,
	Satellite,
	UpdateSatellitePayload,
	GetSatelliteResponse,
	GetSatellitesResponse,
	CreateSatelliteResponse,
} from "@/@types";
import { StoreState } from "@/store";
import {
	Store as VuexStore,
	CommitOptions,
	DispatchOptions,
	ActionContext,
} from "vuex";

// MODULE TYPE STATE
export interface State {
	all: Satellite[];
	selected: Satellite | null;
}

// MODULE TYPE GETTERS
export type Getters = {
	getSatellites: (state: State) => Satellite[];
	getSelected: (state: State) => Satellite | null;
};

// MODULE TYPE MUTATIONS
export type Mutations<S = State> = {
	APPEND_SATELLITE: (state: State, payload: Satellite) => void;
	REMOVE_SATELLITE: (state: State, payload: Satellite) => void;
	UPDATE_SATELLITE: (state: State, payload: Satellite) => void;
	SET_SELECTED: (state: State, payload: Satellite) => void;
	CLEAR_SELECTED: (state: State, payload: Satellite) => void;
};

// MODULE TYPE ACTIONS
export interface Actions {
	createSatellite(
		{ state, rootState, commit }: AugmentedActionContext,
		payload: CreateSatellitePayload
	): Promise<CreateSatelliteResponse>;
	updateSatellite(
		{ state, rootState, commit }: AugmentedActionContext,
		payload: UpdateSatellitePayload
	): Promise<boolean>;
	getSatellite(
		{ rootState }: AugmentedActionContext,
		payload: string
	): Promise<GetSatelliteResponse>;
	getSatellites({
		rootState,
	}: AugmentedActionContext): Promise<GetSatellitesResponse>;
	deleteSatellite(
		{ rootState }: AugmentedActionContext,
		payload: string
	): Promise<GetSatelliteResponse>;
}

export type AugmentedActionContext = {
	commit<K extends keyof Mutations>(
		key: K,
		payload?: Parameters<Mutations[K]>[1]
	): ReturnType<Mutations[K]>;
	dispatch<K extends keyof Actions>(
		key: K,
		payload?: Parameters<Actions[K]>[1],
		options?: DispatchOptions
	): ReturnType<Actions[K]>;
	getters: {
		[K in keyof Getters]: ReturnType<Getters[K]>;
	};
} & Omit<ActionContext<State, StoreState>, "commit" | "getters" | "dispatch">;

export type SatellitesStore<S = State> = Omit<
	VuexStore<S>,
	"getters" | "commit" | "dispatch"
> & {
	commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
		key: K,
		payload?: P,
		options?: CommitOptions
	): ReturnType<Mutations[K]>;
} & {
	dispatch<K extends keyof Actions>(
		key: K,
		payload?: Parameters<Actions[K]>[1],
		options?: DispatchOptions
	): ReturnType<Actions[K]>;
} & {
	getters: {
		[K in keyof Getters]: ReturnType<Getters[K]>;
	};
};
