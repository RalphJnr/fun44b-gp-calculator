const tcpInput = document.querySelector("#tcp-input");
const tnuInput = document.querySelector("#tnu-input");
const tcpText = document.querySelector("#tcp-text");
const tnuText = document.querySelector("#tnu-text");
const cgpaBtn = document.querySelector("#cgpa-btn");
const gpBtn = document.querySelector("#calc-gp");
const cgpaInputEl = document.querySelector(".cgpa-inputted");
const table = document.querySelector("#table");
const courseCodeInput = document.querySelector("#course-code");
const courseUnitInput = document.querySelector("#course-unit");
const courseSelectInput = document.querySelector("#course-grade");
const courseUpdateEl = document.querySelector("#course-update");
const tbody = document.querySelector("#tbody");
const tRow = document.querySelector(".myTableRow");
const calcBtn = document.querySelector("#calcBtn");
let tcp;
let tnu;

calcBtn.addEventListener("click", function () {
  const allUnits = document.querySelectorAll(".unit-calc");
  const allGrades = document.querySelectorAll(".grade-calc");
  const allUnitsArr = [...allUnits];
  const allGradesArr = [...allGrades];

  const allUnitsValueArr = allUnitsArr.map((unit) => unit.textContent);
  const allGradesValueArr = allGradesArr.map((grade) => grade.textContent);
  const gradeConversion = { A: 5, B: 4, C: 3, D: 2, E: 1, F: 0 };
  const gradeToNum = allGradesValueArr.map((grade) => gradeConversion[grade]);

  const allGradePoints = gradeToNum.map(
    (grade, i) => grade * Number(allUnitsValueArr[i])
  );

  const totalGradeScore = allGradePoints.reduce((acc, curr) => {
    return acc + Number(curr);
  }, 0);

  const totalUnit = allUnitsValueArr.reduce((acc, curr) => {
    return acc + Number(curr);
  }, 0);
  const gp = totalGradeScore / totalUnit;

  const cgpa = (totalGradeScore + tcp) / (totalUnit + tnu);

  document.querySelector("#gp-result").textContent = `Your GPA: ${gp.toFixed(
    2
  )}`;

  if (tnu && tcp) {
    document.querySelector("#cgpa-result").classList.remove("hide");
    document.querySelector(
      "#cgpa-result"
    ).textContent = `Your New CGPA: ${cgpa.toFixed(2)}`;
  }
});

cgpaBtn.addEventListener("click", function () {
  if (tcpInput.value && tnuInput.value) {
    cgpaInputEl.classList.remove("hide");
    tcpText.textContent = tcpInput.value;
    tnuText.textContent = tnuInput.value;
    tcp = Number(tcpInput.value);
    tnu = Number(tnuInput.value);
    tcpInput.value = "";
    tnuInput.value = "";
  }
});

gpBtn.addEventListener("click", function (e) {
  calcBtn.classList.remove("hide");
  if (
    courseCodeInput.value &&
    courseUnitInput.value &&
    courseSelectInput.value
  ) {
    e.preventDefault();
    table.classList.remove("hide");
    courseUpdateEl.classList.remove("hide");

    tbody.innerHTML += `<tr class="myTableRow">
  <th scope="row">
    
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-trash ml-3 text-dark icon course-del-icon"
      viewBox="0 0 16 16"
      
    >
    
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"></path>
      
      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"></path>
      
    </svg>
  </th>
  <td>${courseCodeInput.value.toUpperCase()}</td>
  <td class="unit-calc">${courseUnitInput.value}</td>
  <td class="grade-calc">${courseSelectInput.value}</td>
</tr>
`;

    courseUpdateEl.textContent = ` Number of course: ${tbody.children.length}`;
  }
});

tbody.addEventListener("click", function (e) {
  const deleteIcon = e.target.closest(".course-del-icon");

  if (deleteIcon) {
    const row = deleteIcon.closest(".myTableRow");
    if (row) {
      row.remove();
      courseUpdateEl.textContent = ` Number of course: ${tbody.children.length}`;
    }
  }
});
