/**
 * Created by lollipop on 2018/9/4
 */
layui.use(['jquery', 'carousel'], function(){
    const $ = layui.jquery,
        carousel = layui.carousel;
    carousel.render({
        elem: '#banner-carousel'
        ,height: '450px'
        ,width: '100%' //设置容器宽度
        ,arrow: 'none' //始终显示箭头
        //,anim: 'updown' //切换动画方式
    });

});