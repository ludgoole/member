<template>
    <div class="wrapper">
        <top :address="false" goShop />
        <mall-search :datas="search" />
        <!-- 导航 -->
        <nav class="mall-nav">
            <div class="layouts">
                <a href="/pro/productList" class="link">首页</a>
                <a href="/mall/hotGroupBuy" class="link">热门团购</a>
                <a href="/mall/fixPriceProduct" class="link">定价好货</a>
                <a href="/mall/ypAuction" class="link">优品竞拍</a>
                <a href="/mall/newPresell" class="link on">新品预售</a>
                <a href="/mall/stock" class="link">抢现货</a>
                <a href="/mall/ascend" class="link">可追溯商品</a>
                <a href="javascript:;" class="link">特卖商品</a>
                <a href="javascript:;" class="link">超实惠</a>
                <ul class="min-nav">
                    <li class="item" v-for="(item,index) in minNav" :key="index">
                        <!-- <i :class="item.icon"></i> -->
                        {{item.name}}
                        <!-- <i class="icon-arrow-right"></i> -->
                        <div class="sub">
                            <Row>
                                <Col span="18">
                                    <Row v-for="(sub,index) in item.sub" :key="index" class="mt10 mb10 pr10">
                                        <Col span="3">
                                            <a href="/mall/newPresell" class="sub-class">{{sub.text}} <i class="icon-arrow-right"></i></a>
                                        </Col>
                                        <Col span="21" class="pb5 mb5 tl" style="border-bottom: 1px dotted #ddd;">
                                            <a v-for="link in sub.sublink" href="/mall/newPresell" class="sub-link">{{link.text}}</a>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span="6">
                                    <Col span="12" v-for="(logo,index) in item.shopLogo" :key="index">
                                        <a :href="logo.url" class="shop-logo"><img :src="logo.src"></a>
                                    </Col>
                                </Col>
                            </Row>
                        </div>

                    </li>
                </ul>
            </div>
        </nav>
        <!-- banner -->
        <div class="hot-group-banner">
            <Carousel
                class="auction-bannner"
                v-model="carousel.value"
                :autoplay="carousel.autoplay"
                :arrow="carousel.arrow">
                <Carousel-item v-for="(item,index) in carousel.list" :key="index">
                    <img :src="item.src">
                </Carousel-item>
            </Carousel>
        </div>
        <section class="layouts">
            <!-- 拍品 -->
            <div class="goods-list group-buy-list">
                <div class="hd mb20">
                    <div class="fliter pd10">
                        <Row>
                            <Col span="8">
                                <template v-for="(item,index) in filterBtn">
                                    <Button :type="item.type" size="small" class="mr5" @click="handleSort(item,index)">
                                        {{item.text}}
                                        <template v-if="item.icon">
                                            <i :class="item.icon"></i>
                                        </template>
                                    </Button>
                                </template>
                            </Col>
                            <Col span="16" class="tr">
                                共 <span class="t-green"> 99999 </span>件商品  
                                <span class="ml10 mr10">{{page.current}}/100</span>
                                <Button-group>
                                    <Button type="ghost" size="small" @click="handleBack">
                                        <Icon type="chevron-left"></Icon>
                                        前进
                                    </Button>
                                    <Button type="ghost" size="small" @click="handleForward">
                                        后退
                                        <Icon type="chevron-right"></Icon>
                                    </Button>
                                </Button-group>
                            </Col>
                        </Row>
                    </div>
                </div>
                <Row>
                    <Col span="6" v-for="(item,index) in presellList" :key="index" class="mb20">
                        <a href="/mall/newPresellDetail" class="goods ma-goods">
                            <div class="hd">
                                距离结束：
                                <clocker :time="item.last_time" slot="value">
                                    <span class="item">%D</span>天
                                    <span class="item">%H</span>小时
                                    <span class="item">%M</span>分
                                    <span class="item">%S</span>秒
                                </clocker>
                            </div>
                            <div class="bd ma-bd">
                                <img :src="item.image">
                            </div>
                            <Row class="ma-info pd10 info">
                                <Col span="24">
                                    <p class="h4 t-orange">￥{{item.price}}</p>
                                </Col>
                                <Col span="24" class="ell h6 mt10">
                                    {{item.name}}
                                </Col>
                                <Row>
                                    <Col span="24" class="ma-font t-grey">{{item.gateway}}</Col>
                                </Row>
                                <Row>
                                    <Col span="24" class="ma-font t-grey">{{item.addr}}</Col>
                                </Row>
                            </Row>
                            <div class="fd">
                                <Row>
                                    <Col span="16" style="padding:5px 10px;">
                                        <p class="h6 t-grey">
                                            预计发货 <span class="t-orange">{{item.date}}</span>
                                        </p>
                                        <p class="t-orange">{{item.pople}}人已预约</p>
                                    </Col>
                                    <Col span="8">
                                        <Button type="primary" long>立即预约</Button>
                                    </Col>
                                </Row>
                            </div>
                        </a>
                    </Col>
                </Row>
            </div>
            <div class="tc">
                <Page :total="page.total" :current="page.current" :page-size="page.size" @on-change="getNewPresellProduct" show-elevator></Page>
            </div>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
        </section>
    </div>
