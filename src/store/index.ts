import { createStore } from "vuex";
import {
	store as satellites,
	SatellitesStore,
	State as SatellitesState,
} from "./modules/satellites";

import { store as root, RootStore, State as RootState } from "./modules/root";

import { Actions as SatellitesActions } from "./modules/satellites/module-types";
import { Actions as RootActions } from "./modules/root/module-types";

export type StoreActions = SatellitesActions & RootActions;

export type StoreState = {
	satellites: SatellitesState;
	root: RootState;
};

export type Store = SatellitesStore<Pick<StoreState, "satellites">> &
	RootStore<Pick<StoreState, "root">>;

export const store = createStore({
	modules: {
		satellites: satellites,
		root: root,
	},
});

export function useStore(): Store {
	return store as Store;
}

export default store;
