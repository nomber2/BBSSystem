<template>
    <div class="content">
        <div class="news">
            <div slot="top" class="demo-split-pane">
                <div>
                    <p style="font-size: 22px">{{news.title}}</p>
                    <div style="margin-top: 30px" v-html="news.content"></div>
                    <img width="280px" height="150px" :src="news.picture" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: 'Look',
    data () {
        return {
            split: 0.5,
            news: {
                'title': this.$route.query.title,
                'content': this.$route.query.content,
                'picture': this.$route.query.picture
            }
        }
    },
    methods: {
        sendComment() {
            let that = this;
            that.$axios.post('http://121.196.43.56/bbs-api/comment/add', {
                userId: 1, //可选
                relationId: that.news.pkId,
                type: 2,
                content: that.news.comment
            })
            .then(function (response) {
                console.log(response);
                // that.$router.push({path: "/"});
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
        },
        getComment() {
            let that = this;
            that.$axios.get('http://121.196.43.56/bbs-api/comment/list', {
                params: {
                userId: 1,
                relationId: that.news.pkId,
                pageIndex: 1,
                pageSize: 999
                }
            })
            .then(function (response) {
                console.log(response.data.data);
                // that.tieList = response.data.data.list;
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    },
    mounted() {
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