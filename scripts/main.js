var img = new Image();
var raf;
var running = false;
var canvas = document.getElementById('canvas');
var rectAx = 0, rectAy = 0, rectBy, rectBx;
var rectWact = 35;
var rectW = 35, rectH ;
var dist = Math.floor(Math.random() * (190 - 100 + 1)) + 100;
rectBx = -1 * dist;
rectAH = Math.floor(Math.random() * (500 - 300 + 1)) + 300;
rectBH = Math.floor(Math.random() * (500 - 300 + 1)) + 300;
rectBy = canvas.height-rectBH;
var ball = {
  x: canvas.width - 50,
  y: canvas.height / 2,
  vx: 5,
  vy: 1,
  radius: 12,
  color: 'rgb(229, 231, 233)',
  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
};

var dispScore = document.getElementById("demo");
var score = 0;
var isOver = false;
// User Variables - customize these to change the image being scrolled, its
// direction, and the speed.

img.src = 'images/back.jpg';
var CanvasXSize = canvas.width;
var CanvasYSize = canvas.height;
var speed = 30; // lower is faster
var scale = 1.05;
var y = -4.5; // vertical offset

// Main program

var dx = 3;
var imgW;
var imgH;
var x = 0;
var clearX;
var clearY;
var ctx;

img.onload = function() {
    imgW = img.width * scale;
    imgH = img.height * scale;
    
    if (imgW > CanvasXSize) {
        // image larger than canvas
        x = CanvasXSize - imgW;
    }
    if (imgW > CanvasXSize) {
        // image width larger than canvas
        clearX = imgW;
    } else {
        clearX = CanvasXSize;
    }
    if (imgH > CanvasYSize) {
        // image height larger than canvas
        clearY = imgH;
    } else {
        clearY = CanvasYSize;
    }
    
    // get canvas context
    ctx = document.getElementById('canvas').getContext('2d');
 
    // set refresh rate
    
    draw();
}

function draw() {

    var rr = document.getElementById("cl");
    cl.textContent = rectAH + " " + rectBH + " " + dist + " " + rectAx + " " + rectBx;
    ctx.clearRect(0, 0, clearX, clearY); // clear the canvas
    
    // if image is <= Canvas Size
    if (imgW <= CanvasXSize) {
        // reset, start from beginning
        if (x > CanvasXSize) {
            x = -imgW + x;
        }
        // draw additional image1
        if (x > 0) {
            ctx.drawImage(img, -imgW + x, y, imgW, imgH);
        }
        // draw additional image2
        if (x - imgW > 0) {
            ctx.drawImage(img, -imgW * 2 + x, y, imgW, imgH);
        }
    }

    // image is > Canvas Size
    else {
        // reset, start from beginning
        if (x > (CanvasXSize)) {
            x = CanvasXSize - imgW;
        }
        // draw aditional image
        if (x > (CanvasXSize-imgW)) {
            ctx.drawImage(img, x - imgW + 1, y, imgW, imgH);
        }
    }
    // draw image
    ctx.drawImage(img, x, y,imgW, imgH);
    // amount to move
    x += dx;

    ctx.fillStyle = 'rgb(174, 214, 241)'; 
    if(rectAx + rectW < canvas.width)
        ctx.fillRect(rectAx, rectAy, rectW, rectAH);
    if(rectBx + rectW < canvas.width)
        ctx.fillRect(rectBx, rectBy, rectW, rectBH);
    if(rectAx>canvas.width)
        {
            rectAx = 0;
            rectAH = Math.floor(Math.random() * (500 - 300 + 1)) + 300;
        }
    if(rectBx>canvas.width)
        {
            
            rectBH = Math.floor(Math.random() * (500 - 300 + 1)) + 300;
            dist = Math.floor(Math.random() * (190 - 100 + 1)) + 100;
            rectBx = -1 * dist + rectAx;
            rectBy = canvas.height-rectBH;
        }
     
    rectAx += dx;
    rectBx += dx;
    ball.draw();
    score += dx;
    dispScore.textContent = score;
    dx += 0.001119;   

    raf = window.requestAnimationFrame(draw);
    checkCollision();
    
}

canvas.addEventListener('mousemove', function(e) {
  if (!running && !isOver) 
    {
    clear();
    ball.x = e.clientX;
    ball.y = e.clientY;
    ball.draw();
    }
});

canvas.addEventListener('click', function(e) {
  if (isOver) 
    {
    var x1 = e.clientX;
    var y1 = e.clientY;
    var t = false;
    ctx.beginPath()
    ctx.rect(canvas.width / 2 - 50, canvas.height / 2 + 90, 100, 30)
    if(ctx.isPointInPath(x1,y1))
        t = true;
    ctx.closePath();
    if(t)
        resetScreen();
    }
});

canvas.addEventListener('mouseout', function(e) {
  running = false;
});

function clear() {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
}

function checkCollision() 
{
    var t1 = false;
    var t2 = false;
    var t0 = false;


    
    ctx.beginPath();
    ctx.rect(rectAx - ball.radius, 0, rectW + ball.radius, rectAH);
    t1 = ctx.isPointInPath(ball.x, ball.y)
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(rectBx - ball.radius, rectBy, rectW + ball.radius, rectBH);
    t2 = ctx.isPointInPath(ball.x, ball.y)
    ctx.closePath();

    var check = document.getElementById("coord");
    check.textContent = t1 + " " + t2;
    if(t1 || t2)
    {
        window.cancelAnimationFrame(raf);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        isOver = true;
        ctx.fillStyle = 'rgba(27, 79, 114, 1)';
        ctx.font = '85px serif';
        var txtmetrics = ctx.measureText('Game Over');
        var ds = "Your Score is " + Math.floor(score / 100 *2.3);
        ctx.fillText('Game Over', (canvas.width / 2) - txtmetrics.width + 185 , canvas.height / 2 );
        ctx.font = '25px serif';
        ctx.fillText(ds, canvas.width / 2- txtmetrics.width +300, canvas.height / 2 + 60);
        ctx.fillStyle = 'rgb(44, 62, 100)';
        roundedRect(ctx,canvas.width / 2 - 50, canvas.height / 2 + 90, 100, 30 , 10);
        ctx.fillStyle = 'rgba(235, 245, 251, 1)';
        ctx.font = '18px serif';
        ctx.fillText('Restart?', (canvas.width / 2) - txtmetrics.width + 350 , canvas.height / 2 + 110);

    }
}

function resetScreen()
{
    rectAx = 0; 
    rectAy = 0; 
    rectW = 35; 
    dist = Math.floor(Math.random() * (190 - 100 + 1)) + 100;
    rectBx = -1 * dist;
    rectAH = Math.floor(Math.random() * (500 - 300 + 1)) + 300;
    rectBH = Math.floor(Math.random() * (500 - 300 + 1)) + 300;
    rectBy = canvas.height-rectBH;
    score = 0;
    x = 0;
    y = 0;
    ball.x = canvas.width - 50;
    ball.y = canvas.height / 2;
    isOver=false;
    dx = 2.5;
    draw();
}

function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + height - radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.lineTo(x + width - radius, y + height);
  ctx.arcTo(x + width, y + height, x + width, y + height-radius, radius);
  ctx.lineTo(x + width, y + radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.lineTo(x + radius, y);
  ctx.arcTo(x, y, x, y + radius, radius);
  ctx.fillStyle = 'rgb(44, 62, 100)';
  ctx.fill();
}