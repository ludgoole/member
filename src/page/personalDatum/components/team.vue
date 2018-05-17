<template>
  <div  class="education pt30 pl10 pr10">
    <Form :label-width="150" label-position="left" class="mt20 mb20">    
      <div  v-for="(item, index) in data" :key="index">
        <Card class="mb20">
          <Row type="flex" align="middle">
            <Col span="2" class="tc">
              <Avatar :src="item.avatar[0]" class="ivu-avatar-super" />
            </Col>
            <Col span="22">
              <Row>
                <Col span="4">
                  <span>{{item.name}}</span>
                  <span class="t-orange t-small ml5">{{item.role}}</span>
                </Col>
              </Row>
              <div class="t-small mt5">
                <Col span="6">职务：{{item.job}}</Col>
                <Col span="6" v-if="item.educate">学历：{{item.educate}}</Col>
                <Col span="6" v-if="item.idCard">身份证：{{item.idCard}}</Col>
                <Col span="6" v-if="item.phone">手机号：{{item.phone}}</Col>
              </div>
            </Col>
          </Row>
          <div class="t-small content ell-2" v-if="!more && item.intro">
              {{item.intro.slice(0,140)}}...<Button type="text" size="small" @click="handleMore" v-if="item.intro.length > 140">查看更多</Button>
          </div>
          <div class="content" v-if="more && item.intro">
              {{item.intro}}
              <div class="tr"><Button type="text" size="small" @click="handleMore">收起</Button></div>
          </div>
        </Card>
      </div>
    </Form>
  </div>
</template>
<script>
export default {
  data: () => ({
    more:false,
    teamAccount:false,
    formItem:{
      // role: '',
      job: '',
      name: '',
      avatar: [],
      idCard: '',
      phone: '',
      intro: '',
      educate: ''
    },
    data: [],
  }),
  mounted () {
  },
  methods: {
    //接收数据
    getData(val){
      this.data = val
    },
    //查看更多
    handleMore(){
      this.more = !this.more
    }
  }
}
</script>
<style lang="scss" scoped>
.ivu-avatar-super{
    width: 54px;
    height: 54px;
    line-height: 54px;
    border-radius: 50px;
}
</style>
