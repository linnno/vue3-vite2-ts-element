<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{'fixed-header': fixedHeader}">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script lang="ts">
import {
  Navbar,
  Sidebar,
  AppMain
} from './components';
import {
  reactive, computed, ref, toRefs, watch,
  onMounted, onBeforeMount, onBeforeUnmount
} from 'vue';
import { useStore as appUseStore } from '@/store/modules/app';
import { useStore as settingUseStore } from '@/store/modules/setting';
import { useRoute } from 'vue-router';

interface setInter {
  sidebar: any
  device: String
  fixedHeader: Boolean
  classObj: any
}

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  setup() {
    const appStore = appUseStore();
    const settingStore = settingUseStore();

    const set: setInter = reactive({
      sidebar: computed(() => appStore.state.sidebar),
      device: computed(() => appStore.state.device),
      fixedHeader: computed(() => settingStore.state.fixedHeader),
      classObj: computed(() => {
        return {
          hideSidebar: !set.sidebar.opened,
          openSidebar: set.sidebar.opened,
          withoutAnimation: set.sidebar.withoutAnimation,
          mobile: set.device === 'mobile'
        };
      })
    });

    const handleClickOutside = (params: Boolean = false) => {
      appStore.dispatch('closeSideBar', { withoutAnimation: params });
    };

    // 监听页面宽度变化和是否为mobile
    const route = useRoute();
    watch(
      () => route,
      () => {
        if (set.device === 'mobile' && !set.sidebar.opened) {
          console.log(123);
          handleClickOutside(false);
        }
      }
    );

    const WIDTH = ref(992);
    const $_isMobile = () => {
      const rect = document.body.getBoundingClientRect();
      return rect.width - 1 < WIDTH.value;
    };
    const $_resizeHandler = () => {
      if (!document.hidden) {
        const isMobile = $_isMobile();
        appStore.dispatch('toggleDevice', isMobile ? 'mobile' : 'desktop');

        if (isMobile) {
          handleClickOutside(true);
        }
      }
    };

    onMounted(() => {
      const isMobile = $_isMobile();
      if (isMobile) {
        appStore.dispatch('toggleDevice', 'mobile');
        handleClickOutside(true);
      }
    });
    onBeforeMount(() => {
      window.addEventListener('resize', $_resizeHandler);
    });
    onBeforeUnmount(() => {
      window.removeEventListener('resize', $_resizeHandler);
    });

    return {
      ...toRefs(set),
      handleClickOutside
    };
  }
};
</script>

<style lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
