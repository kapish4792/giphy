"use strict";

const searchButton = document.querySelector(".btn-search");
const gifSlider = document.querySelector("#gif-slider");
fetch(
  "https://api.giphy.com/v1/gifs/trending?api_key=pHD5zSJk4mAKyRfNBjt7d36WJLaNF6BO&q=trending&limit=50&offset=0&rating=g"
)
  .then((response) => response.json())
  .then((getdata) => {
    for (let i = 0; i < getdata.data.length; i++) {
      // DIV Element
      var gifDiv = document.createElement("div");
      gifSlider.append(gifDiv);
      // Image Eelement
      const sliderImage = document.createElement("img");
      sliderImage.setAttribute("src", getdata.data[i].images.original.url);
      sliderImage.classList.add("gif_src");
      gifDiv.appendChild(sliderImage);
    }
  })
  .then(() => slider());

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
const userInputValue = function () {
  const gifSearchResult = document.querySelector("#gifserachresult");
  const inputValue = document.getElementById("search_bar").value;
  const url = `https://api.giphy.com/v1/gifs/search?api_key=pHD5zSJk4mAKyRfNBjt7d36WJLaNF6BO`;
  const topic = `&q=${inputValue}`;
  const limit = `&limit=50&offset=0&rating=g`;
  // heading
  const showHeading = function () {
    const heading = document.querySelector(".heading");
    heading.style.display = "block";
    heading.textContent = `Search Results Based on '${inputValue}'`;
  };
  setTimeout(showHeading, 2500);

  // looping over api response
  fetch(url + topic + limit)
    .then((response) => response.json())
    .then((getdata) => {
      while (gifSearchResult.firstChild) {
        gifSearchResult.removeChild(gifSearchResult.firstChild);
      }
      return getdata;
    })
    .then((getdata) => {
      for (let i = 0; i < getdata.data.length; i++) {
        var searchImage = document.createElement("img");
        searchImage.setAttribute("src", getdata.data[i].images.original.url);
        searchImage.classList.add("gif_search");
        gifSearchResult.appendChild(searchImage);
      }
    });
  inputValue.value = " ";
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
$(document).ready(function () {
  $(".user-menu").hover(function () {
    $(".btn-search").css("opacity", "0");
  }),
    $(".user-menu").mouseleave(function () {
      $(".btn-search").css("opacity", "1");
    });
});

// Tranding page
$(document).ready(function () {
  if (window.location.href.indexOf("trandinggifs.html") > -1) {
    const trendingGifs = document.querySelector("#trendingGifs");
    fetch(
      "https://api.giphy.com/v1/gifs/trending?api_key=pHD5zSJk4mAKyRfNBjt7d36WJLaNF6BO&q=trending&limit=50&offset=0&rating=g"
    )
      .then((response) => response.json())
      .then((getdata) => {
        for (let i = 0; i < getdata.data.length; i++) {
          // DIV Element
          var gifDiv = document.createElement("div");
          trendingGifs.append(gifDiv);
          // Image Eelement
          var myImage = document.createElement("img");
          myImage.setAttribute("src", getdata.data[i].images.original.url);
          myImage.classList.add("gif_src");
          gifDiv.appendChild(myImage);
        }
      });
  }
});

$(document).ready(function () {
  $(".hamburger").click(function () {
    $(this).toggleClass("is-active");
  });
});
