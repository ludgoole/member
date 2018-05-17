<template>
    <div class="index">
        <top :address="false" />
        <!--mian开始-->
        <div class="main">
            <div class="wrapper-container">
            <Row :gutter="12">
                <!--main左边开始-->
                <Col span="4" class="main-l">
                    <div class="yingyong">
                    <p class="h5 tc t-grey pt20 pb20">我的应用</p>
                    <div class="app-list pl15 pr15">
                        <router-link to="pro/daili">
                            <Row class="mb10" type="flex" algin="middle">
                                <Col span="8">
                                    <img src="../../img/app-icon.png">
                                </Col>
                                <Col span="16" >
                                    <p>代理管理</p>
                                    <span>代理管理</span>
                                </Col>
                            </Row>
                        </router-link>
                        <router-link to="/member/relationManage/relationManageHome">
                        <Row class="mb10" type="flex" algin="middle">
                            <Col span="8">
                                <img src="../../img/app-icon.png">
                            </Col>
                            <Col span="16">
                                <p>关系圈管理</p>
                                <span>关系圈管理</span>
                            </Col>
                        </Row>
                        </router-link>
                        <router-link to="member/publicNumManage">
                        <Row class="mb10" type="flex" algin="middle">
                            <Col span="8">
                                <img src="../../img/app-icon.png">
                            </Col>
                            <Col span="16">
                                <p>公众号管理</p>
                                <span>公众号管理</span>
                            </Col>
                        </Row>
                        </router-link>
                        <router-link to="pro/follow">
                        <Row class="mb10" type="flex" algin="middle">
                            <Col span="8">
                                <img src="../../img/app-icon.png">
                            </Col>
                            <Col span="16">
                                <p>关注管理</p>
                                <span>关注管理</span>
                            </Col>
                        </Row>
                        </router-link>
                        <router-link to="pro/collect">
                        <Row class="mb10" type="flex" algin="middle">
                            <Col span="8">
                                <img src="../../img/app-icon.png">
                            </Col>
                            <Col span="16">
                                <p>收藏管理</p>
                                <span>收藏管理</span>
                            </Col>
                        </Row>
                        </router-link>
                    </div>
                    </div>
                    <div class="yingyong" style="margin-top: 10px">
                        <p class="h5 tc t-grey pt20 pb20">好友应用</p>
                        <div class="app-list pl15 pr15">
                            <router-link to="member/employManage">
                            <Row class="mb10" type="flex" algin="middle">
                                <Col span="8">
                                    <img src="../../img/app-icon.png">
                                </Col>
                                <Col span="16">
                                    <p>聘请管理</p>
                                    <span>聘请管理</span>
                                </Col>
                            </Row>
                            </router-link>
                            <router-link to="pro/speciesLibrary">
                            <Row class="mb10" type="flex" algin="middle">
                                <Col span="8">
                                    <img src="../../img/app-icon.png">
                                </Col>
                                <Col span="16">
                                    <p>名称库管理</p>
                                    <span>名称库管理</span>
                                </Col>
                            </Row>
                            </router-link>
                            <router-link to="pro/member">
                            <Row class="mb10" type="flex" algin="middle">
                                <Col span="8">
                                    <img src="../../img/app-icon.png">
                                </Col>
                                <Col span="16">
                                    <p>库存管理</p>
                                    <span>库存管理</span>
                                </Col>
                            </Row>
                            </router-link>
                            <router-link to="pro/member">
                            <Row class="mb10" type="flex" algin="middle">
                                <Col span="8">
                                    <img src="../../img/app-icon.png">
                                </Col>
                                <Col span="16">
                                    <p>生产管理</p>
                                    <span>生产管理</span>
                                </Col>
                            </Row>
                            </router-link>
                            <Row class="mb10" type="flex" algin="middle">
                                <Col span="8">
                                    <img src="../../img/app-icon.png">
                                </Col>
                                <Col span="16">
                                    <p>储藏账户</p>
                                    <span>储藏账户</span>
                                </Col>
                            </Row>

                        </div>
                    </div>
                </Col>

                <!--main左边结束-->
                <!--main中间开始-->
                <Col span="15" class="main-c">
                    <div class="main-c-1">
                        <div style="position: absolute;left: 24px;top:24px">
                            <div>
                            <img src="../../img/main-center-icon1.png" alt="">
                            </div>
                            <div>
                                <img src="../../img/main-center-icon2.png" alt="">
                            </div>
                        </div>
                        <div class="main-c-1-r">
                            <ul>
                                <li>
                                    <h4 >256</h4>
                                    <span>农币</span>
                                </li>
                                <li>
                                    <h4 >7</h4>
                                    <span>礼券</span>
                                </li>
                                <li>
                                    <h4 >256</h4>
                                    <span>积分</span>
                                </li>
                            </ul>
                        </div>
                        <div style="text-align: center">
                            <div class="user-img"></div>
                            <h2>{{loginuserinfo.displayName}}</h2>
                            <p>{{loginuserinfo.signature}}</p>
                        </div>
                    </div>
                    <div class="main-c-2">
                        <div>
                        <div class="mian-c-title">
                            <h3>必备应用</h3>
                        </div>
                        <Row style="text-align: center;margin: 20px 0">
                            <Col span="4" style="width: 19.667%;">
                            <div class="mian-margin">
                                <div><img src="../../img/gongneng.png" alt=""></div>
                                <p style="font-size: 16px;line-height: 30px;margin-bottom: 4px">寻找政策</p>
                                <Button type="primary" size="small">添加</Button>
                            </div>
                            </Col>
                            <Col span="4" style="width: 19.667%;">
                            <div class="mian-margin">
                                <div><img src="../../img/gongneng.png" alt=""></div>
                                <p style="font-size: 16px;line-height: 30px;margin-bottom: 4px">寻找政策</p>
                            </div>
                            </Col>
                        </Row>
                        </div>
                        <div>
                            <div class="mian-c-title">
                                <h3>必备应用</h3>
                            </div>
                            <Row style="text-align: center;margin: 20px 0">
                                <Col span="4" style="width: 19.667%;">
                                <div class="mian-margin">
                                    <div><img src="../../img/gongneng.png" alt=""></div>
                                    <p style="font-size: 16px;line-height: 30px;margin-bottom: 4px">代理管理</p>
                                </div>
                                </Col>
                                <Col span="4" style="width: 19.667%;">
                                <div class="mian-margin">
                                    <div><img src="../../img/gongneng.png" alt=""></div>
                                    <p style="font-size: 16px;line-height: 30px;margin-bottom: 4px">关系圈管理</p>
                                    <Button type="primary" size="small">添加</Button>
                                </div>
                                </Col>
                                <Col span="4" style="width: 19.667%;">
                                <div class="mian-margin">
                                    <div><img src="../../img/gongneng.png" alt=""></div>
                                    <p style="font-size: 16px;line-height: 30px;margin-bottom: 4px">公众号管理</p>
                                </div>
                                </Col>
                                <Col span="4" style="width: 19.667%;">
                                <div class="mian-margin">
                                    <div><img src="../../img/gongneng.png" alt=""></div>
                                    <p style="font-size: 16px;line-height: 30px;margin-bottom: 4px">关注管理</p>
                                </div>
                                </Col>
                                <Col span="4" style="width: 19.667%;">
                                <div class="mian-margin">
                                    <div><img src="../../img/gongneng.png" alt=""></div>
                                    <p style="font-size: 16px;line-height: 30px;margin-bottom: 4px">收藏管理</p>
                                </div>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <div class="mian-c-title">
                                <h3>必备应用</h3>
                            </div>
                            <Row style="text-align: center;margin: 20px 0">
                                <Col span="4" style="width: 19.667%;">
                                <div class="mian-margin">
                                    <div><img src="../../img/gongneng.png" alt=""></div>
                                    <p style="font-size: 16px;line-height: 30px;margin-bottom: 4px">聘请管理</p>
                                    <Button type="primary" size="small">添加</Button>
                                </div>
                                </Col>
                                <Col span="4" style="width: 19.667%;">
                                <div class="mian-margin">
                                    <div><img src="../../img/gongneng.png" alt=""></div>
                                    <p style="font-size: 16px;line-height: 30px;margin-bottom: 4px">名称库管理</p>
                                    <Button type="primary" size="small">添加</Button>
                                </div>
                                </Col>
                                <Col span="4" style="width: 19.667%;">
                                <div class="mian-margin">
                                    <div><img src="../../img/gongneng.png" alt=""></div>
                                    <p style="font-size: 16px;line-height: 30px;margin-bottom: 4px">库存管理</p>
                                    <Button type="primary" size="small">添加</Button>
                                </div>
                                </Col>
                                <Col span="4" style="width: 19.667%;">
                                <div class="mian-margin">
                                    <div><img src="../../img/gongneng.png" alt=""></div>
                                    <p style="font-size: 16px;line-height: 30px;margin-bottom: 4px">生产管理</p>
                                    <Button type="primary" size="small">添加</Button>
                                </div>
                                </Col>
                                <Col span="4" style="width: 19.667%;">
                                <div class="mian-margin">
                                    <div><img src="../../img/gongneng.png" alt=""></div>
                                    <p style="font-size: 16px;line-height: 30px;margin-bottom: 4px">储藏账户</p>
                                    <Button type="primary" size="small">添加</Button>
                                </div>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <div class="mian-c-title">
                                <h3>必备应用</h3>
                            </div>
                            <Row style="text-align: center;margin: 20px 0">
                                <Col span="4" style="width: 19.667%;">
                                <div class="mian-margin">
                                    <div><img src="../../img/gongneng.png" alt=""></div>
                                    <p style="font-size: 16px;line-height: 30px;margin-bottom: 4px">寻找政策</p>
                                    <Button type="primary" size="small">添加</Button>
                                </div>
                                </Col>
                                <Col span="4" style="width: 19.667%;">
                                <div class="mian-margin">
                                    <div><img src="../../img/gongneng.png" alt=""></div>
                                    <p style="font-size: 16px;line-height: 30px;margin-bottom: 4px">寻找政策</p>
                                    <Button type="primary" size="small">添加</Button>
                                </div>
                                </Col>
                                <Col span="4" style="width: 19.667%;">
                                <div class="mian-margin">
                                    <div><img src="../../img/gongneng.png" alt=""></div>
                                    <p style="font-size: 16px;line-height: 30px;margin-bottom: 4px">寻找政策</p>
                                    <Button type="primary" size="small">添加</Button>
                                </div>
                                </Col>
                                <Col span="4" style="width: 19.667%;">
                                <div class="mian-margin">
                                    <div><img src="../../img/gongneng.png" alt=""></div>
                                    <p style="font-size: 16px;line-height: 30px;margin-bottom: 4px">寻找政策</p>
                                    <Button type="primary" size="small">添加</Button>
                                </div>
                                </Col>
                                <Col span="4" style="width: 19.667%;">
                                <div class="mian-margin">
                                    <div><img src="../../img/gongneng.png" alt=""></div>
                                    <p style="font-size: 16px;line-height: 30px;margin-bottom: 4px">寻找政策</p>
                                    <Button type="primary" size="small">添加</Button>
                                </div>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <div class="mian-c-title">
                                <h3>必备应用</h3>
                            </div>
                            <Row style="text-align: center;margin: 20px 0">
                                <Col span="4" style="width: 19.667%;">
                                <div class="mian-margin">
                                    <div><img src="../../img/gongneng.png" alt=""></div>
                                    <p style="font-size: 16px;line-height: 30px;margin-bottom: 4px">寻找政策</p>
                                    <Button type="primary" size="small">添加</Button>
                                </div>
                                </Col>
                                <Col span="4" style="width: 19.667%;">
                                <div class="mian-margin">
                                    <div><img src="../../img/gongneng.png" alt=""></div>
                                    <p style="font-size: 16px;line-height: 30px;margin-bottom: 4px">寻找政策</p>
                                    <Button type="primary" size="small">添加</Button>
                                </div>
                                </Col>
                                <Col span="4" style="width: 19.667%;">
                                <div class="mian-margin">
                                    <div><img src="../../img/gongneng.png" alt=""></div>
                                    <p style="font-size: 16px;line-height: 30px;margin-bottom: 4px">寻找政策</p>
                                    <Button type="primary" size="small">添加</Button>
                                </div>
                                </Col>
                                <Col span="4" style="width: 19.667%;">
                                <div class="mian-margin">
                                    <div><img src="../../img/gongneng.png" alt=""></div>
                                    <p style="font-size: 16px;line-height: 30px;margin-bottom: 4px">寻找政策</p>
                                    <Button type="primary" size="small">添加</Button>
                                </div>
                                </Col>
                                <Col span="4" style="width: 19.667%;">
                                <div class="mian-margin">
                                    <div><img src="../../img/gongneng.png" alt=""></div>
                                    <p style="font-size: 16px;line-height: 30px;margin-bottom: 4px">寻找政策</p>
                                    <Button type="primary" size="small">添加</Button>
                                </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
                <!--main中间结束-->

                <!--main右边开始-->
                <Col span="5" class="main-r">
                    <div class="main-r-1">
                        <Tabs value="name1">
                            <Tab-pane label="最热排行" name="name1" class="app-list">
                                <Row class="mb10" type="flex" algin="middle">
                                    <Col span="6">
                                        <img src="../../img/app-icon.png">
                                    </Col>
                                    <Col span="14">
                                        <p>查找企业</p>
                                        <span>查找企业</span>
                                    </Col>
                                    <Col span="4">
                                        <img src="../../img/no1.png">
                                    </Col>
                                </Row>
                                <Row class="mb10" type="flex" algin="middle">
                                    <Col span="6">
                                        <img src="../../img/app-icon.png">
                                    </Col>
                                    <Col span="14">
                                        <p>查找企业</p>
                                        <span>查找企业</span>
                                    </Col>
                                    <Col span="4">
                                        <img src="../../img/no2.png">
                                    </Col>
                                </Row>
                                <Row class="mb10" type="flex" algin="middle">
                                    <Col span="6">
                                        <img src="../../img/app-icon.png">
                                    </Col>
                                    <Col span="14">
                                        <p>查找企业</p>
                                        <span>查找企业</span>
                                    </Col>
                                    <Col span="4">
                                        <img src="../../img/no3.png">
                                    </Col>
                                </Row>
                                <Row class="mb10" type="flex" algin="middle">
                                    <Col span="6">
                                        <img src="../../img/app-icon.png">
                                    </Col>
                                    <Col span="14">
                                        <p>查找企业</p>
                                        <span>查找企业</span>
                                    </Col>
                                    <Col span="4"></Col>
                                </Row>
                                <Row class="mb10" type="flex" algin="middle">
                                    <Col span="6">
                                        <img src="../../img/app-icon.png">
                                    </Col>
                                    <Col span="14">
                                        <p>查找企业</p>
                                        <span>查找企业</span>
                                    </Col>
                                    <Col span="4"></Col>
                                </Row>

                            </Tab-pane>
                            <Tab-pane label="最新上架" name="name2">标签二的内容</Tab-pane>
                        </Tabs>
                    </div>
                    <div class="main-r-2">
                        <ul>
                            <li><a href="">必备应用</a></li>
                            <li><a href="">必备应用</a></li>
                            <li><a href="">必备应用</a></li>
                            <li><a href="">必备应用</a></li>
                            <li><a href="">必备应用</a></li>
                            <li><a href="">必备应用</a></li>
                            <li><a href="">必备应用</a></li>
                        </ul>
                    </div>
                </Col>
                <!--main右边结束-->
            </Row>
            </div>
        </div>
        <!--mian结束-->

        <foot></foot>
    </div>
</template>
<script>
import api from "~api";
import top from "../../top";
import foot from '../../foot'
import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter);
export default {
  components: {
    top,
    foot
  },
  data() {
    return {
      loginuserinfo: JSON.parse(sessionStorage.getItem("user")) || "",
      theme1: "light",
      modal2: false,
      modal_loading: false,
      modal3: false,
      modal4: false,
      modal5: false,
      portal: "",
      formInline: {
        user: "",
        password: ""
      }
    };
  },
  methods: {
    goto(e) {
      if (e == "/portal") {
        this.portal =
          this.$url.shop +
          "/member/center/gateway.htm?uid=" +
          this.loginuserinfo.uniqueId;
        window.open(this.portal);
      } else {
        this.$router.push(e);
      }
    },
    logout() {
      api.get("/member/login/logout").then(response => {
        console.log(response.data);
      });
      sessionStorage.removeItem("user");
      this.$router.push("/index");
    }
  }
};
</script>
<style>
.main-l,
.main-c {
  margin-right: 0;
}
.main-r-1 {
  padding: 10px 15px;
}
</style>
