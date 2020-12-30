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
              <Button type="text" @click="changeToBook()">历史</Button>
              <Button type="text" @click="changeToLife()">旅游</Button>
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
                                <Icon type="ios-star-outline" /> 2
                            </li>
                            <li>
                                <Icon type="ios-thumbs-up-outline" /> 4
                            </li>
                            <li>
                                <Icon type="ios-chatbubbles-outline" /> {{tiezi.commentNumber}}
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
          relationId: that.discussShow.pkId,
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
          userId: that.userId,
          title: that.discuss.title,
          content: that.discuss.content
      })
      .then(function (response) {
          that.$Message.success('新增成功!');
          that.getDiscuss();
          that.discuss.title = '';
          that.discuss.content = '';
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
      this.newsList = [
        {content: '让代步不再将就 奔奔E-Star国民版预售启动', url: 'https://auto.sina.com.cn/newcar/x/2020-12-30/detail-iiznezxs9816491.shtml'},
        {content: '喜欢运动的年轻人看过来 这些2.0T中型轿车足够亮眼', url: 'https://auto.sina.com.cn/guide/2020-12-30/detail-iiznctke9211291.shtml?hpid=00011'},
        {content: '欧尚X7上市一年便中期改款，这或许是你性价比极致之选', url: 'https://k.sina.com.cn/article_5083533502_12f0090be00100pwsp.html?from=auto&hpid=00012'},
        {content: '马自达将推新款CX-5 中控屏尺寸增大', url: 'https://auto.sina.com.cn/newcar/zz/2020-12-30/detail-iiznctke9322831.shtml?oaid=00111'}
      ]
    },
    changeToScience() {
      this.newsName = '科技';
      this.newsList = [
        {content: '肯尼亚第一大运营商暂停推出5G商用', url: 'https://finance.sina.com.cn/tech/2020-12-30/doc-iiznezxs9726622.shtml'},
        {content: '筑牢新基建之“基”，5G对社会生活有哪些改变', url: 'https://finance.sina.com.cn/tech/2020-12-30/doc-iiznezxs9784915.shtml'},
        {content: '微软正在修复Win10删除用户存储密码Bug', url: 'https://finance.sina.com.cn/tech/2020-12-30/doc-iiznezxs9753401.shtml'},
        {content: '华为桌面一体机曝光：四种形态 超薄设计', url: 'https://finance.sina.com.cn/tech/2020-12-30/doc-iiznezxs9754028.shtml'}
      ]
    },
    changeToArder() {
      this.newsName = '休闲';
      this.newsList = [
        {content: '缤纷豪礼增添新年色彩 《剑网3》邀你欢聚携手跨年', url: 'https://games.sina.com.cn/2020-12-30/detail-i-iiznctke9363724.shtml'},
        {content: 'CSOL十二周年主题事件：来曙光城过战友节', url: 'https://games.sina.com.cn/2020-12-30/detail-i-iiznezxs9706472.shtml'},
        {content: '新角色预约开启《艾尔之光》邀你进入月影之下', url: 'https://games.sina.com.cn/2020-12-30/detail-i-iiznctke9286328.shtml'},
        {content: '《学园偶像季：群星闪耀》入门篇：成员剧场功能解析', url: 'https://games.sina.com.cn/2020-12-30/detail-i-iiznctke9285316.shtml'}
      ]
    },
    changeToBeauty() {
      this.newsName = '美妆';
      this.newsList = [
        {content: '蔡依林吃了神马防腐剂 竟然跟20+时没有差别', url: 'https://fashion.sina.com.cn/b/sk/2020-12-25/2214/doc-iiznctke8012296.shtml'},
        {content: '盘点那些“回炉重造”的护肤品牌', url: 'https://fashion.sina.com.cn/b/sk/2020-12-29/1858/doc-iiznctke9106626.shtml'},
        {content: '编辑们重金囤货 冬季的“保命”面膜', url: 'https://fashion.sina.com.cn/b/sk/2020-12-30/1915/doc-iiznctke8014118.shtml'},
        {content: '2020年度眼妆盘点 学会了能再美一年', url: 'https://fashion.sina.com.cn/b/mk/2020-12-29/1858/doc-iiznezxs9529319.shtml'}
      ]
    },
    changeToArt() {
      this.newsName = '综艺';
      this.newsList = [
        {content: '王源跨年舞台彩排照曝光 一身运动装又唱又跳', url: 'http://slide.ent.sina.com.cn/z/v/slide_4_704_350530.html#p=1'},
        {content: '《青春有你3》训练生制服细节曝光 共四款设计突出个性', url: 'http://slide.ent.sina.com.cn/z/v/slide_4_704_350518.html#p=1'},
        {content: '张若昀节目中首谈女儿 现场示范换尿布父爱满满', url: 'https://ent.sina.com.cn/2020-12-30/doc-iiznezxs9751822.shtml'},
        {content: '丁飞俊确认退出《创造营2021》 目前已离开酒店', url: 'https://ent.sina.com.cn/2020-12-30/doc-iiznctke9303577.shtml'}
      ]
    },
    changeToThing() {
      this.newsName = '时事';
      this.newsList = [
        {content: '实时更新：新型冠状肺炎全国疫情地图', url: 'https://news.sina.cn/zt_d/yiqing0121'},
        {content: '国务院联防联控机制：防控不力将追责', url: 'https://news.sina.com.cn/c/2020-12-30/doc-iiznezxs9753070.shtml'},
        {content: '顺义聚集性疫情来源水落石出!', url: 'https://news.sina.com.cn/c/2020-12-30/doc-iiznezxs9783804.shtml'},
        {content: '美计划出售驻港总领馆房产 外交部回应', url: 'https://news.sina.com.cn/c/2020-12-30/doc-iiznezxs9764304.shtml'}
      ]
    },
    changeToBook() {
      this.newsName = '历史';
      this.newsList = [
        {content: '何其命硬——秦始皇一生的四次遇刺经历', url: 'http://blog.sina.com.cn/s/blog_5e6e0d820102z16s.html'},
        {content: '19长平之战赵国离得近为何反不能持久战？', url: 'http://blog.sina.com.cn/s/blog_60008c090102ym7a.html'},
        {content: '假如王弗还在，苏东坡会娶妾吗？', url: 'http://blog.sina.com.cn/s/blog_4865b35c0102zd8t.html'},
        {content: '秦始皇的军队为什么如此之强？', url: 'http://blog.sina.com.cn/s/blog_5f6e83250102z9de.html'}
      ]
    },
    changeToLife() {
      this.newsName = '旅游';
      this.newsList = [
        {content: '2021年铁路春运火车票12月30日开售', url: 'http://travel.sina.com.cn/domestic/news/2020-12-30/detail-iiznezxs9716024.shtml'},
        {content: '泰国将2021年中国春节定为法定假日', url: 'http://travel.sina.com.cn/outbound/news/2020-12-30/detail-iiznezxs9726123.shtml'},
        {content: '中国唯一穿汉服才能进的园林 游客打招呼以古语相称', url: 'http://travel.sina.com.cn/domestic/pages/2019-05-27/detail-ihvhiews4849111.shtml'},
        {content: '西游记里的通天河 真正的万里长江第一湾', url: 'http://travel.sina.com.cn/domestic/pages/2019-05-27/detail-ihvhiqay1677468.shtml'}
      ]
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
          // userId: that.userId,
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
          // userId: that.userId,
          pageIndex: 1,
          pageSize: 999,
          title: ''
        }
      })
      .then(function (response) {
          // console.log('bighghu是是是'+response.data.data.list);
          that.discussShow.pkId = response.data.data.list[0].pkId;
          that.discussShow.title = response.data.data.list[0].title;
          that.discussShow.content = response.data.data.list[0].content;
          console.log('哇啦啦', that.discussShow.pkId);
          that.getComment();
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
          type: 1
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
