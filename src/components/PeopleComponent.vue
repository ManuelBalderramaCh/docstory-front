<template>
    <NavBarComponent></NavBarComponent>
    <div class="people-container">
      <PersonCard v-for="person in people" :key="person._id" :person="person" />
    </div>
</template>
  
<script>
  import axios from 'axios';
  import PersonCard from './PersonCard.vue';
import NavBarComponent from './NavBarComponent.vue';
  
  export default {
    data() {
      return {
        people: [],
      };
    },
    components: {
    PersonCard,
    NavBarComponent
},
    async created() {
      try {
        const response = await axios.get('https://docstory-jangelcepeda.b4a.run/people');
        this.people = response.data.obj;
      } catch (error) {
        console.error(error);
      }
    },
  };
</script>
  
<style scoped>
  .people-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>