/**
 * 静态数据类
 * @author 
 *
 */
class ConstPara {
	constructor() {
	}
	
    public static mouse: Laya.Point; mouseVel: Laya.Point;//鼠标位置
    public static BASE_LINE_L: Laya.Point; static BASE_LINE_R: Laya.Point;
    public static isMousePressed:boolean = false;
    public static isMouseClicked:boolean = false;
    public static SCREEN_WIDTH;
    public static SCREEN_HEIGHT;
    public static LIMIT_Y:number = 0.7*ConstPara.SCREEN_HEIGHT;

    public static LOW_V_AREA:number = 0.2*ConstPara.SCREEN_HEIGHT;//加速点

    public static balloons = [];//一堆气球
    public static pins = [];//一堆钉子
    public static bonuses = [];//一堆奖励
    public static particles = [];//一堆特效

    public static pinMaxY = 0;//障碍物里面的最大y值
    public static SIZE:number = 16;//奖励物体的大小
    public static isFirstBonus:boolean = true;//是否是第一次奖励
    public static numberOfBonus:number = 0;//积分

    public static isGameOver:boolean = false;//是否游戏结束
    public static rank:number = 1;
}
