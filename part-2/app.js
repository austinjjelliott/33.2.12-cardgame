url = "https://deckofcardsapi.com/api/deck";

// 1. Make a request to the Deck of Cards API to request a single card from a newly
// shuffled deck. Once you have the card, console.log the value and the suit
// (e.g. “5 of spades”, “queen of diamonds”).

$.getJSON(`${url}/new/draw`).then((res) => {
  console.log(`You were dealt ${res.cards[0].value} of ${res.cards[0].suit}`);
});

// or

$.getJSON(`${url}/new/draw`).then((res) => {
  let { suit, value } = res.cards[0];
  console.log(`You were dealt the ${value} of ${suit}`);
});

// 2. Make a request to the Deck of Cards API to request a single card from a
// newly shuffled deck. Once you have the card, console.log the value and the
// suit (e.g. “5 of spades”, “queen of diamonds”).

$.getJSON(`${url}/new/draw`)
  .then((res) => {
    firstCard = res.cards[0];
    let deckId = res.deck_id;
    return $.getJSON(`${url}/${deckId}/draw`);
  })
  .then((res) => {
    let secondCard = res.cards[0];
    [firstCard, secondCard].forEach(function (card) {
      console.log(`${card.value} of ${card.suit}`);
    });
  });

//   3. Build an HTML page that lets you draw cards from a deck. When the page loads,
//   go to the Deck of Cards API to create a new deck, and show a button on the
//   page that will let you draw a card. Every time you click the button, display
//   a new card, until there are no cards left in the deck.

let deckId = null;
let $btn = $("button");
let $cardArea = $("#card-area");

$.getJSON(`${url}/new/shuffle/`).then((res) => {
  deckId = res.deck_id;
  $btn.show();
});

$btn.on("click", function () {
  $.getJSON(`${url}/${deckId}/draw/`).then((res) => {
    let cardImage = res.cards[0].image;
    $cardArea.append($("<img>").attr("src", cardImage));
    if (res.remaining === 0) alert("game over");
  });
});

//   $btn.on('click', function() {
//     $.getJSON(`${baseURL}/${deckId}/draw/`).then(data => {
//       let cardSrc = data.cards[0].image;
//       let angle = Math.random() * 90 - 45;
//       let randomX = Math.random() * 40 - 20;
//       let randomY = Math.random() * 40 - 20;
//       $cardArea.append(
//         $('<img>', {
//           src: cardSrc,
//           css: {
//             transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
//           }
//         })
//       );
//       if (data.remaining === 0) $btn.remove();
//     });
//   });
// });
