
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

// function: display the selected paintings
quizApp.displayPaintings = paintingsArray => {
  for (i = 0; i < paintingsArray.length; i++) {
    const $galleryItem = $(`<li>`);
    const $paintingImg = $(`<img>`).attr("src", paintingsArray[i].url);
    $galleryItem.append($paintingImg);
    $(".gallery").append($galleryItem);
  }
};

//function: retrieve information about the painting in question
quizApp.paintingInQuestion = (paintings, index) => {
  //populate image to the quiz form
  const paintingURL = paintings[index].url;
  $(".quizImg").attr("src", paintingURL);

  //store answers
  quizApp.paintingCountry = paintings[index].country;
  quizApp.paintingCentury = paintings[index].century;
};

//function: update the current quiz with answer options
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

  // 3. When users click "replay", the entire website will be reloaded to play again.
  $(".resultContainer").on("click", "button", function() {
    location.reload(true);
  });
};

// --------------------------------------------------------------------------------
// function group: start and play the quiz
// these functions require user input to run, thus they are declared after the init
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

    // Display paintings for the quiz
    quizApp.displayPaintings(quizApp.paintingsForQuiz);
    // hide for the mobile view (mobile fist design)
    $(".gallery").addClass("hide");

    quizApp.generateQuiz(quizApp.currentIndex);
  });
};

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

    // get user scores
    const score = quizApp.getScores($userCountry, $userCentury);
    // update scores
    quizApp.userScore = quizApp.userScore + score;

    //remove the current options
    quizApp.removeOptions();

    //update the index of painting in question and generate a new quiz
    if (quizApp.currentIndex < quizApp.questionNumbers - 1) {
      quizApp.currentIndex = quizApp.currentIndex + 1;
      //generate a new quiz
      quizApp.generateQuiz(quizApp.currentIndex);
    } else {
      // quizApp.displayScores();
      quizApp.displayScores();
    }
  });
};
// --------------------------------------------------------------------------------
// function group: calculate and display users score from user inputs

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

//function: clean up the current quiz options from the DOM
quizApp.removeOptions = () => {
  $("input[type=radio]").remove();
  $("label").remove();
};

//function: give a emoji for each corresponding score
quizApp.emojiFeedback = () => {
  const faces = {
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
    feedbackIcon.addClass(faces.a);
  } else if (quizApp.userScore === 1) {
    feedbackIcon.addClass(faces.b);
  } else if (quizApp.userScore === 2) {
    feedbackIcon.addClass(faces.c);
  } else if (quizApp.userScore === 3) {
    feedbackIcon.addClass(faces.d);
  } else if (quizApp.userScore === 4) {
    feedbackIcon.addClass(faces.e);
  } else if (quizApp.userScore === 5) {
    feedbackIcon.addClass(faces.f);
  } else {
    feedbackIcon.addClass(faces.g);
  }

  return feedbackIcon;
};

//function: display users score
quizApp.displayScores = () => {
  //display view score button
  $(".quizSection").append(
    `<button class="viewScore">View your score</button>`
  );
  $("input[type=submit]").addClass("hide");
  //remove the quiz image
  $(".quizImg").remove();
  //hide quiz
  $("fieldset").addClass("hide");

  //display the result section
  $(".viewScore").on("click", function() {
    $(".quiz")
      .removeClass("show")
      .addClass("hide");
    $(".result")
      .removeClass("hide")
      .addClass("show");

    //display the replay button
    $(".replay").removeClass("hide").addClass("show");

    //show users' score
    $(".resultContainer").prepend(`
      <h2>Your level of connoisseurship is: </h2>
      <p>${quizApp.userScore} / ${quizApp.questionNumbers}</p>
    `);
    
    quizApp.emojiFeedback();
    
  });
};

// --------------------------------------------------------------------------------
// Document ready
$(document).ready(function() {
  quizApp.init();
});
