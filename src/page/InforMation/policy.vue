<template>
    <Row dis-hover>
        <Col span="13">
            <div class="new-last">
                <detail :dataList="list" :small="true"></detail>
                <!-- <ul>
                    <li v-for="item in list">
                        <router-link :to="{ path: '/InforMation/policyDetail', query: { 'id': item.informationDetailId }}" v-show="item.columnType!='图书'"><p class="h4 ell mb15">{{ item.title }}</p></router-link>
                        <router-link :to="{ path: '/InforMation/bookBlurb', query: { 'id': item.id,informationDetailId:item.informationDetailId,book_type:'policy' }}" v-show="item.columnType=='图书'"><p class="h4 ell mb15">{{ item.title }}</p></router-link>
                        <Row type="flex" align="middle">
                            <Col span="20">
                                <Row type="flex" align="middle">
                                  <Col span="4">
                                    <Tag type="border" color="green">{{item.docType}}</Tag>
                                  </Col>
                                  <Col span="12">
                                    <p class="ell pr10">{{item.speciesName}}</p>
                                  </Col>
                                  <Col span="6">
                                    <span class="main-time">{{item.createTime}}</span>
                                  </Col>
                                </Row>
                            </Col>
                            <Col span="4" class="tr">
                                <span>{{item.commentNum}}</span>
                            </Col>
                        </Row>
                    </li> -->
                    <a v-if="list.length > 0">
                        <Button type="ghost" class="new-more mt20" @click="policy()">更多</Button>
                    </a>
                </ul>
            </div>
        </Col>
        <Col span="10" offset="1">
            <Card dis-hover class="mt30">
                <div class="new2">
                    <div class="new-title">
                        <div class="new-text">
                            <h5 class="new-title-h5">简讯</h5>
                        </div>
                    </div>
                    <ul>
                        <template v-for="item in newsList">
                            <li>
                                <router-link :to="{ path: '/InforMation/policyDetail', query: { 'id': item.informationDetailId }}">
                                    <p>{{ item.title }}</p>
                                </router-link>
                            </li>
                        </template>
                    </ul>
                </div>
            </Card>
        </Col>
    </Row>
</template>
<script>
import api from '~api'
import detail from '../pro/components/detail.vue'
export default {
    components:{
        detail
    },
    created() {
        this.fetchData()
        this.newsData()
    },
    data() {
        return {
            currentPage: 1,
            pageSize: 5,
            total: 0,
            list: [],
            newsList: []
        }
    },
    methods: {
        // 简讯查询
        newsData(){
            api.post('/member/policy/brief-news')
            .then(res => {
                if(res.code === 200){
                    this.newsList = res.data
                }
            })
        },


        fetchData: function() {
            this.list = []
            api.get('/member/policy/findPolicy/' + this.currentPage + "?pageSize=" + this.pageSize)
                .then(response => {
                    if(response.code === 200){
                        this.list = response.data.list
                        this.list.map(function(item){
                            item.createTime = item.createTime.split(" ")[0]
                            if(item.columnType === '图书'){
                                item.isSrc = `/InforMation/bookBlurb?id=${item.id}&informationDetailId=${item.informationDetailId}&book_type=policy`
                            }else{
                                item.isSrc = `/InforMation/policyDetail?id=${item.informationDetailId}`
                            }
                        })
                    }
                })
        },
        nextPage(val) {
            this.currentPage = val
            this.list = []
            api.get('/member/policy/findPolicy/' + this.currentPage + "?pageSize=" + this.pageSize)
                .then(response => {
                    this.total = response.data.total
                    this.list = response.data.list
                })
        },
        routeTo(e) {
            this.$router.push(e);
        },
        policy() {
            this.$router.push({
                path: '/pro/policyList', query: { flag: 2 }
            })
        }
    }
}
</script>