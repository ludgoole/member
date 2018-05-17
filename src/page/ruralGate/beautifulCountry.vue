<template>
  <div class="wrapper beautiful-country">
       <img src="../../img/com-banner9.jpg" height="400" width="100%" alt="">
        <div class="layouts tc">
            <h5 class="mt30">美丽乡村</h5>
            <p class="mt10"> Beautiful Country</p>
        </div>
        <!--<divider style="margin:0" solid />-->
        <div  class="layouts pt50">
           <div v-if="text" v-html="text" class="pb50"></div>
            <div v-else class="ma-polic-img" >
                <img src="../../img/no-content.png">
                <p class="pb10 bt10">暂无内容</p>
            </div>   
            <!-- <p>{{text}}</p>                 -->
            <!-- <swiper :options="swiperOption" class="rural-country-list">
                <swiper-slide v-for="item in supplyData">
                    <a :href="item.url" class="item vui-flex"><img :src="item.src" alt=""></a>
                </swiper-slide>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper> -->
        </div>
       
  </div>
</template>
<script>
import { navStatus } from '~page/companyGate/mixins/commonMixins'
import itemTab from './components/item-tab'
import divider from '~components/divider'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default{
        mixins: [navStatus],
        components:{
            itemTab,
            divider,
            swiper,
            swiperSlide,
        },
        data(){
            return{
                index:2,
                loginAccount: '',
                carousel:{
                    value: 0,
                    autoplay: true,
                    arrow:'never',
                    list: []
                },
                text:''
            }
        },
        created(){
            this.loginAccount = this.$route.query.uid
            this.getInit()
        },
        methods:{
            getInit(){
                this.$api.post('/portal/introduction/getInfo',{
                    loginAccount: this.loginAccount,
                })
                .then(res => {
//                    console.log('beautiful',res)
                    if(res.code == 200){
                        this.text = res.data.introduce
                    }
                })
            }
        }
    }

</script>
<style lang="scss">
</style>

