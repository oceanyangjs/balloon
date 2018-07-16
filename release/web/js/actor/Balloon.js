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
//点击膨胀的气球类
//逻辑在这里
var Balloon = /** @class */ (function (_super) {
    __extends(Balloon, _super);
    function Balloon(p) {
        var _this = _super.call(this) || this;
        _this.isBlowingUp = true; //是否是膨胀状态
        _this.vel = new Laya.Point; //这个代表什么呢--似乎是最下面的点--代表方向向量--目前当做向量坐标--更新：此为方向的向量坐标
        _this.MOST_LARGE_SIZE = 20 * 6; //最大大小
        _this.pos = p;
        _this.size = Balloon.BASE_SIZE / 2;
        // this.sprite.pivotX = this.sprite.x;
        // this.sprite.pivotY = this.sprite.y;
        //this.sprite = BitmapFactory.createBitmap("balloon.png",this.sprite.x,this.sprite.y);
        _this.sprite.graphics.drawCircle(_this.sprite.x, _this.sprite.y, Pin.SIZE, "#00FF7F");
        _this.sprite.alpha = 0.5;
        // this.sprite.x = p.x;
        // this.sprite.y = p.y;
        Laya.stage.addChild(_this.sprite);
        return _this;
        // var img:Laya.Sprite = new Laya.Sprite();
        // //加载显示图片，坐标位于100,50
        // //img.loadImage("D:/_git_project/layaProject/layavoid/laya/assets/comp/bg.jpg",0,0);
        // img.loadImage("../laya/assets/comp/balloon.png",p.x,p.y);//--这个能加载出来
        // Laya.stage.addChild(img);
    }
    Balloon.prototype.update = function () {
        //首先判断状态，是膨胀状态还是其他状态
        if (this.isBlowingUp) {
            //control the largest size of the balloon
            if (this.size++ > this.MOST_LARGE_SIZE) {
                this.destroy(); //碎裂
                return false;
            }
            this.sprite.scaleX = this.sprite.scaleY = this.size / Balloon.BASE_SIZE; //确定气球和标准球的比例
            this.pos = ConstPara.mouse; //气球中心位置，既鼠标位置
            //			vel.y += 1f;
            this.vel.y = 0; //todo--似乎是变化量--//初始的数据设置
            if (!ConstPara.isMousePressed || this.pos.y < ConstPara.LIMIT_Y) { //松开鼠标或者按住鼠标离开释放区域
                this.isBlowingUp = false;
                this.sprite.alpha = 1;
            }
        }
        else {
            this.vel.y -= 0.1; //非膨胀状态，每帧改变0.1
        }
        var px = this.pos.x, py = this.pos.y; //首先存储位置
        //var vel_value = this.vel.length;
        var vel_value = WYPoint.lengthDis(this.vel); //todo 计算距离
        //var vel_value = this.pos.distance(this.vel.x,this.vel.y);//todo -- 似乎是计算距离
        if (vel_value > 20) {
            this.vel = WYPoint.mul(this.vel, 20 / vel_value); //变为标准圆形尺寸--20是基础大小
        }
        //this.pos = this.pos.add(this.vel);//中心位置变化
        //目前还有待商榷
        //与碰撞钉子改变角度的先后关系怎么处理
        if (!this.isBlowingUp) {
            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;
        }
        //已经存在的障碍物的处理
        for (var k in ConstPara.pins) { //遍历一下那些障碍物
            var p = ConstPara.pins[k];
            var distance = WYPoint.distance(p.pos, this.pos); //计算障碍物与气球的距离
            var vel_len = WYPoint.lengthDis(this.vel);
            if (distance < this.size / 2 + Pin.SIZE / 2) {
                if (this.isBlowingUp) { //膨胀状态遇到钉子爆炸
                    this.destroy();
                    return false;
                }
                //非膨胀状态遇到钉子
                this.vel.x += vel_len * (this.pos.x - p.pos.x)
                    / distance;
                this.vel.y -= vel_len * (p.pos.y - this.pos.y)
                    / distance;
                // this.vel.x = 3;
                // this.vel.y = 3;
                this.pos.x = px;
                this.pos.y = py;
            }
        }
        //所有气球的处理
        //for (Actor b : ConstPara.balloons) {//遍历一下气球
        for (var k in ConstPara.balloons) { //遍历一下气球
            var b = ConstPara.balloons[k];
            //if (b == this || ((Balloon)b).isBlowingUp){
            if (b == this || b.isBlowingUp) {
                continue;
            }
            var distance = WYPoint.distance(b.pos, this.pos);
            var vel_len = WYPoint.lengthDis(this.vel);
            if (distance < this.size / 2 + b.size / 2) {
                if (this.isBlowingUp) {
                    this.destroy();
                    return false;
                }
                this.vel.x += vel_len * (this.pos.x - b.pos.x)
                    / distance;
                this.vel.y -= vel_len * (b.pos.y - this.pos.y)
                    / distance;
                this.pos.x = px;
                this.pos.y = py;
            }
        }
        //碰撞爆炸处理
        if (this.pos.x < this.size / 2 || this.pos.x > ConstPara.SCREEN_WIDTH - this.size / 2) { //左右侧触壁
            if (this.isBlowingUp) {
                this.destroy();
                return false;
            }
            if ((this.pos.x < this.size / 2 && this.vel.x < 0)
                || (this.pos.x > ConstPara.SCREEN_WIDTH - this.size / 2 && this.vel.x > 0)) { //不是膨胀过程中碰壁
                this.vel.x *= -0.2;
                this.pos.x = px;
                this.pos.y = py;
            }
        }
        //气球体积缩小
        if (!this.isBlowingUp) {
            this.size -= 0.1; //每帧缩小0.03
        }
        var scaleNum = this.size / Balloon.BASE_SIZE; //图片缩放
        this.sprite.scaleX = scaleNum;
        this.sprite.scaleY = scaleNum;
        //this.sprite.setScale(this.size / Balloon.BASE_SIZE);
        { //for interest
            //size = 10f;
            //Particle.addParticlesAngle(5, pos, (float)(Math.random() * (Math.PI * 2)), size / 10 , 15f, 0.65f, 0.45f);
        }
        return this.size > 8 && this.pos.y < ConstPara.SCREEN_HEIGHT + 2 * this.size;
    };
    Balloon.prototype.destroy = function () {
        for (var i = 0; i < 16; i++) {
            var a = (Math.random() * (Math.PI * 2));
            //Util.addParticlesRound();
            Particle.addParticlesAngle(10, this.pos, a, this.size / 10, 5, 0.75, 0.4); //粒子爆炸---气球爆炸效果
        }
    };
    Balloon.BASE_SIZE = 20; //基础大小
    return Balloon;
}(Actor));
//# sourceMappingURL=Balloon.js.map