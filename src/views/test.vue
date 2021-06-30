<template>
  {{count}}
  <button @click="increment">add</button>
</template>

<script lang='ts'>
import { ref, reactive, onMounted, computed } from 'vue'
import  {useStore } from "@/store/modules/user";

export default {
  setup() {
    const store = useStore()
    const readersNumber = ref<number>(0)
    const book = reactive({ title: 'Vue 3 Guide' })
    const count = computed(() => store.state.count)
    onMounted(() => {
    })
    function increment() {
      store.commit('increment')
      console.log(count.value);
    }

    return {
      readersNumber,
      book,
      count,
      increment,
      decrement:()=>store.commit('decrement')
    }
  }
}
</script>

<style scoped>
</style>