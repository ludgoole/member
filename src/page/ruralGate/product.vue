<template>
    <div class="wrapper">
        <img src="../../img/com-banner1.jpg" height="400" width="100%" alt="">
        <!-- 产品介绍 -->
        <div class="layouts">
            <item-tab
                :breadcrumb="breadcrumb"
                :tab="['全部', '绿色蔬菜', '热销水果', '幼苗基地']"
                @on-click="specialtyIndex"
            ></item-tab>
        </div>
        <divider solid style="margin:0" />
        <div class="layouts">
            <product
            :data="productData"
            :page="page"
            @on-page-change="nextPage"
            ></product>
        </div>
    </div>
</template>
<script>
import itemTab from './components/item-tab'
import product from './components/product'
import divider from '~components/divider'
import { navStatus } from '~page/companyGate/mixins/commonMixins'
export default {
    mixins: [navStatus],
    components:{
        itemTab,
        product,
        divider
    },
    data () {
        return {
            index: 1,
            productTab: '全部',
            breadcrumb: [{
                title: '首页',
                url: 'index'
            }, {
                title: '土特产'
            }],
            productData: [],
            page: {
                show: true,
                current: 1,
                total: 20,
                pageSize: 8
            },
            productName: ''
        }
    },
    created(){
        this.getDataAll(this.productName)
    },
    methods: {
        // 土特产 面包屑监听
        specialtyIndex(name){
            this.productName = name
            this.getDataAll(name)
        },

        // 土特产 获取数据
        getDataAll(name){
            let that = this
            this.$api.get('/member/shop/getAllProduct/'+ '?page=' + this.page.current + '&pageSize=' + this.page.pageSize)
            .then(res => {
                if(res.code === 200){
                    if(name === '全部'){
                        this.productData = res.data.ascend
                    }else if (name === '绿色蔬菜') {
                        this.productData = res.data.fixPriceProduct
                    }else if (name === '热销水果') {
                        this.productData = res.data.hotGroupBuy
                    }else{
                        this.productData = res.data.ypAuction
                    }
                    this.page.total = this.productData.length
                    this.productData.map(function(item){
                        item.src = item.image
                        item.title = item.name
                        item.url = that.$url.shop + item.adr
                    })
                }
            }).catch(error => {
                this.$Message.error('操作异常！')
            })
        },

        // 分页事件
        nextPage(val){
            this.page.current = val
            this.getDataAll(this.productName)
        }
    }
}
</script>
<style lang="scss">
    .ma_com_pro_p{
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
</style>