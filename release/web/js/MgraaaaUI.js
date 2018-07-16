//游戏UI管理类
//用来操作游戏UI
var MgraaaaUI = /** @class */ (function () {
    function MgraaaaUI() {
    }
    MgraaaaUI.prototype.startWelcomeUI = function () {
        MgraaaaUI.welcomeUI.InitUI();
    };
    //初始化UI
    MgraaaaUI.welcomeUI = new WelcomeUI; //开始游戏页面UI
    MgraaaaUI.gameUI = new GameUI; //游戏页面
    MgraaaaUI.endUI = new EndUI; //游戏完成页面
    return MgraaaaUI;
}());
new MgraaaaUI();
//# sourceMappingURL=MgraaaaUI.js.map