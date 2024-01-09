function add() {
  const coursesContainer = document.getElementById("courses-container");

  const newCourse = document.createElement("div");
  newCourse.classList.add("course");

  newCourse.innerHTML = `
        <input type="text" placeholder="Course/Semester" class="course-name">
        <input type="number" placeholder="Credit" class="credit">
        <input type="number" placeholder="CGPA" class="cgpa">
        <button class="delete-btn" onclick="deleteCourse(this)">X</button>
    `;

  coursesContainer.appendChild(newCourse);
}

function deleteCourse(button) {
  const course = button.parentElement;
  const coursesContainer = document.getElementById("courses-container");
  coursesContainer.removeChild(course);
}

function calculateCGPA() {
  const courses = document.getElementsByClassName("course");
  let totalCGPA = 0;
  let totalCredits = 0;
  let invalidInput = false;

  for (let i = 0; i < courses.length; i++) {
    const creditInput = courses[i].getElementsByClassName("credit")[0];
    const cgpaInput = courses[i].getElementsByClassName("cgpa")[0];

    const credit = parseFloat(creditInput.value);
    const cgpa = parseFloat(cgpaInput.value);

    if (isNaN(credit) || isNaN(cgpa)) {
      invalidInput = true;
      break;
    }

    totalCGPA += credit * cgpa;
    totalCredits += credit;
  }

  const resultContainer = document.getElementById("result-container");
  const totalCGPAElement = document.getElementById("total-cgpa");

  if (invalidInput) {
    totalCGPAElement.textContent = "Invalid input. Please enter valid numbers.";
    resultContainer.style.display = "block";
  } else if (totalCredits > 0) {
    const finalCGPA = totalCGPA / totalCredits;
    totalCGPAElement.textContent = finalCGPA.toFixed(2);
    resultContainer.style.display = "block";
  } else {
    totalCGPAElement.textContent = "0.0";
    resultContainer.style.display = "none";
  }
}

function clearAllData() {
  const coursesContainer = document.getElementById("courses-container");

  // Keep at least three course sections by default
  while (coursesContainer.childElementCount > 3) {
    coursesContainer.removeChild(coursesContainer.lastChild);
  }

  // Reset the values in the remaining course sections
  const courseInputs = coursesContainer.querySelectorAll(".course input");
  courseInputs.forEach((input) => {
    input.value = "";
  });

  const resultContainer = document.getElementById("result-container");
  document.getElementById("total-cgpa").textContent = "0.0"; // Reset total CGPA
}

function onPageLoad() {
  clearAllData();

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
  }
}

onPageLoad();