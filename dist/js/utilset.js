'use strict';

/**
 * Created by lollipop on 2018/9/5
 */
layui.define(['jquery'], function (exports) {
    var $ = layui.jquery;
    var obj = {
        scroll: function scroll() {
            return {
                top: document.documentElement.scorllTop || document.body.scorllTop || window.pageYOffset || 0,
                left: document.documentElement.scorllLeft || document.body.scorllLeft || window.pageXOffset || 0
            };
        },
        animateEle: function animateEle(ele, json, fn) {
            var that = this;
            clearInterval(ele.timer);
            ele.timer = setInterval(function () {
                var flag = true;
                for (var attr in json) {
                    var leader = 0,
                        step = 0;
                    //opacity没有单位 参与运算自动转换成数值 所以不用parsetInt
                    //取值范围 0-1 0.1 0.33 33 为了让以前的计算公式生效 要扩大100倍
                    if (attr == 'opacity') {
                        leader = parseInt(that.getStyle(ele, attr) * 100);
                        step = (json[attr] - leader) / 10;
                        step = step > 0 ? Math.ceil(step) : Math.floor(step);
                        leader = leader + step;
                        ele.style[attr] = leader / 100; //opacity没有单位
                    } else if (attr == 'zIndex') {
                        ele.style[attr] = json[attr]; //层级不需要渐变 直接设置即可
                    } else {
                        leader = parseInt(that.getStyle(ele, attr));
                        step = (json[attr] - leader) / 10;
                        step = step > 0 ? Math.ceil(step) : Math.floor(step);
                        ele.style[attr] = leader + step + 'px';
                    }
                    if (leader != json[attr]) {
                        flag = false;
                    }
                }
                if (flag) {
                    clearInterval(ele.timer);
                    if (fn) {
                        fn();
                    }
                }
            }, 50);
        },
        getStyle: function getStyle(ele, attr) {
            // 获取计算后样式
            return (ele.currentStyle ? ele.currentStyle : window.getComputedStyle(ele, null))[attr];
        }
    };
    exports('utilset', obj);
});