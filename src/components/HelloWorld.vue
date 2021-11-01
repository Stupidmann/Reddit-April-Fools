<template>
  <div>
    <div>
      segundos restantes: {{ minute }}
    </div>
    <div :class="selectedColor">
      <button button @click="stopTimer" class="">Stop</button>
    </div>
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
      selectedColor: '',
    };
  },

  methods: {
    startTimer(){
      this.timer = setInterval(() => {
          this.minute--;
      }, 1000);
    },

    setColor() {
      let color = '';
      switch (true) {
        case (this.minute >= 52):
          color = `.${this.colors[0]}`;
          break;
        case (this.minute >= 42):
          color = `.${this.colors[1]}`;
          break;
        case (this.minute >= 32):
          color = `.${this.colors[2]}`;
          break;
        case (this.minute >= 22):
          color = `.${this.colors[3]}`;
          break;
        case (this.minute >= 12):
          color = `.${this.colors[4]}`;
          break;
        case (this.minute >= 0):
          color = `.${this.colors[5]}`;
          break;
        default: 
          color = 'default'
      }

      console.log(color);
    },

    stopTimer() {
      clearInterval(this.timer);
      this.setColor();
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
