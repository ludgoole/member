<template>
  <div>
      <Breadcrumb separator=">" class="mt20 mb10">
          <Breadcrumb-item href="/index">首页</Breadcrumb-item>
          <Breadcrumb-item href="/pro/inforMationList?flag=1">知识</Breadcrumb-item>
          <Breadcrumb-item>{{this.$route.query.title}}</Breadcrumb-item>
      </Breadcrumb>
      <Row dis-hover>
          <Col span="18">
            <ul class="new-last" v-if="data.list!=''">
                <li v-for="item in data.list">
                     <Row>
                        <Col span="18">
                            <router-link :to="{ path: '/InforMation/KnowledgeDetail', query: { 'id': item.informationDetailId }}"><p class="h4 ell mb20">{{ item.title }}</p></router-link>
                            <Row type="flex" align="middle">
                                <Col span="20">
                                  <Row type="flex" align="middle">
                                    <Col span="4">
                                      <Tag type="border" color="green">{{item.docType}}</Tag>
                                    </Col>
                                    <Col span="16">
                                      <p class="ell pr10">{{item.label}}</p>
                                    </Col>
                                    <Col span="4">
                                      <span class="main-time">{{item.createTime  | filterFun  }}</span>
                                    </Col>
                                  </Row>
                                </Col>
                                <Col span="4" class="tr">
                                    <Icon type="share" style="font-size: 22px"></Icon>
                                    &nbsp; &nbsp;
                                    <Icon type="ios-chatbubble-outline" style="font-size: 22px">
                                    </Icon>
                                    <span>{{item.commentNum | filterFunion }}</span>
                                </Col>
                            </Row>
                        </Col>
                        <Col span="4" offset="2">
                          <img src="../../img/news-img.png" alt="" width="100%">
                        </Col>
                    </Row>
                </li>
            </ul>
            <ul class="new-last" v-else>
                <li class="new-last1" style="position: relative">
                    <h3>无搜索结果！</h3>
                </li>
            </ul>
            <div class="mt20 mb20">
              <Page :total="data.total" :page-size="pageSize" show-total :current="currentPage" @on-change="nextPage"></Page>
            </div>
          </Col>
          <Col span="5" offset="1" class="xg-content">
            <h3 class="hd">相关应用</h3>
            <Row>
              <Col span="8">
                <div class="tc pd5">
                  <img src="../../img/xgyy-icon1.png" />
                  <p>物种百科</p>
                </div>
              </Col>
              <Col span="8">
                <div class="tc pd5">
                  <img src="../../img/xgyy-icon2.png" />
                  <p>物种资讯</p>
                </div>
              </Col>
            </Row>

            <h3 class="hd">相关专家</h3>
            <Row>
              <Col span="8">
                <div class="tc pd5">
                  <img src="http://www.ns51.cn/upload/userimg/experts/hbxy/%E7%99%BD%E6%A1%82%E8%90%8D.jpg" />
                  <p>白桂萍</p>
                </div>
              </Col>
              <Col span="8">
                <div class="tc pd5">
                  <img src="http://www.ns51.cn/upload/userimg/experts/hbxy/%E4%BB%98%E6%B8%85%E8%8F%8A.jpg" />
                  <p>付清菊</p>
                </div>
              </Col>
              <Col span="8">
                <div class="tc pd5">
                  <img src="http://www.ns51.cn/upload/userimg/experts/hbxy/%E6%A2%81%E6%B8%85%E5%BF%97.jpg" />
                  <p>梁清志</p>
                </div>
              </Col>
              <Col span="8">
                <div class="tc pd5">
                  <img src="http://www.ns51.cn/upload/userimg/experts/hbaas/%E6%9D%A8%E8%87%AA%E6%96%87.jpg" />
                  <p>杨自文</p>
                </div>
              </Col>
            </Row>

            <h3 class="hd">相关企业</h3>
            <Row>
              <Col span="8">
                <div class="tc pd5">
                  <img src="../../img/xgqy-icon1.png" />
                  <p>58同城</p>
                </div>
              </Col>
              <Col span="8">
                <div class="tc pd5">
                  <img src="../../img/xgqy-icon2.png" />
                  <p>智联招聘</p>
                </div>
              </Col>
            </Row>

            <h3 class="hd">相关搜索</h3>
            <Row>
              <Col span="8">
                <div class="tc pd5">
                  <img src="../../img/xgss-icon1.png" />
                  <p>水稻收割机</p>
                </div>
              </Col>
            </Row>

          </Col>
      </Row>
  </div>
</template>
<script>
import api from "~api";
import moment from 'moment';
export default {
  created() {
    /*this.fetchData();*/
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      data: [],
      portal: ""
    };
  },
  props: ["data"],
  filters: {
        filterFun: function (value) {
            return moment(value).format("YYYY-MM-DD")
        },
      filterFunion: function (value) {
          if(!value){
              return 0;
          }
      }
    },
  methods: {
    /* fetchData: function () {
             this.list = []
             axios.get(this.$url.api + '/knowLege/findKnowLedgeTitle/' + this.currentPage + "?title=" + this.$route.query.title)
                 .then(response => {

                     this.list = response.data

                 }).catch(function (error) {
                 console.log(error)
             })
         },*/
    nextPage(val) {
      this.currentPage = val;
      this.list = [];
      api
        .get(
          "/knowLege/findKnowLedgeTitle/" +
            this.currentPage +
            "?title=" +
            this.$route.query.title +
            "&pageSize=" +
            this.pageSize
        )
        .then(response => {
          this.data = response.data
        });
    },

    routeTo(e) {
      if (e == "/portal") {
        this.portal =
         this.$url.shop + "/center/gateway.htm?uid=" +
          this.loginuserinfo.uniqueId;
        window.open(this.portal);
      } else {
        this.$router.push(e);
      }
    }
  }
};
</script>
