<template>
  <div class="login-container">
    <h1>User Login</h1>
    <form v-on:submit.prevent="onLogin">
      <p>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" v-model="email" required />
      </p>
      <p>
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="password"
          required
        />
      </p>
      <p>
        <button type="submit">Login</button>
      </p>
      <div class="error" v-if="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import AuthenService from "../services/AuthenService";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async onLogin() {
      try {
        const response = await AuthenService.login({
          email: this.email,
          password: this.password,
        });

        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);

        this.$router.push({
          name: "users",
        });
      } catch (error) {
        console.log(error);
        this.error = error.response.data.error;
        this.email = "";
        this.password = "";
      }
    },
  },
};
</script>

<style scoped>
/* General Layout */
body {
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  color: #333;
  margin: 0;
  padding: 0;
  line-height: 1.6;
}

h1 {
  font-size: 36px;
  color: #ff6f91;
  text-align: center;
  margin-bottom: 40px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

/* Form Styling */
form {
  max-width: 800px;
  margin: 50px auto;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 25px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

form:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 50px rgba(0, 0, 0, 0.2);
}

p {
  margin-bottom: 20px;
  font-size: 16px;
}

input[type="email"],
input[type="password"] {
  width: 95%; /* ปรับขนาดช่องกรอกข้อมูลให้พอดี */
  padding: 12px;
  margin-top: 10px;
  border: 2px solid #ddd;
  border-radius: 15px;
  box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.05);
  font-size: 16px;
  transition: all 0.3s ease;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

input[type="email"]:focus,
input[type="password"]:focus {
  border-color: #ff6f91;
  box-shadow: 0 0 15px rgba(255, 111, 145, 0.4);
  outline: none;
}


/* Buttons Styling */
button {
  background: linear-gradient(135deg, #ff6f91, #ff9671, #ffc75f);
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease, transform 0.3s ease;
  margin-right: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

button:hover {
  background: linear-gradient(135deg, #ff6584, #ff4757);
  transform: scale(1.1);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

button:focus {
  outline: none;
}

/* Error Message Styling */
.error {
  color: red;
  font-size: 14px;
  margin-top: 20px;
  text-align: center;
}
</style>
