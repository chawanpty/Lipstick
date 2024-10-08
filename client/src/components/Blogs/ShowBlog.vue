<template>
    <div>
        <h1>Show Lipstick</h1>
        <p>id: {{ blog.id }}</p>
        <p>Name: {{ blog.name }}</p>
        <p>Color: {{ blog.color }}</p>
        <p>Type: {{ blog.type }}</p>
        <p>Brand: {{ blog.brand }}</p>
        <p>Price: {{ blog.price }}</p>
        <p>
        <button v-on:click="navigateTo('/blog/edit/'+ blog.id)">Edit</button>
        <button v-on:click="navigateTo('/blogs')">Back </button>
        </p>
    </div>
</template>
<script>
    import BlogsService from '@/services/BlogsService'
    export default {
        data () {
            return {
                blog: null
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
        methods : {
            navigateTo (route) {
                this.$router.push(route)
            },
        }
    }
</script>
<style scoped>
</style>