<template>
  <div v-if="flights">
    <span>{{ flights.length }} flights </span>
    <span>{{ totalHours }} hours </span>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs, PropType } from "vue";
import { type Flight } from '~/types/flight.types';

const props = defineProps({
  flights: {
    required: true,
    type: Array as PropType<Flight[]>,
  },
});

const { flights } = toRefs(props);

const totalHours = computed(() => {
  return flights.value.reduce((acc, curr: Flight) => {
    return acc + curr.hours;
  }, 0);
});
</script>
