<template>
    <div class="layout">

        <div class="photo-list">
            <Upload ref="upload" :show-upload-list="false"
                    class="item"
                    name="upfile"
                    :max-size="maxsize"
                    multiple type="drag"
                    :on-exceeded-size="handleMaxSize"
                    :on-success="handleSuccess"
                    :before-upload="handleBeforeUpload"
                    :action="action"
                    :format="['jpg','png']"
                    :on-format-error="handleFormatError"
                    style="text-align:center;">
                <div class="upload-add-div">
                    <Icon type="plus-circled" color="#51ad79" :size="32"></Icon>
                    <p class="mb5">点击添加图片</p>
                    <p class="t-grey">支持jpg/png格式</p>
                    <p class="t-grey">不超过2M</p>
                </div>
            </Upload>
            <div class="upload-add-div photo-selector" @click="handlePhotoSelectorModal('identityPhoto')">
                <Icon type="plus-circled"  color="#51ad79" :size="32"></Icon>
                <p class="mb5">从文件管理导入</p>
                <p class="t-grey">支持jpg/png格式</p>
                <p class="t-grey">不超过2M</p>
            </div>
            <!--{{resultPic}}-->
            <template v-if="resultPic !== ''">

                    <!--<div class="upload-cropper-div">-->
                        <!--<vueCropper-->
                                <!--ref="cropper"-->
                                <!--:img="resultPic"-->
                                <!--:outputSize="example2.size"-->
                                <!--:outputType="example2.outputType"-->
                                <!--:info="example2.info"-->
                                <!--:canScale="example2.canScale"-->
                                <!--:autoCrop="example2.autoCrop"-->
                                <!--:autoCropWidth="example2.autoCropWidth"-->
                                <!--:autoCropHeight="example2.autoCropHeight"-->
                                <!--:fixed="example2.fixed"-->
                                <!--:fixedNumber="example2.fixedNumber"-->
                        <!--&gt;</vueCropper>-->
                    <!--</div>-->
                    <!--<div class="tc">-->
                        <!--<Button type="primary" @click="preview('base64')">下载</Button>-->
                        <!--<img :src="resultPics">-->
                    <!--</div>-->


                    <div class="item img-wrap">
                        <img :src="resultPic">
                        <Icon type="ios-trash-outline" @click.native="handleRemove(resultPic)"></Icon>
                    </div>
            </template>
        </div>
         <!-- 照片选择 -->
        <photoSelector 
        ref="identityPhoto" 
        :photoAlbum="l"
        @on-change="albumChange"
        @on-get-result="handleGetPhotoResult"
        :resultDatas="p"
        />
    </div>
</template>

<script>
    import photoSelector from '~components/photoSelector'
/*    import vueCropper from 'vue-inst'*/
    export default {
        name:'upload-cover',
        components:{
            photoSelector
/*            vueCropper*/
        },
        data() {
            return {
                example2: {
                    img: 'http://ofyaji162.bkt.clouddn.com/bg1.jpg',
                    info: true,
                    size: 1,
                     outputType: 'jpeg',
                    canScale: true,
                    autoCrop: true,
                    // 只有自动截图开启 宽度高度才生效
                    autoCropWidth: 300,
                    autoCropHeight: 250,
                    // 开启宽度和高度比例
                    fixed: true,
                    fixedNumber: [4, 3]
                },
                action: `${this.$url.upload}/upload/up`,
                uploadList: [],
                modal1: false,
                visible:false,
                src: '',
                imgs:'',
                size:0,
                value1:0,
                resultPic:'',
                resultPics: '',
                l: [],
                p: []
            }
        },
        props:{
            maxsize:{
                type:Number,
                default:102400
            },
            imgNum:{
                type:Number,
                default:1
            },
            buttonCon:{
                type:String,
                default:'选择图片'
            },
            type:{
                type:String,
                default:'upload'
            },
            format:['jpg','png'],
            defaultUploadList:{
                type:String,
                default:''
            }
        },
        created(){
            // 从我的风采导入图片 默认显示第一个相册
            this.getAlbum('identityPhoto')
        },
        methods: {
            preview(type){
                var aLink = document.createElement('a')
                aLink.download = 'demo'
                // 输出
                if (type === 'blob') {
                    this.$refs.cropper.getCropBlob((data) => {
                        this.downImg = data
                        aLink.href = data
                        aLink.click()
                    })
                } else {
                    this.$refs.cropper.getCropData((data) => {
                        console.log('截图',data)
                        this.resultPics = data
//                        aLink.href = data
//                        aLink.click()
                    })
                }
            },
            handleRemove(item) {
                this.resultPic=''
                this.$refs.upload.fileList = []
                this.$emit('on-cover', this.resultPic)
            },
            handleSuccess(response, file, fileList) {
                let pic = response.data.picName
//                this.example2.img = pic
                this.resultPic = pic
                this.$emit('on-cover', this.resultPic)
            },
            //文件太大，错误提示
            handleMaxSize (file) {
                this.$Message.error(file.name+'太大，最大上传100M')
            },
            handleFormatError (file) {
                this.$Message.error(file.name+'格式不正确，只支持.jpg .png')
            },             
            // 从我的风采导入图片
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
                    this.$Message.error(error)
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
            handleGetPhotoResult (result) {
                // 用于限制最大可上传照片的张数
                if (this.$refs.upload.fileList.length + result.length > 1) {
                    this.$Notice.warning({
                        title: '封面只能上传1张'
                    })
                } else {
                    result.forEach(element => {
                        this.$refs.upload.fileList.push({
                            response: {
                                data: {
                                    picName: element
                                }
                            },
                            status: 'finished'
                        })                        
                        this.resultPic = element
                    })
                    this.$emit('on-cover', this.resultPic)
                }
            },
            handleBeforeUpload () {
                const check = this.$refs.upload.fileList.length < 1               
                if (!check) {
                    this.$Notice.warning({
                        title: '封面只能上传1张'
                    })
                }
                return check
            },
        }
    }
</script>

<style lang="scss">

    .photo-list{        
        .item {
            display: inline-block;
            width: 140px;
            height: 140px;
            position: relative;
        }
        .img-wrap{
            vertical-align: top;
            &:hover{
                &:after{
                    content: '';
                }
                .ivu-icon{
                    display: block;
                    z-index: 999;
                }
            }
            &:after{
                position: absolute;
                top:0;
                right: 0;
                bottom: 0;
                left: 0;
                background: rgba(0,0,0,.3);
            }
            img{
                height: 100%;
                width: 100%;
            }
            .ivu-icon{
                display: none;
                color: #fff;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate3d(-50%,-50%,0);
                font-size: 24px;
                cursor: pointer;

            }
        }
        .upload-add-div {
            border: 1px;
            height: 140px;
            width: 140px;
            background: #F6F6F6;
        }
        .upload-cropper-div {
            border: 1px;
            display: inline-block;
            width: 280px;
            height: 140px;
            background: #F6F6F6;
        }
         .photo-selector {
            display: inline-block;
            position: relative;
            text-align: center;
            border: 1px #dddee1 dashed;
            cursor: pointer;
        }
        .photo-selector:hover {
            border: 1px #51ad79 dashed;
        }
    }


</style>