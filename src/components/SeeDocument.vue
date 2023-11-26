<template>
  <NavBarComponent></NavBarComponent>
    <div v-if="document && document.obj" class="card-container">
      <div class="container">
        <div class="container-title">
          <h1 class="custom-title">{{ document.obj._title }}</h1>
        </div>
        <div class="d-flex flex-row justify-content-center">
          <div>
            <div class="card carousel-card">
              <img :src="document.obj._photos[currentPhotoIndex]" alt="Document photo" class="card-img-top">
              <div class="container-btns-carousel">
                <button @click="prevPhoto">&lt;</button>
                <button @click="nextPhoto">&gt;</button>
              </div>
            </div>
          </div>
          <div class="container-info">
            <p class="fw-bold fs-4">Format: <span class="fw-normal fs-5">{{ document.obj._format }}</span></p>
            <p class="fw-bold fs-4">Author: <span class="fw-normal fs-5">{{ document.obj._author }}</span></p>
            <p class="fw-bold fs-4">Sender: <span class="fw-normal fs-5">{{ document.obj._sender._name }} {{ document.obj._sender._lastName }}</span></p>
            <p class="fw-bold fs-4">Reciver: <span class="fw-normal fs-5">{{ document.obj._reciver.name }} {{ document.obj._reciver._lastName }}</span></p>
            <p class="fw-bold fs-4">Context: <span class="fw-normal fs-5">{{ document.obj._context }}</span></p>
            <p class="fw-bold fs-4">Collection: <span class="fw-normal fs-5">{{ document.obj._colection }}</span></p>
            <p class="fw-bold fs-4">Location: <span class="fw-normal fs-5">{{ document.obj._ubi }}</span></p>
            <p class="fw-bold fs-4">Date: <span class="fw-normal fs-5">{{ formatDate(document.obj._date) }}</span></p>
          </div>

        </div>
        <div>
          <div class="card map-card">
            <h2>{{ document.obj._place._title }}</h2>
            <div id="leaflet-map" style="height:400px;"></div>
          </div>
        </div>
      </div>
    </div>
      <div v-else>
        <h1>Loading...</h1>
    </div>
</template>
  
  <script>
  import { ref, onMounted, onBeforeUnmount, nextTick} from 'vue';
  import { getDocumentById } from '../services/apiService';
  import L from 'leaflet';
  import NavBarComponent from './NavBarComponent.vue';
  
  export default {
    props: ["id"],
    setup(props) {
        const document = ref(null);
        const currentPhotoIndex = ref(0);
        const dateFormat = ref(null);
        let mapInstance = null;
        const fetchDocument = async () => {
            console.log("Fetching document...");
            try {
                document.value = await getDocumentById(props.id);
                let tempDate = new Date(document.value.obj._date);
                dateFormat.value = `${tempDate.getDate() < 10 ? '0' : ''}${tempDate.getDate()}-${tempDate.getMonth()+1 < 10 ? '0' : ''}${tempDate.getMonth()+1}-${tempDate.getFullYear()}`
                console.log(dateFormat);
                console.log("Fetched document:", document.value.obj._date);
            }
            catch (error) {
                console.error("Failed to fetch document:", error);
            }
        };
        onMounted(async () => {
            await fetchDocument();
            await nextTick();
            console.log(document.value);
            if (document.value.obj._place) {
                mapInstance = L.map("leaflet-map").setView([
                    document.value.obj._place._latitud,
                    document.value.obj._place._longitud
                ], 13);
                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution: "Map data © <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors",
                    maxZoom: 18,
                }).addTo(mapInstance);
                let customIcon = L.icon({
                    iconUrl: `/images/ubicacion.png`,
                    iconSize: [30, 30],
                    iconAnchor: [20, 90],
                    popupAnchor: [-3, -76]
                });
                L.marker([document.value.obj._place._latitud, document.value.obj._place._longitud], { icon: customIcon }).addTo(mapInstance);
            }
            else {
                console.error("Document does not have _place defined");
            }
        });
        onBeforeUnmount(() => {
            if (mapInstance) {
                mapInstance.remove();
            }
        });
        const nextPhoto = () => {
            if (currentPhotoIndex.value < document.value.obj._photos.length - 1) {
                currentPhotoIndex.value++;
            }
            else {
                currentPhotoIndex.value = 0;
            }
        };
        const prevPhoto = () => {
            if (currentPhotoIndex.value > 0) {
                currentPhotoIndex.value--;
            }
            else {
                currentPhotoIndex.value = document.value.obj._photos.length - 1;
            }
        };
        return { document, currentPhotoIndex, nextPhoto, prevPhoto };
    },
    components: { NavBarComponent },
    methods:{
      formatDate(dateString){
            const options = { year: "numeric", month: "numeric", day: "numeric" };
            return new Date(dateString).toLocaleDateString(undefined, options);
      }
    }
}
  </script>

<style scoped>

  .container {
    padding: 20px;
  }
  .container-title {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
  }

  .container-info {
    margin-left: 15px;
    margin-top: 20px;
  }

  .container-btns-carousel{
    display: flex;
    justify-content: center;
  }

  .container-btns-carousel button{
    background-color: transparent;
    border: none;
    font-size: 25px;
    transition: 0.5s;
  }

  .container-btns-carousel button:hover{
    transform: scale(2);
  }

  .text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .title{
    text-align: center;
    font-family: 'Lobster', cursive;
  }
  p {
    font-family: 'Lobster', cursive;
  }
  .photo {
    align-self: flex-start;
  }
  img {
  width: 400px;  /* Ajusta este valor para cambiar el tamaño de la imagen */
  height: auto;  /* Asegura que la altura cambie proporcionalmente con el ancho */
  object-fit: contain;  /* Asegura que la imagen se ajuste a sus dimensiones sin recortar o estirar */
  }

  .card-container {
    display: flex;
    justify-content: space-between;
  }

  .text-card {
    flex-basis: 40%; /* Esto hará que la tarjeta ocupe la mitad del espacio disponible */
    margin-right: 30px; /* Añade un poco de espacio entre las tarjetas */
  }

  .carousel-card {
    flex-basis: 40%; /* Esto hará que la tarjeta ocupe la mitad del espacio disponible */
  }

  .map-card {
    /* Estilos de la tarjeta del mapa. Por ejemplo: */
    height: 400px;
  }
  
  .custom-title{
    font-family: 'Helvetica',Arial, Helvetica, sans-serif;
  }

  #leaflet-map {
    /* Estilos del mapa. Por ejemplo: */
    height: 100%;
    width: 100%;
  }

</style>