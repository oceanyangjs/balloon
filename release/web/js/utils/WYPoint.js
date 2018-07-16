var WYPoint = /** @class */ (function () {
    function WYPoint() {
    }
    WYPoint.mul = function (p, s) {
        return new Laya.Point(p.x * s, p.y * s);
    };
    WYPoint.distance = function (a, b) {
        return a.distance(b.x, b.y);
        //return a.subtract(b).length;
    };
    WYPoint.lengthDis = function (a) {
        //return a.length;
        return a.distance(0, 0);
    };
    WYPoint.make = function (x, y) {
        return new Laya.Point(x, y);
    };
    return WYPoint;
}());
//# sourceMappingURL=WYPoint.js.map