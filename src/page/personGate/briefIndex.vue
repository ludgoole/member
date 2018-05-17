<template>
    <div class="pb50">
        <div class="briefInex">
            <div class="brief-content" v-if="introduce.privateInformation">隐私信息：{{introduce.privateInformation}}</div>
            <div class="brief-content" v-if="introduce.networkInformation">网络信息：{{introduce.networkInformation}}</div>
            <div class="brief-content" v-if="introduce.education">教育经历：{{introduce.education}}</div>
            <div class="brief-content" v-if="introduce.work">工作经历：{{introduce.work}}</div>
            <div class="brief-content" v-if="introduce.policy">政治面貌：{{introduce.policy}}</div>
            <div class="brief-content" v-if="introduce.religion">宗教信仰：{{introduce.religion}}</div>
            <div class="ma-polic-img"  
            v-if="!introduce.privateInformation && !introduce.networkInformation && !introduce.education && !introduce.work && !introduce.policy && !introduce.religion">
                <img src="../../img/ma-img-002.png"> 
                <p style="margin-top: 10px;">暂无数据</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
           introduce: {
            privateInformation: "",
            networkInformation: "",
            education: "",
            work: "",
            policy: "",
            religion: ""
        },
           loginAccount:''
        }
    },
    created(){
        this.loginAccount = this.$route.query.uid
        this.getData({account:this.loginAccount})
    },
    methods: {
        // 获取数据
        getData(data){
             this.$api.post("/member/perfectInfo/findGateway", data)
                .then(response => {
                    console.log(response);
                    if (response.code === 200 && response.data) {
                        this.introduce = response.data;
                    }
                })
                .catch(error => {
                    this.$Message.error("操作异常！");
                });
        }

    }
}
</script>
<style lang="scss">
.briefInex{margin: 60px 0;line-height: 30px;}
.brief-content {
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
}
.ma-polic-img{margin-top: 0;}
</style>
