<template>
  <div class="container">
    <button v-on:click="handleBreak(1)">+</button>
    <span>{{ breakLen }}</span>
    <button v-on:click="handleBreak(-1)">-</button>

    <button v-on:click="handleSession(1)">+</button>
    <span>{{ session }}</span>
    <button v-on:click="handleSession(-1)">-</button>
    <div class="rest">{{ rest }}</div>
    <button class="start"
            v-bind:class="{ active: startClick }"
            v-on:click="handleClick">{{ isPause ? 'start' : 'pause' }}</button>
    <div class="water" v-bind:style="{ transform: 'translate(0px, '+ down +'%)' }"></div>
  </div>
</template>

<script>
export default {
  name: 'pomodoro',
  data() {
    return {
      down: 0,
      startClick: false,
      breakLen: 5,
      session: 25,
      isBreak: false,
      isPause: true,
      rest: 25,
      restSeconds: 25 * 60,
    };
  },
  methods: {
    changeStartAction() {
      this.startClick = !this.startClick;
    },
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
        this.changeStartAction();
        setTimeout(this.changeStartAction, 300);
        this.timer = setInterval(this.setRestTime, 1000);
      } else {
        clearInterval(this.timer);
        this.isPause = !isPause;
        this.changeStartAction();
        setTimeout(this.changeStartAction, 300);
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
      if (this.isBreak) {
        this.down = 100 - Math.floor((newRestSeconds / (this.breakLen * 60)) * 100);
      } else {
        this.down = 100 - Math.floor((newRestSeconds / (this.session * 60)) * 100);
      }
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

.start:before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  border: inherit;
  border-radius: inherit;
  transition: all .2s;
}

.start.active:before {
  animation: button-scale .3s;
}


.start:focus {
  outline: none;
}

.water {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 5;
  top: 0;
  left: 0;
  background: #32bafa;
  transition: all .2s linear;
  transform: translate(0, 0);
}


@keyframes button-scale {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.4);
  }
}


</style>
