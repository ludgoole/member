<template>
    <div>
        <div v-if="listShow" style="width: 100% ;height: 100%">
            <Row>
                <Col span="9">
                结果排序：
                <ButtonGroup>
                    <Button type="ghost" @click="varieteyUp">时间升序</Button>
                    <Button type="ghost" @click="varieteyDown">时间降序</Button>
                </ButtonGroup>
                </Col>
                <Col span="9">
                <Form :model="varieteyForm" :label-width="100">
                    <FormItem label="关键字：">
                        <Row>
                            <Col span="22">
                            <Input v-model="varieteyForm.keywords" placeholder="请输入内容"/>
                            </Col>
                        </Row>
                    </FormItem>
                </Form>
                </Col>
                <Col span="2">
                <ButtonGroup>
                    <Button type="ghost" @click="varieteySearch">查找</Button>
                </ButtonGroup>
                </Col>
                <Col span="4">
                <ButtonGroup>
                    <Button type="ghost" @click="addSpec2">新增品种</Button>
                </ButtonGroup>
                </Col>
            </Row>

            <Row style="margin: 10px;">
                <ul>
                    <li v-for="varietey in varieteyList">
                        <div class="listDemo">
                            <template v-if="varietey.ficon.length >0 "><img :src="varietey.ficon[0]"
                                                                            width="200px"
                                                                            height="200px"/>
                            </template>
                            <template v-else><img src="../../../img/noPic.png" width="200px"
                                                  height="200px"/></template>
                            <div class="species-tool pd10 clear">
                                <p class="p1 clear">
                                    {{varietey.fname}}
                                    <span class="fr t-green">已通过</span>
                                </p>
                                <p class="p2 mt10 mb10">{{varietey.fvarietyorigin}}</p>
                                <p class="p3"><a href="javascript:void(0)"
                                                 @click="editVarietey(varietey.indexid)"><span>编辑</span></a><a
                                        href="javascript:void(0)"
                                        @click="delVarietey(varietey.indexid)"><span>删除</span></a><a
                                        href="#"><span>图库</span></a></p>
                            </div>
                        </div>
                    </li>
                </ul>


                <div style="float:right;margin-top: 250px">
                    <Page :total="varieteyTotal" :current="varieteyCurrentPage"
                          :page-size="varieteyPageSize" @on-change="varieteyPageChange"
                          show-total></Page>
                </div>
                <!-- 品种弹框-->
                <Modal v-model="editVarieteyModal" title="品种编辑" width="1000"
                       @on-ok="updateVarietey"
                       @on-cancel="editCancel">
                    <div align="left"
                         style="margin-top: 5%;margin-left: 20%;margin-right: 20%">
                        <Form :model="editVarieteyForm" :label-width="120"
                              label-position="right" ref="editVarieteyForm"
                              :rules="editVarieteyRules">
                            <FormItem label="品种名称：" prop="fname">
                                <Input v-model="editVarieteyForm.fname"
                                       placeholder="请输入内容"
                                       @on-change="getEditPinyin"  ></Input>
                            </FormItem>
                            <FormItem label="汉语拼音：" prop="fpinyin">
                                <Input v-model="editVarieteyForm.fpinyin"
                                       placeholder="由品种名称自动生成拼音"></Input>
                            </FormItem>
                            <FormItem label="品种类型：" prop="fvarietykind">
                                <Input v-model="editVarieteyForm.fvarietykind"
                                       placeholder="请输入内容"></Input>
                            </FormItem>
                            <FormItem label="品种来源：" prop="fvarietyorigin">
                                <Input v-model="editVarieteyForm.fvarietyorigin"
                                       type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}"
                                       placeholder="请输入..."></Input>
                            </FormItem>
                            <FormItem label="选育单位：" prop="fbreedingunit">
                                <Input v-model="editVarieteyForm.fbreedingunit"
                                       placeholder="请输入内容"></Input>
                            </FormItem>
                            <FormItem label="是否转基因：" prop="fistransgene">
                                <RadioGroup v-model="editVarieteyForm.fistransgene">
                                    <Radio label=1>是</Radio>
                                    <Radio label=0>否</Radio>
                                </RadioGroup>
                            </FormItem>
                            <FormItem label="申请日：" prop="fapplydate">
                                <DatePicker type="date" placeholder="选择日期"
                                            v-model="editVarieteyForm.fapplydate"></DatePicker>
                            </FormItem>
                            <FormItem label="申请号：" prop="fapplynumber">
                                <Input v-model="editVarieteyForm.fapplynumber"
                                       placeholder="请输入内容"></Input>
                            </FormItem>
                            <FormItem label="申请公告日：" prop="fapplyannouncedate">
                                <DatePicker type="date" placeholder="选择日期"
                                            v-model="editVarieteyForm.fapplyannouncedate"></DatePicker>
                            </FormItem>
                            <FormItem label="申请公告号：" prop="fapplyannouncenumber">
                                <Input v-model="editVarieteyForm.fapplyannouncenumber"
                                       placeholder="请输入内容"
                                       v></Input>
                            </FormItem>
                            <FormItem label="授权日：" prop="fauthdate">
                                <DatePicker type="date" placeholder="选择日期"
                                            v-model="editVarieteyForm.fauthdate"></DatePicker>
                            </FormItem>
                            <FormItem label="授权号：" prop="fauthnumber">
                                <Input v-model="editVarieteyForm.fauthnumber"
                                       placeholder="请输入内容"></Input>
                            </FormItem>
                            <FormItem label="授权公告日：" prop="fauthannouncedate">
                                <DatePicker type="date" placeholder="选择日期"
                                            v-model="editVarieteyForm.fauthannouncedate"></DatePicker>
                            </FormItem>
                            <FormItem label="授权公告号：" prop="fauthannouncenumber">
                                <Input v-model="editVarieteyForm.fauthannouncenumber"
                                       placeholder="请输入内容"></Input>
                            </FormItem>
                            <FormItem label="培育人：" prop="fgrowpeople">
                                <Input v-model="editVarieteyForm.fgrowpeople"
                                       placeholder="请输入内容"></Input>
                            </FormItem>
                            <FormItem label="品种权(申请)人：" prop="fvarietyowner">
                                <Input v-model="editVarieteyForm.fvarietyowner"
                                       placeholder="请输入内容"></Input>
                            </FormItem>
                            <FormItem label="品种权审定编号：" prop="fvarietyapprnum">
                                <Input v-model="editVarieteyForm.fvarietyapprnum"
                                       placeholder="请输入内容"></Input>
                            </FormItem>
                            <FormItem label="审定年份：" prop="fvarietyapprdate">
                                <DatePicker type="year"
                                            v-model="editVarieteyForm.fvarietyapprdate"></DatePicker>
                            </FormItem>
                            <FormItem label="审定单位：" prop="fvarietyapprunit">
                                <Input v-model="editVarieteyForm.fvarietyapprunit"
                                       placeholder="请输入内容"></Input>
                            </FormItem>
                            <FormItem label="特征特性：" prop="ffeature">
                                <Input v-model="editVarieteyForm.ffeature"
                                       placeholder="请输入内容"></Input>
                            </FormItem>
                            <FormItem label="产量：" prop="foutput">
                                <Input v-model="editVarieteyForm.foutput"
                                       placeholder="请输入内容"></Input>
                            </FormItem>
                            <FormItem label="栽培技术：" prop="fgrowteachology">
                                <Input v-model="editVarieteyForm.fgrowteachology"
                                       placeholder="请输入内容"></Input>
                            </FormItem>
                            <FormItem label="适宜种植地区：" prop="fsuiteplatearea">
                                <Input v-model="editVarieteyForm.fsuiteplatearea"
                                       placeholder="请输入内容"></Input>
                            </FormItem>
                            <FormItem label="推广现状     ：" prop="fvarietyrecommand">
                                <Input v-model="editVarieteyForm.fvarietyrecommand"
                                       placeholder="请输入内容"></Input>
                            </FormItem>
                            <FormItem label="上传图标：">
                                <div>
                                    <template v-if="editVarieteyForm.ficon.length>0">
                                        <div class="demo-upload-list"
                                             v-for="item in editVarieteyForm.ficon">
                                            <img :src="item">
                                            <div class="demo-upload-list-cover">
                                                <Icon type="ios-trash-outline"
                                                      @click.native="handleRemove3(item)"></Icon>
                                            </div>
                                        </div>
                                    </template>
                                </div>

                                 <Upload ref="upload3" :show-upload-list="false"
                                        name="upfile"
                                        :format="['jpg', 'png']"
                                        :max-size="2048"
                                        multiple
                                        :on-success="handleSuccess3"
                                        :before-upload="handleBeforeUpload3"
                                        type="drag"
                                        :action="action"
                                        style="display: inline-block;width:140px;">
                                    <div class="upload-add-div">
                                        <Icon type="plus-circled" color="#51ad79" :size="32"></Icon>
                                        <p class="mb5">点击添加图片</p>
                                        <p class="t-grey">支持jpg/png格式</p>
                                        <p class="t-grey">不超过2M</p>
                                    </div>
                                </Upload>

                                <div class="upload-add-div photo-selector" @click="handlePhotoSelectorModal('identityPhoto3')">
                                    <Icon type="plus-circled" color="#51ad79" :size="32"></Icon>
                                    <p class="mb5">从文件管理导入</p>
                                    <p class="t-grey">支持jpg/png格式</p>
                                    <p class="t-grey">不超过2M</p>
                                </div>
                            </FormItem>
                            <FormItem label="详细图片：">

                                <div>
                                    <template v-if="editVarieteyForm.image.length>0">
                                        <div class="demo-upload-list"
                                             v-for="item in editVarieteyForm.image">
                                            <img :src="item">
                                            <div class="demo-upload-list-cover">
                                                <Icon type="ios-trash-outline"
                                                      @click.native="handleRemove4(item)"></Icon>
                                            </div>
                                        </div>
                                    </template>
                                </div>

                                 <Upload ref="upload4" :show-upload-list="false"
                                        name="upfile"
                                        :format="['jpg', 'png']"
                                        :max-size="2048"
                                        multiple
                                        :on-success="handleSuccess4"
                                        :before-upload="handleBeforeUpload4"
                                        type="drag"
                                        :action="action"
                                        style="display: inline-block;width:140px;">
                                    <div class="upload-add-div">
                                        <Icon type="plus-circled" color="#51ad79" :size="32"></Icon>
                                        <p class="mb5">点击添加图片</p>
                                        <p class="t-grey">支持jpg/png格式</p>
                                        <p class="t-grey">不超过2M</p>
                                    </div>
                                </Upload>

                                <div class="upload-add-div photo-selector" @click="handlePhotoSelectorModal('identityPhoto4')">
                                    <Icon type="plus-circled" color="#51ad79" :size="32"></Icon>
                                    <p class="mb5">从文件管理导入</p>
                                    <p class="t-grey">支持jpg/png格式</p>
                                    <p class="t-grey">不超过2M</p>
                                </div>
                            </FormItem>
                        </Form>
                    </div>
                </Modal>
            </Row>
        </div>
        <Col v-if="addShow" span="24">
        <div class="two-step">
            <Steps :current="currentStep">
                <Step title="品种基本信息"></Step>
                <Step title="提交审核"></Step>
            </Steps>
        </div>
        <div><p class="mt20 tc">请输入新品种名称</p></div>
        <div align="left" class="mt20">

            <Form :model="formItem" :label-width="140" label-position="right" ref="formItem"
                  :rules="formItemRules" class="mr40 ml40">
                <Row>
                    <Col span="12">
                    <FormItem label="物种名称：" prop="speciesid">
                        <Input v-model="formItem.specName"
                               placeholder="请输入内容" readonly @on-focus="handleFilterModal('speciFilter') "></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="品种名称：" prop="fname">
                        <Input v-model="formItem.fname" placeholder="请输入内容"
                               @on-change="getAddPinyin" @on-blur="checkAddFname"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="汉语拼音：" prop="fpinyin">
                        <Input v-model="formItem.fpinyin"
                               placeholder="由品种名称自动生成拼音"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="品种类型：" prop="fvarietykind">
                        <Input v-model="formItem.fvarietykind" placeholder="请输入内容"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="选育单位：" prop="fbreedingunit">
                        <Input v-model="formItem.fbreedingunit" placeholder="请输入内容"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="是否转基因：" prop="fistransgene">
                        <RadioGroup v-model="formItem.fistransgene">
                            <Radio label=1>是</Radio>
                            <Radio label=0>否</Radio>
                        </RadioGroup>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="申请日：" prop="fapplydate">
                        <DatePicker type="date" placeholder="选择日期"
                                    v-model="formItem.fapplydate" class="date-wid24"></DatePicker>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="申请号：" prop="fapplynumber">
                        <Input v-model="formItem.fapplynumber" placeholder="请输入内容"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="申请公告日：" prop="fapplyannouncedate">
                        <DatePicker class="date-wid24" type="date" placeholder="选择日期"
                                    v-model="formItem.fapplyannouncedate"></DatePicker>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="申请公告号：" prop="fapplyannouncenumber">
                        <Input v-model="formItem.fapplyannouncenumber" placeholder="请输入内容"
                               v></Input>
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                    <FormItem label="授权日：" prop="fauthdate">
                        <DatePicker class="date-wid24" type="date" placeholder="选择日期"
                                    v-model="formItem.fauthdate"></DatePicker>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="授权号：" prop="fauthnumber">
                        <Input v-model="formItem.fauthnumber" placeholder="请输入内容"></Input>
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                    <FormItem label="授权公告日：" prop="fauthannouncedate">
                        <DatePicker class="date-wid24" type="date" placeholder="选择日期"
                                    v-model="formItem.fauthannouncedate"></DatePicker>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="授权公告号：" prop="fauthannouncenumber">
                        <Input v-model="formItem.fauthannouncenumber" placeholder="请输入内容"></Input>
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                    <FormItem label="培育人：" prop="fgrowpeople">
                        <Input v-model="formItem.fgrowpeople"
                               placeholder="请输入内容"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="品种权(申请)人：" prop="fvarietyowner">
                        <Input v-model="formItem.fvarietyowner" placeholder="请输入内容"></Input>
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                    <FormItem label="品种权审定编号：" prop="fvarietyapprnum">
                        <Input v-model="formItem.fvarietyapprnum" placeholder="请输入内容"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="审定年份：" prop="fvarietyapprdate">
                        <DatePicker class="date-wid24" type="year" v-model="formItem.fvarietyapprdate"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                    <FormItem label="审定单位：" prop="fvarietyapprunit">
                        <Input v-model="formItem.fvarietyapprunit" placeholder="请输入内容"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="特征特性：" prop="ffeature">
                        <Input v-model="formItem.ffeature" placeholder="请输入内容"></Input>
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                    <FormItem label="产量：" prop="foutput">
                        <Input v-model="formItem.foutput" placeholder="请输入内容"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="栽培技术：" prop="fgrowteachology">
                        <Input v-model="formItem.fgrowteachology" placeholder="请输入内容"></Input>
                    </FormItem>
                    </Col>

                    <Col span="12">
                    <FormItem label="适宜种植地区：" prop="fsuiteplatearea">
                        <Input v-model="formItem.fsuiteplatearea" placeholder="请输入内容"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="推广现状     ：" prop="fvarietyrecommand">
                        <Input v-model="formItem.fvarietyrecommand"
                               placeholder="请输入内容"></Input>
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="24">
                    <FormItem label="品种来源：" prop="fvarietyorigin">
                        <Input v-model="formItem.fvarietyorigin" type="textarea"
                               :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                    <FormItem label="上传图标：">
                        <div>
                            <template v-if="formItem.ficon.length>0">
                                <div class="demo-upload-list"
                                     v-for="item in formItem.ficon">
                                    <img :src="item">
                                    <div class="demo-upload-list-cover">
                                        <Icon type="ios-trash-outline"
                                              @click.native="handleRemove1(item)"></Icon>
                                    </div>
                                </div>
                            </template>
                        </div>

                         <Upload ref="upload1" :show-upload-list="false"
                                name="upfile"
                                :format="['jpg', 'png']"
                                :max-size="2048"
                                multiple
                                :on-success="handleSuccess1"
                                :before-upload="handleBeforeUpload1"
                                type="drag"
                                :action="action"
                                style="display: inline-block;width:140px;">
                            <div class="upload-add-div">
                                <Icon type="plus-circled" color="#51ad79" :size="32"></Icon>
                                <p class="mb5">点击添加图片</p>
                                <p class="t-grey">支持jpg/png格式</p>
                                <p class="t-grey">不超过2M</p>
                            </div>
                        </Upload>

                        <div class="upload-add-div photo-selector" @click="handlePhotoSelectorModal('identityPhoto')">
                            <Icon type="plus-circled" color="#51ad79" :size="32"></Icon>
                            <p class="mb5">从文件管理导入</p>
                            <p class="t-grey">支持jpg/png格式</p>
                            <p class="t-grey">不超过2M</p>
                        </div>

                    </FormItem>
                    </Col>
                    <Col span="24">
                    <FormItem label="详细图片：">

                        <div>
                            <template v-if="formItem.image.length>0">
                                <div class="demo-upload-list"
                                     v-for="item in formItem.image">
                                    <img :src="item">
                                    <div class="demo-upload-list-cover">
                                        <Icon type="ios-trash-outline"
                                              @click.native="handleRemove2(item)"></Icon>
                                    </div>
                                </div>
                            </template>
                        </div>

                         <Upload ref="upload2" :show-upload-list="false"
                                name="upfile"
                                :format="['jpg', 'png']"
                                :max-size="2048"
                                multiple
                                :on-success="handleSuccess2"
                                :before-upload="handleBeforeUpload2"
                                type="drag"
                                :action="action"
                                style="display: inline-block;width:140px;">
                            <div class="upload-add-div">
                                <Icon type="plus-circled" color="#51ad79" :size="32"></Icon>
                                <p class="mb5">点击添加图片</p>
                                <p class="t-grey">支持jpg/png格式</p>
                                <p class="t-grey">不超过2M</p>
                            </div>
                        </Upload>

                        <div class="upload-add-div photo-selector" @click="handlePhotoSelectorModal('identityPhoto2')">
                            <Icon type="plus-circled" color="#51ad79" :size="32"></Icon>
                            <p class="mb5">从文件管理导入</p>
                            <p class="t-grey">支持jpg/png格式</p>
                            <p class="t-grey">不超过2M</p>
                        </div>
                    </FormItem>
                    </Col>
                </Row>

            </Form>
        </div>
        <div align="center" class="mb30">
            <Button class="ivu-btn-primary" type="ghost" @click="completeForm()">完成</Button>
            <Button type="ghost" @click="exitAdd">取消</Button>
        </div>
        </Col>
        <Col v-if="addFinsihedShow" span="24">
        <div class="two-step">
            <Steps :current="currentStep">
                <Step title="品种基本信息"></Step>
                <Step title="提交审核"></Step>
            </Steps>
        </div>
        <div><p class="mt20 tc">请输入新品种名称</p></div>

        <div align="center" class="tipcomit">
            <h2>您已提交新的品种信息，审核工作将在<strong>三个工作日</strong>内完成，请耐心等待</h2>
        </div>
        <div align="center" style="margin-top: 5%">
            <Button type="primary" @click="complete">完成</Button>
        </div>
        </Col>

        <!-- 照片选择 -->
        <photoSelector 
        ref="identityPhoto" 
        :photoAlbum="l"
        @on-change="albumChange"
        @on-get-result="handleGetPhotoResult"
        :resultDatas="p"
        />

        <photoSelector 
        ref="identityPhoto2" 
        :photoAlbum="l2"
        @on-change="albumChange2"
        @on-get-result="handleGetPhotoResult2"
        :resultDatas="p2"
        />

        <photoSelector 
        ref="identityPhoto3" 
        :photoAlbum="l3"
        @on-change="albumChange3"
        @on-get-result="handleGetPhotoResult3"
        :resultDatas="p3"
        :transfer="true"
        />

        <photoSelector 
        ref="identityPhoto4" 
        :photoAlbum="l4"
        @on-change="albumChange4"
        @on-get-result="handleGetPhotoResult4"
        :resultDatas="p4"
        :transfer="true"
        />

        <!-- 相关物种 -->
        <vui-filter
                ref="speciFilter"
                :cols="2"
                :pageShow="true"
                :total="total"
                :pageCur="pageCur"
                :classifyDatas="speciClassifyDatas"
                :resultDatas="speciResultDatas"
                :load-data="loadSpeciDatas"
                @on-search="handleSpeciSearch"
                @on-get-classify="handleGetSpeciClassify"
                @on-get-result="handleGetSpeciResult"
                @on-page-change="handleSpeciPageChange"/>
    </div>


