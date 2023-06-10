<template>
  <el-card class="card">
    <div class="card-content">
      <a :href="post.link" class="card-title">{{ post.title }}</a>
      <div class="card-author">By {{ post.author }}</div>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: 'Lorem ipsum dolor sit amet',
        author: 'John Doe',
        link: 'https://www.example.com/post',
      },
    };
  },
};
</script>

<style>
.card {
  width: 400px;
  height: 200px;
  margin: 20px;
  padding: 20px;
}

.card-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-decoration: none;
}

.card-title:hover {
  text-decoration: underline;
}

.card-author {
  font-size: 16px;
  color: #999;
}
</style>
