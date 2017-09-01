// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import App from './App';
import router from './router';

Vue.use(Vuex);
Vue.config.productionTip = false;

const initialNotes = window.localStorage.getItem('my-notes');

const store = new Vuex.Store({
  plugins: [createLogger()],
  state: {
    notes: initialNotes ? JSON.parse(initialNotes) : [],
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
      window.localStorage.setItem('my-notes', JSON.stringify(state.notes));
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
