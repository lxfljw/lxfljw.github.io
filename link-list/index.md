<!-- viepress 文章列表 -->

<script setup>
import { data as posts } from './posts.data.js'

</script>
<br>
<h1>目录</h1>
<ul>
  <li v-for="(post, index) of posts">
    <a :href="post.url">{{index+1}}、{{ post.url.replace(/\/pages\/|\.html/g, '').replace(/^\d+-/g,'') }}</a>
  </li>
</ul>
