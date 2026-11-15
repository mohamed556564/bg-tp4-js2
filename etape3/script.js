"use strict";

// Slide 38-40 : Types complexes - Tableaux et Tableaux d'objets
const persons = [
    { nom: "nom-1", prenom: "prenom-1", points: 5 },
    { nom: "nom-2", prenom: "prenom-2", points: 10 },
    { nom: "nom-3", prenom: "prenom-3", points: 15 }
];

let lignes = 0;


init();

function init() {
    // Slide 44 : Les Boucles (Boucle for...of pour parcourir un tableau)
    for (let v of persons) {
        doInsert(v.nom, v.prenom, v.points);
    }
}

function doInsert(nom, prenom, points) {
    doInsertRowTable(++lignes, nom, prenom, points);
}


function doInsertRowTable(num, nom, prenom, points) {
    // Slide 66-69 : Manipulation du DOM (getElementsByTagName)
    const table = document.getElementsByTagName("table")[0];

    // Slide 104 : Manipulation du DOM (Création d'éléments : createElement)
    const row = document.createElement("tr");

    const cellNum = document.createElement("td");
    const cellNom = document.createElement("td");
    const cellPrenom = document.createElement("td");
    const cellPoints = document.createElement("td");
    const cellActions = document.createElement("td");

    // Slide 91 : Manipulation du DOM (Propriétés innerText et innerHTML)
    cellNum.innerText = num;
    cellNom.innerText = nom;
    cellPrenom.innerText = prenom;
    cellPoints.innerText = points;
    cellActions.innerHTML = "<input type=\"checkbox\" />";

    // Slide 107 : Manipulation du DOM (Méthode setAttribute)
    cellNum.setAttribute("class", "col_number");
    cellNom.setAttribute("class", "col_text");
    cellPrenom.setAttribute("class", "col_text");
    cellPoints.setAttribute("class", "col_number");
    cellActions.setAttribute("class", "col_checkbox");

    // Slide 98 & 103 : Manipulation du DOM (Méthode append)
    row.append(cellNum);
    row.append(cellNom);
    row.append(cellPrenom);
    row.append(cellPoints);
    row.append(cellActions);

    table.append(row);
    /*  
    lorsque l'on actualise la page, les données sont perdues.

    car le DOM est recréé à chaque fois que l'on recharge la page.
    */
}

function consoleTableau() {
    // Slide 33 : Utilisation de la console
    console.log(persons);
}