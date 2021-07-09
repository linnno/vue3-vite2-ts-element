import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import defaultSettings from '@/settings';

const { fixedHeader, sidebarLogo } = defaultSettings;

interface Props {
  [key: string]: any
  fixedHeader: boolean
  sidebarLogo: boolean
}
export const key: InjectionKey<Store<Props>> = Symbol('setting');

export default createStore<Props>({
  state: ():Props => ({
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo
  }),
  getters: {
    getTitle() {
      return this.title;
    },
    getFixedHeader() {
      return this.fixedHeader;
    }
  },
  mutations: {
    CHANGE_SETTING: (state, { key, value }) => {
      // eslint-disable-next-line no-prototype-builtins
      if (state.hasOwnProperty(key)) {
        state[key] = value;
      }
    }
  },
  actions: {
    changeSetting({ commit }, data) {
      commit('CHANGE_SETTING', data);
    }
  }
});

export function useStore() {
  return baseUseStore(key);
}
