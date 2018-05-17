<template>
    <div>
        <div v-if="data.length > 0" class="mb50 rural-supply-list">
            <Row type="flex" :gutter="32" align="bottom" class="rural-item-tab" >
                <Col span="8" class="specialtyList" v-for="(item,index) in data" :key="index">
                    <a :href="item.url" class="item vui-flex"><img :src="item.src" alt="" width="100%" height="300"></a>
                    <div class="details pb40">
                        <h5 class="mb20">{{item.title}}</h5>
                        <div v-if="!detail">
                            <p class="mb5">服务方名称：{{item.title}}</p>
                            <p class="mb5">服务方所在地：{{item.addr}}</p>
                            <p class="mb5">发布时间：{{item.time}}</p>
                            <p class="mb5 info" >服务方式、费用及范围{{item.info}}</p>
                        </div>
                        <i-button type="ghost" class="rural-btn-theme mt20" size="large">MORE &nbsp; <Icon type="ios-arrow-forward"></Icon></i-button>
                    </div>
                </Col>
            </Row>
            <div class="tc mt30">
                <Page class="country" :total="page.total" :current="page.current" :page-size="page.pageSize" @on-change="handlePageChange" v-if="page.show"></Page>
            </div>
        </div>
        <div class="ma-polic-img" v-if="data.length === 0">
            <img src="../../../img/no-content.png">
            <p style="margin-top: 10px;">暂无内容</p>
        </div>
    </div>
</template>
<script>
export default {
    props: {
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
                    pageSize: 9
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
        handlePageChange (val) {
            this.$emit('on-page-change',val)
        }

    }
}
</script>
<style lang="scss">
.rural-supply-list{
    margin: 50px 0 !important;
    .swiper-slide{
        margin: 0 20px 30px;
        text-align: center;
    }
    .item{
        margin: 0 auto 20px;
        width: 170px;
        height: 170px;
        border-radius: 100px;
        overflow: hidden;
    }
    .details{
        text-align:center;
        p{
            color:#999999;
            font-size: 12px;
        }
        .info{
            font-size: 14px;
            color:#FB5824;
        }
    }
   
}
    .specialtyList{margin-top: 10px;}
    .ma-polic-img{text-align: center;}
</style>