showNotes();

// if someone enters a note 

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function(e) {

    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let myObj = {
        title: addTitle.value,
        text: addTxt.value

    }
    if (addTxt.value && addTitle.value) {
        notesObj.push(myObj);
    }
    localStorage.setItem('notes', JSON.stringify(notesObj));
    if (addTxt.value && addTitle.value) {
        addTxt.value = "";
        addTitle.value = "";
    }
    showNotes();

})

// function to show elements from local storage
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";

    notesObj.forEach(function(element, index) {
        html += `
            <div class=" noteCard card my-2 mx-2" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title"> ${element.title}</h5>
                        <p class = "card-text"> ${element.text}</p>
                        <button id = "${index}" onclick= "deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
    });

    let notesElm = document.getElementById('notes')
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `<h5> Nothing to show use : "Add Note"</h5>`
    }

}

// function to delete a note

function deleteNote(index) {

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));


    showNotes();

}

let search = document.getElementById('searchTxt');
search.addEventListener('input', function() {

    let inputVal = search.value;
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        let titlename = element.getElementsByTagName('h5')[0].innerText;
        if (cardTxt.includes(inputVal) || titlename.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = 'none';
        }

    });



})