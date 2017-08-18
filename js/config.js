/*javascript配置文件*/
var GLOBAL_DEBUG = true;//是否本地调试，true本地调试,false生产环境
var GLOBAL_IMGS_URL = 'imgs/';//图片路径

//后台ajax请求地址
var GLOBAL_AJAX_URL = {
    economic_steelpmi: '/metallurgy/macroeconomic/steelpmi',//钢铁PMI
	economic_steelpmiExcel: '/metallurgy/macroeconomic/steelpmiexcel',//钢铁PMI-图表导出表格
};
//模拟的JSON数据
var GLOBAL_JSON = {
    
    //钢铁PMI

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
                }
            ]
        }
    }
    
};
