<template>
  <div class="wrapper" style="background: rgb(248, 248, 248);">
     <img src="../../img/com-banner5.jpg" height="400" width="100%" alt="">

            <!--<divider style="margin:0;" class="pb50" solid />-->
            <div class="layouts">
                <expert
                :title="{cn: '专家团队', en: 'Team'}"
                @on-page-change="nextPage"
                :data="teamData"
                :detail="false"
                :page="page"></expert>
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
                index: 9,
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
                loginAccount:''
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
//                    console.log('expert',res)
                    this.teamData = res.data
//                    console.log('专家',this.teamData)
                    this.teamData.map(function(item){
                        item.name = item.expertName
                        item.job = item.expertType
                        item.detail = item.adeptField
                        item.src = item.personalPicture
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

