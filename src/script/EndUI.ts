//游戏结束UI
class EndUI{
    private skin:string = "../../laya/assets/comp/button.png";
    private restartButton:Laya.Button = new Laya.Button;//开始游戏按钮
    private gameTitle:Laya.Text;//游戏结束公告
    constructor()
    {
    }
    public InitUI():void{
        //游戏名称
        this.gameTitle = new Laya.Text;
        this.gameTitle.text = "Game Over! It's a pity!";
        this.gameTitle.color = "#ff0000";
        this.gameTitle.strokeColor = "#ffffff";
        //this.gameTitle.bgColor = "#97ffff";
        this.gameTitle.alpha = 0.7;
        this.gameTitle.fontSize = 35;
        this.gameTitle.x = 0.25*ConstPara.SCREEN_WIDTH;
        this.gameTitle.y = 0.3*ConstPara.SCREEN_HEIGHT;
        Laya.stage.addChild(this.gameTitle);
        Laya.loader.load(this.skin, Laya.Handler.create(this, this.onButtonLoaded));
    }
    //按钮加载
    private onButtonLoaded():void{
        this.restartButton = new Laya.Button();
        this.restartButton.skin = this.skin;
        this.restartButton.width = 0.3*ConstPara.SCREEN_WIDTH;
        this.restartButton.height = 0.05*ConstPara.SCREEN_HEIGHT;
        //this.restartButton.pos(250,350);
        this.restartButton.pos(0.3*ConstPara.SCREEN_WIDTH,0.6*ConstPara.SCREEN_HEIGHT);
        this.restartButton.label = "restart game";
        this.restartButton.text.fontSize = 30;
        this.restartButton.on(Laya.Event.CLICK, this, clickHandler);
        Laya.stage.addChild(this.restartButton);
        function clickHandler () {
            //console.log('button on click')
            this.restartGame();
        }
    }
    //点击开始按钮的响应事件
    //开始游戏，应切换为游戏场景中
    private restartGame():void{
        //console.log("endUI--restartGame");
        MgrUI.startWelcomeUI();
    }
    //销毁当前UI
}
new EndUI();