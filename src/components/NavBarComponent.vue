<template>
    <nav class="navbar">
      <ul class="navbar-links">
        <li><router-link to='/' class='navbar-button'>Home</router-link></li>
        <li><router-link to='/documents' class='navbar-button'>Documents</router-link></li>
        <li><router-link to="/map" class="navbar-button">Map</router-link></li>
        <li><router-link to='/places' class="navbar-button">Places</router-link></li>
        <li><router-link to='/people' class='navbar-button'>People</router-link></li>
        <li><router-link to='/timelines' class='navbar-button'>Time Line</router-link></li>
        
      </ul>
      <li><router-link to='/login' class='navbar-button'>Log In</router-link></li>
    </nav>
  </template>
  
  <script>
  export default {
  name: 'NavBar',
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
  
  .navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: black;
  color: #dd5100; /* Color del texto */
  padding: 35px;
  width: 100%;
  }
  
  .navbar-links {
  display: flex;
  gap: 10px; /* Espacio entre los botones */
  list-style: none;
  margin: 0;
  padding: 0;
  }
  
  .navbar-button {
    background-color: rgb(221, 81, 0); /* color de fondo naranja */
    border: none;
    color: rgb(0, 0, 0); /* texto negro */
    cursor: pointer;
    padding: 10px 20px; /* esto determina el tamaño del botón, ajústalo a tu gusto */
    border-radius: 30px; /* esto hace que el botón sea redondo, ajústalo a tu gusto */
    margin-left: 10px; /* espacio a la izquierda del botón */
    font-family: 'lobster';
  }
  .navbar-button.login{
    margin-left: auto;
  }
  </style>