<template>
    <NavBarComponent></NavBarComponent>
    <h1 class="titles">Time Line</h1>
    <iframe src='https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=1tOleHcZ4nfBW-3poYCau7m3k1Bxo3hwM5LnKEdJrM_I&font=Default&lang=en&initial_zoom=2&height=550' width='100%' height='550' webkitallowfullscreen mozallowfullscreen allowfullscreen frameborder='0'></iframe>
</template>

<script>
    import NavBarComponent from './NavBarComponent.vue';
    export default{
        components:{
            NavBarComponent
        }
    }
</script>
<style scoped>
.titles {
  color: orange;
  font-family: 'Lobster', cursive;
  font-size: 65px;  /* Ajusta el tamaño del texto según tus necesidades */
  text-align: center;  /* Centra el texto */
  margin-bottom: auto;
}

</style>