/// <reference path="../ts/jquery.d.ts" />
"use strict";

function DiTu() {}
DiTu.prototype.leiShu = 0;
DiTu.prototype.shengLeiShu = 0;
DiTu.prototype.mapX = 0;
DiTu.prototype.mapY = 0;
DiTu.prototype.fangKuaiMap = {};



DiTu.prototype.isWin = function () {
    console.debug('=>%s,%s', 'DiTu.prototype.isWin', Date.parse(new Date()));
    for (var key in this.fangKuaiMap) {
        var element = this.fangKuaiMap[key];
        if (!element.haveLei && !element.keJian) {
            return false;
        }
    }
    return true;
};
DiTu.prototype.setFangKuai = function () {
    console.debug('=>%s,%s', 'DiTu.prototype.setFangKuai', Date.parse(new Date()));
    //根据 x y 周建立方块
    for (var x = 0; x < this.mapX; x++) {
        for (var y = 0; y < this.mapY; y++) {
            var nf = new FangKuai(x, y);
            this.fangKuaiMap[nf.getKey(this)] = nf;
        }
    }
};
DiTu.prototype.setLei = function () {
    console.debug('=>%s,%s', 'DiTu.prototype.setLei', Date.parse(new Date()));
    var swapList = [];
    for (var key in this.fangKuaiMap) {
        var element = this.fangKuaiMap[key];
        swapList.push(element);
    }

    for (var i = 0; i < this.leiShu; i++) {
        var index = getRandomNum(0, swapList.length - 1);
        var f = swapList[index];
        f.setLeiToFangKuai();
        swapList.splice(index, 1);
    }
};
DiTu.prototype.setTiShi = function () {
    console.debug('=>%s,%s', 'DiTu.prototype.setTiShi', Date.parse(new Date()));
    for (var key in this.fangKuaiMap) {
        var element = this.fangKuaiMap[key];
        element.setTiShi(this);
    }
};

DiTu.prototype.initializationDiTu = function (leiShu, mapX, mapY) {
    console.debug('=>%s,%s', 'DiTu.prototype.initializationDiTu', Date.parse(new Date()));
    if (this instanceof DiTu) {
        this.shengLeiShu = leiShu;
        this.leiShu = leiShu;
        this.mapX = mapX;
        this.mapY = mapY;
        this.fangKuaiMap = {};
        this.setFangKuai();
        this.setLei();
        this.setTiShi();
    }
};
DiTu.prototype.getFangKuai = function (key) {
    // console.debug('=>%s,%s，%s', 'DiTu.prototype.getFangKuai', Date.parse(new Date()) , key); 
    return this.fangKuaiMap[key];
};
DiTu.prototype.getKeyByXY = function (x, y) {
    // console.debug('=>%s,%s，%s , %s', 'DiTu.prototype.getKeyByXY', Date.parse(new Date()) , x, y); 
    if (x >= 0 && x < this.mapX && y >= 0 && y < this.mapY) {
        return x * this.mapY + y;
    } else {
        return -1;
    }
};

DiTu.prototype.change = function (key) {
    console.debug('=>%s,%s，%s', 'DiTu.prototype.change', Date.parse(new Date()), key);
    var changeMap = {};
    this.getChangeMap(key, changeMap);
    return changeMap;
};

DiTu.prototype.getChangeMap = function (key, changeMap) {
    console.debug('=>%s,%s，%s , %s', 'DiTu.prototype.getChangeMap', Date.parse(new Date()), key, changeMap);
    //递归检查
    var fangkuai = this.fangKuaiMap[key];
    fangkuai.keJian = true;
    changeMap[key] = fangkuai;
    if (fangkuai.tiShi == 0) {

        if (this.doGo(fangkuai.getShangKey(this))) {
            this.getChangeMap(fangkuai.getShangKey(this), changeMap);
        }
        if (this.doGo(fangkuai.getXiaKey(this))) {
            this.getChangeMap(fangkuai.getXiaKey(this), changeMap);
        }
        if (this.doGo(fangkuai.getZuoKey(this))) {
            this.getChangeMap(fangkuai.getZuoKey(this), changeMap);
        }
        if (this.doGo(fangkuai.getYouKey(this))) {
            this.getChangeMap(fangkuai.getYouKey(this), changeMap);
        }
        if (this.doGo(fangkuai.getZuoShangKey(this))) {
            this.getChangeMap(fangkuai.getZuoShangKey(this), changeMap);
        }
        if (this.doGo(fangkuai.getYouShangKey(this))) {
            this.getChangeMap(fangkuai.getYouShangKey(this), changeMap);
        }
        if (this.doGo(fangkuai.getZuoXiaKey(this))) {
            this.getChangeMap(fangkuai.getZuoXiaKey(this), changeMap);
        }
        if (this.doGo(fangkuai.getYouXiaKey(this))) {
            this.getChangeMap(fangkuai.getYouXiaKey(this), changeMap);
        }
    }
}

DiTu.prototype.doGo = function (key) {
    if (key != -1) {
        var f = this.fangKuaiMap[key];
        return !f.keJian && !f.haveLei;
    } else {
        return false;
    }
}


