import toast from "react-hot-toast";

function randomize() {
  let number = Math.random();
  if (number >= 0.5) {
    return 1;
  } else {
    return -1;
  }
}

function randomax(max) {
  return Math.floor(Math.random() * max);
}

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      gameEnded:false,
      gameStarted: false,
      shipsReady: false,
      waitingForShip: false,
      currentBoat: 5,
      boatsPlaced: 0,
      currentShipStart: [],
      blankField: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      foggyField: [
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
      ],
      defaultField: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      enemyField: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
        [0, 0, 2, 0, 0, 0, 0, 2, 0, 0],
        [0, 0, 2, 0, 0, 0, 0, 2, 0, 0],
        [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 0, 2, 2, 2, 2, 2, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 2, 2, 0, 0, 0, 0, 0],
      ],
      //The cpu searches here to shoot to a suspicious field (ship), and know when a ship is sunk
      cpuKnowledge: { water: [], ships: [], wreck: [] },
      cpuHits: [],
      //Store player shots to check for cpu's sunken ships
      playerHits: [],
      //carrier 5, battleship 4, crusier/submmarine 3, destroyer 2
      playerLocations: {
        carrier: [],
        battleship: [],
        cruiser: [],
        submarine: [],
        destroyer: [],
      },
      enemyLocations: {
        carrier: [
          [6, 4],
          [6, 5],
          [6, 6],
          [6, 7],
          [6, 8],
        ],
        battleship: [
          [3, 2],
          [4, 2],
          [5, 2],
          [6, 2],
        ],
        cruiser: [
          [9, 2],
          [9, 3],
          [9, 4],
        ],
        submarine: [
          [2, 7],
          [3, 7],
          [4, 7],
        ],
        destroyer: [
          [1, 0],
          [1, 1],
        ],
      },
    },
    actions: {
      setBoatStart: (x, y, length) => {
        const store = getStore();
        let blankField = store.blankField;
        if (blankField[x][y] !== 0) {
          toast.error("You must place the start on water");
        } else {
          blankField[x][y] = 2;
          setStore({ waitingForShip: true });
          setStore({ currentShipStart: [x, y] });
          setStore({ blankField });
        }
      },

      setBoatEnd: (x, y) => {
        const store = getStore();
        let blankField = store.blankField;
        if (
          store.currentShipStart[0] === x &&
          store.currentShipStart[1] === y
        ) {
          blankField[x][y] = 0;
          setStore({ blankField });
          setStore({ waitingForShip: false });
        } else if (
          (store.currentShipStart[0] !== x ||
            store.currentShipStart[1] !== y) &&
          (store.currentShipStart[0] === x ||
            store.currentShipStart[1] === y) &&
          Math.max(
            Math.abs(store.currentShipStart[0] - x),
            Math.abs(store.currentShipStart[1] - y)
          ) ===
            store.currentBoat - 1
        ) {
          if (blankField[x][y] !== 0) {
            toast.error("You must place the end on water");
            return;
          }

          let dx = Math.sign(x - store.currentShipStart[0]);
          let dy = Math.sign(y - store.currentShipStart[1]);

          //Check for overlaps
          for (let i = 0; i < store.currentBoat - 1; i++) {
            if (blankField[x - i * dx][y - i * dy] !== 0) {
              toast.error("Ships cannot overlap");
              return;
            }
          }

          //Painting tiles
          for (let i = 0; i < store.currentBoat; i++) {
            blankField[x - i * dx][y] = 2;
            blankField[x][y - i * dy] = 2;
          }
          let playerLocations = store.playerLocations;

          //Adding to player Locations
          if (store.boatsPlaced == 0) {
            for (let i = 0; i < store.currentBoat; i++) {
              playerLocations.carrier.push([x - i * dx, y - i * dy]);
            }
          } else if (store.boatsPlaced == 1) {
            for (let i = 0; i < store.currentBoat; i++) {
              playerLocations.battleship.push([x - i * dx, y - i * dy]);
            }
          } else if (store.boatsPlaced == 2) {
            for (let i = 0; i < store.currentBoat; i++) {
              playerLocations.cruiser.push([x - i * dx, y - i * dy]);
            }
          } else if (store.boatsPlaced == 3) {
            for (let i = 0; i < store.currentBoat; i++) {
              playerLocations.submarine.push([x - i * dx, y - i * dy]);
            }
          } else if (store.boatsPlaced == 4) {
            for (let i = 0; i < store.currentBoat; i++) {
              playerLocations.destroyer.push([x - i * dx, y - i * dy]);
            }
          }

          setStore({ playerLocations });

          setStore({
            blankField,
            waitingForShip: false,
            boatsPlaced: store.boatsPlaced + 1,
          });
          if (store.boatsPlaced === 3) {
          } else if (store.boatsPlaced == 5) {
            setStore({ gameStarted: true, shipsReady: true });
          } else {
            setStore({ currentBoat: store.currentBoat - 1 });
          }
        } else {
          toast.error("Invalid ship end");
        }
      },

      //own field: 0=water, 1=hit water, 2=ship, 3=hit ship, 5=wreck
      //enemy field: 4=undiscovered
      checkIfSunk: (origin) => {
        //checks if the hit spot fully shot down a ship and paints dark red (5), if said ship sunk
        const store = getStore();
        const cpuKnowledge = store.cpuKnowledge;
        if (origin === "player") {
          let foggyField = store.foggyField;
          let hitCounter = 0;
          let totalHitCounter = 0;
          for (let ship in store.enemyLocations) {
            for (let field of store.enemyLocations[ship]) {
              if (
                store.playerHits.some(
                  (attack) => attack[1] === field[1] && attack[0] === field[0]
                )
              ) {
                totalHitCounter += 1;
                hitCounter += 1;
              }
            }
            //Turn sunken ships to type 5 (wreck)
            if (hitCounter === store.enemyLocations[ship].length) {
              store.enemyLocations[ship].forEach((field) => {
                foggyField[field[0]][field[1]] = 5;
                setStore({ foggyField });
              });
            }
            hitCounter = 0;
          }
          if (totalHitCounter === 17) {
            toast.success("You won!");
            setStore({gameEnded:true})
          }
        } else {
          //Check if cpu sunk your ship
          let blankField = store.blankField;
          let hitCounter = 0;
          let totalHitCounter = 0;
          for (let ship in store.playerLocations) {
            for (let field of store.playerLocations[ship]) {
              if (
                store.cpuHits.some(
                  (attack) => attack[1] === field[1] && attack[0] === field[0]
                )
              ) {
                totalHitCounter += 1;
                hitCounter += 1;
              }
            }

            //Turn sunken ships to type 5 (wreck)
            if (hitCounter === store.playerLocations[ship].length) {
              store.playerLocations[ship].forEach((field) => {
                blankField[field[0]][field[1]] = 5;
                cpuKnowledge.wreck.push([field[0], field[1]]);
                cpuKnowledge.ships = cpuKnowledge.ships.filter(
                  (part) => !(part[0] == field[0] && part[1] == field[1])
                );
                setStore({ blankField, cpuKnowledge });
              });
            }
            hitCounter = 0;
          }
          if (totalHitCounter === 17) {
            toast.error("You lost!");
            setStore({gameEnded:true})
          }
        }
      },

      //checks in enemyField to clear the fog, if hit and calls checkifsunk
      handleAttack: (x, y) => {
        const store = getStore();
        const actions = getActions();
        let foggyField = store.foggyField;
        let playerHits = store.playerHits;
        if (store.enemyField[x][y] == 2) {
          foggyField[x][y] = 3;
          setStore({ foggyField });
          setStore({ playerHits: [...playerHits, [x, y]] });
          actions.checkIfSunk("player");
        } else if (store.enemyField[x][y] == 0) {
          foggyField[x][y] = 0;
          setStore({ foggyField });
        }
        actions.CPUTurn();
      },

      handleRestart: () => {
        setStore({
          gameEnded:false,
          gameStarted: false,
          shipsReady:false,
          waitingForShip: false,
          boatsPlaced:0,
          currentBoat:5,
          cpuKnowledge: { water: [], ships: [], wreck: [] },
          cpuHits: [],
          playerHits: [],
          playerLocations: {
            carrier: [],
            battleship: [],
            cruiser: [],
            submarine: [],
            destroyer: [],
          },
          blankField:[
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          ],
          foggyField:[
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
          ],
        });
        console.log(getStore())
      },

      handleIncomingAttack: (x, y) => {
        const store = getStore();
        const actions = getActions();
        const cpuKnowledge = store.cpuKnowledge;
        let blankField = store.blankField;
        let cpuHits = store.cpuHits;
        if (blankField[x][y] == 0) {
          blankField[x][y] = 1;
          cpuKnowledge.water.push([x, y]);
        } else if (blankField[x][y] == 2) {
          blankField[x][y] = 3;
          cpuKnowledge.ships.push([x, y]);
          setStore({ cpuHits: [...cpuHits, [x, y]] });
          actions.checkIfSunk("cpu");
        }
        setStore({ blankField, cpuKnowledge });
      },

      CPUTurn: () => {
        const store = getStore();
        const actions = getActions();
        //Case 1: no info
        if (store.cpuKnowledge.ships.length == 0) {
          actions.attackCase1();
          //Case2: has the location of one non sunken ship tile
        } else if (store.cpuKnowledge.ships.length == 1) {
          actions.attackCase2();
        } else if (store.cpuKnowledge.ships.length == 2) {
          actions.attackCase3();
        } else if (store.cpuKnowledge.ships.length > 2) {
          actions.attackCase4();
        }
      },

      attackCase1: () => {
        const isValidTarget = (x, y) => {
          return (
            x <= 9 &&
            x >= 0 &&
            y <= 9 &&
            y >= 0 &&
            !store.cpuKnowledge.wreck.some(
              (field) => field[0] === x && field[1] === y
            ) &&
            !store.cpuKnowledge.water.some(
              (field) => field[0] === x && field[1] === y
            ) &&
            !store.cpuKnowledge.ships.some(
              (field) => field[0] === x && field[1] === y
            )
          );
        };
        const store = getStore();
        const actions = getActions();
        console.log("Shooting randomly!");
        let targetX = Math.floor(Math.random() * 10);
        let targetY = Math.floor(Math.random() * 10);
        while (!isValidTarget(targetX, targetY)) {
          targetX = Math.floor(Math.random() * 10);
          targetY = Math.floor(Math.random() * 10);
        }
        actions.handleIncomingAttack(targetX, targetY);
      },

      attackCase2: () => {
        const isValidTarget = (x, y) => {
          return (
            x <= 9 &&
            x >= 0 &&
            y <= 9 &&
            y >= 0 &&
            !store.cpuKnowledge.wreck.some(
              (field) => field[0] === x && field[1] === y
            ) &&
            !store.cpuKnowledge.water.some(
              (field) => field[0] === x && field[1] === y
            ) &&
            !store.cpuKnowledge.ships.some(
              (field) => field[0] === x && field[1] === y
            )
          );
        };
        const store = getStore();
        const actions = getActions();
        console.log("Hunting for a ship");
        let targetX = store.cpuKnowledge.ships[0][0];
        let targetY = store.cpuKnowledge.ships[0][1];
        let direction = randomize();
        if (direction > 0) {
          targetX += randomize();
        } else {
          targetY += randomize();
        }
        while (!isValidTarget(targetX, targetY)) {
          targetX = store.cpuKnowledge.ships[0][0];
          targetY = store.cpuKnowledge.ships[0][1];
          direction = randomize();
          if (direction > 0) {
            targetX += randomize();
          } else {
            targetY += randomize();
          }
        }
        console.log("Attacking " + targetX + "," + targetY);
        actions.handleIncomingAttack(targetX, targetY);
      },

      attackCase3: () => {
        const isValidTarget = (x, y) => {
          return (
            x <= 9 &&
            x >= 0 &&
            y <= 9 &&
            y >= 0 &&
            !store.cpuKnowledge.wreck.some(
              (field) => field[0] === x && field[1] === y
            ) &&
            !store.cpuKnowledge.water.some(
              (field) => field[0] === x && field[1] === y
            ) &&
            !store.cpuKnowledge.ships.some(
              (field) => field[0] === x && field[1] === y
            )
          );
        };
        const store = getStore();
        const actions = getActions();
        console.log("Targeting knowing 2 ship areas");
        //Find the common coordinate
        let firstShipX = store.cpuKnowledge.ships[0][0];
        let firstShipY = store.cpuKnowledge.ships[0][1];
        let secondShipX = store.cpuKnowledge.ships[1][0];
        let secondShipY = store.cpuKnowledge.ships[1][1];
        let targetX, targetY;
        if (firstShipX == secondShipX) {
          console.log("Pieces located at x=" + firstShipX);
          //attack common coordinate X
          targetX = firstShipX;
          let lowestY = Math.min(firstShipY, secondShipY);
          let highestY = Math.max(firstShipY, secondShipY);
          if (lowestY != 0 && isValidTarget(targetX, lowestY - 1)) {
            //is the lowest spot not a border and the one before valid?
            targetY = lowestY - 1; //take the spot before
          } else if (highestY != 9 && isValidTarget(targetX, highestY + 1)) {
            //is the highest not a border and the one after valid?
            targetY = highestY + 1; //take the spot after
          } else {
            //found tiles along x belong to different boats
            console.log("Found tiles belong to different boats, changing x");
            while (targetX > 9 || targetX < 0 || targetX == firstShipX) {
              targetX += randomize();
              targetY = firstShipY;
            }
          }
        } else if (firstShipY == secondShipY) {
          console.log("Pieces located at y=" + firstShipY);
          //attack common coordinate Y
          targetY = firstShipY;
          let lowestX = Math.min(firstShipX, secondShipX);
          let highestX = Math.max(firstShipX, secondShipX);
          if (lowestX != 0 && isValidTarget(lowestX - 1, targetY)) {
            //is the lowest spot not a border and the one before valid?
            targetX = lowestX - 1; //take the spot before
          } else if (highestX != 9 && isValidTarget(highestX + 1, targetY)) {
            //is the highest not a border and the one after valid?
            targetX = highestX + 1; //take the spot after
          } else {
            //found tiles along y belong to different boats
            console.log("Found tiles belong to different boats, changing y");
            while (targetY > 9 || targetY < 0 || targetY == firstShipY) {
              targetY += randomize();
              targetX = secondShipX;
            }
          }
        }
        if (isValidTarget(targetX, targetY)) {
          actions.handleIncomingAttack(targetX, targetY);
        } else {
          console.log("ERROR:No coordinates found to attack");
        }
      },

      attackCase4: () => {
        const isValidTarget = (x, y) => {
          return (
            x <= 9 &&
            x >= 0 &&
            y <= 9 &&
            y >= 0 &&
            !store.cpuKnowledge.wreck.some(
              (field) => field[0] === x && field[1] === y
            ) &&
            !store.cpuKnowledge.water.some(
              (field) => field[0] === x && field[1] === y
            ) &&
            !store.cpuKnowledge.ships.some(
              (field) => field[0] === x && field[1] === y
            )
          );
        };
        const store = getStore();
        const actions = getActions();
        console.log("Attacking knowing more than 2 pieces");
        let shipsXCoordinates = [];
        let shipsYCoordinates = [];
        let newXtarget, newYtarget;
        for (let coordinate of store.cpuKnowledge.ships) {
          shipsXCoordinates.push(coordinate[0]);
          shipsYCoordinates.push(coordinate[1]);
        }

        if (shipsXCoordinates.every((value) => value == shipsXCoordinates[0])) {
          newXtarget = shipsXCoordinates[0];
          let fullnessCounter = 0;
          while (!isValidTarget(newXtarget, newYtarget)) {
            fullnessCounter = 0;
            for (let i = 0; i < 10; i++) {
              if (!isValidTarget(newXtarget, i)) {
                fullnessCounter += 1;
              }
            }
            if (fullnessCounter == 10) {
              newXtarget += randomize();
            }
            newYtarget = randomax(10);
          }
        } else if (
          shipsYCoordinates.every((value) => value == shipsYCoordinates[0])
        ) {
          newYtarget = shipsYCoordinates[0];
          let fullnessCounter = 0;
          while (!isValidTarget(newXtarget, newYtarget)) {
            fullnessCounter = 0;
            for (let i = 0; i < 10; i++) {
              if (!isValidTarget(i, newYtarget)) {
                fullnessCounter += 1;
              }
            }
            if (fullnessCounter == 10) {
              newYtarget += randomize();
            }
            newXtarget = randomax(10);
          }
        } else {
          while (!isValidTarget(newXtarget, newYtarget)) {
            let randomField =
              store.cpuKnowledge.ships[
                randomax(store.cpuKnowledge.ships.length)
              ];
            if (randomize() > 0) {
              newXtarget = randomField[0] + randomize();
            } else {
              newYtarget = randomField[1] + randomize();
            }
          }
        }
        if (isValidTarget(newXtarget, newYtarget)) {
          console.log("Attacking " + newXtarget + "," + newYtarget);
          actions.handleIncomingAttack(newXtarget, newYtarget);
        }
      },

      cpuFieldSetup:()=>{
        //insert setup logic here
      },

      //UNUSED FOR NOW
      checkIfXIsFull: (X) => {
        const store = getStore();
        let counter = 0;
        for (let i = 0; i < 10; i++) {
          if (
            store.cpuKnowledge.wreck.some(
              (field) => field[0] == X && field[1] == i
            ) ||
            store.cpuKnowledge.water.some(
              (field) => field[0] == X && field[1] == i
            ) ||
            store.cpuKnowledge.ships.some(
              (field) => field[0] == X && field[1] == i
            )
          ) {
            counter += 1;
          }
        }
        if (counter == 10) {
          console.log("X is Full" + X);
          return true;
        } else {
          return false;
        }
      },
      checkIfYIsFull: (Y) => {
        const store = getStore();
        let counter = 0;
        for (let i = 0; i < 10; i++) {
          if (
            store.cpuKnowledge.wreck.some(
              (field) => field[0] == i && field[1] == Y
            ) ||
            store.cpuKnowledge.water.some(
              (field) => field[0] == i && field[1] == Y
            ) ||
            store.cpuKnowledge.ships.some(
              (field) => field[0] == i && field[1] == Y
            )
          ) {
            counter += 1;
          }
        }
        if (counter == 10) {
          console.log("Y es full" + Y);
          return true;
        } else {
          false;
        }
      },
    },
  };
};
export default getState;