</template>

<script>
    import wiki from '../../../api/wikiapi'
    import vuiFilter from '~components/vuiFilter/filter'
    import api from '~src/api'
    import photoSelector from '~components/photoSelector'

    export default {
        components: {
            vuiFilter,
            photoSelector
        },

        data() {
            return {
                speciClassifyDatas: [{
                    label: '动物',
                    value: '0',
                    classId: '',
                    loading: false,
                    checked: false,
                    children: []
                }, {
                    label: '植物',
                    value: '1',
                    classId: '',
                    loading: false,
                    checked: false,
                    children: []
                }],
                speciResultDatas: [],
                listShow: true,
                addShow: false,
                addFinsihedShow: false,
                action: `${this.$url.upload}/upload/up`,
                selectedSpe: [],
                // 品种分页
                varieteyTotal: 0,
                varieteyCurrentPage: 1,
                varieteyPageSize: 25,
                editVarieteyModal: false,
                specTemp: '',
                total: 0,
                pageCur: 1,
                // 新增品种表单
                formItem:
                    {
                        specName: '',
                        speciesid: '',
                        fname: '',
                        fpinyin: '',
                        fvarietykind: '',
                        fvarietyorigin: '',
                        fbreedingunit: '',
                        fistransgene: '1',
                        fapplydate: '',
                        fapplynumber: '',
                        fapplyannouncedate: '',
                        fapplyannouncenumber: '',
                        fauthdate: '',
                        fauthnumber: '',
                        fauthannouncedate: '',
                        fauthannouncenumber: '',
                        fgrowpeople: '',
                        fvarietyowner: '',
                        fvarietyapprnum: '',
                        fvarietyapprdate: '',
                        fvarietyapprunit: '',
                        ffeature: '',
                        foutput: '',
                        fgrowteachology: '',
                        fsuiteplatearea: '',
                        fvarietyrecommand: '',
                        ficon: [],
                        image: []
                    },
                // 编辑品种表单
                editVarieteyForm: {
                    specName: '',
                    indexid: '',
                    speciesid: '',
                    fname: '',
                    fpinyin: '',
                    fvarietykind: '',
                    fvarietyorigin: '',
                    fbreedingunit: '',
                    fistransgene: '',
                    fapplydate: '',
                    fapplynumber: '',
                    fapplyannouncedate: '',
                    fapplyannouncenumber: '',
                    fauthdate: '',
                    fauthnumber: '',
                    fauthannouncedate: '',
                    fauthannouncenumber: '',
                    fgrowpeople: '',
                    fvarietyowner: '',
                    fvarietyapprnum: '',
                    fvarietyapprdate: '',
                    fvarietyapprunit: '',
                    ffeature: '',
                    foutput: '',
                    fgrowteachology: '',
                    fsuiteplatearea: '',
                    fvarietyrecommand: '',
                    ficon: [],
                    image: []
                },
                //新增表单验证
                formItemRules: {
                    speciesid: [
                        {required: true, message: '请选择物种名称', trigger: 'blur'}
                    ],
                    fname: [
                        {required: true, message: '请填写品种名称', trigger: 'blur'}
                    ],
                    fpinyin: [
                        {required: true, message: '请填写品种拼音', trigger: 'blur'}
                    ]
                },
                editVarieteyRules: {
                    fname: [
                        {required: true, message: '请填写物种名称', trigger: 'blur'}
                    ],
                    selectedSpe: [
                        {required: true, message: '请选择物种类型', trigger: 'blur'}
                    ],
                    findustriaclassifiedid: [
                        {required: true, message: '请选择产业类型', trigger: 'blur'}
                    ]
                },
                size: 0,
                currentStep: 0,
                //品种列表
                varieteyList: [],
                //品种查询表单
                varieteyForm: {
                    keywords: '',
                    sortType: 1,
                },
                loginuserinfo: JSON.parse(sessionStorage.getItem("user")),
                self: this,
                l: [],
                p: [],
                l2: [],
                p2: [],
                l3: [],
                p3: [],
                l4: [],
                p4: [],
            }
        },
        created: function () {
            // 从我的风采导入图片 默认显示第一个相册
            this.getAlbum('identityPhoto')
            this.getAlbum2('identityPhoto2')
            this.getAlbum3('identityPhoto3')
            this.getAlbum4('identityPhoto4')

            // 取相关物种结果
            this.loadSpeciResult('', '', [], this.pageCur, [])
            // 获得当前用户信息
            var loginuserinfo = JSON.parse(sessionStorage.getItem("user"))
            var _this = this
            // 品种列表查询
            this.varieteyList = []
            api.post('/wiki/api/wiki/listSpeciesVarietey',
                {
                    sortType: 1,
                    userId: loginuserinfo.loginAccount,
                    pageNum: 1,
                    pageSize: 25
                }
            ).then(response => {
                if (200 === response.code) {
                    _this.varieteyList = response.data
                    _this.varieteyTotal = response.total
                } else {
                    console.log('查询品种失败')
                }
            }).catch(function (error) {
                console.log(error)
            })
        },

        methods: {
            // 从我的风采导入图片--上传图标 1
            // 1
            handlePhotoSelectorModal (name) {
                this.$refs[name].photoSelectorShow = true
                this.$refs[name].choosed = []
            },

            albumChange (value) {
                this.p = []
                this.getPhoto({
                    mediaId: value,
                    pageNum: 1,
                    pageSize: 1000
                })
            },

            handleGetPhotoResult (result) {
                // 用于限制最大可上传照片的张数
                if (this.formItem.ficon.length + result.length > 4) {
                    this.$Notice.warning({
                        title: '最多只能上传 4 张图片。'
                    })
                } else {
                    result.forEach(element => {
                        this.$refs.upload1.fileList.push({
                            response: {
                                data: {
                                    picName: element
                                }
                            },
                            status: 'finished'
                        })    
                        this.formItem.ficon.push(element)
                    })
                    console.log(this.$refs.upload1.fileList)
                    console.log(this.formItem.ficon)
                }
            },

            getAlbum (name) {
                this.$api.post('/member/product-base/media-library-query-all', {
                    account: JSON.parse(sessionStorage.getItem('user')).loginAccount,
                    mediaType: 1
                }).then(response => {
                    if (response.code === 200) {
                        if (response.data.length !== 0) {
                            this.$refs[name].album = response.data[0].mediaId
                        }
                        response.data.forEach(element => {
                            this.l.push({
                                label: element.mediaName,
                                value: element.mediaId
                            })
                        })
                    }
                }).catch(error => {
                    console.log(error)
                })
            },

            getPhoto (params) {
                this.$api.post("/member/product-base/media-library-detail-query-list", params)
                    .then(response => {
                    if (response.code === 200) {
                        for (let i = 0; i < response.data.list.length; i++) {
                            this.p.push({
                                id: response.data.list[i].id,
                                src: response.data.list[i].mediaUrl,
                                disable: false
                            })
                        }
                    }
                })
            },

            handleBeforeUpload1 () {
                const check = this.$refs.upload1.fileList.length < 4 && this.formItem.ficon.length < 4
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 4 张图片。'
                    })
                }
                return check
            },

            handleSuccess1(response, file, fileList) {
                if (response.code === 500) {
                    this.$Message.error('上传失败!')
                } else {
                    this.$Message.success('上传成功!')
                    this.formItem.ficon.push(file.response.data.picName)
                }
            },

            handleRemove1 (file) {
                const fileList = this.formItem.ficon
                this.formItem.ficon.splice(fileList.indexOf(file), 1)
                const fileList1 = this.$refs.upload1.fileList
                this.$refs.upload1.fileList.splice(fileList1.indexOf(file), 1)
            },

            // 2
            handleGetPhotoResult2 (result) {
                // 用于限制最大可上传照片的张数
                if (this.formItem.image.length + result.length > 4) {
                    this.$Notice.warning({
                        title: '最多只能上传 4 张图片。'
                    })
                } else {
                    result.forEach(element => {
                        this.$refs.upload2.fileList.push({
                            response: {
                                data: {
                                    picName: element
                                }
                            },
                            status: 'finished'
                        })    
                        this.formItem.image.push(element)
                    })
                }
            },

            getAlbum2 (name) {
                this.$api.post('/member/product-base/media-library-query-all', {
                    account: JSON.parse(sessionStorage.getItem('user')).loginAccount,
                    mediaType: 1
                }).then(response => {
                    if (response.code === 200) {
                        if (response.data.length !== 0) {
                            this.$refs[name].album = response.data[0].mediaId
                        }
                        response.data.forEach(element => {
                            this.l2.push({
                                label: element.mediaName,
                                value: element.mediaId
                            })
                        })
                    }
                }).catch(error => {
                    console.log(error)
                })
            },

            getPhoto2 (params) {
                this.$api.post("/member/product-base/media-library-detail-query-list", params)
                    .then(response => {
                    if (response.code === 200) {
                        for (let i = 0; i < response.data.list.length; i++) {
                            this.p2.push({
                                id: response.data.list[i].id,
                                src: response.data.list[i].mediaUrl,
                                disable: false
                            })
                        }
                    }
                })
            },

            albumChange2 (value) {
                this.p2 = []
                this.getPhoto2({
                    mediaId: value,
                    pageNum: 1,
                    pageSize: 1000
                })
            },

            handleBeforeUpload2 () {
                const check = this.$refs.upload2.fileList.length < 4 && this.formItem.image.length < 4
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 4 张图片。'
                    })
                }
                return check
            },

            handleSuccess2(response, file, fileList) {
                if (response.code === 500) {
                    this.$Message.error('上传失败!')
                } else {
                    this.$Message.success('上传成功!')
                    this.formItem.image.push(file.response.data.picName)
                }
            },

            handleRemove2 (file) {
                const fileList = this.formItem.image
                this.formItem.image.splice(fileList.indexOf(file), 1)
                const fileList2 = this.$refs.upload2.fileList
                this.$refs.upload2.fileList.splice(fileList2.indexOf(file), 1)
            },

            // 3
            handleGetPhotoResult3 (result) {
                // 用于限制最大可上传照片的张数
                if (this.editVarieteyForm.ficon.length + result.length > 4) {
                    this.$Notice.warning({
                        title: '最多只能上传 4 张图片。'
                    })
                } else {
                    result.forEach(element => {
                        this.$refs.upload3.fileList.push({
                            response: {
                                data: {
                                    picName: element
                                }
                            },
                            status: 'finished'
                        })    
                        this.editVarieteyForm.ficon.push(element)
                    })
                }
            },

            getAlbum3 (name) {
                this.$api.post('/member/product-base/media-library-query-all', {
                    account: JSON.parse(sessionStorage.getItem('user')).loginAccount,
                    mediaType: 1
                }).then(response => {
                    if (response.code === 200) {
                        if (response.data.length !== 0) {
                            this.$refs[name].album = response.data[0].mediaId
                        }
                        response.data.forEach(element => {
                            this.l3.push({
                                label: element.mediaName,
                                value: element.mediaId
                            })
                        })
                    }
                }).catch(error => {
                    console.log(error)
                })
            },

            getPhoto3 (params) {
                this.$api.post("/member/product-base/media-library-detail-query-list", params)
                    .then(response => {
                    if (response.code === 200) {
                        for (let i = 0; i < response.data.list.length; i++) {
                            this.p3.push({
                                id: response.data.list[i].id,
                                src: response.data.list[i].mediaUrl,
                                disable: false
                            })
                        }
                    }
                })
            },

            albumChange3 (value) {
                this.p3 = []
                this.getPhoto3({
                    mediaId: value,
                    pageNum: 1,
                    pageSize: 1000
                })
            },

            handleBeforeUpload3 () {
                const check = this.$refs.upload3.fileList.length < 4 && this.editVarieteyForm.ficon.length < 4
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 4 张图片。'
                    })
                }
                return check
            },

            handleSuccess3(response, file, fileList) {
                if (response.code === 500) {
                    this.$Message.error('上传失败!')
                } else {
                    this.$Message.success('上传成功!')
                    this.editVarieteyForm.ficon.push(file.response.data.picName)
                }
            },

            handleRemove3 (file) {
                const fileList = this.editVarieteyForm.ficon
                this.editVarieteyForm.ficon.splice(fileList.indexOf(file), 1)
                const fileList3 = this.$refs.upload3.fileList
                this.$refs.upload3.fileList.splice(fileList3.indexOf(file), 1)
            },

            // 4
            handleGetPhotoResult4 (result) {
                // 用于限制最大可上传照片的张数
                if (this.editVarieteyForm.image.length + result.length > 4) {
                    this.$Notice.warning({
                        title: '最多只能上传 4 张图片。'
                    })
                } else {
                    result.forEach(element => {
                         this.$refs.upload4.fileList.push({
                            response: {
                                data: {
                                    picName: element
                                }
                            },
                            status: 'finished'
                        })    
                        this.editVarieteyForm.image.push(element)
                    })
                }
            },

            getAlbum4 (name) {
                this.$api.post('/member/product-base/media-library-query-all', {
                    account: JSON.parse(sessionStorage.getItem('user')).loginAccount,
                    mediaType: 1
                }).then(response => {
                    if (response.code === 200) {
                        if (response.data.length !== 0) {
                            this.$refs[name].album = response.data[0].mediaId
                        }
                        response.data.forEach(element => {
                            this.l4.push({
                                label: element.mediaName,
                                value: element.mediaId
                            })
                        })
                    }
                }).catch(error => {
                    console.log(error)
                })
            },

            getPhoto4 (params) {
                this.$api.post("/member/product-base/media-library-detail-query-list", params)
                    .then(response => {
                    if (response.code === 200) {
                        for (let i = 0; i < response.data.list.length; i++) {
                            this.p4.push({
                                id: response.data.list[i].id,
                                src: response.data.list[i].mediaUrl,
                                disable: false
                            })
                        }
                    }
                })
            },

            albumChange4 (value) {
                this.p4 = []
                this.getPhoto4({
                    mediaId: value,
                    pageNum: 1,
                    pageSize: 1000
                })
            },

            handleBeforeUpload4 () {
                const check = this.$refs.upload4.fileList.length < 4 && this.editVarieteyForm.image.length < 4
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 4 张图片。'
                    })
                }
                return check
            },

            handleSuccess4(response, file, fileList) {
                if (response.code === 500) {
                    this.$Message.error('上传失败!')
                } else {
                    this.$Message.success('上传成功!')
                    this.editVarieteyForm.image.push(file.response.data.picName)
                }
            },

            handleRemove4 (file) {
                const fileList = this.editVarieteyForm.image
                this.editVarieteyForm.image.splice(fileList.indexOf(file), 1)
                const fileList4 = this.$refs.upload4.fileList
                this.$refs.upload4.fileList.splice(fileList4.indexOf(file), 1)
            },
            // 从我的风采导入图片--上传图标


            // 高级搜索弹窗
            handleFilterModal(name) {
                this.$refs[name].highFilterShow = true
            },
            // 取相关物种
            handleSpeciSearch(letter, keyword, classify, result) {
                this.loadSpeciResult(letter, keyword, classify, this.pageCur, result)
            },
            loadSpeciDatas(item, callback) {
                item.loading = true
                api.post(`/member/specicesClass/findByParentId/${item.value}`).then(res => {
                    item.loading = false
                    var d = res.data
                    d.forEach(child => {
                        child.checked = false
                        child.label = child.className
                    })
                    item.children = d
                    callback()
                })
            },
            handleGetSpeciClassify(letter, keyword, classify, result) {
                this.loadSpeciResult(letter, keyword, classify, this.pageCur, result)
            },
            handleSpeciPageChange(letter, keyword, classify, num, result) {
                this.pageCur = num
                this.loadSpeciResult(letter, keyword, classify, this.pageCur, result)
            },
            loadSpeciResult(letter, keyword, classify, num, result) {
                if (classify.length) {
                    var arr = []
                    var type = ''
                    classify.forEach(item => {
                        arr.push(item.classId)
                        if(item.value !== undefined) type =item.value
                    })
                } else {
                    arr = null
                }
                api.post('/member/specicesClass/findSpecies', {
                    keywords: keyword,
                    fpinyin: letter === '全部' ? '' : letter,
                    fclassifiedid: arr,
                    type:type,
                    pageNum: num,
                    pageSize: 32
                }).then(res => {
                    var data = res.data
                    this.total = data.total
                    if (result) {
                        result.forEach(item => {
                            data.list.forEach((child, index) => {
                                if (child.label === item.label) {
                                    child.checked = true
                                }
                            })
                        })
                    } else {
                        data.list.forEach(child => {
                            child.checked = false
                        })
                    }
                    this.speciResultDatas = data.list
                })
            },
            handleGetSpeciResult(classify, result) {
                var arr = []
                result.forEach(item => arr.push(item.label))
                // 区分编辑还是添加
                if (arr.length > 0) {
                    this.formItem.specName = arr[0]
                    api.post('/wiki/api/species/searchSpecies', {
                        name: this.formItem.specName
                    }).then(response => {
                        console.log('response--->>', response)
                        if (200 === response.code) {
                            if ('' != response.data) {
                                this.formItem.speciesid = response.data.species.speciesid
                                console.log('this.formItem.speciesid--->>', this.formItem.speciesid)
                            }
                        }
                    }).catch(function (error) {
                        console.log(error)
                    })
                }
            },
            //---检测品种名是否占用-------
            checkAddFname() {
                if ('' != this.formItem.fname) {
                    api.get('/wiki/api/wiki/existName/' + 2 + '/' + this.formItem.fname).then(response => {
                        console.log("检测物种名是否被占用:==>>", response.data, "<<==")
                        if (1 === response.data) {
                            this.$Message.success("该物种名已被占用!")
                            this.formItem.fname = ''
                        }
                    }).catch(function (error) {
                        console.log(error)
                    })
                }
            },
            //------------------------------------------------------
            editCancel() {
            },
            handleSubmit(name) {
                let flag = false;
                this.$refs[name].validate(valid => {
                    if (valid) {
                    flag = true;
                    // this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                });
                return flag;
            },
            // ---------添加时完成
            completeForm() {
                if(this.handleSubmit('formItem')){
                    var loginuserinfo = JSON.parse(sessionStorage.getItem("user"))
                    api.post('/wiki/api/wiki/saveSpeciesVarietey',
                        {
                            speciesid: this.formItem.speciesid,
                            fname: this.formItem.fname,
                            fpinyin: this.formItem.fpinyin,
                            fvarietykind: this.formItem.fvarietykind,
                            fvarietyorigin: this.formItem.fvarietyorigin,
                            fbreedingunit: this.formItem.fbreedingunit,
                            fistransgene: this.formItem.fistransgene,
                            fapplydate: this.formItem.fapplydate,
                            fapplynumber: this.formItem.fapplynumber,
                            fapplyannouncedate: this.formItem.fapplyannouncedate,
                            fapplyannouncenumber: this.formItem.fapplyannouncenumber,
                            fauthdate: this.formItem.fauthdate,
                            fauthnumber: this.formItem.fauthnumber,
                            fauthannouncedate: this.formItem.fauthannouncedate,
                            fauthannouncenumber: this.formItem.fauthannouncenumber,
                            fgrowpeople: this.formItem.fgrowpeople,
                            fvarietyowner: this.formItem.fvarietyowner,
                            fvarietyapprnum: this.formItem.fvarietyapprnum,
                            fvarietyapprdate: this.formItem.fvarietyapprdate,
                            fvarietyapprunit: this.formItem.fvarietyapprunit,
                            ffeature: this.formItem.ffeature,
                            foutput: this.formItem.foutput,
                            fgrowteachology: this.formItem.fgrowteachology,
                            fsuiteplatearea: this.formItem.fsuiteplatearea,
                            fvarietyrecommand: this.formItem.fvarietyrecommand,
                            ficon: this.formItem.ficon,
                            image: this.formItem.image,
                            fcreatorid: loginuserinfo.loginAccount
                        }
                    ).then(response => {
                        console.log("添加返回的参数==>>", response)
                        if (200 === response.code) {
                            console.log('添加品种id', response.data)
                            this.$Message.success('添加品种成功!')
                        } else {
                            this.$Message.success('添加品种失败!')
                        }
                    }).catch(function (error) {
                        console.log(error)
                    })
                    this.listShow = false
                    this.addShow = false
                    this.addFinsihedShow = true
                    this.currentStep = 1
                    location.reload()    
                }
            },
            // 点击跳转添加品种
            addSpec2() {
                this.listShow = false
                this.addShow = true
                this.addFinsihedShow = false
            },
            // 点击完成跳转页面
            complete() {
                this.listShow = true
                this.addShow = false
                this.addFinsihedShow = false
                this.currentStep = 0
            },
            // 品种升序查询
            varieteyUp() {
                this.varieteyForm.sortType = 1
                this.varieteySearch()
            },
            // 品种降序查询
            varieteyDown() {
                this.varieteyForm.sortType = 0
                this.varieteySearch()
            },
            //品种查询按钮
            varieteySearch() {
                let loginuserinfo = JSON.parse(sessionStorage.getItem("user"))
                let _this = this
                _this.varieteyList = []
                _this.varieteyTotal = 0
                api.post('/wiki/api/wiki/listSpeciesVarietey',
                    {
                        keywords: _this.varieteyForm.keywords,
                        sortType: _this.varieteyForm.sortType,
                        userId: loginuserinfo.loginAccount,
                        pageNum: _this.varieteyCurrentPage,
                        pageSize: 25
                    }
                ).then(response => {
                    if(response.code === 200){
                        _this.varieteyList = response.data
                        _this.varieteyTotal = response.total
                    }
                }).catch(function (error) {
                    console.log(error)
                })
            },
            // 点击跳转添加品种
            addSpec2() {
                this.listShow = false
                this.addShow = true
                this.addFinsihedShow = false
            },
            //品种页码改变
            varieteyPageChange(e) {
                // 获得当前页码
                this.varieteyCurrentPage = e
                var loginuserinfo = JSON.parse(sessionStorage.getItem("user"))
                var _this = this
                this.varieteyList = []
                this.varieteyTotal = 0
                this.varieteySearch()
            },
            //  编辑品种回显
            editVarietey(e) {
                var loginuserinfo = JSON.parse(sessionStorage.getItem("user"))
                this.editVarieteyModal = true
                api.get('/wiki/api/wiki/getSpeciesVarietey/' + e)
                    .then(response => {
                        this.editVarieteyForm.indexid = response.data.indexid
                        this.editVarieteyForm.speciesid = response.data.speciesid
                        this.editVarieteyForm.fname = response.data.fname
                        this.editVarieteyForm.fpinyin = response.data.fpinyin
                        this.editVarieteyForm.fvarietykind = response.data.fvarietykind
                        this.editVarieteyForm.fvarietyorigin = response.data.fvarietyorigin
                        this.editVarieteyForm.fbreedingunit = response.data.fbreedingunit
                        if( response.data.fistransgene==="否"){
                            this.editVarieteyForm.fistransgene='0'
                        }else{
                            this.editVarieteyForm.fistransgene='1'
                        }
                        this.editVarieteyForm.fapplydate = response.data.fapplydate
                        this.editVarieteyForm.fapplynumber = response.data.fapplynumber
                        this.editVarieteyForm.fapplyannouncedate = response.data.fapplyannouncedate
                        this.editVarieteyForm.fapplyannouncenumber = response.data.fapplyannouncenumber
                        this.editVarieteyForm.fauthdate = response.data.fauthdate
                        this.editVarieteyForm.fauthnumber = response.data.fauthnumber
                        this.editVarieteyForm.fauthannouncedate = response.data.fauthannouncedate
                        this.editVarieteyForm.fauthannouncenumber = response.data.fauthannouncenumber
                        this.editVarieteyForm.fgrowpeople = response.data.fgrowpeople
                        this.editVarieteyForm.fvarietyowner = response.data.fvarietyowner
                        this.editVarieteyForm.fvarietyapprnum = response.data.fvarietyapprnum
                        this.editVarieteyForm.fvarietyapprdate = response.data.fvarietyapprdate
                        this.editVarieteyForm.fvarietyapprunit = response.data.fvarietyapprunit
                        this.editVarieteyForm.ffeature = response.data.ffeature
                        this.editVarieteyForm.foutput = response.data.foutput
                        this.editVarieteyForm.fgrowteachology = response.data.fgrowteachology
                        this.editVarieteyForm.fsuiteplatearea = response.data.fsuiteplatearea
                        this.editVarieteyForm.fvarietyrecommand = response.data.fvarietyrecommand
                        this.editVarieteyForm.ficon = response.data.ficon
                        this.editVarieteyForm.image = response.data.image
                        this.editVarieteyForm.ficon.forEach(element => {
                            this.$refs.upload3.fileList.push({
                                response: {
                                    data: {
                                        picName: element
                                    }
                                },
                                status: 'finished'
                            })    
                        })
                        this.editVarieteyForm.image.forEach(element => {
                            this.$refs.upload4.fileList.push({
                                response: {
                                    data: {
                                        picName: element
                                    }
                                },
                                status: 'finished'
                            })    
                        })
                    }).catch(function (error) {
                    console.log(error)
                })
            },
            // 删除品种
            delVarietey(e) {
                let _this = this
                api.get('/wiki/api/wiki/deleteSpeciesVarietey/' + e)
                    .then(response => {
                        if(response.code === 200){
                            this.$Message.success('删除品种成功!')
                            this.varieteySearch()
                        }
                    }).catch(function (error) {
                    console.log(error)
                })
            },

            // 确认更新品种
            updateVarietey() {
                let fistransgene = ''
                if(this.editVarieteyForm.fistransgene === '是'){
                    fistransgene = '1'
                }else{
                    fistransgene = '0'
                }
                var loginuserinfo = JSON.parse(sessionStorage.getItem("user"))
                api.post('/wiki/api/wiki/updateSpeciesVarietey',
                    {
                        indexid: this.editVarieteyForm.indexid,
                        speciesid: this.editVarieteyForm.speciesid,
                        fname: this.editVarieteyForm.fname,
                        fpinyin: this.editVarieteyForm.fpinyin,
                        fvarietykind: this.editVarieteyForm.fvarietykind,
                        fvarietyorigin: this.editVarieteyForm.fvarietyorigin,
                        fbreedingunit: this.editVarieteyForm.fbreedingunit,
                        fistransgene: fistransgene,
                        fapplydate: this.editVarieteyForm.fapplydate,
                        fapplynumber: this.editVarieteyForm.fapplynumber,
                        fapplyannouncedate: this.editVarieteyForm.fapplyannouncedate,
                        fapplyannouncenumber: this.editVarieteyForm.fapplyannouncenumber,
                        fauthdate: this.editVarieteyForm.fauthdate,
                        fauthnumber: this.editVarieteyForm.fauthnumber,
                        fauthannouncedate: this.editVarieteyForm.fauthannouncedate,
                        fauthannouncenumber: this.editVarieteyForm.fauthannouncenumber,
                        fgrowpeople: this.editVarieteyForm.fgrowpeople,
                        fvarietyowner: this.editVarieteyForm.fvarietyowner,
                        fvarietyapprnum: this.editVarieteyForm.fvarietyapprnum,
                        fvarietyapprdate: this.editVarieteyForm.fvarietyapprdate,
                        fvarietyapprunit: this.editVarieteyForm.fvarietyapprunit,
                        ffeature: this.editVarieteyForm.ffeature,
                        foutput: this.editVarieteyForm.foutput,
                        fgrowteachology: this.editVarieteyForm.fgrowteachology,
                        fsuiteplatearea: this.editVarieteyForm.fsuiteplatearea,
                        fvarietyrecommand: this.editVarieteyForm.fvarietyrecommand,
                        ficon: this.editVarieteyForm.ficon,
                        image: this.editVarieteyForm.image,
                        fupdatorid: loginuserinfo.loginAccount
                    }
                ).then(response => {
                    console.log("提交的参数==>>", response)
                    if (200 === response.code) {
                        console.log('更新返回值', response.data)
                        this.$Message.success('更新品种成功!')
                        this.varieteySearch()
                    } else {
                        this.$Message.success('更新品种失败!')
                    }
                }).catch(function (error) {
                    console.log(error)
                })
                this.varieteySearch()
            },

            // 编辑时获得拼音
            getEditPinyin() {
                if ('' != this.editVarieteyForm.fname) {
                    api.get('/wiki/api/species/getSpeciesPinYin/' + this.editVarieteyForm.fname).then(response => {
                        this.editVarieteyForm.fpinyin = ''
                        this.editVarieteyForm.fpinyin = response.data
                    }).catch(function (error) {
                        console.log(error)
                    })
                } else {
                    this.editVarieteyForm.fpinyin = ''
                }

            },
            // 添加时获得拼音
            getAddPinyin() {
                if ('' != this.formItem.fname) {
                    api.get('/wiki/api/species/getSpeciesPinYin/' + this.formItem.fname).then(response => {
                        this.formItem.fpinyin = ''
                        this.formItem.fpinyin = response.data
                    }).catch(function (error) {
                        console.log(error)
                    })
                } else {
                    this.formItem.fpinyin = ''
                }
            },

            //===================图片上传==========================
            // ------添加时上传---start-----------------
            handleSuccessAddIcon(response, file, fileList) {
                console.log("返回图片")
                var picname = response.data.picName
                this.formItem.ficon.push("http:" + picname)
            },
            handleRemoveAddIcon(item) {
                this.formItem.ficon.splice(this.formItem.ficon.indexOf(item), 1)
            },
            handleSuccessAddImage(response, file, fileList) {
                var picname = response.data.picName
                this.formItem.image.push("http:" + picname)
            },
            handleRemoveAddImage(item) {
                this.formItem.image.splice(this.formItem.image.indexOf(item), 1)
            },
            //------------end------------------------
            // --------------编辑时上传----------------------------
            handleSuccessImg(response, file, fileList) {
                var picname = response.data.picName
                this.editVarieteyForm.image.push("http:" + picname)
            },
            handleRemoveImg(item) {
                this.editVarieteyForm.image.splice(this.editVarieteyForm.image.indexOf(item), 1)
            },
            handleSuccessIcon(response, file, fileList) {
                var picname = response.data.picName
                this.editVarieteyForm.ficon.push("http:" + picname)

            },
            handleRemoveIcon(item) {
                this.editVarieteyForm.ficon.splice(this.editVarieteyForm.ficon.indexOf(item), 1)
            },
            //---------编辑时上传end---------------------------------------
            // 退出
            exitAdd() {
                this.listShow = true
                this.addShow = false
                this.addFinsihedShow = false
                this.currentStep = 0
            },
        },
        mounted() {
        }
    }
</script>

