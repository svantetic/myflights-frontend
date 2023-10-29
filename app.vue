<template>
  <div class="lg:container lg:mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <FlightsList
        @open-map="openMap"
        class="order-last lg:order-first"
      ></FlightsList>
      <template v-if="isSm">
        <UModal v-model="isModalOpen" fullscreen>
          <UCard
          >
            <template #header>
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-x-mark-20-solid"
                class="-my-1"
                @click="isModalOpen = false"
            /></template>
            <FlightsMap></FlightsMap>
          </UCard>
        </UModal>
      </template>
      <template v-else>
        <FlightsMap
          class="order-first lg:order-last hidden sm:block"
        ></FlightsMap>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core';
const breakpoints = useBreakpoints(breakpointsTailwind);
const isSm = breakpoints.smaller('sm');

const isModalOpen = ref(false);

const openMap = () => {
  isModalOpen.value = true;
};
</script>
