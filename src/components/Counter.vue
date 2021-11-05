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
          :class="selectedColor">
          Detener
        </CustomButton>
      </div>
      
      <div v-if="showAverageTable && Object.keys(average).length">
        <!-- TODO: create component to display average -->
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Cantidad</th>
              <th scope="col">Purpura</th>
              <th scope="col">Azul</th>
              <th scope="col">Verde</th>
              <th scope="col">Amarillo</th>
              <th scope="col">Naranja</th>
              <th scope="col">Rojo</th>
              <th scope="col">Gris</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">#</th>
              <td v-for="(clicks, index) in average" :key="index">{{ clicks }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- <div> -->
      <div v-if="showResetButton">
        <CustomButton @click="deleteMyClick" size="sm">Reset</CustomButton>
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
      showAverageTable: false,
    };
  },

  watch: {
    second: function () {
      if( this.second === this.generatedNumber || this.second === 0 ) {
        this.resetTimer();
        this.generatedNumber = this.generateRandomNumber();
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
      const clicks = JSON.parse(localStorage.getItem('clicks'));
      clicks.push(this.second);
      localStorage.setItem('clicks', JSON.stringify(clicks));
      localStorage.setItem('myClick', JSON.stringify({myClick: true}));
      clearInterval(this.timer);
      this.setColor();
      this.disabled = true;
      this.countClicks();
    },

    resetTimer() {
      this.countClicks();
      const clicks = JSON.parse(localStorage.getItem('clicks'));
      clicks.push(this.second);
      localStorage.setItem('clicks', JSON.stringify(clicks));
      this.setColor();
      this.second = 60;
    },

    deleteMyClick() {
      localStorage.setItem('myClick', JSON.stringify({myClick: false}));
      localStorage.setItem('clicks', JSON.stringify([]));
      this.disabled = false;
      this.showResetButton = false;
      this.showAverageTable = false;
      this.timer = undefined;
      this.second = 60;
      this.selectedColor = '';
      this.startTimer();
    },

    generateRandomNumber(min = 0, max = 60) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
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
      this.showResetButton = true;
      this.showAverageTable = true;
    }
  },

  created() {
    this.startTimer();
    const myClick = JSON.parse(localStorage.getItem('myClick'));
    if (myClick) {
      this.disabled = myClick.myClick;
      if (this.disabled) {
        this.countClicks();
        this.showAverageTable = true;
      }
    }
    this.generatedNumber = this.generateRandomNumber();
  }
}
</script>

<style scoped>
.minute {
  font-size: 26px;
}
</style>
