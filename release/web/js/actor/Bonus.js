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
//奖励物体--碰撞后得分
var Bonus = /** @class */ (function (_super) {
    __extends(Bonus, _super);
    function Bonus(y) {
        if (y === void 0) { y = 0; }
        var _this = _super.call(this) || this;
        //this.sprite.angle = Math.PI / 4;//角度？？--应该是无用的
        if (y == 0)
            _this.pos.x = Util.randw(0.1, 0.8);
        else
            _this.pos.x = Util.randw(0.5, 0.2);
        //this.sprite.loadImage("../../laya/assets/comp/bonus.png",0,0);
        _this.pos.y = y - ConstPara.SIZE / 2; //--y==640 ConstPara.SIZE=16
        _this.pos.y = 10;
        _this.sprite.alpha = 0;
        _this.sprite.graphics.drawRect(_this.sprite.x, _this.sprite.y, ConstPara.SIZE, ConstPara.SIZE, "#ff0000");
        //this.sprite = BitmapFactory.createBitmap("bonus.png",this.sprite.x,this.sprite.y); //这个并没有加载出来
        //this.sprite.loadImage("../laya/assets/comp/bonus.png",this.sprite.x,this.sprite.y);
        Laya.stage.addChild(_this.sprite);
        // console.log("bonus的x轴坐标为："+this.sprite.x);
        // console.log("bonus的y轴坐标为："+this.sprite.y);
        // Util.showMsg("hello1111 world",this.sprite.x,0);
        // Util.showMsg("hello2222 world",300,300);
        // this.sprite.x = 300;
        // this.sprite.y = 300;
        // var img:Laya.Sprite = new Laya.Sprite();
        // //加载显示图片，坐标位于100,50
        // //img.loadImage("D:/_git_project/layaProject/layavoid/laya/assets/comp/bg.jpg",0,0);
        // img.loadImage("../laya/assets/comp/bonus.png",0,0);//--这个能加载出来
        // //添加到舞台
        // Laya.stage.addChild(img);
        // this.sprite.x = 50;
        // this.sprite.y = 50;
        for (var k in ConstPara.pins) {
            var p = ConstPara.pins[k];
            //if (p.pos.distance(pos) < SIZE * 3) //计算一下距离，如果距离不太对则修改状态
            if (WYPoint.distance(p.pos, _this.pos) < ConstPara.SIZE * 3)
                p.isRemoving = true;
        }
        return _this;
    }
    //每帧刷新--应该是需要调用
    Bonus.prototype.update = function () {
        if (ConstPara.isFirstBonus && this.pos.y < 100) { //当第一次出现的时候，达到10，则提示这个message
            //todo 消息提示
            //message = addMessage("HIT A TARGET WITH A BALLOON", pos.x, pos.y, 90, PI / 5 * 4);//持续时长90帧
            Util.showMsg("HIT A TARGET WITH A BALLOON", this.pos.x - 100, this.pos.y); //消息提示
            ConstPara.isFirstBonus = false;
        }
        //if (message) message.pos.xy = this.pos;//控制字幕的位置随着奖励物体的位置变化
        //遍历所有的气球
        for (var k in ConstPara.balloons) {
            //if (b.pos.distance(pos) < ConstPara.balloons[k].size / 2 + ConstPara.SIZE / 2) {//炸裂
            if (WYPoint.distance(this.pos, ConstPara.balloons[k].pos) < ConstPara.balloons[k].size / 2 + ConstPara.SIZE / 2) { //计算距离，确定炸裂
                //遍历所有的障碍物--根据障碍物的坐标，在爆裂气球下面的障碍物进行爆炸
                var s = 0;
                for (var k1 in ConstPara.pins) {
                    if (ConstPara.pins[k1].pos.y >= this.pos.y) //坐标计算--移除所有下面的障碍物，也许可能还需要修改
                     {
                        ConstPara.pins[k1].isRemoving = true; //修改为移除状态，利用pin的update进行更新爆炸
                        s++;
                    }
                }
                // var s = ConstPara.balloons[k].size / 16; s = s * s + 1;
                // s = 1;
                var sNew = Math.sqrt(s * s) + 1; //分数计算逻辑--暂时
                ConstPara.numberOfBonus += sNew; //增加对应分数
                ConstPara.rank = Math.floor(ConstPara.numberOfBonus / 30) + 1;
                //addNumberBoard(s, this.pos.x, this.pos.y); //分数增加--在页面提示
                Util.showMsg("score+" + sNew, this.pos.x, this.pos.y); //消息提示--获得了多少分
                //addParticlesRound(30, this.pos, 3, 5, 0.9);//效果炸裂--todo--特效暂时用其他替代
                Particle.addParticlesRound(30, this.pos, 10, 5, 0.5);
                //Util.addParticlesRound();//--todo 需要移除，利用特效类
                ConstPara.bonuses.push(new Bonus); //记录奖励
                return false;
            }
        }
        return true;
    };
    return Bonus;
}(Actor));
//# sourceMappingURL=Bonus.js.map