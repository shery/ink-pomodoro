<template>
  <div id="app">
    <Pomodoro></Pomodoro>
  </div>
</template>

<script>
import Pomodoro from './components/Pomodoro';

export default {
  name: 'app',
  components: {
    Pomodoro,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
