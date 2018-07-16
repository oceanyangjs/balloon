// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.init(640, 1136);
        //Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        // Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        //Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        //游戏启动，首先调用管理类
        MgrUI.initStaticData();
        MgrUI.startWelcomeUI();
    }
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=GameMain.js.map