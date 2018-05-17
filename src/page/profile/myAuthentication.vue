<template>
    <!--mian中边开始-->
    <div class="main-bot">
        <div class="main-bot-title">最新动态</div>
        <div class="mian-bot1 pd10">
            <div class="mian-bot1-title">
                <span>个人认证</span>
                &nbsp;
                <span style="font-size: 12px ;color: #fe3f3f">您参与的百科条目有更新</span>
                <div style="float: right" v-if="isshowEdit">
                    <a style="color: #51ad79;padding-left: 10px" @click="userCertificationEdit"> 重新认证</a>
                </div>
                <Modal v-model="userCertificationShow" title="重新认证" width="360">
                    <div style="text-align:center">
                        <Form ref="userCertification" :model="userCertification" :rules="ruleInline">
                            <Form-item prop="sex">
                                <Select v-model="userCertification.sex" placeholder="性别" v-on:input ="inputUserCertification">
                                    <Option value="男">男</Option>
                                    <Option value="女">女</Option>                                    
                                </Select>                                                           
                            </Form-item>
                            <Form-item prop="profession">
                                <Input type="text" v-model="userCertification.profession" placeholder="专业" v-on:input ="inputUserCertification">
                                <Icon type="ios-locked-outline" slot="prepend"></Icon>
                                </Input>
                            </Form-item>
                            <Form-item prop="field">
                                <Input type="text" v-model="userCertification.field" placeholder="擅长领域"  v-on:input ="inputUserCertification">
                                <Icon type="ios-locked-outline" slot="prepend"></Icon>
                                </Input>
                            </Form-item>
                            <Form-item prop="title">
                                <Input type="text" v-model="userCertification.title" placeholder="职称" v-on:input ="inputUserCertification">
                                <Icon type="ios-locked-outline" slot="prepend"></Icon>
                                </Input>
                            </Form-item>
                            <div>
                                <h2 style="text-align: center;padding:0 0 10px 0;font-size: 18px;font-weight: normal">实时预览</h2>
                                <Input v-model="userCertificationContent" type="textarea" :rows="4" placeholder="请输入..."></Input>
                            </div>
                        </Form>
                    </div>
                    <div slot="footer">
                        <Button type="primary" shape="circle" @click="userCertificationSubmit('userCertification')" style="width:100%">确定</Button>
                    </div>
                </Modal>
                <div class="main-bot2"
                     style="border-top:1px solid #ededed;margin-top: 12px;padding-top: 8px">
                    <img src="../../img/images/user3.png" alt="" style="float: left">
                    <p>认证信息：达人认证</p>
                    <ul style="float: left">
                        <li>性别：{{sex}}</li>
                        <li>专业：{{profession}}</li>
                    </ul>
                    <ul style="float: left">
                        <li></li>
                        <li>擅长领域：{{field}}</li>
                        <li>职称：{{title}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import api from "~api"
var userCertificationtxt = ""
export default {
  data() {
    return {
      loginuserinfo:JSON.parse(sessionStorage.getItem("user")),
      isshowEdit:false,
      userCertificationShow: false,
      portal: "",
      sex: "",
      profession: "",
      field: "",
      title: "",
      status: "",
      userCertificationContent: "",
      userCertification: {
        sex: "",
        profession: "",
        field: "",
        title: "",
        status: ""
      },
      ruleInline: {}
    };
  },
  created: function() {
    this.fetchData()
    this.showEditButton()
  },
  methods: {
     showEditButton:function(){
                 this.loginuserinfo = JSON.parse(sessionStorage.getItem("user"))
                 if(this.loginuserinfo.loginAccount ==  this.$route.query.uid){
                     this.isshowEdit = true
                 }
    },

    fetchData: function() {
      api
        .get("/userCertification/findUserCertification?uid=" + this.$route.query.uid)
        .then(response => {
          this.sex = response.data.sex
          this.profession = response.data.profession
          this.field = response.data.field
          this.title = response.data.title
          this.status = response.data.status
        })
        .catch(function(error) {
          console.log(error)
        });
    },
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
    },
    userCertificationEdit() {
      if (this.userCertificationShow == false) {
        this.userCertificationShow = true
      }
    },
    userCertificationSubmit(name) {
      api.post("/member/userCertification/updateUserCertification", {
          sex: this.userCertification.sex,
          profession: this.userCertification.profession,
          field: this.userCertification.field,
          title: this.userCertification.title
        }).then(response => {
          this.flag = response.data
          if (this.flag == "1") {
            this.$Message.success("修改成功!")
            this.userCertificationShow = false
            this.fetchData()
          }
        }).catch(function(error) {
          this.$Message.success("修改失败!")
          console.log(error)
        });
    },
    inputUserCertification() {
      if (this.userCertification.sex != "") {
        userCertificationtxt = "性别：" + this.userCertification.sex
      }
      if (this.userCertification.profession != "") {
        userCertificationtxt += ",专业：" + this.userCertification.profession
      }
      if (this.userCertification.field != "") {
        userCertificationtxt += ",擅长领域：" + this.userCertification.field
      }
      if (this.userCertification.title != "") {
        userCertificationtxt += ",职称：" + this.userCertification.title;
      }
      this.userCertificationContent = userCertificationtxt
    }
  }
};
</script>
<style scoped >
.main-bot {
  margin: 30px auto;
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
  margin-top: 46px;
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
.mian-center {
  padding-bottom: initial;
}
/*本页出了头和底部样式结束*/
</style>
