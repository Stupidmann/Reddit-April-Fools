<template>
  <button class="btn"
          :class="[
            `btn--${color}`,
            `btn-${size}`,
          ]"
          :disabled="disabled"
          :type="action"
          @click="clickButton()">
    <slot></slot>
    <md-icon v-if="icon">{{ icon }}</md-icon>
  </button>
</template>

<script>
export default {
  name: 'custom-button',
  props: {
    color: {
      type: String,
      default: 'info',
    },
    size: {
      type: String,
      default: 'medium',
    },
    action: {
      type: String,
      default: 'button',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
    },
  },
  methods: {
    clickButton() {
      this.$emit('click');
    },
  },
};
</script>

<style scoped src="@css/components/button.css"></style>
