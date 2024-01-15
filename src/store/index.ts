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
  gchip_details: GeneralChipDetails[]; 
  
}
export interface GeneralChipDetails {
	display_name: string;
	children: number[]; 
}

//mutations enumeration
export const enum MUTATIONS_INVENTORY {
	add =  'ADD_INVENTORY',
	del =  'DEL_INVENTORY',

}
export const enum MUTATIONS_GENERALCHIPDETAILS {
	add = 'ADD_GENERALCHIPDETAILS',
	addrange = 'ADDRANGE_GENERALCHIPDETAILS',
	set = 'SET_GENERALCHIPDETAILS',
	update = 'UPDATE_GENERALCHIPDETAILS'
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
export const enum  ACTIONS_GENERALCHIPDETAILS {
	fetch =  'FETCH_GENERALCHIPDETAILS'
}
const mutations: MutationTree<State> = {
	
	[MUTATIONS_INVENTORY.add](state, payload: BasicSemiCComp) {
		state.inventory.push(payload);
	},

	[MUTATIONS_INVENTORY.del](state, payload: number) {
		state.inventory.splice(payload, 1);
	},
	[MUTATIONS_GENERALCHIPDETAILS.add](state, payload: GeneralChipDetails) {
		state.gchip_details.push(payload);
	},
	[MUTATIONS_GENERALCHIPDETAILS.addrange](state, payload: GeneralChipDetails[]) {
		state.gchip_details.push(...payload);
	},
	[MUTATIONS_GENERALCHIPDETAILS.set](state, payload: GeneralChipDetails[]) {
		
		state.gchip_details = payload;
	},
	[MUTATIONS_GENERALCHIPDETAILS.update](state, payload: GeneralChipDetails) {

		//find the index of the detail and then replace it with the new one
		const index = state.gchip_details.findIndex((element) => element.display_name === payload.display_name);
		state.gchip_details[index] = payload;

	}

	
};

const getters: any = {
	getInventory: (state: State) => state.inventory,
	getGeneralChipDetails: (state: State) => state.gchip_details,
};
const actions: ActionTree<State, any> = {
	async [ACTIONS_AUTH.login]({ commit }, payload: AccountRequest, ) {
		await axios.post('/User/Login', payload)
		.then((response) => {
			const data = response.data.access_token;
			
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + data;
			localStorage.setItem('token', axios.defaults.headers.common['Authorization']);
		}).catch((error) => {

			return Promise.reject(error);
		});
	},
	async [ACTIONS_GENERALCHIPDETAILS.fetch]({ commit }) {
		await axios.get('/Coverage/generalchip_details')
		.then((response) => {
			const data = response.data;
			
			console.log(data);
			
			commit(MUTATIONS_GENERALCHIPDETAILS.set, data);

		}).catch((error) => {
			return Promise.reject(error);
		});
	}

};


export const key: InjectionKey<Store<State>> = Symbol();
const state: State = {
  inventory: [
	{id: 0, code:'ra6m3', manufacturer:'Renesas', quantity:1},
	{id: 1, code:'PIC32 MK', manufacturer:'MicroChip', quantity:30},

  ],
  gchip_details: [
  ]
};

export default createStore<State>({ getters, state, mutations, actions });

// our own `useStore` composition function for types
export function useStore() {
  return baseUseStore(key);
}

