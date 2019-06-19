// Paintings data pool
const paintings = [
  {
    title: "The Judgement of Paris",
    country: "Germany",
    century: "16th century",
    url: "./assets/cranachJudgement.jpg",
    author: "Lucas Cranach the Elder",
    alt:
      "In the foreground, from left to right, there are a horse, a seated young man wearing armour and a crimson cape, an old man standing and holding a glass orb, three women in nude. One of the women wears a large hat and transparent drapery. In the background, a putto is shooting an arrow."
  },
  {
    title: "Venus and Adonis",
    country: "Italy",
    century: "16th century",
    url: "./assets/titianVenus.jpg",
    author: "Titian",
    alt:
      "A woman, depicted in a colorist manner, in nude is seated and turned her back towards us. She holds a man who is departing. The man hold two hunting dogs, and a cupid on the left is looking over the scene."
  },
  {
    title: "The Harvesters",
    country: "Belgium",
    century: "16th century",
    url: "./assets/brugelElderHarvesters.jpg",
    author: "Pieter Brugel the Elder",
    alt:
      "A group of men and women are resting under the tree, while some men are harvesting in a golden field."
  },
  {
    title: "Juan de Pareja (1601-1670)",
    country: "Spain",
    century: "17th century",
    url: "./assets/velazquezJuan.jpg",
    author: "Velázquez",
    alt:
      "A portrait of an artist's assistant, gazing intensely out the pictorial space, depicted in a high degree of versimilitude."
  },
  {
    title: "Young Woman with a Water Pitcher",
    country: "Netherlands",
    century: "17th century",
    url: "./assets/vermeerYoung.jpg",
    author: "Johannes Vermeer",
    alt:
      "A young woman in an interior with a water pitcher, standing beside a window lit by sun light."
  },
  {
    title: "Self-Portrait",
    country: "Netherlands",
    century: "17th century",
    url: "./assets/rembrandtSelf.jpg",
    author: "Rembrandt",
    alt:
      "A self-portrait of an artist in his fifties. The artist depicts his face in a realist manner, showing the signs of aging."
  },
  {
    title: "Mezzetin",
    country: "France",
    century: "18th century",
    url: "./assets/watteauMezzetin.jpg",
    author: "Antoine Watteau",
    alt:
      "Mezzetin seated and singing in a garden. The Mezzetin's smooth silk and the trees in the garden are rendered with soft and delicate brush touches."
  },
  {
    title: "Manuel Osorio Manrique de Zuñiga (1784-1792)",
    country: "Spain",
    century: "18th century",
    url: "./assets/goyaManuel.jpg",
    author: "Goya",
    alt: "A boy wearing a red costume with a magpie, finches, and three cats."
  },
  {
    title: "Venice, from the Porch of Madonna della Salute",
    country: "England",
    century: "19th century",
    url: "./assets/turnerVenice.jpg",
    author: "Joseph Mallord William Turner",
    alt:
      "A landscape painting of Venice, from the Porch of Madonna della Salute. The reflections of the boats on the water are depicted."
  },
  {
    title: "The Dance Class",
    country: "France",
    century: "19th century",
    url: "./assets/degasDance.jpg",
    author: "Edgar Degas",
    alt:
      "In the foreground, young ballerinas who seem to be done with her performance are standing, in the middle ground, a group of ballerinas is performing in front of an old man, in the back ground, another group is waiting for its turn. "
  },
  {
    title: "Self-Portrait with a Straw Hat (obverse: The Potato Peeler)",
    country: "France",
    century: "19th century",
    url: "./assets/goghSelf.jpg",
    author: "Vincent van Gogh",
    alt:
      "A self-portrait of an artist wearing a straw hat. The artist uses crude, thick, slab-like brush strokes."
  },
  {
    title: "Mäda Primavesi (1903-2000)",
    country: "Austria",
    century: "20th century",
    url: "./assets/klimtMada.jpg",
    author: "Gustav Klimt",
    alt:
      "a portrait of a young girl wearing a white dress, decorated with a belt of flowers. The pink background and a floral field give a decorative impression."
  }
];

