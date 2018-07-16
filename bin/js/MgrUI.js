//游戏UI管理类
//用来操作游戏UI
var MgrUI = /** @class */ (function () {
    function MgrUI() {
    }
    //初始化欢迎页面
    MgrUI.startWelcomeUI = function () {
        MgrUI.statusUI = 0; //欢迎UI
        Laya.stage.removeChildren(); //移除了所有的ui
        MgrUI.welcomeUI.InitUI();
    };
    //初始化游戏页面
    MgrUI.startGameUI = function () {
        MgrUI.statusUI = 1; //游戏UI
        //Laya.stage.removeChild(MgrUI.welcomeUI);
        //Laya.stage.removeSelf();
        //Laya.stage.removeChild(this.gameTitle);//可以移除
        Laya.stage.removeChildren(); //移除了所有的ui
        MgrUI.resetStaticData();
        MgrUI.gameUI.InitUI();
        //setTimeout(MgrUI.addEventListenings(),5000);
        MgrUI.addEventListenings();
    };
    //初始化静态数据
    MgrUI.initStaticData = function () {
        ConstPara.SCREEN_WIDTH = Laya.stage.width;
        ConstPara.SCREEN_HEIGHT = Laya.stage.height;
        ConstPara.LIMIT_Y = Laya.stage.height * 0.7;
        ConstPara.LOW_V_AREA = Laya.stage.height * 0.2;
        ConstPara.BASE_LINE_L = WYPoint.make(0, ConstPara.LIMIT_Y);
        ConstPara.BASE_LINE_R = WYPoint.make(ConstPara.SCREEN_WIDTH, ConstPara.LIMIT_Y);
    };
    //重置静态数据
    MgrUI.resetStaticData = function () {
        //数据清空
        ConstPara.balloons = [];
        ConstPara.pins = [];
        ConstPara.bonuses = [];
        ConstPara.particles = [];
        ConstPara.numberOfBonus = 0;
        ConstPara.rank = 1;
        ConstPara.bonuses.push(new Bonus(ConstPara.SCREEN_HEIGHT * 1.6));
    };
    MgrUI.startEndUI = function () {
        //Laya.stage.removeChild(MgrUI.welcomeUI);
        //Laya.stage.removeSelf();
        //Laya.stage.removeChild(this.gameTitle);//可以移除
        Laya.stage.removeChildren(); //移除了所有的ui
        MgrUI.removeEventListenings(); //移除监听
        if (MgrUI.statusUI != 2) {
            MgrUI.endUI.InitUI();
            MgrUI.statusUI = 2; //游戏结束UI
        }
    };
    //注册监听事件
    MgrUI.addEventListenings = function () {
        Laya.timer.frameLoop(1, this, MgrUI.UpdateFrames); //每帧执行一次
        // setInterval(MgrUI.UpdateFrames,Laya.timer.frameLoop)
        // addEventListener(Laya.Event.DISPLAY,MgrUI.UpdateFrames)
        //touch事件监听
        document.addEventListener('touchstart', MgrUI.touchesBegan); //按下鼠标，生成一个气球，并且气球开始膨胀
        document.addEventListener('touchend', MgrUI.touchesEnded); //松开鼠标，生成的气球开始释放上升
        document.addEventListener('touchmove', MgrUI.touchesMoved); //鼠标移动，生成的气球位置随之移动
        //鼠标事件监听
        addEventListener(Laya.Event.MOUSE_DOWN, MgrUI.touchesBegan);
        addEventListener(Laya.Event.MOUSE_UP, MgrUI.touchesEnded); //松开鼠标，生成的气球开始释放上升
        addEventListener(Laya.Event.MOUSE_MOVE, MgrUI.touchesMoved); //鼠标移动，生成的气球位置随之移动
    };
    //移除监听事件
    MgrUI.removeEventListenings = function () {
        //Laya.timer.frameLoop(1,this,MgrUI.UpdateFrames);//每帧执行一次
        Laya.timer.clear(this, MgrUI.UpdateFrames); //移除监听事件
        // setInterval(MgrUI.UpdateFrames,Laya.timer.frameLoop)
        // addEventListener(Laya.Event.DISPLAY,MgrUI.UpdateFrames)
        document.removeEventListener('touchstart', MgrUI.touchesBegan); //按下鼠标，生成一个气球，并且气球开始膨胀
        document.removeEventListener('touchend', MgrUI.touchesEnded); //松开鼠标，生成的气球开始释放上升
        document.removeEventListener('touchmove', MgrUI.touchesMoved); //鼠标移动，生成的气球位置随之移动
        removeEventListener(Laya.Event.MOUSE_DOWN, MgrUI.touchesBegan); //按下鼠标，生成一个气球，并且气球开始膨胀
        removeEventListener(Laya.Event.MOUSE_UP, MgrUI.touchesEnded); //松开鼠标，生成的气球开始释放上升
        removeEventListener(Laya.Event.MOUSE_MOVE, MgrUI.touchesMoved); //鼠标移动，生成的气球位置随之移动
    };
    //开始点击
    MgrUI.touchesBegan = function (e) {
        //console.log("监听鼠标按下"); 
        var touchLocation = WYPoint.make(Laya.stage.mouseX, Laya.stage.mouseY); //生成鼠标点
        ConstPara.mouse = touchLocation;
        ConstPara.isMouseClicked = true;
        ConstPara.isMousePressed = true;
        if (ConstPara.isMouseClicked && ConstPara.mouse.y > ConstPara.LIMIT_Y) { //点击再范围内，生成气球
            ConstPara.balloons.push(new Balloon(ConstPara.mouse));
            ConstPara.isMouseClicked = false;
        }
    };
    //移除点击
    MgrUI.touchesEnded = function (e) {
        //console.log("监听鼠标抬起"); 
        ConstPara.isMousePressed = false;
    };
    MgrUI.touchesMoved = function (e) {
        if (ConstPara.isMousePressed) {
            //console.log("监听鼠标移动"); 
            var touchLocation = WYPoint.make(Laya.stage.mouseX, Laya.stage.mouseY);
            ConstPara.mouse = touchLocation;
        }
    };
    //注册全部update事件
    MgrUI.UpdateFrames = function () {
        MgrUI.updateScore(); //分数设置
        MgrUI.updateActors(ConstPara.balloons);
        //ConstPara.pinMaxY = ConstPara.SCREEN_HEIGHT;
        MgrUI.updateActors(ConstPara.bonuses);
        MgrUI.updateActors(ConstPara.pins);
        Particle.updateParticles();
        //MgrUI.updateBonus();//更新分数显示
        // Particle.updateParticles();//--处理特效
        //console.log("到此，应该已经转化为第二个UI画面");
        if (!ConstPara.isGameOver) {
            var dlt = ConstPara.pinMaxY - ConstPara.LOW_V_AREA;
            //快速下降
            if (dlt < 0) {
                MgrUI.scrollData(ConstPara.rank * 2); //小于三分之一时进行一个加速？--如果没到加速点
            }
            else {
                //正常下降
                MgrUI.scrollData(ConstPara.rank * 0.5); //此处todo 根据实际得分修改下降速度，增加难度
            }
        }
    };
    MgrUI.scrollData = function (y) {
        //y = 0.15;
        // for (var k1 in ConstPara.balloons) {
        //     var b:Balloon = ConstPara.balloons[k1];
        // 	b.pos.y += y;
        // }
        for (var k2 in ConstPara.pins) {
            var p = ConstPara.pins[k2];
            p.pos.y += y;
        }
        for (var k3 in ConstPara.bonuses) {
            var b1 = ConstPara.bonuses[k3];
            b1.pos.y += y;
        }
        // Particle.scrollParticles(0, y);
        this.nextPinDist -= y; //决定新障碍物的位置
        while (this.nextPinDist < 0) {
            // ConstPara.pins.push(new Pin(ConstPara.SCREEN_HEIGHT
            // 		+ this.nextPinDist));
            //测试碰撞用吗，限制数目
            // if(ConstPara.pins.length < 2){
            //     ConstPara.pins.push(new Pin(this.nextPinDist));
            // }
            if (MgrUI.statusUI != 2) {
                ConstPara.pins.push(new Pin(this.nextPinDist));
                //			ConstPara.pins.add(new Pin(ConstPara.SCREEN_HEIGHT
                //					- Math.abs(nextPinDist), ScriptLayer.this));
                //console.log("障碍物数目" + ConstPara.pins.length);
                this.nextPinDist += Util.randh(0.025, 0.025);
            }
        }
    };
    // //更新分数面板
    // public static updateBonus(){
    // }
    //显示分数
    MgrUI.getNumOfBonus = function () {
        var txt = new Laya.Text;
        txt.text = ConstPara.numberOfBonus.toString();
        //txt.text = "aaaaa";
        txt.x = 550;
        txt.y = 80;
        txt.fontSize = 20; //字体大小
        txt.color = "#ff0000"; //--字体颜色
        Laya.stage.addChild(txt);
        this.scoreText = txt;
    };
    MgrUI.updateScore = function () {
        //console.log(0);
        this.scoreText.text = ConstPara.numberOfBonus.toString();
    };
    //更新每个actor
    MgrUI.updateActors = function (actors) {
        var actors_size = actors.length; //计算数组长度
        var actor;
        for (var i = actors_size - 1; i > -1; i--) {
            actor = actors[i];
            if (actor.update()) {
                if (actor.sprite != null) {
                    actor.sprite.x = actor.pos.x;
                    actor.sprite.y = actor.pos.y;
                    actor.sprite.alpha = 1; //统一显示出来防止闪烁的影子
                }
            }
            else {
                // if(actor instanceof Balloon){
                //     var bl:Balloon = actor;
                // 	//bl.layer.removeChild(bl.emitter, false);
                //     Laya.stage.removeChild(bl.sprite);
                // }
                // if(Balloon.isInstance(actor)){
                // 	Balloon bl = (Balloon)actor;
                // 	bl.layer.removeChild(bl.emitter, false);
                // }
                if (actor.sprite != null) {
                    actor.removeSprite();
                }
                actors.splice(i, 1); //暂时注释 todo
            }
        }
    };
    //初始化UI
    MgrUI.welcomeUI = new WelcomeUI; //开始游戏页面UI
    MgrUI.gameUI = new GameUI; //游戏页面
    MgrUI.endUI = new EndUI; //游戏完成页面
    MgrUI.statusUI = -1; //用来标志着当前是哪个UI页面：初始值定位-1,0代表欢迎页面，1代表游戏页面
    MgrUI.nextPinDist = 0;
    MgrUI.scoreText = new Laya.Text; //分数
    return MgrUI;
}());
new MgrUI();
//# sourceMappingURL=MgrUI.js.map