<template>
  <section class="container pt-3">
    <Counter />
  </section>
</template>

<script>
import Counter from '@/components/Counter.vue';

export default {
  name: 'ButtonContainer',

  components: {
    Counter,
  },

  beforeMount() {
    if (!localStorage.getItem('clicks')) {
      localStorage.setItem('clicks', JSON.stringify([]));
    }

    if (!localStorage.getItem('clicks')) {
      localStorage.setItem('myClick', JSON.stringify({myClick: false}));
    }
  }
}
</script>

