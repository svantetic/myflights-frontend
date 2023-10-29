<template>
  <UCard>
    <div ref="map" id="map" :class="modalClass"></div>
  </UCard>
</template>

<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import { onMounted, ref } from 'vue';

const props = defineProps({
  isInModal: {
    type: Boolean,
    required: false,
    default: false,
  }
});

const { isInModal } = toRefs(props);

let mapRef = ref();

const modalClass = computed(() => isInModal ? 'h-screen' : '');

onMounted(async () => {
  const { flights } = useFlights();
  const { useMap } = await import('@/composables/map.composable');
  const { drawFlightsOnMap, initializeMap } = useMap(mapRef);
  mapRef.value = initializeMap(mapRef.value);

  await drawFlightsOnMap(flights);
});

</script>

<style>
#map {
  height: 870px;
  width: 100%;
}


@media screen and (max-width: 1024px) {
  /* #map {
    height: 600px;
  } */
}
</style>
