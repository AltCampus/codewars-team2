// OVERALL LEADERBOARD JSCODE // 

// temp data
let tempData = [
    {
        "username": "SG24",
        "name": "SG",
        "honor": 63,
        "clan": "AltCampus",
        "leaderboardPosition": null,
        "skills": [],
        "ranks": {
            "overall": {
                "rank": -7,
                "name": "7 kyu",
                "color": "white",
                "score": 42
            },
            "languages": {
            "javascript": {
                "rank": -7,
                "name": "7 kyu",
                "color": "white",
                "score": 42
                }
            }
        },
        "codeChallenges": {
        "totalAuthored": 0,
        "totalCompleted": 14
        }
    },
    {
        "username": "klassynihal",
        "name": "Harshaan Nihal Khan",
        "honor": 1700,
        "clan": "AltCampus",
        "leaderboardPosition": 3580,
        "skills": null,
        "ranks": {
            "overall": {
                "rank": -3,
                "name": "3 kyu",
                "color": "blue",
                "score": 2464
                },
            "languages": {
                "javascript": {
                "rank": -3,
                "name": "3 kyu",
                "color": "blue",
                "score": 2464
                }
            }
        },
        "codeChallenges": {
        "totalAuthored": 0,
        "totalCompleted": 152
        }
    },
];

// DECLARING GLOBAL VARIABLES AND CONSTANTS //
// The url to fetch the data from backend from
const API_URL = "https://localhost:3000/api/v1/users";
// IDs
const TABLE_ID = "overallLeaderboard"
const ASCENDING_BTN = "ascendingorder";
const DESCENDING_BTN = "descendingorder";
// Class Names
const TABLE_BODY_CLASS = "tableBody";
const TDATA_CLASS = "tdata";
const TROW_CLASS = "trow";
// Keys of data to be displayed in correct order
const TABLE_DISPLAY = ["name", "username", "honor", "clan"];
// To store the fetched data in
let usersInfo = null;


// DECLARING FUNCTIONS //
// Fetching data synchronously 
async function fetchUsers(){
    let response = await fetch(API_URL);
    let data = response.json();
    return data;
}

// Organising data in ascending order
// data: the data to be organised
// basis: the key to organise according to
function inAscendingOrder(data, basis){
    return data.sort(function(a, b){return a.codewars[basis] - b.codewars[basis]});
}

// Organising data in descending order
// data: the data to be organised
// basis: the key to organise according to
function inDescendingOrder(data, basis){
    return data.sort(function(a, b){return b.codewars[basis] - a.codewars[basis]});
}

// Displaying data
// data: the data to be displayed
// tableID: ID of the table to display data in
function displayData(data, tableBodyID){
    // selecting the targetted table
    let targetTableBody = document.querySelector("#" + tableBodyID);
    targetTableBody.innerHTML = "";
    targetTableBody.classList.add(TABLE_BODY_CLASS);
    // creating table row for each user
    for(let i = 0, n = data.length; i < n; i++){
        let trow = document.createElement("tr");
        trow.classList.add(TROW_CLASS);
        // creating a table data in the row for each info to be displayed
        for(let j = 0, m = TABLE_DISPLAY.length; j < m; j++){
            let tdata = document.createElement("td");
            tdata.classList.add(TDATA_CLASS);
            tdata.innerText = data.codewars[TABLE_DISPLAY[j]];
            // appending tdata to trow
            trow.appendChild(tdata);
        }
        // adding the row to the table
        targetTableBody.appendChild(trow);
    }
    return 0;
};

// Handling button click to display data in ascending or descending order
function handleOnClick(){
    let ascendingBtn = document.querySelector("#" + ASCENDING_BTN);
    ascendingBtn.addEventListener("click", () => {
        userInfo.then(data => {
            inAscendingOrder(data, "honor");
        }).then(organisedData => {
            displayData(organisedData, TABLE_ID);
        });
    });

    let descendingBtn = document.querySelector("#" + DESCENDING_BTN);
    descendingBtn.addEventListener("click", () => {
        userInfo.then(data => {
            inDescendingOrder(data, "honor");
        }).then(organisedData => {
            displayData(organisedData, TABLE_ID);
        });
    });
}

// Handling Onload event
function handleOnload(){
    document.addEventListener("load", () => {
        usersInfo = fetchUsers();
        // diplaying data in descending order of honor
        userInfo.then(data => {
            inDescendingOrder(data, "honor");
        }).then(organisedData => {
            displayData(organisedData, TABLE_ID);
        });
    });
    return 0;
}

// EXECUTION //
// Calling function to fetch data on document load
handleOnload();
// Calling function to handle click events on the buttons
handleOnClick();
