"use strict";

const searchButton = document.querySelector(".btn-search");
const gifSlider = document.querySelector("#gif-slider");

const sliderGif = async function () {
  const response = await fetch(
    "https://api.giphy.com/v1/gifs/trending?api_key=pHD5zSJk4mAKyRfNBjt7d36WJLaNF6BO&q=trending&limit=50&offset=0&rating=g"
  );
  const gifs = await response.json();

  for (const gif of gifs.data) {
    const gifDiv = document.createElement("div");
    gifSlider.append(gifDiv);

    const sliderImage = document.createElement("img");
    sliderImage.setAttribute("src", gif.images.original.url);
    sliderImage.classList.add("gif_src");
    gifDiv.appendChild(sliderImage);
  }
  slider();
};
sliderGif();

// sliderJS
const slider = function () {
  $(".responsive").slick({
    slidesToShow: 5,
    slidesToScroll: 4,
    variableWidth: true,
    prevArrow: '<button class="slide-arrow prev-arrow">&#8668;</button>',
    nextArrow: '<button class="slide-arrow next-arrow">&#8669;</button>',

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
};
// EventListenr
const userInputValue = async function () {
  let gifSearchResult = document.querySelector("#gifserachresult");
  let inputValue = document.getElementById("search_bar").value;
  let url = `https://api.giphy.com/v1/gifs/search?api_key=pHD5zSJk4mAKyRfNBjt7d36WJLaNF6BO`;
  let topic = `&q=${inputValue}`;
  let limit = `&limit=50&offset=0&rating=g`;
  // heading
  const heading = document.querySelector(".heading");
  heading.style.display = "block";
  const showHeading = function () {
    if (inputValue === "") {
      heading.textContent = `input some value`;
      heading.style.color = "red";
    } else {
      heading.textContent = `Search Results Based on '${inputValue}'`;
      heading.style.color = "#fff";
    }
  };

  const response = await fetch(url + topic + limit);
  const gifs = await response.json();
  while (gifSearchResult.firstChild) {
    gifSearchResult.removeChild(gifSearchResult.firstChild);
  }

  for (const gif of gifs.data) {
    var searchImage = document.createElement("img");
    searchImage.setAttribute("src", gif.images.original.url);
    searchImage.classList.add("gif_search");
    gifSearchResult.appendChild(searchImage);
  }
  showHeading();
};
// search result input
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  userInputValue();
});
searchButton.addEventListener("keypress", (e) => {
  e.preventDefault();
  if (e.key === "Enter") {
    userInputValue();
  }
});

// JQuery
$(document).ready(function () {
  $(".has-megamenu").hover(function () {
    $(".btn-search").css("opacity", "0");
  }),
    $(".has-megamenu").mouseleave(function () {
      $(".btn-search").css("opacity", "1");
    });
});
// Tranding page
$(document).ready(async function () {
  if (window.location.href.indexOf("trandinggifs.html") > -1) {
    const trendingGifs = document.querySelector("#trendingGifs");
    const response = await fetch(
      "https://api.giphy.com/v1/gifs/trending?api_key=pHD5zSJk4mAKyRfNBjt7d36WJLaNF6BO&q=trending&limit=50&offset=0&rating=g"
    );
    const gifs = await response.json();
    for (const gif of gifs.data) {
      var gifDiv = document.createElement("div");
      trendingGifs.append(gifDiv);

      var myImage = document.createElement("img");
      myImage.setAttribute("src", gif.images.original.url);
      myImage.classList.add("gif_src");
      gifDiv.appendChild(myImage);
    }
  }
});

$(document).ready(function () {
  $(".hamburger").click(function () {
    $(this).toggleClass("is-active");
  });
});
