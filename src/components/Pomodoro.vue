<template>
  <div class="container">
    <h1>{{ msg }}</h1>

    <button v-on:click="handleBreak(1)">+</button>
    <span>{{ breakLen }}</span>
    <button v-on:click="handleBreak(-1)">-</button>

  <button v-on:click="handleSession(1)">+</button>
  <span>{{ session }}</span>
  <button v-on:click="handleSession(-1)">-</button>
  </div>
</template>

<script>
export default {
  name: 'pomodoro',
  data() {
    return {
      msg: 'Welcome to Pomodoro Clock, a extension for Ink-Editor.',
      breakLen: 5,
      session: 25,
    };
  },
  methods: {
    handleBreak(value) {
      this.breakLen += value;
    },
    handleSession(value) {
      this.session += value;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
}

</style>
