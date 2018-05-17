<template>
    <div class="wrapper">
        <img src="../../img/com-banner5.jpg" height="400" width="100%" alt="">
        <div class="layouts expert-gate-input">
            <item-tab
                :breadcrumb="breadcrumb"
            ></item-tab>
            <divider solid style="margin:0" />
            <div style="height: 20px;"></div>
            <Col span="24">
                <Form class="mt10 expert-gate-btn" inline>
                    <FormItem>
                        <Input v-model="baseName" placeholder="基地名称"></Input>
                    </FormItem>
                    <FormItem>
                        <Input v-model="contactName" placeholder="联系人"></Input>
                    </FormItem>
                    <FormItem>
                        <Input v-model="contactTel" placeholder="电话号码"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click.native="handleSearch">查询</Button>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click.native="addProductionBase">新增</Button>
                    </FormItem>
                </Form>
                <div v-if="mapItemData.length > 0">
                    <Row :gutter="16" class="expert-base-btn">
                        <Col span="6" v-for="(item,index) in mapItemData" :key="index">
                            <map-item
                            :to="`/member/productionBaseDetail?id=${item.productId}`"
                            :data="item"
                            class="mb10"></map-item>
                        </Col>
                    </Row>
                    <Page class="mt20 expert-gate-page tc" :page-size="9" :total="total" @on-change="handleChangePage"></Page>
                    <div style="height: 20px;"></div>
                </div>
                <div class="ma-polic-img" v-if="mapItemData.length === 0">
                    <img src="../../img/ma-img-002.png"> 
                    <p style="margin-top: 10px;">暂无数据</p>
                </div>
            </Col>
        </div>
    </div>
</template>
<script>
import { navStatus } from '~page/companyGate/mixins/commonMixins'
import itemTab from './components/item-tab'
import divider from '~components/divider'
import mapItem from '~page/member/components/productionMapList'

export default {
    mixins: [navStatus],
    components:{
        itemTab,
        divider,
        mapItem
    },
    data () {
        return {
            index: 8,
            breadcrumb: [{
                title: '首页',
                url: 'index'
            }, {
                title: '基地'
            }],
            mapItemData: [],
            total: 0,
            baseName: '',
            contactName: '',
            contactTel: '',
            loginAccount:''
        }
    },
    created () {
        this.loginAccount = this.$route.query.uid
        this.loadMapData()
    },
    methods:{
        // 搜索
        handleSearch () {
            this.loadMapData(this.baseName, this.contactName, this.contactTel)
        },
        // 分页
        handleChangePage (pageNum) {
            this.loadMapData(this.baseName, this.contactName, this.contactTel, pageNum)
        }, 
        loadMapData (baseName = '', contactName = '', contactTel = '', pageNum = 1) {
            this.$api.post('/member/product-base/select-all', {
                loginAccount: this.loginAccount,
                baseName: baseName,
                contactName: contactName,
                contactTel: contactTel,
                pageNum: pageNum,
                pageSize: 9
            }).then(res => {
                this.total = res.data.total
                this.mapItemData = res.data.list
            })
        },
        addProductionBase () {
            this.$router.push('/member/addProductionBase')
        }
    }
}
</script>
<style lang="scss">
.ma-polic-img{text-align: center;}  
.expert-gate-input .ivu-breadcrumb a:hover{color: #1E7505;}
.expert-gate-input {
        .ivu-select-selection:hover{
             border-color: #1E7505 !important;
        }
        .ivu-select-visible .ivu-select-selection{
           border-color: #1E7505 !important;
            box-shadow: 0 0 0 2px rgba(30, 117, 51, 0.2);
        }
        .ivu-input:hover {
            border-color: #1E7505 !important;
        }
        .ivu-input:focus{
            border-color: #1E7505 !important;
           box-shadow:0 0 0 2px rgba(30, 117, 51, 0.2);
        }
}
    .expert-gate-btn .ivu-btn{
        background-color: #1E7505 ;
        border-color: #1E7505    ;
    }
    .expert-gate-btn .ivu-btn-primary:hover{
        background-color: #1E7505 ;
        border-color: #1E7505    ;  
    }
    .expert-base-btn .ivu-btn-ghost:hover{
        color: #1E7505;
        background-color: transparent;
        border-color: #1E7505;
    }
    .expert-gate-page .ivu-page-item-active {
        background-color: #1E7505!important;
        border-color: #1E7505!important;
    }
</style>