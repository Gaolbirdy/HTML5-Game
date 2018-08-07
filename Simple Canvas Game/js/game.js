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

addEventListener("keydown", function(e)
{
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e)
{
    delete keysDown[e.keyCode];
}, false);

// 5.新游戏


// 6.更新对象状态


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