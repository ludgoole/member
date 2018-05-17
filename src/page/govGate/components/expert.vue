<template>
    <div class="pb50">
        <div v-if="data.length > 0">
            <Row :gutter="20" class="gov-gate">
                <Col span="6" v-for="(item,index) in data" :key="index" class="pb20">
                    <Card :padding="0" :bordered="false">
                        <div>
                            <a v-on:click="webimchat(item.userId, item.name, item.src)" >
                                <img v-if="item.src" :src="item.src" alt="" width="100%" height="220">
                                <img v-else src="../../../img/default_header.png" alt="" width="100%" height="220">
                            </a>
                        </div>
                        <div class="pd20" :class="colorInfo ? 'info' : ''">
                            <div class="expert-info-ivu">
                                <span class="h4">{{item.name}}</span>
                                <span>{{item.job}}</span>                 
                                <p class="mt10 mb10">专家电话：{{item.phone}}</p>
                                <p class="mb10 detail" >{{item.detail}}</p>
                            </div>
                            <divider solid  class="mt10 mb10"/>
                            <a :href="item.url" class="mt10"><Button type="ghost" shape="circle">更多信息 <Icon type="ios-arrow-right"></Icon></Button></a>
                        </div>
                    </Card>
                </Col>
            </Row>
            <div class="tc mt30">
                <Page class="country" :total="page.total" :current="page.current" :page-size="page.pageSize" @on-change="handlePageChange" v-if="page.show"></Page>
            </div>
        </div>
        <div class="ma-polic-img" v-if="data.length === 0">
            <img src="../../../img/no-content.png"> 
            <p class="pb10 bt10">暂无数据</p>
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
        data: Array,
        detail:{
            type: Boolean,
            default: false
        },
        colorInfo:{
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
                    pageSize: 1
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
        webimchat (userId, name, avatar) {
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
.gov-gate{
    .info{
        &:hover{
            border-color: #0579D5;
            background: #0579D5;
            color: #fff;
            .ivu-btn{
                color:#0579D5;
                background-color:#fff;
                border-color:#0579D5;
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
.expert-info-ivu{
    height: 90px;
    overflow: hidden;
    p{
        overflow:hidden; 
        text-overflow:ellipsis;
        display:-webkit-box; 
        -webkit-box-orient:vertical;
        -webkit-line-clamp:1; 
    }
}
</style>