// Declaring the app
const quizApp = {};

// --------------------------------------------------------------------------------
//function group: create new arrays needed for generating a quiz from the paintings array

// function: create two new arrays, containing all values of a key without duplicates
// e.g. creat new arrays of country and century

quizApp.createDataArray = (paintingsArray, key) => {
  //create a new array with the data from the array
  const allData = paintingsArray.map(item => item[key]);
  //filter duplicates
  const filterData = allData.filter(function(data, index) {
    return allData.indexOf(data) >= index;
  });
  return filterData;
};

// function: shuffle items in an array
quizApp.shuffle = data => {
  for (let i = data.length - 1; i > 0; i--) {
    // Generate a random number
    const randomIndex = Math.floor(Math.random() * (i + 1));
    //destructuring: Swapping two items' orders
    [data[i], data[randomIndex]] = [data[randomIndex], data[i]];
  }
  return data;
};

// function: Select 6 randomly selected paintings: shuffle and select the first 6 items
quizApp.selectRandomPaintings = paintingsArray => {
  //shuffle the order of the paintings array
  const shuffledPaintings = quizApp.shuffle(paintingsArray);
  // get the first 6 items
  const selectPaintings = shuffledPaintings.slice(0, 6);
  return selectPaintings;
};

// function: Generate three choices with one answer and two random items
quizApp.generateChoices = (
  paintingsArray,
  paintingData,
  questionIndex,
  dataArray
) => {
  //copying the dataArray so the passed array will not be modified.
  dataArray = [...dataArray];

  //store data in question in a new array
  const firstOption = paintingsArray[questionIndex][paintingData];
  const finalOptions = [];
  finalOptions.push(firstOption);

  //remove the data in question from dataArray
  const firstOptionIndex = dataArray.indexOf(firstOption);
  dataArray.splice(firstOptionIndex, 1);

  //shuffle dataArray
  const randomizedDataArray = quizApp.shuffle(dataArray);

  //get the first two data
  const randomData = randomizedDataArray.slice(
    0,
    quizApp.answerOptionNumbers - 1
  );

  //add the two data to the new array
  const choices = quizApp.shuffle(finalOptions.concat(randomData));

  //return the choices
  return choices;
};

// --------------------------------------------------------------------------------
// function group: generate a quiz for each painting

//function: retrieve information about the painting in question and update the info in the DOM
quizApp.paintingInQuestion = (paintings, index) => {
  //populate image to the quiz form
  const paintingURL = paintings[index].url;
  const paintingAlt = paintings[index].alt;
  $(".quizImg").attr("src", paintingURL);
  $(".quizImg").attr("alt", paintingAlt);

  //update the index of quiz for users
  $(".quizIndex").text(`${index + 1} / ${quizApp.questionNumbers}`);

  //store answers
  quizApp.paintingCountry = paintings[index].country;
  quizApp.paintingCentury = paintings[index].century;
};

//function: update the DOM with three choices
quizApp.populateQuizOptions = (answerOptions, inputName, domElement) => {
  for (i = 0; i < answerOptions.length; i++) {
    const $answerOptions = $(`
    <div className="optionContainer">
      <input type="radio" id="${inputName}${i}" tabindex="0" name=${inputName} class=${inputName} value="${
      answerOptions[i]
    }"/>
      <label for="${inputName}${i}">${answerOptions[i]}</label>
    </div>
    `);

    $(domElement).append($answerOptions);
  }
};

//function: generate a quiz for the painting in question
quizApp.generateQuiz = index => {
  quizApp.paintingInQuestion(quizApp.paintingsForQuiz, index);

  // populate/update the country options to the DOM
  quizApp.countryChoices = quizApp.generateChoices(
    quizApp.paintingsForQuiz,
    "country",
    index,
    quizApp.countries
  );

  quizApp.centuryChoices = quizApp.generateChoices(
    quizApp.paintingsForQuiz,
    "century",
    index,
    quizApp.centuries
  );

  quizApp.populateQuizOptions(
    quizApp.countryChoices,
    "countryChoice",
    ".countryQuestion"
  );
  // populate/update the century options to the DOM
  quizApp.populateQuizOptions(
    quizApp.centuryChoices,
    "centuryChoice",
    ".centuryQuestion"
  );
};

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// user interaction flow starts here
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

