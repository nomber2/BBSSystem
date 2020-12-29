<template>
  <div class="bottom">
    <div class="fatie">
      <h1 class="biaoti">发帖</h1>
    </div>
    <div class="editor">
      <Input v-model="title" placeholder="请输入帖子标题" style="width: 60vw; margin: 0 auto" />
      <div style="float: right;">
        <Button type="text" size="default" @click="post">发帖</Button>
      </div>
      <Editor v-bind:post="content" v-on:transferContent="changeContent"></Editor>
    </div>
  </div>
</template>
<script>
import editor from "./editor/quill";

export default {
  name: "posting",
  components: {
    Editor: editor,
  },
  data() {
    return {
      title: '',
      content: '',
    };
  },
  methods: {
    post() {
      let that = this;
      that.$axios.post('http://121.196.43.56/bbs-api/post/add', {
        userId: 1,
        title: that.title,
        content: that.content,
        picture: 'test'
      })
      .then(function (response) {
          console.log(response);
      })
      .catch(function (error) {
          console.log(error);
      });
    },
    changeContent(post) {
      this.content = post;
      console.log(post);
    }
  }
};
</script>
<style scoped>
.bottom {
  background-image: url(../../static/images/ftbg.jpg);
  background-size: cover;
  /* width: 100vw; */
  height: 800px;
}
.fatie {
  /* width: 100vw; */
  height: 150px;
  padding-top: 50px;
}
.biaoti {
  font-size: 40px;
  font-family: "微软雅黑";
}
.editor {
  width: 80vw;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>