<template>
    <div class="wrapper">
        <img src="../../img/com-banner1.jpg" height="400" width="100%" alt="">
        <!-- 产品介绍 -->
        <div class="layouts">
            <product
            v-if="template"
            :title="{cn: '产品介绍', en: 'Product introduction'}"
            :tab="['全部', '绿色蔬菜', '热销水果', '幼苗基地']"
            :data="productData"
            :page="page"
            :simple="template"
            @on-tab-change="handleProTab"
            @on-page-change="nextPage"
            ></product>


            <product-chant
            v-else
            :title="{cn: '产品介绍', en: 'Product introduction'}"
            :tab="['全部', '绿色蔬菜', '热销水果', '幼苗基地']"
            :data="productData"
            :page="page"
            :simple="template"
            @on-tab-change="handleProTab"
            @on-page-change="nextPage"
            ></product-chant>
        </div>
    </div>
</template>
<script>
import api from '~api'
import { navStatus } from './mixins/commonMixins'
import product from './components/product'
import productChant from './components/productChant'
export default {
    mixins: [navStatus],
    components:{
        product,
        productChant
    },
    data () {
        return {
            index: 1,
            productTab: '全部',
            productData: [],
            page: {
                show: true,
                current: 1,
                total: 20
            },
            // 企业模版 还是 商业模版
            template: true,
            loginuserinfo:JSON.parse(sessionStorage.getItem("user")),
            loginAccount:''
        }
    },
    created(){
        this.loginAccount = this.$route.query.uid
        this.show()
    },
    methods: {
        // 产品 tab 切换TAB赋值，此处做演示数据格式，自行按需求修改
        handleProTab (name) {
            this.productTab = name
            this.show()
        },

        // 企业模版 还是 商业模版
        show(){
            api.post('/portal/myGate/getModular', {
                loginAccount: this.loginAccount
            })
            .then(response => {
                if (response.code === 200) {
                    if(response.data.template ==='企业模板'){
                        this.template = true
                        this.getDataAll()
                    }else{
                        this.template = false
                        this.getDataChantAll()
                    }
                }
            })  
        },

        // 获取企业全部数据
        getDataAll(){
            let that = this
            api.get('/member/shop/getAllProduct/'+ '?page=' + that.page.current + '&pageSize=' + 8)
            .then(res => {
                if(res.code === 200){
                    if(that.productTab === '全部'){
                        that.productData = res.data.ascend
                    }else if (that.productTab === '绿色蔬菜') {
                        that.productData = res.data.fixPriceProduct
                    }else if (that.productTab === '热销水果') {
                        that.productData = res.data.hotGroupBuy
                    }else{
                        that.productData = res.data.ypAuction
                    }
                    that.page.total = that.productData.length

                    let name = ''
                    
                    if(that.template === true){
                        name = '企业模版'
                    }else{
                        name = '商户模版'
                    }
                    that.productData.map(function(item){
                        item.adr = that.$url.shop + item.adr+'?name='+ name
                    })
                }
            }).catch(error => {
                this.$Message.error('操作异常！')
            })
        },

        // 获取商户全部数据
        getDataChantAll(){
            let that = this
            api.get('/member/shop/getAllProduct/'+ '?page=' + that.page.current + '&pageSize=' + 8)
            .then(res => {
                if(res.code === 200){
                    if(that.productTab === '全部'){
                        that.productData = res.data.ypAuction
                    }else if (that.productTab === '绿色蔬菜') {
                        that.productData = res.data.fixPriceProduct
                    }else if (that.productTab === '热销水果') {
                        that.productData = res.data.hotGroupBuy
                    }else{
                        that.productData = res.data.ascend
                    }
                    that.page.total = that.productData.length

                    let name = ''
                    if(that.template === true){
                        name = '企业模版'
                    }else{
                        name = '商户模版'
                    }
                    that.productData.map(function(item){
                        item.adr = that.$url.shop + item.adr+'?name='+ name
                    })
                }
            }).catch(error => {
                this.$Message.error('操作异常！')
            })
        },

        // 分页事件
        nextPage(val) {
            this.page.current = val
            this.show()
        }
    }
}
</script>
<style lang="scss">
    .ma_com_pro_p{
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
</style>