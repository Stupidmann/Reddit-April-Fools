<template>
  <div>
    <div>
      segundos restantes: {{ minute }}
    </div>
    <button @click="stopTimer">Stop</button>
  </div>
</template>

<script>
export default {
  name: 'ButtonContainer',
  data() {
    return {
      timer: undefined,
      minute: 60,
      colors: ['purple', 'blue', 'green', 'yellow', 'orange', 'red', 'grey', 'white'],
    };
  },

  methods: {
    startTimer(){
      this.timer = setInterval(() => {
          this.minute--;
      }, 1000);
    },

    setColor() {
      console.log(this.colors);
    },

    stopTimer() {
      clearInterval(this.timer);
    }
  },

  created() {
    this.startTimer();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.purple {
  color: #821480;
}

.blue {
  color: #0083c7;
}

.green {
  color: #02be01;
}

.yellow {
  color: #e5d901;
}

.orange {
 color: #e59501;
}

.red {
  color: #e51000;
}

.grey {
  color: #888888;
}

.white {
  color: #e4e4e4;
}
</style>
