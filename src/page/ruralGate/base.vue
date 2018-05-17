<template>
    <div class="wrapper">
        <img src="../../img/com-banner5.jpg" height="400" width="100%" alt="">
        <!-- 企业知识库 -->
        <div class="layouts">
            <item-tab
                :breadcrumb="breadcrumb"
            ></item-tab>
        </div>
            <divider solid style="margin:0;" class="pb50" />
        <div class="layouts rural-gate-input">
            <Col span="24">
                <Form class="mt10 country-btn" inline>
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
                    <Row :gutter="16" class="rural-base-btn">
                        <Col span="6" v-for="(item,index) in mapItemData" :key="index">
                            <map-item
                            :to="`/member/productionBaseDetail?id=${item.productId}`"
                            :data="item"
                            class="mb10"></map-item>
                        </Col>
                    </Row>
                    <Page class="mt20 mb50" :page-size="9" :total="total" @on-change="handleChangePage"></Page>
                </div>
                <div class="ma-polic-img" v-if="mapItemData.length === 0">
                    <img src="../../img/no-content.png">
                    <p style="margin-top: 10px;">暂无内容</p>
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
            index: 10,
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
            loginAccount: ''
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
//                console.log(res)
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

 .rural-gate-input {
    .ivu-select-selection:hover{
        border-color: #7AAE00;
    }
    .ivu-select-visible .ivu-select-selection{
        border-color: #7AAE00;
         box-shadow: 0 0 0 2px rgba(122, 174, 0, 0.2);
    }
    .ivu-input:hover {
        border-color: #7AAE00 !important;   
        
    }
    .rural-gate-input .ivu-input:focus{
        border-color: #7AAE00 !important;
        box-shadow: 0 0 0 2px rgba(122, 174, 0, 0.2);
    }
 }
  .rural-base-btn .ivu-btn-ghost:hover{
        color: #7AAE00;
        background-color: transparent;
        border-color: #7AAE00;
    }
</style>