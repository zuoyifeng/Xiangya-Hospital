$(function () {
    var searchValue = $('#searchName').val(),//搜索
        $dateNode = $('#dataNote'),
        pagenum = '',     //总数目
        pagesize = 10,    //每页显示数目
        pageindex = 1;    //当前页码

    if (GLOBAL_DEBUG) {
        var data = GLOBAL_JSON.roleList;
        loadTable($dateNode, data.data, pagesize, pageindex)
    } else {
        var param = {
            roleName: searchValue,
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
            roleName: searchValue,
            pageSize: pagesize,
            pageIndex: 1
        }
        ajaxLoading(param);
    });
    //每页显示条数切换
    $('#pageSelect').on('change', function () {
        pagesize = $(this).val();
        var param = {
            roleName: searchValue,
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
                        roleName: searchValue,
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
                        roleName: searchValue,
                        pageSize: pagesize,
                        pageIndex: pageindex
                    }
                    ajaxLoading(param);
                }
            }
            loadMyModal(config);
        } else {
            var param = {
                roleName: searchValue,
                pageSize: pagesize,
                pageIndex: pageindex
            }
            ajaxLoading(param);
        }
    })
    //新增事件
    $('#addBtn').on('click', function () {
        var evframe = 'add';
        var config = {
            ev: evframe,
            title: '新增角色',
            width: 550,
            height: 370,
            loadhtml: '<div class="pop-form"><ul class="list-unstyled"><li><span class="text-label">角色编码：</span><div class="pop-right"><input class="form-control" type="text" id="roleCode" data-toggle="tooltip" data-trigger="manual" data-placement="bottom" data-title="角色编码不能为空！" onfocus="$(this).tooltip(\'hide\');"/></div><span class="empty-tip">*</span></li><li><span class="text-label">角色名称：</span><div class="pop-right"><input class="form-control" type="text" id="roleName" data-toggle="tooltip" data-trigger="manual" data-placement="bottom" data-title="角色名称不能为空！" onfocus="$(this).tooltip(\'hide\');"/></div><span class="empty-tip">*</span></li><li><span class="text-label">角色描述：</span><div class="pop-right"><textarea id="roleCont" rows="5"></textarea></div></li></ul></div>',
            callback: function () {
                var data = {
                    roleCode: $('#roleCode').val(),
                    roleName: $('#roleName').val(),
                    description: $('#roleCont').val()
                }
                if (!data.roleCode) {
                    $('#roleCode').tooltip('show');
                } else if (!data.roleName) {
                    $('#roleName').tooltip('show');
                } else {
                    myTooltips({
                        state: 'info',
                        time: 10000,
                        message: '请稍后...'
                    });
                    _ajax({
                        url: GLOBAL_AJAX_URL.roleAdd,
                        data: data,
                        success: function (res) {
                            if (res.status) {
                                closeMymodal(evframe + 'myModal');
                                myTooltips({
                                    state: 'success',
                                    message: '新增角色成功！'
                                });
                                var param = {
                                    roleName: searchValue,
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
    $('#deleteBtn').on('click', function () {
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
                message: '请先选择需要删除的角色！'
            });
            return false;
        }
        var evframe = 'remove';
        var config = {
            ev: evframe,
            title: '警告信息',
            width: 350,
            height: 200,
            loadhtml: '确定要删除这些角色吗？',
            callback: function () {
                myTooltips({
                    state: 'info',
                    time: 10000,
                    message: '删除中，请稍后...'
                });
                _ajax({
                    url: GLOBAL_AJAX_URL.roleDelete,
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
                                roleName: searchValue,
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
            loadhtml: '确定要删除该角色吗？',
            callback: function () {
                myTooltips({
                    state: 'info',
                    time: 10000,
                    message: '删除中，请稍后...'
                });
                _ajax({
                    url: GLOBAL_AJAX_URL.roleDelete,
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
                                roleName: searchValue,
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
            title: '编辑角色',
            width: 550,
            height: 370,
            loadhtml: '<div class="pop-form"><ul class="list-unstyled"><li><span class="text-label">角色编码：</span><div class="pop-right"><input class="form-control" type="text" id="roleCode" data-toggle="tooltip" data-trigger="manual" data-placement="bottom" data-title="角色编码不能为空！" onfocus="$(this).tooltip(\'hide\');"/></div><span class="empty-tip">*</span></li><li><span class="text-label">角色名称：</span><div class="pop-right"><input class="form-control" type="text" id="roleName" data-toggle="tooltip" data-trigger="manual" data-placement="bottom" data-title="角色名称不能为空！" onfocus="$(this).tooltip(\'hide\');"/></div><span class="empty-tip">*</span></li><li><span class="text-label">角色描述：</span><div class="pop-right"><textarea id="roleCont" rows="5"></textarea></div></li></ul></div>',
            loadafter: function () {
                //角色详情
                myTooltips({
                    state: 'info',
                    time: 10000,
                    message: '加载中，请稍后...'
                });
                _ajax({
                    url: GLOBAL_AJAX_URL.roleDetail,
                    data: {
                        id: userdata.id
                    },
                    success: function (res) {
                        if (res.status) {
                            myToolhide();
                            $('#roleCode').val(res.data.roleCode);
                            $('#roleName').val(res.data.roleName);
                            $('#roleCont').val(res.data.description);
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
                    roleCode: $('#roleCode').val(),
                    roleName: $('#roleName').val(),
                    description: $('#roleCont').val()
                }
                if (!data.roleCode) {
                    $('#roleCode').tooltip('show');
                } else if (!data.roleName) {
                    $('#roleName').tooltip('show');
                } else {
                    myTooltips({
                        state: 'info',
                        time: 10000,
                        message: '请稍后...'
                    });
                    _ajax({
                        url: GLOBAL_AJAX_URL.roleEdit,
                        data: data,
                        success: function (res) {
                            if (res.status) {
                                closeMymodal(evframe + 'myModal');
                                myTooltips({
                                    state: 'success',
                                    message: '编辑角色成功！'
                                });
                                var param = {
                                    roleName: searchValue,
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
    //授权事件
    $('#dataNote').on('click', '.btn-author', function () {
        var userdata = $(this).parents('tr').data('userdata');
        var evframe = 'author';
        var config = {
            ev: evframe,
            title: '角色授权',
            width: 550,
            height: 200,
            loadhtml: '<div class="pop-form"><ul class="list-unstyled"><li><span class="text-label">角色权限：</span><div class="pop-right" id="authorize"></div></li></ul></div>',
            loadafter: function () {
                //权限列表
                myTooltips({
                    state: 'info',
                    time: 10000,
                    message: '加载中，请稍后...'
                });
                _ajax({
                    url: GLOBAL_AJAX_URL.roleAuthorize,
                    data: {
                        roleId: userdata.id
                    },
                    success: function (res) {
                        if (res.status) {
                            myToolhide();
                            var html = '';
                            for (var i = 0, len = res.data.length; i < len; i++) {
                                if (res.data[i].hasPower) {
                                    html += '<label><input type="checkbox" name="author" value="' + res.data[i].id + '" checked> ' + res.data[i].name + '</label>';
                                } else {
                                    html += '<label><input type="checkbox" name="author" value="' + res.data[i].id + '"> ' + res.data[i].name + '</label>';
                                }
                            }
                            $('#authorize').html(html);
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
                myTooltips({
                    state: 'info',
                    time: 10000,
                    message: '提交中，请稍后...'
                });
                var checkarr = [];
                $('input[name="author"]:checked').each(function () {
                    checkarr.push($(this).val());
                });
                _ajax({
                    url: GLOBAL_AJAX_URL.roleAuthorizeEdit,
                    data: {
                        id: userdata.id,
                        powerIds: checkarr.join("&")
                    },
                    success: function (res) {
                        if (res.status) {
                            closeMymodal(evframe + 'myModal');
                            myTooltips({
                                state: 'success',
                                message: '角色授权成功！'
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
    })
    //ajax请求处理数据
    function ajaxLoading(param) {
        //console.log(param);
        if (isLogin()) {
            myTooltips({
                state: 'info',
                time: 10000,
                message: '加载数据中，请稍后...'
            });
            _ajax({
                url: GLOBAL_AJAX_URL.roleList,
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
                $tr = $('<tr><td><input class="btn-check" type="checkbox" value="' + data.list[i].id + '"/></td><td>' + data.list[i].roleCode + '</td><td>' +data.list[i].roleName + '</td><td>' +data.list[i].description + '</td><td>' +data.list[i].createdTime + '</td><td><a class="btn-edit">编辑</a><a class="btn-author">授权</a><a class="btn-del">删除</a></td></tr>');
                $tr.data("userdata", {
                    id: data.list[i].id
                });
                dom.append($tr);
            }
        } else {
            dom.html('<tr><td colspan="6" style="height:80px;line-height:80px">暂时没有查到数据</td></tr>');
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
                        roleName: searchValue,
                        pageSize: pagesize,
                        pageIndex: num
                    }
                    ajaxLoading(param);
                }
            }
        });
    }
})