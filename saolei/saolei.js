/// <reference path="../ts/jquery.d.ts" />
"use strict";

var gameDiTu = new DiTu();
var startTime = null;
var end = false;


$(function () {
    $(document).on("contextmenu", "table", function () {
        return false;
    });

    $(document).on("selectstart", "body", function () {
        return false;
    });

    $("#zailaiyiju").click(function (e) {
        e.preventDefault();
        $("div#create,div#map,#zailaiyiju").toggle();
        gameDiTu = new DiTu();
        startTime = null;
        $("table").remove();
    });




    $("#kaishi").click(function () {
        $("#game").toggle(500);
    });



    $("button#createSaoLei").click(function (e) {
        e.preventDefault();
        $("div#create,div#map").toggle();
        getMap();
        $("#leiNum").text(gameDiTu.shengLeiShu);
    });

    $(document).on("mouseover", "td", function (event) {
        var key = $(this).attr("id");
        var fangkuai = gameDiTu.getFangKuai(key);
        var si = fangkuai.haveLei;
        if(si){
            $("h2").html("您请求的页面似乎有问题!.");
        }else{
            $("h2").html("您请求的页面似乎有问题!");
        }
    });


    $(document).on("mousedown", "td", function (event) {
        
        if(end){
            return;
        }

        var key = $(this).attr("id");

        switch (event.which) {
            case 1: //左键
                
                zuojiandanji(key);
                break;
            case 2: //中键
                zhongjiandanji(key)
                break;
            case 3: //右键
                youjiandanji(key);
                break;
        }
        $("#leiNum").text(gameDiTu.shengLeiShu);
    });

    $(document).on("dblclick", "td", function (event) {
        var key = $(this).attr("id");
        zhongjiandanji(key)
        $("#leiNum").text(gameDiTu.shengLeiShu);
    });
});

function zhongjiandanji(key) {
    var fangkuai = gameDiTu.getFangKuai(key);
    var kejian = fangkuai.keJian;
    if (kejian) { //必须是可见的
        //标记的旗帜和提示的雷数必须一致
        var qizinum = fangkuai.getQiZiNum(gameDiTu);
        if (qizinum == fangkuai.tiShi) {
            //依次开启那些没有开启的,八个方向
            zuojiandanji(fangkuai.getShangKey(gameDiTu)) &&
                zuojiandanji(fangkuai.getXiaKey(gameDiTu)) &&
                zuojiandanji(fangkuai.getZuoKey(gameDiTu)) &&
                zuojiandanji(fangkuai.getYouKey(gameDiTu)) &&
                zuojiandanji(fangkuai.getZuoShangKey(gameDiTu)) &&
                zuojiandanji(fangkuai.getYouShangKey(gameDiTu)) &&
                zuojiandanji(fangkuai.getZuoXiaKey(gameDiTu)) &&
                zuojiandanji(fangkuai.getYouXiaKey(gameDiTu))

        }
    }
}

function youjiandanji(key) {
    var fangkuai = gameDiTu.getFangKuai(key);
    var qizi = fangkuai.biaoJi;
    var keJian = fangkuai.keJian;
    if (qizi) {
        fangkuai.biaoJi = false;
        $("#" + key).removeClass("qizi").addClass("weizhi");
        gameDiTu.shengLeiShu++;
    } else if (!keJian) {
        fangkuai.biaoJi = true;
        $("#" + key).removeClass("weizhi").addClass("qizi");
        gameDiTu.shengLeiShu--;
    }
}

function zuojiandanji(key) {
    if (key == -1) {
        return true;
    }
    if (startTime == null) {
        startTime = Date.parse(new Date());
        console.debug('=>%s,%s , %s', 'zuojiandanji', Date.parse(new Date()), startTime);
    }
    var fangkuai = gameDiTu.getFangKuai(key);
    var kejian = fangkuai.keJian;
    var change = gameDiTu.change(key);
    var si = fangkuai.haveLei;
    var qizi = fangkuai.biaoJi;
    if (qizi) {
        //标记了旗子,就不能再点了

    } else {
        //画雷
        if (si) {
            //改变地图 
            changeMap(gameDiTu.fangKuaiMap, -1);
            $("#zailaiyiju").text("用时{0}秒后,你挂了!!! 再来一局".format(getTime())).toggle();
            end = true;
            return false;
        } else {
            //改变地图 
            changeMap(change, 1);
            if (gameDiTu.isWin()) {
                changeMap(gameDiTu.fangKuaiMap, 0);
                $("#zailaiyiju").text("用时{0}秒后,你赢了!!! 再来一局".format(getTime())).toggle();
                end = true;
                return false;
            }
        }
    }
    return true;
}

function getTime() {
    console.debug('=>%s,%s , %s', 'getTime', Date.parse(new Date()), startTime);
    return (Date.parse(new Date()) - startTime) / 1000;
}

/**
 * 改变地图
 * type : 0 胜利  1 普通  -1 失败
 * 
 * @param {Object[]} change
 * @param {number} type
 */
function changeMap(change, type) {
    for (var key in change) {
        var fangkuai = change[key];
        var tishi = fangkuai.tiShi;
        var isLei = fangkuai.haveLei;
        var qizi = fangkuai.biaoJi;
        if (qizi) {
            if (type == -1 && !isLei) {
                $("#" + key).removeClass("qizi").addClass("cuowu");
            }
        } else {
            if (isLei) {
                if (type == 0) {
                    $("#" + key).removeClass("weizhi").addClass("qizi");

                } else {
                    $("#" + key).removeClass("weizhi").addClass("lei");
                }
            } else {
                $("#" + key).removeClass("weizhi").addClass("anquan");
                if (tishi != 0) {
                    $("#" + key).text(tishi);
                }
            }
        }
    }
}



function getMap() {
    end = false;
    console.debug('=>%s,%s', 'getMap', Date.parse(new Date()));
    var selectDiff = Number($("#create input[name='select']:checked").val());

    switch (selectDiff) {
        case 1:
            gameDiTu.initializationDiTu(10, 9, 9);
            break;
        case 2:
            gameDiTu.initializationDiTu(40, 16, 16);
            break;
        case 3:
            gameDiTu.initializationDiTu(99, 30, 16);
            break;
        case 4:
            gameDiTu.initializationDiTu(10, 9, 9);
            break;
    }
    huaTable(gameDiTu.mapX, gameDiTu.mapY);
}

function huaTable(x, y) {
    var tableId = x + "a" + y;
    var table = $("<table id='{0}'></table>".format(tableId));
    $("div#map #message").after(table);
    for (var i = 0; i < y; i++) {
        var trId = i + "r";
        $("table#" + tableId).append($("<tr id='{0}'></tr>".format(trId)));
        for (var ii = 0; ii < x; ii++) {
            var tdId = ii * y + i;
            $("table#{0} tr#{1}".format(tableId, trId)).append($("<td id='{0}'></td>".format(tdId)));
            $("table#{0} tr#{1} td#{2}".format(tableId, trId, tdId)).addClass("weizhi");
        }
    }
}




String.prototype.format = function (args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        } else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}