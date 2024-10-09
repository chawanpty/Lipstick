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
  
      <div class="lipstick-card" v-for="blog in blogs" v-bind:key="blog.id">
        <img class="lipstick-image" :src="BASE_URL + blog.pictures" alt="Lipstick image">
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
                  blogs: []
              }
          },
          async created () {
              this.blogs = (await BlogsService.index()).data
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
              }
          }
      }
  </script>
  
  <style scoped>
  /* General Layout */
body {
  font-family: 'Poppins', sans-serif;
  background-color: #f4f7fc;
  color: #333;
  margin: 0;
  padding: 0;
  line-height: 1.6;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  padding: 20px;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}

.logout-btn {
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 50px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease, transform 0.3s;
}

.logout-btn:hover {
  background-color: #ff5252;
  transform: scale(1.05);
}

.lipstick-list-container {
  max-width: 1100px;
  margin: 40px auto;
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.lipstick-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.add-btn {
  background: linear-gradient(45deg, #4CAF50, #43a047);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 50px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease, transform 0.3s;
}

.add-btn:hover {
  background: linear-gradient(45deg, #43a047, #388e3c);
  transform: scale(1.05);
}

/* Lipstick Cards */
.lipstick-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.lipstick-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.lipstick-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #4CAF50;
}

.lipstick-details {
  flex-grow: 1;
  padding: 0 20px;
}

.lipstick-details p {
  margin: 5px 0;
  font-size: 14px;
  color: #555;
}

.lipstick-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 30px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s;
}

.view-btn {
  background: linear-gradient(45deg, #3f51b5, #5a67d8);
  color: white;
}

.view-btn:hover {
  background: linear-gradient(45deg, #5a67d8, #6b8be3);
  transform: scale(1.05);
}

.edit-btn {
  background-color: #FFC107;
  color: white;
}

.edit-btn:hover {
  background-color: #ffb300;
  transform: scale(1.05);
}

.delete-btn {
  background-color: #ff6b6b;
  color: white;
}

.delete-btn:hover {
  background-color: #ff5252;
  transform: scale(1.05);
}

  </style>
  