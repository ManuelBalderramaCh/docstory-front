<template>
    <AdminNavbar></AdminNavbar>
    <div class="container mt-5">
      <h2>Create a new place</h2>
      <form @submit.prevent="createPlace" class="row g-3">
        <div class="col-6">
          <label class="form-label">Name</label>
          <input v-model="place.name" type="text" class="form-control" placeholder="Name" required>
        </div>
        <div class="col-6">
          <label class="form-label">Description</label>
          <input v-model="place.description" type="text" class="form-control" placeholder="Description" required>
        </div>
        <div class="col-6">
          <label class="form-label">Country</label>
          <input v-model="place.country" type="text" class="form-control" placeholder="Country" required>
        </div>
        <div class="col-6">
          <label class="form-label">City</label>
          <input v-model="place.city" type="text" class="form-control" placeholder="City" required>
        </div>
        <div class="col-6">
          <label class="form-label">Street</label>
          <input v-model="place.street" type="text" class="form-control" placeholder="Street" required>
        </div>
        <div class="col-6">
          <label class="form-label">Number</label>
          <input v-model="place.number" type="number" class="form-control" placeholder="Number" required>
        </div>
        <div class="col-6">
          <label class="form-label">Interior</label>
          <input v-model="place.interior" type="text" class="form-control" placeholder="Interior">
        </div>
        <div class="col-6">
          <label class="form-label">ZIP</label>
          <input v-model="place.zip" type="text" class="form-control" placeholder="ZIP" required>
        </div>
        <div class="col-6">
          <label class="form-label">Latitude</label>
          <input v-model="place.latitud" type="text" class="form-control" placeholder="Latitude" required>
        </div>
        <div class="col-6">
          <label class="form-label">Longitude</label>
          <input v-model="place.longitud" type="text" class="form-control" placeholder="Longitude" required>
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary">Create Place</button>
        </div>
      </form>
      <h2>Delete a place</h2>
      <form @submit.prevent="deletePlace" class="row g-3">
       <div class="col-6">
         <label class="form-label">Select Place</label>
         <select v-model="selectedPlace" class="form-control" required>
           <option disabled value="">Please select one</option>
           <option v-for="place in places" :key="place._id" :value="place._id">
             {{ place._name }}
           </option>
         </select>
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-danger">Delete Place</button>
      </div>
    </form>
      
    </div>
  </template>
<script>
  import axios from 'axios';
  import AdminNavbar from './AdminNavbar.vue';
  import Swal from 'sweetalert2';

  export default {
    components:{
    AdminNavbar
},
    data() {
      return {
        place: {
          name: '',
          description: '',
          country: '',
          city: '',
          street: '',
          number: '',
          interior: '',
          zip: '',
          latitud: '',
          longitud: ''
        },
        places: [],
        selectedPlace: ''
      };
    },
    methods: {
      createPlace() {
        axios.post('https://docstory-jangelcepeda.b4a.run/admin/places', this.place)
          .then(response => {
            Swal.fire({
              tittle: 'Creado',
              text: 'El lugar se ha creado',
              icon: 'success'
            });
            console.log(response);
            // puedes agregar aquí cualquier acción adicional, como redirigir al usuario o mostrar un mensaje de éxito
          })
          .catch(error => {
            console.log(error);
            // puedes agregar aquí cualquier acción adicional, como mostrar un mensaje de error
          });
      },
      deletePlace(){
        axios.delete(`https://docstory-jangelcepeda.b4a.run/admin/places/${this.selectedPlace}`)
             .then(response => {
                console.log(response);
                  Swal.fire({
                  icon: 'info',
                  title: '¿Seguro que quieres eliminar este lugar?',
                  text: 'Esta acción no se puede deshacer',
                  showCancelButton: true,
                  confirmButtonText: 'Eliminar'
                }).then((result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                    Swal.fire('Eliminado!', '', 'success')
                  } 
                })

             }).catch(err => {
                console.log(err)
             })
      },
    },
    created(){
        axios.get('https://docstory-jangelcepeda.b4a.run/places')
             .then(response => {
                this.places = response.data.obj;
             }).catch(err => {
                console.log(err);
             })
      }
  };
</script>
<style scoped>
.fixed{
    display: fixed;
}
</style>
