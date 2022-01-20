import {
	LoginUserPayload,
	LoginUserResponse,
	President,
	RegisterUserPayload,
	RegisterUserResponse,
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
	activeSession: boolean;
	activeUserToken: string | null;
	president: President | null;
}

// MODULE TYPE GETTERS
export type Getters = {
	isActiveSession: (state: State) => boolean;
	getUserToken: (state: State) => string | null;
	getCurrentUser: (state: State) => President | null;
};

// MODULE TYPE MUTATIONS
export type Mutations<S = State> = {
	SAVE_ACTIVE_SESSION(
		state: S,
		payload: RegisterUserResponse | LoginUserResponse
	): void;
};

// MODULE TYPE ACTIONS
export interface Actions {
	reviveUserSession({ state }: AugmentedActionContext): void;
	registerUser(
		{ commit }: AugmentedActionContext,
		payload: RegisterUserPayload
	): Promise<RegisterUserResponse>;
	loginUser(
		{ state }: AugmentedActionContext,
		payload: LoginUserPayload
	): Promise<LoginUserResponse>;
	logoutUser({ state }: AugmentedActionContext): void;
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

export type RootStore<S = State> = Omit<
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
