<template>
  <div class="bgDiv">
    <div class="title">
      <h1 class="titleText">Bulletin Board System</h1>
      <h2 class="brief">Shine in the world you love  站在自己所热爱的世界里，闪闪发光</h2>
    </div>
      <div class="top">
        <div v-if="isLogin" style="margin-right: 100px">
          <Avatar :src="avatar" style="color: #f56a00;background-color: #fde3cf" @click.native="toPersonal()" ></Avatar>
          {{userName}}
          <Button type="primary" ghost size="small" @click="logout()">退出</Button>
        </div>
        <div v-else>
          <Button type="info" ghost size="small" @click="register()">注册</Button>
          <Button type="primary" ghost size="small" @click="login()">登录</Button>
        </div>
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
                <Button type="text" size="small" @click="showDicuss()">我要讨论</Button>
              </div>
          </Card>
        </div>
        <Row :gutter="16" style="margin-top: 5px">
          <Col span="6">
            <Card :bordered="false" class="lrCard">
             <p slot="title">{{newsName}}新闻</p>
              <div v-for="(news, index) in newsList" :key="index" >
                <a :href="news.url" >
                  {{news.content}}
                  <!-- <Button type="text" style="color: red">删除</Button> -->
                </a>
              </div>
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
                  帖子部落
                </p>
                <Scroll>
                <!-- <List border>
                    <ListItem v-for="(tiezi, index) in tieList" :key="index" @click.native="toInfo(tiezi)">
                      {{tiezi.title}}
                      <Button type="text" style="color: red">删除</Button>
                    </ListItem>
                </List> -->
                <List item-layout="vertical">
                    <ListItem v-for="(tiezi, index) in tieList" :key="index" >
                        <ListItemMeta :avatar="tiezi.avatar" :title="tiezi.title" />
                        <div v-html="tiezi.content" @click="toInfo(tiezi)"></div>
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
                          <Button type="text" @click="deleteTie(tiezi.pkId)" v-if="tiezi.userId == userId" style="color: red">删除</Button>
                          <img :src="tiezi.picture" width="260px" height="140px">
                        </template>
                    </ListItem>
                </List>
              </Scroll>
            </Card>
          </Col>
          <Col span="10">
            <Card :bordered="false" class="lrCard" style="height: 500px">
              <p slot="title">今日话题:{{discussShow.title}}</p>
              <p style="font-size: 16px; color: rgb(19, 182, 194)">{{discussShow.content}}</p>
                <Scroll>
                  <List>
                    <ListItem v-for="(item, index) in commentList" :key="index">
                      <span>{{item.userName}}:</span>
                      {{item.content}}
                      <Button @click="deleteComment(item.pkId)" type="text" style="color: red; float: right">删除</Button>
                    </ListItem>
                  </List>
                </Scroll>
               <div class="input">
                  <Input v-if="isLogin" v-model="discussReply" placeholder="请输入你的想法……" />
                  <Input v-else v-model="discussReply" disabled placeholder="请输入你的想法……" />
                    <Button @click="sendDiscussReply">发送</Button>
                  <!-- </Input> -->
               </div>
            </Card>
          </Col>
        </Row>
      </div>
       <Modal
          title="发布讨论"
          v-model="modal"
          class-name="vertical-center-modal"
          @on-ok="saveDiscuss">
          <Form :model="discuss" :label-width="80">
            <FormItem label="讨论标题">
              <Input v-model="discuss.title" placeholder="请输入讨论标题..."/>
            </FormItem>
            <FormItem label="讨论内容">
              <Input v-model="discuss.content" type="textarea" :autosize="{minRows: 2,maxRows: 6}" placeholder="请输入讨论内容..."/>
            </FormItem>
          </Form>
      </Modal>
    </div>
</template>

