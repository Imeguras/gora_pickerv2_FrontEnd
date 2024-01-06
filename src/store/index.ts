import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import gora_config from '../store/gora_config';

export interface AccountRequest {
	email: string;
	password: string;
  }
// interfaces for our State and todos
export interface BasicSemiCComp {
  id: number;
  title: string;
  manufacturer: string;
  quantity: number;
}
export interface State {
  inventory: BasicSemiCComp[];
}

//mutations enumeration
export const enum MUTATIONS_INVENTORY {
	add =  'ADD_INVENTORY',
	del =  'DEL_INVENTORY',

}
export const enum ACTIONS_INVENTORY {
	add =  'ADD_INVENTORY',
	fetch =  'FETCH_INVENTORY',
	del =  'DEL_INVENTORY',

}
export const enum  ACTIONS_AUTH {
	login =  'LOGIN_AUTH',
	del =  'LOGOUT_AUTH',

}

const mutations: MutationTree<State> = {
	[MUTATIONS_INVENTORY.add](state, payload: BasicSemiCComp) {
		state.inventory.push(payload);
	},
	[MUTATIONS_INVENTORY.del](state, payload: number) {
		state.inventory.splice(payload, 1);
	}

	
};


const actions: ActionTree<State, any> = {
	[ACTIONS_AUTH.login]({ commit }, payload: AccountRequest) {
		(gora_config.apiURL + '/User/Login', {
		}).then((response) => {
			return console.log(response.json());
		}).catch((error) => {
			console.log(error);
		})
	}

};


export const key: InjectionKey<Store<State>> = Symbol();
const state: State = {
  inventory: [
  ],
};

export const store = createStore<State>({ state });

// our own `useStore` composition function for types
export function useStore() {
  return baseUseStore(key);
}

