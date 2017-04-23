window.onload = function () {

// Variables

  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];
  
  var categories;         // Array of topics
  var chosenCategory;     // Selected category
  var getHint ;          // Word getHint
  var word ;              // Selected word
  var guess ;             // Guess
  var guesses = [ ];      // Stored guesses
  var lives ;             // Lives
  var counter ;           // Count correct guesses
  var space;              // Number of spaces in word '-'

  // Get Elements
  var showLives = document.querySelector("#mylives");
  var showCategory = document.querySelector("#scategory");
  var getHint = document.querySelector("#hint");
  var showClue = document.querySelector("#clue");



  // Create Alphabet
  function buttons() {
    myButtons = document.querySelector('#buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }
  
  // Function Adds Class That Triggers Event in CSS
  function addClass(myClassId, myClassName) {
  	var hideClass = document.querySelector(myClassId);
  	hideClass.className += myClassName;
  }
  
  // Select Category
  function selectCat() {
    if (chosenCategory === categories[0]) {
      categoryName.innerHTML = "The Category Is Harry Potter";
      addClass('.wrapper', ' harry-bg');
    } else if (chosenCategory === categories[1]) {
      categoryName.innerHTML = "The Category Is Indiana Jones";
      addClass('.wrapper', ' indy-bg');
    } else if (chosenCategory === categories[2]) {
      categoryName.innerHTML = "The Category Is Nintendo";
      addClass('.wrapper', ' nintendo-bg');
    }
  }

  // Store Guesses
   function result() {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      guesses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }
  
  // Show lives
   function comments() {
    showLives.innerHTML = "You have " + lives + " lives";
    if (lives < 1) {
      showLives.innerHTML = "Game Over!";
      addClass('#buttons', 'hide-me');
    }
    for (var i = 0; i < guesses.length; i++) {
      if (counter + space === guesses.length) {
        showLives.innerHTML = "You Win!";
      }
    }
  }

  // OnClick Function
   function check() {
    list.onclick = function () {
      var guess = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;

      for (var i = 0; i < word.length; i++) {
        if (word[i] === guess) {
          guesses[i].innerHTML = guess;
          counter += 1;
        } 
      }
      var j = (word.indexOf(guess));
      if (j === -1) {
        lives -= 1;
        comments();
      } else {
        comments();
      }
    }
  }
  
    
  // Play
  function play() {
    categories = [
        ["hermione", "snape", "voldemort", "hedwig", "hagrid"],
        ["indiana-jones", "marion", "short-round", "spielberg", "fedora"],
        ["mario", "princess-peach", "luigi", "wario", "donkey-kong"]
    ];

    chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    word = word.replace(/\s/g, "-");
    console.log(word);
    buttons();

    guesses = [ ];
    lives = 5;
    counter = 0;
    space = 0;
    result();
    comments();
    selectCat();
  }

  play();
  
  // Hints / Clues
    hints = [
        ["Ron's future wife", "Professor who loves Harry's mom", "He who shall not be named", "Harry's Owl", "Sometimes known as Hagger"],
        ["The main character!", "Indiana's love interest", "Indiana's forgettable sidekick", "Director of the films", "Indiana's Hat"],
        ["Main character of the Nintendo universe", "The Princess in Pink", "Mario's little brother", "Mario's fat arch nemesis", "The Ape that likes bananas and stars in his own games"]
    ];

    var categoryIndex = categories.indexOf(chosenCategory);
    var hintIndex = chosenCategory.indexOf(word);
    showClue.innerHTML = "Clue: " +  hints [categoryIndex][hintIndex];
  
   // Reset

  document.getElementById('reset').onclick = function() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    location.reload();
    play();
  }
}


