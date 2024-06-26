<template>
  <UCard>
    <template #header>
      <div class="flex justify-between items-baseline">
        <FlightsStats :flights="flights" />
        <UButton
          class="visible md:hidden"
          @click="openMap"
          icon="i-heroicons-map"
          >Open map</UButton
        >
      </div>
    </template>

    <UTable v-if="flights" :columns="columns" :rows="flights">
      <template #date-data="{ row }">
        <span>{{ formatFlightDate(row.date) }}</span>
      </template>
      <template #plane-data="{ row }">
        <span>{{ row.plane.company }}</span> <span>{{ row.plane.model }}</span>
      </template>
      <template #from-data="{ row }">
        <span>{{ row.from.city }}</span>
      </template>
      <template #airline-data="{ row }">
        <span>{{ row.airline.split("(")[0] }}</span>
      </template>
      <template #to-data="{ row }">
        <span>{{ row.to.city }}</span>
      </template>
    </UTable>

    <div v-if="error">
      {{ error }}
    </div>
  </UCard>
</template>

<script setup lang="ts">
const { data, error } = (await useFetch("/api/flights")) as {
  data: AirportsResponse;
  error: unknown;
};

const { flights, calculateDetails, extendWithId } = useFlights();

if (data?.value?.docs) {
  flights.value = extendWithId(data.value.docs);
  calculateDetails();
}

const emit = defineEmits(["open-map"]);

const openMap = () => {
  emit("open-map");
};

const formatFlightDate = (date: string) =>
  new Date(date).toLocaleDateString("pl", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

const columns = [
  {
    key: "id",
    label: "id",
    sortable: false,
  },
  {
    key: "from",
    label: "From",
    sortable: true,
  },
  {
    key: "to",
    label: "Destination",
    sortable: true,
  },
  {
    key: "hours",
    label: "Hours",
    sortable: true,
  },
  {
    key: "airline",
    label: "Airline",
    sortable: true,
  },
  {
    key: "plane",
    label: "Plane",
    sortable: true,
  },
  {
    key: "date",
    label: "Date",
    sortable: true,
  },
];
</script>
