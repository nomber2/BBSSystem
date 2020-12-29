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
          <Avatar icon="ios-person" size="large" />
          <Upload ref="uploadOss" action="//jsonplaceholder.typicode.com/posts/" :before-upload="handleOssBeforeUpload" :data="uploadData"
                  :format="['jpg','jpeg','png','gif']" :max-size="2048" :on-exceeded-size="handleOssMaxSize"
                  :on-format-error="handleOssFormatError" :on-success="handleOssSuccess"
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
                placeholder="接口获取的用户名"
              ></Input>
            </FormItem>
            <FormItem label="新密码" style="margin-right: 30px">
              <Input
                v-model="formItem.input"
                placeholder="请输入新密码"
              ></Input>
            </FormItem>
            <FormItem label="确认密码" style="margin-right: 30px">
              <Input
                v-model="formItem.input"
                placeholder="请确认新密码"
              ></Input>
            </FormItem>
            <FormItem>
              <Button type="primary">保存修改</Button>
              <Button style="margin-left: 8px">取消</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "account",
  data() {
    return {
      formItem: {
        input: "",
        select: "",
        radio: "male",
        checkbox: [],
        switch: true,
        date: "",
        time: "",
        slider: [20, 50],
        textarea: "",
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
