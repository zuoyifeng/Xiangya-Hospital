//头部配置项
var HEADER_STYLE_CONFIG = {
    headerLogoUrl: 'admin/img/logo.png',//LOGO图片
    headerHeight: 60,   //头部高度
    headerBgColor: '#BD010F',//头部背景
    headerSelMarginR:5,//头部下拉右边marging
    headerSelPaddingL:10,//头部下拉左边padding
    headerSelBackgroundUrl:'img/down_arr.png',//头部下拉右边下拉小图标url
    headerSelItemPadding:'6px 10px',//头部下拉子项padding间距
    headerSelItemTBColor:'#014e8c',//头部下拉子项上边距颜色
    headerLogoLRPadding: 15,//头部LOGO左右padding间距
    headerMenuBgColor: 'transparent',//头部菜单背景
    headerMenuFontsize: 16,//头部菜单字体大小
    headerMenuFontcolor: '#fff',//头部菜单字体颜色
    headerMenuLRPadding: 20,//头部菜单左右padding间距
    headerMenuBorder: "transparent",//头部菜单左右边框颜色
    headerMenuHover: '#CD0110',//头部菜单鼠标移入背景
    headerMenuHoverFontcolor: '#fff',//头部菜单鼠标移入字体颜色
    headerMenuHoverBorder: "transparent",//头部菜单鼠标移入左右边框颜色
    headerMenuActive: '#A0010D',//头部菜单选中背景
    headerMenuActiveFontcolor: '#FEF200',//头部菜单选中字体颜色
    headerMenuActiveBorder: "#89010C",//头部菜单选中左右边框颜色
    headerMenuMargin: 0,//头部菜单左右间距
    headerUserMarginRight: 35,//头部右侧用户名距离窗口右侧距离
    headerUserFontsize: 16,//头部右侧用户名字体大小
    headerUserMinWidth: 100,//头部右侧用户名最低宽度
    headerUserBgColor: '#A0010D',//头部右侧用户名背景颜色
    headerUserFontcolor: '#fff',//头部右侧用户名字体颜色
    headerUserHoverBgColor: '#A0010D',//头部右侧用户名鼠标移入背景颜色
    headerUserHoverFontcolor: '#fff',//头部右侧用户名鼠标移入字体颜色
    headerUserPopBgColor: '#fff',//头部右侧弹出用户栏目项背景颜色
    headerUserPopBorder: '#ddd',//头部右侧弹出外边框颜色
    headerUserPopFontsize: 15,//头部右侧弹出用户栏目项字体大小
    headerUserPopWidth: 120,//头部右侧弹出用户栏目项宽度
    headerUserPopFontcolor: '#222',//头部右侧弹出用户栏目项字体颜色
    headerUserPopBorderBottom: 'transparent',//头部右侧弹出外边框颜色
    headerUserHoverPopBgColor: '#f2f2f2',//头部右侧弹出用户栏目项鼠标移入背景颜色
    headerUserHoverPopFontcolor: '#D3000E'//头部右侧弹出用户栏目项鼠标移入字体颜色
};
//左侧菜单配置项
var LEFT_MENU_CONFIG = {
    /*展开时菜单设置开始*/
    textColor: '#232323',//菜单整体文字颜色
    bgColor: '#fff',//菜单父容器整体背景颜色如(red,#f00,#ff0000,rgb(0,0,0),rgba(0,0,0,.3))
    /*展开时菜单设置结束*/
    expandWidth: 200,//展开菜单宽度
    expandHeight: 42,//展开菜单单独一个菜单高度
    expandBgColor: '#AD010E',//展开菜单背景颜色
    expandBTColor: '#89010C',//展开菜单上划线颜色
    expandHoverColor: '#C50110',//展开菜单鼠标移入背景颜色
    expandSelectedColor: '#AD010E',//展开菜单一级菜单选中和鼠标移入背景颜色
    expandFirstMenuFontSize: 16,//展开菜单一级菜单字体大小
    expandSecondMenuHeight: 40,//展开菜单二级菜单高度
    expandSecondMenuFontSize: 14,//展开菜单二级菜单字体大小
    expandSecondMenuBgColor: '#fff',//展开菜单二级菜单背景颜色
    expandSecondMenuBBColor: '#e5e5e5',//展开菜单二级菜单下划线颜色
    expandSecondMenuSelectedColor: '#f5f7f6',//展开菜单二级菜单选中和鼠标移入背景颜色
    expandSecondMenuSelectedFontColor: '',//展开菜单二级菜单选中字体颜色
    /*收缩时菜单设置开始*/
    tightWidth: 140,//收缩后弹出菜单宽度
    tightBgColor: '#fff',//收缩后弹出菜单背景颜色
    tightFirstMenuHeight: 43,//收缩后弹出菜单一级菜单高度
    tightFirstMenuFontSize: 16,//收缩后弹出菜单一级菜单字体大小
    tightFirstMenuBgColor: '#AD010E',//收缩后弹出菜单一级菜单默认背景颜色
    tightFirstMenuBBColor: '#AD010E',//收缩后弹出菜单一级菜单下划线颜色
    tightFirstMenuSelectedColor: '#AD010E',//收缩后弹出菜单一级菜单选中背景颜色
    tightSecondMenuHeight: 40,//收缩后弹出菜单二级菜单高度
    tightSecondMenuFontSize: 14,//收缩后弹出菜单二级菜单字体大小
    tightSecondMenuTBColor: '#e5e5e5',//收缩后弹出菜单二级菜单上划线颜色
    tightSecondMenuSelectedColor: '#f5f7f6',//收缩后弹出菜单二级菜单选中和鼠标移入背景颜色
    /*收缩时菜单设置结束*/
    /*收缩或者展开控制条设置开始*/
    ctrlBgColor: '#AD010E'//控制条背景颜色
    /*收缩或者展开控制条设置结束*/
};
var GLOBAL_DEBUG = true;//是否本地调试，true本地调试,false生产环境//封装ajax请求
//后台ajax请求地址
var GLOBAL_AJAX_URL = {
    userLogin: '/embracebigdata/loginAction',
    menusTop:'/embracebigdata/api/menusTop/get',//获取头部菜单
    adminDetail: '/embracebigdata/api/user/infoGet',//管理员信息
    adminEdit: '/embracebigdata/api/user/infoEdit',//修改管理员
    adminPwd: '/embracebigdata/api/user/pswEdit',//密码修改
    tenantList: '/embracebigdata/api/tenant/listQuery',//租户列表
    tenantAdd: '/embracebigdata/api/tenant/add',//新增租户
    tenantEdit: '/embracebigdata/api/tenant/edit',//编辑租户
    tenantParent: '/embracebigdata/api/tenant/uerListQuery',//所属拥有者
    tenantDetail: '/embracebigdata/api/tenant/singleInfo',//租户详情
    tenantAuthorize: '/embracebigdata/api/tenant/powerListQuery',//租户授权
    tenantAuthorizeEdit: '/embracebigdata/api/tenant/powerEdit',//修改授权
    tenantOwnerEdit: '/embracebigdata/api/tenant/editTenantOwner',//修改所属拥有者
    tenantDelete: '/embracebigdata/api/tenant/del',//删除租户
    groupList: '/embracebigdata/api/group/listQuery',//分组列表
    groupAdd: '/embracebigdata/api/group/add',//新增分组
    groupDelete: '/embracebigdata/api/group/del',//删除分组
    groupEdit: '/embracebigdata/api/group/edit',//编辑分组
    groupDetail: '/embracebigdata/api/group/singleInfo',//分组详情
    applyList: '/embracebigdata/api/app/listQuery',//应用列表
    applyAdd: '/embracebigdata/api/app/add',//新增应用
    applyDelete: '/embracebigdata/api/app/del',//删除应用
    applyEdit: '/embracebigdata/api/app/edit',//编辑应用
    applyDetail: '/embracebigdata/api/app/singleInfo',//应用详情
    userList: '/embracebigdata/api/user/listQuery',//用户列表
    userTenant: '/embracebigdata/api/tenant/ListAll',//用户管理所有所属租户列表
    userGroup: '/embracebigdata/api/group/ListAll',//用户管理所属分组列表
    userAdd: '/embracebigdata/api/user/add',//新增用户
    userDelete: '/embracebigdata/api/user/del',//删除用户
    userEdit: '/embracebigdata/api/user/edit',//编辑用户
    userDetail: '/embracebigdata/api/user/singleInfo',//单用户详情
    roleList: '/embracebigdata/api/role/listQuery',//角色列表
    roleAdd: '/embracebigdata/api/role/add',//新增角色
    roleDelete: '/embracebigdata/api/role/del',//删除角色
    roleEdit: '/embracebigdata/api/role/edit',//编辑角色
    roleDetail: '/embracebigdata/api/role/singleInfo',//角色详细
    roleAuthorize: '/embracebigdata/api/role/powerListQuery',//角色权限列表
    roleAuthorizeEdit: '/embracebigdata/api/role/powerEdit',//角色授权
    proList: '/embracebigdata/api/project/listQuery',//项目列表
    proAdd: '/embracebigdata/api/project/add',//新增项目
    proDelete: '/embracebigdata/api/project/del',//删除项目
    proEdit: '/embracebigdata/api/project/edit',//编辑项目
    proDetail: '/embracebigdata/api/project/singleInfo',//项目详情
    proAdminList: '/embracebigdata/api/project/managerListQuery',//项目管理员
    proMemberList: '/embracebigdata/api/project/memberlistQuery',//项目成员列表
    proMemberAdd: '/embracebigdata/api/project/memberAdd',//新增项目成员
    proMemberDelete: '/embracebigdata/api/project/memberDel',//删除项目成员
    proMemberEdit: '/embracebigdata/api/project/memberEdit',//修改项目成员信息
    proMemberDetail: '/embracebigdata/api/project/memberSingleInfo',//项目成员详细
    projectAll: '/embracebigdata/api/project/nameListQuery',//所有项目列表
    proMemberAll: '/embracebigdata/api/project/memberListAndPowerListQuery'//所有项目成员[除属该项目外]
};
//模拟的JSON数据
var GLOBAL_JSON = {
    tenantList: {
        "status": true,
        "message": "查询成功",
        "data": {
            "totals": 100,
            "list": [
                {
                    "id": 119,
                    "code": "FBI",
                    "tenantName": "蘑菇头",
                    "tenantOwners": [
                        {
                            "id": 122,
                            "userName": "妹爷",
                            "owner": true
                        },
                        {
                            "id": 123,
                            "userName": "bbb",
                            "owner": false
                        },
                        {
                            "id": 124,
                            "userName": "ccc",
                            "owner": false
                        },
                        {
                            "id": 125,
                            "userName": "ddd",
                            "owner": false
                        }
                    ],
                    "description": "发型很重要",
                    "createdTime": "2017-03-05 16:43",
                    "updateTime": "2017-04-03 00:12",
                    "powerList": [
                        {
                            "id": 120,
                            "name": "数据采集",
                            "hasPower": true
                        },
                        {
                            "id": 121,
                            "name": "数据安全",
                            "hasPower": true
                        },
                        {
                            "id": 122,
                            "name": "全局查看",
                            "hasPower": true
                        },
                        {
                            "id": 123,
                            "name": "用户修改",
                            "hasPower": false
                        }
                    ]
                },
                {
                    "id": 130,
                    "tenantCode": "AAA",
                    "tenantName": "大白",
                    "tenantOwners": [
                        {
                            "id": 122,
                            "userName": "妹爷",
                            "owner": false
                        },
                        {
                            "id": 123,
                            "userName": "bbb",
                            "owner": true
                        },
                        {
                            "id": 124,
                            "userName": "ccc",
                            "owner": false
                        },
                        {
                            "id": 125,
                            "userName": "ddd",
                            "owner": false
                        }
                    ],
                    "description": "身宽体胖",
                    "createdTime": "2017-05-05 16:43",
                    "updateTime": "2017-06-03 00:12",
                    "powerList": [
                        {
                            "id": 120,
                            "name": "数据采集",
                            "hasPower": true
                        },
                        {
                            "id": 121,
                            "name": "数据安全",
                            "hasPower": true
                        },
                        {
                            "id": 122,
                            "name": "全局查看",
                            "hasPower": true
                        },
                        {
                            "id": 123,
                            "name": "用户修改",
                            "hasPower": false
                        }
                    ]
                }
            ]
        }
    },
    groupList: {
        "status": true,
        "message": "查询成功",
        "data": {
            "totals": 4,
            "list": [
                {
                    "id": 119,
                    "groupCode": "SJCL",
                    "groupName": "数据处理",
                    "description": "分组描述内容",
                    "creater": "杨一伟",
                    "createdTime": "2017-05-03 14:20"
                },
                {
                    "id": 120,
                    "groupCode": "SJFX",
                    "groupName": "数据分析",
                    "description": "良好，畅通",
                    "creater": "周达",
                    "createdTime": "2017-04-01 10:12"
                },
                {
                    "id": 121,
                    "groupCode": "SJKF",
                    "groupName": "数据开发",
                    "description": "分组描述内容",
                    "creater": "蒋子达",
                    "createdTime": "2017-04-01 10:12"
                },
                {
                    "id": 122,
                    "groupCode": "SJCJ",
                    "groupName": "数据采集",
                    "description": "良好",
                    "creater": "李明",
                    "createdTime": "2017-04-01 10:12"
                }
            ]
        }
    },
    applyList: {
        "status": true,
        "message": "查询成功",
        "data": {
            "totals": 100,
            "list": [
                {
                    "id": 119,
                    "appmCode": "FBI",
                    "appmName": "蘑菇头",
                    "appmUrl": "http://www.app.com",
                    "displayOrder": 2,
                    "appmIcon": "http://www.app.com/icon.png",
                    "description": "走上人生巅峰",
                    "createdTime": "2017-03-05 16:00"
                },
                {
                    "id": 120,
                    "appmCode": "BBC",
                    "appmName": "唐人街",
                    "appmUrl": "http://www.appbbc.com",
                    "displayOrder": 1,
                    "appmIcon": "http://www.app.com/iconbbc.png",
                    "description": "",
                    "createdTime": "2017-03-05 16:00"
                }
            ]
        }
    },
    userList: {
        "status": true,
        "message": "查询成功",
        "data": {
            "totals": 12,
            "list": [
                {
                    "id": 119,
                    "userName": "蘑菇头",
                    "loginName": "admin",
                    "passwd": "123abc",
                    "mobileNo": 1800000000,
                    "email": "400000000@qq.com",
                    "status": 1,
                    "group": {
                        "id": 123,
                        "name": "数据分析"
                    },
                    "createdTime": "2017-05-03 16:30",
                    "tenant": {
                        "id": 11,
                        "name": "张三"
                    }
                },
                {
                    "id": 120,
                    "userName": "米特",
                    "loginName": "miter",
                    "passwd": "123456",
                    "mobileNo": 1700000000,
                    "email": "300000000@qq.com",
                    "status": 0,
                    "group": {
                        "id": 2,
                        "name": "数据集成"
                    },
                    "createdTime": "2017-04-01 12:30",
                    "tenant": {
                        "id": 14,
                        "name": "李四"
                    }
                }
            ]
        }
    },
    userTenant: {
        "status": true,
        "message": "获取成功",
        "data": [
            {
                "id": 1,
                "tenantName": "张三"
            },
            {
                "id": 2,
                "tenantName": "李四"
            },
            {
                "id": 3,
                "tenantName": "王五"
            },
            {
                "id": 4,
                "tenantName": "赵六"
            },
            {
                "id": 5,
                "tenantName": "刘七"
            }
        ]
    },
    roleList: {
        "status": true,
        "message": "查询成功",
        "data": {
            "totals": 2,
            "list": [
                {
                    "id": 119,
                    "roleCode": "FBI",
                    "roleName": "用户管理",
                    "description": "发型很重要",
                    "createdTime": "2017-03-05 16:43",
                    "powerList": [
                        {
                            "id": 120,
                            "name": "数据采集",
                            "hasPower": true
                        },
                        {
                            "id": 121,
                            "name": "数据安全",
                            "hasPower": true
                        },
                        {
                            "id": 122,
                            "name": "全局查看",
                            "hasPower": true
                        },
                        {
                            "id": 123,
                            "name": "用户修改",
                            "hasPower": false
                        }
                    ],
                    "status": 0
                },
                {
                    "id": 130,
                    "roleCode": "AAA",
                    "roleName": "大白",
                    "description": "身宽体胖",
                    "createdTime": "2017-05-05 16:43",
                    "powerList": [
                        {
                            "id": 120,
                            "name": "数据采集",
                            "hasPower": true
                        },
                        {
                            "id": 121,
                            "name": "数据安全",
                            "hasPower": true
                        },
                        {
                            "id": 122,
                            "name": "全局查看",
                            "hasPower": true
                        },
                        {
                            "id": 123,
                            "name": "用户修改",
                            "hasPower": false
                        }
                    ],
                    "status": 1
                }
            ]
        }
    },
    proList: {
        "status": true,
        "message": "查询成功",
        "data": {
            "totals": 2,
            "list": [
                {
                    "id": 3,
                    "projectName": "机车车辆研究所",
                    "description": "项目描述",
                    "createdTime": "2017-03-05 16:43",
                    "createdPeoper": "yangyy",
                    "status": 1,
                    "peoperList": [
                        {
                            "id": 120,
                            "name": "杨云云"
                        },
                        {
                            "id": 121,
                            "name": "李小小"
                        },
                        {
                            "id": 122,
                            "name": "张大伟"
                        },
                        {
                            "id": 123,
                            "name": "王小明"
                        }
                    ]
                },
                {
                    "id": 4,
                    "projectName": "铁道建筑研究所",
                    "description": "项目描述",
                    "createdTime": "2017-03-05 16:43",
                    "createdPeoper": "yangyy",
                    "status": 0,
                    "peoperList": [
                        {
                            "id": 120,
                            "name": "杨云云"
                        },
                        {
                            "id": 121,
                            "name": "李小小"
                        }
                    ]
                }
            ]
        }
    },
    proMemberList: {
        "status": true,
        "message": "查询成功",
        "data": {
            "totals": 2,
            "list": [
                {
                    "id": 119,
                    "memberName": "李小小",
                    "memberLoginName": "Lixx",
                    "memberRoles": [
                        {
                            "id": 1,
                            "name": "数据采集"
                        },
                        {
                            "id": 2,
                            "name": "数据处理"
                        },
                        {
                            "id": 3,
                            "name": "数据分析"
                        },
                        {
                            "id": 4,
                            "name": "数据治理"
                        },
                        {
                            "id": 5,
                            "name": "脚本开发"
                        }
                    ]
                },
                {
                    "id": 120,
                    "memberName": "大白",
                    "memberLoginName": "exx",
                    "memberRoles": [
                        {
                            "id": 1,
                            "name": "数据采集"
                        },
                        {
                            "id": 2,
                            "name": "数据处理"
                        },
                        {
                            "id": 3,
                            "name": "数据分析"
                        }
                    ]
                }
            ]
        }
    },
    projectAll: {
        "status": true,
        "message": "获取成功",
        "data": [
            {
                "id": 1,
                "name": "冶金工业研究所"
            },
            {
                "id": 3,
                "name": "机车车辆研究所"
            },
            {
                "id": 4,
                "name": "铁道建筑研究所"
            }
        ]
    }
}