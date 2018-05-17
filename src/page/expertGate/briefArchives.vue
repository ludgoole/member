<template>
    <div class="pb50">
        <div class="briefArc">
            <Row type="flex" align="middle">
                <Col span="10" offset="2" v-if="data.userName.status">
                    <p><span class="label tr">真实姓名：</span>{{data.userName.model}}</p>
                </Col>
                <Col span="10" offset="2" v-if="data.sex.status">
                    <p><span class="label tr">性别：</span>{{data.sex.model}}</p>
                </Col>
                <Col span="10" offset="2" v-if="data.professionalTitle.status">
                    <p><span class="label tr">职称：</span>{{data.professionalTitle.model}}</p>
                </Col>
                <Col span="10" offset="2" v-if="data.species.status">
                    <p><span class="label tr">擅长物种：</span>{{data.species.model}}</p>
                </Col>
                <Col span="10" offset="2" v-if="work.WorkUnit.model">
                    <p><span class="label tr">工作单位：</span>{{work.WorkUnit.model}}</p>
                </Col>
            </Row>
            <!-- <Row type="flex" align="middle" style="margin-top:20px;">
                <Col span="22" offset="2">
                    <p>个人介绍：</p>
                </Col>
            </Row>
            <Row type="flex" align="middle">
                <Col span="22" offset="2">
                    <div v-html="brieData.introduce"></div>
                </Col>
            </Row> -->
        </div>
    </div>
</template>
<script>
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
            work:{
                WorkUnit:{model:'',name:'工作单位',status:true},
                job:{model:'',name:'工作职位',status:true},
                workTime:{model:['',''],name:'工作时间',status:true},
                detail: {model:'',name:'工作详情',status:true}
                },
            loginAccount: ''
        }
    },
    created(){
        this.loginAccount = this.$route.query.uid
        this.getData()
        this.getWork()
    },
    methods: {
        getWork(){
            this.$api.post('/member/perfectInfo/findWorkTime',{account: this.loginAccount}).then(response=>{
                if(response.code == 200){
                    if( Object.keys(response.data).length){                        
                        this.work = response.data
                    }
                }
            })
        },
        // 获取数据
        getData(){ //查询类型
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
                        this.data = datas  
                    }
                }
            })
        }
    }
}
</script>
<style lang="scss">
.briefArc{margin: 60px 0;line-height: 30px;}
.briefArc{
    .label{
        display: inline-block;
        width:80px;
    }
}
</style>
