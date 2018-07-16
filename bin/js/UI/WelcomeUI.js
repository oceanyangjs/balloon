// 程序入口
var WelcomeUI = /** @class */ (function () {
    function WelcomeUI() {
        this.skin = "./../../../../laya/assets/comp/button.png";
        this.playButton = new Laya.Button; //开始游戏按钮
    }
    WelcomeUI.prototype.InitUI = function () {
        //游戏名称
        this.gameTitle = new Laya.Text;
        this.gameTitle.text = "Balloon Target";
        this.gameTitle.color = "#ff0000";
        this.gameTitle.strokeColor = "#ffffff";
        this.gameTitle.bgColor = "#97ffff";
        this.gameTitle.alpha = 0.7;
        this.gameTitle.fontSize = 35;
        this.gameTitle.x = 200;
        this.gameTitle.y = 150;
        Laya.stage.addChild(this.gameTitle);
        this.playButton = new Laya.Button(this.skin);
        this.playButton.width = 100;
        this.playButton.height = 50;
        this.playButton.pos(200, 350);
        this.playButton.label = "start game";
        this.playButton.on(Laya.Event.CLICK, this, clickHandler);
        Laya.stage.addChild(this.playButton);
        function clickHandler() {
            console.log('button on click');
            this.updateFrame();
        }
    };
    return WelcomeUI;
}());
new WelcomeUI();
//# sourceMappingURL=WelcomeUI.js.map