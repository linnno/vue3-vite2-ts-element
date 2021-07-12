<template>
  <div :class="{'has-logo': showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted
} from 'vue';
import { useStore } from '@/store/modules/setting';
import { useStore as appUseStore } from '@/store/modules/app';
import { useRoute, useRouter } from 'vue-router';

import Logo from './Logo.vue';
import SidebarItem from './SidebarItem.vue';
import variables from '@/styles/variables.module.scss';

export default defineComponent({
  components: { SidebarItem, Logo },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const routes = router.options.routes;

    const activeMenu = computed(() => {
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    });

    const store = useStore();
    const showLogo = computed(() => {
      return store.state.sidebarLogo;
    });
    onMounted(() => {
      console.log(variables)
    })
    const appStore = appUseStore();
    const isCollapse = computed(() => {
      return !appStore.getters.sidebar.opened;
    });
    return {
      routes,
      activeMenu,
      showLogo,
      variables,
      isCollapse
    };
  }
});
</script>
