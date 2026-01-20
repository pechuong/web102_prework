/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let game_index in games) {
        let game = games[game_index];
        // create a new div element, which will become the game card
        const divElement = document.createElement("div");
        divElement.classList.add("game-card");
        divElement.innerHTML = `<img src='${game.img}' class='game-img'> \
                                <p>${game.name}</p> \
                                <p>Pledged: \$${game.pledged}</p>`;
        gamesContainer.appendChild(divElement);
    }
    // add the class game-card to the list


    // set the inner HTML using a template literal to display some info 
    // about each game
    // TIP: if your images are not displaying, make sure there is space
    // between the end of the src attribute and the end of the tag ("/>")


    // append the game to the games-container

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
let totalContribution = GAMES_JSON.reduce(
    (total, game) => total + game.backers,
    0,
);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `<p>${Number(totalContribution).toLocaleString()}</p>`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

let totalRaised = GAMES_JSON.reduce(
    (total, game) => total + game.pledged,
    0,
);

// set inner HTML using template literal
raisedCard.innerHTML = `${Number(totalRaised).toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
let totalGames = GAMES_JSON.reduce(
    (total, game) => total + 1,
    0,
);
gamesCard.innerHTML = `${Number(totalGames).toLocaleString()}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unMetGames = GAMES_JSON.filter(
        (game) => {return Number(game.pledged) < Number(game.goal)}
    );
    console.log(`unmet games: ${unMetGames}`);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unMetGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let metGames = GAMES_JSON.filter(
        (game) => {return Number(game.pledged) >= Number(game.goal)}
    );

    console.log(`met games: ${metGames}`);

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(metGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let unfundedCount = GAMES_JSON.reduce(
    (total, game) => total + (Number(game.pledged) < Number(game.goal) ? 1 : 0),
    0,
);

// create a string that explains the number of unfunded games using the ternary operator
let unfundedExplanation = `A total of \$${totalRaised} has been raised for ${Number(totalGames)} games. \
                            Currently, ${Number(unfundedCount) == 0 ? "no" : Number(unfundedCount)} \
                            game${unfundedCount == 1 ? "" : "s"} remain${unfundedCount == 1 ? "s" : ""} unfunded.
                            We need your help to fund ${unfundedCount == 0 ? "additional games!" : "these amazing games!"}`;


// create a new DOM element containing the template string and append it to the description container
let fundingMsg = document.createElement("p");
fundingMsg.innerHTML = unfundedExplanation;
descriptionContainer.appendChild(fundingMsg);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [one, two, ...rest] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
let name1 = document.createElement("p");
name1.innerHTML = one.name;
firstGameContainer.appendChild(name1);

let name2 = document.createElement("p");
name2.innerHTML = two.name;
secondGameContainer.appendChild(name2);
// do the same for the runner up item