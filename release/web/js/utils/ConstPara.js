/**
 * 静态数据类
 * @author
 *
 */
var ConstPara = /** @class */ (function () {
    function ConstPara() {
    }
    ConstPara.isMousePressed = false;
    ConstPara.isMouseClicked = false;
    ConstPara.LIMIT_Y = 0.7 * ConstPara.SCREEN_HEIGHT;
    ConstPara.LOW_V_AREA = 0.2 * ConstPara.SCREEN_HEIGHT; //加速点
    ConstPara.balloons = []; //一堆气球
    ConstPara.pins = []; //一堆钉子
    ConstPara.bonuses = []; //一堆奖励
    ConstPara.particles = []; //一堆特效
    ConstPara.pinMaxY = 0; //障碍物里面的最大y值
    ConstPara.SIZE = 16; //奖励物体的大小
    ConstPara.isFirstBonus = true; //是否是第一次奖励
    ConstPara.numberOfBonus = 0; //积分
    ConstPara.isGameOver = false; //是否游戏结束
    ConstPara.rank = 1;
    return ConstPara;
}());
//# sourceMappingURL=ConstPara.js.map