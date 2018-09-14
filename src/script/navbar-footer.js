'use strict';

/**
 * Created by lollipop on 2018/8/31
 */

layui.config({
    base: '../js/' //假设这是你存放拓展模块的根目录
}).extend({ //设定模块别名
    nicescroll: 'jquery.nicescroll',
    utilset: 'utilset' //相对于上述 base 目录的子目录
});

layui.use(['form',"jquery", "element", "layer", "nicescroll", "utilset"], function () {
    var element = layui.element
        ,$ = layui.jquery
        ,layer = layui.layer
        ,form = layui.form
        ,utilset = layui.utilset;

    var navBar = $('#nav-list')
        ,pattern = location.href
        ,navArr = ['index', 'corp_welfare', 'recruit_ad', 'AI', 'advice', 'fubao_mall', 'about_us']
        ,matches = []
        ,selector = ''
    navArr.forEach(function(item, index){
        matches = pattern.match(item);
        if(matches){
            selector = matches[0];
            if(selector === 'recruit_ad' || selector === 'AI' || selector === 'advice') {
                $('#hr_service').find("dd[data-key = "+ selector +"]").addClass('layui-this').siblings().removeClass('.layui-this');
                selector = 'hr_service';
            }
            navBar.find("li[data-key = "+ selector +"]").addClass('layui-this').siblings().removeClass('.layui-this');
        }
    });

// 切换tab
    function changeTab (iNow) {
        $('#corp_welfare').find('.layui-nav-child dd').eq(iNow).addClass('layui-this').siblings().removeClass('layui-this');
        $('#tabs').find('.layui-tab-title li').eq(iNow).addClass('layui-this').siblings().removeClass('layui-this');
        $('#tabs').find('.layui-tab-content .layui-tab-item').eq(iNow).addClass('layui-show').siblings().removeClass('layui-show');
    }

    if(location.hash =="#flex_benifit"){
        changeTab(0)
    }else if(location.hash =="#staff_ME"){
        changeTab(1)
    }else if(location.hash =="#insurance"){
        changeTab(2)
    }else if(location.hash =="#festival_prc"){
        changeTab(3)
    }else if(location.hash =="#staff_incent"){
        changeTab(4)
    }else if(location.hash =="#exhibition"){
        changeTab(5)
    }

    // 只在corp_welfare.html页面的时候起作用？
    let iNow = 0;
    $('#corp_welfare').find('.layui-nav-child dd').click(function (e) {

        iNow = $(this).index();
        $('#tabs').find('.layui-tab-title li').eq(iNow).addClass('layui-this').siblings().removeClass('layui-this');
        $('#tabs').find('.layui-tab-content .layui-tab-item').eq(iNow).addClass('layui-show').siblings().removeClass('layui-show');

        navArr.forEach(function(item, index){
            matches = pattern.match(item);
            if(matches){
                selector = matches[0];
                if(selector === 'recruit_ad' || selector === 'AI' || selector === 'advice') {
                    $('#hr_service').find("dd[data-key = "+ selector +"]").addClass('layui-this').siblings().removeClass('.layui-this');
                    selector = 'hr_service';
                }
                navBar.find("li[data-key = "+ selector +"]").addClass('layui-this').siblings().removeClass('.layui-this');
            }
        });
    });

    // $('#tabs').find('.layui-tab-title li').click(function(){
    //     console.log('进入.....')
    //     $(this).getNiceScroll().show().resize();
    // });

    // $("body").niceScroll();


    var gotop = $('.icon-gotop');

    var target = 0,
        leader = 0,
        timer = null;

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

    gotop.click(function () {
        clearInterval(timer);
        timer = setInterval(function () {
            // target 目标值 leader初始时是滚动的高度
            var step = (target - leader) / 10;
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
    });

    function stopBodyScroll (isFixed) {

        var bodyEl = document.body
        var top1 = 0
        if (isFixed) {
            top1 = window.scrollY
            bodyEl.style.position = 'fixed'
            bodyEl.style.top = -top1 + 'px'
        } else {
            bodyEl.style.position = ''
            bodyEl.style.top = ''
            window.scrollTo(0, top1) // 回到原先的top
        }
    }

    $('.btn-contactus, #openForm1, #openForm2, #openForm3, #openForm4').click(function () {
        var index = layer.open({
            type: 1, //页面层
            shade: 0.8,
            title: '联系我们',
            skin: "page-form-wrapper",
            scrollbar: false,
            content: $('#form-fill'), //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
        });

        form.verify({
            corpname: function(value, item){//value：表单的值、item：表单的DOM对象
                if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
                    return '用户名不能有特殊字符';
                }
                if(/(^\_)|(\__)|(\_+$)/.test(value)){
                    return '用户名首尾不能出现下划线\'_\'';
                }
                if(/^\d+\d+\d$/.test(value)){
                    return '用户名不能全为数字';
                }
            }
            ,linkman: function(value, item){//value：表单的值、item：表单的DOM对象
                if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
                    return '用户名不能有特殊字符';
                }
                if(/(^\_)|(\__)|(\_+$)/.test(value)){
                    return '用户名首尾不能出现下划线\'_\'';
                }
                if(/^\d+\d+\d$/.test(value)){
                    return '用户名不能全为数字';
                }
            }
            ,telephone: function(value, item){
                if(!/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(telephone)){
                    return '请输入有效的手机号码！';
                }
            }
        });

        //监听提交
        form.on('submit(submitInfos)', function (data) {
            // console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
            // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
            // console.log(data.field); //当前容器的全部表单字段，名值对形式：{name: value}
            let field = data.field;

            $.ajax({
                url: '/vita/m/salary/p_access',
                type: "post",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
                data: field,
                success: function (data) {
                    // console.log(data);
                    data = eval("(" + data + ")");
                    if (data.result) {
                        //请求成功之后弹框
                        const layer =layui.layer
                        layer.open({
                            type: 1,    //页面层
                            shade: 0.8,
                            title: false,
                            skin: "form-succ-wrapper",
                            scrollbar: false,
                            content: $('#form-succ'), //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
                            btn: ['知道了'],
                            btnAlign: 'c'
                        });
                        $('.form-fill input[name="corpname"]').val('');
                        $('.form-fill input[name="demand"]').val('');
                        $('.form-fill input[name="linkman"]').val('');
                        $('.form-fill input[name="telephone"]').val('');
                        layer.close(index);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    layer.alert('error ' + textStatus + ' ' + errorThrown);
                    // console.log('error ' + textStatus + ' ' + errorThrown);
                }
            });
            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        });
    });

    //better_understand
    form.verify({
        corpname: function(value, item){//value：表单的值、item：表单的DOM对象
            if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
                return '用户名不能有特殊字符';
            }
            if(/(^\_)|(\__)|(\_+$)/.test(value)){
                return '用户名首尾不能出现下划线\'_\'';
            }
            if(/^\d+\d+\d$/.test(value)){
                return '用户名不能全为数字';
            }
        }
        ,linkman: function(value, item){//value：表单的值、item：表单的DOM对象
            if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
                return '用户名不能有特殊字符';
            }
            if(/(^\_)|(\__)|(\_+$)/.test(value)){
                return '用户名首尾不能出现下划线\'_\'';
            }
            if(/^\d+\d+\d$/.test(value)){
                return '用户名不能全为数字';
            }
        }
        ,telephone: function(value, item){
            if(!/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(telephone)){
                return '请输入有效的手机号码！';
            }
        }
    });

    //监听提交
    form.on('submit(pageSubmit)', function (data) {
        // console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
        // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
        // console.log(data.field); //当前容器的全部表单字段，名值对形式：{name: value}
        let field = data.field;

        $.ajax({
            url: '/vita/m/salary/p_access',
            type: "post",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            data: field,
            success: function (data) {
                // console.log(data);
                data = eval("(" + data + ")");
                if (data.result) {
                    //请求成功之后弹框
                    const layer =layui.layer
                    layer.open({
                        type: 1,    //页面层
                        shade: 0.8,
                        title: false,
                        skin: "form-succ-wrapper",
                        scrollbar: false,
                        content: $('#form-succ'), //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
                        btn: ['知道了'],
                        btnAlign: 'c'
                    });
                    $('.better_understand input[name="corpname"]').val('');
                    $('.better_understand input[name="demand"]').val('');
                    $('.better_understand input[name="linkman"]').val('');
                    $('.better_understand input[name="telephone"]').val('');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                layer.alert('error ' + textStatus + ' ' + errorThrown);
                // console.log('error ' + textStatus + ' ' + errorThrown);
            }
        });
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

});



