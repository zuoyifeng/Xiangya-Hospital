$(function () {
    var searchValue = $('#searchName').val(),//搜索
        $dateNode = $('#dataNote'),
        pagenum = '',     //总数目
        pagesize = 10,    //每页显示数目
        pageindex = 1;    //当前页码

    if (GLOBAL_DEBUG) {
        var data = GLOBAL_JSON.applyList;
        loadTable($dateNode, data.data, pagesize, pageindex)
    } else {
        var param = {
            appName: searchValue,
            pageSize: pagesize,
            pageIndex: pageindex
        }
        ajaxLoading(param);
    }
    //全选事件
    $('#check_all').on('click',function () {
        if ($(this).prop('checked')) {
            $dateNode.find('.btn-check').prop('checked', true);
        } else {
            $dateNode.find('.btn-check').prop('checked', false);
        }
    });
    //查询事件
    $('#btn-query').on('click',function () {
        searchValue = $('#searchName').val();
        var param = {
            appName: searchValue,
            pageSize: pagesize,
            pageIndex: 1
        }
        ajaxLoading(param);
    });
    //每页显示条数切换
    $('#pageSelect').on('change', function () {
        pagesize = $(this).val();
        var param = {
            appName: searchValue,
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
                        appName: searchValue,
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
                        appName: searchValue,
                        pageSize: pagesize,
                        pageIndex: pageindex
                    }
                    ajaxLoading(param);
                }
            }
            loadMyModal(config);
        } else {
            var param = {
                appName: searchValue,
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
            title: '新增应用',
            width: 550,
            height: 500,
            loadhtml: '<div class="pop-form"><ul class="list-unstyled"><li><span class="text-label">应用编码：</span><div class="pop-right"><input class="form-control" type="text" id="applyid" data-toggle="tooltip" data-trigger="manual" data-placement="bottom" data-title="应用编码不能为空！" onfocus="$(this).tooltip(\'hide\');"/></div><span class="empty-tip">*</span></li><li><span class="text-label">应用名称：</span><div class="pop-right"><input class="form-control" type="text" id="applyname" data-toggle="tooltip" data-trigger="manual" data-placement="bottom" data-title="应用名称不能为空！" onfocus="$(this).tooltip(\'hide\');"/></div><span class="empty-tip">*</span></li><li><span class="text-label">应用URL：</span><div class="pop-right"><input class="form-control" type="text" id="applyurl" data-toggle="tooltip" data-trigger="manual" data-placement="bottom" data-title="应用URL不能为空！" onfocus="$(this).tooltip(\'hide\');"/></div><span class="empty-tip">*</span></li><li><span class="text-label">应用顺序：</span><div class="pop-right"><input class="form-control" type="text" id="applyorder" data-toggle="tooltip" data-trigger="manual" data-placement="bottom" data-title="应用顺序不能为空！" onfocus="$(this).tooltip(\'hide\');"/></div><span class="empty-tip">*</span></li><li><span class="text-label">应用图标：</span><div class="pop-right"><input class="form-control" id="applyicon" type="text"/></div></li><li><span class="text-label">应用描述：</span><div class="pop-right"><textarea id="applycont" rows="5"></textarea></div></li></ul></div>',
            callback: function () {
                var data = {
                    appmCode: $('#applyid').val(),
                    appmName: $('#applyname').val(),
                    appmUrl: $('#applyurl').val(),
                    displayOrder: $('#applyorder').val(),
                    appmIcon: $('#applyicon').val(),
                    description: $('#applycont').val()
                }
                if (!data.appmCode) {
                    $('#applyid').tooltip('show');
                } else if (!data.appmName) {
                    $('#applyname').tooltip('show');
                } else if (!data.appmUrl) {
                    $('#applyurl').tooltip('show');
                } else if (!data.displayOrder) {
                    $('#applyorder').tooltip('show');
                } else {
                    myTooltips({
                        state: 'info',
                        time: 10000,
                        message: '请稍后...'
                    });
                    _ajax({
                        url: GLOBAL_AJAX_URL.applyAdd,
                        data: data,
                        success: function (res) {
                            if (res.status) {
                                closeMymodal(evframe + 'myModal');
                                myTooltips({
                                    state: 'success',
                                    message: '新增应用成功！'
                                });
                                var param = {
                                    appName: searchValue,
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
                message: '请先选择需要删除的应用！'
            });
            return false;
        }
        var evframe = 'remove';
        var config = {
            ev: evframe,
            title: '警告信息',
            width: 350,
            height: 200,
            loadhtml: '确定要删除这些应用吗？',
            callback: function () {
                myTooltips({
                    state: 'info',
                    time: 10000,
                    message: '删除中，请稍后...'
                });
                _ajax({
                    url: GLOBAL_AJAX_URL.applyDelete,
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
                                appName: searchValue,
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
            loadhtml: '确定要删除该应用吗？',
            callback: function () {
                myTooltips({
                    state: 'info',
                    time: 10000,
                    message: '删除中，请稍后...'
                });
                _ajax({
                    url: GLOBAL_AJAX_URL.applyDelete,
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
                                appName: searchValue,
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
            title: '编辑应用',
            width: 550,
            height: 500,
            loadhtml: '<div class="pop-form"><ul class="list-unstyled"><li><span class="text-label">应用编码：</span><div class="pop-right"><input class="form-control" type="text" id="applyid" data-toggle="tooltip" data-trigger="manual" data-placement="bottom" data-title="应用编码不能为空！" onfocus="$(this).tooltip(\'hide\');"/></div><span class="empty-tip">*</span></li><li><span class="text-label">应用名称：</span><div class="pop-right"><input class="form-control" type="text" id="applyname" data-toggle="tooltip" data-trigger="manual" data-placement="bottom" data-title="应用名称不能为空！" onfocus="$(this).tooltip(\'hide\');"/></div><span class="empty-tip">*</span></li><li><span class="text-label">应用URL：</span><div class="pop-right"><input class="form-control" type="text" id="applyurl" data-toggle="tooltip" data-trigger="manual" data-placement="bottom" data-title="应用URL不能为空！" onfocus="$(this).tooltip(\'hide\');"/></div><span class="empty-tip">*</span></li><li><span class="text-label">应用顺序：</span><div class="pop-right"><input class="form-control" type="text" id="applyorder" data-toggle="tooltip" data-trigger="manual" data-placement="bottom" data-title="应用顺序不能为空！" onfocus="$(this).tooltip(\'hide\');"/></div><span class="empty-tip">*</span></li><li><span class="text-label">应用图标：</span><div class="pop-right"><input class="form-control" id="applyicon" type="text"/></div></li><li><span class="text-label">应用描述：</span><div class="pop-right"><textarea id="applycont" rows="5"></textarea></div></li></ul></div>',
            loadafter: function () {
                //应用详情
                myTooltips({
                    state: 'info',
                    time: 10000,
                    message: '加载中，请稍后...'
                });
                _ajax({
                    url: GLOBAL_AJAX_URL.applyDetail,
                    data: {
                        id: userdata.id
                    },
                    success: function (res) {
                        if (res.status) {
                            myToolhide();
                            $('#applyid').val(res.data.appmCode);
                            $('#applyname').val(res.data.appmName);
                            $('#applyurl').val(res.data.appmUrl);
                            $('#applyorder').val(res.data.displayOrder);
                            $('#applyicon').val(res.data.appmIcon);
                            $('#applycont').val(res.data.description);
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
                    appmCode: $('#applyid').val(),
                    appmName: $('#applyname').val(),
                    appmUrl: $('#applyurl').val(),
                    displayOrder: $('#applyorder').val(),
                    appmIcon: $('#applyicon').val(),
                    description: $('#applycont').val()
                }
                if (!data.appmCode) {
                    $('#applyid').tooltip('show');
                } else if (!data.appmName) {
                    $('#applyname').tooltip('show');
                } else if (!data.appmUrl) {
                    $('#applyurl').tooltip('show');
                } else if (!data.displayOrder) {
                    $('#applyorder').tooltip('show');
                } else {
                    myTooltips({
                        state: 'info',
                        time: 10000,
                        message: '请稍后...'
                    });
                    _ajax({
                        url: GLOBAL_AJAX_URL.applyEdit,
                        data: data,
                        success: function (res) {
                            if (res.status) {
                                closeMymodal(evframe + 'myModal');
                                myTooltips({
                                    state: 'success',
                                    message: '编辑应用成功！'
                                });
                                var param = {
                                    appName: searchValue,
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
                url: GLOBAL_AJAX_URL.applyList,
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
        if (data.totals>0) {
            var $tr = '';
            dom.empty();
            for (var i = 0, len = data.list.length; i < len; i++) {
                $tr = $('<tr><td><input class="btn-check" type="checkbox" value="' + data.list[i].id + '"/></td><td>' + data.list[i].appmCode + '</td><td>' + data.list[i].appmName + '</td><td>' + data.list[i].appmUrl + '</td><td>' + data.list[i].displayOrder + '</td><td>' + data.list[i].createdTime + '</td><td>' + data.list[i].description + '</td><td><a class="btn-edit">编辑</a><a class="btn-del">删除</a></td></tr>');
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
                        appName: searchValue,
                        pageSize: pagesize,
                        pageIndex: num
                    }
                    ajaxLoading(param);
                }
            }
        });
    }
})