
// Paintings data pool
const paintings = [
  {
    title: "The Judgement of Paris",
    country: "Germany",
    century: "16th century",
    url: "./assets/cranachJudgement.jpg",
    author: "Lucas Cranach the Elder"
  },
  {
    title: "Venus and Adonis",
    country: "Italy",
    century: "16th century",
    url: "./assets/titianVenus.jpg",
    author: "Titian"
  },
  {
    title: "The Harvesters",
    country: "Belgium",
    century: "16th century",
    url: "./assets/brugelElderHarvesters.jpg",
    author: "Pieter Brugel the Elder"
  },
  {
    title: "Juan de Pareja(1601-1670)",
    country: "Spain",
    century: "17th century",
    url: "./assets/velazquezJuan.jpg",
    author: "Velázquez"
  },
  {
    title: "Young Woman with a Water Pitcher",
    country: "Netherlands",
    century: "17th century",
    url: "./assets/vermeerYoung.jpg",
    author: "Johannes Vermeer"
  },
  {
    title: "Self-Portrait",
    country: "Netherlands",
    century: "17th century",
    url: "./assets/rembrandtSelf.jpg",
    author: "Rembrandt"
  },
  {
    title: "Mezzetin",
    country: "France",
    century: "18th century",
    url: "./assets/watteauMezzetin.jpg",
    author: "Antoine Watteau"
  },
  {
    title: "Manuel Osorio Manrique de Zuñiga(1784-1792)",
    country: "Spain",
    century: "18th century",
    url: "./assets/goyaManuel.jpg",
    author: "Goya"
  },
  {
    title: "Venice, from the Porch of Madonna della Salute",
    country: "England",
    century: "19th century",
    url: "./assets/turnerVenice.jpg",
    author: "Joseph Mallord William Turner"
  },
  {
    title: "The Dance Class",
    country: "France",
    century: "19th century",
    url: "./assets/degasDance.jpg",
    author: "Edgar Degas"
  },
  {
    title: "Self-Portrait with a Straw Hat(obverse: The Potato Peeler)",
    country: "France",
    century: "19th century",
    url: "./assets/goghSelf.jpg",
    author: "Vincent van Gogh"
  },
  {
    title: "Mäda Primavesi(1903-2000)",
    country: "Austria",
    century: "20th century",
    url: "./assets/klimtMada.jpg",
    author: "Gustav Klimt"
  }
];

// Declaring the app
const quizApp = {};

// --------------------------------------------------------------------------------
//function group: create arrays needed for generating a quiz from the paintings array

// function: create a new array containing one key's value from each object from the paintings array without duplicates
//eg. create an array containing all countries/centuries
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

// function: Select 6 randomly selected paintings
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
  //copying the dataArray so the passed in array will not be modified.
  dataArray = [...dataArray];

  //store data in question in a new array
  const firstOption = paintingsArray[questionIndex][paintingData];
  const finalOptions = [];
  finalOptions.push(firstOption);

  //remove the data from dataArray
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
  $(".quizImg").attr("src", paintingURL);

  //update the index of quiz for users
  $(".quizIndex").text(`${index + 1} / ${quizApp.questionNumbers}`)

  //store answers
  quizApp.paintingCountry = paintings[index].country;
  quizApp.paintingCentury = paintings[index].century;
};

