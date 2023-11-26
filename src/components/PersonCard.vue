<template>
  <div class="person-card" v-if="person && person._birth_place">
    <h2>{{ person._name }} {{ person._lastName }}</h2>
    <p>Born: {{ formatDate(person._date_of_birth) }}</p>
    <p>Birth Place: {{ person._birth_place._name }}, {{ person._birth_place._city }}, {{ person._birth_place._country }}</p>
    <p>Death Place: {{ person._death_place._name }}, {{ person._death_place._city }}, {{ person._death_place._country }}</p>
    
    <p v-if="person._father">Father: {{ person._father._name }} {{ person._father._lastName }}</p>
    <p v-else>No Father Info</p>
    <p v-if="person._mother">Mother: {{ person._mother._name }} {{ person._mother._lastName }}</p>
    <p v-else>No Mother Info</p>
    <div ref="mapContainer"></div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import L from 'leaflet';

export default {
  props: {
    person: Object,
  },
  setup(props) {
    const map = ref(null);
    const mapContainer = ref(null);
    const initializeMap = () => {
      if (props.person && props.person._birth_place) {
        if (map.value != null) {
          map.value.remove(); // esto borra el mapa anterior
        }
        map.value = L.map(mapContainer.value).setView([props.person._birth_place._latitud, props.person._birth_place._longitud], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
          maxZoom: 18,
        }).addTo(map.value);
        L.marker([props.person._birth_place._latitud, props.person._birth_place._longitud]).addTo(map.value);
      }
    };

    onMounted(initializeMap);
    watch(() => props.person._birth_place, initializeMap);

    return {
      map,
      mapContainer,
    };
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>

<style scoped>
 @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
 @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
.person-card {
  font-family: 'Montserrat';
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 2px 2px 6px rgba(0,0,0,0.1);
  padding: 10px;
  margin: 10px;
  background-color: rgb(255, 255, 255);
}
div[ref="mapContainer"] {
  height: 200px;
  width: 100%;
}
</style>