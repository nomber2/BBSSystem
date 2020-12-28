<template>
    <div class="content">
        <div class="news">
            <Split v-model="split" mode="vertical">
                <div slot="top" class="demo-split-pane">
                    <div>
                        <p style="font-size: 22px">{{news.title}}</p>
                        <p>{{news.content}}</p>
                    </div>
                </div>
                <div slot="bottom" class="demo-split-pane">
                    <Card :bordered="false">
                        <p slot="title" class="title">评论区</p>
                        <List>
                            <ListItem>
                                <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" description="This is description, this is description." />
                            </ListItem>
                            <ListItem>
                                <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" description="This is description, this is description." />
                            </ListItem>
                        </List>
                    </Card>
                </div>
            </Split>
        </div>
    </div>
</template>
<script>
import HelloWorld from './HelloWorld.vue';

export default {
  components: { HelloWorld },
    name: 'News',
    data () {
        return {
            split: 0.5,
            news: {
                'title': this.$route.query.title,
                'content': this.$route.query.content
            }
        }
    }
}
</script>
<style>
.demo-split-pane{
    padding: 20px;
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
    height: 80vh;
    margin:  30px auto 30px auto;
    padding: 20px;
    border: 1px solid #dcdee2;
}
/* .content {
    height: 100vh;
    width: 100vw;
    padding: 0;
    margin: 0;
    background-image: url(../../static/images/bg1.jpg);
} */
</style>