function startGame(){
    myGameArea.start();
    myPiece=new Piece(50,50,"albinson.jpg",500  ,20,"image");
    obstacle = new Piece(100,200, "black", 300,120);
    obstacle2= new Piece(100,100,"black",180,270);
    obstacle3= new Piece(100,200,"black",520,180);
    obstacle4= new Piece(200,50,"black",100,90);
    obstacle5 = new Piece(100,300,"black",350,350);
    obstacle6= new Piece(400,50,"black",0,200);
    obstacle7= new Piece(100,20,"black",600,400);
    obstacle8= new Piece(100,200,"black",800,50);
    obstacle9= new Piece(100,100,"black",800,400);
    obstacle10=new Piece(80,50,"black",200,40);
    obstacle11=new Piece(90,1500,"black", 840,250);
    obstacle12=new Piece(40,40,"black",550,75);
    obstacle13= new Piece(70,100,"black", 300,40);
    win=new Piece(50,1000,"green",0,550);

}

var myGameArea={
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 1000;
        this.canvas.height = 600;
        this.canvas.style="border:1px solid";
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.fps = setInterval(updateGame, 30);
    },
    clear: function(){
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    },
    stop:function(){
      clearInterval(this.fps);
    }
};

function Piece(width,height,color,x,y,type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = "albinson.jpg";
    }
    this.width = width;
    this.height = height;
    this.x = x;
    this.xspeed = 0;
    this.yspeed = 0;

    this.y = y;
    context = myGameArea.context;
    context.fillStyle = color;
    context.fillRect(this.width, this.height, this.y, this.x);

    this.update = function () {
        if (type == "image") {
            context.drawImage(this.image, this.x, this.y, this.width, this.height)
        } else {
            context = myGameArea.context;
            context.fillStyle = color;
            context.fillRect(this.x, this.y, this.height, this.width);
        }
    };

    this.move = function () {
        this.x += this.xspeed;
        this.y += this.yspeed;

    }
    this.crashWith = function (obstacle) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = obstacle.x;
        var otherright = obstacle.x + (obstacle.width);
        var othertop = obstacle.y;
        var otherbottom = obstacle.y + (obstacle.height);
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;

        }

        return crash;
    }
    this.win = function (square) {
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = square.x;
        var otherright = square.x + (square.width);
        var othertop = square.y;
        var otherbottom = square + (square.height);
        var win = false;
        if (mybottom == othertop) {
            win = true;
        }
        return win;


    }
    this.out=function(border){
        var myright = this.x + (this.width);
        var mytop = this.y;
        var myleft= this.x;
        var borderright=0;
        var borderleft=100;
        var out=false;
        if(myright==borderright || myleft==borderleft){
            out=true;
        }
    return out;
    }
}





function updateGame() {
    if(myPiece.win(win)){
        myGameArea.stop();
        alert("YOU WIN!!!" +
            "your score is 14/15");
        location.reload(true);
    }
    if(myPiece.out(true)){
    //    myGameArea.stop();
        alert("asdfasdfsdf");
    }
    if (myPiece.crashWith(obstacle) || myPiece.crashWith(obstacle2) || myPiece.crashWith(obstacle3) || myPiece.crashWith(obstacle4)
    || myPiece.crashWith(obstacle5) || myPiece.crashWith(obstacle6) || myPiece.crashWith(obstacle7) || myPiece.crashWith(obstacle8) || myPiece.crashWith(obstacle9) ||
        myPiece.crashWith(obstacle10) || myPiece.crashWith(obstacle11) || myPiece.crashWith(obstacle13)) {
        myGameArea.stop();
        alert("you lose! your score is 0/100");
        location.reload(true);

    } else {
        myGameArea.clear();
        obstacle.update();
        obstacle2.update();
        obstacle3.update();
        obstacle4.update();
        obstacle5.update();
        obstacle6.update();
        obstacle7.update();
        obstacle8.update();
        obstacle9.update();
        obstacle10.update();
        obstacle11.update();
        obstacle12.update();
        obstacle13.update();
        win.update();
        myPiece.move();
        myPiece.update();
    }
}

function up(){
    myPiece.yspeed -=1;
}
function down(){
    myPiece.yspeed +=1;
}
function right(){
    myPiece.xspeed +=1;
}
function left(){
    myPiece.xspeed -=1;
}
function reload(){
    location.reload(true);
}



