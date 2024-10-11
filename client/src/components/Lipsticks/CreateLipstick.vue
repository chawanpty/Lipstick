<template>
  <div>
    <h1>Add Lipstick</h1>
    <form v-on:submit.prevent="createLipstick">
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
        <input type="text" v-model="lipstick.name" />
      </p>
      <p>
        Color:
        <input type="text" v-model="lipstick.color" />
      </p>
      <p> 
        Type:
        <select v-model="lipstick.type" class="dropdown">
          <option disabled value="">Select Lipstick Type</option>
          <option value="แมตต์">เนื้อแมตต์</option>
          <option value="กลอส">เนื้อกลอส</option>
          <option value="เชียร์">เนื้อเชียร์และซาติน</option>
          <option value="ลิปมัน">ลิปมันและลิปบาล์ม</option>
          <option value="ทินท์">เนื้อทินท์</option>
        </select>
      </p>
      <p>
        Brand:
        <input type="text" v-model="lipstick.brand" />
      </p>
      <p>
        Price:
        <input type="text" v-model="lipstick.price" />
      </p>
      <p>
        <button type="submit">Add Lipstick</button>
        <button v-on:click="navigateTo('/lipsticks')">Back</button>
      </p>
    </form>
  </div>
</template>

<script>
import LipsticksService from "@/services/LipsticksService";
import UploadService from "@/services/UploadService";

export default {
  data() {
    return {
      lipstick: {
        pictures: "",
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
    async createLipstick() {
      if (this.pictures.length === 0) {
        alert("Please upload at least one picture.");
        return;
      }

      this.lipstick.pictures = this.pictures.map(p => p.name).join(", ");

      try {
        await LipsticksService.post(this.lipstick);
        this.$router.push({
          name: "lipsticks",
        });
        this.$router.go(0); // รีโหลดหน้าเพื่อดึงข้อมูลใหม่
      } catch (err) {
        console.log(err);
      }
    },

    async filesChange(fileList) {
      const formData = new FormData();
      Array.from(fileList).forEach(file => {
        formData.append('images', file);
        this.pictures.push({ id: this.pictures.length + 1, name: file.name });
      });

      await UploadService.upload(formData);
    },
    navigateTo(route) {
      this.$router.push(route);
    }
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

input[type="text"], 
input[type="file"] {
  width: 100%;
  padding: 15px;
  margin-top: 10px;
  border: 2px solid #ddd;
  border-radius: 15px;
  box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.05);
  font-size: 16px;
  transition: all 0.3s ease;
}

input[type="text"]:focus,
input[type="file"]:focus {
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
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.pictures li:hover {
  transform: scale(1.08);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.pictures img {
  width: 200px;
  height: auto;
  border-radius: 15px;
}

.pictures li:last-child {
  margin-right: 0;
}

/* ปรับปรุง Dropdown Styling */
input[type="text"],
.dropdown {
  width: 100%;
  padding: 15px;
  margin-top: 10px;
  border: 2px solid #ddd;
  border-radius: 15px;
  box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.05);
  font-size: 16px;
  transition: all 0.3s ease;
  appearance: none; /* Hide default dropdown arrow */
  background-color: white; /* Set background color */
}

input[type="text"]:focus,
.dropdown:focus {
  border-color: #ff6f91;
  box-shadow: 0 0 15px rgba(255, 111, 145, 0.4);
  outline: none;
}

/* Custom dropdown styling */
.dropdown {
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D'http%3A//www.w3.org/2000/svg'%20viewBox%3D'0%200%2024%2024'%20width%3D'24'%20height%3D'24'%3E%3Cpath%20d%3D'M7%2010l5%205%205-5z'%20fill%3D'%23ff6f91'%20/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 20px 20px;
}
</style>