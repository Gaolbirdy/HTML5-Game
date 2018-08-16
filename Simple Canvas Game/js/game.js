// 1.创建画布
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// 2.加载背景图
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function()
{
    bgReady = true; // 此时还没执行；在页面完成加载后才为true，在后面脚本中输出也仍为原值false
    console.log(bgReady);
    
    // 因为onload在页面完成加载后才会被调用，所以这里用write会导致刷新页面
    // document.write(bgReady);

    // if(bgReady)
    //     ctx.drawImage(bgImage, 0, 0);
};
bgImage.src = "images/background.png";

// hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function()
{
    heroReady = true;
    // if(heroReady)
    //     ctx.drawImage(heroImage, 100, 50);
}
heroImage.src = "images/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function()
{
    monsterReady = true;
    // if(monsterReady)
    //     ctx.drawImage(monsterImage, 200, 100);
}
monsterImage.src = "images/monster.png";


// 3.游戏对象
var hero = {
    speed: 256,    // movement in pixels per second
    x: 0,
    y: 0
};

var monster = {
    // speed: 0,
    x: 0,
    y: 0,
};

var monsterCaught = 0;

// 4.玩家输入
// 键盘控制操作码(key control handle)
// 用 KeyDown 缓存按键序列
var keysDown = {};

function keydownFunction(e)
{
    keysDown[e.keyCode] = true;
    // console.log("keydown " + e.key + " " + e.keyCode);    
    // console.log(e.keyCode + ": " + keysDown[e.keyCode]);
}

function keyupFunction(e)
{
    delete keysDown[e.keyCode];
    // console.log("keyup " + e.key + " " + e.keyCode);    
    // console.log(e.keyCode + ": " + keysDown[e.keyCode]);
}

// 没有通过对象调用；通过下面的remove调试得知，即是window对象直接调用addEventListener
addEventListener("keydown", keydownFunction, false);

addEventListener("keyup", keyupFunction, false);

// window.removeEventListener("keydown", keydownFunction);
// removeEventListener("keydown", keydownFunction);

// document.removeEventListener("keyup", keyupFunction);
// removeEventListener("keyup", keyupFunction);

// 5.新游戏
// 当玩家抓住怪物时重置游戏中的某些状态
var reset = function()
{
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    // 将怪物随机放在屏幕上的某个位置
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// 6.更新对象状态
var update = function(modifier) 
{
    // 键盘
    if(38 in keysDown)  // Player holding up
    {
        hero.y -= hero.speed * modifier;    // speed, 预期每秒移动像素数；modifier = 一次update耗时 / 1000ms;
    }
    if(40 in keysDown)  // Player holding down
    {
        hero.y += hero.speed * modifier;
    }
    if(37 in keysDown)  // Player holding left
    {
        hero.x -= hero.speed * modifier;
    }
    if(39 in keysDown)  // Player holding right
    {
        hero.x += hero.speed * modifier;
    }

    // 怪物和英雄是否相遇?
    // 根据怪物图片和英雄图片位置的距离来判断
    // 碰撞条件 水平重叠 且 垂直重叠
    // （认为图片的左上角的点是该单位的坐标x, y）

    // 水平相交的情况：
    // hero从monster右侧重叠
    // hero.x <= monster.x + monster.width   (monster图片的宽度)
    // hero从monster左侧重叠
    // monster.x <= hero.x + hero.width (hero图片的宽度)

    // 垂直相交的情况：
    // hero从monster下侧重叠
    // hero.y <= monster.y + monster.height   (monster图片的高度)
    // hero从monster上侧重叠
    // monster.y <= hero.y + hero.height(hero图片的宽度)
    if(
        hero.x <= (monster.x + 32)
        && monster.x <= (hero.x + 32)
        && hero.y <= (monster.y + 32)
        && monster.y <= (hero.y + 32)
    )
    {
        ++monsterCaught;
        reset();
    }
};

// 7.渲染对象
// 绘制所有东西
var render = function()
{
    if(bgReady)
        ctx.drawImage(bgImage, 0, 0);

    if(heroReady)
        ctx.drawImage(heroImage, hero.x, hero.y);

    if(monsterReady)
        ctx.drawImage(monsterImage, monster.x, monster.y);

    // Score
    ctx.fillStyle = "rgb(50, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Monsterrs caught: " + monsterCaught, 32, 32);
};

// 8.游戏主循环
var main = function()
{
    var now = Date.now();
    var delta = now - then;
    // console.log(delta);

    update(delta / 1000);
    render();

    then = now;

    // 再次调用主循环
    requestAnimationFrame(main);
};

// 9.游戏主循环的注解
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequstAnimationFrame;

// 10.开始游戏
var then = Date.now();
reset();
main();
// setInterval("main()", 1000/60);



// 测试
// myTest();

function myTest()
{
    testCreateCanvas();    
    testGameObject();
    testDocument();
    testImageReady();
}

function testCreateCanvas()
{
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    document.write("画布边缘" + "<br>");
    document.write(canvas + "<br>");
    document.write(ctx + "<br>");
}

function testGameObject()
{
    document.write(hero + "<br>");
    document.write(monster + "<br>");
}

// 测试document对象和window对象的关系
function testDocument()
{
    document.writeln(document);
    document.writeln(window.document);
    document.writeln(window.document == document);
    document.writeln(window.document === document);
    document.write("<br>");
}

function testImageReady()
{
    document.write(bgReady + "<br>");
    document.write(bgImage.src + "<br>");
    document.write(bgImage.complete + "<br>");
}