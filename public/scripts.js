let cards = {
  major: [],
  cups: [],
  pentacles: [],
  swords: [],
  wands: []
};


let majorNames = [
  "Fool",
  "Magician",
  "High Priestess",
  "Empress",
  "Emperor",
  "Hierophant",
  "Lovers",
  "Chariot",
  "Strength",
  "Hermit",
  "Wheel of Fortune",
  "Justice",
  "Hanged Man",
  "Death",
  "Temperance",
  "Devil",
  "Tower",
  "Star",
  "Moon",
  "Sun",
  "Judgement",
  "World"
];

let minorNames = [
  {
    abbr: "p",
    name: "Page"
  },
  {
    abbr: "n",
    name: "Knight"
  },
  {
    abbr: "q",
    name: "Queen"
  },
  {
    abbr: "k",
    name: "King"
  }
];

for (let i = 0; i < 22; i++) {
  cards.major.push({
    file: "./img/tarot/major/" + i + "m.jpg",
    name: "The " + majorNames[i]
  });

  if (!i) continue;

  if (i < 11) {
    cards.cups.push({
      file: "./img/tarot/cups/" + i + "c.jpg",
      name: i + " of Cups"
    });
    cards.pentacles.push({
      file: "./img/tarot/pentacles/" + i + "p.jpg",
      name: i + " of Pentacles"
    });
    cards.swords.push({
      file: "./img/tarot/swords/" + i + "s.jpg",
      name: i + " of Swords"
    });
    cards.wands.push({
      file: "./img/tarot/wands/" + i + "w.jpg",
      name: i + " of Wands"
    });
    continue;
  }

  if (i < 15) {
    let minorNameIndex = i - 11;
    let cardAbbr = minorNames[minorNameIndex].abbr;
    let cardName = minorNames[minorNameIndex].name;

    cards.cups.push({
      file: "./img/tarot/cups/" + cardAbbr + "c.jpg",
      name: "The " + cardName + " of Cups"
    });
    cards.pentacles.push({
      file: "./img/tarot/pentacles/" + cardAbbr + "p.jpg",
      name: "The " + cardName + " of Pentacles"
    });
    cards.swords.push({
      file: "./img/tarot/swords/" + cardAbbr + "s.jpg",
      name: "The " + cardName + " of Swords"
    });
    cards.wands.push({
      file: "./img/tarot/wands/" + cardAbbr + "w.jpg",
      name: "The " + cardName + " of Wands"
    });
  }
}

let deck = [];

function refillDeck() {
  let cardsCopy = {
    major: cards.major.slice(),
    cups: cards.cups.slice(),
    pentacles: cards.pentacles.slice(),
    swords: cards.swords.slice(),
    wands: cards.wands.slice()
  };

  deck = [];

  while (Object.keys(cardsCopy).length) {
    let groups = Object.keys(cardsCopy);
    let groupIndex = Math.floor(Math.random() * groups.length);
    let group = groups[groupIndex];

    if (!cardsCopy[group].length) {
      delete cardsCopy[group];
      continue;
    }

    let cardIndex = Math.floor(Math.random() * cardsCopy[group].length);
    let card = cardsCopy[group][cardIndex];

    deck.push(card);
    cardsCopy[group].splice(cardIndex, 1);
  }
}

function refillTable() {
  let table = document.getElementById("cards-table");
  table.innerHTML = "";

  deck.forEach(function(card, i) {
    let cardElem = document.createElement("div");
    cardElem.classList.add("cards");
    cardElem.setAttribute("id", "card-" + i);
    cardElem.addEventListener("click", cardOnClick);
    table.appendChild(cardElem);
  });
}

function cardOnClick(event) {
  let elem = event.target;
  let cardId = elem.id.match(/\d+/)[0];
  let card = deck[cardId];
  let cardImgPreview = document.getElementById("card-preview-img");
  let cardDescription = document.getElementById("card-description");

  cardImgPreview.classList.remove("hidden");
  cardImgPreview.setAttribute("src", card.file);

  cardDescription.innerText = card.name;

  elem.classList.add("picked");
  elem.removeEventListener("click", cardOnClick);
}

function clearTable() {
  let cardImgPreview = document.getElementById("card-preview-img");
  let cardDescription = document.getElementById("card-description");

  cardImgPreview.classList.add("hidden");
  cardDescription.innerText = "[ Card Description ]";

  refillDeck();
  refillTable();
}

window.onload = function() {
  refillDeck();
  refillTable();
};