<script scoped>
export default {
  name: 'HelloWorld',
  data () {
    return {
      value2: 0,
      userId: 0,
      nowTime: '',
      newsName: '体育',
      tieList: [],
      commentList: [],
      newsList: [
        {content: 'CBA-广东狂胜北控31分 双塔合砍42+33新疆豪取6连胜', url: 'https://sports.sina.com.cn/basketball/cba/2020-12-30/doc-iiznezxs9746751.shtml'},
        {content: 'NBA-勇士迎2连胜 雄鹿29记三分破纪录 乔丹姓名权纠纷案宣判', url: 'https://sports.sina.com.cn/basketball/nba/2020-12-30/doc-iiznctke9294709.shtml'},
        {content: '英超-曼联1-0绝杀狼队暂升第2 西甲-梅西缺阵 巴萨主场连平', url: 'https://sports.sina.com.cn/g/laliga/2020-12-30/doc-iiznctke9247281.shtml'},
        {content: '2021赛历初定：中超3月11开战 中超扩军18队提前至2022', url: 'https://sports.sina.com.cn/china/j/2020-12-30/doc-iiznezxs9698164.shtml'}
      ],
      avatar: '',
      userName: '',
      isLogin: 0,
      discussReply: '',
      modal: false,
      discuss: {
        title: '',
        content: ''
      },
      discussShow: {
        pkId: 0,
        title: '',
        content: ''
      }
    }
  },
  methods: {
    deleteComment(index) {
      let that = this;
      that.$axios.post('http://121.196.43.56/bbs-api/comment/delete', {
          'pkId': index, //可选
          'userId': that.userId
      })
      .then(function (response) {
          console.log(response.data.data);
          that.$Message.success("删除成功！");
          that.getComment();
      })
      .catch(function (error) {
          console.log(error);
      })
      .then(function () {
          // always executed
      });
    },
    logout() {
      localStorage.removeItem('userId');
      this.isLogin = 0;
    },
    deleteTie(index) {
      let that = this;
      that.$axios.post('http://121.196.43.56/bbs-api/post/delete', {
          'pkId': index, //可选
          'userId': that.userId
      })
      .then(function (response) {
          console.log(response.data.data);
          that.$Message.success("删除成功！");
          that.getTie();
      })
      .catch(function (error) {
          console.log(error);
      })
      .then(function () {
          // always executed
      });
    },
    sendDiscussReply() {
      let that = this;
      that.$axios.post('http://121.196.43.56/bbs-api/comment/add', {
          userId: that.userId,
          relationId: 4,
          type: 1,
          content: that.discussReply
      })
      .then(function (response) {
          console.log(response);
          that.$Message.success("发送成功！");
          that.discussReply = '';
          that.getComment();
      })
      .catch(function (error) {
          console.log(error);
      })
      .then(function () {
          // always executed
      });
    },
    saveDiscuss() {
      let that = this;
      that.$axios.post('http://121.196.43.56/bbs-api/discuss/add', {
          userId: 1,
          title: that.discuss.title,
          content: that.discuss.content
      })
      .then(function (response) {
          that.$Message.success('新增成功!');
      })
      .catch(function (error) {
          console.log(error);
      })
      .then(function () {
          // always executed
      });
    },
    showDicuss() {
      this.modal = true;
    },
    changeToSport() {
      this.newsName = '体育';
      this.newsList = [
        {content: 'CBA-广东狂胜北控31分 双塔合砍42+33新疆豪取6连胜', url: 'https://sports.sina.com.cn/basketball/cba/2020-12-30/doc-iiznezxs9746751.shtml'},
        {content: 'NBA-勇士迎2连胜 雄鹿29记三分破纪录 乔丹姓名权纠纷案宣判', url: 'https://sports.sina.com.cn/basketball/nba/2020-12-30/doc-iiznctke9294709.shtml'},
        {content: '英超-曼联1-0绝杀狼队暂升第2 西甲-梅西缺阵 巴萨主场连平', url: 'https://sports.sina.com.cn/g/laliga/2020-12-30/doc-iiznctke9247281.shtml'},
        {content: '2021赛历初定：中超3月11开战 中超扩军18队提前至2022', url: 'https://sports.sina.com.cn/china/j/2020-12-30/doc-iiznezxs9698164.shtml'}
      ]
    },
    changeToHappy() {
      this.newsName = '娱乐';
      this.newsList = [
        {content: '《送你一朵小红花》预售破2亿 成复工后预售最高', url: 'https://ent.sina.com.cn/m/c/2020-12-30/doc-iiznezxs9816720.shtml'},
        {content: '易烊千玺谈“偶像包袱”：我挺盼着角色形象改变', url: 'https://ent.sina.com.cn/m/c/2020-12-30/doc-iiznezxs9794982.shtml'},
        {content: '易烊千玺回应粉丝为癌症患者捐头发：我挺骄傲的', url: 'https://ent.sina.com.cn/2020-12-30/doc-iiznezxs9792214.shtml'},
        {content: '《晴雅集》：郭敬明审美的“集大成”之作', url: 'https://ent.sina.com.cn/m/c/2020-12-26/doc-iiznezxs9043644.shtml'}
      ];
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
    toNews(item) {
      this.$router.push({path: "/look", query: {title: item.title, content: item.content, picture: item.picture}});
    },
    toPersonal() {
      this.$router.push({path: "/account", query: {userName: this.userName, avatar: this.avatar}});
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
      if (this.isLogin == 1) {
        this.$router.push({path: "/news", query: {id: item.pkId, title: item.title, content: item.content, picture: item.picture, avatar: this.avatar}});
      } else {
        this.toNews(item);
      }
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
          userId: that.userId,
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
    },
    getInfo() {
      let that = this;
      that.$axios.get('http://121.196.43.56/bbs-api/user/get', {
        params: {
          pkId: that.userId
        }
      })
      .then(function (response) {
          console.log(response.data.data);
          that.avatar = response.data.data.avatar;
          that.userName = response.data.data.userName;
      })
      .catch(function (error) {
          console.log(error);
      });
    },
    getDiscuss() {
      let that =this;
      that.$axios.get('http://121.196.43.56/bbs-api/discuss/list', {
        params: {
          userId: that.userId,
          pageIndex: 1,
          pageSize: 999,
          title: ''
        }
      })
      .then(function (response) {
          console.log('bighghu是是是'+response.data.data.list);
          that.discussShow.title = response.data.data.list[0].pkId;
          that.discussShow.title = response.data.data.list[0].title;
          that.discussShow.content = response.data.data.list[0].content;
      })
      .catch(function (error) {
          console.log(error);
      });
    },
    getComment() {
      let that =this;
      that.$axios.get('http://121.196.43.56/bbs-api/comment/list', {
        params: {
          userId: that.userId,
          pageIndex: 1,
          pageSize: 999,
          relationId: that.discussShow.pkId,
          type: 2
        }
      })
      .then(function (response) {
          console.log('乌拉拉' + response.data.data);
          that.commentList = response.data.data.list;
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

      this.userId = localStorage.getItem('userId');
      if (this.userId == null) {
        this.isLogin = 0;
      } else {
        this.isLogin = 1;
      }

      this.getInfo();
      this.getDiscuss();
      this.getTie();
      this.getComment();
  },
  destroyed() {
    this.clear()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scope lang="less">
.vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;
}
.input {
  display: flex;
  justify-items: left;
  flex-direction: column;
  position: absolute;
  bottom: 10px;
  width: 90%;
}
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
