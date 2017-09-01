<script>
  import * as marked from 'marked';

  export default {
    name: 'noteItem',
    props: ['note'],
    computed: {
      markdown() {
        return marked(this.note.body || '', { sanitized: true });
      },
    },
  };
</script>

<template>
  <div class="noteitem-container">
    <div class="noteitem-md" v-html="markdown"></div>
  </div>
</template>

<style scoped>
  .noteitem-container {
    width: 30%;
    overflow: scroll;
    height: 40vh;
    margin: 0 5px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  }
  .noteitem-container:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
</style>