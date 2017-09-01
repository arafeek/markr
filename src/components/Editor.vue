<script>
  import * as marked from 'marked';
  import _ from 'lodash';

  import ButtonX from './Button';

  export default {
    name: 'editor',
    components: { ButtonX },
    computed: {
      input() {
        return this.$store.state.editor.content;
      },
      compiledMarkdown() {
        return marked(this.input || '', { sanitized: true });
      },
    },
    methods: {
      update: _.debounce(function (e) {
        this.$store.commit('updateEditor', e.target.value);
      }, 300),
      save() {
        this.$store.commit('saveNote');
        console.log('save called');
      },
    },
  };
</script>

<template>
  <div class="container">
    <div id="editor">
      <textarea :value="input"
        @input="update">
      </textarea>
      <div id="md-display"
        v-html="compiledMarkdown">
      </div>
    </div>
    <button-x text="Save" :onpress="save"></button-x>
  </div>
</template>

<style scoped>
html, body, #editor {
  margin: 0;
  height: 100%;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;
}

#editor {
  height: 50vh;
  overflow: hidden;
}

#md-display {
  overflow: scroll;
}

textarea, #editor div {
  display: inline-block;
  width: 49%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
}

textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: 'Monaco', courier, monospace;
  padding: 20px;
}

code {
  color: #f66;
}
</style>