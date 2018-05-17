layui.define(['jquery','contextMenu'], function (exports) {
    var contextMenu = layui.contextMenu;
    var $ = layui.jquery;
    var ext = {
    	test: function (str) {
    		alert(str)
    	},
        init : function(opt){//定义右键操作
            var e = $(".layim-list-friend >li > ul > li[layim-event]")
            e.contextMenu({
                width: 140, // width
                itemHeight: 30, // 菜单项height
                bgColor: "#fff", // 背景颜色
                color: "#333", // 字体颜色
                fontSize: 15, // 字体大小
                hoverBgColor: "#009bdd", // hover背景颜色
                hoverColor: "#fff", // hover背景颜色
                target: function(ele) { // 当前元素
                    $(".ul-context-menu").attr("data-id",ele[0].id);
                    $(".ul-context-menu").attr("data-name",ele.find("span").html());
                    $(".ul-context-menu").attr("data-img",ele.find("img").attr('src'));
                },
                menu: [
                    { // 菜单项
                        text: "查看空间",
                        icon: "&#xe64c",
                        callback: function(ele) {
                            var p = e.parent().parent().index()
                        	window.location.href = `${window.location.origin}/profile/personalInformation?uid=${opt.friend[p].list[e.index()].account}`
                        }
                    }                                                 
                ]
            });
        }
    }
  exports('rightClick', ext);
}); 