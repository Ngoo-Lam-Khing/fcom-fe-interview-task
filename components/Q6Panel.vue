<template>
  <div class="panel">
    <div class="match-title">
      {{ match.teamHome }} <span class="vs">vs</span> {{ match.teamAway }}
    </div>

    <div class="odds-buttons">
      <OddsButton
        v-for="option in oddsOptions"
        :key="option.type"
        :label="option.label"
        :odds="option.odds"
        :selected="selections.has(option.type)"
        :conflict="selections.has(option.type) && hasConflict"
        @click="$emit('toggle', option.type)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import OddsButton from "./Q6Btn.vue";
  import { ResultType, type Match } from "@/types/q6";

  const props = defineProps<{
    match: Match;
    selections: Set<ResultType>;
  }>();

  defineEmits<{
    toggle: [result: ResultType];
  }>();

  const oddsOptions = computed(() => [
    {
      type: ResultType.HOME,
      label: ResultType.HOME,
      odds: props.match.homeOdds,
    },
    {
      type: ResultType.DRAW,
      label: ResultType.DRAW,
      odds: props.match.drawOdds,
    },
    {
      type: ResultType.AWAY,
      label: ResultType.AWAY,
      odds: props.match.awayOdds,
    },
  ]);

  const hasConflict = computed(() => props.selections.size > 1);
</script>

<style scoped>
  .panel {
    border-radius: 12px;
    padding: 1.5rem;
  }

  .match-title {
    text-align: center;
    font-size: 1.25rem;
    color: #fff;
    margin-bottom: 1rem;
  }

  .odds-buttons {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 7px;
  }
</style>
