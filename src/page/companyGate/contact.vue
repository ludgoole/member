<template>
    <div class="wrapper">
        <img src="../../img/com-banner7.jpg" height="400" width="100%" alt="">
        <div class="layouts">
            <div class="tc pt20 mb50">
                <h5 class="mt30">联系我们</h5>
                <p class="mt10">Contact us</p>
            </div>
            <Row type="flex" align="middle" class="mb50">
                <Col span="12">
                    <h5 class="mb20">{{data.comName}}</h5>
                    <Form class="com-contact-list">
                         <!-- 1公开 0隐藏 -->
                        <FormItem v-if="data.nameStatus == 1" label="姓名：">{{data.name}}</FormItem>
                        <FormItem v-if="data.phoneStatus == 1" label="手机：">{{data.moble}}</FormItem>
                        <FormItem v-if="data.status == 1" label="电话：">{{data.tel}}</FormItem>
                        <FormItem v-if="data.status == 1" label="QQ：">{{data.qq}}</FormItem>
                        <FormItem v-if="data.status == 1" label="邮箱：">{{data.mail}}</FormItem>
                        <FormItem v-if="data.addrStatus == 1" label="地址：">{{data.address}}</FormItem>
                        <FormItem v-if="data.status == 1" label="邮政编码：">{{data.zipCode}}</FormItem>
                    </Form>
                </Col>
                <Col span="12" v-if="data.center.lat !== undefined && data.coordinateStatus == 1">
                    <!--<a target="_blank" :href="`http://map.baidu.com/?newmap=1&ie=utf-8&s=s%26wd%3D${location}`">-->
                    <a target="_blank" :href="`http://api.map.baidu.com/marker?location=${data.center.lat},${data.center.lng}&title=我的位置&content=${location}&output=html`">
                        <img :src="`//api.map.baidu.com/staticimage?height=200&center=${data.center.lng},${data.center.lat}&zoom=15&scale=2&markers=${data.center.lng},${data.center.lat}`" alt="" width="100%">
                    </a>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>
import api from '~api'
import $ from 'jquery'
import { navStatus } from './mixins/commonMixins'
export default {
    mixins: [navStatus],
    data () {
        return {
            index: 8,
            data: {
                comName: '',
                name: ' ',
                moble: '',
                tel: '',
                mail: '',
                address: '',
                zipCode: '',
                center: {lng:0 , lat:0}
            },
            location: '',
            loginAccount:''
        }
    },
    created(){
        this.loginAccount = this.$route.query.uid
        this.getData()
    },
    methods:{
        getData(){
            api.post('/portal/contoct/getContoct',{account :this.loginAccount,queryType :3})
            .then(res => {
                if(res.code === 200){
                    if(res.data !== undefined){
                        var center = {}
                        center.lng = res.data.coordinate.split(',')[0]
                        center.lat = res.data.coordinate.split(',')[1]
                        this.data = res.data
                        this.data.comName = res.data.corpName,
                        this.data.name = res.data.legalPerson,
                        this.data.moble = res.data.phone,
                        this.data.tel = res.data.mobile,
                        this.data.qq = res.data.qq,
                        this.data.mail = res.data.email,
                        this.data.address = res.data.addr,
                        this.data.zipCode = res.data.postalCode,
                        this.data.center = center
                        var v = this
                        // 转换经纬度
                        if(res.data.coordinate){
                            $.ajax({
                                async : 'false',
                                url : 'http://api.map.baidu.com/geocoder/v2/',
                                type : 'GET',
                                dataType : 'jsonp',
                                jsonpCallback : 'showLocation',
                                timeout : '5000',
                                contentType : 'application/json;utf-8',
                                data : {
                                    location: res.data.coordinate.split(',')[1] + ',' + res.data.coordinate.split(',')[0],
                                    output:'json',
                                    ak:'7syPirZ2AWxacMfHeAfuujdDgFmxCB5g',
                                    callback:'showLocation'
                                },
                                success : function(data) {
                                    v.location = data.result.formatted_address
                                }
                            });
                        }
                    }                    
                }
            }).catch(error => {
                this.$Message.error('操作异常！')
            })
        }
    }
}
</script>
<style lang="scss">
    .com-contact-list{
        .ivu-form-item{
            margin-bottom: 0;
        }
    }
</style>