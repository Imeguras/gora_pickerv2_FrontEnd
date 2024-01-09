import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store, MutationTree, ActionTree} from 'vuex';

import axios from 'axios';

export interface AccountRequest {
	email: string;
	password: string;
  }
// interfaces for our State and todos
export interface BasicSemiCComp {
  id: number;
  code: string;
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

const getters: any = {
	getInventory: (state: State) => state.inventory,
};
const actions: ActionTree<State, any> = {
	async [ACTIONS_AUTH.login]({ commit }, payload: AccountRequest, ) {
		axios.post('/User/Login', payload)
		.then((response) => {
			console.log(payload);
			console.log(response.data);
		}).catch((error) => {
			console.log(error)
			throw error;
		});
	}

};


export const key: InjectionKey<Store<State>> = Symbol();
const state: State = {
  inventory: [
	{id: 0, code:'ra6m3', manufacturer:'Renesas', quantity:1},
	{id: 1, code:'PIC32 MK', manufacturer:'MicroChip', quantity:30},

  ],
};

export default createStore<State>({ getters, state, mutations, actions });

// our own `useStore` composition function for types
export function useStore() {
  return baseUseStore(key);
}

