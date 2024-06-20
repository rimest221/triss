const griglia = document.getElementById("griglia");
const messaggio = document.getElementById("messaggio");
let turno = "X";

function inizializzaGriglia() {
  griglia.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cella = document.createElement("div");
    cella.classList.add("cell");
    cella.addEventListener("click", () => faiMossa(cella, i));
    griglia.appendChild(cella);
  }
}

function faiMossa(cella, indice) {
  if (messaggio.textContent.includes("vince") || cella.textContent !== "") {
    return;
  }

  cella.textContent = turno;
  verificaVincitore();
  turno = turno === "X" ? "O" : "X";
  if (
    !messaggio.textContent.includes("vince") &&
    !messaggio.textContent.includes("Pareggio")
  ) {
    messaggio.textContent = `Turno di ${turno}`;
  }
}

const combinazioniVincitrici = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function verificaVincitore() {
  let vittoria = false;
  combinazioniVincitrici.forEach((e) => {
    const [a, b, c] = e;
    console.log(a);
    const cellaA = griglia.children[a];
    const cellaB = griglia.children[b];
    const cellaC = griglia.children[c];
    if (
      cellaA.textContent &&
      cellaA.textContent === cellaB.textContent &&
      cellaA.textContent === cellaC.textContent
    ) {
      vittoria = true;
      annunciaVincitore(cellaA.textContent);
    }
  });

  if (
    !vittoria &&
    Array.from(griglia.children).every((cella) => cella.textContent)
  ) {
    annunciaVincitore("Pareggio");
  }
}

function annunciaVincitore(vincitore) {
  if (vincitore === "Pareggio") {
    messaggio.textContent = "Pareggio!";
  } else {
    messaggio.textContent = `Giocatore ${vincitore} vince!`;
  }
  griglia.classList.add("none");
}

inizializzaGriglia();
messaggio.textContent = `Turno di ${turno}`;
