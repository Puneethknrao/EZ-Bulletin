// variables
const generalBtn = document.getElementById("genral");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sport");
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

// Array
var newsDataArr = [];

// apis
const API_KEY = "ba9b29b424ad4860ae2f3f30097de699";
const HEADLINES_NEWS =
  "https://newsapi.org/v2/top-headlines?country=in&apiKey=";
const GENERAL_NEWS =
  "https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=";
const BUSINESS_NEWS =
  "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=";
const SPORTS_NEWS =
  "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=";
const ENTERTAINMENT_NEWS =
  "https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=";
const TECHNOLOGY_NEWS =
  "https://newsapi.org/v2/top-headlines?country=in&category=technology&pageSize=8&apiKey=";
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";

// window.onload = function () {
//   newsType.innerHTML = "<h4>Headlines</h4>";
//   fetchHeadlines();
// };
generalBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>General news</h4>";
  fetchGeneralNews();
});

businessBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Business</h4>";
  fetchBusinessNews();
});

sportsBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Sports</h4>";
  fetchSportsNews();
});

entertainmentBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Entertainment</h4>";
  fetchEntertainmentNews();
});

technologyBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Technology</h4>";
  fetchTechnologyNews();
});

searchBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Search : " + newsQuery.value + "</h4>";
  fetchQueryNews();
});

const btn = document.querySelector(".talk");
const content = document.querySelector(".content");

function speak(sentence) {
  const text_speak = new SpeechSynthesisUtterance(sentence);

  text_speak.rate = 1;
  text_speak.pitch = 1;

  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  var day = new Date();
  var hr = day.getHours();

  if (hr >= 0 && hr < 12) {
    speak("Hello Good Morning");
  } else if (hr == 12) {
    speak("Hello Good noon");
  } else if (hr > 12 && hr <= 17) {
    speak("Hello Good Afternoon");
  } else {
    speak("Hello Good Evening");
  }
}

window.addEventListener("load", () => {
  speak("Activating News App");
  speak("Going online");
  wishMe();
  newsType.innerHTML = "<h4>Headlines</h4>";
  setTimeout(fetchHeadlines, 9000);
});

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  content.textContent = transcript;
  speakThis(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
  recognition.start();
});

