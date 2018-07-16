class WYPoint {
	constructor() {
	}
	
	public static mul(p:Laya.Point, s:number){
    	return new Laya.Point(p.x * s, p.y * s);
	}
	
    public static distance(a: Laya.Point,b: Laya.Point){
        return a.distance(b.x,b.y);
        //return a.subtract(b).length;
    }
    
    public static lengthDis(a: Laya.Point){
        //return a.length;
        return a.distance(0,0);
    }

    public static make(x:number,y:number):Laya.Point{
        return new Laya.Point(x,y);
    }
}