var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var sound,sound2;
//create feed and lastFed variable here
var feed,lastFed;
var backgroundImg;
var bg;
function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
bg = loadImage("bg.jpg")
sound = loadSound("button.mp3");
sound2 = loadSound("sound2.mp3");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,300,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(900,95);
  addFood.mousePressed(addFoods);

  feedFood=createButton("Feed the dog");
  feedFood.position(800,95);
  feedFood.mousePressed(feedDog);

  
}

function draw() {
  background(bg);
  foodObj.display();

  //write code to read fedtime value from the database 
  database.ref('FeedTime').on("value",function(data){
    FeedTime = data.val();
  })

  





  
 
  //write code to display text lastFed time here
  // if(lastFed>=12){
    textSize(15);
    fill("white")
     text("Last Feed :"+hour(),200,30)
  //  }else if(lastFed==0){
  //    text("Last Feed:12AM")
  //   }else{
  
  //   }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

//the dog image will be happy and if the foodStock is 0 than nothing will be fed to the dog else one bottle will be deducted from stock when feed dog is pressed
function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  var food_stock_val = foodObj.getFoodStock();
 
  if(food_stock_val <= 0){
    foodObj.updateFoodStock(food_stock_val *0)
  }else{
    foodObj.updateFoodStock(food_stock_val -1)
  }

  // database.ref('/').update({
  //   FeedTime:hour()
  // })
  if (!sound2.isPlaying()){
    sound2.play();
  }
  

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
   })
   if (!sound.isPlaying()){
    sound.play();
  }
}

