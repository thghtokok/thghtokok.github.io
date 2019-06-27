/// <reference path="../ts/jquery.d.ts" />
"use strict";

/**
 * 跳棋都有啥?
 * 棋子?棋盘?棋盘里的窟窿?
 * 规则?好多规则,
 * AI?选择一个棋子?走一步看一步?选择一个走的最远的?
 * 简单AI?中等AI?高等AI?
 * 开局,中盘,收官
 */

$(function () {

    $("#checkers").click(function () {
        $("#game2").toggle(500);
        $("#game2 p").html("aaaa");
    });

});

function shortestPath(map,start) {
    
    var list = [];
    
    map[start]



}