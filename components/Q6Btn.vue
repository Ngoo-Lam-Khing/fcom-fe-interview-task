<template>
  <button :class="['odds-btn', buttonClass]">
    <span class="label">{{ label }}</span>:
    <span class="odds">{{ odds }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  label: string;
  odds: number;
  selected: boolean;
  conflict: boolean;
}>();

const buttonClass = computed(() => {
  if (props.conflict) {
    return 'conflict';
  } else if (props.selected) {
    return 'selected';
  } else {
    return '';
  }
});
</script>

<style scoped>
.odds-btn {
  border-radius: 5px;
  padding: 10px 0;
  cursor: pointer;
  background: #fff;
  color: #000;
  font-weight: bold;
  font-size: 1rem;
}

.odds-btn.selected {
  background: #52f78e;
}

.odds-btn.conflict {
  background: #fd7777;
}

.label,
.odds {
  margin-bottom: 0.25rem;
}
.label {
  text-transform: capitalize;
}
</style>