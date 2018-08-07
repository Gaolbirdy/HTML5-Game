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
    bgReady = true;
}
bgImage.src = "images/background.png";

// 3.游戏对象
var hero = {
    speed : 256,    // movement in pixels per second
    x : 0,
    y : 0
}

var monster = {
    speed : 0,
    x : 0,
    y : 0
}

var monsterCaught = 0;

// 4.玩家输入
// 键盘控制操作码(key control handle)
// 用 KeyDown 缓存按键序列
var keysDown = {};

// 没有通过对象，而是直接调用？
addEventListener("keydown", function(e)
{
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e)
{
    delete keysDown[e.keyCode];
}, false);

// 5.新游戏
// 当玩家抓住怪物时重置游戏中的某些状态
var reset = function()
{
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    // 将怪物随机放在屏幕上的某个位置
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.x = 32 + (Math.random() * (canvas.height - 64));
};

// 6.更新对象状态
var update = function(modifier)
{
    // 键盘
    if(38 in keysDown)  // Player holding up
    {
        hero.y -= hero.speed + modifier;
    }
    if(40 in keysDown)  // Player holding down
    {
        hero.y += hero.speed + modifier;
    }
    if(37 in keysDown)  // Player holding left
    {
        hero.y -= hero.speed + modifier;
    }
    if(39 in keysDown)  // Player holding right
    {
        hero.y += hero.speed + modifier;
    }

    // 怪物和英雄是否相遇?
    // 根据怪物图片和英雄图片位置的距离来判断
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


// 8.游戏主循环


// 9.游戏主循环的注解


// 10.开始游戏



// 测试
myTest();

function myTest()
{
    testCreateCanvas();
    testImageReady();
    testGameObject();
}

function testCreateCanvas()
{
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    document.write("画布边缘" + "<br>");
    document.write(canvas + "<br>");
    document.write(ctx + "<br>");
}

function testImageReady()
{
    document.write(bgReady + "<br>");
}

function testGameObject()
{
    document.write(hero + "<br>");
    document.write(monster + "<br>");
}