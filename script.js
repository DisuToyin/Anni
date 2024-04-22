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
let timer; // Variable to hold the timer for automatic sliding

// functions
function appendNewCard() {
  const card = new Card({
    imageUrl: urls[cardCount % urls.length],
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

function startSliding() {
  timer = setInterval(() => {
    // Simulate swipe gesture to dismiss current card and reveal the next one
    const currentCard = swiper.querySelector(".card:not(.dismissing)");
    if (currentCard) {
      currentCard.style.transition = "transform 1s";
      currentCard.style.transform = `translate(${window.innerWidth}px, 0) rotate(90deg)`;
      currentCard.classList.add("dismissing");
      setTimeout(() => {
        currentCard.remove();
        appendNewCard();
      }, 1000);
    }
  }, 3000); // Adjust the interval here (in milliseconds)
}

startSliding();

// Stop sliding when mouse enters the swiper
swiper.addEventListener("mouseenter", () => {
  clearInterval(timer);
});

// Resume sliding when mouse leaves the swiper
swiper.addEventListener("mouseleave", () => {
  startSliding();
});

// Initialize first 10 cards
for (let i = 0; i < 10; i++) {
  appendNewCard();
}
