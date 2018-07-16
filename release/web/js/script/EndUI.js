//游戏结束UI
var EndUI = /** @class */ (function () {
    function EndUI() {
        this.skin = "../../laya/assets/comp/button.png";
        this.restartButton = new Laya.Button; //开始游戏按钮
    }
    EndUI.prototype.InitUI = function () {
        //游戏名称
        this.gameTitle = new Laya.Text;
        this.gameTitle.text = "Game Over! It's a pity!";
        this.gameTitle.color = "#ff0000";
        this.gameTitle.strokeColor = "#ffffff";
        //this.gameTitle.bgColor = "#97ffff";
        this.gameTitle.alpha = 0.7;
        this.gameTitle.fontSize = 35;
        this.gameTitle.x = 100;
        this.gameTitle.y = 150;
        Laya.stage.addChild(this.gameTitle);
        Laya.loader.load(this.skin, Laya.Handler.create(this, this.onButtonLoaded));
    };
    //按钮加载
    EndUI.prototype.onButtonLoaded = function () {
        this.restartButton = new Laya.Button();
        this.restartButton.skin = this.skin;
        this.restartButton.width = 100;
        this.restartButton.height = 50;
        this.restartButton.pos(250, 350);
        this.restartButton.label = "restart game";
        this.restartButton.on(Laya.Event.CLICK, this, clickHandler);
        Laya.stage.addChild(this.restartButton);
        function clickHandler() {
            //console.log('button on click')
            this.restartGame();
        }
    };
    //点击开始按钮的响应事件
    //开始游戏，应切换为游戏场景中
    EndUI.prototype.restartGame = function () {
        //console.log("endUI--restartGame");
        MgrUI.startWelcomeUI();
    };
    return EndUI;
}());
new EndUI();
//# sourceMappingURL=EndUI.js.map