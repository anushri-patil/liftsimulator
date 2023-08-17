const floorInput = document.getElementById("floor-input");
const LiftInput = document.getElementById("lift-input");
const submitButton = document.getElementById("submit-btn");
const container = document.getElementById("container");
const liftContainer = document.createElement("div");

var prevFloor = 0 ;
let floorVal = "";
let liftVal = "";
let targetFloors = [] ;
// const LiftInput = 1;
//const floorInput = 3;

submitButton.addEventListener("click" , () => {
  if (!LiftInput.value && !floorInput.value) {
    alert("Please Enter number to generate Floors and Lifts");
  } else if (!floorInput.value) {
    alert("Please enter floor number in range 1-15");
  } else if (!LiftInput.value) {
    alert("Please enter lift number in range 1-4");
  } else if (LiftInput.value > 4) {
    alert("Maximum 4 lifts are allowed!");
  
   }

  else if (LiftInput.value == 0 || floorInput.value == 0){

        alert('Value cannot be zero');
  }
  
  
  else if (floorInput.value > 15) {
    alert("Maximum no of floors is 15!");
   
  } else if (LiftInput.value < 0 || floorInput.value < 0) {
    alert("No negative values are allowed");
  
  } else {
    container.innerHTML = " ";
    liftContainer.innerHTML = "";

    for (let i = floorInput.value; i > 0; i--) {
      //Function to genereate floors
      createFloors(i, LiftInput.value);
    }

    floorInput.value = "";
  }

});

//Function to create floors
function createFloors(floors, lifts) {
  const floorDiv = document.createElement("div");

  floorDiv.classList.add("floordiv");

  const floorContainer = document.createElement("div");
  floorContainer.classList.add("floor");
  floorContainer.dataset.floor = floors;

  //  button container
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("btn-div");

  const UpButton = document.createElement("button");
  const DownButton = document.createElement("button");

  UpButton.classList.add("up-down");
  DownButton.classList.add("up-down");

  UpButton.setAttribute("id", floors);
  DownButton.setAttribute("id", floors);

  UpButton.innerText = "Up";
  DownButton.innerText = "Down";

  UpButton.dataset.floor = floors;
  DownButton.dataset.floor = floors;

  buttonContainer.append(UpButton);
  buttonContainer.append(DownButton);

  let floorNumber = document.createElement("p");

  floorNumber.classList.add("floorName");

  floorNumber.innerText = `Floor ${floors}`;

  buttonContainer.append(floorNumber);

  floorContainer.append(buttonContainer);

  floorDiv.append(floorContainer);

  container.append(floorDiv);

  for (let j = 0; j < lifts; j++) {
    if (floors === 1) {
      let Lifts = document.createElement("div");
      Lifts.classList.add("lift-div");

      Lifts.setAttribute("onfloor", 1);

      Lifts.dataset.currentLocation = prevFloor;

      leftDoor = document.createElement("div");
      RightDoor = document.createElement("div");

      leftDoor.classList.add("left-door");
      RightDoor.classList.add("right-door");

      Lifts.appendChild(leftDoor);
      Lifts.appendChild(RightDoor);

      liftContainer.appendChild(Lifts);

      liftContainer.classList.add("lift");

      floorContainer.append(liftContainer);

      floorDiv.append(floorContainer);
    }
  }
}
let x = 0;
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("up-down")) {
    if (e.target.dataset.floor === x) {
      return;
    } else {
      LiftStatus(e.target.dataset.floor);
    }

    x = e.target.dataset.floor;
  }
});

function LiftStatus(clickedFloor) {
  const lifts = document.querySelectorAll(".lift-div");

  let pos;

  for (let i = 0; i < lifts.length; i++) {
    if (lifts[i].classList.contains("engaged")) {
      let onFloorVal = parseInt(lifts[i].getAttribute("onfloor"));

      if (onFloorVal === clickedFloor) {
        return;
      }

      console.log("check next");
    } else {
      for (let i = 0; i < lifts.length; i++) {
        let onFloorVal = parseInt(lifts[i].getAttribute("onfloor"));

        if (onFloorVal === clickedFloor) {
          MoveLift(clickedFloor, i);
          return;
        }
      }

      pos = i;
      MoveLift(clickedFloor, pos);
      break;
    }
  }

  if (pos === undefined) {
    targetFloors.push(clickedFloor);
  }
}

function MoveLift(clickedFloor, pos) {
  const elevators = document.getElementsByClassName("lift-div");

  const elevator = elevators[pos];

  let currentFloor = elevator.getAttribute("onfloor");
  let duration = Math.abs(parseInt(clickedFloor) - parseInt(currentFloor)) * 2;

  elevator.setAttribute("onfloor", clickedFloor);

  elevator.style.transition = `transform ${duration}s linear`;
  elevator.style.transform = `translateY(-${
    100 * parseInt(clickedFloor) - 100
  }px)`;
  elevator.classList.add("engaged");

  setTimeout(() => {
    elevator.children[0].style.transform = "translateX(-100%)";
    elevator.children[1].style.transform = "translateX(100%)";
  }, duration * 1000 + 1000);

  setTimeout(() => {
    elevator.children[0].style.transform = "none";
    elevator.children[1].style.transform = "none";
  }, duration * 1000 + 4000);

  //  Remove the busy status
  setTimeout(() => {
    elevator.classList.remove("engaged");

    if (targetFloors.length) {
      MoveLift(targetFloors.shift(), pos);
    }
  }, duration * 1000 + 7000);
}


