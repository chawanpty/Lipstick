<template>
  <div>
    <h1>Create Lipstick</h1>
    <form v-on:submit.prevent="createBlog">
      <p>
        ชื่อ:
        <input type="text" v-model="blog.title" />
      </p>
      
      <p>
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
      </p>
      <p>
        <button type="submit">create blog</button>
      </p>
    </form>
  </div>
</template>
<script>
import BlogsService from "@/services/BlogsService";
import VueCkeditor from "vue-ckeditor2";

export default {
  components: { VueCkeditor },
  data() {
    return {
      blog: {
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
      },
    };
  },
  methods: {
    async createBlog() {
      try {
        await BlogsService.post(this.blog);
        this.$router.push({
          name: "blogs",
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style scoped>

</style>
