<template>
  <div class="user-list-container">
    <h1>Get All Users</h1>
    <div>
      <button class="add-btn" v-on:click="navigateTo('/user/create')">สร้างผู้ใช้</button>
    </div>
    <hr>
    <div v-if="users.length">
      <div class="user-summary"><b>จำนวนผู้ใช้งาน:</b> {{ users.length }}</div>
      <div v-for="user in users" v-bind:key="user.id" class="user-card">
        <div class="user-info">
          <div><b>ID:</b> {{ user.id }}</div>
          <div><b>ชื่อผู้ใช้:</b> {{ user.name }} {{ user.lastname }}</div>
          <div><b>อีเมล:</b> {{ user.email }}</div>
          <div><b>Status:</b> {{ user.status }}</div>
        </div>
        <div class="user-actions">
          <button class="action-btn view-btn" v-on:click="navigateTo('/user/'+user.id)">ดูข้อมูล</button>
          <button class="action-btn edit-btn" v-on:click="navigateTo('/user/edit/'+user.id)">แก้ไขข้อมูล</button>
          <button class="action-btn delete-btn" v-on:click="deleteUser(user)">ลบข้อมูล</button>
        </div>
      </div>
    </div>
    <div><button class="logout-btn" v-on:click="logout">Logout</button></div>
  </div>
</template>

<script>
import UsersService from "@/services/UsersService";
export default {
  data() {
    return {
      users: []
    }
  },
  async created() {
    try {
      this.users = (await UsersService.index()).data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({ name: 'login' })
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteUser(user) {
      let result = confirm("คุณต้องการลบข้อมูลใช่หรือไม่?");
      if (result) {
        try {
          await UsersService.delete(user);
          this.refreshData();
        } catch (err) {
          console.log(err);
        }
      }
    },
    async refreshData() {
      try {
        this.users = (await UsersService.index()).data;
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
/* General Layout */
.user-list-container {
  font-family: 'Poppins', sans-serif;
  background: #f7eef5; /* Updated Background Color */
  color: #333;
  padding: 30px;
  border-radius: 25px;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 50px auto;
  transition: all 0.3s ease;
}

.user-list-container:hover {
  transform: scale(1.01);
}

h1 {
  text-align: center;
  color: #ff6f91;
  margin-bottom: 20px;
}

/* Summary */
.user-summary {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

/* User Card */
.user-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.user-card:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}

.user-info {
  flex-grow: 1;
  color: #444;
}

.user-actions {
  display: flex;
  gap: 10px;
}

/* Buttons */
.add-btn {
  background: linear-gradient(135deg, #ff6f91, #ff9671);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.add-btn:hover {
  background: linear-gradient(135deg, #ff6584, #ff4757);
  transform: scale(1.05);
}

.logout-btn {
  background-color: #ff6584;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.3s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.logout-btn:hover {
  background-color: #ff4757;
  transform: scale(1.05);
}

.action-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 30px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.view-btn {
  background: linear-gradient(135deg, #3f51b5, #5a67d8);
  color: white;
}

.view-btn:hover {
  background: linear-gradient(135deg, #e0e0e0, #f1f3fb);
  transform: scale(1.1);
}

.edit-btn {
  background-color: #ab45e2;
  color: white;
}

.edit-btn:hover {
  background-color: #8a36b7;
  transform: scale(1.1);
}

.delete-btn {
  background-color: #ff6b6b;
  color: white;
}

.delete-btn:hover {
  background-color: #ff5252;
  transform: scale(1.1);
}
</style>
