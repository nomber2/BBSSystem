<template>
  <div class="bgDiv">
    <div class="title">
      <h1 class="titleText">Bulletin Board System</h1>
      <h2 class="brief">Shine in the world you love  站在自己所热爱的世界里，闪闪发光</h2>
    </div>
      <div class="top">
        <Avatar v-if="isLogin" style="margin-right: 20px; color: #f56a00;background-color: #fde3cf" @click.native="toPersonal()" >T</Avatar>
        <Button type="info" ghost size="small" @click="register()">注册</Button>
        <Button type="primary" ghost size="small" @click="login()">登录</Button>
      </div>
      <div class="content">
        <div>
          <Card :bordered="false">
              <Button type="text" @click="changeToSport()">体育</Button>
              <Button type="text" @click="changeToHappy()">娱乐</Button>
              <Button type="text" @click="changeToCar()">汽车</Button>
              <Button type="text" @click="changeToScience()">科技</Button>
              <Button type="text" @click="changeToArder()">休闲</Button>
              <Button type="text" @click="changeToBeauty()">美妆</Button>
              <Button type="text" @click="changeToArt()">综艺</Button>
              <Button type="text" @click="changeToThing()">时事</Button>
              <Button type="text" @click="changeToBook()">小说</Button>
              <Button type="text" @click="changeToLife()">生活</Button>
              <div style="float: right;display : table-cell; vertical-align: middle;">
                <Button type="text" size="small" @click="toPosting()">我要发帖</Button>
              </div>
          </Card>
        </div>
        <Row :gutter="16" style="margin-top: 5px">
          <Col span="6">
            <Card :bordered="false" class="lrCard">
             <p slot="title">我的发帖</p>
             <List border>
                <ListItem v-for="(tiezi, index) in tieList" :key="index" @click.native="toInfo(tiezi)">
                  {{tiezi.title}}
                  <Button type="text" style="color: red">删除</Button>
                </ListItem>
            </List>
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
              <p style="font-size: 18px;">今日宜运动</p>
              <video src="../../static/video/test.mp4" controls="controls" height="180px" width="240px"></video> 
            </Card>
          </Col>
        </Row>
        <Row :gutter="16" style="margin-top: 5px">
          <Col span="14">
            <Card class="yulenews">
                <p slot="title">
                  {{newsName}}新闻
                </p>
                <Scroll>
                <List item-layout="vertical">
                    <ListItem v-for="item in data" :key="item.title">
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
              <p slot="title">今日话题</p>
              <p>人到底要不要早点睡觉？</p>
               <List>
                <ListItem>
                  <span>userId</span>
                  <ListItemMeta description="This is ：description, this is description." />
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
      newsName: '体育',
      tieList: [],
      isLogin: 0,
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
    changeToSport() {
      this.newsName = '体育';
      this.$axios.get('http://106.12.210.188:8005/crontab/index/newslist?type=1', {
      })
      .then(function (response) {
          console.log(response);
      })
      .catch(function (error) {
          console.log(error);
      });
    },
    changeToHappy() {
      this.newsName = '娱乐';
    },
    changeToCar() {
      this.newsName = '汽车';
    },
    changeToScience() {
      this.newsName = '科技';
    },
    changeToArder() {
      this.newsName = '休闲';
    },
    changeToBeauty() {
      this.newsName = '美妆';
    },
    changeToArt() {
      this.newsName = '综艺';
    },
    changeToThing() {
      this.newsName = '时事';
    },
    changeToBook() {
      this.newsName = '小说';
    },
    changeToLife() {
      this.newsName = '生活';
    },
    toPersonal() {
      this.$router.push({path: "/account"});
    },
    toPosting() {
      this.$router.push({path: "/posting"});
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
    },
    getTie() {
      let that = this;
      that.$axios.get('http://121.196.43.56/bbs-api/post/list', {
        params: {
          userId: 1,
          pageIndex: 1,
          pageSize: 999
        }
      })
      .then(function (response) {
          console.log(response.data.data.list);
          that.tieList = response.data.data.list;
      })
      .catch(function (error) {
          console.log(error);
      });
    }
  },
  mounted() {
      this.timeFormate(new Date());
      setInterval(this.nowTimes,1000);
      this.nowTime = setInterval(() => {
        this.timeFormate(new Date()); //加载数据函数
      }, 1000);

      let userId = localStorage.getItem('userId');
      if (userId == null) {
        this.isLogin = 0;
      } else {
        this.isLogin = 1;
      }

      this.getTie();
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
  background-color: #f8f6f6;
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
