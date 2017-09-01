<script>
import NoteItem from './NoteItem';
import Modal from './Modal';
import ButtonX from './Button';
import Editor from './Editor';

export default {
  name: 'noteList',
  components: {
    NoteItem,
    Modal,
    ButtonX,
    Editor,
  },
  computed: {
    notes() {
      return this.$store.state.notes;
    },
    showModal() {
      return this.$store.state.showModal;
    },
  },
  methods: {
    toggleModal() {
      this.$store.commit('toggleModal');
    },
  },
};
</script>

<template>
  <div id="note-container">
    <modal v-if="showModal" @close="toggleModal">
      <span slot="header"> New Note </span>
      <div slot="body">
        <editor></editor>
      </div>
      <div slot="footer">
        <button-x text="Cancel" :onpress="toggleModal"></button-x>
      </div>
    </modal>

    <button-x :onpress="toggleModal" text="New Note"></button-x>
    <div id="note-list" v-if="notes.length > 0">
      <note-item v-for="(note, i) in notes" v-bind:key="i" :note="note"/>
    </div>
  </div>
</template>

<style scoped>
  #note-container {
    display: flex;
    flex-direction: column;
  }
  #note-list {
    margin: 20px 0;
    display: flex;
    flex-wrap:wrap;
    justify-content: flex-start;
  }
</style>

