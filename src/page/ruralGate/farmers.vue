<template>
  <div class="wrapper">
     <img src="../../img/com-banner5.jpg" height="400" width="100%" alt="">
        <div class="layouts">
             <item-tab
                :title="{}"
                :tab="['养鸡', '养鸭', '养猪']"
                :breadcrumb="[{url:'index',title:'首页'},{url:'farmers',title:'种养户'}]"
                @on-click="handleProTab"
            ></item-tab>
        </div>
        <divider style="margin:0;" class="pb50" solid />
        <div  class="layouts">
            <product :data="data" simple :page="page"></product>
        </div>
       
  </div>
</template>
<script>
import { navStatus } from '~page/companyGate/mixins/commonMixins'
import itemTab from './components/item-tab'
import product from './components/product'
import divider from '~components/divider'
    export default{
        mixins: [navStatus],
        components:{
            itemTab,
            product,
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
                data:[
                    {
                        src:"http://192.168.7.61/00/05/wKgHPVnDTjSACrTyAABWClxMxr8624.jpg",
                        title:"新鲜铁棍山药",
                        scopen:'种植'
                    },
                    {
                        src:"/static/datas/img/goods-corn.png",
                        title:"玉米",
                        scopen:'种植'
                    },
                    {
                        src:"/static/datas/img/goods-corn.png",
                        title:"玉米",
                        scopen:'种植'
                    },
                    {
                        src:"/static/datas/img/goods-corn.png",
                        title:"玉米",
                        scopen:'种植'
                    },
                    {
                        src:"http://192.168.7.61/00/05/wKgHPVnDTjSACrTyAABWClxMxr8624.jpg",
                        title:"新鲜铁棍山药",
                        scopen:'种植'
                    },
                ]
            }
        },
        methods:{
            handleProTab(){

            }
        }
    }

</script>
<style>


</style>

