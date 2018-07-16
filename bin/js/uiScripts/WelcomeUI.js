// 程序入口
var WelcomeUI = /** @class */ (function () {
    function WelcomeUI() {
        this.skin = "../../laya/assets/comp/button.png";
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
        var img = new Laya.Sprite();
        //加载显示图片，坐标位于100,50
        //img.loadImage("D:/_git_project/layaProject/layavoid/laya/assets/comp/bg.jpg",0,0);
        img.loadImage("../../laya/assets/comp/image.png", 0, 0);
        //添加到舞台
        Laya.stage.addChild(img);
        Laya.loader.load(this.skin, Laya.Handler.create(this, this.onButtonLoaded));
    };
    //按钮加载
    WelcomeUI.prototype.onButtonLoaded = function () {
        this.playButton = new Laya.Button();
        this.playButton.skin = this.skin;
        this.playButton.width = 100;
        this.playButton.height = 50;
        this.playButton.pos(250, 350);
        this.playButton.label = "start game";
        this.playButton.on(Laya.Event.CLICK, this, clickHandler);
        Laya.stage.addChild(this.playButton);
        function clickHandler() {
            console.log('button on click');
            this.startGame();
        }
    };
    //点击开始按钮的响应事件
    //开始游戏，应切换为游戏场景中
    WelcomeUI.prototype.startGame = function () {
        console.log("welcomeUI--startGame");
        var mgrUI = new MgrUI;
        mgrUI.startGameUI();
    };
    return WelcomeUI;
}());
new WelcomeUI();
//# sourceMappingURL=WelcomeUI.js.map