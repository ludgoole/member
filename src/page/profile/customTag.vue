<template>
    <div class="main-bot mt30">
        <div class="main-bot-title">自定义设置</div>
        <div class="mian-bot1 pd30">
            <div class="mian-bot1-title mt20 mb20">菜单设置</div>
            <Checkbox-group v-model="social">
                <Row class="check-box">
                    <Col span="8">
                        <ul>
                            <li>
                                <Checkbox label="个人信息"></Checkbox>
                            </li>
                            <li>
                                <Checkbox label="我的圈子"></Checkbox>
                            </li>
                            <li>
                                <Checkbox label="我的服务"></Checkbox>
                            </li>
                            <li>
                                <Checkbox label="工作室"></Checkbox>
                            </li>
                        </ul>
                    </Col>
                    <Col span="8">
                    <ul style="text-align:center">
                        <li>
                            <Checkbox label="我的认证"></Checkbox>
                        </li>
                        <li>
                            <Checkbox label="联系方式"></Checkbox>
                        </li>
                        <li style="margin-left: 12px">
                            <Checkbox label="我的知识库"></Checkbox>
                        </li>
                        <li>
                            <Checkbox label="资质审核"></Checkbox>
                        </li>
                    </ul>
                    </Col>
                    <Col span="8">
                    <ul style="text-align: right">
                        <li>
                            <Checkbox label="我的相册"></Checkbox>
                        </li>
                        <li>
                            <Checkbox label="我的商品"></Checkbox>
                        </li>
                        <li>
                            <Checkbox label="我的政策"></Checkbox>
                        </li>
                        <li>
                            <Checkbox label="荣誉证书"></Checkbox>
                        </li>
                    </ul>
                    </Col>
                </Row>
            </Checkbox-group>
            <div class="mian-bot1-title mt20 mb20">隐私设置</div>
            <Checkbox-group v-model="social">
                <Row class="check-box" :gutter="86" style="margin: 0 ">
                    <Col span="24" style="padding: 0" >
                    <ul >
                        <li style="margin-bottom: 24px">个人信息
                            <div style="float: right">
                                <Button-group size="small">
                                    <Button>所有人</Button>
                                    <Button type="primary">仅好友</Button>
                                    <Button>仅自己</Button>
                                </Button-group>
                            </div>
                        </li>
                        <li style="margin-bottom: 24px">我的认证
                            <div style="float: right">
                                <Button-group size="small">
                                    <Button>所有人</Button>
                                    <Button type="primary">仅好友</Button>
                                    <Button>仅自己</Button>
                                </Button-group>
                            </div>
                        </li>
                        <li style="margin-bottom: 24px">我的圈子
                            <div style="float: right">
                                <Button-group size="small">
                                    <Button>所有人</Button>
                                    <Button type="primary">仅好友</Button>
                                    <Button>仅自己</Button>
                                </Button-group>
                            </div>
                        </li>
                        <li style="margin-bottom: 24px">联系方式
                            <div style="float: right">
                                <Select v-model="model10">
                                    <Option label="暂无数据"></Option>
                                </Select>
                            </div>
                        </li>
                        <li style="margin-bottom: 24px">我的商品
                            <div style="float: right">
                                <Select v-model="model10" multiple>
                                    <Option label="暂无数据"></Option>
                                </Select>
                            </div>
                        </li>
                    </ul>
                    </Col>
                </Row>
            </Checkbox-group>                
            <Checkbox-group v-model="social" class="mt30">
                <Row class="check-box" :gutter="86">
                    <Col span="12">
                        <ul>
                            <li style="margin-bottom: 24px">个人信息
                                <div style="float: right">
                                    <i-switch v-model="switch1" size="large">
                                    	<span slot="open">公开</span>
																			<span slot="close">隐藏</span>
                                    </i-switch>
                                </div>
                            </li>
                            <li style="margin-bottom: 24px">我的认证
                                <div style="float: right">
                                    <i-switch v-model="switch2" size="large">
                                    	<span slot="open">公开</span>
																			<span slot="close">隐藏</span>
                                    </i-switch>
                                </div>
                            </li>

                            <li style="margin-bottom: 24px">我的相册
                                <div style="float: right">
                                    <i-switch v-model="switch3" size="large">
                                    	<span slot="open">公开</span>
																			<span slot="close">隐藏</span>
                                    </i-switch>
                                </div>
                            </li>
                            <li style="margin-bottom: 24px">我的圈子
                                <div style="float: right">
                                    <i-switch v-model="switch4" size="large">
                                    	<span slot="open">公开</span>
																			<span slot="close">隐藏</span>
                                    </i-switch>
                                </div>
                            </li>
                            <li style="margin-bottom: 24px">联系方式
                                <div style="float: right">
                                    <i-switch v-model="switch5" size="large"> 
                                    	<span slot="open">公开</span>
																			<span slot="close">隐藏</span>
                                    </i-switch>
                                </div>
                            </li>

                            <li style="margin-bottom: 24px">我的商品
                                <div style="float: right">
                                    <i-switch v-model="switch6" size="large">
                                    	<span slot="open">公开</span>
																			<span slot="close">隐藏</span>
                                    </i-switch>
                                </div>
                            </li>
                        </ul>
                    </Col>
                    <Col span="12">
                        <ul>
                            <li style="margin-bottom: 24px">我的服务
                                <div style="float: right">
                                    <i-switch v-model="switch7" size="large">
                                    	<span slot="open">公开</span>
																			<span slot="close">隐藏</span>
                                    </i-switch>
                                </div>
                                </li>
                            <li style="margin-bottom: 24px">我的政策
                                <div style="float: right">
                                    <i-switch v-model="switch8" size="large">
                                    	<span slot="open">公开</span>
																			<span slot="close">隐藏</span>
                                    </i-switch>
                                </div>
                            </li>

                            <li style="margin-bottom: 24px">我的知识库
                                <div style="float: right">
                                    <i-switch v-model="switch9" size="large">
                                    	<span slot="open">公开</span>
																			<span slot="close">隐藏</span>
                                    </i-switch>
                                </div>
                            </li>
                            <li style="margin-bottom: 24px">我的工作室
                                <div style="float: right">
                                    <i-switch v-model="switch10" size="large">
                                    	<span slot="open">公开</span>
																			<span slot="close">隐藏</span>
                                    </i-switch>
                                </div>
                            </li>
                            <li style="margin-bottom: 24px">资质审核
                                <div style="float: right">
                                    <i-switch v-model="switch11" size="large">
                                    	<span slot="open">公开</span>
																			<span slot="close">隐藏</span>
                                    </i-switch>
                                </div>
                            </li>
                            <li style="margin-bottom: 24px">荣誉证书
                                <div style="float: right">
                                    <i-switch v-model="switch12" size="large">
                                    	<span slot="open">公开</span>
																			<span slot="close">隐藏</span>
                                    </i-switch>
                                </div>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Checkbox-group>
        </div>
        <div class="mian-bot1 pd30">
            <Row>
                <Col span="2" offset="11">
                    <Button type="primary" shape="circle" long size="large">保存</Button>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      portal: "",
      modal1: false,
      modal2: false,
      modal_loading: false,
      modal3: false,
      modal4: false,
      modal5: false,
      switch1: true,
      switch2: true,
      switch3: true,
      switch4: true,
      switch5: true,
      switch6: true,
      switch7: true,
      switch8: true,
      switch9: true,
      switch10: true,
      switch11: true,
      switch12: true,
      model1: "",
      social: [],
      formInline: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "请填写用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请填写密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码长度不能小于6位",
            trigger: "blur"
          }
        ]
      },
      cardShow: false,
      appShow: true
    };
  },
  created: function() {},
  methods: {
    routeTo(e) {
      if (e == "/portal") {
        this.portal =
          this.$url.shop +
          "/center/gateway.htm?uid=" +
          this.loginuserinfo.uniqueId
        window.open(this.portal)
      } else {
        this.$router.push(e)
      }
    }
  }
};
</script>
<style scoped>
.layout {
  background: #fff;
}

