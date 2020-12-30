<template>
  <div class="bottom">
    <div class="fatie">
      <h1 class="biaoti">发帖</h1>
    </div>
    <div v-if="picture != ''">
      <img class="imgDiv" :src="picture">
    </div>
    <div class="editor">
      <div style="display: flex; justify-content: left;">
        <Input v-model="title" placeholder="请输入帖子标题" style="width: 50vw; margin: 0 auto" />
        <Upload ref="uploadOss" action="http://miaoruixiang.oss-cn-hangzhou.aliyuncs.com" 
                :before-upload="handleOssBeforeUpload"
                :data="uploadData"
                :format="['jpg','jpeg','png','gif']" 
                :max-size="2048" 
                :on-exceeded-size="handleOssMaxSize"
                :on-format-error="handleOssFormatError" 
                :on-success="handleOssSuccess"
                :show-upload-list="false">
          <Button icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
      </div>
      <div style="float: right;">
        <Button type="text" size="default" @click="post">发帖</Button>
      </div>
      <Editor v-bind:post="content" v-on:transferContent="changeContent"></Editor>
    </div>
  </div>
</template>
<script>
import editor from "./editor/quill";
import {oss} from '../libs/ossUtil'

export default {
  name: "posting",
  components: {
    Editor: editor,
  },
  data() {
    return {
      title: '',
      content: '',
      uploadData: {},
      picture: ''
    };
  },
  methods: {
    post() {
      let that = this;
      that.$axios.post('http://121.196.43.56/bbs-api/post/add', {
        userId: 1,
        title: that.title,
        content: that.content,
        picture: that.picture
      })
      .then(function (response) {
          console.log("发帖"+response);
          that.$router.push({path: "/"});
      })
      .catch(function (error) {
          console.log(error);
      });
    },
    changeContent(post) {
      this.content = post;
      console.log(post);
    },
    handleOssSuccess (res) { // 文件上传成功
      if (res.status === 'ok') {
        console.log('aowu'+ res.url);
        this.picture = res.url;
      }
    },
    handleOssFormatError (file) { // 文件格式错误
      this.$Notice.warning({
        title: '文件格式错误',
        desc: '文件【 ' + file.name + ' 】格式不正确，请选择jpg，png或gif格式.'
      })
    },
    handleOssMaxSize (file) { // 文件过大
      this.$Notice.warning({
        title: '文件大小超限',
        desc: '文件【' + file.name + '】过大,最大支持2M.'
      })
    },
    handleOssBeforeUpload (file) {
       let vm = this
      return oss(file.name, 0).then(res => {
        vm.uploadHost = res.host
        vm.fileName = res.key
        vm.uploadData = res
      })
    }
  }
};
</script>
<style scoped>
.imgDiv {
  height:120px;
  width: 200px;
}
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