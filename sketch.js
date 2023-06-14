//Global variables for images
var bg, sunR, sunL, s_pan, fan_anim,fan_img,display, g_house_img;

//absorb

var absorb1, absorb2;

//Global variables for Sprites
var g_house, pan1,pan2,fan,fan2;

//Creating a ray group
var rayGroup;

//Creating temprature and voltage variables
var temp = 10
var panel1_voltage =0;
var panel2_voltage = 0;
var power_gen = 0;




function preload()
{
 bg= loadImage("bgimage.png");
 sunR= loadImage("sunrays.png");
 sunL= loadImage("sunrays1.png");
 s_pan= loadImage("s_panel.png");
 fan_anim= loadAnimation("fan01.png","fan02.png", "fan03.png", "fan04.png", "fan05.png");
 fan_img= loadImage("fan01.png");
 display= loadImage("disp.png");
 g_house_img= loadImage("greenhouse.png");
}

function setup() 
{
    createCanvas(800, 500);
    
    rayGroup=createGroup();
    panelGroup=createGroup();
    raysGroup = createGroup();
    
    //green house sprite

    g_house= createSprite(380,300,100,100);
    g_house.addImage(g_house_img);

    //Solar Panel 1

    pan1= createSprite(80,height-50,80,80);
    pan1.addImage(s_pan);

    //Solar Panel 2

    pan2= createSprite(width-130,height-50,80,80);
    pan2.addImage(s_pan);

    //Creating fan no. 1

    fan= createSprite(280,300,20,20);
    fan.addImage(fan_img);
    fan.scale= 0.3;

    fan.addAnimation("rotate",fan_anim);

    //Creating fan no. 2

    fan2= createSprite(450,300,20,20);
    fan2.addImage(fan_img);
    fan2.scale= 0.3;
  
    fan2.addAnimation("rotate_1",fan_anim);
    
   
    
}

function draw() 
{
  background(220);
  
  image(bg,0,0,width,height);
  image(display,600,10,200,60)
  power_gen = panel1_voltage + panel2_voltage
  console.log(power_gen);
  
  push();
  noStroke();
  fill(255,255,0)
  text("Voltage : ",620,37)
  text(power_gen,680,37)

  text("Temprature : ",620,56)
  text(temp,710,56);
  pop();
  
  makeRay();
  
  //Calculate Voltage
  panel1_voltage=round(absorb1*0.15);
  panel2_voltage=round(absorb2*0.15);
  
  // Write conditions to start the first fan will be temp should be more than 30 and power_gen > =4.
  //And the second fan will start when temp >= 30 and power_gen >= 4.
  
if(power_gen>=4 && temp>=30){
console.log("hey! My HW is due today");
  fan.changeAnimation("rotate");
temp-=0.5;
panel1_voltage-=1
}

if(power_gen>=8 && temp>=30){
console.log("hey! My HW is due today");
  fan2.changeAnimation("rotate_1");
temp-=1;
panel2_voltage-=1
}




  drawSprites();  
}

function makeRay()
{
  
   if (frameCount % 60 === 0) 
   {
    var x = Math.round(random(10,350));
    rayL = createSprite(x,50,10,10);
    var xr = Math.round(random(350,750));
    rayR = createSprite(xr,50,10,10);
    rayL.addImage(sunL);
    rayR.addImage(sunR);
    rayL.scale = 0.08;
    rayR.scale = 0.08;
    vx = random(-1,1);
    raysGroup.add(rayL);
    raysGroup.add(rayR);
    raysGroup.setVelocityYEach(2)
    raysGroup.setVelocityXEach(vx)
    raysGroup.setLifetimeEach(134)
     
//Add collision functions and callback functions
     
   }
  
   
raysGroup.overlap(pan1,charge1);
raysGroup.overlap(pan2,charge2);
raysGroup.overlap(g_house,temp_rise);


}

//Create function for charge1, charge2 & temp_rise

function charge1(sprA){
sprA.remove();
absorb1+=1;
}

function charge2(sprB){
  sprB.remove();
  absorb2+=1;
}

function temp_rise(sprP){
sprP.remove();
temp+=1;
}


