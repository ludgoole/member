<template>
     <Card class="news-item">
        <Row type="flex" align="middle" :gutter="0">
            <Col span="3" class="tc">
                <h5>{{data.year}}</h5>
                <divider :margin="['4px', '0']" solid />
                <p>{{data.month}}-{{data.day}}</p>
            </Col>
            <Col span="21">
                <p class="ell">{{data.title}}</p>
                <p class="mt5 ell">{{data.subTitle}}</p>
            </Col>
        </Row>
     </Card>
</template>
<script>
import divider from '~components/divider'
export default {
    props:{
        data: {
            type: Object
        }
    },
    components:{
        divider
    },
    data () {
        return {
        }
    },
    created(){
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
    .news-item.ivu-card{
        background: #fff;
        margin-bottom: 15px;
        &:hover{
            border-color: #51ad79;
            background: #51ad79;
            color:#fff;
        }
    }
</style>