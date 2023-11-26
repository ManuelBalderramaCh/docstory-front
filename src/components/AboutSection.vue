<template>
    <NavBarComponent></NavBarComponent>
    <section class="about">
      <p>Watts Coulson Document colection</p>
    </section>
</template>
  
<script>
import NavBarComponent from './NavBarComponent.vue';

  export default {
    name: "AboutSection",
    components: NavBarComponent,
};
</script>
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
.about {
  color: rgb(255, 255, 255);
  font-family: 'Lobster', cursive;
  font-size: 30px;  /* Ajusta el tamaño del texto según tus necesidades */
  text-align: center;  /* Centra el texto */
  margin-bottom: auto;
}
</style>