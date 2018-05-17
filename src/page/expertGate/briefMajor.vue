<template>
    <div class="pb50">
        <div class="briefCon">
            <Row type="flex" align="middle">
                <Col span="10" offset="2">
                    <p>专家分类：{{brieData.expertType}}</p>
                </Col>
                <Col span="10">
                    <p>相关行业：{{brieData.relatedIndustries}}</p>
                </Col>
            </Row>
            <Row type="flex" align="middle">
                <Col span="10" offset="2">
                    <p class="ma-exper-major">擅长领域：{{brieData.excelField}}</p>
                </Col>
                <Col span="10">
                    <p>擅长物种：{{brieData.excelSpecies}}</p>
                </Col>
            </Row>
            <Row type="flex" align="middle">
                <Col span="10" offset="2">
                    <p>相关物种：{{brieData.relatedSpecies}}</p>
                </Col>
                <Col span="10">
                    <p>相关服务：{{brieData.relatedServices}}</p>
                </Col>
            </Row>
            <Row type="flex" align="middle">
                <Col span="10" offset="2">
                <p>相关商品：{{brieData.relatedGoods}}</p>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            brieData:{
                expertType:'',
                excelField:'',
                excelSpecies:'',
                relatedSpecies:'',
                relatedIndustries:'',
                relatedGoods:'',
                relatedServices:'',
                personalPicture:[],
                qualificationsPicture:[],
                honorPicture:[]
            },
            loginAccount: ''
        }
    },
    created(){
        this.loginAccount = this.$route.query.uid
        this.getData()
    },
    methods: {
        // 获取数据
         // 获取数据
        getData(){ //查询类型 1 个人 2 专家 3 企业 4 商城企业 5 机关 6 乡村
            this.$api.post('/member/perfectInfo/findPerfectInfo', { account: this.loginAccount }).then(response=>{
                if(response.code == 200){
                    var data = response.data
                    //隐私信息
                    if (data.professionalInformation && Object.keys(data.professionalInformation).length) {
                        // 如果有数据说明之前已经保存过，不管是保存的是否是空数据，都已经有数据格式了
                        var datas = data.professionalInformation   
                        console.log(datas)                   
                        this.brieData = datas 
                    }
                }
            })
        }
    },
    mounted() {
    }
}
</script>
<style lang="scss">
.briefCon{margin: 60px 0;line-height: 30px;}
.briefCon img{width: 100%;}
.ma-exper-major{
    padding-right: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
