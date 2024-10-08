<template>
    <div>
        <h1>Edit Lipstick</h1>
        <form v-on:submit.prevent = "editBlog">
            <p>Name: <input type="text" v-model="blog.name"></p>
            <p>Color: <input type="text" v-model="blog.color"></p> 
            <p>Type: <input type="text" v-model="blog.type"></p>
            <p>Brand: <input type="text" v-model="blog.brand"></p>
            <p>Price: <input type="text" v-model="blog.price"></p>
            <p>
            <button type="submit">update </button>
            <button v-on:click="navigateTo('/blogs')">back</button>
            </p>
        </form>
    </div>
</template>
<script>
import BlogsService from '@/services/BlogsService'
import VueCkeditor from "vue-ckeditor2"

export default {
    components: { VueCkeditor },
    data () {
        return {
            blog: {
                pictures: 'null',
                name: '',
                color: 'null',
                type: '',
                brand: '',
                price: ''
            },
            config: {
                toolbar: [
                    ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript']
                ],
                height: 300
            },
        }
    },
    methods: {
        async editBlog () {
            try {
                await BlogsService.put(this.blog)
                this.$router.push({
                    name: 'blogs'
                })
            } catch (err) {
                console.log(err)
            }
        }

    },
    async created () {
        try {
            let blogId = this.$route.params.blogId
            this.blog = (await BlogsService.show(blogId)).data
            
        } catch (error) {
            console.log (error)
        }
    },



}
</script>
<style scoped>
</style>