//游戏UI
class GameUI{
    constructor()
    {
    }
    public InitUI():void{
        //绘制游戏页面
        var sp:Laya.Sprite = new Laya.Sprite;
        Laya.stage.addChild(sp);
        //画直线
        sp.graphics.drawLine(0, 0.7*Laya.stage.height, Laya.stage.width, 0.7*Laya.stage.height, "#ff0000", 3);
        //鼠标操作的监听
        //各种块状物体的生成
        //分数的变化
        //游戏结束的控制
        //游戏逻辑相关
        Util.showMsg("Game start!",200,150,2000,40);
        Util.showMsg("CLICK AND HOLD IN THIS AREA", 200, 300);//消息提示
        Util.showMsg("game score:",500,50,0);//当前得分问题提示
        MgrUI.getNumOfBonus();//得分的实时变化
        //Laya.timer.frameLoop(1,this,MgrUI.getNumOfBonus);//利用一个循环来设置分数
        //Util.showMsg(MgrUI.getNumOfBonus(),550,80,0);//实际分数
    }
}
new GameUI();