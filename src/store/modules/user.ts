// store/count.ts
import {InjectionKey} from 'vue';  // store namespace
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface Props {
	count: number
}

export const key: InjectionKey<Store<Props>> = Symbol()

export default createStore<Props>({
	state: {
		count: 0
	},
	mutations: {
		increment(state): void {
			state.count++
		},
		decrement(state): void {
			state.count--
		}
	},
	actions: {
    // increment (context) {
    //   context.commit('increment')
    // }
  }
})

export function useStore () {
	return baseUseStore(key)
}