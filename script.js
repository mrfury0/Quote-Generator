// Get Quote from API
const quoteContainer = document.getElementById("quote-container");

const quoteText = document.getElementById("quote");

const authorText = document.getElementById("author");

const twitterBtn = document.getElementById("twitter");

const newQuoteBtn = document.getElementById("new-quote");

const loader = document.getElementById("loader");

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

async function getQuote() {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl = "https://type.fit/api/quotes";
  try {
    loading();
    const response = await fetch(apiUrl);
    const data = await response.json();

    let rand = Math.floor(Math.random() * 1643);

    if (data[rand].author == null) {
      authorText.innerText = "Anonymous";
    } else {
      authorText.innerText = data[rand].author;
    }

    if (data[rand].text.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }

    quoteText.innerText = data[rand].text;
  } catch (error) {
    console.log("whoops, no quote", error);
  }

  complete();
}

function tweetQuote() {
  const quote = quoteText.innerText;

  const author = authorText.innerText;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote}-${author}`;
  window.open(twitterUrl, "_blank");
}

twitterBtn.addEventListener("click", tweetQuote);

newQuoteBtn.addEventListener("click", getQuote);

getQuote();
