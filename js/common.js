$(function () {
    //读取头部
    var loginData = getUserData();
    if(loginData){
        if (loginData.roleLogin == 1) {
            //医生
            $('#nav').html('<li><a id="home" href="../../index.html">首页</a></li> <li class="menu_line"></li> <li><a id="account" href="../account/todolist.html">我的工作台</a></li> <li class="menu_line"></li> <li><a id="consultation" href="../account/consulpatientadd.html">会诊/转诊</a></li> <li class="menu_line"></li> <li><a href="http://www.hancloudclinic.com:8084/FormParser">大数据平台</a></li> <li class="menu_line"></li> <li><a href="###">医联体论坛</a></li> <li class="menu_line"></li> <li><a href="###">便民服务</a></li><li class="menu_line"></li> <li><a href="###">在线咨询</a></li>');
            $('.head_menu ul li a').width(165);
        } else if (loginData.roleLogin == 3) {
            //系统管理
            $('#nav').html('<li><a id="home" href="../../index.html">首页</a></li> <li class="menu_line"></li> <li><a id="systemManage" href="../../admin.html">运维管理</a></li> <li class="menu_line"></li> <li><a href="http://www.hancloudclinic.com:8084/FormParser">大数据平台</a></li> <li class="menu_line"></li> <li><a href="###">医联体论坛</a></li> <li class="menu_line"></li> <li><a href="###">便民服务</a></li><li class="menu_line"></li> <li><a href="###">在线咨询</a></li>');
            $('.head_menu ul li a').width(195);
        }
        //登录信息
        $('#headAccount').html('欢迎登录 <a class="userlogin">' + loginData.userName + '</a>' + '，' + '<span class="quit">' + '退出' + '</span>');
    } else {
        $('#nav').html('<li><a id="home" href="../../index.html">首页</a></li><li class="menu_line"></li><li><a href="http://www.hancloudclinic.com:8084/FormParser">大数据平台</a></li><li class="menu_line"></li><li><a href="###">医联体论坛</a></li><li class="menu_line"></li><li><a href="###">便民服务</a></li><li class="menu_line"></li><li><a href="###">在线咨询</a></li>');
        $('#headAccount').html('<a href="login.html"><i class="fa fa-user"></i> 登录</a><a href="reg.html"><i class="fa fa-user-plus"></i> 注册</a>');
        $('.head_menu ul li a').width(230);
    }

    //点击退出
    $('#headAccount').on('click', 'span.quit', function () {
        clearUserid();
        window.location.reload(true);
    })
    //tab切换
    $('.ya-tab>.ya-tab-li').on('click', function () {
        $(this).addClass('active').siblings('span.ya-tab-li').removeClass('active');
        var showid = $(this).attr('show');
        $('.ya-tabcont #' + showid).show().siblings('.ya-tabcont .ya-tab-ul').hide();
    });
})

//getUserData 获取当前用户标识
function getUserData() {
    return JSON.parse(sessionStorage.getItem('UserData'));
}

//isLogin 检测是否已经登录
function isLogin() {
    var userid = getUserData();
    if (userid && userid != 'undefined') {
        return userid.id;
    } else {
        alert('您还没有登录,暂时没有权限访问，请先登录!');
        //提示并跳转到登陆页
        window.location.href = "../../login.html";
    }
}

//清除登录信息
function clearUserid() {
    sessionStorage.removeItem("UserData");
}

//ajax请求封装
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



