<script>
import R from 'ramda';
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
      this.$store.commit('prepNewNote');
      this.$store.commit('toggleModal');
    },
    visible(notes) {
      // determines which notes to show based on sorting and filtering
      return R.sortBy(R.descend(R.prop('created')))(notes);
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
      <note-item v-for="(note, i) in visible(notes)" v-bind:key="note.id" :note="note"/>
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

