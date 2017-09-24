<template>
  <div class="container">
    <button v-on:click="handleBreak(1)">+</button>
    <span>{{ breakLen }}</span>
    <button v-on:click="handleBreak(-1)">-</button>

    <button v-on:click="handleSession(1)">+</button>
    <span>{{ session }}</span>
    <button v-on:click="handleSession(-1)">-</button>
    <div class="rest">{{ rest }}</div>
    <button class="start" v-on:click="handleClick">{{ isPause ? 'start' : 'pause' }}</button>
    <div class="water"></div>
  </div>
</template>

<script>
export default {
  name: 'pomodoro',
  data() {
    return {
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
    handleClick() {
      const { isPause } = this;
      if (isPause) {
        this.isPause = !isPause;
        this.timer = setInterval(this.setRestTime, 1000);
      } else {
        clearInterval(this.timer);
        this.isPause = !isPause;
      }
    },
    setRestTime() {
      const { restSeconds } = this;
      if (restSeconds === 0) {
        if (this.timer) { clearInterval(this.timer); }
        if (this.isBreak) {
          this.isBreak = !this.isBreak;
          this.restSeconds = this.session * 60;
          this.rest = this.session;
          this.timer = setInterval(this.setRestTime, 1000);
        } else {
          this.isBreak = !this.isBreak;
          this.restSeconds = this.breakLen * 60;
          this.rest = this.breakLen;
          this.timer = setInterval(this.setRestTime, 1000);
        }
        return;
      }
      const newRestSeconds = restSeconds - 1;
      const restMinu = Math.floor(newRestSeconds / 60);
      const restSec = Math.floor(newRestSeconds % 60);
      this.rest = `${restMinu}:${restSec}`;
      this.restSeconds = newRestSeconds;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.rest {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 6rem;
  font-weight: 300;
  line-height: 1;
  z-index: 9;
}
.start {
  position: absolute;
  width: 50%;
  bottom: 8%;
  left: 25%;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 1.5rem;
  text-align: center;
  text-transform: uppercase;
  font-size: 1.2rem;
  padding: .7rem 0;
  background: none;
  font-weight: 400;
  cursor: pointer;
  z-index: 10;
}

.water {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 5;
  top: 0;
  left: 0;
  background: #32bafa;
  transform: translate(0, 0);
}

</style>
