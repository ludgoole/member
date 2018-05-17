<template>
    <div>
        <div v-if="data.length > 0" class="mb50">
            <Row :gutter="20" class="com-laws-list mb50" :class="type">
                <template>
                    <Card :key="index" v-for="(item,index) in data">
                        <Row type="flex" align="middle" class="mb10 com-dynamic-list">
                            <Col span="18">
                                <h5>{{item.title}}</h5>
                                <p class="t-grey mt5 t-over-1">{{item.content}}</p>
                            </Col>
                            <Col span="3" offset="3" class="tc">
                                <p class="t-grey mb5">{{item.createTime}}</p>
                                <router-link :to="'/InforMation/policyDetail?id='+item.informationDetailId">
                                <Button type="ghost" id="arrow-right" shape="circle" icon="chevron-right"></Button>
                                </router-link>
                            </Col>
                        </Row>
                    </Card>
                </template>
            </Row>
            <div class="tc mt30">
                <Page class="country" :total="page.total" :current="page.current" :page-size="page.pageSize" @on-change="handlePageChange" v-if="page.show"></Page>
            </div>
        </div>
        <div class="ma-polic-img pb20" v-if="data.length === 0">
            <img src="../../../img/no-content.png">
            <p style="margin-top: 10px;">暂无内容</p>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        data: Array,
        page: {
            type: Object,
            default () {
                return {
                    show: true,
                    current: 1,
                    total: 0,
                    pageNum: 10
                }
            }
        }
    },
    data () {
        return {
            type: 'default-list'
        }
    },
    created(){
    },
    methods:{
        // tab事件
        handleTabChange () {
            if(this.lawsTab === '图文'){
                this.type = 'default-list'
            }else if (this.lawsTab === '视频') {
                this.type = 'video-list'
            }else if (this.lawsTab === '音频') {
                this.type = 'audio-list'
            }else{
                this.type = 'text-list'
            }
            this.$emit('on-tab-change', this.lawsTab)
        },
        // 分页事件
        handlePageChange () {
            this.$emit('on-page-change')
        }

    }
}
</script>
<style lang="scss">
    .ma-polic-img{text-align: center;}
    .t-over-1{
        overflow:hidden; 
        text-overflow:ellipsis;
        -webkit-box-orient:vertical;
        white-space: nowrap;
    }
</style>