<template>
  <div>
    <h1>Create User</h1>
    <form v-on:submit.prevent="createUser">
      <p>
        Name:
        <input type="text" v-model="user.name" />
      </p>
      <p>
        Lastname:
        <input type="text" v-model="user.lastname" />
      </p>
      <p>
        Email:
        <input type="text" v-model="user.email" />
      </p>
      <p>
        Password:
        <input type="password" v-model="user.password" />
      </p>
      <p>
        <button type="submit">Create User</button>
        <button v-on:click="navigateTo('/users')">Back</button>
      </p>
    </form>
  </div>
</template>

<script>
import UsersService from '../../services/UsersService';
export default {
  data() {
    return {
      user: {
        name: '',
        lastname: '',
        email: '',
        password: '',
        status: 'active'
      }
    };
  },
  methods: {
    async createUser() {
      try {
        await UsersService.post(this.user);
        this.$router.push('/users');
      } catch (err) {
        console.log(err);
      }
    },
    navigateTo(route) {
      this.$router.push(route);
    }
  }
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

input[type="text"],
input[type="password"] {
  width: 95%; /* เปลี่ยนจาก 100% เป็น 95% */
  padding: 15px;
  margin-top: 10px;
  border: 2px solid #ddd;
  border-radius: 15px;
  box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.05);
  font-size: 16px;
  transition: all 0.3s ease;
}


input[type="text"]:focus,
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

button:last-of-type {
  background: linear-gradient(135deg, #ff6b6b, #f94d5b);
}

button:last-of-type:hover {
  background: linear-gradient(135deg, #f94d5b, #d84343);
}
</style>
