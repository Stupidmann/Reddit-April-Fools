<template>
  <section class="container">
    <Counter></Counter>
    <Counter></Counter>
    <Counter></Counter>
    <Counter></Counter>
    <Counter></Counter>
    <Counter></Counter>
    <Counter></Counter>
  </section>
</template>

<script>
import Counter from '@/components/Counter.vue';

export default {
  name: 'ButtonContainer',

  components: {
    Counter,
  },
}
</script>

