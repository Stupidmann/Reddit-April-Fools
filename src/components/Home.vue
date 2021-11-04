<template>
  <section class="container">
    <div v-for="(number, index) in numbers" :key="index">
      <Counter :stopAt="number"></Counter>
    </div>
    <Counter></Counter>
  </section>
</template>

<script>
import Counter from '@/components/Counter.vue';

export default {
  name: 'ButtonContainer',

  data() {
    return {
      numbers: [],
    }
  },

  components: {
    Counter,
  },

  methods: {
    generateRandomNumber(min = 0, max = 60) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  },

  beforeMount() {
    for (let i = 0; i <= 7; i++) {
      this.numbers.push(this.generateRandomNumber());
    }
  }
}
</script>

