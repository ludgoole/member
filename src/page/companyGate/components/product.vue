<template>
    <div class="mb50">
        <div class="tc">
            <h5 class="mt30">{{title.cn}}</h5>
            <p class="mt10">{{title.en}}</p>
            <RadioGroup v-model="productTab" type="button" class="mt30 mb20" @on-change="handleTabChange">
                <Radio v-for="(item,index) in tab" :key="index" :label="item"></Radio>
            </RadioGroup>
        </div>
        <div v-if="data.length > 0">
            <Row type="flex" :gutter="20">
                <Col span="6" v-for="(item,index) in data" :key="index" class="ma-listImg">
                    <a :href="item.adr">
                        <img :src="item.image" alt="" width="100%" height="300">
                    </a>
                    <h5 class="mt10 ma_com_pro_p">{{item.name}}</h5>
                    <p class="t-orange mb30"  v-if="!simple">￥{{item.price}}</p>
                </Col>
            </Row>
            <div class="tc mt30">
                <Page :total="page.total" :current="page.current" :page-size="page.pageSize" @on-change="handlePageChange" v-if="page.show"></Page>
            </div>
        </div>
        <div class="ma-polic-img" v-if="data.length === 0">
            <img src="../../../img/no-content.png"> 
            <p style="margin-top: 10px;">暂无数据</p>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        simple: {
            type: Boolean,
            default: false
        },
        title: {
            type: Object,
            default () {
                return {}
            }
        },
        tab: Array,
        data: Array,
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
            productTab: this.tab[0]
        }
    },
    created(){
    },
    methods:{
        // tab事件
        handleTabChange () {
            this.$emit('on-tab-change', this.productTab)
        },
        // 分页事件
        handlePageChange (val) {
            this.$emit('on-page-change',val)
        }

    }
}
</script>
<style lang="scss">
.ma-listImg{margin-top: 20px;}
.ma-polic-img{text-align: center;} 
</style>