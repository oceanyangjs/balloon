var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//障碍物--气球碰撞后爆裂
var Pin = /** @class */ (function (_super) {
    __extends(Pin, _super);
    function Pin(y) {
        var _this = _super.call(this) || this;
        _this.isRemoving = false; //是否正在移除--更正：含义为正在结束游戏
        //super(PrimitiveShape.FILLCIRCLE, SIZE);
        // this.pos.x = rands(0.1, 0.8); 
        // this.pos.x = rands(0.1, 0.8); 
        // this.pos.y = y - ConstPara.SCREEN_HEIGHT * 0.3;
        _this.pos.x = Util.randw(0.1, 0.8); //随机Y轴坐标
        //this.pos.y = y - ConstPara.SCREEN_HEIGHT * 0.3;
        _this.pos.y = 0;
        //this.pos.y = y;
        //this.sprite = BitmapFactory.createBitmap("pin.png",this.sprite.x,this.sprite.y);
        _this.sprite.alpha = 0;
        _this.sprite.graphics.drawCircle(_this.sprite.x, _this.sprite.y, Pin.SIZE, "#ffffff", "#FFFF00");
        Laya.stage.addChild(_this.sprite);
        return _this;
        // var img:Laya.Sprite = new Laya.Sprite();
        // //加载显示图片，坐标位于100,50
        // //img.loadImage("D:/_git_project/layaProject/layavoid/laya/assets/comp/bg.jpg",0,0);
        // img.loadImage("../laya/assets/comp/pin.png",0,0);//--这个能加载出来
    }
    //也是需要调用的
    Pin.prototype.update = function () {
        if (this.isRemoving) { //如果正在移除，爆裂效果
            //addParticlesRound(50, this.pos, 5); 
            //Util.addParticlesRound();//效果爆炸--todo
            Particle.addParticlesRound(30, this.pos, 15, 5, 0.8);
            return false;
        } //粒子特效
        if (this.pos.y >= ConstPara.LIMIT_Y) { //暂时目测是越往下数值越大
            //addParticlesRound(300, this.pos, 20, 10); //碰壁（下方），爆炸，游戏结束
            //Util.addParticlesRound();//效果爆炸--todo
            Particle.addParticlesRound(30, this.pos, 5, 10, 0.7);
            //Particle.addParticlesRound(300, this.pos, 20, 10,0.95);
            // for(var k in ConstPara.pins){
            //     var p:Pin = ConstPara.pins[k];
            //     Particle.addParticlesRound(5, this.pos, 5, 10, 0.85);
            // }
            //startGameOver();//游戏结束
            setTimeout(function () {
                if (MgrUI.statusUI != 2) {
                    MgrUI.startEndUI(); //游戏结束 todo
                }
            }, 1000);
            for (var k in ConstPara.pins) {
                var p = ConstPara.pins[k];
                p.isRemoving = true;
            }
            return false;
        }
        if (ConstPara.pinMaxY < this.pos.y)
            ConstPara.pinMaxY = this.pos.y; //确定pinmaxy的值--//根据最低的障碍物位置--是否加速下降
        return true;
    };
    Pin.SIZE = 10; //模型大小
    return Pin;
}(Actor));
//# sourceMappingURL=Pin.js.map