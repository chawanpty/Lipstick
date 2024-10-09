<template>
  <div>
    <div class="nv-navbar">
      <ul class="nav">
        <li><router-link :to="{ name: 'login' }">Login</router-link></li>
        <li><router-link :to="{ name: 'users' }">Users</router-link></li>
        <li><router-link :to="{ name: 'blogs' }">Lipstick</router-link></li>
        
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.nv-navbar {
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  width: 100%;
  padding: 15px 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.nv-navbar .nav {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex; /* ใช้ flexbox เพื่อจัดเรียง */
  justify-content: center; /* จัดให้กลาง */
  gap: 30px; /* เว้นระยะระหว่างรายการ */
}

.nv-navbar .nav li {
  position: relative; /* สำหรับเอฟเฟกต์ hover */
}

.nv-navbar .nav li a {
  padding: 10px 20px; /* เพิ่ม padding เพื่อพื้นที่คลิกที่ดีกว่า */
  text-decoration: none;
  color: white; /* เปลี่ยนสีตัวอักษรให้ตัดกับพื้นหลัง */
  font-weight: bold;
  transition: color 0.3s, transform 0.3s; /* เพิ่มการเปลี่ยนแปลงเมื่อโฮเวอร์ */
  border-radius: 25px; /* มุมมนสำหรับลิงก์ */
}

.nv-navbar .nav li a:hover {
  color: #ffd700; /* เปลี่ยนสีเมื่อโฮเวอร์ */
  transform: translateY(-3px); /* ยกเล็กน้อยเมื่อโฮเวอร์ */
}

.nv-navbar .nav li a.router-link-active {
  background-color: rgba(255, 255, 255, 0.2); /* พื้นหลังสำหรับลิงก์ที่ใช้งานอยู่ */
  color: #ffd700; /* สีลิงก์ที่ใช้งานอยู่ */
}

.clearfix {
  clear: left;
}
</style>
