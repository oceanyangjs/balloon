//游戏UI
var GameUI = /** @class */ (function () {
    function GameUI() {
    }
    GameUI.prototype.InitUI = function () {
        //游戏名称
        // var txt:Laya.Text;
        // txt = new Laya.Text;
        // txt.text = "aaaa";
        // txt.color = "#ff0000";
        // txt.strokeColor = "#ffffff";
        // txt.bgColor = "#97ffff";
        // txt.alpha = 0.7;
        // txt.fontSize = 35;
        // txt.x = 200;
        // txt.y = 150;
        // Laya.stage.addChild(txt);
        // var line:Laya.Line = new Laya.Line(0,100,number(Laya.stage.width),1,"#ff0000");
        //绘制游戏页面
        var sp = new Laya.Sprite;
        Laya.stage.addChild(sp);
        //画直线
        sp.graphics.drawLine(0, 0.75 * Laya.stage.height, Laya.stage.width, 0.75 * Laya.stage.height, "#ff0000", 3);
        //鼠标操作的监听
        //各种块状物体的生成
        //分数的变化
        //游戏结束的控制
        //游戏逻辑相关
    };
    return GameUI;
}());
new GameUI();
//# sourceMappingURL=GameUI.js.map