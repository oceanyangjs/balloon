// 程序入口
class WelcomeUI{
    private skin:string = "../../laya/assets/comp/button.png";
    private playButton:Laya.Button = new Laya.Button;//开始游戏按钮
    private gameTitle:Laya.Text;//游戏名称
    constructor()
    {
    }
    public InitUI():void{
        //游戏名称
        this.gameTitle = new Laya.Text;
        this.gameTitle.text = "Balloon Target";
        this.gameTitle.color = "#ff0000";
        this.gameTitle.strokeColor = "#ffffff";
        //this.gameTitle.bgColor = "#97ffff";
        this.gameTitle.alpha = 0.7;
        this.gameTitle.fontSize = 35;
        this.gameTitle.x = 0.3*ConstPara.SCREEN_WIDTH;
        this.gameTitle.y = 0.3*ConstPara.SCREEN_HEIGHT;
        this.gameTitle.align = "center";
        this.gameTitle.valign = "center";
        Laya.stage.addChild(this.gameTitle);
        // var img:Laya.Sprite = new Laya.Sprite();
        // //加载显示图片，坐标位于100,50
        // //img.loadImage("D:/_git_project/layaProject/layavoid/laya/assets/comp/bg.jpg",0,0);
        // img.loadImage("../../laya/assets/comp/image.png",0,0);
        // //添加到舞台
        // Laya.stage.addChild(img);
        Laya.loader.load(this.skin, Laya.Handler.create(this, this.onButtonLoaded));
    }
    //按钮加载
    private onButtonLoaded():void{
        this.playButton = new Laya.Button();
        // var btnSprite:Laya.Sprite = new Laya.Sprite;
        // btnSprite.graphics.drawRect(100,100,20,20,"#ff0000");
        this.playButton.skin = this.skin;
        this.playButton.width = 0.3*ConstPara.SCREEN_WIDTH;
        this.playButton.height = 0.05*ConstPara.SCREEN_HEIGHT;
        this.playButton.pos(0.3*ConstPara.SCREEN_WIDTH,0.6*ConstPara.SCREEN_HEIGHT);
        this.playButton.label = "start game";
        this.playButton.text.fontSize = 30;
        this.playButton.on(Laya.Event.CLICK, this, clickHandler);
        Laya.stage.addChild(this.playButton);
        function clickHandler () {
            //console.log('button on click')
            this.startGame();
        }
    }
    //点击开始按钮的响应事件
    //开始游戏，应切换为游戏场景中
    private startGame():void{
        //console.log("welcomeUI--startGame");
        MgrUI.startGameUI();
    }
    //销毁当前UI
}
new WelcomeUI();