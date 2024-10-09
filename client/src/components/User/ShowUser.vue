<template>
  <div class="user-show-container">
    <header>
      <h1>Show User</h1>
    </header>
    
    <div class="user-details">
      <div class="details-content">
        <p><strong>ID:</strong> {{ user.id }}</p>
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Lastname:</strong> {{ user.lastname }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Password:</strong> {{ user.password }}</p>
        <p><strong>Status:</strong> {{ user.status }}</p>
        <p><strong>Created At:</strong> {{ user.createdAt }}</p>
      </div>
    </div>

    <button class="back-btn" v-on:click="navigateTo('/users')">Back</button>
  </div>
</template>

<script>
import UsersService from "@/services/UsersService";

export default { 
  data() {
    return {
      user: {}
    }
  },
  async created() {
    try {
      var userId = this.$route.params.userId;
      this.user = (await UsersService.show(userId)).data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    }
  }
}
</script>

<style scoped>
/* General Layout */
.user-show-container {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: white;
  border-radius: 25px;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.1);
}

/* Header Style */
header {
  text-align: center;
  margin-bottom: 20px;
}

header h1 {
  font-size: 36px;
  color: #ff6f91;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

/* User Details */
.user-details {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.details-content {
  flex-grow: 1;
  font-size: 16px;
}

.details-content p {
  margin: 8px 0;
  color: #555;
  font-weight: bold;
}

.details-content p strong {
  color: #ff6f91;
  font-size: 18px;
}

/* Back Button Style */
.back-btn {
  display: block;
  width: auto;
  margin: 20px auto;
  background-color: #ff6584;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease, transform 0.3s;
}

.back-btn:hover {
  background-color: #ff4757;
  transform: scale(1.08);
}

/* Edit Button Style (optional) */
.edit-btn {
  background-color: #ab45e2;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease, transform 0.3s;
}

.edit-btn:hover {
  background-color: #23211e;
  transform: scale(1.1);
}
</style>
