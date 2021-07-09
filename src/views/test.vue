<template>
  <div>
      <p>{{name}}</p>
      <p>{{age}}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
export default {
  name: 'App',
  setup() {
    const obj = reactive({
      name: 'lnj',
      age: 18
    });

    function myFn() {
      obj.name = 'zs';
      obj.age = 666;
    }
    return {
      ...toRefs(obj),
      myFn
    };
  }
};
</script>

<style>

</style>
