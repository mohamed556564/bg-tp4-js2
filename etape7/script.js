"use strict";

// Slide 38-40 : Types complexes - Tableaux et Tableaux d'objets
const persons = [
    { nom: "nom-1", prenom: "prenom-1", points: 5 },
    { nom: "nom-2", prenom: "prenom-2", points: 10 },
    { nom: "nom-3", prenom: "prenom-3", points: 15 }
];

let lignes = 0;
let totalPoints = 0;

init();

function doNewData() {
    // Slide 61-64 : Manipulation du DOM (getElementById)
    const elt_nom = document.getElementById("form_nom");
    const elt_prenom = document.getElementById("form_prenom");
    const elt_points = document.getElementById("form_points");

    // Slide 41-42 : Opérateurs logiques, rationnels et conditions If...else
    if (elt_nom.value === "" || elt_prenom.value === "" || Number.isNaN(elt_points.value)) {
        // Slide 116 : Le BOM - alert()
        alert("Formulaire incomplet !");
    } else {

        const nom = elt_nom.value;
        const prenom = elt_prenom.value;
        const points = parseInt(elt_points.value);

        doInsert(nom, prenom, points);

        // Slide 38 : Manipulation de tableaux (Méthode push)
        persons.push({ nom: nom, prenom: prenom, points: points });

        elt_nom.value = "";
        elt_prenom.value = "";
        elt_points.value = "";
    }
}


function init() {
    // Slide 44 : Les Boucles (Boucle for...of pour parcourir un tableau)
    for (let v of persons) {
        doInsert(v.nom, v.prenom, v.points);
    }
}

