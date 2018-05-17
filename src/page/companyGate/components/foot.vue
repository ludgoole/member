<template>
    <!-- <div>
        <div class="com-foot-img">
            <div class="foot-width tc t-white">
                <p>{{data.summary}}</p>
            </div>
        </div>
        <div class="com-foot">
            <div class="layouts">
                <Row type="flex" align="middle" class="pb10">
                    <Col span="9" offset="3">
                        <h4>联系我们</h4>
                        <p class="mt20 mb10"><Icon type="android-call"></Icon> 400-6874-109</p>
                        <p class="mb10"><Icon type="android-drafts"></Icon> service@51bsi.com</p>
                        <p class="mb10"><Icon type="android-textsms"></Icon> 857066800</p>
                    </Col>
                </Row>
            </div>
            <div style="background:#363D48;" class="pd10">
                <div class="layouts">
                    <Row>
                        <Col span="12">武汉光谷信息技术股份有限公司·版权所有 鄂ICP备14010088号</Col>
                        <Col span="12">地址：湖北省武汉市东湖开发区高新大道888号高农生物园总部A区19#楼</Col>
                    </Row>
                </div>
            </div>
        </div>
    </div> -->
    <div>
        <div class="footer">
            <div class="container">
                <div class="footer-l">
                    <ul>
                        <li>关于NSS1</li>
                        <li>公益性质</li>
                        <li>服务项目</li>
                        <li>以往案例</li>
                        <li>新闻动态</li>
                        <li>联系我们</li>
                    </ul>
                    <br/>
                    <br/>
                    <div >
                        <span class="footer_content">Copyright©2017 湖北省农业科学院版权所有</span>
                        <br/>
                        <span class="footer_content">备案号：鄂ICP备12005763号-1</span>
                    </div>                </div>
                <div class="footer-r" >
                    <ul>
                        <li>微博</li>
                        <li>微信</li>
                        <li>技术支持：武汉光谷信息技术股份有限公司</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        data: Object,
        default() {
            return {
                summary: ''
            }
        }

    },
    components:{
    },
    data () {
        return {
        }
    },
    created(){
    }
}
</script>
<style lang="scss">
.com-foot{
    color: #fff;
    padding: 30px 0 0;
    background: #3C4450;
}
.footer_content{
    height:26px;
    line-height:26px;
}
    .com-foot-img{
        background: url("../../../img/company-footer.jpg") no-repeat;
        height: 150px;
        p {
            font-size: 24px;
            line-height: 150px;
        }
        .foot-width {
            width: 1140px;
            margin: 0 auto;
        }

    }

</style>
