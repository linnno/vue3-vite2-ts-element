<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown': !isNest}">
          <template v-if="icon">
            <i v-if="icon.includes('el-icon')" :class="icon" />
            <svg-icon v-else :icon-class="icon"/>
          </template>
          <template #title>
            <span>{{ onlyOneChild.meta.title }}</span>
          </template>
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <template v-if="icon">
          <i v-if="icon.includes('el-icon')" :class="icon" />
          <svg-icon v-else :icon-class="icon"/>
        </template>
        <span>{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script lang="ts">
import path from 'path';
// import { isExternal } from '@/utils/validate';
import { computed, defineComponent, onMounted, PropType, ref } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import AppLink from './Link.vue';
import { useStore as appUseStore } from '@/store/modules/app';

export default defineComponent({
  name: 'SidebarItem',
  components: {
    AppLink
  },
  props: {
    // route object
    item: {
      type: Object as PropType<RouteRecordRaw>,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const onlyOneChild = ref({} as any);

    function hasOneShowingChild(
      children: RouteRecordRaw[] = [],
      parent: RouteRecordRaw
    ) {
      const showingChildren = children.filter((item: any) => {
        if (item.hidden) {
          // 不显示hidden属性为true的菜单
          return false;
        } else {
          onlyOneChild.value = item;
          return true;
        }
      });

      if (showingChildren.length === 1) {
        return true;
      }

      if (showingChildren.length === 0) {
        onlyOneChild.value = { ...parent, path: '', noShowingChildren: true };
        return true;
      }
      return false;
    }

    const resolvePath = (routePath: string) => {
      return path.resolve(props.basePath, routePath);
    };

    const icon = computed((): string => {
      return ((onlyOneChild.value.meta && onlyOneChild.value.meta.icon) || (props.item.meta && props.item.meta.icon)) as string;
    });

    // FixiOSBug
    const store = appUseStore();
    const device = computed(() => store.getters.device);
    const subMenu: any = ref(null);
    const fixBugIniOS = () => {
      if (subMenu.value) {
        const handleMouseleave = subMenu.value.handleMouseleave;
        subMenu.value.handleMouseleave = (e: any) => {
          if (device.value === 'mobile') {
            return;
          }
          handleMouseleave(e);
        };
      }
    };
    onMounted(() => {
      fixBugIniOS();
    });

    return { hasOneShowingChild, resolvePath, onlyOneChild, icon, subMenu };
  }
});
</script>
