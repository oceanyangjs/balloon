class BitmapFactory {
	public constructor() {
	}
	
    public static createBitmap(name:string,x:number,y:number) { 
        var result: Laya.Sprite = new Laya.Sprite;
        result.loadImage("../laya/assets/comp/" + name,x,y);
        // var texture: Laya.Texture = RES.getRes(name);
        // result. = texture;
        return result;
    }
}