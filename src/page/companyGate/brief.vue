<template>
    <div class="ma-compan-brief">
        <img src="../../img/com-banner2.jpg" height="400" width="100%" alt="">
        <div class="layouts">
             <div class="tc mb50">
                <h5 class="mt30">企业介绍</h5>
                <p class="t-grey mt10">About us</p>
            </div>
            <div v-html="brief.introduce" class="pl20 pr20 pb50" style="text-indent: 2em;"></div>
            <div class="ma-polic-img" v-if="brief.introduce === undefined">
                <img src="../../img/no-content.png"> 
                <p style="margin-top: 10px;">暂无数据</p>
            </div>
        </div>       
    </div>
</template>
<script>
import { navStatus } from './mixins/commonMixins'
export default {
    mixins: [navStatus],
    data () {
        return {
            loginAccount:'',
            index: 2,
            brief: {}
        }
    },
    created () {
        this.loginAccount = this.$route.query.uid
        this.init({
            loginAccount: this.loginAccount
        })
    },
    methods: {
        init (data) {
            this.$api.post('/portal/introduction/getInfo', data).then(response => {
                if (response.code === 200) {
                    if(response.data !== undefined){
                        this.brief = response.data
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
    .brief-content {
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 20px;
    }
    .ma-compan-brief .ma-polic-img{text-align: center;margin-top: 0;} 
</style>