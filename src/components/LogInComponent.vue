<template>
  <NavBarComponent></NavBarComponent>
  <div class="body">
    <form class="form" @submit.prevent="login">
      <p class="form-title">Sign in to your account</p>
      <div class="input-container">
        <input v-model="email" type="email" placeholder="Enter email">
        <span></span>
      </div>
      <div class="input-container">
        <input v-model="password" type="password" placeholder="Enter password">
      </div>
      <button type="submit" class="submit">
        Sign in
      </button>
    </form>
  </div>
</template>

<script>
 import axios from 'axios'
 import NavBarComponent from './NavBarComponent.vue';
 import Swal from 'sweetalert2';
 export default {
    name: "LogInComponent",
    data() {
        return {
            email: "",
            password: "",
            msg: null,
        };
    },
    methods: {
        login() {
            axios.post("https://docstory-jangelcepeda.b4a.run/login", {
                email: this.email,
                password: this.password
            }).then(res => {
                console.log(res);
                localStorage.setItem('jwt',res.data.obj)
                Swal.fire({
                  title:'Log In',
                  text:'Success',
                  icon:'success'
                });
                this.$router.push("/admin/documents");
            }).catch(err => {
                Swal.fire({
                  icon:'info',
                  title:'Password or user incorrect',
                  text:'Incorrect credentials'
                })
                this.msg = err.response.data.message;
                console.log(err);
            });
        }
    },
    components: { NavBarComponent }
};
</script>

<style scoped>

.body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 75vh;
  margin: 0;
  background-color: #f9fafb;
}
.form {
  background-color: white;
  display: block;
  padding: 1rem;
  max-width: 350px;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  max-width: auto;
}

.form-title {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 600;
  text-align: center;
  color: #000;
}

.input-container {
  position: relative;
}

.input-container input, .form button {
  outline: none;
  border: 1px solid #e5e7eb;
  margin: 8px 0;
}

.input-container input {
  background-color: #fff;
  padding: 1rem;
  padding-right: 3rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  width: 300px;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.submit {
  display: block;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  background-color: orange;
  color: #000000;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  width: 100%;
  border-radius: 0.5rem;
  text-transform: uppercase;
}

.signup-link {
  color: #6B7280;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-align: center;
}

.signup-link a {
  text-decoration: underline;
}

</style>