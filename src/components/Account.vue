<template>
  <div class="backgDiv">
    <div class="Btitle">
      <h1 class="titleText">Bulletin Board System</h1>
      <h2 class="brief">
        Shine in the world you love 站在自己所热爱的世界里，闪闪发光
      </h2>
    </div>
    <div class="infoContent">
      <div class="grxx">
        <h1>个人信息</h1>
        <div class="neirong">
          <Avatar style="margin-bottom: 5px" shape="square" :src="formItem.avatar" size="large" />
          <Upload ref="uploadOss" action="http://miaoruixiang.oss-cn-hangzhou.aliyuncs.com" 
                  :before-upload="handleOssBeforeUpload"
                  :data="uploadData"
                  :format="['jpg','jpeg','png','gif']" 
                  :max-size="2048" 
                  :on-exceeded-size="handleOssMaxSize"
                  :on-format-error="handleOssFormatError" 
                  :on-success="handleOssSuccess"
                  :show-upload-list="false">
            <Button icon="ios-cloud-upload-outline">上传头像</Button>
          </Upload>
          <Form :model="formItem" :label-width="80">
            <FormItem
              label="用户名"
              style="margin-right: 30px; margin-top: 20px"
            >
              <Input
                v-model="formItem.input"
                placeholder="请输入用户名"
              />
            </FormItem>
            <FormItem label="新密码" style="margin-right: 30px">
              <Input
                v-model="formItem.password"
                placeholder="请输入新密码"
                type="password"
              />
            </FormItem>
            <FormItem label="确认密码" style="margin-right: 30px">
              <Input
                v-model="formItem.repassword"
                placeholder="请确认新密码"
                type="password"
              />
            </FormItem>
            <FormItem>
              <Button type="primary" @click="saveEdit">保存修改</Button>
              <Button style="margin-left: 8px"  @click="cancel">取消</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {oss} from '../libs/ossUtil'

export default {
  name: "account",
  data() {
    return {
      uploadData: {},
      userId: 0,
      formItem: {
        avatar: "",
        input: "",
        password: "",
        select: "",
        radio: "male",
        checkbox: [],
        switch: true,
        date: "",
        time: "",
        slider: [20, 50],
        textarea: "",
        repassword: ""
      },
    };
  },
  methods: {
    cancel() {
      this.$router.push({path: "/"});
    },
    saveEdit() {
      let that = this;
      if (that.formItem.password != that.formItem.repassword) {
        this.$Message.error('两次密码不相同!');
      } else {
        that.$axios.post('http://121.196.43.56/bbs-api/user/update', {
          pkId: that.userId,
          avatar: that.formItem.avatar,
          userName: that.formItem.input
        })
        .then(function (response) {
            console.log(response);
            that.$router.push({path: "/"});
        })
        .catch(function (error) {
            console.log(error);
        });
      }
    },
    handleOssSuccess (res) { // 文件上传成功
      if (res.status === 'ok') {
        this.formItem.avatar = res.url;
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
      // 获取oss上传token
      // 0头像 1其他图片
      // export const ossToken = (type) => {
      //   let params = { type: 0 }
      //   let that = this;
      //   that.$axios.get('http://121.196.43.56/bbs-api/token/aliOssToken', {
      //     params: params
      //   })
      //   .then(function (response) {
      //       console.log(response);
      //       // that.tieList = response.data.data.list;
      //   })
      //   .catch(function (error) {
      //       console.log(error);
      //   });
      // }
        // return that.$axios.get({
        //   url: 'http://121.196.43.56/bbs-api/token/aliOssToken',
        //   params: params
        // })
      // }
    
  },
  mounted() {
    this.formItem.avatar = this.$route.query.avatar;
    this.formItem.input = this.$route.query.userName;
    this.userId = localStorage.getItem('userId');
  }
};
</script>

<style>
.backgDiv {
  background-image: url(../../static/images/bg1.jpg);
  overflow: hidden;
  /* padding-top: 20%; */
  text-align: center;
  padding-bottom: 100px;
}
.Btitle {
  background-color: white;
  height: 300px;
  width: 100vw;
  background: rgba(255, 255, 255, 0.2);
  padding-top: 100px;
  padding-left: 100px;
  text-align: left;
}
.titleText {
  font-size: 80px;
  font-family: fantasy;
}
.brief {
  font-family: fantasy;
}
.infoContent {
  background-color: rgba(255, 255, 255, 0.6);
  margin: auto;
  width: 60vw;
  height: 70vh;
  padding-top: 20px;
  padding-bottom: 20px;
}
.neirong {
  padding-top: 30px;
  margin: auto;
  width: 45vw;
}
</style>
