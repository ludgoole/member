/**
 * DESCRIPTION:
 * 自定义lay im右键事件及对应监听
 * @author zouyan
 * @create 2018/1/30-上午11:22
 * created by fuck~
 **/
layui.define(['jquery', 'layer','contextMenu','form'], function (exports) {
    var $ = layui.jquery;
    var layer = layui.layer;
    var cachedata =  layui.layim.cache();

    var conf = {
        layim: null,
    };

    var rightClick = {
        config: function (options) {
            //浅拷贝合并 便于init时使用layim 外部调用传值layim(conf) 例：.config({layim: layim,});
            conf = $.extend(conf, options);
            this.init();//初始化右键菜单
        },
        init: function() {
            var layim = conf.layim;
            if (layim) {
                //在LayIM初始化就绪时 初始化自定义右键菜单
                layim.on('ready', function (options) {
                    console.log('layim ready. data=>' + options);
                    //自定义右键操作
                    webIM.contextMenu(options);
                });
            }
        }
    };

    var webIM = {
        //自定义右键操作 初始化方法
        contextMenu : function(options){
            //所有好友分组下好友li
            var friendsLi = $('.layim-list-friend >li > ul > li');
            $(document).on('mousedown',friendsLi,function(e){
                //右键菜单传值详见contextMenu.js
                var data = {
                    //追加自定义class
                    contextItem: 'custom-friend',
                    //定义右键菜单属性值
                    target: function(ele) { // 当前元素
                        $('.custom-friend').attr('data-id', ele.attr('class').replace(/[^0-9]/ig, ""));//userId
                        $('.custom-friend').attr('data-name', ele.find('span').html());//用户名
                        $('.custom-friend').attr('data-img', ele.find('img').attr('src'));//用户头像地址
                        $('.custom-friend').attr('data-type', ele.attr('data-type'));//friend
                        $('.custom-friend').attr('data-account', options.friend[ele.parent().parent().index()].list[ele.index()].account);//account
                    },
                    menu:[]
                };
                //发送即时消息
                data.menu.push(webIM.menuChat());
                //查看空间
                data.menu.push(webIM.menuInfo(options));
                data.menu.push(webIM.menuChatLog());
                friendsLi.contextMenu(data);
            });
        },
        menuChat: function(){
            var menu = {
                text: '发送即时消息',
                icon: '&#xe63a;',
                callback: function(ele) {
                    var eleParent = ele.parent();
                    var userId = eleParent.data('id');
                    var type = eleParent.data('type');
                    var name = eleParent.data('name');
                    var avatar = eleParent.data('img');
                    conf.layim.chat({
                        id: userId,
                        name: name,
                        avatar: avatar,
                        type: type
                    });
                }
            };
            return menu;
        },
        menuInfo: function(options){
            var menu = {
                text: '查看空间',
                icon: '&#xe64c',
                callback: function(ele) {
                    var account = ele.parent().data('account');
                    var url = `${window.location.origin}/profile/personalInformation?uid=` + account;
                    window.location.href = url;
                }
            };
            return menu;
        },
        menuChatLog: function(){
            var menu =  {
                text: '查看聊天记录',
                icon: '&#xe60e;',
                callback: function(ele) {
                    var eleParent = ele.parent();
                    var userId = eleParent.data('id');
                    var type = eleParent.data('type');
                    var name = eleParent.data('name');
                    layer.open({
                        type: 2
                        ,maxmin: true
                        ,title: '与 '+ name +' 的聊天记录'
                        ,area: ['450px', '600px']
                        ,shade: false
                        ,skin: 'layui-box'
                        ,anim: 2
                        ,id: 'layui-layim-chatlog'
                        ,content: cachedata.base.chatLog + '?id=' + userId + '&type=' + type
                    });
                }
            };
            return menu;
        }
    };
    exports('customRightClick', rightClick);
    exports('webIM', webIM);
});