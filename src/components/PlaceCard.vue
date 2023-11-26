<template>
  <div class="place-card">
    <h2>{{ place._name }}</h2>
    <p>{{ place._description }}</p>
    <p>{{ place._street }}, {{ place._city }}, {{ place._country }}</p>
    <div id="mapid" style="height: 400px;"></div>
  </div>
  </template>
  
  <script>
  import L from 'leaflet';
  
  export default {
    name:'PlaceCard',
    props: ['place'],
    mounted() {
      const map = L.map(this.$el.querySelector('#mapid')).setView([this.place._latitud, this.place._longitud], 13);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);
      let customIcon = L.icon({
            iconUrl:`/images/ubicacion.png`,
            iconSize: [30, 30], // Especifica el tamaño del ícono aquí. Los valores son [ancho, alto]
            iconAnchor: [20, 90], // Especifica el punto de anclaje del ícono. Los valores son [izquierda, arriba]
            popupAnchor: [-3, -76] 
        })
  
      L.marker([this.place._latitud, this.place._longitud],{icon:customIcon}).addTo(map);
    },
  };
</script>
  
<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
  .place-card {
    font-family: 'Montserrat';
    width: 300px;
    border: 1px solid rgb(170, 165, 185);
    border-radius: 10px;
    box-shadow: 2px 2px 6px rgba(255, 255, 255, 0.1);
    padding: 10px;
    margin: 10px;
    background-color: rgb(255, 255, 255)
  }
  
</style>