function doInsert(nom, prenom, points) {
    doInsertRowTable(++lignes, nom, prenom, points);
    totalPoints += points;
    updateSummary();
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

function updateSummary() {
    // Slide 61-64 : Manipulation du DOM (getElementById et innerHTML)
    const element_lignes = document.getElementById("p1");
    const element_points = document.getElementById("p3");
    element_lignes.innerHTML = lignes + " ligne(s)";
    element_points.innerHTML = "Total des points : " + totalPoints;
}

function deleteRow() {
    // Slide 41-42 : Les conditions (If...else)
    if (lignes === 0) {
        // Slide 116 : Le BOM - alert()
        alert("Aucune ligne à supprimer !");
        return;
    }

    // Slide 76-78 : Manipulation du DOM (querySelectorAll et querySelector)
    const table = document.querySelector("table");
    const rows = table.querySelectorAll("tr"); // rows[0] = entête

    // Compter les lignes cochées
    let nbCochees = 0;
    // Slide 44 : Les boucles (boucle for classique)
    for (let i = 1; i < rows.length; i++) {
        // Slide 78 & 93 : Manipulation du DOM (accès direct à l'input et vérification)
        if (rows[i].querySelector("input").checked) {
            nbCochees++;
        }
    }

    if (nbCochees === 0) {
        alert("Sélectionnez au moins une ligne !");
        return;
    }

    // Slide 116 : Le BOM - Boîte de dialogue confirm()
    if (!confirm("Voulez-vous vraiment supprimer la sélection ?")) {
        return;
    }

    // Parcours à l'envers (de la fin vers le début) pour que les index restent bons
    for (let i = rows.length - 1; i >= 1; i--) {
        if (rows[i].querySelector("input").checked) {
            // Slide 38 : Manipulation de tableaux (Méthode splice pour supprimer un élément)
            persons.splice(i - 1, 1); // retirer de persons (i-1 car rows[0] = entête)

            // Slide 100 : Manipulation du DOM (Méthode remove pour retirer l'élément du DOM)
            rows[i].remove();
        }
    }

    // Recalculer lignes et total_points
    lignes = persons.length;
    totalPoints = 0;

    // Slide 44 : Les boucles (boucle for...of pour parcourir le tableau d'objets)
    for (const p of persons) {
        totalPoints += p.points;
    }

    // Renuméroter les lignes restantes
    const newRows = table.querySelectorAll("tr");
    for (let i = 1; i < newRows.length; i++) {
        // Slide 91 : Manipulation du DOM (modification du contenu via textContent)
        newRows[i].cells[0].textContent = i;
    }

    updateSummary();
}

function consoleTableau() {
    // Slide 33 : Utilisation de la console
    console.log(persons);
}

// Variable globale pour garder la dernière liste affichée (filtrée ou non)
let listeActuelle = persons.slice();

// Fonction de tri
function trier() {
    let critere = document.getElementById("selectTri").value;

    // Récupérer ce qu'il y a dans les champs de recherche au moment de cliquer sur trier
    let nomRech = document.getElementById("form_nom").value.toLowerCase();
    let prenomRech = document.getElementById("form_prenom").value.toLowerCase();
    let pointsRech = document.getElementById("form_points").value;

    // Déterminer si un filtre est actif
    let estFiltre = (nomRech !== "" || prenomRech !== "" || pointsRech !== "");

    if (estFiltre) {
        // S'il y a un filtre actif, on filtre à partir de 'persons'
        listeActuelle = persons.filter(function(p) {
            let matchNom = nomRech === "" || p.nom.toLowerCase().includes(nomRech);
            let matchPrenom = prenomRech === "" || p.prenom.toLowerCase().includes(prenomRech);
            let matchPoints = pointsRech === "" || p.points.toString() === pointsRech;
            return matchNom && matchPrenom && matchPoints;
        });
    } else {
        // Sinon, on prend tout le monde !
        listeActuelle = persons.slice() ;
    }

    // Appliquer le tri selon le choix du menu
    if (critere === "nom") {
        listeActuelle.sort((a, b) => a.nom.localeCompare(b.nom));
    } else if (critere === "points-des") {
        listeActuelle.sort((a, b) => b.points - a.points); // Du plus grand au plus petit
    } else if (critere === "points-asd") {
        listeActuelle.sort((a, b) => a.points - b.points); // Du plus petit au plus grand
    } else {
        alert("Veuillez choisir un critère de tri valide !");
        return;
    }

    //Afficher le résultat trié
    afficherListe(listeActuelle);
}

// Fonction standard pour afficher tout le tableau (ex: après un ajout ou réinitialisation)
function afficherTableau() {
    listeActuelle = persons.slice();
    afficherListe(listeActuelle);
}

// Fonction de recherche
function find() {
    let inputNom = document.getElementById("form_nom");
    let inputPrenom = document.getElementById("form_prenom");
    let inputPoints = document.getElementById("form_points");

    let nomRecherche = inputNom.value.toLowerCase();
    let prenomRecherche = inputPrenom.value.toLowerCase();
    let pointsRecherche = inputPoints.value;

    // Filtrer le tableau 'persons'
    listeActuelle = persons.filter(function (p) {
        let correspondNom = nomRecherche === "" || p.nom.toLowerCase().includes(nomRecherche);
        let correspondPrenom = prenomRecherche === "" || p.prenom.toLowerCase().includes(prenomRecherche);
        let correspondPoints = pointsRecherche === "" || p.points.toString() === pointsRecherche;

        return correspondNom && correspondPrenom && correspondPoints;
    });

    // Afficher les résultats filtrés
    afficherListe(listeActuelle);
}

// Fonction unique pour mettre à jour l'affichage HTML du tableau
function afficherListe(liste) {
    let tableau = document.querySelector("table");

    // Supprimer toutes les lignes actuelles du tableau SAUF l'en-tête (th)
    let lignesTableau = tableau.querySelectorAll("tr");
    for (let i = 1; i < lignesTableau.length; i++) {
        lignesTableau[i].remove(); // (Slide sur la manipulation du DOM / suppression de nœuds)
    }

    lignes = 0;
    totalPoints = 0;

    // Insérer chaque personne de la liste active
    for (let v of liste) {
        doInsert(v.nom, v.prenom, v.points);
    }

    updateSummary();
}