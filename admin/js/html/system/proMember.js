$(function () {
    var searchValue = $('#searchName').val(),//搜索
        projectValue = $('#projectAll').val(),//所属项目
        $dateNode = $('#dataNote'),
        pagenum = '',     //总数目
        pagesize = 10,    //每页显示数目
        pageindex = 1;    //当前页码
    //加载项目
    var proId = $('#m_content').data('ProjectInfo');
    if (GLOBAL_DEBUG) {
        //初始加载所属项目
        var project = GLOBAL_JSON.projectAll;
        var html = '';
        for (var i = 0, lens = project.data.length; i < lens; i++) {
            if (project.data[i].id == proId.id) {
                html += '<option value="' + project.data[i].id + '" selected>' + project.data[i].name + '</option>';
            } else {
                html += '<option value="' + project.data[i].id + '">' + project.data[i].name + '</option>';
            }
        }
        $('#projectAll').append(html);
        projectValue = proId.id;
        var data = GLOBAL_JSON.proMemberList;
        loadTable($dateNode, data.data, pagesize, pageindex)
    } else {
        //初始加载所属项目
        _ajax({
            url: GLOBAL_AJAX_URL.projectAll,
            success: function (res) {
                if (res.status) {
                    var html = '';
                    for (var i = 0, lens = res.data.length; i < lens; i++) {
                        if (res.data[i].id == proId.id) {
                            html += '<option value="' + res.data[i].id + '" selected>' + res.data[i].name + '</option>';
                        } else {
                            html += '<option value="' + res.data[i].id + '">' + res.data[i].name + '</option>';
                        }
                    }
                    $('#projectAll').append(html);
                } else {
                    myTooltips({
                        state: 'danger',
                        message: res.message
                    });
                }
            }
        });
        projectValue = proId.id;
        var param = {
            projectId: projectValue,
            memberName: searchValue,
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
            projectId: projectValue,
            memberName: searchValue,
            pageSize: pagesize,
            pageIndex: 1
        }
        ajaxLoading(param);
    });
    //每页显示条数切换
    $('#pageSelect').on('change', function () {
        pagesize = $(this).val();
        var param = {
            projectId: projectValue,
            memberName: searchValue,
            pageSize: pagesize,
            pageIndex: 1
        }
        ajaxLoading(param);
    });
    //所属项目切换
    $('#projectAll').on('change', function () {
        projectValue = $(this).val();
        var param = {
            projectId: projectValue,
            memberName: searchValue,
            pageSize: pagesize,
            pageIndex: pageindex
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
                        projectId: projectValue,
                        memberName: searchValue,
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
                        projectId: projectValue,
                        memberName: searchValue,
                        pageSize: pagesize,
                        pageIndex: pageindex
                    }
                    ajaxLoading(param);
                }
            }
            loadMyModal(config);
        } else {
            var param = {
                projectId: projectValue,
                memberName: searchValue,
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
            title: '新增成员',
            width: 550,
            height: 330,
            loadhtml: '<div class="pop-form"><ul class="list-unstyled"><li><span class="text-label">项目成员：</span><div class="pop-right"><select class="form-control" id="memberID" data-toggle="tooltip" data-trigger="manual" data-placement="bottom" data-title="项目成员为必选项！"  onfocus="$(this).tooltip(\'hide\');"></select></div><span class="empty-tip">*</span></li><li><span class="text-label">项目成员权限：</span><div class="pop-right" id="authorize"  data-toggle="tooltip" data-trigger="manual" data-placement="bottom" data-title="权限配置为必选项！" onclick="$(this).tooltip(\'hide\');"></div><span class="empty-tip">*</span></li></ul></div>',
            loadafter: function () {
                //项目管理员列表和权限
                myTooltips({
                    state: 'info',
                    time: 10000,
                    message: '加载中，请稍后...'
                });                
                _ajax({
                    url: GLOBAL_AJAX_URL.proMemberAll,
                    data: {
                        projectId: projectValue
                    },
                    success: function (res) {
                        if (res.status) {
                            myToolhide();
                            var html = '';
                            for (var i = 0, len = res.data.membersList.length; i < len; i++) {
                                html += '<option value="' + res.data.membersList[i].id + '">' + res.data.membersList[i].name + '</option>';
                            }
                            $('#memberID').html(html);
                            var ahtml = '';
                            for (var i = 0, len = res.data.memberRoleList.length; i < len; i++) {
                                ahtml += '<label><input type="checkbox" name="author" value="' + res.data.memberRoleList[i].id + '"> ' + res.data.memberRoleList[i].name + '</label>';
                            }
                            $('#authorize').html(ahtml);
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
                var authorkarr = [];
                $('input[name="author"]:checked').each(function () {
                    authorkarr.push($(this).val());
                });
                var data = {
                    projectId: projectValue,
                    memberId: $('#memberID').val(),
                    roleList: authorkarr.join("&")
                }
                if (!data.memberId) {
                    $('#memberID').tooltip('show');
                } else if (!data.roleList) {
                    $('#authorize').tooltip('show');
                } else {
                    myTooltips({
                        state: 'info',
                        time: 10000,
                        message: '请稍后...'
                    });
                    _ajax({
                        url: GLOBAL_AJAX_URL.proMemberAdd,
                        data: data,
                        success: function (res) {
                            if (res.status) {
                                closeMymodal(evframe + 'myModal');
                                myTooltips({
                                    state: 'success',
                                    message: '添加成员成功！'
                                });
                                var param = {
                                    projectId: projectValue,
                                    memberName: searchValue,
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
                message: '请先选择需要删除的项目成员！'
            });
            return false;
        }
        var evframe = 'remove';
        var config = {
            ev: evframe,
            title: '警告信息',
            width: 350,
            height: 200,
            loadhtml: '确定要删除这些项目成员吗？',
            callback: function () {                
                myTooltips({
                    state: 'info',
                    time: 10000,
                    message: '删除中，请稍后...'
                });
                _ajax({
                    url: GLOBAL_AJAX_URL.proMemberDelete,
                    data: {
                        projectId: projectValue,
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
                                projectId: projectValue,
                                memberName: searchValue,
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
            loadhtml: '确定要删除该项目成员吗？',
            callback: function () {
                myTooltips({
                    state: 'info',
                    time: 10000,
                    message: '删除中，请稍后...'
                });
                _ajax({
                    url: GLOBAL_AJAX_URL.proMemberDelete,
                    data: {
                        projectId: projectValue,
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
                                projectId: projectValue,
                                memberName: searchValue,
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
            title: '编辑项目成员',
            width: 550,
            height: 330,
            loadhtml: '<div class="pop-form"><ul class="list-unstyled"><li><span class="text-label">项目成员：</span><div class="pop-right"><input class="form-control" type="text" id="memberID" disabled="disabled"/></div></li><li><span class="text-label">项目成员权限：</span><div class="pop-right" id="authorize"  data-toggle="tooltip" data-trigger="manual" data-placement="bottom" data-title="权限配置为必选项！" onclick="$(this).tooltip(\'hide\');"></div><span class="empty-tip">*</span></li></ul></div>',
            loadafter: function () {
                myTooltips({
                    state: 'info',
                    time: 10000,
                    message: '加载中，请稍后...'
                });                
                _ajax({
                    url: GLOBAL_AJAX_URL.proMemberDetail,
                    data: {
                        projectId: projectValue,
                        memberId: userdata.id
                    },
                    success: function (res) {
                        if (res.status) {
                            myToolhide();
                            $('#memberID').val(res.data.memberName);
                            var html = '';
                            for (var i = 0, len = res.data.memberRoles.length; i < len; i++) {
                                if (res.data.memberRoles[i].hasRole) {
                                    html += '<label><input type="checkbox" name="author" value="' + res.data.memberRoles[i].id + '" checked> ' + res.data.memberRoles[i].name + '</label>';
                                } else {
                                    html += '<label><input type="checkbox" name="author" value="' + res.data.memberRoles[i].id + '"> ' + res.data.memberRoles[i].name + '</label>';
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
                var authorkarr = [];
                $('input[name="author"]:checked').each(function () {
                    authorkarr.push($(this).val());
                });
                if (!authorkarr.join("&")) {
                    $('#authorize').tooltip('show');
                } else {
                    myTooltips({
                        state: 'info',
                        time: 10000,
                        message: '提交中，请稍后...'
                    });
                    _ajax({
                        url: GLOBAL_AJAX_URL.proMemberEdit,
                        data: {
                            memberId: userdata.id,
                            projectId: projectValue,
                            roleList: authorkarr.join("&")
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
        }
        loadMyModal(config);
    })
    //返回到项目管理
    $('#prevBack,#goback').on('click', function () {
        router.setRoute('/userProject');
    })
    //ajax请求处理数据
    function ajaxLoading(param) {
        if (isLogin()) {
            myTooltips({
                state: 'info',
                time: 10000,
                message: '加载数据中，请稍后...'
            });
            _ajax({
                url: GLOBAL_AJAX_URL.proMemberList,
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
                $tr = $('<tr><td><input class="btn-check" type="checkbox" value="' + data.list[i].id + '"/></td><td>' + data.list[i].memberName + '</td><td>' + data.list[i].memberLoginName + '</td><td class="table-overflow"></td><td><a class="btn-edit">编辑</a><a class="btn-del">删除</a></td></tr>');
                var arrMember = [];
                for (var j = 0, lens = data.list[i].memberRoles.length; j < lens; j++) {
                    arrMember.push(data.list[i].memberRoles[j].name);
                }
                $tr.find('.table-overflow').html(arrMember.join(", "));
                $tr.data("userdata", {
                    id: data.list[i].id
                });
                dom.append($tr);
            }
        } else {
            dom.html('<tr><td colspan="5" style="height:80px;line-height:80px">暂时没有查到数据</td></tr>');
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
                        projectId: projectValue,
                        memberName: searchValue,
                        pageSize: pagesize,
                        pageIndex: num
                    }
                    ajaxLoading(param);
                }
            }
        });
    }
})