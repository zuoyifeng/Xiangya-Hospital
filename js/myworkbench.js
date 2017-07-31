$(function(){
    //我的患者切换
    $('#ya-category span').on('click',function () {
        var i=$(this).index();
        $(this).addClass('select').siblings().removeClass('select');
        $('#ya-con li').eq(i).show().siblings().hide();
    })
    //会诊/转诊切换
    $('#ya-twoConsult span').on('click',function () {
        var i=$(this).index();
        $(this).addClass('select').siblings().removeClass('select');
        $('#ya-consultContent li').eq(i).show().siblings().hide();
    })
})