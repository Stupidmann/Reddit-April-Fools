<template>
  <div>
    <h2>Segundos restantes:</h2>
    <div class="d-flex flex-column">
      <div class="minute mb-2">
        {{ second }}
      </div>
      <div class="d-none">
        <CustomButton @click="resetTimer"></CustomButton>
      </div>
      <div class="mb-4">
        <CustomButton
          @click="stopTimer"
          :disabled="disabled"
          :class="disabled ? 'btn--white' : selectedColor">
          Stop
        </CustomButton>
      </div>

      <div v-if="disabled">
        <div class="mb-4">
          <CustomButton @click="countClicks">Mostrar promedios</CustomButton>
        </div>
        <div v-if="showResetButton">
          <CustomButton @click="deleteMyClick" size="sm">Reset</CustomButton>
        </div>
      </div>
      
      <div v-if="Object.keys(average).length">
        <!-- TODO: create component to display average -->
        {{ average }}
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-debugger */
import CustomButton from '@/components/CustomButton.vue';

export default {
  components: {
    CustomButton,
  },

  data() {
    return {
      timer: undefined,
      second: 60,
      selectedColor: '',
      disabled: false,
      average: {},
      showResetButton: false,
    };
  },

  watch: {
    second: function () {
      if( this.second === this.generatedNumber || this.second === 0 ) {
        this.resetTimer();
        this.generatedNumber = this.generateRandomNumber();
        console.log(this.generatedNumber);
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
          color = 'btn--grey'; break;
      }
      this.selectedColor = color;
    },

    stopTimer() {
      localStorage.setItem('myClick', JSON.stringify({myClick: true}));
      clearInterval(this.timer);
      this.setColor();
      this.generateReport();
    },

    resetTimer() {
      const clicks = JSON.parse(localStorage.getItem('clicks'));
      clicks.push(this.second);
      localStorage.setItem('clicks', JSON.stringify(clicks));
      this.setColor();
      this.second = 60;
    },

    deleteMyClick() {
      localStorage.setItem('myClick', JSON.stringify({myClick: false}));
      localStorage.setItem('clicks', JSON.stringify([]));
    },

    generateRandomNumber(min = 0, max = 60) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    generateReport() {
      const clicks = JSON.parse(localStorage.getItem('clicks'));
      this.average = parseInt(clicks.reduce((a, b) => a + b) / clicks.length, 10);
      this.showResetButton = true;
    },

    countClicks() {
      // TODO: create a better way to get average[key];
      const clicks = JSON.parse(localStorage.getItem('clicks'));
      const average = {
        colorPurple: 0,
        colorBlue: 0,
        colorGreen: 0,
        colorYellow: 0,
        colorOrange: 0,
        colorRed: 0,
        colorWhite: 0,
      };
      clicks.forEach((click) => {
        switch (true) {
          case (click >= 52):
            average.colorPurple++; break;
          case (click >= 42):
            average.colorBlue++; break;
          case (click >= 32):
            average.colorGreen++; break;
          case (click >= 22):
            average.colorYellow++; break;
          case (click >= 12):
            average.colorOrange++; break;
          case (click > 0):
            average.colorRed++; break;
          default: 
            average.colorWhite++; break;
        }
      });

      this.average = average;
    }
  },

  created() {
    this.startTimer();
    this.disabled = JSON.parse(localStorage.getItem('myClick')).myClick;
    this.generatedNumber = this.generateRandomNumber();
  }
}
</script>

<style scoped>
.minute {
  font-size: 26px;
}
</style>
