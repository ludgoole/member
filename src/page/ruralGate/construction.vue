<template>
  <div class="wrapper" style="background: rgb(248, 248, 248);">
       <img src="../../img/com-banner9.jpg" height="400" width="100%" alt="">
        <div class="layouts tc">
             <!--<item-tab-->
                <!--:title="{}"-->
                <!--:tab="[]"-->
                <!--:breadcrumb="[{url:`index?uid=${$route.query.uid}`,title:'首页'},{url:`beautifulCountry?uid=${$route.query.uid}`,title:'乡村介绍'},{title:'基层党建'}]"-->
            <!--&gt;</item-tab>-->
            <h5 class="mt30">基层党建</h5>
            <p class="mt10">Party Construction</p>
        </div>
        <!--<divider style="margin:0;" class="pb50" solid />-->
        <div  class="layouts">
           <expert :data="teamData" :detail="true" :page="page"></expert>  
        </div>
       
  </div>
</template>
<script>
import { navStatus } from '~page/companyGate/mixins/commonMixins'
import itemTab from './components/item-tab'
import divider from '~components/divider'
import expert from './components/expert'
    export default{
        mixins: [navStatus],
        components:{
            itemTab,
            divider,
            expert
        },
        data(){
            return{
                index:2,
                carousel:{
                    value: 0,
                    autoplay: true,
                    arrow:'never',
                    list: []
                },
                  teamData:[
                    {
                        src:"/static/datas/img/kaocha01.png",
                        name:"植物专家",
                        job:'种植',
                        url:'',
                        phone:'02-5559889',
                        detail:'袁隆平热爱祖国、一心为民、造福人类的崇高品德，与中国共产党肝胆相照、同心同德的思想风范，与时俱进、勇攀高峰的创新精神，不畏艰险、执着追求的坚强意志，严以律己、淡泊名利的高尚情操，是当代中国人学习的楷模，更是新世纪呼唤的时代精神'
                    },
                ],
                page:{
                    show: true,
                    current: 1,
                    total: 5,
                    pageSize:8
                }
            }
        }
    }

</script>
<style lang="scss">
</style>

