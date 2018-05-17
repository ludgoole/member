<template>
    <div>
        <div v-if="data.length > 0" class="pb50">
            <div class="tc mb50">
                <h5 class="mt30">{{title.cn}}</h5>
                <p class="mt10">{{title.en}}</p>
            </div>
            <Row :gutter="20" class="rural-team">
                <Col span="6" v-for="(item,index) in data" :key="index" class="pb20">
                    <Card :padding="0" :bordered="false">
                        <div v-on:click="webimchat(item.userId, item.name, item.src)">
                            <!-- <a :href="item.url"> -->
                                <img v-if="item.src" :src="item.src" alt="" width="100%" height="220">
                                <img v-else src="../../../img/default_header.png" alt="" width="100%" height="220">
                            <!-- </a> -->
                        </div>
                        <div class="info pd20">
                            <div class="expert-info-ivu">
                                <span class="h4">{{item.name}}</span>
                                <span>{{item.job}}</span>
                                <p class="mt10 mb10">专家电话：{{item.phone}}</p>
                                <p class="mb10 detail">{{item.detail}}</p>
                            </div>
                            <divider solid class="mt10 mb10"/>
                            <a :href="item.url" class="mt10"><Button type="ghost">更多信息 <Icon type="ios-arrow-right"></Icon></Button></a>
                        </div>
                    </Card>
                </Col>
            </Row>
            <div class="tc mt30">
                <Page class="country" :total="page.total" :page-size="page.pageSize" :current="page.current" @on-change="handlePageChange" v-if="page.show"></Page>
            </div>
        </div>
        <div class="ma-polic-img" v-if="data.length === 0">
            <img src="../../../img/no-content.png">
            <p style="margin-top: 10px;">暂无内容</p>
        </div>
    </div>
</template>
<script>
import divider from '~components/divider'
export default {
     components:{
            divider
        },
    props: {
        title: {
            type: Object,
            default () {
                return {}
            }
        },
        data: Array,
        detail:{
            type: Boolean,
            default: false
        },
        page: {
            type: Object,
            default () {
                return {
                    show: false,
                    current: 1,
                    total: 0,
                    pageSize:8
                }
            }
        }
    },
    data () {
        return {
        }
    },
    created(){
    },
    methods:{
        // 分页事件
        handlePageChange (page) {
            this.$emit('on-page-change',page)
        },
        webimchat: function (userId, name, avatar) {
            layui.layim.chat({
                id: userId,
                name: name,
                avatar: avatar,
                type: 'friend'
            });
        }

    }
}
</script>
<style lang="scss">
.rural-team{
    .ivu-card{
        margin-top: 10px;
        .info{
            &:hover{
                border-color: #7DB004;
                background: #7DB004;
                color:#fff;
                .ivu-btn{
                    background: #fff;
                    border-color: #fff;
                    color: #7DB004;
                }
            }
        }        
    }
    .detail{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        line-height: 26px;
    }    
} 
.country{
        .ivu-page-item-active{
            background-color: #F5A623 !important;
            border-color: #F5A623 !important;
        }           
        .ivu-page-item:hover{
            border-color: #F5A623 !important;                
        }
        .ivu-page-prev:hover{
            border-color: #F5A623 !important;   
        }
        .ivu-page-next:hover{
            border-color: #F5A623 !important;   
        }
        .ivu-page-item:hover a {
            color: #F5A623;
        }
}
.ma-polic-img{text-align: center;}
</style>