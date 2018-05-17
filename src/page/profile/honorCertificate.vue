<template>
    <div class="mt20">
        <div class="main-bot">
            <Row class="pd50">
                <div class="mian-bot1">
                    <div class="mian-bot2-title">
                        <span>曾获荣誉</span>
                        &nbsp;
                        <div  style="float: right" v-if="isshowEdit">
                            <a style="color: #51ad79;padding-left: 10px" @click="editHonorInfo">   修改</a>
                        </div>
                        <div style="border-top:1px solid #ededed;margin-top: 12px;">
                            <div style="height: 10px"></div>
                            <p style="font-size: 14px ;line-height: 2" v-html="honorCertificate"></p>
                        </div>
                    </div>
                </div>
                <Modal v-model="honorInfoShow" width="960" :mask-closable="false">
                    <certification @success="honorInfoClose" :base="false"></certification>
                    <div slot="footer"></div>
                </Modal>
            </Row>
        </div>
    </div>
</template>

<script>
import api from "~api"
import certification from '../identification/certification05_10.vue'
export default {
  name: "honorCertificate",
  components: {
    certification
  },
  data() {
    return {
      honorCertificate: "",
      isshowEdit: false,
      honorInfoShow: false
    };
  },
  created () {
    this.init()
    this.showEditButton()
  },
  methods: {
    init () {
      api.get("/member/userFullInfo/findhonner")
        .then(response => {
          console.log(response)
          let s = ""
          if (response.code === 200) {
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].status === 1) {
                s +=
                  "荣誉名称：" +
                  response.data[i].honor +
                  "，获得时间：" +
                  response.data[i].time +
                  "；</br>"
              }
            }
          }
          this.honorCertificate = s
        })
        .catch(error => {
          console.error(error);
        });
    },
    showEditButton () {
      this.loginuserinfo = JSON.parse(sessionStorage.getItem("user"))
      if (
        this.loginuserinfo != null &&
        this.loginuserinfo.loginAccount === this.$route.query.uid
      ) {
        this.isshowEdit = true
      }
    },
    editHonorInfo () {
      this.honorInfoShow = true
    },
    honorInfoClose () {
      this.honorInfoShow = false
      this.init()
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
.btn {
  width: 100px;
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
  /*width: 600px;*/

  margin: 0 auto;
  border-top: 1px solid #ededed;
  position: relative;
}
.main-bot-title {
  width: 120px;
  font-size: 18px;
  background: #ededed;
  text-align: center;
  line-height: 35px;
  margin: auto;
  color: #333;
  border-radius: 18px;
}
.mian-bot1 {
  margin: 20px 0 30px;
}
.mian-bot2-title {
  width: auto;
  font-size: 16px;
  border-left: 4px solid #51ad79;
  padding: 0 0 10px 10px;
  line-height: 16px;
  margin-bottom: 5px;
}
.mian-bot2-title a {
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
.infoc {
  border-top: 1px solid #ededed;
  padding-top: 10px;
  margin-left: 15px;
}
/*本页出了头和底部样式结束*/
</style>