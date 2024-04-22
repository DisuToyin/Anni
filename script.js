// DOM
const swiper = document.querySelector("#swiper");
const like = document.querySelector("#like");
const dislike = document.querySelector("#dislike");

// constants
const urls = [
  "./images/MD5.jpeg",
  "./images/MD4.jpeg",
  "./images/MD3.jpeg",
  "./images/MD2.jpeg",
  "./images/MD1.jpeg",
  "./images/MD6.jpeg",
  "./images/MD7.jpeg",
  "./images/MD8.jpeg",
  "./images/MD9.jpeg",
  "./images/MD10.jpeg",
];

// variables
let cardCount = 0;

// functions
function appendNewCard() {
  const card = new Card({
    imageUrl: urls[cardCount % 5],
    onDismiss: appendNewCard,
    onLike: () => {
      like.style.animationPlayState = "running";
      like.classList.toggle("trigger");
    },
    onDislike: () => {
      dislike.style.animationPlayState = "running";
      dislike.classList.toggle("trigger");
    },
  });
  swiper.append(card.element);
  cardCount++;

  const cards = swiper.querySelectorAll(".card:not(.dismissing)");
  cards.forEach((card, index) => {
    card.style.setProperty("--i", index);
  });
}

// first 5 cards
for (let i = 0; i < 5; i++) {
  appendNewCard();
}
