<template>
  <div class="lg:container lg:mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FlightsList
        @open-map="openMap"
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
                @click="closeMap()"
            /></template>
            <FlightsMap></FlightsMap>
          </UCard>
        </UModal>
      </template>
      <template v-else>
        <FlightsMap
          class="hidden md:block"
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

const closeMap = () => {
  isModalOpen.value = false;
}
</script>
