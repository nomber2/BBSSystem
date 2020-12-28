<template>
  <div class="bgDiv">
    <div class="title">
      <h1 class="titleText">Bulletin Board System</h1>
      <h2 class="brief">Shine in the world you love  站在自己所热爱的世界里，闪闪发光</h2>
    </div>
      <div class="top">
        <Avatar icon="ios-person" size="large" @click.native="toPersonal()" />
        <Button type="info" ghost size="middle" @click="register()">注册</Button>
        <Button type="primary" ghost size="middle" @click="login()">登录</Button>
        <Button type="primary" @click="toPosting()">发帖</Button>
      </div>
      <div class="content">
        <div>
          <Card :bordered="false">
              <Button type="text">体育</Button>
              <Button type="text">娱乐</Button>
              <Button type="text">汽车</Button>
              <Button type="text">科技</Button>
              <Button type="text">休闲</Button>
              <Button type="text">美妆</Button>
              <Button type="text">综艺</Button>
              <Button type="text">时事</Button>
              <Button type="text">小说</Button>
              <Button type="text">生活</Button>
          </Card>
        </div>
        <Row :gutter="16" style="margin-top: 5px">
          <Col span="6">
            <Card :bordered="false" class="lrCard">
              这里是新闻
            </Card>
          </Col>
          <Col span="12">
            <div class="news">
              <Carousel class="lunbo" autoplay v-model="value2">
                <CarouselItem>
                  <div class="demo-carousel" style="height:300px; background-image: url(../../static/images/1.jpg);background-size:cover;">1</div>
                </CarouselItem>
                <CarouselItem>
                   <div class="demo-carousel" style="height:300px; background-image: url(../../static/images/2.jpg);background-size:cover;">2</div>
                </CarouselItem>
                <CarouselItem>
                   <div class="demo-carousel" style="height:300px; background-image: url(../../static/images/3.jpg);background-size:cover;">3</div>
                </CarouselItem>
                <CarouselItem>
                   <div class="demo-carousel" style="height:300px; background-image: url(../../static/images/4.jpg);background-size:cover;">4</div>
                </CarouselItem>
              </Carousel>
            </div>
          </Col>
          <Col span="6">
            <Card :bordered="false" class="lrCard">
              <p style="font-size: 18px;">{{nowTime}}</p>
              <video src="../../static/video/test.mp4" height="170px" width="240px"></video> 
            </Card>
          </Col>
        </Row>
        <Row :gutter="16" style="margin-top: 5px">
          <Col span="14">
            <Card class="yulenews">
                <p slot="title">
                  娱乐新闻
                </p>
                <Scroll :on-reach-edge="handleReachBottom">
                <List item-layout="vertical">
                    <ListItem v-for="item in data" :key="item.title" @click.native="toInfo(item)">
                        <ListItemMeta :avatar="item.avatar" :title="item.title" :description="item.description" />
                        {{ item.content }}
                        <template slot="action">
                            <li>
                                <Icon type="ios-star-outline" /> 123
                            </li>
                            <li>
                                <Icon type="ios-thumbs-up-outline" /> 234
                            </li>
                            <li>
                                <Icon type="ios-chatbubbles-outline" /> 345
                            </li>
                        </template>
                        <template slot="extra">
                            <img src="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large" style="width: 260px">
                        </template>
                    </ListItem>
                </List>
              </Scroll>
            </Card>
          </Col>
          <Col span="10">
            <Card :bordered="false" class="lrCard">
              这里是留言区
               <List>
                <ListItem>
                    <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="This is title" description="This is description, this is description." />
                </ListItem>
                <ListItem>
                    <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="This is title" description="This is description, this is description." />
                </ListItem>
               </List>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
</template>

<script scoped>
export default {
  name: 'HelloWorld',
  data () {
    return {
      value2: 0,
      nowTime: '',
      data: [
                    {
                        title: 'This is title 1',
                        description: 'This is description, this is description, this is description.',
                        avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                        content: 'This is the content, this is the content, this is the content, this is the content.'
                    },
                    {
                        title: 'This is title 2',
                        description: 'This is description, this is description, this is description.',
                        avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                        content: 'This is the content, this is the content, this is the content, this is the content.'
                    },
                    {
                        title: 'This is title 3',
                        description: 'This is description, this is description, this is description.',
                        avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                        content: 'This is the content, this is the content, this is the content, this is the content.'
                    }
                ]
    }
  },
  methods: {
    handleReachBottom () {
        return new Promise(resolve => {
            setTimeout(() => {
                const last = this.list1[this.list1.length - 1];
                for (let i = 1; i < 11; i++) {
                    this.list1.push(last + i);
                }
                resolve();
            }, 2000);
        });
    },
    login() {
      this.$router.push({path: "/login"});
    },
    register() {
      this.$router.push({path:"/register"});
    },
    toInfo(item) {
      console.log('lalala' + item);
      this.$router.push({path: "/news", query: {title: item.title, content: item.content}});
    },
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
      let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
      let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
      let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
      let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
      this.nowTime = year + "年" + month + "月" + date +"日"+" "+hh+":"+mm+':'+ss ;
    },
    clear(){
      clearInterval(this.nowTimes);
      this.nowTimes = '';
    }
  },
  mounted() {
      this.timeFormate(new Date());
      setInterval(this.nowTimes,1000);
      this.nowTime = setInterval(() => {
        this.timeFormate(new Date()); //加载数据函数
      }, 1000);
  },
  destroyed() {
    this.clear()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scope>
.yulenews {
  height: 400px;
  padding: 10px;
}
.bgDiv {
  background-image: url(../../static/images/bg1.jpg);
  overflow: hidden;
  /* padding-top: 20%; */
  text-align: center;
}
.title {
  background-color: white;
  height: 300px;
  width: 100vw;
  background: rgba(255, 255, 255, 0.3);
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
.news {
  height: 300px;
}
.lunbo {
  height: 300px;
}
.lrCard {
  height: 300px;
  background-color: #ebe9e9;
}
.content {
  /* background-color: rgb(207, 241, 230); */
  padding: 5px 100px 5px 100px;
  height: 100%;
}

.top {
  /* margin-top: 200px; */
  height: 50px;
  width: 100vw;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #dadada;
  text-align: right;
  display: table-cell;
  vertical-align: middle;
  padding: 0 20px 0 0;

}
</style>
