<template>
  <div class="company-auth-5 mt5">
    <vui-affix-tabs :data="tabsData">
       <div class="pd20">
          <section id="privateInformation" v-if="tabsList.privateInformation">
              <Title title="隐私信息"></Title>
              <private-information ref="privateInformation" @on-submit="handleGetSubmit"></private-information>
          </section>
          <section id="networkInformation" v-if="tabsList.networkInformation">
              <Title title="网络信息"></Title>
              <network-information ref="networkInformation" @on-submit="handleGetSubmit"></network-information>
          </section>
          <section id="education" v-if="tabsList.education">
              <Title title="教育经历"></Title>
              <education ref="education" @on-submit="handleGetSubmit"></education>
          </section>
          <section id="work" v-if="tabsList.work">
              <Title title="工作经历"></Title>
              <work ref="work" @on-submit="handleGetSubmit"></work>
          </section>
          <section id="policy" v-if="tabsList.policy">
              <Title title="政治面貌"></Title>
              <policyInfo ref="policy" @on-submit="handleGetSubmit"></policyInfo>
          </section>
          <section id="religion" v-if="tabsList.religion">
              <Title title="宗教信仰"></Title>
              <religionInfo ref="religion" @on-submit="handleGetSubmit"></religionInfo>
          </section>
          <section id="professionalInformation" v-if="tabsList.professionalInformation">
              <Title title="专业信息"></Title>
              <professional-information ref="professionalInformation" @on-submit="handleGetSubmit"></professional-information>
          </section>
          <section id="corpHonor" v-if="tabsList.corpHonor">
              <Title title="荣誉风采"></Title>
              <corp-honor ref="corpHonor" @on-submit="handleGetSubmit"></corp-honor>
          </section>
          <section id="house"  v-if="tabsList.house">
              <Title title="房屋生活情况"></Title>
              <house ref="house" @on-submit="handleGetSubmit"></house>
          </section>
          <section id="modern" v-if="tabsList.modern">
              <Title title="家庭现代化情况"></Title>
              <modern ref="modern" :isAdd="false" @on-submit="handleGetSubmit"></modern>
          </section>
          <section id="department" v-if="tabsList.department">
              <Title title="组织机构"></Title>
              <department ref="department"></department>
          </section>
          <section id="team" v-if="tabsList.team">
              <Title title="管理团队"></Title>
              <team ref="team" @on-submit="handleGetSubmit"></team>
          </section>
          <section id="survey" v-if="tabsList.survey">
              <Title title="经营概况"></Title>
              <survey ref="survey" @on-submit="handleGetSubmit"></survey>
          </section>
          <section id="assetFinance"  v-if="tabsList.assetFinance">
              <Title title="财务信息"></Title>
              <asset-finance ref="assetFinance" @on-submit="handleGetSubmit"></asset-finance>
          </section>
          <section id="productService" v-if="tabsList.productService">
              <Title title="产品&服务"></Title>
              <product-service ref="productService" @on-submit="handleGetSubmit"></product-service>
          </section>
          <section id="qualification" v-if="tabsList.qualification">
              <Title title="专业资质"></Title>
              <qualification ref="qualification" @on-submit="handleGetSubmit"></qualification>
          </section>
            <section id="commonAssets"  v-if="tabsList.commonAssets">
                <Title title="普通资产"></Title>
                <common-assets ref="commonAssets" @on-submit="handleGetSubmit"></common-assets>
            </section>
            <section id="intangibleAssets"  v-if="tabsList.intangibleAssets">
                <Title title="无形资产"></Title>
                <intangible-assets ref="intangibleAssets" @on-submit="handleGetSubmit"></intangible-assets>
            </section>
            <section id="facilityAssets"  v-if="tabsList.facilityAssets">
                <Title title="设施资产"></Title>
                <facility-assets ref="facilityAssets" @on-submit="handleGetSubmit"></facility-assets>
            </section>
            <section id="placeOfBusiness"  v-if="tabsList.placeOfBusiness">
                <Title title="经营场所"></Title>
                <place-of-business ref="placeOfBusiness" @on-submit="handleGetSubmit"></place-of-business>
            </section>
            <section id="overViewInfo"   v-if="tabsList.overViewInfo">
                <Title title="概览信息"></Title>
                <editor ref="overViewInfo" @on-submit="handleGetSubmit"></editor>
            </section>
       </div>
       <div class="tc pd20">
         <Button type="primary" id="markup-1" @click="handleClickBack">上一步</Button>
         <Button type="primary" id="markup-1" @click="handleClicNext">下一步</Button>
         <Button type="text" id="markup-1" @click="handleJump">跳过</Button>
       </div>
    </vui-affix-tabs>
      <Button type="warning" :style="style" @click="handlePreview">预<br>览</Button>
      <preview ref="preview"></preview>
  </div>
