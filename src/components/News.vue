<template>
    <div class="content">
        <div class="news">
            <Split v-model="split" mode="vertical">
                <div slot="top" class="demo-split-pane">
                    <div>
                        <p style="font-size: 22px">{{news.title}}</p>
                        <div style="margin-top: 30px" v-html="news.content"></div>
                        <img width="280px" height="150px" :src="news.picture" alt="">
                    </div>
                </div>
                <div slot="bottom" class="demo-split-pane">
                    <Card :bordered="false">
                        <p slot="title" style="font-style: italic; font-size: 1.5em; text-align: left;">留言区</p>
                        <List>
                            <ListItem>
                                <ListItemMeta :avatar="news.avatar" />
                                <Input v-model="news.comment" placeholder="请输入你的观点……"/>
                                <Button @click="sendComment">发送</Button>
                            </ListItem>
                        </List>
                        <List>
                            <ListItem v-for="(item, index) in commentList" :key="index">
                                <ListItemMeta :avatar="news.avatar" />
                                <p>{{item.content}}</p>
                                <Button @click="deleteComment(item.pkId)" type="text" style="color: red">删除</Button>
                            </ListItem>
                        </List>
                    </Card>
                </div>
            </Split>
        </div>
    </div>
</template>
<script>

export default {
    name: 'News',
    data () {
        return {
            split: 0.5,
            commentList: [],
            userId: 0,
            news: {
                'pkId': this.$route.query.id,
                'title': this.$route.query.title,
                'content': this.$route.query.content,
                'picture': this.$route.query.picture,
                'avatar': this.$route.query.avatar,
                'comment': ''
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
        sendComment() {
            let that = this;
            that.$axios.post('http://121.196.43.56/bbs-api/comment/add', {
                userId: 1, //可选
                relationId: that.news.pkId,
                type: 0,
                content: that.news.comment
            })
            .then(function (response) {
                console.log(response);
                that.getComment();
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
        },
        getComment() {
            let that =this;
            that.$axios.get('http://121.196.43.56/bbs-api/comment/list', {
                params: {
                    userId: that.userId,
                    pageIndex: 1,
                    pageSize: 999,
                    relationId: that.news.pkId,
                    type: 0
                }
            })
            .then(function (response) {
                console.log('乌拉拉' + response.data.data);
                that.news.comment = '';
                that.commentList = response.data.data.list;
                console.log('啊', that.commentList);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    },
    mounted() {
        this.userId = localStorage.getItem('userId');
        this.getComment();
    }
}
</script>
<style scoped>
.demo-split-pane{
    padding: 15px;
}
.title {
    font-style: italic;
    font-size: 1.7em;
    text-align: left;
}
.comment {
    margin: 20px 0;
}
.news {
    width: 70vw;
    height: 100vh;
    margin:  0 auto 0 auto;
    padding: 20px;
    border: 1px solid #dcdee2;
    background-color: #dcdee2;
    opacity: 0.8;
}
.content {
    height: 100vh;
    width: 100vw;
    display: table-cell;
    vertical-align: middle;
    margin: 0;
    background-image: url(../../static/images/ftbg.jpg);
}
</style>