function speakThis(message) {
  const speech = new SpeechSynthesisUtterance();

  speech.text = "I did not understand what you said please try again";

  if (message.includes("hey") || message.includes("hello")) {
    const finalText = "Hello";
    speech.text = finalText;
  } else if (message.includes("how are you")) {
    const finalText = "I am fine tell me which news do you need";
    speech.text = finalText;
  } else if (message.includes("who developed you")) {
    const finalText = "I am created by MPW40 batch";
    speech.text = finalText;
  } else if (
    message.includes("get the latest news") ||
    message.includes("get the recent news") ||
    message.includes("headlines") ||
    message.includes("general news")
  ) {
    const finalText = "getting the recent news";
    speech.text = finalText;
    newsType.innerHTML = "<h4>General news</h4>";
    setTimeout(fetchGeneralNews, 3000);
  } else if (
    message.includes("get the business news") ||
    message.includes("business")
  ) {
    const finalText = "getting the business news";
    speech.text = finalText;
    newsType.innerHTML = "<h4>Business</h4>";
    setTimeout(fetchBusinessNews, 3000);
  } else if (
    message.includes("get the sports news") ||
    message.includes("sports")) {
    const finalText = "getting the sports news";
    speech.text = finalText;
    newsType.innerHTML = "<h4>Sports</h4>";
    setTimeout(fetchSportsNews, 3000);
  } else if (
    message.includes("get the technology news") ||
    message.includes("technology")
  ) {
    const finalText = "getting the technology news";
    speech.text = finalText;
    newsType.innerHTML = "<h4>Technology</h4>";
    setTimeout(fetchTechnologyNews, 3000);
  } else if (
    message.includes("get the entertainment news") ||
    message.includes("entertainment") ||
    message.includes("film")
  ) {
    const finalText = "getting the entertainment news";
    speech.text = finalText;
    newsType.innerHTML = "<h4>Entertainment</h4>";
    setTimeout(fetchEntertainmentNews, 3000);
  } else if (message.includes("read")) {
    const finalText = "reading out the news";
    speech.text = finalText;
    readNews(newsDataArr);
  } else if (message.includes("stop")) {
    const finalText = "okay";
    speech.text = finalText;
    readNews([], 1);
  } else if (message.includes("pause")) {
    const finalText = "okay paused";
    speech.text = finalText;
    readNews([], 2);
  } else if (message.includes("resume")) {
    const finalText = "okay";
    speech.text = finalText;
    readNews([], 3);
  } else if (message.includes("news on")) {
    console.log(message);
    const finalText = "getting the " + message;
    speech.text = finalText;
    newsType.innerHTML = "<h4>Search : " + message.substring(8) + "</h4>";
    setTimeout(fetchQueryNewsVoice(message.substring(8)), 5000);
  } else if (message.includes("open article ")) {
    msgArr = [];
    msgArr = message.split(".");
    articleNumberMsg = msgArr[0].substring(13);
    if (articleNumberMsg > newsDataArr.length) {
      newsType.innerHTML =
        "<h4>Opening article : No such article number " + "</h4>";
      const finalText =
        "there is no such article number, please ask for some other article number which is available";
      speech.text = finalText;
    } else {
      const finalText = "opening the" + message.substring(5);
      speech.text = finalText;
      newsType.innerHTML =
        "<h4>Opening article : " + articleNumberMsg + "</h4>";
      console.log(newsDataArr[articleNumberMsg].url);
      link = newsDataArr[articleNumberMsg - 1].url;
      setTimeout(function () {
        openArticle(link);
      }, 3000);
    }
  } else if (message.includes("time")) {
    const time = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    const finalText = time;
    speech.text = finalText;
  } else if (message.includes("date")) {
    const date = new Date().toLocaleString(undefined, {
      month: "short",
      day: "numeric",
    });
    const finalText = date;
    speech.text = finalText;
  }

  speech.volume = 1;
  speech.pitch = 1;
  speech.rate = 1;

  window.speechSynthesis.speak(speech);
}

function openArticle(link) {
  window.open(link, "_blank");
}

const fetchHeadlines = async () => {
  const response = await fetch(HEADLINES_NEWS + API_KEY);
  newsDataArr = [];
  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
    window.speechSynthesis.cancel();
  } else {
    // handle errors
    console.log(response.status, response.statusText);
    newsdetails.innerHTML = "<h5>No data found.</h5>";
    return;
  }

  displayNews();
};

const fetchGeneralNews = async () => {
  const response = await fetch(GENERAL_NEWS + API_KEY);
  newsDataArr = [];
  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
    window.speechSynthesis.cancel();
  } else {
    // handle errors
    console.log(response.status, response.statusText);
    newsdetails.innerHTML = "<h5>No data found.</h5>";
    return;
  }

  displayNews();
};

const fetchBusinessNews = async () => {
  const response = await fetch(BUSINESS_NEWS + API_KEY);
  newsDataArr = [];
  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
    window.speechSynthesis.cancel();
  } else {
    // handle errors
    console.log(response.status, response.statusText);
    newsdetails.innerHTML = "<h5>No data found.</h5>";
    return;
  }

  displayNews();
};

const fetchEntertainmentNews = async () => {
  const response = await fetch(ENTERTAINMENT_NEWS + API_KEY);
  newsDataArr = [];
  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    //console.log(myJson);
    newsDataArr = myJson.articles;
    window.speechSynthesis.cancel();
  }else {
    // handle errors
    console.log(response.status, response.statusText);
    newsdetails.innerHTML = "<h5>No data found.</h5>";
    return;
  }

  displayNews();
};

const fetchSportsNews = async () => {
  const response = await fetch(SPORTS_NEWS + API_KEY);
  newsDataArr = [];
  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
    window.speechSynthesis.cancel();
  } else {
    // handle errors
    console.log(response.status, response.statusText);
    newsdetails.innerHTML = "<h5>No data found.</h5>";
    return;
  }

  displayNews();
};

