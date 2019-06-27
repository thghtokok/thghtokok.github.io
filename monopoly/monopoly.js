/// <reference path="../ts/jquery.d.ts" />
"use strict";

/**
 * 大富翁
 * 投色子, 走格, 触发各格的内容
 * 先简单点
 */

$(function () {

    $("#timet").click(function () {
        $("#game3").toggle(500);
        $("#game3 p").html("aaaa");
    });

    $("#shazi1").click(function () {
        $("#game3 p").html(caster(1));
    });

    $("#shazi2").click(function () {
        $("#game3 p").html(caster(2));
    });

});


/**
 * 投色子
 * @param {Number} number 色子的个数
 */
function caster(number){
    var result = 0;
    for(var i = 0 ; i < number;i++){
        result += getRandomNum(1,6);
    }
    return result;
}


// 地图是一个链表, 每个链表是一个节点, 每个节点有自己的类型,  

// 参与者,  包括玩家和电脑

// 主程序是一个循环, 检查时候有需要移动的玩家, 如果有, 就移动这个玩家, 玩家一格一格的移动. 玩家移动完毕, 触发节点的行为
