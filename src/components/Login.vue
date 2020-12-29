<template>
   <div class="bg">
     <div class="login">
       <div class="topDiv">
         <h2>Login</h2>
       </div>
       <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="用户名">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="密码">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button  @click="handleSubmit('formInline')">登录</Button>
        </FormItem>
    </Form>

     </div>
     <div class="register">

     </div>
   </div>
</template>
 
<script>
    export default {
        data () {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                userId: 0,
                ruleInline: {
                    user: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                let that = this;
                that.$refs[name].validate((valid) => {
                    if (valid) {
                        that.$axios.post('http://121.196.43.56/bbs-api/user/login', {
                            'account': '15195226888', //可选
                            'password': that.formInline.password
                        })
                        .then(function (response) {
                            console.log(response);
                            console.log(response.data.data.userId);
                            localStorage.setItem('userId', response.data.data.userId);
                            that.$router.push({path: "/"});
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                        .then(function () {
                            // always executed
                        });
                    } else {
                        that.$Message.error('Fail!');
                    }
                })
            },
        }
    }
</script>
 <style scoped>
 .bg {
   width: 100vw;
   height: 100vh;
   text-align: center;
   padding-top: 200px;
   padding-left: 580px;
   background-image: url(../../static/images/loginBg.jpg);
 }
 .login {
   width: 270px;
   height: 320px;
   background-color: white;
   background: rgba(255, 255, 255, 0.3);
 }
 .topDiv {
   width: 270px;
   height: 100px;
   padding-top: 50px;
 }
 </style>