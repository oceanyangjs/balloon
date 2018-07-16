var Util = /** @class */ (function () {
    function Util() {
    }
    Util.randw = function (s, w) {
        return (s + w * Math.random()) * ConstPara.SCREEN_WIDTH;
    };
    Util.randh = function (s, w) {
        return (s + w * Math.random()) * ConstPara.SCREEN_HEIGHT;
    };
    //显示文字提示的工具类
    //默认为5秒后内容消失
    Util.showMsg = function (text, x, y, ticks, fontSize, color) {
        if (ticks === void 0) { ticks = 5000; }
        if (fontSize === void 0) { fontSize = 20; }
        if (color === void 0) { color = "#ff0000"; }
        var txt = new Laya.Text;
        txt.text = text;
        txt.x = x;
        txt.y = y;
        txt.fontSize = fontSize; //字体大小
        txt.color = color; //--字体颜色
        Laya.stage.addChild(txt);
        if (ticks > 0) {
            setTimeout(function () {
                Laya.stage.removeChild(txt);
            }, ticks);
        }
    };
    //暂时的特效替代
    //todo -- 将来需要移除，转而使用新的特效类
    Util.addParticlesRound = function () {
        Util.showMsg("我是临时的特效替代品", 0, 0);
        //console.log("我是临时的特效替代品");
    };
    //暂时的气球爆炸效果
    //todo
    Util.addParticlesAngle = function () {
        //console.log("我是临时的特效替代品--气球爆炸效果");
    };
    //是否在范围内
    Util.isInScreen = function (p) {
        return (p.x >= 0 && p.x <= ConstPara.SCREEN_WIDTH && p.y >= 0 && p.y <= ConstPara.SCREEN_HEIGHT);
    };
    return Util;
}());
new Util();
//# sourceMappingURL=Util.js.map