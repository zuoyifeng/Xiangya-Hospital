$(function(){
    //登陆页面
//用户名
    var $username = $('#username');
//密码
    var $password = $('#password');
//提示文字对象
    var $info = $('#info');
//登录按钮
    var $loginbtn = $('#loginbtn');
//验证码
    var $importcode = $('#importcode');
    var res = {
        "status": true,
        "httpstatus": 200,
        "data": {
            "id": 7,
            "role": "3",
            "passwd": "0a594152643e2501c10effcfdb4bc6a0",
            "uUserDTO": {
                "id": 8,
                "createdTime": "2017-06-29 17:15:28",
                "email": "123456",
                "groupId": 1,
                "mobileNo": "1213456",
                "status": 1,
                "tenantId": 1,
                "userName": "linannan"
            }
        },
        "isValidateMessage": false,
        "messages": [],
        "validateMessages": {}
    };

    var userinfo = res.data.uUserDTO;
    userinfo.role = res.data.role;
    console.log(userinfo.role);
    sessionStorage.setItem('USER', JSON.stringify(userinfo));
//是否可以提交表单
    $loginbtn.click(function () {
        console.log(1);
        var username = $.trim($username.val());
        var password = $.trim($password.val());
        var importcode = $.trim($importcode.val());
        if (!username) {
            $info.css('visibility', 'visible').text('用户名不能为空');
            $username.focus();
            return false;
        }
        if (!password) {
            $info.css('visibility', 'visible').text('密码不能为空');
            $password.focus();
            return false;
        }
        if (!importcode) {
            $info.css('visibility', 'visible').text('验证码不能为空');
            $importcode.focus();
            return false;
        }

        window.location = '../../index.html';
    });
//点击确定按钮提交表单
    $(document).on('keyup', function (e) {
        if (e.keyCode == '13') {
            $loginbtn.trigger('click');
        }
    });



//判断角色登陆
    var data = JSON.parse(sessionStorage.getItem('USER'));
    console.log(data);
//角色是医生
    if (data.role == 1) {
        $('.head_menu').html();
        var html = '<ul class="container clearfix"><li><a href="###">首页·HOME</a></li><li class="menu_line"></li><li><a href="html/workbench/dashboard.html">我的工作台</a></li> <li class="menu_line"></li> <li><a href="html/consul/consuladd.html">会诊</a></li> <li class="menu_line"></li> <li><a href="html/referral/referraladd.html">转诊</a></li> <li class="menu_line"></li> <li><a href="http://www.hancloudclinic.com:8084/FormParser">大数据平台</a></li> <li class="menu_line"></li> <li><a href="###">医联体论坛</a></li> <li class="menu_line"></li> <li><a href="###">便民服务</a></li> <li class="menu_line"></li> <li><a href="###">在线咨询</a></li> </ul>';
        $('.head_menu').html(html);
        $('.head_tool').html('欢迎登录' + '<span>' + data.userName + '</span>' + '<span class="quit">' + '退出' + '</span>');
    } else if (data.role == 2) {
        //角色是系统管理员
        $('.head_menu').html();
        var html = '<ul class="container clearfix"> <li><a href="###">首页·HOME</a></li><li class="menu_line"></li><li><a href="admin/index.html">运维管理</a></li><li class="menu_line"></li> <li><a href="http://www.hancloudclinic.com:8084/FormParser">大数据平台</a></li> <li class="menu_line"></li> <li><a href="###">医联体论坛</a></li> <li class="menu_line"></li> <li><a href="###">便民服务</a></li> <li class="menu_line"></li> <li><a href="###">在线咨询</a></li> </ul>';
        $('.head_menu').html(html);
        $('.head_tool').html('欢迎登录' + '<span>' + data.userName + '</span>' + '<span class="quit">' + '退出' + '</span>');
    } else if (data.role == 3) {
        window.history.back();
        //$('.head_tool').html('欢迎登录' + '<span>' + data.userName + '</span>');
    }
    $('.quit').click(function () {
        clearUserid();
        setTimeout("window.location = lindex1.html", 2000);
    });



    function clearUserid() {
        sessionStorage.removeItem("USER_INFO");
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