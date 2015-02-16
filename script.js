/* Created by muriele on 03.01.15. */

var saveButton = document.querySelector('.save');
var inputName = document.querySelector('.name');
var inputSurname = document.querySelector('.surname');
var patientListBodyElement = document.querySelector('#patientlist tbody');
var inputSearch = document.querySelector('input.search');
var patientList = document.querySelector('#patientlist table');
var addAntiBodyButton = document.querySelector('.addAntiBody');
var removeAntiBodyButton = document.querySelector('.removeAntiBody');


function checkStorage() {
    var patientStorage = JSON.parse(localStorage.getItem("storedPatientArray"));
    if (patientStorage == null) patientStorage = [];
    if (patientStorage.length > 0) {
        var text = '';
        var i;
        for (i = 0; i < patientStorage.length; i++) {
            var currentpat = patientStorage[i];
            text += "<tr><td>" + currentpat.surname + "</td>";
            text += "<td>" + currentpat.name + "</td>";
            text += "<td>" + currentpat.sex + "</td>";
            text += "<td>" + currentpat.bloodType + "</td>";
            text += "<td>" + currentpat.antiBody + "<span class='glyphicon glyphicon-remove' onclick='removePatient(this)'></span></td></tr>";
        }
        patientListBodyElement.innerHTML = text;
    }
    else {
        text = "<tr><td colspan='4'>Es sind keine Patienten in der Datenbank vorhanden</td></tr>";
        patientListBodyElement.innerHTML = text;
    }
}

checkStorage();

var addedAntiBodyArray = [];

function handleAddAntiBody() {
    var selectedAntiBody = document.querySelector('#possibleAntiBody option:checked');
    document.querySelector('#addedAntiBody').appendChild(selectedAntiBody);
    addedAntiBodyArray.push(selectedAntiBody.value);
}


addAntiBodyButton.addEventListener('click', handleAddAntiBody);

function handleRemoveAntiBody() {
    var selectedAntiBody = document.querySelector('#addedAntiBody option:checked');
    document.querySelector('#possibleAntiBody').appendChild(selectedAntiBody);
}

removeAntiBodyButton.addEventListener('click', handleRemoveAntiBody);

var handleclicksave = function () {
    if (inputName.validity.valid == true && inputSurname.validity.valid == true) {
        setLocalStorage();
        updateTable();
        inputName.value = '';
        inputSurname.value = '';
    }
    else {
        document.querySelector('span.required').innerHTML = "Bitte füllen Sie die Pflichtfelder aus.";
    }
};

function setLocalStorage() {
    var storedPatients = JSON.parse(localStorage.getItem("storedPatientArray"));
    if (storedPatients == null) storedPatients = [];
    var sex = document.querySelector('input[name="sex"]:checked').value;
    var bloodType = document.querySelector('input[name="bloodType"]:checked').value;
    var rhesus = document.querySelector('input[name="rhesus"]:checked').value;
    var addedAntiBody = document.querySelector('#addedAntiBody');
    var inputAntiBody = '';
    var x;
    if (addedAntiBody.length > 0) {
        inputAntiBody = addedAntiBodyArray.join();
    }
    else {
        inputAntiBody = "keine";
    }
    var patientObject = {
        name: inputName.value,
        surname: inputSurname.value,
        antiBody: inputAntiBody,
        sex: sex,
        bloodType: bloodType + " " + rhesus
    };
    localStorage.setItem("patientObject", JSON.stringify(patientObject));
    storedPatients.push(patientObject);
    localStorage.setItem("storedPatientArray", JSON.stringify(storedPatients));
}

function updateTable() {
    var patientStorage = JSON.parse(localStorage.getItem("storedPatientArray"));
    var text = '';
    var i;
    for (i = 0; i < patientStorage.length; i++) {
        var currentpat = patientStorage[i];
        text += "<tr><td>" + currentpat.surname + "</td>";
        text += "<td>" + currentpat.name + "</td>";
        text += "<td>" + currentpat.sex + "</td>";
        text += "<td>" + currentpat.bloodType + "</td>";
        text += "<td>" + currentpat.antiBody + "<span class='glyphicon glyphicon-remove' onclick='removePatient(this)'></span></td></tr>";
    }
    patientListBodyElement.innerHTML = text;

}
saveButton.addEventListener('click', handleclicksave);


var handlesearch = function () {

    var rowNr;

    for (var rowIndex = 0; rowIndex < patientList.rows.length; rowIndex++) {
        var rowData = '';

        if (rowIndex == 0) {
            rowNr = patientList.rows.item(rowIndex).cells.length;
            continue;
        }

        for (var colIndex = 0; colIndex < rowNr; colIndex++) {
            rowData += patientList.rows.item(rowIndex).cells.item(colIndex).textContent;
        }

        if (rowData.toUpperCase().indexOf(inputSearch.value.toUpperCase()) == -1) {
            patientList.rows.item(rowIndex).style.display = 'none';
        }
        else {
            patientList.rows.item(rowIndex).style.display = 'table-row';
        }
    }

};
inputSearch.addEventListener('keyup', handlesearch);


function removePatient(clickedElement) {
    var ask = confirm("Soll der Patient wirklich gelöscht werden?");
    if (ask == true) {
        var td = clickedElement.parentNode;
        var tr = td.parentNode.rowIndex;
        console.log(tr);
        var patientStorage = JSON.parse(localStorage.getItem("storedPatientArray"));
        var x = tr - 1;
        patientStorage.splice(x, 1);
        localStorage.setItem("storedPatientArray", JSON.stringify(patientStorage));
        window.location.reload();
    }
    else {
    }
}