//On page load, get the following data ready
quizApp.countries = quizApp.createDataArray(paintings, "country");
quizApp.centuries = quizApp.createDataArray(paintings, "century");
quizApp.paintingsForQuiz = quizApp.selectRandomPaintings(paintings);
quizApp.userCountries = [];
quizApp.userCenturies = [];
quizApp.questionNumbers = quizApp.paintingsForQuiz.length;
quizApp.answerOptionNumbers = 3;
quizApp.currentIndex = 0;
quizApp.userScore = 0;

///Init comes before user interaction starts
quizApp.init = () => {
  //1. When users click "start", the quiz will start
  quizApp.startQuiz();

  // 2. When users click "submit", users' input will be stored and a new quiz will be generated for the following painting.
  // When user clicks on "view score", users' result will be displayed.
  quizApp.playQuiz();

  // When users click "replay", the entire website will be reloaded to play again.
  $(".reset").on("click", function() {
    location.reload(true);
  });
};

// 4. Users plays the quiz and gets the result
// --------------------------------------------------------------------------------
// function group: start and play the quiz
// these functions require user input to run, thus they are declared after the init

// function: start the quiz and display the first question
// on START
quizApp.startQuiz = () => {
  $(".start").on("click", function() {
    // Hide the header and display the quiz section
    $(".headerContent").addClass("hide");
    $(".navReset")
      .removeClass("hide")
      .addClass("show");
    $("main")
      .removeClass("hide")
      .addClass("show");

    $(".quizSection")
      .removeClass("hide")
      .addClass("show");

    $(".quizForm")
      .removeClass("hide")
      .addClass("flex");

    quizApp.generateQuiz(quizApp.currentIndex);
  });
};

//function: user answers are recorded and a new quiz is generated
//on SUBMIT
quizApp.playQuiz = () => {
  $(".submit").on("click", function(e) {
    e.preventDefault();

    const $countryChoice = $("input[class=countryChoice]");
    const $centuryChoice = $("input[class=centuryChoice]");
    // control tab order
    $countryChoice.focus();

    //error handling: prevent unchecked inputs from submitting
    if (!$countryChoice.is(":checked") || !$centuryChoice.is(":checked")) {
      alert("Please select your answers");
      return false;
    }

    //get user inputs
    const $userCountry = $("input[class=countryChoice]:checked").val();
    const $userCentury = $("input[class=centuryChoice]:checked").val();

    //collect user inputs in arrays (for later use)
    quizApp.userCountries.push($userCountry);
    quizApp.userCenturies.push($userCentury);

    // get user scores
    const score = quizApp.getScores($userCountry, $userCentury);
    // update scores
    quizApp.userScore = quizApp.userScore + score;

    //remove the current options
    $("input[type=radio]").remove();
    $("label").remove();

    //update the index of painting in question and generate a new quiz
    if (quizApp.currentIndex < quizApp.questionNumbers - 1) {
      quizApp.currentIndex = quizApp.currentIndex + 1;
      //generate a new quiz
      quizApp.generateQuiz(quizApp.currentIndex);
    } else {
      quizApp.endQuiz();
    }

    //scroll to top below header
    window.scrollTo(60, 0);
  });
};

// --------------------------------------------------------------------------------
// function group: calculate and display users score from user inputs