header {
  height: 81px;
  background: #ffffff;
  border-bottom: 1px solid #e7e7e7;
}

/*main样式开始*/
.main {
  margin-top: 10px;
}

.mian-left {
  border-right: 1px solid #fafafa;
  width: 210px;
}

/*main样式结束*/

.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  color: #51ad79;
}

.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  color: #51ad79;
  border-right: 2px solid #51ad79;
  z-index: 2;
}

.mian-center {
  max-width: 702px;
  margin-left: 10px;
  margin-top: 60px;
  background: #fafafa;
  border: 1px solid #eeeeee;
  padding-bottom: 500px;
}

.main-user {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  margin-top: -46px;
}

.main-top-bg {
  height: 135px;
  width: 100%;
  background: url("../../img/images/mian-img.png") no-repeat center top;
  position: relative;
}

.main-t-r {
  width: 74%;
  margin-top: 24px;
  height: 100px;
}

.main-t-r ul li {
  float: right;
  margin-right: 28px;
  text-align: center;
}

.main-t-r span {
  font-size: 20px;
  font-weight: 500;
}

.main-t-r p {
  font-size: 14px;
}

.main-bot {
  border-top: 1px solid #ededed;
  position: relative;
}

.main-bot-title {
  width: 120px;
  height: 35px;
  font-size: 18px;
  background: #ededed;
  text-align: center;
  line-height: 35px;
  color: #333;
  border-radius: 18px;
  margin: -20px auto 0;
}

.mian-bot1-title {
  width: auto;
  height: 18px;
  font-size: 16px;
  border-left: 4px solid #51ad79;
  padding-left: 10px;
  line-height: 16px;
}

.mian-bot1-title a {
  color: #333;
  font-size: 12px;
}

.main-bot2 img {
  margin-right: 16px;
  margin-top: 8px;
}

.main-bot2 p {
  font-size: 14px;
  line-height: 30px;
}

.main-bot2 ul {
  margin-right: 63px;
}

.main-bot2 ul li {
  line-height: 30px;
  font-size: 14px;
}

.main-bot3 li {
  line-height: 18px;
}

.main-bot3 ul {
  margin-left: 24px;
}

.check-box ul li {
  margin-bottom: 20px;
  font-size: 14px;
}

.ivu-switch-checked {
  border-color: #51ad79;
  background-color: #51ad79;
}

.ivu-btn-group-small > .ivu-btn {
  padding: 4px 12px;
  font-size: 12px;
  border-radius: 3px;
}

.ivu-btn-group:not(.ivu-btn-group-vertical)
  .ivu-btn-primary:not(:first-child):not(:last-child) {
  border: 1px solid #51ad79;
}

.ivu-btn:hover {
  color: #51ad79;
  background-color: #fff;
  border-color: #51ad79;
}
/*本页出了头和底部样式结束*/
</style>