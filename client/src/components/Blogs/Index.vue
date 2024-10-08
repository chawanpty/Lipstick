<template>
    <div>
        <h2>Get all Lipstick</h2>
        <p><button v-on:click="logout">Logout</button></p>
<<<<<<< HEAD
        <h4>จำนวน Lipstick {{blogs.length}} รายการ </h4>
        <p><button v-on:click="navigateTo('/blog/create')">Add Lipstick</button></p>
        <div v-for="blog in blogs" v-bind:key="blog.id">

            <p><img style="margin-bottom:5px; width:50px;" :src="BASE_URL + blog.pictures" alt="picture image"></p>
            <p>id: {{ blog.id }}</p>
            <p>Name: {{ blog.name }}</p>
            <p>Color: {{ blog.color }}</p>
            <p>Type: {{ blog.type }}</p>
            <p>Brand: {{ blog.brand }}</p>
            <p>Price: {{ blog.price }}</p>
            <p>
            <button v-on:click="navigateTo('/blog/'+ blog.id)">Show Lipstick</button>
            <button v-on:click="navigateTo('/blog/edit/'+ blog.id)">Edit </button>
            <button v-on:click="deleteBlog(blog)">Delete</button>
=======
        <h4>จำนวน Lipstick {{filteredBlogs.length}} รายการ </h4>
        
        <!-- ปุ่มสำหรับกรองหมวดหมู่ -->
        <div>
            <button @click="clearFilter">แสดงทั้งหมด</button>
            <button @click="filterByCategory('แมตต์')">ลิปสติกเนื้อแมตต์</button>
            <button @click="filterByCategory('กลอส')">ลิปกลอส</button>
            <button @click="filterByCategory('ทิ้นต์')">ลิปทิ้นต์</button>
            <button @click="filterByCategory('บาล์ม')">ลิปบาล์ม</button>
            <button @click="filterByCategory('ซาติน')">ลิปสติกเนื้อซาติน</button>
            
        </div>

        <p><button v-on:click="navigateTo('/blog/create')">เพิ่ม Lipstick</button></p>
        <div v-for="blog in filteredBlogs" v-bind:key="blog.id">
            <p>id: {{ blog.id }}</p>
            <p>ชื่อ: {{ blog.title }}</p>
            <p>สี: {{ blog.content }}</p>
            <p>ประเภท: {{ blog.category }}</p>
            <p>แบรนด์: {{ blog.status }}</p>
            <p>
                <button v-on:click="navigateTo('/blog/'+ blog.id)">ดู Lipstick</button>
                <button v-on:click="navigateTo('/blog/edit/'+ blog.id)">แก้ไข Lipstick</button>
                <button v-on:click="deleteBlog(blog)">ลบข้อมูล</button>
>>>>>>> 01235aa450ee74d120fa205aedbece6abe0c82f9
            </p>
            <hr>
        </div>
    </div>
</template>

<script>
import BlogsService from '@/services/BlogsService'
export default {
    data () {
        return {
            blogs: [],
            filteredBlogs: [], // ตัวแปรใหม่สำหรับเก็บข้อมูลที่ถูกกรอง
            selectedCategory: null // ตัวแปรสำหรับเก็บหมวดหมู่ที่ถูกเลือก
        }
    },
    async created () {
        this.blogs = (await BlogsService.index()).data
        this.filteredBlogs = this.blogs // เริ่มต้นให้ filteredBlogs เป็น blogs ทั้งหมด
    },
    methods: {
        logout () {
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setBlog', null)
            this.$router.push({
                name: 'login'
            })
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
            this.filteredBlogs = this.blogs // อัปเดต filteredBlogs ให้ตรงกับ blogs
        },
        filterByCategory(category) {
            this.selectedCategory = category
            this.filteredBlogs = this.blogs.filter(blog => blog.category === category)
        },
        clearFilter() {
            this.selectedCategory = null
            this.filteredBlogs = this.blogs // แสดงลิสต์ทั้งหมดอีกครั้ง
        }
    }
}
</script>

<style scoped>
</style>