//function: update the DOM with answer options
quizApp.populateQuizOptions = (answerOptions, inputName, domElement) => {
  for (i = 0; i < answerOptions.length; i++) {
    const $answerOptions = $(`
    <input type="radio" id="${inputName}${i}" name=${inputName} class=${inputName} value="${
      answerOptions[i]
    }"/>
    <label for="${inputName}${i}">${answerOptions[i]}</label>`);

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
  $(".replay").on("click", function() {
    location.reload(true);
  });
};

// --------------------------------------------------------------------------------
// function group: start and play the quiz
// these functions require user input to run, thus they are declared after the init

// function: start the quiz and display the first question
quizApp.startQuiz = () => {
  $(".start").on("click", function() {
    // Hide the header and display the quiz section
    $("header").addClass("hide");
    $("main")
      .removeClass("hide")
      .addClass("show");

    $(".quiz")
      .removeClass("hide")
      .addClass("show");

    quizApp.generateQuiz(quizApp.currentIndex);
  });
};

//function: user answers are recorded and new quiz is generated
quizApp.playQuiz = () => {
  $(".submit").on("click", function(e) {
    e.preventDefault();

    //error handling: prevent unchecked inputs from submitting
    if (
      !$("input[class=countryChoice]").is(":checked") ||
      !$("input[class=centuryChoice]").is(":checked")
    ) {
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

  const feedbackIcon = $(".resultContainer").append(
    `<i aria-hidden="true"></i>`
  );

  if (quizApp.userScore === 0) {
    return feedbackIcon.addClass(emojiFaces.a);
  } else if (quizApp.userScore === 1) {
    return feedbackIcon.addClass(emojiFaces.b);
  } else if (quizApp.userScore === 2) {
    return feedbackIcon.addClass(emojiFaces.c);
  } else if (quizApp.userScore === 3) {
    return feedbackIcon.addClass(emojiFaces.d);
  } else if (quizApp.userScore === 4) {
    return feedbackIcon.addClass(emojiFaces.e);
  } else if (quizApp.userScore === 5) {
    return feedbackIcon.addClass(emojiFaces.f);
  } else {
    return feedbackIcon.addClass(emojiFaces.g);
  }
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
  $("input[type=submit]").addClass("hide");
  //remove the quiz image
  $(".quizImg").remove();
  //hide quiz
  $("fieldset").addClass("hide");
  //display view score button
  $(".quizSection").append(
    `<button class="viewScore">View your score</button>`
  );
  //hide quizIndex
  $(".quizIndex").addClass("hide");

  quizApp.viewScore();
  quizApp.reviewAnswers(quizApp.paintingsForQuiz);
};

//function: view score
quizApp.viewScore = () => {
  $(".viewScore").on("click", function() {
    $(".quizSection")
      .removeClass("show")
      .addClass("hide");

    $(".resultSection")
      .removeClass("hide")
      .addClass("show");

    //show users' score
    $(".resultContainer").prepend(`
      <p>${quizApp.userScore} / ${quizApp.questionNumbers}</p>
    `);
    
    quizApp.emojiFeedback();
  });
};

//function: review answers
quizApp.reviewAnswers = (paintings) => {
  $(".reviewAnswers").on("click", function() {
    $(".resultSection").removeClass("show").addClass("hide");
    $(".review").removeClass("hide").addClass("show");

    for (i = 0; i < paintings.length; i++) {
      const $galleryItem = $(`<li>`);
      const $paintingImg = $(`<img>`).attr("src", paintings[i].url);$paintingImg.attr("alt", "");
      const $paintingTitle = $(`<p>${paintings[i].title}</p>`)
      const $paintingAuthor = $(`<p>${paintings[i].author}</p>`)
      const $paintingCountry = $(`<p>${paintings[i].country}</p>`)
      const $paintingCentury = $(`<p>${paintings[i].century}</p>`)
      const $userInputs = $(`<div class="userInputs"><h3>Your answers:</h3></div>`);
      const $userCountry = $(`<p>${quizApp.userCountries[i]}</p>`)
      const $userCentury = $(`<p>${quizApp.userCenturies[i]}</p>`);
      $galleryItem.append($paintingImg, $paintingTitle, $paintingAuthor, $paintingCountry, $paintingCentury, $userInputs);
      $userInputs.append($userCountry, $userCentury);
      $(".gallery").append($galleryItem);
    }


    console.log(quizApp.userCountries);
    
  });
};


//--------------------------------------------------------------------------------
// Document ready
$(document).ready(function() {
  quizApp.init();
});
