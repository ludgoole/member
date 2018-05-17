<template>
    <div class="wrapper layout">
        <top :address="false" />
        <member-header />
        <div class="main">
            <div class="container">
                <Row :gutter="20">
                    <Col span="4" class="main-l">
                        <high-app name="高级应用" />
                        <divider :margin="['10px','0']" />
                        <base-app name="基础应用" />
                        <divider :margin="['10px','0']" />
                        <user-app name="通用应用" />
                    </Col>
                    <Col span="20">
                        <div class="wrapper">
                            <my-style></my-style>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
        <foot></foot>
    </div>
</template>

<script>
    import top from '../../../top'
    import foot from '../../../foot'
    import divider from '~components/divider'
    import myUpload from 'vue-image-crop-upload'
    import highApp from '~components/memberHighApp'
    import BaseApp from '~components/memberBaseApp'
    import UserApp from '~components/memberUserApp'
    import memberHeader from '../components/memberHeader'
    import myStyle from './myStyle'

    export default {
        components:{
            top,
            foot,
            highApp,
            BaseApp,
            UserApp,
            divider,
            myUpload,
            memberHeader,
            myStyle
        },
        data() {
            return {
            }
        },
        created(){
        },
        methods:{
        }
    }
</script>
<style lang="scss" scoped>
</style>