// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import VueFire from 'vuefire';
import dotenv from 'dotenv';
import createLogger from 'vuex/dist/logger';
import uuidv4 from 'uuid/v4';
import R from 'ramda';

import App from './App';
import router from './router';
import {
  loadNotesFromStorage,
  saveNotesToStorage,
} from './services/persistance';

// Init dotenv
dotenv.config();

// Config Vue Instance
Vue.use(Vuex);
Vue.use(VueFire);
Vue.config.productionTip = false;

// Set up Vuex
const store = new Vuex.Store({
  plugins: [createLogger()],
  state: {
    notes: loadNotesFromStorage(),
    activeNote: null,
    editor: {
      content: '# Welcome',
    },
    showModal: false,
  },
  mutations: {
    updateEditor(state, content) {
      state.editor.content = content; //eslint-disable-line
    },
    saveNote(state) {
      if (!state.activeNote) {
        // This is for new notes
        state.notes.push({
          body: state.editor.content,
          id: uuidv4(),
          created: Date.now(),
          updated: null,
        });
        saveNotesToStorage(state.notes);
      } else {
        const edited = R.find(R.propEq('id', state.activeNote.id), state.notes);
        edited.body = state.editor.content;
        edited.updated = Date.now();
        saveNotesToStorage(state.notes);
      }
    },
    deleteNote(state, id) {
      state.notes = state.notes.filter((n) => n.id !== id); //eslint-disable-line
      saveNotesToStorage(state.notes);
    },
    toggleModal(state) {
      state.showModal = !state.showModal; //eslint-disable-line
      // clear any active note when we close the modal
    },
    setActiveNote(state, note) {
      state.activeNote = note; //eslint-disable-line
    },
    prepNewNote(state) {
      state.activeNote = null; //eslint-disable-line
    },
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});
