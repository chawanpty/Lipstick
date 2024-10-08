<template>
  <div>
<<<<<<< HEAD
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
=======
    <h1>Create Lipstick</h1>
    <form v-on:submit.prevent="createBlog">
      <p>
        ชื่อ:
        <input type="text" v-model="blog.title" />
>>>>>>> 01235aa450ee74d120fa205aedbece6abe0c82f9
      </p>
      
      <p>
<<<<<<< HEAD
        Name:
        <input type="text" v-model="blog.name" />
      </p>
      <p>
        Color:
        <input type="text" v-model="blog.color" />
=======
        สี:
        <input type="text" v-model="blog.content" />
      </p>
      
      
      <p>
        ประเภท:
        <input type="text" v-model="blog.category" />
      </p>
      <p>
        แบรนด์:
        <input type="text" v-model="blog.status" />
>>>>>>> 01235aa450ee74d120fa205aedbece6abe0c82f9
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
<<<<<<< HEAD
        pictures: "", // ควรเก็บเป็น array ถ้าคุณต้องการส่งหลายรูป
        name: "",
        color: "",
        type: "",
        brand: "",
        price: "",
=======
        title: "",
        thumbnail: "null",
        pictures: "null",
        content: "",
        category: "",
        status: "",
      },
      config: {
        toolbar: [
          ["Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript"],
        ],
        height: 300,
>>>>>>> 01235aa450ee74d120fa205aedbece6abe0c82f9
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
.pictures {
  list-style: none;
  padding: 0;
  margin: 0;
}
 
.pictures li {
  display: inline-block;
  margin-right: 10px;
}
</style>
