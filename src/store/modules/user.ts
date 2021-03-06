// store/count.ts
import { InjectionKey } from 'vue'; // store namespace
import { createStore, useStore as baseUseStore, Store } from 'vuex';

export interface Props {
  [key: string]: any
  count: number
  test: string
}

export const key: InjectionKey<Store<Props>> = Symbol();

export default createStore<Props>({
  state: (): Props => ({
    count: 0,
    test: ''
  }),
  mutations: {
    increment(state, { key, value }): void {
      // eslint-disable-next-line no-prototype-builtins
      if (state.hasOwnProperty(key)) {
        state[key] = value;
      }
      state.count++;
    },
    decrement(state): void {
      state.count--;
    }
  },
  actions: {
    // increment (context) {
    //   context.commit('increment')
    // }
  }
});

export function useStore() {
  return baseUseStore(key);
}
