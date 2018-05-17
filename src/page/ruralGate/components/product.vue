<template>
    <div class="pt20">
        <div v-if="data.length > 0" class="mb50 rural-pro-list">
            <Row type="flex" :gutter="20">
                <Col span="6" class="specialtyList" v-for="(item,index) in data" :key="index">
                    <a :href="item.url"><img :src="item.src" alt="" width="100%" height="300"></a>
                    <div :class="simple ? '' : 'info'">
                        <h5 class="mb5">{{item.title}}</h5>
                        <h6 class="mb5">种养范围:{{item.scopen}}</h6>
                        <p class="t-orange" v-if="!simple">￥{{item.price}}</p>
                    </div>
                </Col>
            </Row>
            <div class="tc mt30">
                <Page class="country" :total="page.total" :current="page.current" :page-size="page.pageSize" @on-change="handlePageChange" v-if="page.show"></Page>
            </div>
        </div>
        <div class="ma-polic-img pt20 pb20" v-if="data.length === 0">
            <img src="../../../img/no-content.png">
            <p style="margin-top: 10px;">暂无内容</p>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        data: Array,
        simple: {
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
                    pageSize: 8
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
    .rural-pro-list{
        .info{
            padding: 10px;
            transition: background .3s;
            &:hover{
                background: #7AAE00;
                &,p.t-orange{
                    color: #fff !important;
                }
            }
        }
    }
    .specialtyList{margin-top: 10px;}
    .ma-polic-img{text-align: center;}
</style>