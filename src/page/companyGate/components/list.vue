<template>
    <div class="layouts com-dynamic-list">
    	<Card :padding="0" v-for="(item,index) in data" :key="index" class="mb20 ma-card">
            <Row type="flex" align="middle" v-if="item.columnType !== '图书'"  @click.native="handleClick(item.informationDetailId)">
                <Col span="5" class="ma-card-img">
                   <img v-if="!item.image && item.columnType === '文章'" src="../../../img/ma-img-003.png">
                    <img v-if="item.image  && item.columnType === '文章'"  :src="'http:'+item.image">
                    <img v-if="!item.image && item.columnType === '图书'" src="../../../img/ma-img-003.png">
                    <img v-if="item.image  && item.columnType === '图书'"  :src="'http:'+item.image">
                    <img v-if="!item.image && item.columnType === '图册'" src="../../../img/ma-img-003.png">
                    <img v-if="item.image  && item.columnType === '图册'"  :src="'http:'+item.image">
                    <img v-if="!item.image && item.columnType === '短信'" src="../../../img/ma-audio.jpg">
                    <img v-if="item.image  && item.columnType === '短信'"  :src="'http:'+item.image">
                    <img v-if="!item.image && item.columnType === '音频'" src="../../../img/ma-audio.jpg">
                    <img v-if="item.image  && item.columnType === '音频'"  :src="'http:'+item.image">
                    <img v-if="!item.image && item.columnType === '视频'" src="../../../img/ma-video.jpg">
                    <img v-if="item.image  && item.columnType === '视频'"  :src="'http:'+item.image">
                </Col>
                <Col span="14" offset="1">
                    <div class="ma-card-content">
                        <span class="ell" style="font-size:16px;font-weight: 600;">{{item.title}}</span>
                        <span class="ma-card-span company-card-order">{{item.docType}}</span>
                        <span v-if="item.classifiedName !== ''" class="ma-card-span company-card-order">{{item.classifiedName}}</span>
                    </div>
                    <p class="mt10 ell-2">{{item.abstracts}}</p>
                </Col>
                <Col  span="3" offset="1" class="tc">
                    <p class="mb10">{{item.createTime}}</p>
                    <Button type="ghost" id="company-arrow-right"  shape="circle" icon="ios-arrow-right"></Button>
                </Col>
            </Row>
             <Row type="flex" align="middle"  v-if="item.columnType === '图书'" @click.native="bookClick(item.informationDetailId,item.id)">
                <Col span="5" class="ma-card-img">
                   <img v-if="!item.image && item.columnType === '文章'" src="../../../img/ma-img-003.png">
                    <img v-if="item.image  && item.columnType === '文章'"  :src="'http:'+item.image">
                    <img v-if="!item.image && item.columnType === '图书'" src="../../../img/ma-img-003.png">
                    <img v-if="item.image  && item.columnType === '图书'"  :src="'http:'+item.image">
                    <img v-if="!item.image && item.columnType === '图册'" src="../../../img/ma-img-003.png">
                    <img v-if="item.image  && item.columnType === '图册'"  :src="'http:'+item.image">
                    <img v-if="!item.image && item.columnType === '短信'" src="../../../img/ma-audio.jpg">
                    <img v-if="item.image  && item.columnType === '短信'"  :src="'http:'+item.image">
                    <img v-if="!item.image && item.columnType === '音频'" src="../../../img/ma-audio.jpg">
                    <img v-if="item.image  && item.columnType === '音频'"  :src="'http:'+item.image">
                    <img v-if="!item.image && item.columnType === '视频'" src="../../../img/ma-video.jpg">
                    <img v-if="item.image  && item.columnType === '视频'"  :src="'http:'+item.image">
                </Col>
                <Col span="14" offset="1">
                    <div class="ma-card-content">
                        <span class="ell" style="font-size:16px;font-weight: 600;">{{item.title}}</span>
                        <span class="ma-card-span company-card-order">{{item.docType}}</span>
                        <span v-if="item.classifiedName !== ''" class="ma-card-span company-card-order">{{item.classifiedName}}</span>
                    </div>
                    <p class="mt10 ell-2">{{item.abstracts}}</p>
                </Col>
                <Col  span="3" offset="1" class="tc">
                    <p class="mb10">{{item.createTime}}</p>
                    <Button type="ghost" id="company-arrow-right"  shape="circle" icon="ios-arrow-right"></Button>
                </Col>
            </Row>
        </Card>
    </div>
</template>
<script>
export default {
    props: {
        data: {
            type: Array
        },
        bookType:{
            type:String
        }
    },
    data() {
        return {
        }
    },
    created(){
    },
    methods:{
        handleClick(id){
            this.$emit('on-click-skip',id)
        },
        bookClick(informationDetailId,id){
            this.$router.push({
                path: '/InforMation/bookBlurb',
                query: {
                    id: id,
                    informationDetailId:informationDetailId,
                    book_type:this.bookType
                }
            })
        }
    }
}
</script>

<style lang="scss">
.ma-card{
    cursor: pointer;
}
.company-card-order{
   border: 1px solid #4fac77 !important;
}
.ivu-card-body:hover #company-arrow-right{
    background-color:#4fac77;
    color:#fff;
    border:#4fac77;
}
.com-dynamic-list  .abstracts{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
</style>