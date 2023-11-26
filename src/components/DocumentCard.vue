<template>
  <router-link :to = "`/document/${document._id}`">
  <div class="document-card">
    <div class="document-info">
      <h2>{{ document._title }}</h2>
      <p>Date: {{ formatDate(document._date) }}</p>
      <p>Description: {{ document._description }}</p>
    </div>
    <div class="document-image">
      <img v-if="document._photos && document._photos.length > 0" :src="document._photos[0]" alt="Document photo">
    </div>
  </div>
  </router-link>
</template>

<script>
export default {
  props: {
    document: Object,
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');


.document-card {
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 2px 2px 6px rgba(0,0,0,0.1);
  padding: 10px;
  margin: 10px;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.document-info {
  font-family: 'Montserrat';
}

.document-image {
  height: 200px;
  width: 100%;
}

.document-image img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>