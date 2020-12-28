<template>
  <div class="bgDiv">
    <div class="title">
      <h1 class="titleText">Bulletin Board System</h1>
      <h2 class="brief">
        Shine in the world you love 站在自己所热爱的世界里，闪闪发光
      </h2>
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
          <Card :bordered="false" class="lrCard"> 这里是新闻 </Card>
        </Col>
        <Col span="12">
          <div class="news">
            <Carousel class="lunbo" autoplay v-model="value2">
              <CarouselItem>
                <div
                  class="demo-carousel"
                  style="
                    height: 300px;
                    background-image: url(../../static/images/1.jpg);
                    background-size: cover;
                  "
                >
                  1
                </div>
              </CarouselItem>
              <CarouselItem>
                <div
                  class="demo-carousel"
                  style="
                    height: 300px;
                    background-image: url(../../static/images/2.jpg);
                    background-size: cover;
                  "
                >
                  2
                </div>
              </CarouselItem>
              <CarouselItem>
                <div
                  class="demo-carousel"
                  style="
                    height: 300px;
                    background-image: url(../../static/images/3.jpg);
                    background-size: cover;
                  "
                >
                  3
                </div>
              </CarouselItem>
              <CarouselItem>
                <div
                  class="demo-carousel"
                  style="
                    height: 300px;
                    background-image: url(../../static/images/4.jpg);
                    background-size: cover;
                  "
                >
                  4
                </div>
              </CarouselItem>
            </Carousel>
          </div>
        </Col>
        <Col span="6">
          <Card :bordered="false" class="lrCard">
            这里是留言区
            <List>
              <ListItem>
                <ListItemMeta
                  avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
                  title="This is title"
                  description="This is description, this is description."
                />
              </ListItem>
              <ListItem>
                <ListItemMeta
                  avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
                  title="This is title"
                  description="This is description, this is description."
                />
              </ListItem>
            </List>
          </Card>
        </Col>
      </Row>
      <Row :gutter="16" style="margin-top: 5px">
        <Col span="14">
          <Card class="yulenews">
            <p slot="title">娱乐新闻</p>
            <List item-layout="vertical">
              <ListItem v-for="item in data" :key="item.title">
                <ListItemMeta
                  :avatar="item.avatar"
                  :title="item.title"
                  :description="item.description"
                />
                {{ item.content }}
                <template slot="action">
                  <li><Icon type="ios-star-outline" /> 123</li>
                  <li><Icon type="ios-thumbs-up-outline" /> 234</li>
                  <li><Icon type="ios-chatbubbles-outline" /> 345</li>
                </template>
                <template slot="extra">
                  <img
                    src="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large"
                    style="width: 280px"
                  />
                </template>
              </ListItem>
            </List>
          </Card>
        </Col>
        <Col span="10">
          <Card :bordered="false" class="lrCard"> 这里是讨论区 </Card>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      value2: 0,
      data: [
        {
          title: "This is title 1",
          description:
            "This is description, this is description, this is description.",
          avatar:
            "https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar",
          content:
            "This is the content, this is the content, this is the content, this is the content.",
        },
        {
          title: "This is title 2",
          description:
            "This is description, this is description, this is description.",
          avatar:
            "https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar",
          content:
            "This is the content, this is the content, this is the content, this is the content.",
        },
        {
          title: "This is title 3",
          description:
            "This is description, this is description, this is description.",
          avatar:
            "https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar",
          content:
            "This is the content, this is the content, this is the content, this is the content.",
        },
      ],
    };
  },
  methods: {
    login() {
      this.$router.push({ path: "/login" });
    },
    register() {
      this.$router.push({ path: "/register" });
    },
    toInfo() {
      this.$router.push({ path: "/news", query: this.data });
    },
    toPersonal() {
      this.$router.push({ path: "/account" });
    },
    toPosting() {
      this.$router.push({ path: "/posting" });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scope>
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
