$(function () {
    var searchValue = $('#searchName').val(),//搜索
        $dateNode = $('#dataNote'),
        pagenum = '',     //总数目
        pagesize = 10,    //每页显示数目
        pageindex = 1;  //当前页码
    if (GLOBAL_DEBUG) {
        var data = GLOBAL_JSON.tenantList;
        loadTable($dateNode, data.data, pagesize, pageindex)
    } else {
        var param = {
            tenantName: searchValue,
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
            tenantName: searchValue,
            pageSize: pagesize,
            pageIndex: 1
        }
        ajaxLoading(param);  
    });
    //每页显示条数切换
    $('#pageSelect').on('change',function () {
        pagesize = $(this).val();
        var param = {
            tenantName: searchValue,
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
                        tenantName: searchValue,
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
                        tenantName: searchValue,
                        pageSize: pagesize,
                        pageIndex: pageindex
                    }
                    ajaxLoading(param);
                }
            }
            loadMyModal(config);
        } else {
            var param = {
                tenantName: searchValue,
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
            title: '新增租户',
            width: 550,
            height: 370,
            loadhtml: '<div class="pop-form"><ul class="list-unstyled"><li><span class="text-label">租户编码：</span><div class="pop-right"><input class="form-control" type="text" id="tenantid"  data-toggle="tooltip" data-trigger="manual" data-placement="bottom" data-title="租户编码不能为空！" onfocus="$(this).tooltip(\'hide\');"/></div><span class="empty-tip">*</span></li><li><span class="text-label">租户名称：</span><div class="pop-right"><input class="form-control" id="tenantname" type="text" data-toggle="tooltip" data-trigger="manual" data-placement="bottom" data-title="租户名称不能为空！" onfocus="$(this).tooltip(\'hide\');"/></div><span class="empty-tip">*</span></li><li><span class="text-label">拥有者：</span><div class="pop-right"><select class="form-control" id="superior" data-toggle="tooltip" data-trigger="manual" data-placement="bottom" data-title="拥有者为必选项！"  onfocus="$(this).tooltip(\'hide\');"></select></div><span class="empty-tip">*</span></li><li><span class="text-label">租户描述：</span><div class="pop-right"><textarea id="tenant_cont" rows="5"></textarea></div></li></ul></div>',
            loadafter: function () {
                //租户拥有者列表
                myTooltips({
                    state: 'info',
                    time: 10000,
                    message: '请稍后...'
                });
                _ajax({
                    url: GLOBAL_AJAX_URL.tenantParent,
                    success: function (res) {
                        if (res.status) {
                            myToolhide();
                            var html = '';
                            for (var i = 0, len = res.data.length; i < len; i++) {
                                html += '<option value="' + res.data[i].id + '">' + res.data[i].userName + '</option>';
                            }
                            $('#superior').html(html);
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
                    tenantCode: $('#tenantid').val(),
                    tenantName: $('#tenantname').val(),
                    tenantOwnerId: $('#superior').val(),
                    description: $('#tenant_cont').val()
                }
                if (!data.tenantCode) {
                    $('#tenantid').tooltip('show');
                } else if (!data.tenantName) {
                    $('#tenantname').tooltip('show');
                } else if (!data.tenantOwnerId) {
                    $('#superior').tooltip('show');
                }else{                   
                    myTooltips({
                        state: 'info',
                        time: 10000,
                        message: '请稍后...'
                    });
                    _ajax({
                        url: GLOBAL_AJAX_URL.tenantAdd,
                        data: data,
                        success: function (res) {
                            if (res.status) {
                                closeMymodal(evframe + 'myModal');
                                myTooltips({
                                    state: 'success',
                                    message: '新增租户成功！'
                                });
                                var param = {
                                    tenantName: searchValue,
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
                message: '请先选择需要删除的租户！'
            });
            return false;
        }
        var evframe = 'remove';
        var config = {
            ev: evframe,
            title: '警告信息',
            width: 350,
            height: 200,
            loadhtml: '确定要删除这些租户吗？',
            callback: function () {
                myTooltips({
                    state: 'info',
                    time: 10000,
                    message: '删除中，请稍后...'
                });
                _ajax({
                    url: GLOBAL_AJAX_URL.tenantDelete,
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
                                tenantName: searchValue,
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
        var tenantids = $(this).parents('tr').data('userdata');
        var checkarr = [tenantids.id];
        var evframe = 'remove';
        var config = {
            ev: evframe,
            title: '警告信息',
            width: 350,
            height: 200,
            loadhtml: '确定要删除该租户吗？',
            callback: function () {
                myTooltips({
                    state: 'info',
                    time: 10000,
                    message: '删除中，请稍后...'
                });
                _ajax({
                    url: GLOBAL_AJAX_URL.tenantDelete,
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
                                tenantName: searchValue,
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
        var tenantids = $(this).parents('tr').data('userdata');
        var evframe = 'edit';
        var config = {
            ev: evframe,
            title: '编辑租户',
            width: 550,
            height: 370,
            loadhtml: '<div class="pop-form"><ul class="list-unstyled"><li><span class="text-label">租户编码：</span><div class="pop-right"><input class="form-control" value="" type="text" id="tenantid"  data-toggle="tooltip" data-trigger="manual" data-placement="bottom" data-title="租户编码不能为空！" onfocus="$(this).tooltip(\'hide\');"/></div><span class="empty-tip">*</span></li><li><span class="text-label">租户名称：</span><div class="pop-right"><input class="form-control" value="" id="tenantname" type="text" data-toggle="tooltip" data-trigger="manual" data-placement="bottom" data-title="租户名称不能为空！" onfocus="$(this).tooltip(\'hide\');"/></div><span class="empty-tip">*</span></li><li><span class="text-label">拥有者：</span><div class="pop-right"><select class="form-control" id="superior" data-toggle="tooltip" data-trigger="manual" data-placement="bottom" data-title="拥有者为必选项！"  onfocus="$(this).tooltip(\'hide\');"></select></div><span class="empty-tip">*</span></li><li><span class="text-label">租户描述：</span><div class="pop-right"><textarea id="tenant_cont" rows="5"></textarea></div></li></ul></div>',
            loadafter:function(){
                //租户详情
                myTooltips({
                    state: 'info',
                    time: 10000,
                    message: '加载租户信息，请稍后...'
                });
                _ajax({
                    url: GLOBAL_AJAX_URL.tenantDetail,
                    data: {
                        id: tenantids.id
                    },
                    success: function (res) {
                        if (res.status) {
                            myToolhide();
                            $('#tenantid').val(res.data.tenantCode);
                            $('#tenantname').val(res.data.tenantName);
                            $('#tenant_cont').val(res.data.description);
                            var html = '';
                            for (var i = 0, len = res.data.tenantOwners.length; i < len; i++) {
                                if (res.data.tenantOwners[i].owner) {
                                    html += '<option selected value="' + res.data.tenantOwners[i].id + '">' + res.data.tenantOwners[i].name + '</option>';
                                } else {
                                    html += '<option value="' + res.data.tenantOwners[i].id + '">' + res.data.tenantOwners[i].name + '</option>';
                                }
                            }
                            $('#superior').html(html);
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
                    id: tenantids.id,
                    tenantCode: $('#tenantid').val(),
                    tenantName: $('#tenantname').val(),
                    tenantOwnerId: $('#superior').val(),
                    description: $('#tenant_cont').val()
                }
                if (!data.tenantCode) {
                    $('#tenantid').tooltip('show');
                } else if (!data.tenantName) {
                    $('#tenantname').tooltip('show');
                } else if (!data.tenantOwnerId) {
                    $('#superior').tooltip('show');
                } else {
                    myTooltips({
                        state: 'info',
                        time: 10000,
                        message: '请稍后...'
                    });
                    _ajax({
                        url: GLOBAL_AJAX_URL.tenantEdit,
                        data: data,
                        success: function (res) {
                            if (res.status) {
                                closeMymodal(evframe + 'myModal');
                                myTooltips({
                                    state: 'success',
                                    message: '修改租户信息成功！'
                                });
                                var param = {
                                    tenantName: searchValue,
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
        var tenantids = $(this).parents('tr').data('userdata');
        var evframe = 'author';
        var config = {
            ev: evframe,
            title: '租户授权',
            width: 550,
            height: 200,
            loadhtml: '<div class="pop-form"><ul class="list-unstyled"><li><span class="text-label">租户权限：</span><div class="pop-right" id="authorize"></div></li></ul></div>',
            loadafter: function () {
                //权限列表
                myTooltips({
                    state: 'info',
                    time: 10000,
                    message: '加载中，请稍后...'
                });                
                _ajax({
                    url: GLOBAL_AJAX_URL.tenantAuthorize,
                    data: {
                        tenantId: tenantids.id
                    },
                    success: function (res) {
                        if (res.status) {
                            myToolhide();
                            var html = '';
                            for (var i = 0, len = res.data.length; i < len; i++) {
                                if (res.data[i].power) {
                                    html += '<label><input type="checkbox" name="author" value="' + res.data[i].id + '" checked> ' + res.data[i].appmName + '</label>';
                                } else {
                                    html += '<label><input type="checkbox" name="author" value="' + res.data[i].id + '"> ' + res.data[i].appmName + '</label>';
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
                    url: GLOBAL_AJAX_URL.tenantAuthorizeEdit,
                    data: {
                        tenantId:tenantids.id,
                        powerIds: checkarr.join("&")
                    },
                    success: function (res) {
                        if (res.status) {
                            closeMymodal(evframe + 'myModal');
                            myTooltips({
                                state: 'success',
                                message: '租户授权成功！'
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
                url: GLOBAL_AJAX_URL.tenantList,
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
                $tr = $('<tr><td><input class="btn-check" type="checkbox" value="' + data.list[i].id + '"/></td><td>' + data.list[i].tenantName + '</td><td class="ownername"></td><td>' + data.list[i].description + '</td><td>' + data.list[i].createdTime + '</td><td>' + data.list[i].updatedTime + '</td><td><a class="btn-edit">编辑</a><a class="btn-author">授权</a><a class="btn-group"><span class="btn-change dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">变更<span class="caret"></span></span><ul class="dropdown-menu"></ul></a><a class="btn-del">删除</a></td></tr>');
                var shtml = '';
                for (var j = 0, lens = data.list[i].tenantOwners.length; j < lens; j++) {
                    if (data.list[i].tenantOwners[j].owner) {
                        $tr.find('.ownername').text(data.list[i].tenantOwners[j].userName);//给表格加数据
                        shtml += '<li class="active" onclick="changeOwner(this)" flag="' + data.list[i].tenantOwners[j].id + '">' + data.list[i].tenantOwners[j].userName + '</li>';
                    } else {
                        shtml += '<li onclick="changeOwner(this)" flag="' + data.list[i].tenantOwners[j].id + '">' + data.list[i].tenantOwners[j].userName + '</li>';
                    }
                }
                $tr.find('.dropdown-menu').html(shtml);
                $tr.data("userdata", {
                    id: data.list[i].id
                });
                dom.append($tr);
            }
        } else {
            dom.html('<tr><td colspan="7" style="height:80px;line-height:80px">暂时没有查到数据</td></tr>');
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
                        tenantName: searchValue,
                        pageSize: pagesize,
                        pageIndex: num
                    }
                    ajaxLoading(param);
                }
            }
        });
    }
})
//更改租户所有者
function changeOwner(obj) {
    var tenantids = $(obj).parents('tr').data('userdata'),
        ownerid = $(obj).attr('flag'),
        textVal = $(obj).text();
    _ajax({
        url: GLOBAL_AJAX_URL.tenantOwnerEdit,
        data: {
            id: tenantids.id,
            ownerId: ownerid
        },
        success: function (res) {
            if (res.status) {
                myTooltips({
                    state: 'success',
                    message: '成功变更拥有者！'
                });
                $(obj).addClass('active').siblings('li').removeClass('active');
                $(obj).parents('td').siblings('.ownername').text(textVal);
            } else {
                myTooltips({
                    state: 'danger',
                    message: res.message
                });
            }
        }
    });
}
