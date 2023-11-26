<template>
    <NavBarComponent></NavBarComponent>
    <div class="document-container">
      <DocumentCard v-for="document in documents" :key="document._id" :document="document" />
    </div>
</template>
  
<script>
  import axios from 'axios';
  import DocumentCard from './DocumentCard.vue';
import NavBarComponent from './NavBarComponent.vue';
  
  export default {
    data() {
      return {
        documents: [],
      };
    },
    components: {
    DocumentCard,
    NavBarComponent
},
    async created() {
      try {
        const response = await axios.get('https://docstory-jangelcepeda.b4a.run/documents');
        this.documents = response.data.obj;
        console.log(this.documents)
      } catch (error) {
        console.error(error);
      }
    },
  };
</script>
  
<style scoped>
  .document-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>