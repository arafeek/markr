<script>
export default {
  name: 'buttonX',
  props: ['text', 'onpress'],
};
</script>

<template>
  <button class="btn"
    @click="onpress">
    {{ text }}
  </button>
</template>

<style scoped>
.btn {
  padding: 10px 15px;
  border: none;
  box-shadow: none;
  background-color: lightskyblue;
  color: white;
  font-size: 32px;
  width: 100%;

}
</style>
