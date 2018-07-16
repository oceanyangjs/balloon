var BitmapFactory = /** @class */ (function () {
    function BitmapFactory() {
    }
    BitmapFactory.createBitmap = function (name, x, y) {
        var result = new Laya.Sprite;
        result.loadImage("../laya/assets/comp/" + name, x, y);
        // var texture: Laya.Texture = RES.getRes(name);
        // result. = texture;
        return result;
    };
    return BitmapFactory;
}());
//# sourceMappingURL=BitmapFactory.js.map