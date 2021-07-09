import Cookies from 'js-cookie';

import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';

interface Props {
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  device: string
}

export const key: InjectionKey<Store<Props>> = Symbol('app');

export default createStore<Props>({
  state: ():Props => ({
    sidebar: {
      opened: Cookies.get('sidebarStatus') ? (!!+(Cookies.get('sidebarStatus') as string)) : true,
      withoutAnimation: false
    },
    device: 'desktop'
  }),
  getters: {
    sidebar(state) {
      return state.sidebar;
    },
    device(state) {
      return state.device;
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.withoutAnimation = false;
      if (state.sidebar.opened) {
        console.log(1);
        Cookies.set('sidebarStatus', '1');
      } else {
        console.log(0);
        Cookies.set('sidebarStatus', '0');
      }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', '0');
      state.sidebar.opened = false;
      state.sidebar.withoutAnimation = withoutAnimation;
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device;
    }
  },
  actions: {
    async toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR');
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation);
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device);
    }
  }
});

export function useStore() {
  return baseUseStore(key);
}