function FangKuai(x, y) {
    this.haveLei = false;
    this.tiShi = 0;
    this.keJian = false;
    this.biaoJi = false;
    this.x = x;
    this.y = y;
}
FangKuai.prototype.getKey = function (diTu) {
    return this.x * diTu.mapY + this.y;
};
FangKuai.prototype.setLeiToFangKuai = function () {
    this.haveLei = true;
};
FangKuai.prototype.getShangKey = function (diTu) {
    return diTu.getKeyByXY(this.x, this.y - 1);
};
FangKuai.prototype.getXiaKey = function (diTu) {
    return diTu.getKeyByXY(this.x, this.y + 1);
};
FangKuai.prototype.getZuoKey = function (diTu) {
    return diTu.getKeyByXY(this.x - 1, this.y);
};
FangKuai.prototype.getYouKey = function (diTu) {
    return diTu.getKeyByXY(this.x + 1, this.y);
};
FangKuai.prototype.getZuoShangKey = function (diTu) {
    return diTu.getKeyByXY(this.x - 1, this.y - 1);
};
FangKuai.prototype.getYouShangKey = function (diTu) {
    return diTu.getKeyByXY(this.x + 1, this.y - 1);
};
FangKuai.prototype.getZuoXiaKey = function (diTu) {
    return diTu.getKeyByXY(this.x - 1, this.y + 1);
};
FangKuai.prototype.getYouXiaKey = function (diTu) {
    return diTu.getKeyByXY(this.x + 1, this.y + 1);
};
FangKuai.prototype.setTiShi = function (diTu) {
    var count = 0;

    if (this.doGoLei(diTu, this.getShangKey(diTu))) {
        count++;
    }
    if (this.doGoLei(diTu, this.getXiaKey(diTu))) {
        count++;
    }
    if (this.doGoLei(diTu, this.getZuoKey(diTu))) {
        count++;
    }
    if (this.doGoLei(diTu, this.getYouKey(diTu))) {
        count++;
    }
    if (this.doGoLei(diTu, this.getZuoShangKey(diTu))) {
        count++;
    }
    if (this.doGoLei(diTu, this.getYouShangKey(diTu))) {
        count++;
    }
    if (this.doGoLei(diTu, this.getZuoXiaKey(diTu))) {
        count++;
    }
    if (this.doGoLei(diTu, this.getYouXiaKey(diTu))) {
        count++;
    }
    this.tiShi = count;
};
FangKuai.prototype.getQiZiNum = function (diTu) {
    var count = 0;

    if (this.doGoQizi(diTu, this.getShangKey(diTu))) {
        count++;
    }
    if (this.doGoQizi(diTu, this.getXiaKey(diTu))) {
        count++;
    }
    if (this.doGoQizi(diTu, this.getZuoKey(diTu))) {
        count++;
    }
    if (this.doGoQizi(diTu, this.getYouKey(diTu))) {
        count++;
    }
    if (this.doGoQizi(diTu, this.getZuoShangKey(diTu))) {
        count++;
    }
    if (this.doGoQizi(diTu, this.getYouShangKey(diTu))) {
        count++;
    }
    if (this.doGoQizi(diTu, this.getZuoXiaKey(diTu))) {
        count++;
    }
    if (this.doGoQizi(diTu, this.getYouXiaKey(diTu))) {
        count++;
    }
    return count;
};
FangKuai.prototype.doGoLei = function (diTu, key) {
    return key != -1 && diTu.getFangKuai(key).haveLei;
}
FangKuai.prototype.doGoQizi = function (diTu, key) {
    return key != -1 && diTu.getFangKuai(key).biaoJi;
}









/**
 * 遍历继承  (终极继承大法) 只继承了父类的公共方法/属性, 没有继承父类的私有方法/属性
 * 
 * @param {Function} Child
 * @param {Function} Parent
 */
function superExtend(Child, Parent) {
    var F = function () {};
    var c = Child.prototype; //将Child.prototype暂存到变量c
    F.prototype = Parent.prototype;
    Child.prototype = new F(); //重新开辟内存，Child.prototype改变不会影响c
    Child.prototype.constructor = Child;
    //遍历c，添加原来Child.prototype的属性
    for (var i in c) {
        console.debug('=>%s,%s,%s', i, Child.prototype[i], c[i]); // 输入日志到控制台
        Child.prototype[i] = c[i];
    }
    Child.uber = Parent.prototype;
}


/**
 * 深层复制
 * 参数c 不用写
 * 
 * @param {Object} p
 * @param {Object} c
 * @returns
 */
function deepCopy(p, c) {
    var c = c || {};
    for (var i in p) {
        if (typeof p[i] === 'object') {
            c[i] = (p[i].constructor === Array) ? [] : {};
            deepCopy(p[i], c[i]);
        } else {
            c[i] = p[i];
        }　　　　
    }
    return c;　　
}

/**
 * 随机函数 生成最小值(包含)到最大值(包含)
 * @param {number} Min
 * @param {number} Max
 * @returns
 */
function getRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}