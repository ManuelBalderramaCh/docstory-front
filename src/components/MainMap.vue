<template>
    <NavBarComponent></NavBarComponent>
    <div class="map-page">
      <h1>Main Map</h1>
      <div id="mapid" style="height: 80vh;"></div>
    </div>
</template>
  
<script>
  import L from 'leaflet';
  import axios from 'axios';
  import NavBarComponent from './NavBarComponent.vue';
  
  export default {
    name: "MainMap",
    data() {
        return {
            map: null,
            places: []
        };
    },
    async mounted() {
        this.map = L.map("mapid").setView([51.505, -0.09], 2);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>",
            maxZoom: 18,
        }).addTo(this.map);
        let customIcon = L.icon({
            iconUrl: `/images/ubicacion.png`,
            iconSize: [30, 30],
            iconAnchor: [20, 90],
            popupAnchor: [-3, -76]
        });
        try {
            let response = await axios.get("https://docstory-jangelcepeda.b4a.run/places");
            this.places = response.data.obj;
        }
        catch (error) {
            console.log(error);
        }
        // Move this code outside the try-catch block
        if (this.map && this.places) {
            this.places.forEach(place => {
                L.marker([place._latitud, place._longitud], { icon: customIcon })
                    .addTo(this.map)
                    .bindPopup(place._name)
                    .openPopup();
            });
        }
    },
    components: { NavBarComponent }
};
</script>
  
<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
  @import url('../../node_modules/leaflet/dist/leaflet.css');  
  @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
  .map-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(255, 255, 255);
    height: 100vh;
  }
  
  h1 {
    color: black;
    font-family: 'Montserrat';
  }
  
  #mapid {
    width: 100%;
  }
</style>