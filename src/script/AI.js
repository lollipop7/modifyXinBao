/**
 * Created by lollipop on 2018/9/5
 */
layui.use(['jquery', 'carousel'], function(){
    const $ = layui.jquery;

    $('.intell-hr-tab').find('.tab-title .title-item').click(function(e){
        $(this).addClass('active').siblings().removeClass('active');
        let inow = $(this).index();
        $('.tab-content').find('.content-item').eq(inow).addClass('active').siblings().removeClass('active');
    })

});