<template>
  <div class="wrapper">
     <img src="../../img/com-banner11.jpg" height="400" width="100%" alt="">        
        <!-- <div class="layouts">
             <item-tab
                :title="{}"
                :tab="[]"
                :breadcrumb="[{url: `index?uid=${$route.query.uid}`,title:'首页'},{title:'专家团队'}]"
            ></item-tab>
        </div>        
            <divider class="mb50" style="margin-top:0px" solid /> -->
             <div class="tc mb50">
                <h5 class="mt30">专家团队</h5>
                <p class="mt10">Team</p>
            </div>
            <div class="layouts">
                <expert
                @on-page-change="nextPage"
                :data="teamData"
                :page="page" :colorInfo="true"></expert>
            </div> 
  </div>
</template>
<script>
import { navStatus } from '~page/companyGate/mixins/commonMixins'
import itemTab from './components/item-tab'
import expert from './components/expert'
import divider from '~components/divider'
    export default{
        mixins: [navStatus],
        components:{
            itemTab,
            expert,
            divider
        },
        data(){
            return{
                index: 7,
                carousel:{
                    value: 0,
                    autoplay: true,
                    arrow:'never',
                    list: []
                },
                page: {
                    show: true,
                    current: 1,
                    total: 0,
                    pageSize: 8
                },
                 teamData:[],
                loginAccount:'',
            }
        },
    created(){
        this.loginAccount = this.$route.query.uid
        this.getData()
    },
    methods:{
        // 获取数据
        getData(){
            this.$api.post('/portal/expert/listExpert',{
                account: this.loginAccount,
                pageNum: this.page.current,
                pageSize: this.page.pageSize

            })
            .then(res => {
                if(res.code === 200){
                    this.teamData = res.data
                    this.teamData.map(function(item){
                        item.name = item.expertName
                        item.job = item.expertType
                        item.detail = item.adeptField
                        item.src = item.personalPicture
                        item.tel = item.phone
                        item.url = `/expertGate/index?uid=${item.loginAccount}`
                    })
                    this.page.total = res.total
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
<style>


</style>

