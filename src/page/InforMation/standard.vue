<template>
    <div>
        <div v-for="(item, index) in standardList" :key="index" class="standard-list">
            <Row style="height: 30px; vertical-align: middle; font-family: PingFang SC; font-size: 14px;">
                <Col span="6" class="ell" :title="item.standardNumber">{{ item.standardNumber }}</Col>
                <Col span="12" style="text-align: left;"><a href="javascript:void(0);" class="ell" :title="item.chineseStandardName" @click="goToDetail(item.standardDetailId)" style="margin-left: 5px;">{{ item.chineseStandardName }}</a></Col>
                <Col span="6" style="text-align: right;">{{ item.createTime }}</Col>
            </Row>
            <Row style="height: 30px; vertical-align: middle; line-height: 30px;">
                <div class="ivu-tag ivu-tag-border-custom ivu-tag-checked" 
                    :style="item.standardTrait === '强制性标准' ? 'border-width: 1px; border-style: solid; border-color: #FF7921;' : 'border-width: 1px; border-style: solid; border-color: #F5A623;'">
                    <span class="ivu-tag-text" :style="item.standardTrait === '强制性标准' ? 'color: #FF7921;' : 'color: #F5A623'">{{ item.standardTrait }}</span>
                </div>
                <div class="ivu-tag ivu-tag-border-custom ivu-tag-checked" 
                    :style="item.standardStatus === '现行' ? 'border-width: 1px; border-style: solid; border-color: #4AB344;' : 'border-width: 1px; border-style: solid; border-color: #9B9B9B;'">
                    <span class="ivu-tag-text" :style="item.standardStatus === '现行' ? 'color: #4AB344;' : 'color: #9B9B9B'">{{ item.standardStatus }}</span>
                </div>
            </Row>
        </div>
        <Button type="ghost" class="new-more mt20" @click="standards()" long>更多</Button>
	</div>
</template>
<script>
    export default {
        name: 'standardInGuide',
        components: {
        },
        data() {
            return {
                standardList: [],
                pageSize: 5,
                pageNum: 1,
            }
        },
        created () {
            this.init()
        },
        methods: {
            init () {
                this.$api.post('/member/standard/getNswyNavigation', {pageSize: 5}).then(response => {
                    if (response.code === 200) {
                        this.standardList = response.data.list
                    }
                }).catch(error => {
                    console.log('error', error)
                })
            },
            standards () {
                this.$router.push('/pro/standardList')
            },
            goToDetail (id) {
                this.$router.push({
                    path: '/inforMation/standardDetail',
                    query: {
                        id: id,
                        status: 2
                    }
                })
            }
        }
    }
</script>
<style scoped>
    .ivu-tag-border-custom {
        height: 24px;
        line-height: 24px;
        /* border: 1px solid #e9eaec!important; */
        color: #657180!important;
        background: #fff!important;
        position: relative;
    }
    .standard-list {
        padding: 10px;
        border: 1px solid #F6F6F6;
        margin-top: 10px;
    }
</style>