const fetchTechnologyNews = async () => {
  const response = await fetch(TECHNOLOGY_NEWS + API_KEY);
  newsDataArr = [];
  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
    window.speechSynthesis.cancel();
    //readNews(newsDataArr);
  } else {
    // handle errors
    console.log(response.status, response.statusText);
    newsdetails.innerHTML = "<h5>No data found.</h5>";
    return;
  }

  displayNews();
};
const fetchQueryNewsVoice = async (message) => {
  if (message == null) return;

  const response = await fetch(
    SEARCH_NEWS + encodeURIComponent(message) + "&apiKey=" + API_KEY
  );
  newsDataArr = [];
  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
    window.speechSynthesis.cancel();
    // readNews(newsDataArr);
  } else {
    //error handle
    console.log(response.status, response.statusText);
    newsdetails.innerHTML = "<h5>No data found.</h5>";
    return;
  }

  displayNews();
};
const fetchQueryNews = async () => {
  if (newsQuery.value == null) return;

  const response = await fetch(
    SEARCH_NEWS + encodeURIComponent(newsQuery.value) + "&apiKey=" + API_KEY
  );
  newsDataArr = [];
  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
    window.speechSynthesis.cancel();
    // readNews(newsDataArr);
  } else {
    //error handle
    console.log(response.status, response.statusText);
    newsdetails.innerHTML = "<h5>No data found.</h5>";
    return;
  }

  displayNews();
};

//text to speech
function readNews(newsDataArr, stop = 4) {
  if (stop === 1) {
    window.speechSynthesis.cancel();
  } else if (stop === 2) {
    window.speechSynthesis.pause();
  } else if (stop === 3) {
    window.speechSynthesis.resume();
  } else {
    var msg0 = new SpeechSynthesisUtterance();
    msg0.text = "reading the news";
    window.speechSynthesis.speak(msg0);
    for (i = 0; i < newsDataArr.length; i++) {
      var articleNum = new SpeechSynthesisUtterance();
      articleNum.text = "article number" + (i + 1);
      window.speechSynthesis.speak(articleNum);
      var msg = new SpeechSynthesisUtterance();
      msg.text = newsDataArr[i].title;
      window.speechSynthesis.speak(msg);
    }
  }
}

function displayNews() {
  newsdetails.innerHTML = "";

  // if(newsDataArr.length == 0) {
  //     newsdetails.innerHTML = "<h5>No data found.</h5>"
  //     return;
  // }
  var i = 0;
  newsDataArr.forEach((news) => {
    var date = news.publishedAt.split("T");

    var col = document.createElement("div");
    col.className = "col-sm-12 col-md-4 col-lg-3 p-2 card";

    var card = document.createElement("div");
    card.className = "p-2";

    var articleNumber = document.createElement("h6");
    articleNumber.className = "articleNumber";
    articleNumber.innerHTML = i + 1;
    i++;

    var image = document.createElement("img");
    image.setAttribute("height", "matchparent");
    image.setAttribute("width", "100%");
    image.src = news.urlToImage;

    var cardBody = document.createElement("div");

    var newsHeading = document.createElement("h5");
    newsHeading.className = "card-title";
    newsHeading.innerHTML = news.title;

    var dateHeading = document.createElement("h6");
    dateHeading.className = "text-primary";
    dateHeading.innerHTML = date[0];

    var discription = document.createElement("p");
    discription.className = "text-muted";
    discription.innerHTML = news.description;

    var link = document.createElement("a");
    link.className = "readMoreBtn";
    link.setAttribute("target", "_blank");
    link.href = news.url;
    link.innerHTML = "Read more";

    cardBody.appendChild(articleNumber);
    cardBody.appendChild(newsHeading);
    cardBody.appendChild(dateHeading);
    cardBody.appendChild(discription);
    cardBody.appendChild(link);

    card.appendChild(image);
    card.appendChild(cardBody);

    col.appendChild(card);

    newsdetails.appendChild(col);
    //console.log(newsdetails);
  });
}