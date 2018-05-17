<template>
    <div class="wrapper">
        <img src="../../img/com-banner4.jpg" height="400" width="100%" alt="">
        <!-- <div class="layouts">
            <itemTab
                    :breadcrumb="[{url: `index?uid=${$route.query.uid}`,title:'首页'},{url: `agencyBasic?uid=${$route.query.uid}`,title:'基本信息'},{title:'荣誉证书'}]"
            ></itemTab>
        </div>
        <divider solid style="margin:0 0 30px 0" /> -->
         <div class="tc mb50">
                <h5 class="mt30">荣誉证书</h5>
                <p class="t-grey mt10">Certificate of honor</p>
        </div>
        <div class="layouts pb50">
            <div  v-if="data.length > 0" class="rural-pro-list">
                <Row type="flex" :gutter="20" class="pb10">
                    <Col span="6" class="specialtyList" v-for="(item,index) in data" :key="index">
                    <!--<a :href="item.url"><img :src="item.addr" alt="" width="100%" height="300"></a>-->
                    <img :src="item.image" alt="" width="100%" height="300">
                    <!-- <div>
                        <h5 class="mb10">{{item.columns}}</h5>
                    </div> -->
                    </Col>
                </Row>
                <Page class="tc country pt30" :page-size="page.pageSize" :total="total" @on-change="nextPage"></Page>
            </div>
            <div class="ma-polic-img" v-if="data.length === 0">
                <img src="../../img/no-content.png">
                <p style="margin-top: 10px;">暂无数据</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { navStatus } from '~page/companyGate/mixins/commonMixins'
    import itemTab from './components/item-tab'
    import divider from '~components/divider'
    export default {
        mixins: [navStatus],
        components:{
            itemTab,
            divider
        },
        data () {
            return {
                loginAccount:'',
                index: 1,
                total: 0,
                page: {
                    current: 1,
                    pageSize: 8
                },
                data:[]
            }
        },
        created(){
            this.loginAccount = this.$route.query.uid
            this.getData()
        },
        methods:{
            getData(){
                this.$api.post('/portal/introduction/honor-aptitude',{
                    loginAccount: this.loginAccount,
                    pageNum: this.page.current,
                    pageSize: this.page.pageSize,
                    column: '荣誉'

                })
                    .then(res => {
                        if(res.code === 200){
                            if(res.data !== undefined){
                                this.data = res.data.list
                                this.total = res.data.total
                            }
                        }

                    }).catch(error => {
                    this.$Message.error('操作异常！')
                })
            },
            // 分页事件
            nextPage(val) {
                this.page.current = val
                this.getData()
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
    .page{text-align: center;
        margin:0 auto;
    }


</style>