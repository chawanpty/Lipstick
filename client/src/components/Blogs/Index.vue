<template>
    <div>
        <h2>Get all Lipstick</h2>
        <p><button v-on:click="logout">Logout</button></p>
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
            }
        }
    }
</script>
<style scoped>
</style>