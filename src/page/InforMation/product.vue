<template>
    <div class="container pb20" style="width: 1172px;margin-top: 40px">
        <div class="tc pb100 pt50">
            <img src="../../img/developing.png" alt="">
            <p>开发中,敬请期待···！</p>
        </div>
        <!--<div class="tuangou-title">-->
            <!--<div>-->
                <!--<Row :gutter="16">-->
                    <!--<Col span="6" class="shangping">-->
                    <!--<div>-->
                        <!--<div style="padding: 10px 0 0 10px">-->
                            <!--<span class="jiage">158</span><span class="huajiage">248</span>-->
                        <!--</div>-->
                        <!--<div class="img-dong">-->

                            <!--<img src="../../img/shangping01.png" alt="" class="dongx">-->
                        <!--</div>-->
                        <!--<p class="shangpingming">天然花草</p>-->
                        <!--<div style="width: 201px;margin: auto;margin-top: 10px">-->
                            <!--<img src="../../img/daojishi.png" alt="" >-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--</Col>-->
                    <!--<Col span="6" class="shangping">-->
                    <!--<div>-->
                        <!--<div style="padding: 10px 0 0 10px">-->
                            <!--<span class="jiage">158</span><span class="huajiage">248</span>-->
                        <!--</div>-->
                        <!--<div class="img-dong">-->
                            <!--<img src="../../img/shangping01.png" alt="" class="dongx">-->
                        <!--</div>-->
                        <!--<p class="shangpingming">天然花草</p>-->
                        <!--<div style="width: 201px;margin: auto;margin-top: 10px">-->
                            <!--<img src="../../img/daojishi.png" alt="" >-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--</Col>-->
                    <!--<Col span="6" class="shangping">-->
                    <!--<div>-->
                        <!--<div style="padding: 10px 0 0 10px">-->
                            <!--<span class="jiage">158</span><span class="huajiage">248</span>-->
                        <!--</div>-->
                        <!--<div class="img-dong">-->
                            <!--<img src="../../img/shangping01.png" alt="" class="dongx">-->
                        <!--</div>-->
                        <!--<p class="shangpingming">天然花草</p>-->
                        <!--<div style="width: 201px;margin: auto;margin-top: 10px">-->
                            <!--<img src="../../img/daojishi.png" alt="" >-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--</Col>-->
                    <!--<Col span="6" class="shangping2">-->
                    <!--<div>-->
                        <!--<div style="padding: 10px 0 0 10px">-->
                            <!--<span class="jiage">158</span><span class="huajiage">248</span>-->
                        <!--</div>-->
                        <!--<div class="img-dong">-->
                            <!--<img src="../../img/shangping01.png" alt="" class="dongx">-->
                        <!--</div>-->
                        <!--<p class="shangpingming">天然花草</p>-->
                        <!--<div style="width: 201px;margin: auto;margin-top: 10px">-->
                            <!--<img src="../../img/daojishi.png" alt="" >-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--</Col>-->
                <!--</Row>-->
                <!--<Button type="ghost" class="new-more" @click="productes()" style="margin-top:20px;">更多</Button>-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>
<script>
    export default {
        data(){
            return {
                currentPage:1,
                pageSize:6,
                product:[],
                total: 0
            }
        },
       
        methods:{
            productes(){
                this.$router.push({
                    path: '/pro/productList',query:{flag: 4}
                })
            }
        }
    }
</script>
<style scoped>
    .layout {
        background: #fff;
    }
    /* header样式开始*/

    header {
        height: 81px;
        background: #FFFFFF;
        border-bottom: 1px solid #e7e7e7;
    }

    /*本页出了头和底部样式开始*/
    .tabs-nav{
        width: 100%;
        height: 62px;
        border-bottom: 2px solid #51ad79;
    }
    .tabs-nav ul {
        width: 850px;
        margin: 0 auto;
    }
    .tabs-nav ul li {

    }
    .tabs-nav ul li a{
        float: left;
        margin-right: 60px;
        font-size: 16px;
        color: #333;
        line-height: 62px;
        display: block;
        padding: 0 10px;
    }
    .tabs-nav ul li .nav-end{
        float:right;
        margin-right: 0;

    }
    .tabs-nav ul li a:hover{
        background: #51ad79;
        color: #fff;
    }
    .tabs-nav ul li .diss{
        background: #51ad79;
        color: #fff;
    }
    .banner1{
        background: url("../../img/cp-banner.png") no-repeat center top;
        height: 440px;
        background-size: cover;
    }
    .banner2{
        background: url("../../img/cp-banner.png") no-repeat center top;
        height: 440px;
        background-size: cover;
    }
    .banner3{
        background: url("../../img/cp-banner.png") no-repeat center top;
        height: 440px;
        background-size: cover;
    }
    .dianshang{
        width: 200px;
        height: 440px;
        position: absolute;
        background: rgba(255,255,255,0.88);
        z-index: 999;
        margin: auto
    }
    .dianshang{
        padding-top: 26px;
        text-align: center;
        font-size: 14px;
        line-height: 44px;
    }
    .dianshang li:hover{
        color: #51ad79;
        cursor:pointer;
    }
    .shangping{
        border: 1px solid #ededed;
        height: 360px;
        width: 278px;
        margin-right:24px;
    }
    .shangping2{
        border: 1px solid #ededed;
        height: 360px;
        width: 280px;
        margin-right:-24px;
    }
    .shangping:hover{
        border: 1px solid #51ad79;
    }
    .shangping2:hover{
        border: 1px solid #51ad79;
    }
    img{
        transition: all 0.45s ease-in;
    }
    .img-dong{
        margin-top: 20px;
    }
    .jiage{
        font-size: 24px;
        color: #333;
        padding-right: 6px;
    }
    .huajiage{
        font-size: 16px;
        text-decoration: line-through;
        color: #999999;
    }
    .shangpingming{
        font-size: 18px;
        text-align: center;
    }
    .down-l-img01{
        background: url("../../img/xiaheitu.png") no-repeat;
        height: 155px;
        width: 310px;
        float: left;
    }
    .down-l-img02{
        background: url("../../img/xiaheitu.png") no-repeat;
        height: 155px;
        width: 310px;
        float: right;
    }
    .down-l-img03{
        border: 1px solid #ededed;
        width: 97px;
        font-size: 14px;
        text-align: center;
        margin-top: 10px;
    }
    .down-l-img03:hover{
        border: 1px solid #51ad79;
    }
    .down-l-img03 p{
        padding-bottom: 4px;
    }
    .down-r{
        width: 230px;
        height: 290px;
        background: url("../../img/down-r-img1.png") no-repeat;
        border: 1px solid  #ededed;
    }
    .down-r-img{
        height: 145px;
        border: 1px solid rgba(237, 237, 237, 0.51);
    }
    .down-r-img:hover{
        border: 1px solid #51ad79;

    }
    .down-text{
        background: rgba(81,173,121,.9);
        padding: 18px 0 10px 20px;
        width: 100%;
        position: absolute;
        bottom: 0;
    }
    .down-text p{
        font-size: 18px;
        color: #fff;
    }
    .down-text span{
        font-size: 22px;
        color: #fff;
    }
</style>