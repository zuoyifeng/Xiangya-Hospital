$(function () {
    //监听session
    if(window.addEventListener){
        window.addEventListener("storage",handle_storage,false);
    }else if(window.attachEvent){
        window.attachEvent("onstorage",handle_storage);
    }
    function handle_storage(e){
        if(!e){e=window.event;}
    }
    //读取头部
    var data = JSON.parse(sessionStorage.getItem('USER'));
    if (data && data.role == 1) {
        $('#nav').html('<li><a href="../../index.html">首页</a></li> <li class="menu_line"></li> <li><a href="../workbench/todolist.html">我的工作台</a></li> <li class="menu_line"></li> <li><a href="../consul/consuladd.html">会诊/转诊</a></li> <li class="menu_line"></li> <li><a href="http://www.hancloudclinic.com:8084/FormParser">大数据平台</a></li> <li class="menu_line"></li> <li><a href="###">医联体论坛</a></li> <li class="menu_line"></li> <li><a href="###">便民服务</a></li><li class="menu_line"></li> <li><a href="###">在线咨询</a></li>');
        $('.head_tool').html('欢迎登录<span>' + data.uUserDTO.userName + '</span>' + '，' + '<span class="quit">' + '退出' + '</span>');
    } else if (data && data.role == 2) {
        $('#nav').html('<li><a href="../../index.html">首页</a></li> <li class="menu_line"></li> <li><a href="admin/index.html">运维管理</a></li> <li class="menu_line"></li> <li class="menu_line"></li> <li><a href="http://www.hancloudclinic.com:8084/FormParser">大数据平台</a></li> <li class="menu_line"></li> <li><a href="###">医联体论坛</a></li> <li class="menu_line"></li> <li><a href="###">便民服务</a></li><li class="menu_line"></li> <li><a href="###">在线咨询</a></li>');
        $('.head_tool').html('欢迎登录<span>' + data.uUserDTO.userName + '</span>' + '，' + '<span class="quit">' + '退出' + '</span>');
    } else if (data && data.role ==  3) {
        window.history.back();
        $('.head_tool').html('欢迎登录' + '<span>' + data.uUserDTO.userName + '</span>' + '，' + '<span class="quit">' + '退出' + '</span>');
    } else {
        var html = '<li><a href="../../index.html">首页</a></li><li class="menu_line"></li><li><a href="http://www.hancloudclinic.com:8084/FormParser">大数据平台</a></li><li class="menu_line"></li><li><a href="###">医联体论坛</a></li><li class="menu_line"></li><li><a href="###">便民服务</a></li><li class="menu_line"></li><li><a href="###">在线咨询</a></li>';
        $('#nav').html(html);

    }

    //点击退出
    $('.head_tool').on('click', 'span.quit', function () {
        clearUserid();
        window.location = '../../index.html';
    })

    //tab切换
    $('.ya-tab>.ya-tab-li').on('click', function () {
        $(this).addClass('active').siblings('span.ya-tab-li').removeClass('active');
        var showid = $(this).attr('show');
        $('.ya-tabcont #' + showid).show().siblings('.ya-tabcont .ya-tab-ul').hide();
    });
})
    // 清除session
    function clearUserid() {
        sessionStorage.removeItem("USER");
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

