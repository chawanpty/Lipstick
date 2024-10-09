<template>
    <div class="lipstick-list-container">
      <header>
        <h2>Get all Lipstick</h2>
        <button class="logout-btn" v-on:click="logout">Logout</button>
      </header>
      
      <div class="lipstick-summary">
        <h4>จำนวน Lipstick {{blogs.length}} รายการ</h4>
        <button class="add-btn" v-on:click="navigateTo('/blog/create')">Add Lipstick</button>
      </div>

      <!-- ปุ่มเลือกหมวดหมู่ของลิปสติก -->
      <div class="lipstick-categories">
        <button v-on:click="clearFilter()">แสดงทั้งหมด</button>
        <button v-on:click="filterCategory('แมตต์')">เนื้อแมตต์</button>
        <button v-on:click="filterCategory('กลอส')">เนื้อกลอส</button>
        <button v-on:click="filterCategory('เชียร์')">เนื้อเชียร์และซาติน</button>
        <button v-on:click="filterCategory('ลิปมัน')">ลิปมันและลิปบาล์ม</button>
        <button v-on:click="filterCategory('ทินท์')">เนื้อทินท์</button>
        
      </div>
  
      <div class="lipstick-card" v-for="blog in filteredBlogs" v-bind:key="blog.id">
        <img class="lipstick-image" :src="BASE_URL + blog.pictures.split(', ')[0]" alt="pictures image">
        <div class="lipstick-details">
          <p><strong>ID:</strong> {{ blog.id }}</p>
          <p><strong>Name:</strong> {{ blog.name }}</p>
          <p><strong>Color:</strong> {{ blog.color }}</p>
          <p><strong>Type:</strong> {{ blog.type }}</p>
          <p><strong>Brand:</strong> {{ blog.brand }}</p>
          <p><strong>Price:</strong> {{ blog.price }} ฿</p>
        </div>
        <div class="lipstick-actions">
          <button class="action-btn view-btn" v-on:click="navigateTo('/blog/'+ blog.id)">Show</button>
          <button class="action-btn edit-btn" v-on:click="navigateTo('/blog/edit/'+ blog.id)">Edit</button>
          <button class="action-btn delete-btn" v-on:click="deleteBlog(blog)">Delete</button>
        </div>
      </div>
    </div>
</template>

<script>
    import BlogsService from '@/services/BlogsService'
    export default {
        data () {
            return {
                blogs: [],
                filteredBlogs: [],
                BASE_URL: "http://localhost:8081/assets/uploads/" // ตรวจสอบให้ตรงกับที่อยู่ของเซิร์ฟเวอร์
            }
        },
        async created () {
            this.blogs = (await BlogsService.index()).data
            this.filteredBlogs = this.blogs // เริ่มต้นแสดงทั้งหมด
        },
        methods: {
            logout () {
                this.$store.dispatch('setToken', null)
                this.$store.dispatch('setBlog', null)
                this.$router.push({ name: 'login' })
            },
            navigateTo (route) {
                this.$router.push(route)
            },
            async deleteBlog (blog) {
                let result = confirm("Want to delete?")
                if (result) {
                    try {
                        await BlogsService.delete(blog)
                        this.refreshData()
                    } catch (err) {
                        console.log(err)
                    }
                }
            },
            async refreshData() {
                this.blogs = (await BlogsService.index()).data
                this.filteredBlogs = this.blogs // อัปเดตข้อมูลหลังจากลบ
            },
            filterCategory(category) {
                this.filteredBlogs = this.blogs.filter(blog => blog.type.includes(category))
            },
            clearFilter() {
                this.filteredBlogs = this.blogs
            }
        }
    }
</script>

<style scoped>
/* General Layout */
body {
  font-family: 'Poppins', sans-serif;
  background-color: #f9f9f9;
  color: #333;
  margin: 0;
  padding: 0;
  line-height: 1.6;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #ff6f91, #ff9671, #ffc75f);
  padding: 20px 40px;
  color: white;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 20px 20px;
}

header h2 {
  margin: 0;
  font-size: 28px;
  font-weight: bold;
  letter-spacing: 1px;
}

.logout-btn {
  background-color: #ff6584;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease, transform 0.3s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.logout-btn:hover {
  background-color: #ff4757;
  transform: scale(1.08);
}

.lipstick-list-container {
  max-width: 1100px;
  margin: 50px auto;
  padding: 30px;
  background-color: white;
  border-radius: 25px;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* หมวดหมู่ลิปสติก */
.lipstick-categories {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
}

.lipstick-categories button {
  background-color: #ff9671;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 50px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s;
}

.lipstick-categories button:hover {
  background-color: #ff6f91;
  transform: scale(1.05);
}

/* Lipstick Cards */
.lipstick-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
}

.lipstick-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

.lipstick-image {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #6a11cb;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.lipstick-image:hover {
  transform: scale(1.15);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.lipstick-details {
  flex-grow: 1;
  padding: 0 30px;
  font-size: 16px;
}

.lipstick-details p {
  margin: 8px 0;
  color: #555;
  font-weight: bold;
  letter-spacing: 0.5px;
}

.lipstick-actions {
  display: flex;
  gap: 15px;
}

.action-btn {
  padding: 12px 25px;
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
  background: linear-gradient(135deg, #5a67d8, #7289da);
  transform: scale(1.1);
}

.edit-btn {
  background-color: #ab45e2;
  color: white;
}

.edit-btn:hover {
  background-color: #23211e;
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

.add-btn {
  background: linear-gradient(135deg, #ff6f91, #ff9671, #ffc75f);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.add-btn:hover {
  background: linear-gradient(135deg, #ff6584, #ff4757);
  transform: scale(1.08);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}

</style>
