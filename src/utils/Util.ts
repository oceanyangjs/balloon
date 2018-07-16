class Util{
    constructor(){

    }
    public static randw(s:number, w:number):number {
		return (s + w * Math.random()) * ConstPara.SCREEN_WIDTH;
	}
	
	
	public static randh(s:number, w:number):number {
		return (s + w * Math.random()) * ConstPara.SCREEN_HEIGHT;
	}

	//显示文字提示的工具类
	//默认为5秒后内容消失
	public static showMsg(text:string,x:number,y:number,ticks:number = 5000,fontSize:number= 20,color:string="#ff0000"){
		var txt = new Laya.Text;
		txt.text = text;
		txt.x = x;
		txt.y = y;
		txt.fontSize = fontSize;//字体大小
		txt.color = color;//--字体颜色
		Laya.stage.addChild(txt);
		if(ticks > 0){
			setTimeout(function() {
				Laya.stage.removeChild(txt);
			}, ticks);
		}
	}

	//暂时的特效替代
	//todo -- 将来需要移除，转而使用新的特效类
	public static addParticlesRound(){
		Util.showMsg("我是临时的特效替代品",0,0);
		//console.log("我是临时的特效替代品");
	}

	//暂时的气球爆炸效果
	//todo
	public static addParticlesAngle(){
		//console.log("我是临时的特效替代品--气球爆炸效果");
	}

	//是否在范围内
	public static isInScreen(p:Laya.Point):boolean {
	    return (p.x >= 0 && p.x <= ConstPara.SCREEN_WIDTH  && p.y >= 0 && p.y <= ConstPara.SCREEN_HEIGHT );
	}
}
new Util();