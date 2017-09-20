<template>
  <div class="container">
    <h1>{{ msg }}</h1>

    <button v-on:click="handleBreak(1)">+</button>
    <span>{{ breakLen }}</span>
    <button v-on:click="handleBreak(-1)">-</button>

    <button v-on:click="handleSession(1)">+</button>
    <span>{{ session }}</span>
    <button v-on:click="handleSession(-1)">-</button>
    <div class="rest">{{ rest }}</div>
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
      isBreak: false,
      isPause: true,
      rest: 25,
      restSeconds: 25 * 60,
    };
  },
  methods: {
    handleBreak(value) {
      if (!this.isPause) return;
      if (this.breakLen === 1 && value === -1) return;
      this.breakLen += value;
    },
    handleSession(value) {
      if (!this.isPause) return;
      if (this.session === 1 && value === -1) return;
      this.session += value;
      this.rest = this.session;
      this.restSeconds = this.session * 60;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
}
.rest {
  margin: 40px;
}

</style>
