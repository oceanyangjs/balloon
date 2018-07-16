var Particle = /** @class */ (function () {
    function Particle(p, vx, vy, size, attenuation) {
        this.pos = WYPoint.make(0, 0);
        this.vel = WYPoint.make(0, 0);
        this.pos.x = p.x;
        this.pos.y = p.y;
        this.vel.x = vx;
        this.vel.y = vy;
        this.size = size + 0.9;
        this.attenuation = attenuation;
        this.red = 0; //(float)Math.random();
        this.green = 0; //(float)Math.random();
        this.blue = 1; //(float)Math.random();
    }
    Particle.prototype.update = function () {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.size *= this.attenuation;
        return Util.isInScreen(this.pos) && this.size >= 1.0;
    };
    Particle.setDrawIndex = function (i) {
        this.drawIndex = i;
        var bright = 0xff - i * 0x55;
        this.color = bright * 0x10000 + bright * 0x100 + bright;
    };
    Particle.prototype.draw = function () {
        // var sz:number = this.size * (1.0 + Particle.drawIndex * 0.5);
        // //Particle.rect.graphics.drawRect(3,3,3,3,"");
        // Particle.rect.graphics.drawRect(this.pos.x - sz / 2,this.pos.y - sz / 2,sz,sz,"#ff0000");
        // // Particle.rect.x = this.pos.x - sz / 2; Particle.rect.y = this.pos.y - sz / 2;
        // // Particle.rect.width = Particle.rect.height = sz;
        // Laya.stage.addChild(Particle.rect);
        var sz = this.size * (1.0 + Particle.drawIndex * 0.5);
        var sp = new Laya.Sprite;
        //Particle.rect.graphics.drawRect(3,3,3,3,"");
        sp.graphics.drawRect(this.pos.x - sz / 2, this.pos.y - sz / 2, sz, sz, Particle.color);
        // Particle.rect.x = this.pos.x - sz / 2; Particle.rect.y = this.pos.y - sz / 2;
        // Particle.rect.width = Particle.rect.height = sz;
        Laya.stage.addChild(sp);
        setTimeout(function () {
            Laya.stage.removeChild(sp);
        }, 1000);
        // var sp:Laya.Sprite = new Laya.Sprite;
        // Laya.stage.addChild(sp);
        // //画直线
        // sp.graphics.drawLine(0, 0.7*Laya.stage.height, Laya.stage.width, 0.4*Laya.stage.height, "#ff0000", 3);
        //console.log("真正的绘制特效！！！");
        // GL10 gl = Util.getGlInstance();
        // gl.glColor4f(red, green, blue, (float)(.3f + 0.7f * Math.random()));
        //Primitives.drawRect(rect);
        //        Primitives.drawCircle(pos.x, pos.y, sz/2, 0, 8, false);
    };
    //更新特效粒子
    Particle.updateParticles = function () {
        var i;
        for (i = 0; i < ConstPara.particles.length; i++) {
            if (!ConstPara.particles[i].update()) {
                ConstPara.particles.splice(i, 1);
            }
        }
        for (i = 0; i >= 0; i--) {
            this.setDrawIndex(i);
            for (var k in ConstPara.particles) {
                var p = ConstPara.particles[k];
                p.draw();
            }
        }
    };
    //增加特效
    Particle.addParticles = function (n, p, vx, vy, size, attenuation, spreading) {
        var bv = (Math.abs(vx) + Math.abs(vy)) * spreading;
        for (var i = 0; i < n; i++) {
            var a = (Math.random() * (Math.PI * 2));
            var v = (Math.random() * bv);
            ConstPara.particles.push(new Particle(p, vx + Math.sin(a) * v, vy + Math.cos(a) * v, size * (0.5 + Math.random()), attenuation));
        }
    };
    Particle.addParticlesAngle = function (n, p, a, s, size, attenuation, spreading) {
        this.addParticles(n, p, Math.sin(a) * s, Math.cos(a) * s, size, attenuation, spreading);
    };
    Particle.addParticlesRound = function (n, p, mv, size, attenuation) {
        for (var i = 0; i < n; i++) {
            var a = (Math.random() * (Math.PI * 2));
            var v = Math.random() * mv;
            ConstPara.particles.push(new Particle(p, Math.sin(a) * v, Math.cos(a) * v, size * (0.5 + Math.random()), attenuation));
        }
    };
    Particle.scrollParticles = function (vx, vy) {
        for (var k in ConstPara.particles) {
            var p = ConstPara.particles[k];
            p.pos.x += vx;
            p.pos.y -= vy;
        }
    };
    Particle.rect = new Laya.Sprite;
    return Particle;
}());
//# sourceMappingURL=Particle.js.map