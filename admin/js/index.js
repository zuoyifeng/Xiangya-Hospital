$(function () {
    var $doc = $(document);//document对象
    var $header = $('.m-header');//头部模块对象
    var $h_menu = $header.find('.menu');//头部模块菜单对象
    var $left_menu = $('.m-menu');//左侧模块对象
    var $l_menu = $left_menu.find('.menus');//左侧模块菜单对象
    var $content = $('.m-content');//右侧主体对象
    var style_dom = document.getElementById('inner__style');//动态样式
    $header.find('.m-header-logo img').attr('src', HEADER_STYLE_CONFIG.headerLogoUrl);//设置LOGO
    var style_tmp = '.m-header{height: ' + HEADER_STYLE_CONFIG.headerHeight + 'px;background-color:' + HEADER_STYLE_CONFIG.headerBgColor + ';}' +
            '.m-header .sel{margin-right:'+HEADER_STYLE_CONFIG.headerSelMarginR+'px;height:'+HEADER_STYLE_CONFIG.headerHeight+'px;line-height:'+HEADER_STYLE_CONFIG.headerHeight+'px;font-size:'+HEADER_STYLE_CONFIG.headerMenuFontsize+'px;padding:0 15px 0 '+HEADER_STYLE_CONFIG.headerSelPaddingL+'px;color:'+HEADER_STYLE_CONFIG.headerMenuFontcolor+';background:url('+HEADER_STYLE_CONFIG.headerSelBackgroundUrl+') no-repeat right center;}' +
            '.m-header .sel ul{top:'+HEADER_STYLE_CONFIG.headerHeight+'px;background-color:'+HEADER_STYLE_CONFIG.headerBgColor+'}' +
            '.m-header .sel ul a{color:'+HEADER_STYLE_CONFIG.headerMenuFontcolor+';padding:'+HEADER_STYLE_CONFIG.headerSelItemPadding+';border-color:'+HEADER_STYLE_CONFIG.headerSelItemTBColor+';}' +
            '.m-header .sel ul a:hover{background-color:'+HEADER_STYLE_CONFIG.headerMenuActive+';}' +
            '.m-header-logo{min-width:' + (LEFT_MENU_CONFIG.expandWidth - 1) + 'px;padding:0 ' + HEADER_STYLE_CONFIG.headerLogoLRPadding + 'px;}' +
            '.m-header .menu a{background-color:' + HEADER_STYLE_CONFIG.headerMenuBgColor + ';color: ' + HEADER_STYLE_CONFIG.headerMenuFontcolor + ';font-size: ' + HEADER_STYLE_CONFIG.headerMenuFontsize + 'px;line-height: ' + HEADER_STYLE_CONFIG.headerHeight + 'px;border-color:' + HEADER_STYLE_CONFIG.headerMenuBorder + ';padding:0 ' + HEADER_STYLE_CONFIG.headerMenuLRPadding + 'px;}' +
            '.m-header .menu a:hover{background-color:' + HEADER_STYLE_CONFIG.headerMenuHover + ';color:' + HEADER_STYLE_CONFIG.headerMenuHoverFontcolor + ';border-color:' + HEADER_STYLE_CONFIG.headerMenuHoverBorder + ';}' +
            '.m-header .menu a.active{background-color:' + HEADER_STYLE_CONFIG.headerMenuActive + ';color:' + HEADER_STYLE_CONFIG.headerMenuActiveFontcolor + ';border-color:' + HEADER_STYLE_CONFIG.headerMenuActiveBorder + ';}' +
            '.m-header .menu li{margin:0 ' + HEADER_STYLE_CONFIG.headerMenuMargin + 'px}' +
            '.m-header .info{margin-right:' + HEADER_STYLE_CONFIG.headerUserMarginRight + 'px;}' +
            '.m-header .info>li>a {font-size: ' + HEADER_STYLE_CONFIG.headerUserFontsize + 'px;background-color:' + HEADER_STYLE_CONFIG.headerUserBgColor + ';color:' + HEADER_STYLE_CONFIG.headerUserFontcolor + ';line-height: ' + HEADER_STYLE_CONFIG.headerHeight + 'px;min-width:' + HEADER_STYLE_CONFIG.headerUserMinWidth + 'px;}' +
            '.m-header .info>li>a:hover{background-color:' + HEADER_STYLE_CONFIG.headerUserHoverBgColor + ';color:' + HEADER_STYLE_CONFIG.headerUserHoverFontcolor + ';}' +
            '.m-header .info li ul{width:' + HEADER_STYLE_CONFIG.headerUserPopWidth + 'px; background-color:' + HEADER_STYLE_CONFIG.headerUserPopBgColor + ';font-size:' + HEADER_STYLE_CONFIG.headerUserPopFontsize + 'px;border-color:' + HEADER_STYLE_CONFIG.headerUserPopBorder + '}' +
            '.m-header .info li ul:before {border-bottom-color:' + HEADER_STYLE_CONFIG.headerUserPopBorder + ';}' +
            '.m-header .info li ul:after {border-bottom-color:' + HEADER_STYLE_CONFIG.headerUserPopBgColor + ';}' +
            '.m-header .info li ul li a{color: ' + HEADER_STYLE_CONFIG.headerUserPopFontcolor + ';border-bottom-color:' + HEADER_STYLE_CONFIG.headerUserPopBorderBottom + '}' +
            '.m-header .info li ul li a:hover{background-color:' + HEADER_STYLE_CONFIG.headerUserHoverPopBgColor + ';color:' + HEADER_STYLE_CONFIG.headerUserHoverPopFontcolor + '}' +
            '.m-menu{top:' + HEADER_STYLE_CONFIG.headerHeight + 'px;background-color:' + LEFT_MENU_CONFIG.bgColor + ';width:' + LEFT_MENU_CONFIG.expandWidth + 'px;color:' + LEFT_MENU_CONFIG.textColor + ';}' +
            '.m-menu .mouse-menu{width:' + LEFT_MENU_CONFIG.tightWidth + 'px;background-color:' + LEFT_MENU_CONFIG.tightBgColor + ';}' +
            '.m-menu .mouse-menu h3{height:' + LEFT_MENU_CONFIG.tightFirstMenuHeight + 'px;line-height:' + LEFT_MENU_CONFIG.tightFirstMenuHeight + 'px;font-size:' + LEFT_MENU_CONFIG.tightFirstMenuFontSize + 'px;background-color:' + LEFT_MENU_CONFIG.tightFirstMenuBgColor + ';border-bottom:1px solid ' + LEFT_MENU_CONFIG.tightFirstMenuBBColor + ';}' +
            '.m-menu .mouse-menu h3.selected{background-color:' + LEFT_MENU_CONFIG.tightFirstMenuSelectedColor + '}' +
            '.m-menu .mouse-menu p{height:' + LEFT_MENU_CONFIG.tightSecondMenuHeight + 'px;line-height:' + LEFT_MENU_CONFIG.tightSecondMenuHeight + 'px;font-size:' + LEFT_MENU_CONFIG.tightSecondMenuFontSize + 'px;border-top:1px solid ' + LEFT_MENU_CONFIG.tightSecondMenuTBColor + ';}' +
            '.m-menu .mouse-menu p:hover, .m-menu .mouse-menu p.active{background-color:' + LEFT_MENU_CONFIG.tightSecondMenuSelectedColor + ';}' +
            '.m-menu .ctrl{background-color:' + LEFT_MENU_CONFIG.ctrlBgColor + ';}' +
            '.m-menu .menus > dl{width:' + LEFT_MENU_CONFIG.expandWidth + 'px;height:' + LEFT_MENU_CONFIG.expandHeight + 'px;border-bottom: 1px solid ' + LEFT_MENU_CONFIG.expandBBColor + ';background-color:' + LEFT_MENU_CONFIG.expandBgColor + '}' +
            '.m-menu .menus > dl:hover{background-color:' + LEFT_MENU_CONFIG.expandHoverColor + ';}' +
            '.m-menu .menus > dl > dt{height:' + LEFT_MENU_CONFIG.expandHeight + 'px;line-height:' + LEFT_MENU_CONFIG.expandHeight + 'px;font-size:' + LEFT_MENU_CONFIG.expandFirstMenuFontSize + 'px;}' +
            '.m-menu .menus > dl.selected > dt, .m-menu .menus > dl.selected > dt:hover{background-color:' + LEFT_MENU_CONFIG.expandSelectedColor + ';}' +
            '.m-menu .menus > dl > dt > i{top:' + (LEFT_MENU_CONFIG.expandHeight - 10) / 2 + 'px;}' +
            '.m-menu .menus > dl.active > dt > i{top:' + (LEFT_MENU_CONFIG.expandHeight - 6) / 2 + 'px;}' +
            '.m-menu .menus > dl > dd{height:' + LEFT_MENU_CONFIG.expandSecondMenuHeight + 'px;line-height:' + LEFT_MENU_CONFIG.expandSecondMenuHeight + 'px;font-size:' + LEFT_MENU_CONFIG.expandSecondMenuFontSize + 'px;background-color:' + LEFT_MENU_CONFIG.expandSecondMenuBgColor + ';border-top: 1px solid ' + LEFT_MENU_CONFIG.expandSecondMenuBTColor + ';}' +
            '.m-menu .menus > dl > dd:hover, .m-menu .menus > dl > dd.active{background-color:' + LEFT_MENU_CONFIG.expandSecondMenuSelectedColor + ';}' +
            '.m-content{top:' + HEADER_STYLE_CONFIG.headerHeight + 'px;left:' + LEFT_MENU_CONFIG.expandWidth + 'px;}';
    //左侧菜单动态样式设置
    if ('styleSheet' in style_dom) {
        style_dom.setAttribute('type', 'text/css');
        style_dom.styleSheet.cssText = style_tmp;
    } else {
        style_dom.innerHTML = style_tmp;
    }
    //页面路由设置
    var routes = {
        '/adminTenant': function(){
            $content.load('admin/system/tenant.html');
        },
        '/adminApply': function(){
            $content.load('admin/system/apply.html');
        },
        '/adminUser': function(){
            $content.load('admin/system/user.html');
        },
        '/userGroup': function(){
            $content.load('html/system/group.html');
        },
        '/userProject': function(){
            $content.load('html/system/project.html');
        },
        '/userMember/:memberId': function(memberId){
            $content.load('html/system/proMember.html').data("ProjectInfo", {
                id: memberId
            });
        },
        '/userRole': function(){
            $content.load('html/system/role.html');
        },
        '/userUser': function(){
            $content.load('html/system/user.html');
        }
    };
    var router = Router(routes);
    router.init();
    window.router=router;
    // if (isLogin()) {
    //     //登录用户名
    //     $('#topAdminName').text(getUserData().userName);
    //     //加载登陆后的角色再切换菜单[待优化:页面加载菜单前,空白错乱...]
    //     var roleName = getUserData().loginName;
    //     if (roleName == 'admin') {
    //         var jsondata = {
    //             "t_menus": [
    //                 {
    //                     "id": 1,
    //                     "name": "前台首页",
    //                     "url": "../../../index.html",
    //                     "active": "0"
    //                 },
    //                 {
    //                     "id": 2,
    //                     "name": "运维管理中心",
    //                     "url": "",
    //                     "active": "1"
    //                 }
    //             ],
    //             "l_menus": {
    //                 "id": 7,
    //                 "menus": [
    //                     {
    //                         "name": "内容管理",
    //                         "icon": "img/home_icon.png",
    //                         "sub_menus": [
    //                             {
    //                                 "name": "租户管理",
    //                                 "url": "/adminTenant"
    //                             },
    //                             {
    //                                 "name": "用户管理",
    //                                 "url": "/adminUser"
    //                             },
    //                             {
    //                                 "name": "应用管理",
    //                                 "url": "/adminApply"
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             }
    //         }
    //         loadMenu(jsondata);
    //         router.setRoute('/adminTenant');
    //     } else {
    //         //普通管理员
    //         var jsondata = {
    //             "t_menus": [
    //                 {
    //                     "id": 1,
    //                     "name": "前台首页",
    //                     "url": "../../../index.html",
    //                     "active": "0"
    //                 },
    //                 {
    //                     "id": 2,
    //                     "name": "运维管理中心",
    //                     "url": "",
    //                     "active": "1"
    //                 }
    //             ],
    //             "l_menus": {
    //                 "id": 7,
    //                 "menus": [
    //                     {
    //                         "name": "内容管理",
    //                         "icon": "img/home_icon.png",
    //                         "sub_menus": [
    //                             {
    //                                 "name": "用户管理",
    //                                 "url": "/userUser"
    //                             },
    //                             {
    //                                 "name": "组织管理",
    //                                 "url": "/userGroup"
    //                             },
    //                             {
    //                                 "name": "权限管理",
    //                                 "url": "/userRole"
    //                             },
    //                             {
    //                                 "name": "角色管理",
    //                                 "url": "/userProject"
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             }
    //         }
    //         loadMenu(jsondata);
    //         router.setRoute('/userUser');
    //     }
    // }
    window.history.forward();
    var res = {
        "status": true,
        "httpstatus": 200,
        "data": {
            "id": 7,
            "role": "1",
            "passwd": "0a594152643e2501c10effcfdb4bc6a0",
            "uUserDTO": {
                "id": 8,
                "createdTime": "2017-06-29 17:15:28",
                "email": "123456",
                "groupId": 1,
                "mobileNo": "1213456",
                "status": 1,
                "tenantId": 1,
                "userName": "linan"
            }
        },
        "isValidateMessage": false,
        "messages": [],
        "validateMessages": {}
    }
    var userinfo = res.data.uUserDTO;
    userinfo.role = res.data.loginName;
    sessionStorage.setItem('USER_INFO', JSON.stringify(userinfo));
    var  username=JSON.parse(sessionStorage.getItem('USER_INFO')).userName;
    //登录用户名
        $('#topAdminName').text(username);

    //加载登陆后的角色再切换菜单[待优化:页面加载菜单前,空白错乱...]
            //普通管理员
            var jsondata = {
                "t_menus": [
                    {
                        "id": 1,
                        "name": "前台首页",
                        "url": "../../../index.html",
                        "active": "0"
                    },
                    {
                        "id": 2,
                        "name": "运维管理中心",
                        "url": "",
                        "active": "1"
                    }
                ],
                "l_menus": {
                    "id": 7,
                    "menus": [
                        {
                            "name": "内容管理",
                            "icon": "img/home_icon.png",
                            "sub_menus": [
                                {
                                    "name": "用户管理",
                                    "url": "/userUser"
                                },
                                {
                                    "name": "组织管理",
                                    "url": "/userGroup"
                                },
                                {
                                    "name": "权限管理",
                                    "url": "/userRole"
                                },
                                {
                                    "name": "角色管理",
                                    "url": "/userProject"
                                }
                            ]
                        }
                    ]
                }
            };
            loadMenu(jsondata);
            router.setRoute('/userUser');

    function loadMenu(data) {
        var t_menus = data.t_menus;
        var l_menus = data.l_menus.menus;
        for (var i = 0, ilen = t_menus.length; i < ilen; i++) {
            if (t_menus[i].active == 1) {
                $h_menu.append('<li><a href="' + t_menus[i].url + '" class="active" target="_blank" >' + t_menus[i].name + '</a></li>');
            } else {
                $h_menu.append('<li><a href="' + t_menus[i].url + '" target="_blank">' + t_menus[i].name + '</a></li>');
            }
        }
        for (var j = 0, jlen = l_menus.length; j < jlen; j++) {
            var $dl = null;
            var first_item = l_menus[j];
            if (j == 0) {
                $dl = $('<dl class="selected active"><dt style="background-image: url(' + first_item.icon + ')">' + first_item.name + '<i></i></dt></dl>').height(LEFT_MENU_CONFIG.expandHeight + first_item.sub_menus.length * (LEFT_MENU_CONFIG.expandSecondMenuHeight));
            } else {
                $dl = $('<dl><dt style="background-image: url(' + first_item.icon + ')">' + first_item.name + '<i></i></dt></dl>');
            }
            for (var k = 0, klen = first_item.sub_menus.length; k < klen; k++) {
                var second_item = first_item.sub_menus[k];
                var $dd = null;
                if (j == 0 && k == 0) {
                    $dd = $('<dd class="active" hrefurl="' + second_item.url + '">' + second_item.name + '</dd>');
                } else {
                    $dd = $('<dd hrefurl="' + second_item.url + '">' + second_item.name + '</dd>');
                }
                $dl.append($dd);
            }
            $l_menu.append($dl);
        }
    }    
    //控制左侧菜单展开收缩效果
    $left_menu.on('click', '.ctrl i', function () {
        var $this = $(this);
        $left_menu.toggleClass('tight').toggleClass('expand');
        if ($left_menu.hasClass('tight')) {
            leftMenurRtract();
            $this.addClass('shou');
            $content.css('left', 50);
        } else {
            $this.removeClass('shou');
            $content.css('left', LEFT_MENU_CONFIG.expandWidth);
        }
    })
    //左侧菜单绑定点击事件
    $doc.on('click', '.expand dl dt', function () {
        var $this = $(this);
        console.log($this);
        var $parent = $this.parent();
        var $siblings = $parent.siblings();
        $parent.toggleClass('active');
        $siblings.removeClass('active');
        if ($parent.hasClass('active')) {
            var count = $parent.find('dd').length;
            $parent.height(LEFT_MENU_CONFIG.expandHeight + count * (LEFT_MENU_CONFIG.expandSecondMenuHeight));
        } else {
            $parent.height(LEFT_MENU_CONFIG.expandHeight);
        }
        $siblings.each(function (index, item) {
            $(item).height(LEFT_MENU_CONFIG.expandHeight);
        });
    });
    //点击左侧二级菜单动画效果
    $doc.on('click', '.expand dl dd', function () {
        var $this = $(this);
        $this.addClass('active').siblings().removeClass('active');
        $this.parent().addClass('selected').siblings().removeClass('selected');
        $this.parent().siblings().find('dd').removeClass('active');
        if ($this.attr('hrefurl')) {
            router.setRoute($this.attr('hrefurl'));
        }
    });
    //收缩后左侧菜单绑定鼠标移入效果
    $doc.on('mouseover', '.tight dl', function () {
        var $this = $(this);
        var $mouseMenu = $left_menu.find('.mouse-menu');
        if ($this.hasClass('selected')) {
            $mouseMenu.html('<h3 class="selected">' + $this.find('dt').text() + '</h3>');
        }
        else {
            $mouseMenu.html('<h3>' + $this.find('dt').text() + '</h3>');
        }
        $this.find('dd').each(function (index, item) {
            if ($(item).hasClass('active')) {
                $mouseMenu.append('<p hrefurl=' + $(item).attr('hrefurl') + ' class="active">' + $(item).text() + '</p>');
            } else {
                $mouseMenu.append('<p hrefurl=' + $(item).attr('hrefurl') + '>' + $(item).text() + '</p>');
            }
        });
        $mouseMenu.css('top', $this.offset().top - $header.height()).show().data('target', $this);
    });
    //收缩后左侧菜单绑定鼠标移出效果
    $doc.on('mouseout', '.tight dl', function () {
        $left_menu.find('.mouse-menu').hide();
    });

    //左侧菜单收起
    function leftMenurRtract() {
        $left_menu.find('dl').removeClass('active').height(LEFT_MENU_CONFIG.expandHeight);
    }

    //收缩后移入移出菜单交互事件
    $left_menu.on('mouseover', '.mouse-menu', function () {
        var $this = $(this);
        $this.data('target').find('dt').addClass('hover');
        $this.show();
    });
    $left_menu.on('mouseout', '.mouse-menu', function () {
        var $this = $(this);
        $this.data('target').find('dt').removeClass('hover');
        $this.hide();
    });
    //收缩后左侧二级菜单点击事件
    $doc.on('click', '.tight .mouse-menu p', function () {
        var $this = $(this);
        $this.addClass('active').siblings().removeClass('active');
        $this.siblings('h3').addClass('selected');
        var $target = $this.parent().data('target');
        $target.addClass('selected').siblings().removeClass('selected');
        $target.find('dd').removeClass('active');
        $target.siblings().find('dd').removeClass('active');
        $target.find('dd:contains(' + $this.text() + ')').addClass('active');
        if ($this.attr('hrefurl') && $this.attr('hrefurl') != 'undefined') {
            router.setRoute($this.attr('hrefurl'));
        }
    });

    //修改个人信息
    $('#editPersonal').on('click', function () {
        var adminid = isLogin();
        var evframe = 'editAdmin';
        var config = {
            ev: evframe,
            title: '个人信息',
            width: 550,
            height: 400,
            loadhtml: '<div class="pop-form"><ul class="list-unstyled"><li><span class="text-label">用户名称：</span><div class="pop-right"><input class="form-control" type="text" id="adminname" disabled="disabled"/></div></li><li><span class="text-label">用户姓名：</span><div class="pop-right"><input class="form-control" id="adminreal" type="text" data-toggle="tooltip" data-trigger="manual" data-placement="bottom" data-title="用户姓名不能为空！" onfocus="$(this).tooltip(\'hide\');"/></div><span class="empty-tip">*</span></li><li><span class="text-label">手机号码：</span><div class="pop-right"><input class="form-control" id="admintel" type="text" data-toggle="tooltip" data-trigger="manual" data-placement="bottom" data-title="手机号码不能为空！" onfocus="$(this).tooltip(\'hide\');"/></div><span class="empty-tip">*</span></li><li><span class="text-label">邮箱账号：</span><div class="pop-right"><input class="form-control" id="adminemail" type="text" data-toggle="tooltip" data-trigger="manual" data-placement="bottom" data-title="邮箱账号不能为空！" onfocus="$(this).tooltip(\'hide\');"/></div><span class="empty-tip">*</span></li><li><span class="text-label">所属分组：</span><div class="pop-right"><input class="form-control" id="admingroup" type="text" disabled="disabled"/></div></li></ul></div>',
            loadafter: function () {
                myTooltips({
                    state: 'info',
                    time: 10000,
                    message: '加载个人信息，请稍后...'
                });
                _ajax({
                    url: GLOBAL_AJAX_URL.adminDetail,
                    success: function (res) {
                        if (res.status) {
                            myToolhide();
                            $('#adminname').val(res.data.loginName);
                            $('#adminreal').val(res.data.userName);
                            $('#admintel').val(res.data.mobileNo);
                            $('#adminemail').val(res.data.email);
                            $('#admingroup').val(res.data.groupName);
                        } else {
                            myTooltips({
                                state: 'danger',
                                message: res.message
                            });
                        }
                    }
                });
            },
            callback: function () {                
                var data = {
                    userName: $('#adminreal').val(),
                    mobileNo: $('#admintel').val(),
                    email: $('#adminemail').val()
                }
                if (!data.userName) {
                    $('#adminreal').tooltip('show');
                } else if (!data.mobileNo) {
                    $('#admintel').tooltip('show');
                } else if (!data.email) {
                    $('#adminemail').tooltip('show');
                } else {
                    myTooltips({
                        state: 'info',
                        time: 10000,
                        message: '请稍后...'
                    });
                    _ajax({
                        url: GLOBAL_AJAX_URL.adminEdit,
                        data: data,
                        success: function (res) {
                            if (res.status) {
                                closeMymodal(evframe + 'myModal');
                                myTooltips({
                                    state: 'success',
                                    message: '修改信息成功！'
                                });
                            } else {
                                myTooltips({
                                    state: 'danger',
                                    message: res.message
                                });
                            }
                        }
                    });
                }
            }
        }
        loadMyModal(config);
    });
    //修改密码
    $('#editPassword').on('click', function () {
        var adminid = isLogin();
        var evframe = 'editWord';
        var config = {
            ev: evframe,
            title: '修改密码',
            width: 450,
            height: 300,
            loadhtml: '<div class="pop-form"><ul class="list-unstyled"><li><span class="text-label">旧密码：</span><div class="pop-right"><input class="form-control" id="oldpassword" type="password" data-toggle="tooltip" data-trigger="manual" data-placement="bottom" data-title="密码不能为空！" onfocus="$(this).tooltip(\'hide\');"/></div><span class="empty-tip">*</span></li><li><span class="text-label">新密码：</span><div class="pop-right"><input class="form-control" id="newpassword" type="password" data-toggle="tooltip" data-trigger="manual" data-placement="bottom" data-title="请输入新密码！" onfocus="$(this).tooltip(\'hide\');"/></div><span class="empty-tip">*</span></li><li><span class="text-label">确认密码：</span><div class="pop-right"><input class="form-control" id="repassword" type="password"  data-toggle="tooltip" data-trigger="manual" data-placement="bottom" title="请再次输入新密码！" onfocus="$(this).tooltip(\'hide\');"/></div><span class="empty-tip">*</span></li></ul></div>',
            callback: function () {
                var oldPwd = $('#oldpassword').val()
                    newPwd = $('#newpassword').val(),
                    reNewPwd = $('#repassword').val();
                
                if (!oldPwd) {
                    $('#oldpassword').tooltip('show');
                } else if (!newPwd) {
                    $('#newpassword').tooltip('show');
                } else if (newPwd != reNewPwd) {
                    $('#repassword').attr('title', "两次输入的密码不一致").tooltip('show');
                } else {
                    myTooltips({
                        state: 'info',
                        time: 10000,
                        message: '请稍后...'
                    });
                    _ajax({
                        url: GLOBAL_AJAX_URL.adminPwd,
                        data: {
                            oldPsw:oldPwd,
                            newPsw: newPwd
                        },
                        success: function (res) {
                            if (res.status) {
                                closeMymodal(evframe + 'myModal');
                                myTooltips({
                                    state: 'success',
                                    message: '修改密码成功！'
                                });
                            } else {
                                myTooltips({
                                    state: 'danger',
                                    message: res.message
                                });
                            }
                        }
                    });
                }
            }
        }
        loadMyModal(config);
    });
    //退出系统
    $('#exitSystem').on('click', function () {
        clearUserid();
        myTooltips({
            state: 'success',
            message: '已成功退出系统！'
        });
        setTimeout("window.location = llogin1.html", 2000);
    });
});