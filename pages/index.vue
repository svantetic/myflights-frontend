<template>
  <div class="lg:container lg:mx-auto mt-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FlightsList @open-map="openMap"></FlightsList>
      <template v-if="isBelowMd">
        <UModal v-model="isModalOpen" fullscreen>
          <UCard>
            <template #header>
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-x-mark-20-solid"
                class="-my-1"
                @click="closeMap()"
            /></template>
            <FlightsMap></FlightsMap>
          </UCard>
        </UModal>
      </template>
      <template v-else>
        <FlightsMap class="hidden md:block"></FlightsMap>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core';

const breakpoints = useBreakpoints(breakpointsTailwind);
const isBelowMd = breakpoints.smaller('md');

const isModalOpen = ref(false);

const openMap = () => {
  isModalOpen.value = true;
};

const closeMap = () => {
  isModalOpen.value = false;
};

useSeoMeta({
  title: 'MyFlights',
  description: 'See your historic flights',
  author: 'svantetic',
});
</script>
