//模型基类
class Actor{
    public sprite:Laya.Sprite = new Laya.Sprite;
    public pos:Laya.Point = new Laya.Point;
    public size:number;
    
	public constructor() {
	}
	
    public initialize(){
    }
    
    public update():boolean{
        return true;
    }
    
    public removeSprite(){
        //Laya.stage.parent.removeChild(this.sprite);
        Laya.stage.removeChild(this.sprite);
    }
}
new Actor();