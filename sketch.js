var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var obstacleGroup, cloudGroup;
var gamestate = "start";
function preload() {
    obstacle1 = loadImage("obstacle1.png");
    obstacle2 = loadImage("obstacle2.png");
    obstacle3 = loadImage("obstacle3.png");
    obstacle4 = loadImage("obstacle4.png");
    obstacle5 = loadImage("obstacle5.png");
    obstacle6 = loadImage("obstacle6.png");


    trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
    trex_collided = loadAnimation("trex_collided.png");
    groundImage = loadImage("ground2.png");
    cloudImage = loadImage("cloud.png");
}
function setup() {
    createCanvas(600, 200);
    //create a trex sprite
    trex = createSprite(50,160,20,50);
    trex.addAnimation("running", trex_running);
    trex.addAnimation("collided", trex_collided);
    trex.scale = 0.5;

    obstacleGroup = createGroup();
    cloudGroup = createGroup();


    //create a ground sprite
    ground = createSprite(200,180,400,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
    ground.velocityX = -4;
    
    //create an invisible ground
    invisibleGround = createSprite(200,195,400,20);
    invisibleGround.visible = false;

   
}
function draw() {
    background(150);


    trex.debug = true;
    trex.setCollider("circle", 0, 0, 40);
    if(gamestate == "start"){

        if (keyDown("space") && trex.y > 135) {
            trex.velocityY = -10;
        }
    
        trex.velocityY = trex.velocityY + 0.8
    
       
    
        spawn_Cloud();
        spawn_Obstacle();
        if(trex.isTouching(obstacleGroup)){
            gamestate = "end";
        }





    }


    if(gamestate == "end"){
        ground.velocityX = 0;
        obstacleGroup.setVelocityXEach(0);
        cloudGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        cloudGroup.setLifetimeEach(-1);
        trex.changeAnimation("collided",trex_collided);



    }

























    //jump when the space button is pressed
    if (ground.x < 0) {
        ground.x = ground.width / 2;
    }

    trex.collide(invisibleGround);
    drawSprites();
}
function spawn_Cloud() {
    
    if(frameCount % 30 == 0) {
     var ran = Math.round(random(100, 50))


     cloud = createSprite(600, 100, 40,10);
     cloud.y = ran;
     cloud.addImage(cloudImage);
     cloud.scale = 0.1;
     cloud.velocityX = -3;
     cloud.lifetime = 200;


     
      cloud.depth = trex.depth;
      trex.depth+=1;
      cloudGroup.add(cloud);



    }




}

function spawn_Obstacle(){
    if(frameCount % 40 ==0){
    
    
        obstacle = createSprite(400,165,10,40);
        obstacle.velocityX = -3;
        obstacle.lifetime = 200;
        var obstacle_ran = Math.round(random(1, 6));
        switch(obstacle_ran){
            case 1:
                obstacle.addImage(obstacle1);

                break;

            case 2:
                obstacle.addImage(obstacle2);



                break;

            case 3:
                obstacle.addImage(obstacle3);




                break;

            case 4:
                obstacle.addImage(obstacle4);
                



                break;

            case 5:
                obstacle.addImage(obstacle5);
                



                break;

            case 6:
                obstacle.addImage(obstacle6);
                



                break;

            default:
                break;

        




               
        }
        obstacle.scale = 0.5;
        obstacleGroup.add(obstacle);

    }
}