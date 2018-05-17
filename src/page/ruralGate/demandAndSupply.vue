<template>
  <div class="wrapper">
      <img src="../../img/com-banner1.jpg" height="400" width="100%" alt="">
        <div class="layouts">          
             <item-tab
                :title="{}"
                :tab="['我要买', '在收购', '我要订','我要帮']"
                :breadcrumb="[{url:`index?uid=${$route.query.uid}`,title:'首页'},{title:'供需平台'}]"
                @on-click="handleProTab"
            ></item-tab>
            
        </div>
        <divider style="margin:0" class="pb50" solid />
        <div class="layouts">
            <product-round :data="supplyData" :detail="detail" :page="page"/>
        </div>
       
  </div>
</template>
<script>
import { navStatus } from '~page/companyGate/mixins/commonMixins'
import itemTab from './components/item-tab'
import productRound from './components/product-round'
import divider from '~components/divider'
    export default{
        mixins: [navStatus],
        components:{
            itemTab,
            productRound,
            divider
        },
        data(){
            return{
                index: 3,
                detail:true,
                carousel:{
                    value: 0,
                    autoplay: true,
                    arrow:'never',
                    list: []
                },
                supplyData:[
                    {
                        src:"/static/datas/img/kaocha01.png",
                        title:"草莓采摘",
                        name:"小红帽草莓园",
                        addr:"武汉市江夏区",
                        time:"2018年1月18日13:42:08",
                        info:"定点服务：100元/小时"
                    },
                    {
                        src:"/static/datas/img/kaocha01.png",
                        title:"草莓采摘",
                        name:"小红帽草莓园",
                        addr:"武汉市江夏区",
                        time:"2018年1月18日13:42:08",
                        info:"定点服务：100元/小时"
                    },
                    {
                       src:"/static/datas/img/kaocha01.png",
                        title:"草莓采摘",
                        name:"小红帽草莓园",
                        addr:"武汉市江夏区",
                        time:"2018年1月18日13:42:08",
                        info:"定点服务：100元/小时"
                    },
                    {
                        src:"/static/datas/img/kaocha01.png",
                        title:"草莓采摘",
                        name:"小红帽草莓园",
                        addr:"武汉市江夏区",
                        time:"2018年1月18日13:42:08",
                        info:"定点服务：100元/小时"
                    },
                    {
                       src:"/static/datas/img/kaocha01.png",
                        title:"草莓采摘",
                        name:"小红帽草莓园",
                        addr:"武汉市江夏区",
                        time:"2018年1月18日13:42:08",
                        info:"定点服务：100元/小时"
                    },
                ],
                page:{
                    show: true,
                    current: 1,
                    total: 5
                }
            }
        },
        methods:{
            handleProTab(name){
                if(name == '我要帮'){
                    this.detail = false
                }else{
                    this.detail = true
                }
//                console.log(name)
            }
        }
    }

</script>
<style>


</style>