//function: give a emoji for each corresponding score
quizApp.emojiFeedback = () => {
  const emojiFaces = {
    a: "far fa-angry",
    b: "far fa-flushed",
    c: "far fa-frown",
    d: "far fa-smile",
    e: "far fa-laugh",
    g: "far fa-grin-heart"
  };

  let $icon = $(`<i aria-hidden="true"></i>`);

  if (quizApp.userScore === 0) {
    $icon = $icon.addClass(emojiFaces.a);
  } else if (quizApp.userScore === 1) {
    $icon = $icon.addClass(emojiFaces.b);
  } else if (quizApp.userScore === 2) {
    $icon = $icon.addClass(emojiFaces.c);
  } else if (quizApp.userScore === 3) {
    $icon = $icon.addClass(emojiFaces.d);
  } else if (quizApp.userScore === 4) {
    $icon = $icon.addClass(emojiFaces.e);
  } else if (quizApp.userScore === 5) {
    $icon = $icon.addClass(emojiFaces.f);
  } else {
    $icon = $icon.addClass(emojiFaces.g);
  }

  const $updateIcon = $(".resultContainer").prepend($icon);

  return $updateIcon;
};

//function: convert user inputs to a score
quizApp.getScores = (userCountry, userCentury) => {
  const countryAnswer = quizApp.paintingCountry;
  const centuryAnswer = quizApp.paintingCentury;

  if (countryAnswer === userCountry && centuryAnswer === userCentury) {
    return 1;
  } else {
    return 0;
  }
};

//function: end quiz & open score reviewing section
quizApp.endQuiz = () => {
  //hide and show sections
  $(".quizSection")
    .removeClass("show")
    .addClass("hide");
  $(".resultSection")
    .removeClass("hide")
    .addClass("show");
  //display view score button
  $(".viewScore")
    .removeClass("hide")
    .addClass("flex");
  //hide quizIndex
  $(".quizIndex").addClass("hide");

  quizApp.viewScore();
  quizApp.reviewAnswers(quizApp.paintingsForQuiz);
};

//function: view score
//on VIEW SCORE
quizApp.viewScore = () => {
  $(".viewScoreButton").on("click", function() {
    //hide and show sections
    $(".viewScore")
      .removeClass("flex")
      .addClass("hide");

    $(".resultContainer")
      .removeClass("hide")
      .addClass("flex");
    $(".reviewAnswers")
      .removeClass("hide")
      .addClass("show");

    //show users' score
    $(".resultContainer").append(`
      <p>${quizApp.userScore} / ${quizApp.questionNumbers}</p>
    `);

    $(".reset").text("replay");

    quizApp.emojiFeedback();

    //scroll to top below header
    window.scrollTo(60, 0);
  });
};

//function: review answers
//on REVIEW ANSWERS
quizApp.reviewAnswers = paintings => {
  $(".reviewAnswers").on("click", function() {
    $(".resultSection")
      .removeClass("show")
      .addClass("hide");
    $(".reviewSection")
      .removeClass("hide")
      .addClass("show");

    //update the DOM with quized paintings
    for (i = 0; i < paintings.length; i++) {
      const $galleryItem = $(`<li class="galleryItem" tabindex=0>`);
      const $paintingImg = $(`<img>`).attr("src", paintings[i].url);
      $paintingImg.attr("alt", "");
      const $paintingInfo = $(`<div class="paintingInfo"></div>`);
      const $paintingTitle = $(`<p class="title">${paintings[i].title}</p>`);
      const $paintingAuthor = $(`<p>${paintings[i].author}</p>`);
      const $paintingCountry = $(`<p>${paintings[i].country}</p>`);
      const $paintingCentury = $(`<p>${paintings[i].century}</p>`);
      const $userInputs = $(
        `<div class="userInputs"><p class="userAnswers">Your answers:</p></div>`
      );
      const $userCountry = $(`<p>${quizApp.userCountries[i]}</p>`);
      const $userCentury = $(`<p>${quizApp.userCenturies[i]}</p>`);
      $paintingInfo.append(
        $paintingTitle,
        $paintingAuthor,
        $paintingCountry,
        $paintingCentury
      );
      $userInputs.append($userCountry, $userCentury);
      $reviewContents = $(`<div class="reviewContents">`);
      $reviewContents.append($paintingInfo, $userInputs);
      $galleryItem.append($paintingImg, $reviewContents);
      $(".gallery").append($galleryItem);
    }

    //scroll to top below header
    window.scrollTo(60, 0);
  });
};

//--------------------------------------------------------------------------------
// Document ready
$(document).ready(function() {
  quizApp.init();
});
