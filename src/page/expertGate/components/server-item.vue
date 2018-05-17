<template>
    <div class="person-server-item">
        <Row type="flex" align="middle">
            <Col span="4">
                <Avatar style="background-color: #484848" size="large" :icon="data.icon" />
            </Col>
            <Col span="20">
                <h6>{{data.title}}</h6>
                <p class="t-grey mt5">{{data.detail}}</p>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
    props:{
        data: Object
    },
    components:{
    },
    data () {
        return {
        }
    },
    created(){
    },
    methods:{
    }
}
</script>
<style lang="scss">
.person-server-item{
    margin: 0 10px 20px 10px;
    padding: 20px;
    border:1px solid #DFDFDF;
    border-left-width: 30px;
}
</style>