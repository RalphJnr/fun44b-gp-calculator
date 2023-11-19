let table = document.querySelector("table");
const unit = document.querySelector("#unit");
const grade = document.querySelector("#grade");
const courseCode = document.querySelector("#course-code");
const form = document.querySelector("form");
let courseUpdate = document.querySelector(".course-update");
let deleteIcons;

const button = document.querySelector("button");
const tableBody = document.querySelector("tbody");
let calcBtn = document.querySelector("#calcBtn");
let errorMsg = document.querySelector(".error-msg");
let tableRows;

let courseCodeValue;
let unitValue;
let gradeValue;

let counter = 0;
let tableToggle = 0;

let unitCalc;
let gradeCalc;

table.classList.toggle("delete");
calcBtn.classList.toggle("delete");
// errorMsg.classList.toggle("delete");

function createTable(courseCodeValue, unitValue, gradeValue) {
  let tableRow = document.createElement("tr");

  let cell1 = document.createElement("th");
  let cell2 = document.createElement("td");
  let cell3 = document.createElement("td");
  let cell4 = document.createElement("td");

  tableRow.setAttribute("class", "myTableRow");
  cell1.setAttribute("scope", "row");
  cell1.innerHTML = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-trash ml-3 text-dark icon"
      viewBox="0 0 16 16"
    >
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
    </svg>`;

  cell2.innerText = courseCodeValue;

  cell3.setAttribute("class", "unit-calc");
  cell4.setAttribute("class", "grade-calc");

  cell3.innerText = unitValue;
  cell4.innerHTML = `${gradeValue}`;

  tableRow.append(cell1, cell2, cell3, cell4);
  return tableRow;
}

function addDeleteicon() {
  deleteIcons = document.querySelectorAll(".icon");

  for (deleteIcon of deleteIcons) {
    deleteIcon.addEventListener("click", function () {
      this.parentElement.parentElement.remove();
      // this.parentElement.parentElement.classList.add("delete");
    });
  }
}

courseCode.addEventListener("input", function () {
  console.log(this.value);
  courseCodeValue = this.value.toUpperCase();
});

unit.addEventListener("input", function () {
  console.log(this.value);
  unitValue = this.value;
});

grade.addEventListener("change", function () {
  console.log(this.value);
  gradeValue = this.value;
});

button.addEventListener("click", function () {
  if (!courseCodeValue || !unitValue || !gradeValue) {
    errorMsg.innerText = "You can't leave any option blank. Fill it correctly!";
  } else {
    tableToggle += 1;
    errorMsg.innerText = "";

    if (tableToggle === 1) {
      table.classList.toggle("delete");
      calcBtn.classList.toggle("delete");
    }

    tableBody.appendChild(createTable(courseCodeValue, unitValue, gradeValue));
    tableRows = document.querySelectorAll(".myTableRow");
    addDeleteicon();
    counter += 1;
    courseUpdate.innerHTML = `Number of course: ${counter}`;
    unitCalc = document.querySelectorAll(".unit-calc");
    gradeCalc = document.querySelectorAll(".grade-calc");
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
});

// unitCalc
//  gradeCalc

calcBtn.addEventListener("click", function () {
  let totalUnit = 0;
  let unitValue = 0; //each unit in number
  let gradeValue = 0;
  let result = 0;
  let gp = 0;

  unitCalc.forEach(function (unit, i) {
    unitValue = Number(unit.innerText);
    totalUnit += unitValue;

    switch (gradeCalc[i].innerText) {
      case "A":
        gradeValue = 5;
        result += gradeValue * unitValue;
        break;

      case "B":
        gradeValue = 4;
        result += gradeValue * unitValue;
        break;

      case "C":
        gradeValue = 3;
        result += gradeValue * unitValue;
        break;

      case "D":
        gradeValue = 2;
        result += gradeValue * unitValue;
        break;

      case "E":
        gradeValue = 1;
        result += gradeValue * unitValue;
        break;

      case "F":
        gradeValue = 0;
        result += gradeValue * unitValue;
        break;

      default:
        console.log("hi");
        break;
    }

    gp = result / totalUnit;

    let modalBody = document.querySelector(".modal-body");
    modalBody.innerText = `Your GP is: ${gp}`;
  });
});
