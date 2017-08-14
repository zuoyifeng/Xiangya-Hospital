$(function () {
    //用户名
    var $username = $('#username');
    //密码
    var $password = $('#password');
    //提示文字对象
    var $info = $('#info');
    //登录按钮
    var $loginbtn = $('#loginbtn');
    //是否可以提交表单
    $loginbtn.click(function () {
        var username = $.trim($username.val());
        var password = $.trim($password.val());
        if (!username) {
            $info.removeClass('hide').text('用户名不能为空');
            $username.focus();
            return false;
        }
        if (!password) {
            $info.removeClass('hide').text('密码不能为空');
            $password.focus();
            return false;
        }
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
        sessionStorage.setItem('USER', JSON.stringify(res.data));
        console.log(JSON.parse(sessionStorage.getItem('USER_INFO')));
        window.location = '../../index.html';
    })

    var data = JSON.parse(sessionStorage.getItem('USER'));
    console.log(data);
    if (data && data.role == 1) {
        console.log(1);
        $('.head_menu').html();
        var html = '<ul class="container clearfix"> <li><a href="###">首页·HOME</a></li> <li class="menu_line"></li> <li><a href="html/workbench/dashboard.html">我的工作台</a></li> <li class="menu_line"></li> <li><a href="html/consul/consuladd.html">会诊</a></li> <li class="menu_line"></li> <li><a href="html/referral/referraladd.html">转诊</a></li> <li class="menu_line"></li> <li><a href="http://www.hancloudclinic.com:8084/FormParser">大数据平台</a></li> <li class="menu_line"></li> <li><a href="###">医联体论坛</a></li> <li class="menu_line"></li> <li><a href="###">便民服务</a></li><li class="menu_line"></li> <li><a href="###">在线咨询</a></li> </ul>';
        $('.head_menu').html(html);
        $('.head_tool').html('欢迎登录' + '<span>' + data.uUserDTO.userName + '</span>' + ',' + '<span class="quit">' + '退出' + '</span>');
    } else if (data && data.role == 2) {
        var html = '<ul class="container clearfix"> <li><a href="###">首页·HOME</a></li> <li class="menu_line"></li> <li><a href="admin/index.html">运维管理</a></li> <li class="menu_line"></li> <li class="menu_line"></li> <li><a href="http://www.hancloudclinic.com:8084/FormParser">大数据平台</a></li> <li class="menu_line"></li> <li><a href="###">医联体论坛</a></li> <li class="menu_line"></li> <li><a href="###">便民服务</a></li><li class="menu_line"></li> <li><a href="###">在线咨询</a></li> </ul>';
        $('.head_menu').html(html);
        $('.head_tool').html('欢迎登录' + '<span>' + data.uUserDTO.userName + '</span>' + ',' + '<span class="quit">' + '退出' + '</span>');
    } else if (data && data.role ==  3) {
        window.history.back();
        $('.head_tool').html('欢迎登录' + '<span>' + data.uUserDTO.userName + '</span>' + ',' + '<span class="quit">' + '退出' + '</span>');
    } else {
        $('.head_menu').html();
        var html = '<ul class="container clearfix"><li><a href="###">首页</a></li><li class="menu_line"></li><li><a href="http://www.hancloudclinic.com:8084/FormParser">大数据平台</a></li><li class="menu_line"></li><li><a href="###">医联体论坛</a></li><li class="menu_line"></li><li><a href="###">便民服务</a></li><li class="menu_line"></li><li><a href="###">在线咨询</a></li></ul>';
        $('.head_menu').html(html);
    }


    $('.head_tool').on('click', 'span.quit', function () {
        clearUserid();
        window.location = 'index.html';
        $('.head_menu').html();
        var html = '<ul class="container clearfix"><li><a href="###">首页</a></li><li class="menu_line"></li><li><a href="http://www.hancloudclinic.com:8084/FormParser">大数据平台</a></li><li class="menu_line"></li><li><a href="###">医联体论坛</a></li><li class="menu_line"></li><li><a href="###">便民服务</a></li><li class="menu_line"></li><li><a href="###">在线咨询</a></li></ul>';
        $('.head_menu').html(html);
    })

    function clearUserid() {
        sessionStorage.removeItem("USER");
    }


//封装ajax请求
    function _ajax(opt) {
        $.ajax({
            url: opt.url,
            type: 'POST',
            dataType: 'json',
            cache: false,
            data: opt.data,
            success: opt.success
        });
    }
})


