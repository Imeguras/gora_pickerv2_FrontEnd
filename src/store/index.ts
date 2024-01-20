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
  database: GeneralChip[]; 
  manufacturers: Manufacturer[];
  package_types: PackageType[];
  
}
export interface GeneralChipDetails {
	display_name: string;
	children: number[]; 

}
export interface PackageType {
	id: number;
	name: string;
	solder_type: number;
}
export interface GeneralChip {
	code:string,
	packageType:string,
	manufacturer :string,
	eol?:Date,
	pinDetails?:number, 
	family?:string,
	country_manufacture_abrv?:string,
	description?:string,
}
export interface Manufacturer {
	id: number;
	name: string;
	description?: string; 
	financial_hq?: number;
	parent?: number;
	website?: string; 
}
//mutations enumeration
export const enum MUTATIONS_INVENTORY {
	add =  'ADD_INVENTORY',
	del =  'DEL_INVENTORY',

}
export const enum MUTATIONS_MANUFACTURERS {
	set = 'SET_MANUFACTURERS'
	
}
export const enum MUTATIONS_GENERALCHIPDETAILS {
	add = 'ADD_GENERALCHIPDETAILS',
	addrange = 'ADDRANGE_GENERALCHIPDETAILS',
	set = 'SET_GENERALCHIPDETAILS',
	update = 'UPDATE_GENERALCHIPDETAILS'
}
export const enum MUTATIONS_GENERALCHIP {
	add = 'ADD_GENERALCHIP',
	addrange = 'ADDRANGE_GENERALCHIP',
	set = 'SET_GENERALCHIP',
	update = 'UPDATE_GENERALCHIP'
}
export const enum MUTATIONS_PACKAGETYPE{
	set = 'SET_PACKAGETYPE'
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
export const enum ACTIONS_CHIPS{
	fetch = 'FETCH_CHIPS',
	get = 'GET_CHIPS',
	add = 'ADD_CHIPS'
}
export const enum  ACTIONS_GENERALCHIPDETAILS {
	fetch =  'FETCH_GENERALCHIPDETAILS'
}
export const enum ACTIONS_MANUFACTURERS {
	fetch = 'FETCH_MANUFACTURERS'
}
export const enum ACTIONS_PACKAGETYPE {
	fetch = 'FETCH_PACKAGETYPE'
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

	},
	[MUTATIONS_GENERALCHIP.add](state, payload: GeneralChip) {
		state.database.push(payload);
	},
	[MUTATIONS_GENERALCHIP.addrange](state, payload: GeneralChip[]) {
		state.database.push(...payload);
	},
	[MUTATIONS_GENERALCHIP.set](state, payload: GeneralChip[]) {
		
		state.database = payload;
	},
	[MUTATIONS_GENERALCHIP.update](state, payload: GeneralChip) {
		
		//find the index of the detail and then replace it with the new one
		const index = state.database.findIndex((element) => element.code === payload.code);
		state.database[index] = payload;

	},
	[MUTATIONS_MANUFACTURERS.set](state, payload: Manufacturer[]) {	
		state.manufacturers = payload;
	},
	[MUTATIONS_PACKAGETYPE.set](state, payload: PackageType[]) {
		state.package_types = payload;
		
	}


	
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
			commit(MUTATIONS_GENERALCHIPDETAILS.set, data);

		}).catch((error) => {
			return Promise.reject(error);
		});
	},
	async [ACTIONS_CHIPS.get]({ commit }, payload:string) {
		await axios.get('/GenericChip/code/'+payload).then((response) => {
			const data = response.data;
			console.log(data);
		}).catch((error) => {
			return Promise.reject(error);
		}); 
	},
	async [ACTIONS_CHIPS.fetch]({ commit }) {
		await axios.get('/GenericChip').then((response) => {
			const data = response.data;
			//commit data
			commit(MUTATIONS_GENERALCHIP.set, data);
		}).catch((error) => {
			return Promise.reject(error);
		})

	},
	async [ACTIONS_CHIPS.add]({ commit }, payload) {
		await axios.post('/GenericChip', payload).then((response) => {
			const data = response.data;
			commit(MUTATIONS_GENERALCHIP.add, data);

		}).catch((error) => {
			return Promise.reject(error);
		})

	},
	async [ACTIONS_MANUFACTURERS.fetch]({ commit }) {
		await axios.get('/Manufacturer').then((response) => {
			const data = response.data;
			commit(MUTATIONS_MANUFACTURERS.set, data);
			//commit(MUTATIONS_GENERALCHIP.set, data);
		}).catch((error) => {
			return Promise.reject(error);
		})

	},
	async [ACTIONS_PACKAGETYPE.fetch]({ commit }) {
		await axios.get('/PackageType').then((response) => {
			const data = response.data;
			commit(MUTATIONS_PACKAGETYPE.set, data);
			//commit(MUTATIONS_GENERALCHIP.set, data);
		}).catch((error) => {
			return Promise.reject(error);
		})

	}

};
const getters: any = {
	getInventory: (state: State) => state.inventory,
	getManufacturers: (state: State) => {
		if(state.manufacturers.length === 0){
			[ACTIONS_MANUFACTURERS.fetch];
			return state.manufacturers;
			
		}else{
			return state.manufacturers;
		}
	},
	getGeneralChipDetails: (state: State) => {
		if(state.gchip_details.length === 0){
			[ACTIONS_GENERALCHIPDETAILS.fetch];
			return state.gchip_details
		}else{
			return state.gchip_details
		}
	},
	getPackageTypes: (state: State) => {
		if(state.package_types.length === 0){
			[ACTIONS_PACKAGETYPE.fetch];
			return state.package_types
		}else{
			return state.package_types
		}
	},
	getDatabase: (state: State) => {
		if(state.database.length === 0){
			[ACTIONS_CHIPS.fetch];
			return state.database
		}else{
			return state.database
		}
	}
};

export const key: InjectionKey<Store<State>> = Symbol();
const state: State = {
  inventory: [

  ],
  gchip_details: [
  ],
  database: [
  ],
  manufacturers: [
  ], 
  package_types: [
  ]
};

export default createStore<State>({ getters, state, mutations, actions });

// our own `useStore` composition function for types
export function useStore() {
  return baseUseStore(key);
}

