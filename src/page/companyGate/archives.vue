<template>
    <div class="wrapper">
        <img src="../../img/com-banner2.jpg" height="400" width="100%" alt="">
        <div class="layouts">
            <Tabs value="record" class="mt50">
                <TabPane label="交易信息记录" name="record">
                    <Card>
                        <p slot="title">商品评价</p>
                        <Row type="flex" align="middle">
                            <Col span="6" offset="5">
                                好评率
                                <p class="t-orange"><span class="h1">0</span>%</p>
                            </Col>
                            <Col span="6" offset="1">
                                <div>好评 <Progress :percent="0" ></Progress></div>
                                <div>中评 <Progress :percent="0" ></Progress></div>
                                <div>差评 <Progress :percent="0" ></Progress></div>
                            </Col>
                        </Row>
                    </Card>
                    <Tabs type="card" class="mt20">
                        <TabPane label="全部评价(0)">
                            <div class="tc pd20">
                                <Icon type="happy-outline" size="64"></Icon>
                                <p>暂无评论哟~</p>
                            </div>
                        </TabPane>
                        <TabPane label="好评(0)">
                            <div class="tc pd20">
                                <Icon type="happy-outline" size="64"></Icon>
                                <p>暂无评论哟~</p>
                            </div>
                        </TabPane>
                        <TabPane label="中评(0)">
                            <div class="tc pd20">
                                <Icon type="happy-outline" size="64"></Icon>
                                <p>暂无评论哟~</p>
                            </div>
                        </TabPane>
                        <TabPane label="差评(0)">
                            <div class="tc pd20">
                                <Icon type="happy-outline" size="64"></Icon>
                                <p>暂无评论哟~</p>
                            </div>
                        </TabPane>
                    </Tabs>
                </TabPane>
                <TabPane label="线下交易凭证" name="voucher">
                    <div class="tc pd20">
                        <Icon type="happy-outline" size="64"></Icon>
                        <p>暂无评论哟~</p>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>
<script>
import { navStatus } from './mixins/commonMixins'
export default {
    mixins: [navStatus],
    data () {
        return {
            index: 2
        }
    },
    created(){
        this.$parent.data.forEach(item => {
            item.checked = false
        })
        this.$parent.data[2].checked = true
    },
    methods:{
    }
}
</script>
<style lang="scss">
</style>
