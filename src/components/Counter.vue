<template>
  <div>
    <h2>Segundos restantes:</h2>
    <div class="d-flex flex-column">
      <div class="minute mb-2">
        {{ second }}
      </div>
      <div>
        <customButton @click="stopTimer" :class="selectedColor">Stop</customButton>
      </div>
    </div>
  </div>
</template>

<script>
import customButton from '@/components/CustomButton.vue';

export default {
  components: {
    customButton,
  },
  data() {
    return {
      timer: undefined,
      second: 60,
      selectedColor: '',
    };
  },

  props: {
    seconds: {
      type: Number,
      default: 60,
    }
  },

  watch: {
    second: function () {
      if( this.second === 0 ) {
        this.stopTimer();
      }
    },
  },

  methods: {
    startTimer(){
      this.timer = setInterval(() => {
          this.second--;
      }, 1000);
    },

    setColor() {
      let color = '';
      switch (true) {
        case (this.second >= 52):
          color = 'btn--purple'; break;
        case (this.second >= 42):
          color = 'btn--blue'; break;
        case (this.second >= 32):
          color = 'btn--green'; break;
        case (this.second >= 22):
          color = 'btn--yellow'; break;
        case (this.second >= 12):
          color = 'btn--orange'; break;
        case (this.second > 0):
          color = 'btn--red'; break;
        default: 
          color = 'btn--white'; break;
      }
      this.selectedColor = color;
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

<style scoped>
.minute {
  font-size: 26px;
}
</style>
