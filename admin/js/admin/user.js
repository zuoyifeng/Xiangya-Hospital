$(function () {
    var searchValue = $('#searchName').val(),//搜索
        tenantValue = $('#tenant').val(),//所属租户
        $dateNode = $('#dataNote'),
        pagenum = '',     //总数目
        pagesize = 10,    //每页显示数目
        pageindex = 1;    //当前页码

    if (GLOBAL_DEBUG) {
        //初始加载所属租户
        var tenantdata = GLOBAL_JSON.userTenant;
        var html = '';
        for (var i = 0, lens = tenantdata.data.length; i < lens; i++) {
            html += '<option value="' + tenantdata.data[i].id + '">' + tenantdata.data[i].tenantName + '</option>';
        }
        $('#tenant').append(html);

        var data = GLOBAL_JSON.userList;
        loadTable($dateNode, data.data, pagesize, pageindex)
    } else {
        //初始加载所属租户
        _ajax({
            url: GLOBAL_AJAX_URL.userTenant,
            success: function (res) {
                if (res.status) {
                    var html = '';
                    for (var i = 0, lens = res.data.length; i < lens; i++) {
                        html += '<option value="' + res.data[i].id + '">' + res.data[i].tenantName + '</option>';
                    }
                    $('#tenant').append(html);
                } else {
                    myTooltips({
                        state: 'danger',
                        message: res.message
                    });
                }
            }
        });
        var param = {
            tenantId: tenantValue,
            userName: searchValue,
            pageSize: pagesize,
            pageIndex: pageindex
        }
        ajaxLoading(param);
    }
    //全选事件
    $('#check_all').on('click', function () {
        if ($(this).prop('checked')) {
            $dateNode.find('.btn-check').prop('checked', true);
        } else {
            $dateNode.find('.btn-check').prop('checked', false);
        }
    });
    //查询事件
    $('#btn-query').on('click', function () {
        searchValue = $('#searchName').val();
        var param = {
            tenantId: tenantValue,
            userName: searchValue,
            pageSize: pagesize,
            pageIndex: 1
        }
        ajaxLoading(param);
    });
    //每页显示条数切换
    $('#pageSelect').on('change', function () {
        pagesize = $(this).val();
        var param = {
            tenantId: tenantValue,
            userName: searchValue,
            pageSize: pagesize,
            pageIndex: 1
        }
        ajaxLoading(param);
    });
    //所属租户切换
    $('#tenant').on('change', function () {
        tenantValue = $(this).val();
        var param = {
            tenantId: tenantValue,
            userName: searchValue,
            pageSize: pagesize,
            pageIndex: 1
        }
        ajaxLoading(param);
    });
    //跳转
    $('#goPage').on('click', function () {
        pageindex = $('#pageindex').val();
        //需要做页面最大页数判断
        var maxPage = Math.ceil(pagenum / pagesize);
        if (pageindex > maxPage) {
            var evframe = 'maxPage';
            var config = {
                ev: evframe,
                title: '警告信息',
                width: 350,
                height: 200,
                loadhtml: '您输入的页码超过最大页码，是否跳转到最后一页？',
                callback: function () {
                    closeMymodal(evframe + 'myModal');
                    pageindex = maxPage;
                    var param = {
                        tenantId: tenantValue,
                        userName: searchValue,
                        pageSize: pagesize,
                        pageIndex: pageindex
                    }
                    ajaxLoading(param);
                }
            }
            loadMyModal(config);
        } else if (pageindex < 1) {
            var evframe = 'minPage';
            var config = {
                ev: evframe,
                title: '警告信息',
                width: 350,
                height: 200,
                loadhtml: '您输入的页码少于1，是否跳转到第一页？',
                callback: function () {
                    closeMymodal(evframe + 'myModal');
                    pageindex = 1;
                    var param = {
                        tenantId: tenantValue,
                        userName: searchValue,
                        pageSize: pagesize,
                        pageIndex: pageindex
                    }
                    ajaxLoading(param);
                }
            }
            loadMyModal(config);
        } else {
            var param = {
                tenantId: tenantValue,
                userName: searchValue,
                pageSize: pagesize,
                pageIndex: pageindex
            }
            ajaxLoading(param);
        }
    })
    //新增事件
    $('#addBtn').on('click',function () {
        var evframe = 'add';
        var config = {
            ev: evframe,
            title: '新增用户',
            width: 550,
            height: 400,
            loadhtml: '<div class="pop-form"><ul class="list-unstyled"><li><span class="text-label">用户名：</span><div class="pop-right"><input class="form-control" type="text" id="user_name"  data-toggle="tooltip" data-trigger="manual" data-placement="bottom" data-title="用户名不能为空！" onfocus="$(this).tooltip(\'hide\');"/></div><span class="empty-tip">*</span></li><li><span class="text-label">真实姓名：</span><div class="pop-right"><input class="form-control" type="text" id="realname"  data-toggle="tooltip" data-trigger="manual" data-placement="bottom" data-title="真实姓名不能为空！" onfocus="$(this).tooltip(\'hide\');"/></div><span class="empty-tip">*</span></li><li><span class="text-label">手机号码：</span><div class="pop-right"><input class="form-control" type="text" id="usertel"  data-toggle="tooltip" data-trigger="manual" data-placement="bottom" data-title="手机号格式不对，请重新输入！" onfocus="$(this).tooltip(\'hide\');"/></div></li><li><span class="text-label">邮箱账号：</span><div class="pop-right"><input class="form-control" type="text" id="useremail"  data-toggle="tooltip" data-trigger="manual" data-placement="bottom" data-title="邮箱账号格式有误！" onfocus="$(this).tooltip(\'hide\');"/></div></li><li><span class="text-label">用户状态：</span><div class="pop-right"><label><input type="radio" name="switch" value="0" checked/> 启用</label> <label><input type="radio" name="switch" value="1" /> 禁用</label></div></li></ul></div>',
            callback: function () {
                var data = {
                    loginName: $('#user_name').val(),
                    userName: $('#realname').val(),
                    phoneTel: $('#usertel').val(),
                    email: $('#useremail').val(),
                    status: $('input[name="switch"]:checked').val()//用户状态:0启用，1禁用
                }
                if (!data.loginName) {
                    $('#user_name').tooltip('show');
                } else if (!data.userName) {
                    $('#realname').tooltip('show');
                } else if (data.phoneTel && !(/^1[34578]\d{9}$/.test(data.phoneTel))) {
                    $('#usertel').tooltip('show');
                } else if (data.email && !(/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/.test(data.email))) {
                    $('#useremail').tooltip('show');
                } else {
                    myTooltips({
                        state: 'info',
                        time: 10000,
                        message: '请稍后...'
                    });
                    _ajax({
                        url: GLOBAL_AJAX_URL.userAdd,
                        data: data,
                        success: function (res) {
                            if (res.status) {
                                closeMymodal(evframe + 'myModal');
                                myTooltips({
                                    state: 'success',
                                    message: '新增用户成功！'
                                });
                                var param = {
                                    tenantId: tenantValue,
                                    userName: searchValue,
                                    pageSize: pagesize,
                                    pageIndex: pageindex
                                }
                                ajaxLoading(param);
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
    //多删除按钮事件
    $('#deleteBtn').on('click',function () {
        var ischeckbox = true;
        var $btn_checks = $dateNode.find('.btn-check:checked');
        var checkarr = [];
        $btn_checks.each(function (index, item) {
            checkarr.push($(this).val());
            if ($(item).prop('checked')) {
                ischeckbox = false;
            }
        })
        if (ischeckbox) {
            myTooltips({
                time: 1500,
                message: '请先选择需要删除的用户！'
            });
            return false;
        }
        var evframe = 'remove';
        var config = {
            ev: evframe,
            title: '警告信息',
            width: 350,
            height: 200,
            loadhtml: '确定要删除这些用户吗？',
            callback: function () {                
                myTooltips({
                    state: 'info',
                    time: 10000,
                    message: '删除中，请稍后...'
                });
                _ajax({
                    url: GLOBAL_AJAX_URL.userDelete,
                    data: {
                        ids: checkarr.join("&")
                    },
                    success: function (res) {
                        if (res.status) {
                            closeMymodal(evframe + 'myModal');
                            myTooltips({
                                state: 'success',
                                message: '已删除！'
                            });
                            var param = {
                                tenantId: tenantValue,
                                userName: searchValue,
                                pageSize: pagesize,
                                pageIndex: 1
                            }
                            ajaxLoading(param);
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
        loadMyModal(config);
    });
    //单删除事件
    $('#dataNote').on('click', '.btn-del', function () {
        var userdata = $(this).parents('tr').data('userdata');
        var checkarr = [userdata.id];
        var evframe = 'remove';
        var config = {
            ev: evframe,
            title: '警告信息',
            width: 350,
            height: 200,
            loadhtml: '确定要删除该用户吗？',
            callback: function () {
                myTooltips({
                    state: 'info',
                    time: 10000,
                    message: '删除中，请稍后...'
                });
                _ajax({
                    url: GLOBAL_AJAX_URL.userDelete,
                    data: {
                        ids: checkarr.join("&")
                    },
                    success: function (res) {
                        if (res.status) {
                            closeMymodal(evframe + 'myModal');
                            myTooltips({
                                state: 'success',
                                message: '已删除！'
                            });
                            var param = {
                                tenantId: tenantValue,
                                userName: searchValue,
                                pageSize: pagesize,
                                pageIndex: pageindex
                            }
                            ajaxLoading(param);
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
        loadMyModal(config);
    });
    //编辑事件
    $('#dataNote').on('click', '.btn-edit', function () {
        var userdata = $(this).parents('tr').data('userdata');
        var evframe = 'edit';
        var config = {
            ev: evframe,
            title: '编辑用户',
            width: 550,
            height: 400,
            loadhtml: '<div class="pop-form"><ul class="list-unstyled"><li><span class="text-label">用户名：</span><div class="pop-right"><input class="form-control" type="text" id="user_name" disabled="disabled" /></div></li><li><span class="text-label">真实姓名：</span><div class="pop-right"><input class="form-control" type="text" id="realname"  data-toggle="tooltip" data-trigger="manual" data-placement="bottom" data-title="真实姓名不能为空！" onfocus="$(this).tooltip(\'hide\');"/></div><span class="empty-tip">*</span></li><li><span class="text-label">手机号码：</span><div class="pop-right"><input class="form-control" type="text" id="usertel"  data-toggle="tooltip" data-trigger="manual" data-placement="bottom" data-title="手机号格式不对，请重新输入！" onfocus="$(this).tooltip(\'hide\');"/></div></li><li><span class="text-label">邮箱账号：</span><div class="pop-right"><input class="form-control" type="text" id="useremail"  data-toggle="tooltip" data-trigger="manual" data-placement="bottom" data-title="邮箱账号格式有误！" onfocus="$(this).tooltip(\'hide\');"/></div></li><li><span class="text-label">用户状态：</span><div class="pop-right"><label><input type="radio" name="switch" value="0" checked/> 启用</label> <label><input type="radio" name="switch" value="1" /> 禁用</label></div></li></ul></div>',
            loadafter: function () {
                //表单详情
                myTooltips({
                    state: 'info',
                    time: 10000,
                    message: '加载中，请稍后...'
                });
                _ajax({
                    url: GLOBAL_AJAX_URL.userDetail,
                    data: {
                        id: userdata.id
                    },
                    success: function (res) {
                        if (res.status) {
                            myToolhide();
                            $('#user_name').val(res.data.loginName);
                            $('#realname').val(res.data.userName);
                            $('#usertel').val(res.data.mobileNo);
                            $('#useremail').val(res.data.email);
                            if (res.data.status == 1) {
                                $('input[name="switch"]:eq(1)').prop('checked', true);
                            } else {
                                $('input[name="switch"]:eq(0)').prop('checked', true);
                            }
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
                    id: userdata.id,
                    loginName: $('#user_name').val(),
                    userName: $('#realname').val(),
                    phoneTel: $('#usertel').val(),
                    email: $('#useremail').val(),
                    status: $('input[name="switch"]:checked').val()
                }
                if (!data.userName) {
                    $('#realname').tooltip('show');
                } else if (data.phoneTel && !(/^1[34578]\d{9}$/.test(data.phoneTel))) {
                    $('#usertel').tooltip('show');
                } else if (data.email && !(/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/.test(data.email))) {
                    $('#useremail').tooltip('show');
                } else {
                    myTooltips({
                        state: 'info',
                        time: 10000,
                        message: '请稍后...'
                    });
                    _ajax({
                        url: GLOBAL_AJAX_URL.userEdit,
                        data: data,
                        success: function (res) {
                            if (res.status) {
                                closeMymodal(evframe + 'myModal');
                                myTooltips({
                                    state: 'success',
                                    message: '新增用户成功！'
                                });
                                var param = {
                                    tenantId: tenantValue,
                                    userName: searchValue,
                                    pageSize: pagesize,
                                    pageIndex: pageindex
                                }
                                ajaxLoading(param);
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
    })
    //重置密码
    $('#dataNote').on('click', '.btn-reset', function () {
        var userdata = $(this).parents('tr').data('userdata');
        var evframe = 'resetCode';
        var config = {
            ev: evframe,
            title: '重置密码',
            width: 350,
            height: 200,
            loadhtml: '确定要重置密码吗？',
            callback: function () {                
                myTooltips({
                    state: 'info',
                    time: 10000,
                    message: '重置密码，请稍后...'
                });
                _ajax({
                    url: GLOBAL_AJAX_URL.userResetPwd,
                    data: {
                        id: userdata.id
                    },
                    success: function (res) {
                        if (res.status) {
                            closeMymodal(evframe + 'myModal');
                            myTooltips({
                                state: 'success',
                                message: '密码重置成功！'
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
        loadMyModal(config);
    });
    //ajax请求处理数据
    function ajaxLoading(param) {
        if (isLogin()) {
            myTooltips({
                state: 'info',
                time: 10000,
                message: '加载数据中，请稍后...'
            });
            _ajax({
                url: GLOBAL_AJAX_URL.userList,
                data: param,
                success: function (res) {
                    if (res.status) {
                        myToolhide();
                        loadTable($dateNode, res.data, param.pageSize, param.pageIndex)
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
    //加载表格生成html
    function loadTable(dom, data, page_size, page_current) {
        if (data.totals > 0) {
            var $tr = '';
            dom.empty();
            for (var i = 0, len = data.list.length; i < len; i++) {
                $tr = $('<tr><td><input class="btn-check" type="checkbox" value="' + data.list[i].id + '"/></td><td>' + data.list[i].loginName + '</td><td>' + data.list[i].userName + '</td><td>' + data.list[i].tenant.name + '</td><td>' + data.list[i].mobileNo + '</td><td>' + data.list[i].createdTime + '</td><td class="userstate"></td><td><a class="btn-edit">编辑</a><a class="btn-reset">重置密码</a><a class="btn-del">删除</a></td></tr>');
                if (data.list[i].status == 1) {
                    $tr.find('.userstate').text('禁用').addClass('text-danger');
                } else {
                    $tr.find('.userstate').text('启用').addClass('text-primary');
                }
                $tr.data("userdata", {
                    id: data.list[i].id
                });
                dom.append($tr);
            }
        } else {
            dom.html('<tr><td colspan="8" style="height:80px;line-height:80px">暂时没有查到数据</td></tr>');
        }
        //分页
        mypagination(data.totals, page_size, page_current);
    }
    function mypagination(count, size, current) {
        $.jqPaginator('#pagePaging', {
            totalCounts: parseInt(count) || 1,//数据总数,如果页面数据记录为0条会报错
            pageSize: parseInt(size),//每页显示数目
            visiblePages: 5,//最多显示的页码数
            currentPage: parseInt(current),//当前页码
            activeClass: 'active',
            first: '<li class="first"><a href="javascript:;">首页</a></li>',
            prev: '<li class="prev"><a href="javascript:;">上一页</a></li>',
            next: '<li class="next"><a href="javascript:;">下一页</a></li>',
            last: '<li class="last"><a href="javascript:;">尾页</a></li>',
            page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
            onPageChange: function (num, type) {
                //1、“目标页"的页码，Number类型 2、触发类型，可能的值：“init”（初始化），“change”（点击分页）
                //console.log(type + '：' + num);
                pagenum = parseInt(count) || 1;  //更新总数目
                pageindex = num;    //更新当前页码
                $('.et-pagenum').find('#pageCont').text(pagenum);
                $('.et-pagego').find('#pageNum').html('共' + Math.ceil(pagenum / pagesize) + '页');
                if (type == 'change') {
                    var param = {
                        tenantId: tenantValue,
                        userName: searchValue,
                        pageSize: pagesize,
                        pageIndex: num
                    }
                    ajaxLoading(param);
                }
            }
        });
    }
})