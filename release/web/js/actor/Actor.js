//模型基类
var Actor = /** @class */ (function () {
    function Actor() {
        this.sprite = new Laya.Sprite;
        this.pos = new Laya.Point;
    }
    Actor.prototype.initialize = function () {
    };
    Actor.prototype.update = function () {
        return true;
    };
    Actor.prototype.removeSprite = function () {
        //Laya.stage.parent.removeChild(this.sprite);
        Laya.stage.removeChild(this.sprite);
    };
    return Actor;
}());
new Actor();
//# sourceMappingURL=Actor.js.map