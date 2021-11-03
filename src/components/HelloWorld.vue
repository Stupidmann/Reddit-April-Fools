<template>
  <div>
    <div>
      segundos restantes: {{ minute }}
    </div>
    <customButton @click="stopTimer" :class="selectedColor">Stop</customButton>
  </div>
</template>

<script>
import customButton from '@/components/customButton';

export default {
  name: 'ButtonContainer',

  components: {
    customButton,
  },

  data() {
    return {
      timer: undefined,
      minute: 60,
      selectedColor: '',
    };
  },

  watch: {
    minute: function () {
      if( this.minute === 0 ) {
        this.stopTimer();
      }
    },
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
          color = 'btn--purple'; break;
        case (this.minute >= 42):
          color = 'btn--blue'; break;
        case (this.minute >= 32):
          color = 'btn--green'; break;
        case (this.minute >= 22):
          color = 'btn--yellow'; break;
        case (this.minute >= 12):
          color = 'btn--orange'; break;
        case (this.minute > 0):
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
