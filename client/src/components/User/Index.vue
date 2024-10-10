<template>
  <div class="user-list-container">
    <h1>Get All Users</h1>
    <div>
      <button class="add-btn" v-on:click="navigateTo('/user/create')">Create User</button>
    </div>
    <hr>
    <div v-if="users.length">
      <div class="user-summary"><b>จำนวนผู้ใช้งาน:</b> {{ users.length }} รายการ</div>
      <div v-for="user in users" v-bind:key="user.id" class="user-card">
        <div class="user-info">
          <div><b>ID:</b> {{ user.id }}</div>
          <div><b>ชื่อผู้ใช้:</b> {{ user.name }} {{ user.lastname }}</div>
          <div><b>อีเมล:</b> {{ user.email }}</div>
          <div><b>Status:</b> {{ user.status }}</div>
        </div>
        <div class="user-actions">
          <button class="action-btn view-btn" v-on:click="navigateTo('/user/'+user.id)">Show</button>
          <button class="action-btn edit-btn" v-on:click="navigateTo('/user/edit/'+user.id)">Edit</button>
          <button class="action-btn delete-btn" v-on:click="deleteUser(user)">Delete</button>
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
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1));
  backdrop-filter: blur(20px);
  padding: 30px;
  border-radius: 25px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.3);
  max-width: 1200px;
  margin: 50px auto;
  color: #fff; /* ปรับให้ตัวอักษรมีสีขาว */
  transition: all 0.4s ease;
}

.user-list-container:hover {
  transform: translateY(-10px) scale(1.02);
}

h1 {
  text-align: center;
  font-size: 3rem;
  color: #fc5c8a; /* ตัวอักษรสีขาว */
  text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5); /* เพิ่มเงาให้ตัวอักษรชัดขึ้น */
  margin-bottom: 30px;
}

/* Summary */
.user-summary {
  font-size: 24px; /* ปรับขนาดตัวอักษรให้ใหญ่ขึ้น */
  font-weight: 600;
  margin-bottom: 30px;
  text-align: center;
  color: #ff6f91; /* ใช้สีที่โดดเด่น */
  text-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3); /* เพิ่มเงา */
}

/* User Card */
.user-card {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.user-card:hover {
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.3);
  transform: translateY(-5px);
}

.user-info {
  flex-grow: 0;
  color: #ef5773; /* ปรับให้ตัวอักษรสีขาว */
  font-weight: 500;
  text-shadow: 0px 2px px rgba(0, 0, 0, 0.4); /* เพิ่มเงาให้ตัวหนังสือ */
}

.user-actions {
  display: flex;
  gap: 15px;
}

/* Buttons */
.add-btn {
  background: linear-gradient(135deg, #ff6f91, #ff9671, #ffc75f);
  color: white;
  border: none;
  padding: 14px 30px;
  border-radius: 40px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.4s ease, transform 0.3s;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.add-btn:hover {
  background: linear-gradient(135deg, #ff4757, #ff6584, #ffbc80);
  transform: scale(1.1);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.logout-btn {
  background-color: #ff4757;
  color: white;
  border: none;
  padding: 14px 30px;
  border-radius: 40px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.4s ease, transform 0.3s;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
}

.logout-btn:hover {
  background-color: #ff1e56;
  transform: scale(1.1);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
}

.action-btn {
  padding: 12px 25px;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.4s ease, transform 0.3s;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.view-btn {
  background: linear-gradient(135deg, #73bdef, #5a67d8);
  color: white;
}

.view-btn:hover {
  background: linear-gradient(135deg, #443cba, #507d98);
  transform: scale(1.1);
}

.edit-btn {
  background-color: #5ce2c7;
  color: rgb(19, 12, 12);
}

.edit-btn:hover {
  background-color: #c0f6f5;
  transform: scale(1.1);
}

.delete-btn {
  background-color: #ff6b6b;
  color: white;
}

.delete-btn:hover {
  background-color: #ff3b3b;
  transform: scale(1.1);
}



</style>
