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
    methods: {
      editNote() {
        this.$store.commit('updateEditor', this.note.body);
        this.$store.commit('setActiveNote', this.note);
        this.$store.commit('toggleModal');
      },
      deleteNote() {
        this.$store.commit('deleteNote', this.note.id);
      },
    },
  };
</script>

<template>
  <div class="noteitem-container" @click="editNote">
    <div class="noteitem-md" v-html="markdown"></div>
    <div class="options-bar">
      <span class="option-item" @click.stop="deleteNote">
        Delete 
      </span>
    </div>
  </div>
</template>

<style scoped>
  .noteitem-container {
    width: 30%;
    min-width: 300px;
    overflow: scroll;
    height: 40vh;
    margin: 5px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    position: relative;
    flex: 1;
  }
  .noteitem-container:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
  .options-bar {
    background-color: rgba(0,0,0, 0.4);
    display: flex;
    position: absolute;
    z-index: 10;
    bottom: 0;
  }
  .option-item {
    padding: 7px;
    color: white;
    cursor: pointer;
  }
  .option-item:hover {
    background-color: rgba(0,0,0, 0.8);
  }
</style>