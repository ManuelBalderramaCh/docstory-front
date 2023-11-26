<template>
  <NavBarComponent></NavBarComponent>
    <div class="hero">
      <div class="hero-background" :style="{ backgroundImage: `url(/savoy-hotel.jpg)` }">
        <div class="hero-content">
          <h1>Doc Story</h1>
          <AboutSection />
        </div>
      </div>
    </div>
</template>

<script>
import AboutSection from './AboutSection.vue';
import NavBarComponent from './NavBarComponent.vue';

export default {
  name: 'HomeComponent',
  components: {
    AboutSection,
    NavBarComponent
},
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

html, body {
  margin: 0;
  padding: 0;
}

.hero-background {
  height: 100vh;
  width: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.hero-content h1 {
  color:#dd5100;
  font-family: 'Lobster', cursive;
  margin-bottom: 95%; /* ajusta este valor para mover el texto hacia arriba */
  font-size:  100px;
}
</style>