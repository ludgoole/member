<template>
    <div>
        <headNav>
        </headNav>
        <div class="layouts">
            <div class="tc pb100 pt50">
                <img src="../../img/developing.png" alt="">
                <p>开发中,敬请期待···！</p>
            </div>
        </div>
    </div>
</template>
<script>
    import headNav from './components/headNav.vue';

    export default {
        components: {
            headNav
        },
        created() {
        },
        data() {
            return {};
        },
        beforeCreate() {
        },
        methods: {}
    };
</script>
<style lang="scss">
    .news-img {
        text-align: right;
    }

    .new-last li {
        border-bottom: 1px solid #ccc;
        padding: 15px 5px;
    }

    .new-last {
        a {
            color: #666;
        }
        .ivu-tag {
            margin: 0;
        }
        .main-time,
        .label {
            display: inline-block;
            vertical-align: middle;
            padding: 0 8px;
            height: 24px;
            line-height: 24px;
        }
    }
</style>