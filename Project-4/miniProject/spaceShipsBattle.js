/*
Save the Universe
------------------

Builds a game of battling alien spaceships using Javascript.
Earth has been attacked by a horde of aliens! You are the captain of the USS HelloWorld (ussEnter4Prize), on a mission to destroy every last alien ship.

Battle the aliens as you try to destroy them with your lasers.

There are six alien ships. The aliens' weakness is that they are too logical and attack one at a time: they will wait to see the outcome
of a battle before deploying another alien ship. Your strength is that you have the initiative and get to attack first. However, you do 
not have targeting lasers and can only attack the aliens in order. After you have destroyed a ship, you have the option to make a hasty retreat.

A game round would look like this:
  You attack the first alien ship
  If the ship survives, it attacks you
  If you survive, you attack the ship again
  If it survives, it attacks you again … etc
  If you destroy the ship, you have the option to attack the next ship or to retreat
  If you retreat, the game is over, perhaps leaving the game open for further developments or options
  You win the game if you destroy all of the aliens
  You lose the game if you are destroyed


Ship Properties
hull is the same as hitpoints. If hull reaches 0 or less, the ship is destroyed
firepower is the amount of damage done to the hull of the target with a successful hit
accuracy is the chance between 0 and 1 that the ship will hit its target
Your spaceship, the USS HelloWorld should have the following properties:

hull - 20
firepower - 5
accuracy - .7
The alien ships should each have the following ranged properties determined randomly:

hull - between 3 and 6
firepower - between 2 and 4
accuracy - between .6 and .8
You could be battling six alien ships each with unique values.

Date coded:10-31-2022
Author: Cyrus
*/

//--------------------------- Start of working block1
class Ship {
  constructor(hull, firepower, accuracy, isAlive) {
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
    this.isAlive = isAlive; // to check the battleship is destroted or not
  }
}

const ussEnter4Prize = new Ship(20, 5, 0.7, true);
// const ussEnter4Prize = new Ship(7, 5, 0.7, true);  // this was for test
//--------------------------- End of working block1


//--------------------------- Start of working block2
let alienShipArr = [];  // to populatete Alienships in an array we need to have an empty array
function setAlienShip() {
  let hull = Math.floor(Math.random() * 4 + 3);
  let firepower = Math.floor(Math.random() * 3 + 2);
  let accuracy = Math.random() * 0.2 + 0.6; // is the logic we used to get the decimal let accuracy = Math.random() * (MAX - min) + min
  let isAlive = true;
  let alienShip = new Ship(hull, firepower, accuracy, isAlive);  // instance of a ship for Alien forces
  return alienShip;
}
// first thoughts on using a forloop
for (let i = 1; i <= 6;i++){
    let newAlienShip = setAlienShip();
     alienShipArr.push(newAlienShip);  // Alienships are being populated in the lienShipArr
}
console.log(alienShipArr.length);
//--------------------------- End of working block2


// <><><><><><><><><><><><><><><><><> Functions ><><><><><><><><><><><><><><><>

// ************* ussEnter4Prize starts attack using this function **************
// Start of ussEnter4Prize function
function ussEnter4PrizeAttack() {
  if (ussEnter4Prize.hull <= 0  && alienShipArr.length !==0) {
    ussEnter4Prize.isAlive = false;
    console.log("ussEnter4Prize lost!");
    endTheGame()
    
  } else if (Math.random() < ussEnter4Prize.accuracy) {
        console.log("ussEnter4Prize has hit the alien ship!");

        alienShipArr[0].hull = alienShipArr[0].hull - ussEnter4Prize.firepower; // it always attack first ship - element index zero
   
        if(alienShipArr[0].hull <= 0){
            alienShipArr = alienShipArr.slice(1); // Now we have one less alienship. It removes first element of array

            if(alienShipArr.length === 0){
                console.log("ussEnter4Prize won")
                ussEnter4Prize.isAlive = true
                endTheGame()
            } else {
                ussEnter4PrizeAttack()  // assume after taking one ship out it attack the next alien ship immediately
            }            
        } else{
            alienAttack()
        }
  } else {
    console.log("ussEnter4Prize have missed"); 
    alienAttack()
  }
}
// End  of ussEnter4Prize function ********************************************


// ************* alienAttack starts attack using this function *****************
// Start of alienAttack function
function alienAttack() {
    if(alienShipArr[0].hull <= 0){
        alienShipArr[0].isAlive = false
        console.log("YOU DEFEATED ALIEN SHIP!");
        alienShipArr = alienShipArr.slice(1); // Now we have one less alienship. It removes first element of array
   
        if(alienShipArr.length === 0){
            console.log("ussEnter4Prize won")
            ussEnter4Prize.isAlive = true
            endTheGame()
        } else {
            ussEnter4PrizeAttack()  // assume after taking one ship out it attack the next alien ship immediately
        }            
    } else if (Math.random() < alienShipArr[0].accuracy) {
                console.log("ussEnter4Prize has been hit!");
                ussEnter4Prize.hull = ussEnter4Prize.hull - alienShipArr[0].firepower;
                console.log(ussEnter4Prize.hull);
           
                if (ussEnter4Prize.hull > 0  && alienShipArr.length !==0) { 
                    ussEnter4PrizeAttack()
                }  
                  else {
                        ussEnter4Prize.isAlive = false
                        endTheGame()
                  }
            } else {
                    console.log("Alien missed it's target");
                    if (ussEnter4Prize.hull > 0  && alienShipArr.length !==0) {
                        ussEnter4PrizeAttack()
                    } // no else here since the checks happen in ussEnter4PrizeAtack function
             }
}
// End of alienAttack function **************************************************************


// ********************** endTheGame shows the final battle result ***************************
// Start of endTheGame function **************************************************************
function endTheGame(){
    if(ussEnter4Prize.isAlive === true){
        console.log("ussEnter4Prize won the battle. Game is over. ")
    } else{
        console.log("Alien won the battle. Earth will be desoyed. GAME OVER. ")
    }
    alienShipArr = ""
}
// End of endTheGame function **************************************************************


setAlienShip();  // to build alien battleships
ussEnter4PrizeAttack();  // Calling ussEnter4Prize to strt the attack






