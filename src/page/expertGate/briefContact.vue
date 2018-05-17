<template>
    <div class="pb50">
        <div class="briefCon">
            <Row type="flex" align="middle">
                <Col span="10" offset="2" v-if="data.phone.status">
                    <p><span class="label tr">手机号：</span>{{data.phone.model}}</p>
                </Col>
                <Col span="10" offset="2" v-if="data.tel.status">
                    <p><span  class="label tr">座机号：</span>{{data.tel.model}}</p>
                </Col>
                 <Col span="10" offset="2" v-if="nextWorkData.status">
                    <p><span class="label tr">邮箱：</span>{{nextWorkData.Email.model}}</p>
                </Col>
                <Col span="10" offset="2" v-if="data.postalCode.status">
                    <p><span class="label tr">邮编：</span>{{data.postalCode.model}}</p>
                </Col>
                <Col span="10" offset="2" v-if="data.addr.status">
                    <p><span class="label tr">通讯地址：</span>{{data.addr.model}}</p>
                </Col>
                <Col span="10" offset="2" v-if="nextWorkData.status">
                    <p><span class="label tr">QQ：</span>{{nextWorkData.QQ.model}}</p>
                </Col>
            </Row>
            
            <Row type="flex" align="middle" style="margin-top:20px;" v-if="data.coordinatePoint.status && data.coordinatePoint.model">
                <Col span="22" offset="2">
                    <p><span class="label tr">我在这儿：</span></p>
                </Col>
            </Row>
            <Row type="flex" align="middle">
                <Col span="20" offset="2" v-if="data.coordinatePoint.model.lat && data.coordinatePoint.status">
                    <!--<a target="_blank" :href="`http://map.baidu.com/?newmap=1&ie=utf-8&s=s%26wd%3D${location}`">-->
                    <a target="_blank" :href="`http://api.map.baidu.com/marker?location=${data.coordinatePoint.model.lat},${data.coordinatePoint.model.lng}&title=我的位置&content=${location}&output=html`">
                        <img :src="`//api.map.baidu.com/staticimage?height=200&center=${data.coordinatePoint.model.lng},${data.coordinatePoint.model.lat}&zoom=15&scale=2&markers=${data.coordinatePoint.model.lng},${data.coordinatePoint.model.lat}`" alt="" width="100%">
                    </a>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>
import api from '~api'
import $ from 'jquery'
function showLocation(d) {
    console.log(d)
}
export default {
    data () {
        return {
             data:{
                    avatar:'',
                    userName:{model:'',name:'姓名',status:false},
                    sex:{model:'',name:'性别',status:false},
                    ethnicGroup:{model:'',name:'民族',status:false},
                    birthday:{model:'',name:'生日',status:false},
                    profession:{model:'',name:'职业',status:false},
                    professionalTitle:{model:'',name:'职称',status:false},
                    species:{model:'',name:'擅长物种',status:false},
                    phone:{model:'',name:'手机号码',status:false},
                    addr:{model:'',name:'常住地',status:false},
                    coordinatePoint:{model:'',name:'坐标位置',status:false},
                    postalCode:{model:'',name:'邮政编码',status:false},
                    tel:{model:'',name:'座机号码',status:false},
                },
            nextWorkData:{
                    ID:{model:'',name:'农事无忧ID'},
                    QQ:{model:'',name:'QQ号码'},
                    Email:{model:'',name:'邮箱'},
                    domainName:{model:'',name:'申请域名'},
                    status:false
                },
            location: '',
            loginAccount: ''
        }
    },
    created(){
        this.loginAccount = this.$route.query.uid
        this.getData()
    },
    methods: {
        getData(){ //查询类型 1 个人 2 专家 3 企业 4 商城企业 5 机关 6 乡村
            this.$api.post('/member/perfectInfo/findPerfectInfo', { account: this.loginAccount }).then(response=>{
                if(response.code == 200){
                    var data = response.data
                    //隐私信息
                    if (
                        data.privateInformation &&
                        Object.keys(data.privateInformation).length
                    ) {
                        // 如果有数据说明之前已经保存过，不管是保存的是否是空数据，都已经有数据格式了
                        var datas = data.privateInformation
                        if(datas.coordinatePoint.model){
                            var center = {}
                            center.lng = datas.coordinatePoint.model.split(',')[0]
                            center.lat = datas.coordinatePoint.model.split(',')[1]
                            datas.coordinatePoint.model = center
                        }                        
                        this.data = datas                        
                        var v = this
                        // 转换经纬度
                        if(data.privateInformation.coordinatePoint.model){
                            $.ajax({
                                async : 'false',
                                url : 'http://api.map.baidu.com/geocoder/v2/',
                                type : 'GET',
                                dataType : 'jsonp',
                                jsonpCallback : 'showLocation',
                                timeout : '5000',
                                contentType : 'application/json;utf-8',
                                data : {
                                    location: v.data.coordinatePoint.model[1] + ',' + v.data.coordinatePoint.model[2],
                                    output:'json',
                                    ak:'7syPirZ2AWxacMfHeAfuujdDgFmxCB5g',
                                    callback:'showLocation'
                                },
                                success : function(data) {
                                    console.log('data',data)
                                    v.location = data.result.formatted_address
                                }
                            });
                        }
                    }
                     //网络信息
                    if (
                        data.networkInformation &&
                        Object.keys(data.networkInformation).length
                    ) {
                        // 如果有数据说明之前已经保存过，不管是保存的是否是空数据，都已经有数据格式了
                        this.nextWorkData = data.networkInformation
                    }
                }
            })
            // api.post('/portal/contoct/getContoct',{account :this.loginAccount,queryType :3})
            //     .then(res => {
            //         if(res.code === 200){
            //             if(res.data !== undefined){
            //                 var center = {}
            //                 center.lng = res.data.coordinate.split(',')[0]
            //                 center.lat = res.data.coordinate.split(',')[1]
            //                 this.data = res.data
            //                 console.log('联系我们',res.data)
            //                 //status 1公开0隐藏
            //                 this.data.comName = res.data.corpName,
            //                     this.data.name = res.data.legalPerson,
            //                     this.data.moble = res.data.phone,
            //                     this.data.tel = res.data.mobile,
            //                     this.data.qq = res.data.qq,
            //                     this.data.mail = res.data.email,
            //                     this.data.address = res.data.addr,
            //                     this.data.zipCode = res.data.postalCode,
            //                     this.data.center = center
            //                 var v = this
            //                 // 转换经纬度
            //                 if(res.data.coordinate){
            //                     $.ajax({
            //                         async : 'false',
            //                         url : 'http://api.map.baidu.com/geocoder/v2/',
            //                         type : 'GET',
            //                         dataType : 'jsonp',
            //                         jsonpCallback : 'showLocation',
            //                         timeout : '5000',
            //                         contentType : 'application/json;utf-8',
            //                         data : {
            //                             location: res.data.coordinate.split(',')[1] + ',' + res.data.coordinate.split(',')[0],
            //                             output:'json',
            //                             ak:'7syPirZ2AWxacMfHeAfuujdDgFmxCB5g',
            //                             callback:'showLocation'
            //                         },
            //                         success : function(data) {
            //                             v.location = data.result.formatted_address
            //                         }
            //                     });
            //                 }

            //             }
            //         }
            //     }).catch(error => {
            //     this.$Message.error('操作异常！')
            // })
        }
    },
    mounted() {
    }
}
</script>
<style lang="scss">
.briefCon{margin: 60px 0;line-height: 30px;}
.briefCon img{width: 100%;}
.briefCon{
    .label{
        display: inline-block;
        width:80px;
    }
}
</style>