</template>
<script>
import top from '../../top'
import clocker from '~components/clocker'
import contentBlock from '~components/contentBlock'
import mallSearch from '~components/mallSearch'
import paper from '~components/paper'
import api from '~api'
export default {
    components:{
        top,
        clocker,
        contentBlock,
        mallSearch,
        paper
    },
    data () {
        return {
            search:{
                value:'',
                loading:false,
                defOpt:[],
                hotTag:[{
                    text:'苹果',
                    url:'javascript:;'
                },{
                    text:'香蕉',
                    url:'javascript:;'
                },{
                    text:'梨子',
                    url:'javascript:;'
                },{
                    text:'西瓜',
                    url:'javascript:;'
                },{
                    text:'葡萄',
                    url:'javascript:;'
                },{
                    text:'哈密瓜',
                    url:'javascript:;'
                }],
                filterOpt:[
                    {label:'蔬菜', value:10},
                    {label:'苹果', value:20},
                    {label:'香蕉', value:30},
                    {label:'梨子', value:40},
                    {label:'西瓜', value:50}
                ]
            },
            minNav: this.$minNav.data,
            carousel:{
                value: 0,
                autoplay: true,
                arrow:'never',
                list:[
                    {
                        src:'../static/datas/img/banner.jpg',
                        url:'javascript:;'
                    },{
                        src:'../static/datas/img/banner.jpg',
                        url:'javascript:;'
                    }
                ]
            },
            presellList:[],
            filterBtn:[
                {
                    type:'primary',
                    text:'默认',
                    icon:''
                },{
                    type:'ghost',
                    text:'距离开始',
                    icon:'icon-desc-default'
                },{
                    type:'ghost',
                    text:'距离发货',
                    icon:'icon-desc-default'
                }
            ],
            page:{
                total:50,
                current:1,
                size: 10
            },
            pagedata: 0
        }
    },
    created(){
        this.getNewPresellProduct(1)
    },
    methods: {
        // 排序处理
        handleSort(item,index){
            // this.filterBtn.forEach(item => item.type='ghost')
            // item.type = 'primary'
            // if(index === 1){
            //     this.presellList = this.presellList.sort((a, b) => a.price < b.price ? -1 : 1)
            // }else if(index === 2){
            //     this.presellList = this.presellList.sort((a, b) => a.pople < b.pople ? 1 : -1)
            // }
        },
        // 后退
        handleForward(){
            if(this.page.current >= this.pagedata){
                return false
            }
            this.page.current++
            this.getNewPresellProduct(this.page.current)
        },
        // 前进
        handleBack(){
            if(this.page.current > 1){
                this.page.current--
                this.getNewPresellProduct(this.page.current)
            } 
        },
        getNewPresellProduct(cpage) {
            this.page.current=cpage
            api.get('/member/shop/getFullProduct/3?page='+cpage+'&pageSize='+this.page.size)
                .then(response => {
                    this.presellList = response.data.list
                    this.page.total = response.data.page.totalCount
                    this.page.current = response.data.page.pageNo
                    this.page.size = response.data.page.pageSize
                    this.page.current = cpage
                    this.pagedata = Math.ceil(this.page.total/this.page.size)
                    console.log(this.presellList)
                })
        }
    }
}
</script>
<style lang="scss">
.ma-goods{border: 1px solid #e3e3e3;}
.ma-bd{border: 0;}
.ma-info{border: 0;}
</style>
