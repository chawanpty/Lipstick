<template>
  <div>
    <h1>Add Lipstick</h1>
    <form v-on:submit.prevent="createBlog">
      <p>
        Picture:
        <input type="file" multiple @change="filesChange($event.target.files)" accept="image/*" />
      <ul class="pictures">
        <li v-for="picture in pictures" :key="picture.id">
          <br>
          <img :src="BASE_URL + picture.name" alt="picture image" style="width: 200px;">
        </li>
      </ul>
      </p>
      <p>
        Name:
        <input type="text" v-model="blog.name" />
      </p>
      <p>
        Color:
        <input type="text" v-model="blog.color" />
      </p>
      <p>
        Type:
        <input type="text" v-model="blog.type" />
      </p>
      <p>
        Brand:
        <input type="text" v-model="blog.brand" />
      </p>
      <p>
        Price:
        <input type="text" v-model="blog.price" />
      </p>
      <p>
        <button type="submit">Add Lipstick</button>
        <button v-on:click="navigateTo('/blogs')">back</button>
      </p>
    </form>
  </div>
</template>

<script>
import BlogsService from "@/services/BlogsService";
// import UploadService from "@/services/UploadService"; // เพิ่มการนำเข้า UploadService

export default {
  data() {
    return {
      blog: {
        pictures: "", // ควรเก็บเป็น array ถ้าคุณต้องการส่งหลายรูป
        name: "",
        color: "",
        type: "",
        brand: "",
        price: "",
      },
      pictures: [],
      BASE_URL: "http://localhost:8081/assets/uploads/",
    };
  },
  methods: {
    async createBlog() {
      if (this.pictures.length === 0) {
        alert("Please upload at least one picture.");
        return;
      }

      // อัปเดตชื่อไฟล์ภาพใน blog ก่อนส่งไปยังเซิร์ฟเวอร์
      this.blog.pictures = this.pictures.map(p => p.name).join(", "); // ส่งชื่อรูปภาพที่อัปโหลด

      try {
        await BlogsService.post(this.blog);
        this.$router.push({
          name: "blogs",
        });
      } catch (err) {
        console.log(err);
      }
    },

    async filesChange(fileList) {
      const formData = new FormData();
      Array.from(fileList).forEach(file => {
        formData.append('images', file); // กำหนดชื่อฟิลด์ตามที่เซิร์ฟเวอร์ต้องการ
        this.pictures.push({ id: this.pictures.length + 1, name: file.name });
      });

      // อัปโหลดไฟล์ภาพไปยังเซิร์ฟเวอร์
      await UploadService.upload(formData);
    },
  },
};
</script>

<style scoped>
/* General Layout */
body {
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(135deg, #e9f5ff, #fdfbfb);
  color: #333;
  margin: 0;
  padding: 0;
  line-height: 1.6;
}

h1 {
  font-size: 36px;
  color: #4A90E2;
  text-align: center;
  margin-bottom: 40px;
  font-weight: 600;
}

/* Form Styling */
form {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

form:hover {
  transform: translateY(-5px);
}

p {
  margin-bottom: 20px;
  font-size: 18px;
}

input[type="text"], 
input[type="file"] {
  width: 100%;
  padding: 15px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: inset 0 4px 6px rgba(0, 0, 0, 0.05);
  font-size: 16px;
  transition: all 0.3s ease;
}

input[type="text"]:focus,
input[type="file"]:focus {
  border-color: #4A90E2;
  box-shadow: 0 0 10px rgba(74, 144, 226, 0.3);
  outline: none;
}

/* Buttons Styling */
button {
  background: linear-gradient(135deg, #6dd5ed, #2193b0);
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 18px;
  transition: background 0.3s ease, transform 0.3s ease;
  margin-right: 10px;
}

button:hover {
  background: linear-gradient(135deg, #3f9ec2, #207a8e);
  transform: translateY(-4px);
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

/* Pictures List Styling */
.pictures {
  list-style: none;
  padding: 0;
  margin: 20px 0;
  text-align: center;
}

.pictures li {
  display: inline-block;
  margin-right: 10px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.pictures li:hover {
  transform: scale(1.05);
}

.pictures img {
  width: 200px;
  height: auto;
  border-radius: 15px;
}

.pictures li:last-child {
  margin-right: 0;
}


</style>
