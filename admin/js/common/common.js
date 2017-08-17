//加载配置模态modal组件
function loadMyModal(param) {
    $html = $('<div class="modal fade" id="' + param.ev + 'myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop="false">' +
        '<div class="modal-dialog" role="document" aria-hidden="true" style="width:' + param.width + 'px">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close"  onclick="closeMymodal(\'' + param.ev + 'myModal\')" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
        '<h4 class="modal-title" id="myModalLabel">' + param.title + '</h4></div>' +
        '<div class="modal-body" style="min-height:' + (param.height - 120) + 'px">' + param.loadhtml + '</div>' +
        '<div class="modal-footer"><button type="button" class="btn btn-default" onclick="closeMymodal(\'' + param.ev + 'myModal\')">关闭</button>' +
        '<button type="button" class="btn btn-primary confirmBtn">确定</button>' +
        '</div></div></div></div>');

    $('body').append($html);
    $html.find('.confirmBtn').on('click', param.callback);
    $('#' + param.ev + 'myModal').modal();
    if (param.loadafter) {
        param.loadafter();
    }
}

function closeMymodal(ev) {
    $('#' + ev).modal('hide').on('hidden.bs.modal', function () {
        $(this).remove();
        //ps：弹出框有遮罩时还需要加上去除遮罩代码
    });
}

/**私有提示助手**待优化项:提交数据加载是，可以和ajax提交超时进行呼应10ms***/
//1.成功 alert-success 2.信息 alert-info
//3.警告 alert-warning 4.错误 alert-danger
var evTimer = null;

function myTooltips(param) {
    param.state = param.state || 'info';
    param.type = param.type || '提示';
    param.time = param.time || 2000;
    if ($("#myAlert").length > 0) {
        $('#myAlert').remove();
        if (evTimer) {
            clearTimeout(evTimer);//第一次和第二次定时不受影响
            evTimer = null; //释放内存
        }
    }
    $('body').append('<div id="myAlert" class="alert et-alert alert-' + param.state + ' animated fadeInDown"><a href="#" class="close" data-dismiss="alert">&times;</a><strong>' + param.type + '：</strong>' + param.message + '</div>');
    $('#myAlert').css({marginLeft: -($('#myAlert').width() + 32) / 2});
    evTimer = setTimeout("$('#myAlert').remove()", param.time);
}

function myToolhide() {
    $('#myAlert').remove();
    clearTimeout(evTimer);
}

/******管理员相关方法开始********/

//getUserData 获取当前用户标识
function getUserData() {
    //return JSON.parse(sessionStorage.getItem('USER_INFO'));
    console.log(JSON.parse(sessionStorage.getItem('USER_INFO')));
}

//isLogin 检测是否已经登录
function isLogin() {
    var userid = getUserData();
    if (userid && userid != 'undefined') {
        return userid.id;
    } else {
        //提示并跳转到登陆页
       window.location.href = "login.html";
    }
}

//清除登录信息
function clearUserid() {
    sessionStorage.removeItem("USER_INFO");
}

/******管理员相关方法结束********/

//封装ajax请求
function _ajax(opt) {
    //console.log(opt.data);
    $.ajax({
        url: opt.url,
        timeout: 10000,
        type: opt.type || 'POST',
        dataType: 'json',
        cache: false,
        data: opt.data,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (textStatus == 'timeout') {
                myTooltips({
                    state: 'danger',
                    message: '加载超时，请重试'
                });
            } else {
                myTooltips({
                    state: 'danger',
                    message: '连接出错，请检查网络！'
                });
            }
        },
        success: opt.success
    });
}

//生成分页代码
//$dom:分页节点
//totals：总记录数
//page_size：一页数量
//current_page：当前页数
function generatePagination($dom, totals, page_size, current_page) {
    $dom.find('.sum span').text(totals);//设置总记录数
    var total_page = Math.ceil(parseInt(totals) / parseInt(page_size));//总页数
    if (total_page <= 1) {
        $dom.find('.m-pagination').addClass('hide');
        return false;
    }
    $dom.find('.m-pagination').removeClass('hide');
    $dom.find('input').val(current_page);
    $dom.find('.creatli').remove();
    var $first = $dom.find('.first');
    var $prev = $dom.find('.prev');
    var $next = $dom.find('.next');
    var $last = $dom.find('.last');
    $first.removeClass('disabled');
    $prev.removeClass('disabled');
    $next.removeClass('disabled');
    $last.removeClass('disabled');
    if (total_page <= 5) {
        for (var i = 1; i <= total_page; i++) {
            addliPagination($next, i, current_page);
        }
    } else {
        if (current_page <= 3) {
            for (var i = 1; i <= 5; i++) {
                addliPagination($next, i, current_page);
            }
        } else if (current_page >= (total_page - 2)) {
            for (var i = (total_page - 4); i <= total_page; i++) {
                addliPagination($next, i, current_page);
            }
        } else {
            for (var i = (current_page - 2); i <= (current_page + 2); i++) {
                addliPagination($next, i, current_page);
            }
        }
    }
    $prev.attr('pagenum', current_page - 1);
    $next.attr('pagenum', current_page + 1);
    $last.attr('pagenum', total_page);
    if (current_page == 1) {
        $first.addClass('disabled');
        $prev.addClass('disabled');
    }
    if (current_page == total_page) {
        $last.addClass('disabled');
        $next.addClass('disabled');
    }
};

//分页生成li方法
function addliPagination($dom, index, current_page) {
    var $li = $('<li>');
    $li.addClass('creatli').attr('pagenum', index);
    if (current_page == index) {
        $li.addClass('active');
    }
    var $a = $('<a>');
    $a.text(index);
    $li.append($a);
    $dom.before($li);
}

//分页控件各事件注册
function page_event_register(reloadGridData) {
    //分页点击事件
    $('.m-pagenav').on('click', '.m-pagination li:not(.disabled)', function () {
        var current_page = $(this).attr('pagenum');
        var pagesize = $('.m-pagenav .sum select').val();
        reloadGridData(current_page, pagesize);
    });
    //分页按钮确定点击事件
    $('.m-pagenav').on('click', '.inputbox a', function () {
        var pagesize = $('.m-pagenav .sum select').val();
        var current_page = parseInt($.trim($('.m-pagenav .inputbox input').val()));
        var total_page = parseInt($.trim($('.m-pagenav .pagination .last').attr('pagenum')));
        if (!current_page || current_page == 0) {
            current_page = 1;
        }
        if (current_page > total_page) {
            current_page = total_page;
        }
        reloadGridData(current_page, pagesize);
    });
    //分页输入框回车事件
    $('.m-pagenav').on('keyup', '.inputbox input', function (event) {
        if (event.keyCode == '13') {
            $('.m-pagenav .inputbox a').trigger('click');
        }
    });
    //每页展示多少条改变事件
    $('.m-pagenav .sum select').change(function () {
        var pagesize = $(this).val();
        reloadGridData(1, pagesize);
    });
}

