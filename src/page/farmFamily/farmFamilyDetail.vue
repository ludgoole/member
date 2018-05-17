<template>
  <div class="mt20">
    <vui-affix-tabs :data="tabsData">
        <p class="t-orange pl20">完善种养户档案能更好的管理你的种养户</p>
        <div class="pd20">
            <section id="family" >
                <Title title="家庭成员"></Title>
                <family-detail ref="family" @on-submit="handleGetSubmit" ></family-detail>  
            </section>
            <section id="product" >
                <Title title="产出产品"></Title>
                <product-detail ref="product" @on-submit="handleGetSubmit"></product-detail>
            </section>
            <section id="service" >
                <Title title="提供服务"></Title>
                <service-detail ref="service" @on-submit="handleGetSubmit" ></service-detail>
            </section>
            <section id="wantToBuy" >
                <Title title="求购意向"></Title>
                <want-to-buy ref="wantToBuy" @on-submit="handleGetSubmit"></want-to-buy>
            </section>
            <section id="house" >
                <Title title="房屋生活情况"></Title>
                <house ref="house" @on-submit="handleGetSubmit" ></house>
            </section>
            <section id="modern" >
                <Title title="家庭现代化情况"></Title>
                <modern ref="modern" @on-submit="handleGetSubmit"></modern>
            </section>
        </div>
        <div class="tc pd30">
            <Button type="ghost" @click="handleCancel">取消</Button>
            <Button type="primary" @click="handleNext">确定</Button>
        </div>
    </vui-affix-tabs>
  </div>
</template>
<script>
import VuiAffixTabs from '../userAuth/components/vui-affix-tabs'
import Title from '../userAuth/components/title'
import familyDetail from './familyDetail'
import productDetail from './productDetail'
import serviceDetail from './serviceDetail'
import wantToBuy from './wantToBuy'
import house from './house'
import modern from './modern'
    export default{
        components: {
            VuiAffixTabs,
            Title,
            familyDetail,
            productDetail,
            serviceDetail,
            wantToBuy,
            house,
            modern
        },
        data () {
            return {
                isNext:true,
                tabsData: [
                    {name: 'family',title:'家庭成员'},
                    {name: 'product',title:'产出产品'},
                    {name: 'service',title:'提供服务'},
                    {name: 'wantToBuy',title:'求购意向'},
                    {name: 'house',title:'房屋生活情况'},
                    {name: 'modern',title:'家庭现代化情况'},
                ],
                id:'',
                familyDatas: [
                    {
                        name: '',
                        relationship: '',
                        sex: '',
                        birthday: '',
                        phone: '',
                        skill: '',
                    }
                ],
                productDatas: [
                    {
                        species: '',
                        scale: '',
                        commodityName: '',
                        productName: '',
                        product: '',
                        conversion: ''
                    }
                ],
                serviceDatas: [
                    {
                        serviceName: '',
                        classification: '',
                        creatTime: '',
                        pictureList: []
                    }
                ],
                buyDatas:[
                    {
                        name: '',
                        productName: '',
                        total: '',
                        price: '',
                        totalAmount: '',
                    }
                ],
                houseDatas: [
                    {
                        status: true,
                        name: '', //房主姓名
                        addr: '', //地址
                        buildingArea: '', //建筑面积
                        houseNumber: '', //房屋所有权证  编号
                        useArea: '', //土地使用面积
                        landNumber: '', //土地使用证  编号
                        distance: '', //房屋与乡村公路的距离
                        structure: '',//房屋结构
                        land: '',//地理位置
                        development: '',//房屋建设情况描述
                        reason: '',//未办证原因
                        purpose: '',//房屋用途
                        waterSource: '',//饮水来源
                        tcSignal: '',//电视信号
                        communicationQuality: '',//通电质量
                        waterHard: '',//饮水是否困难
                        biogasPool: '',//沼气池
                        pool: '',//一池三改
                        gas: '',//天然气
                        broadband: '',//宽带网
                        network: '',//电信网络
                        certificate:'',//是否办证
                        estate:'',//不动产权编号
                    }
                ],
                modernDatas: [
                    {
                        tv: '',
                        computer: '',
                        icebox: '',
                        ari: '',
                        car: '',
                        motorcycle: '',
                        heater: ''
                    }
                ]
            }
        },
        created () {
            //初始化获取数据
            this.id = this.$route.query.id
            this.$api.post('/member/farmFamilyDetail/findFarmFamilyDetail',{farm_family_id: this.id}).then(response => {
                console.log(response)
                if (response.code == 200) {
                    var data = response.data
                    console.log(response.data.purchase_intention.length)
                    
                    if (response.data.purchase_intention.length) {
                        console.log('购买')
                        var buyData = response.data.purchase_intention
                        this.$refs['wantToBuy'].getData(buyData)
                    }else{
                        this.$refs['wantToBuy'].getData(this.buyDatas)
                    }
                    
                    if (response.data.house_situation.length) {
                        console.log('房屋')
                        var houseData = response.data.house_situation
                        this.$refs['house'].getData(houseData)
                    }else{
                        this.$refs['house'].getData(this.houseDatas)
                    }
                    if (response.data.family_situation.length) {
                        console.log('现代化')
                        var modernData = response.data.family_situation
                        this.$refs['modern'].getData(modernData)
                    }else{
                        this.$refs['modern'].getData(this.modernDatas)
                    }
                    if (response.data.family_Member.length) {
                        console.log('家庭')
                        var familyData = response.data.family_Member
                        this.$refs['family'].getData(familyData)
                    }else{
                        this.$refs['family'].getData(this.familyDatas)
                    }
                    if (response.data.output_product.length) {
                        console.log('产品')
                        var productData = response.data.output_product
                        this.$refs['product'].getData(productData)
                    }else{
                        console.log('产品=0')
                        this.$refs['product'].getData(this.productDatas)
                    }
                    if (response.data.provide_services.length) {
                        console.log('服务')
                        var serviceData = response.data.provide_services
                        this.$refs['service'].getData(serviceData)
                    }else{
                        this.$refs['service'].getData(this.serviceDatas)
                    }
                }
            })
        },
        methods: {
            //取消
            handleCancel () {
                this.$router.push({ path: '/family/list'})  
            },
            //确定
            handleNext () {
                console.log('点击了确认')
                this.tabsData.forEach(element => {
                    var corpInfo = element.name
                    this.$refs[corpInfo].handleSubmit()
                })
                if(this.isNext){
                    var list = {}
                    list.farm_family_id = this.id
                    list.family_Member = this.$refs['family'].data
                    list.output_product = this.$refs['product'].data
                    list.provide_services = this.$refs['service'].data
                    list.purchase_intention = this.$refs['wantToBuy'].data
                    list.house_situation = this.$refs['house'].data
                    list.family_situation = this.$refs['modern'].data
                    //表单验证成功的操作
                    console.log('表单验证成功')
                    this.$api.post('/member/farmFamilyDetail/updateFarmFamilyDetail',list).then(response => {
                        console.log(response)
                        if (response.code == 200) {
                            this.$router.push({ path: '/family/list'})
                        } else {
                            this.$Message.error('保存失败！')
                        }
                    })
                }else{
                    this.isNext = true
                    this.$Message.error('请核对输入信息')
                }
            },
            handleGetSubmit(e){
                if(!e){
                    this.isNext = e
                }
            }
        }
    }

</script>
<style>


</style>
