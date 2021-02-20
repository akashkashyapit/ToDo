showNotes();

// add Notes
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let color = document.getElementById("color");
  let addTitle = document.getElementById("addTitle");
  if (addTitle.value.trim() != 0) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    let data = {
      title: addTitle.value,
      text: addTxt.value,
      color: color.value.toLowerCase(),
    };
    let check = true;
    notesObj.forEach(function (e) {
      if (addTitle.value === e.title) {
        check = false;
      }
    });
    if (check) {
      notesObj.push(data);
    }

    localStorage.setItem("notes", JSON.stringify(notesObj));
  }
  addTxt.value = "";
  addTitle.value = "";
  (color.value = ""), showNotes();
});

// Show notes
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  let clr = "bg-green";
  notesObj.forEach(function (element, index) {
    html += `
            <div class="noteCard ${element.color}">
            <h5 class="notenumber"> ${index + 1}</h5><div class="button">
            <a class="edit" id="${index}" onclick="editNotes(this.id)"><img src="./img/pencil.png"  height="30"/></a>
            <a class="remove" id="${index}" onclick="deleteNotes(this.id)"><img src="./img/remove.png"  height="30"/></a>
            </div>
            
                <h3 class="titletext">${element.title}</h3>
                <div class="notetext"><p id="editText">${
                  element.text
                }</p></div>                
                
            </div>
          `;
  });
  let noteElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    noteElm.innerHTML = html;
  } else {
    noteElm.innerHTML = `Nothing to Show`;
  }
}

// Delete
function deleteNotes(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

// Search
let searchTxt = document.getElementById("search");
searchTxt.addEventListener("input", function () {
  let inputVal = searchTxt.value.toLowerCase();
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTitle = element
      .getElementsByTagName("h3")[0]
      .innerText.toLowerCase();
    let cardText = element.getElementsByTagName("p")[0].innerText.toLowerCase();
    if (cardTitle.includes(inputVal) || cardText.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

// Edit notes
function editNotes(index) {
  let saveInput = document.getElementById("saveInput");
  let saveBtn = document.getElementById("saveBtn");
  let addBtn = document.getElementById("addBtn");
  let notes = localStorage.getItem("notes");
  let notesObj = JSON.parse(notes);
  saveInput.value = index;
  let addTxt = document.getElementById("addTxt");
  let color = document.getElementById("color");
  addTxt.value = notesObj[index].text;
  color.value = notesObj[index].color;
  let addTitle = document.getElementById("addTitle");
  addTitle.value = notesObj[index].title;
  addBtn.style.display = "none";
  saveBtn.style.display = "block";
}

// Save edit note
let saveBtn = document.getElementById("saveBtn");
saveBtn.addEventListener("click", function () {
  let addBtn = document.getElementById("addBtn");
  let notes = localStorage.getItem("notes");
  let notesObj = JSON.parse(notes);
  let saveInput = document.getElementById("saveInput").value;
  notesObj[saveInput].text = addTxt.value;
  notesObj[saveInput].title = addTitle.value;
  notesObj[saveInput].color = color.value;
  addBtn.style.display = "block";
  saveBtn.style.display = "none";
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
  color.value = "";
  showNotes();
});
