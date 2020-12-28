<template>
  <div class="bottom">
    <div class="fatie">
      <h1 class="biaoti">发帖</h1>
    </div>
    <div class="editor">
      <Editor></Editor>
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
    return {};
  },
};
</script>
<style>
.bottom {
  background-image: url(../../static/images/ftbg.jpg);
  background-size: cover;
  width: 100vw;
  height: 100vh;
}
.fatie {
  width: 100vw;
  height: 20vh;
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