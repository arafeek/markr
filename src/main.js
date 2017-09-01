// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import App from './App';
import router from './router';
import {
  loadNotesFromStorage,
  saveNotesToStorage,
} from './services/persistance';

Vue.use(Vuex);
Vue.config.productionTip = false;

const store = new Vuex.Store({
  plugins: [createLogger()],
  state: {
    notes: loadNotesFromStorage(),
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
      state.notes.push({ body: state.editor.content });
      saveNotesToStorage(state.notes);
    },
    toggleModal(state) {
      state.showModal = !state.showModal; //eslint-disable-line
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
