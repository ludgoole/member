<template>
    <nav class="mall-nav">
        <div class="layouts" ref="mallNav">
            <template v-for="(item,index) in navList">
                <a :href="item.url" :class="item.url === $route.path ? 'link on' : 'link'"
                   :key="index"
                >{{item.text}}</a>
            </template>
        </div>
    </nav>
</template>
<script>
    export default {
        data() {
            return {
                navList: [
                    {
                        url: '/mall/index',
                        text: '首页'
                    }, {
                        url: '/pro/inforMationList',
                        text: '资讯'
                    }, {
                        url: '/pro/policyList',
                        text: '政策'
                    }, {
                        url: '/pro/knowledgeList',
                        text: '知识'
                    }, {
                        url: '/pro/productList',
                        text: '产品'
                    }, {
                        url: '/pro/serviceList',
                        text: '服务'
                    }, {
                        url: '/pro/standardList',
                        text: '标准'
                    }, {
                        url: '/pro/enterpriseList',
                        text: '企业'
                    }, {
                        url: '/pro/departmentList',
                        text: '机关'
                    }, {
                        url: '/pro/expertList',
                        text: '专家'
                    }
                ],
            };
        },
        props: {},
        created() {
        },
        updated() {
        },
        methods: {}
    };
</script>
<style scoped>

</style>