</template>
<script>
import Title from './title'
import VuiAffixTabs from './vui-affix-tabs'
import education from './education'
import privateInformation from './privateInformation'
import networkInformation from './networkInformation'
import work from './work'
import policyInfo from './policy'
import religionInfo from './religion'
import survey from './survey'
import team from './team'
import professionalInformation from './professionalInformation'
import corpHonor from './corpHonor'
import qualification from './proQualification'
import productService from './productService'
import assetFinance from './assetFinance'
import house from '../../farmFamily/house'
import modern from '../../farmFamily/modern'
import department from './department'
import commonAssets from './commonAssets'
import intangibleAssets from './intangibleAssets'
import facilityAssets from './facilityAssets'
import placeOfBusiness from './placeOfBusiness'
import preview from './preview'
import editor from './editor'

export default {
  components: {
    VuiAffixTabs,
    Title,
    education,
    privateInformation,
    networkInformation,
    work,
    policyInfo,
    religionInfo,
    house,
    modern,
    team,
    assetFinance,
    productService,
    corpHonor,
    qualification,
    professionalInformation,
    survey,
    department,
    commonAssets,
    intangibleAssets,
    facilityAssets,
    placeOfBusiness,
    preview,
    editor
  },
  data() {
    return {
      account: '',
      isNext: true,
      showTab: [],
      tabsData: [],
      tabsList: {},
      style: {},
      loginUser: JSON.parse(sessionStorage.getItem('user'))
    }
  },
  created() {
    this.account = this.loginUser.loginAccount
    this.getModel()
    this.queryConfig()
  },
  methods: {
    // 取按钮位置
    getPosition () {
      return {
        position: 'fixed',
        top: `${(window.innerHeight - 170) / 2}px`,
        left: `${(window.innerWidth - 1200) / 2 + 1200 - 8}px`,
        padding: '10px'
      }
    },
     //点击预览
    handlePreview(){
      console.log( 'preview',this.$refs['preview'])
      this.$refs['preview'].more = true
    },
    // 初始化获取数据
    getModel() {
      this.$api
        .post('/member/perfectInfo/findPerfectInfo ', { account: this.account })
        .then(response => {
          console.log(response);
          if (response.code == 200) {
            // 这个判断里面写了所有取数据的，但是当此用户类型没有这个模块的时候就不会返回这个key的数据，
            // 所以要先判断key是否存在，再根据各个模块数据类型的不同判断，里面是否有值，如果有值，就取值了之后，赋值给当前模块
            var data = response.data;
            //隐私信息
            if (
              data.privateInformation &&
              Object.keys(data.privateInformation).length &&
              this.$refs['privateInformation']
            ) {
              // 如果有数据说明之前已经保存过，不管是保存的是否是空数据，都已经有数据格式了
              this.$refs['privateInformation'].getData(data.privateInformation);
            }
            //网络信息networkInformation
            if (
              data.networkInformation &&
              Object.keys(data.networkInformation).length &&
              this.$refs['networkInformation']
            ) {
              this.$refs['networkInformation'].getData(data.networkInformation);
            }
            //教育经历 education
            if (
              data.education &&
              data.education.length &&
              this.$refs['education']
            ) {
              this.$refs['education'].getData(data.education);
            }
            //工作经历 work
            if (data.work && data.work.length && this.$refs['work']) {
              this.$refs['work'].getData(data.work);
            }
            //政治面貌 policyInfo
            if (
              data.policy &&
              Object.keys(data.policy).length &&
              this.$refs['policy']
            ) {
              this.$refs['policy'].getData(data.policy);
            }
            //宗教信仰
            if (
              data.religion &&
              Object.keys(data.religion).length &&
              this.$refs['religion']
            ) {
              this.$refs['religion'].getData(data.religion);
            }
            //专业信息 professionalInformation
            if (
              data.professionalInformation &&
              Object.keys(data.professionalInformation).length &&
              this.$refs['professionalInformation']
            ) {
              this.$refs['professionalInformation'].getData(
                data.professionalInformation
              );
            }
            //荣誉风采 corpHonor
            if (
              data.corpHonor &&
              data.corpHonor.length &&
              this.$refs['corpHonor']
            ) {
              this.$refs['corpHonor'].getData(data.corpHonor);
            }
            //房屋生活情况 house
            if (data.house && data.house.length && this.$refs['house']) {
              this.$refs['house'].getData(data.house);
            }
            //家庭现代化情况  modern
            if (data.modern && data.modern.length && this.$refs['modern']) {
              this.$refs['modern'].getData(data.modern);
            }
            //团队管理  team
            if (data.team && data.team.length && this.$refs['team']) {
              this.$refs['team'].getData(data.team);
            }
            //survey 经营概况
            if (
              data.survey &&
              Object.keys(data.survey).length &&
              this.$refs['survey']
            ) {
              this.$refs['survey'].getData(data.survey);
            }
            //finance 财务管理
            if (
              data.assetFinance &&
              Object.keys(data.assetFinance).length &&
              this.$refs['assetFinance']
            ) {
              this.$refs['assetFinance'].getData(data.assetFinance);
            }
            // 普通资产
            if (
              data.commonAssets &&
              data.commonAssets.length &&
              this.$refs["commonAssets"]
            ) {
              this.$refs["commonAssets"].getData(data.commonAssets);
            }
             // 无形资产
            if (
              data.intangibleAssets &&
              data.intangibleAssets.length &&
              this.$refs["intangibleAssets"]
            ) {
              this.$refs["intangibleAssets"].getData(data.intangibleAssets);
            }
            // 设施资产
            if (
              data.facilityAssets &&
              data.facilityAssets.length &&
              this.$refs["facilityAssets"]
            ) {
                console.log('data.facilityAssets',data.facilityAssets)
              this.$refs["facilityAssets"].getData(data.facilityAssets);
            }
            // 经营场所
            if (
              data.placeOfBusiness &&
              data.placeOfBusiness.length &&
              this.$refs["placeOfBusiness"]
            ) {
              this.$refs["placeOfBusiness"].getData(data.placeOfBusiness);
            }
            //产品服务 productService
            if (
              data.productService &&
              data.productService.length &&
              this.$refs['productService']
            ) {
              this.$refs['productService'].getData(data.productService);
            }
            //专业资质 qualification
            if (
              data.qualification &&
              data.qualification.length &&
              this.$refs['qualification']
            ) {
              this.$refs['qualification'].getData(data.qualification);
            }
             //概览信息 overviewInfo
            if (
              data.overViewInfo &&
              data.overViewInfo.length &&
              this.$refs['overViewInfo']
            ) {
              this.$refs['overViewInfo'].getData(data.overViewInfo);
            }
          }
        });
    },
    // 查询用户角色配置的表单信息
    queryConfig() {
      this.$api
        .post('/member/perfectInfo/findSysUserInfo', {
          account: this.loginUser.loginAccount
        })
        .then(response => {
          if (response.code === 200) {
            this.tabsData = response.data.tabsData;
            // 处理表单是否显示
            let arr = [];
            this.tabsData.forEach(item => arr.push(item.name));
            arr.forEach(item => (this.tabsList[item] = true));
            console.log(this.tabsList);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //上一步
    handleClickBack() {
      this.$emit('on-back');
    },
    // 下一步
    handleClicNext() {
      var list = { account: this.account };
      this.tabsData.forEach(element => {
        var corpInfo = element.name;
        // department 单独保存不取数据
        if (corpInfo != 'department') {
          // 物种必填，测试时物种取不到数据，不做验证
          this.$refs[corpInfo].handleSubmit();
          list[corpInfo] = this.$refs[corpInfo].data;
        }
      });
      if (this.isNext) {
        this.handleSave(list);
      } else {
        this.isNext = true;
        this.$Message.error('请核对输入信息');
      }
    },
    handleSave(data) {
      this.$api
        .post('/member/perfectInfo/savePerfectInfo', data)
        .then(response => {
          if (response.code == 200) {
            var user = JSON.parse(sessionStorage.getItem('user'));
            if (data.privateInformation) {
              user.avatar = data.privateInformation.avatar;
              if (user.avatar) {
                sessionStorage.setItem('user', JSON.stringify(user));
              }
            }
            this.$emit('on-next');
          } else {
            this.$Message.error('保存失败！');
          }
        });
    },
    //判断表单验证是否通过，通过会返回true，不通过会返回false，不通过才给isNext赋值，然后根据isNext是否为真判断调
    handleGetSubmit(e) {
      if (!e) {
        this.isNext = e;
      }
    },
    //跳过
    handleJump() {
      this.$emit('on-jump');
    }
  },
  mounted() {
    this.style = this.getPosition()
    window.onresize = () => {
      this.style = this.getPosition()
    }
  }
};
</script>
