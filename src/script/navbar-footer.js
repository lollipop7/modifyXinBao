/**
 * Created by lollipop on 2018/8/31
 */

layui.config({
    base: '../js/' //假设这是你存放拓展模块的根目录
}).extend({ //设定模块别名
    nicescroll: 'jquery.nicescroll'
    ,utilset: 'utilset' //相对于上述 base 目录的子目录
});

layui.use(["jquery", "element", "layer", "nicescroll", "utilset"], function(){
    const element = layui.element
        ,$ = layui.jquery
        ,layer = layui.layer
        ,utilset = layui.utilset;

    const navBar = $('#nav-list')
        ,pattern = location.href
        ,curHash = location.hash
    //     ,navArr = ['index', 'corp_welfare', 'hr_service', 'fubao_mall', 'about_us']
    //     ,navList = navBar.find('.layui-nav-item');
    // navArr.forEach(function(item, index){
    //     let matches = pattern.match(item)
    //     if(matches){
    //         navList.each(function(i, n){
    //             if(matches[0] == $(n).data("key")){
    //                 $(navList[i]).addClass('layui-this').siblings().removeClass('.layui-this');
    //             }
    //         })
    //     }
    // });
    let iNow = 0;
    $('#tabs').find('.layui-tab-title li').eq(iNow).addClass('layui-this').siblings().removeClass('layui-this');
    $('#tabs').find('.layui-tab-content .layui-tab-item').eq(iNow).addClass('layui-show').siblings().removeClass('layui-show');
    $('#corp_welfare').find('.layui-nav-child dd').click(function(){
        // $(this).addClass('layui-this').siblings().removeClass('layui-this');
        iNow= $(this).index();
        $('#tabs').find('.layui-tab-title li').eq(iNow).addClass('layui-this').siblings().removeClass('layui-this');
        $('#tabs').find('.layui-tab-content .layui-tab-item').eq(iNow).addClass('layui-show').siblings().removeClass('layui-show');
    });

    $("body").niceScroll();

    var gotop = $('.icon-gotop');

    document.onscroll = function () {
        if (utilset.scroll().top > 600) {
            // 高度大于300显示
            gotop.fadeIn();
            // 将leader的值传入
            leader = utilset.scroll().top;
        } else {
            // 小于300隐藏
            gotop.fadeOut();
        }
    };
    let target = 0,
        leader = 0,
        timer = null;
    gotop.click(function () {
            clearInterval(timer);
            timer = setInterval(function () {
                // target 目标值 leader初始时是滚动的高度
                let step = (target - leader) / 10;
                // 如果大于0向上取整小于0向下取整
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                // leader发生改变
                leader = leader + step;
                // 返回到哪一个地方
                window.scrollTo(0, leader);
                if (leader == target) {
                    clearInterval(timer);
                }
            }, 30);
        }
    )

    $('.btn-contactus, #openForm1, #openForm2, #openForm3, #openForm4').click(function () {
        const index = layer.open({
            type: 1, //页面层
            shade: 0.8,
            title: '联系我们',
            skin: "page-form-wrapper",
            scrollbar: false,
            content: $('#form-fill') //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
        });


        //监听提交
        form.on('submit(immidate)', function (data) {
            // console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
            // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
            console.log(data.field); //当前容器的全部表单字段，名值对形式：{name: value}
            // return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
            //请求成功之后弹框
            //     const layer =layui.layer
            //     layer.open({
            //         type: 1,    //页面层
            //         shade: 0.8,
            //         title: false,
            //         skin: "form-succ-wrapper",
            //         scrollbar: false,
            //         content: $('#form-succ'), //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
            //         btn: ['知道了'],
            //         btnAlign: 'c'
            //     });
        });
    });

});