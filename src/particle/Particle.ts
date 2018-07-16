class Particle {
    public static rect:Laya.Sprite = new Laya.Sprite;
    public static drawIndex:number;
    public static color:number;
    public pos:Laya.Point;
    public vel:Laya.Point;
    public size:number;
    public attenuation:number;
    
    private red:number;
    public green:number;
    public blue:number;
    
    constructor(p:Laya.Point,vx:number, vy:number, size:number, attenuation:number) {
        this.pos = WYPoint.make(0, 0);
        this.vel = WYPoint.make(0, 0);
        this.pos.x = p.x; this.pos.y = p.y; 
        this.vel.x = vx; this.vel.y = vy;
        this.size = size + 0.9;
        this.attenuation = attenuation;
        this.red = 0;//(float)Math.random();
        this.green = 0;//(float)Math.random();
        this.blue = 1;//(float)Math.random();
    }
    
    public update():boolean{
        this.pos.x += this.vel.x; 
        this.pos.y += this.vel.y;
        this.size *= this.attenuation;
        return Util.isInScreen(this.pos) && this.size >= 1.0;
    }

    public static setDrawIndex(i:number):void {
        this.drawIndex = i;
        var bright = 0xff - i * 0x55;
        this.color = bright * 0x10000 + bright * 0x100 + bright;
    }
    
    public draw():void {
        // var sz:number = this.size * (1.0 + Particle.drawIndex * 0.5);
        // //Particle.rect.graphics.drawRect(3,3,3,3,"");
        // Particle.rect.graphics.drawRect(this.pos.x - sz / 2,this.pos.y - sz / 2,sz,sz,"#ff0000");
        // // Particle.rect.x = this.pos.x - sz / 2; Particle.rect.y = this.pos.y - sz / 2;
        // // Particle.rect.width = Particle.rect.height = sz;
        // Laya.stage.addChild(Particle.rect);
        var sz:number = this.size * (1.0 + Particle.drawIndex * 0.5);
        var sp:Laya.Sprite = new Laya.Sprite;
        //Particle.rect.graphics.drawRect(3,3,3,3,"");
        sp.graphics.drawRect(this.pos.x - sz / 2,this.pos.y - sz / 2,sz,sz,Particle.color);
        // Particle.rect.x = this.pos.x - sz / 2; Particle.rect.y = this.pos.y - sz / 2;
        // Particle.rect.width = Particle.rect.height = sz;
        Laya.stage.addChild(sp);
        setTimeout(function(){
                Laya.stage.removeChild(sp);
        },1000)
        // var sp:Laya.Sprite = new Laya.Sprite;
        // Laya.stage.addChild(sp);
        // //画直线
        // sp.graphics.drawLine(0, 0.7*Laya.stage.height, Laya.stage.width, 0.4*Laya.stage.height, "#ff0000", 3);
        //console.log("真正的绘制特效！！！");
        
        // GL10 gl = Util.getGlInstance();
        // gl.glColor4f(red, green, blue, (float)(.3f + 0.7f * Math.random()));
        //Primitives.drawRect(rect);
//        Primitives.drawCircle(pos.x, pos.y, sz/2, 0, 8, false);
    }
    
    //更新特效粒子
    public static updateParticles():void {
        var i:number;
        for (i = 0; i < ConstPara.particles.length; i++){
        	if (!ConstPara.particles[i].update()) {
        		ConstPara.particles.splice(i,1);
        	}
        }
        	
        for (i = 0; i >= 0; i--) {
            this.setDrawIndex(i);
            for (var k in ConstPara.particles){
                var p:Particle = ConstPara.particles[k]
            	p.draw();
            }
        }
    }
    
    //增加特效
    public static addParticles(n:number, p:Laya.Point, vx:number, vy:number, size:number, attenuation:number,spreading:number):void {
        var bv:number = (Math.abs(vx) + Math.abs(vy)) * spreading;
        for (var i:number = 0; i < n; i++) {
            var a:number = (Math.random() * (Math.PI * 2));
            var v:number = (Math.random() * bv);
            ConstPara.particles.push(new Particle(p, vx + Math.sin(a) * v, vy + Math.cos(a) * v, size * (0.5 + Math.random()), attenuation));
        }
    }
    
    public static addParticlesAngle(n:number, p:Laya.Point, a:number, s:number,size:number, attenuation:number,spreading:number):void{
        this.addParticles(n, p, Math.sin(a) * s, Math.cos(a) * s, size, attenuation, spreading);
    }
    
    public static addParticlesRound(n:number, p:Laya.Point, mv:number, size:number, attenuation:number):void {
        for (var i:number = 0; i < n; i++) {
        	var a:number = (Math.random() * (Math.PI * 2));
        	var v:number = Math.random() * mv;
        	 ConstPara.particles.push(new Particle(p, Math.sin(a) * v, Math.cos(a) * v, size * (0.5 + Math.random()), attenuation));
        }
    }
    
    public static scrollParticles(vx:number, vy:number):void {
        for (var k in ConstPara.particles) {
            var p:Particle = ConstPara.particles[k];
            p.pos.x += vx; p.pos.y -= vy;
        }
    }
}
