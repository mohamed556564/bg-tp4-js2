"use strict"

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