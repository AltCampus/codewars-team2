// OVERALL LEADERBOARD JSCODE // 


// DECLARING GLOBAL VARIABLES AND CONSTANTS //
// The url to fetch the data from backend from
const API_URL = "http://localhost:3000/api/v1/users";
// IDs
const TABLE_BODY_ID = "tableBody"
const ASCENDING_BTN = "ascendingBtn";
const DESCENDING_BTN = "descendingBtn";
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
// tableBodyID: ID of the body of the table to display data in
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
            tdata.innerText = data[i].codewars[TABLE_DISPLAY[j]];
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
        usersInfo.then(data => {
            return inAscendingOrder(data, "honor");
        }).then(organisedData => {
            displayData(organisedData, TABLE_BODY_ID);
        });
    });

    let descendingBtn = document.querySelector("#" + DESCENDING_BTN);
    descendingBtn.addEventListener("click", () => {
        usersInfo.then(data => {
            return inDescendingOrder(data, "honor");
        }).then(organisedData => {  
            displayData(organisedData, TABLE_BODY_ID);
        });
    });
}

// Handling Onload event
function handleOnload(){
    document.addEventListener("load", () => {
        usersInfo = fetchUsers();
        // diplaying data in descending order of honor
        usersInfo.then(data => {
            return inDescendingOrder(data, "honor");
        }).then(organisedData => {
            displayData(organisedData, TABLE_BODY_ID);
        });
    });
    return 0;
}

// handling error: if codewars profile not found
// data: the data to be checked
function errCodewarsProfile(data){
    let updatedArr = [];
    // adding default values if codewars profile not found
    data.forEach((val) => {
        if(!val.codewars) val.codewars = {};
        for(let i = 0, n = TABLE_DISPLAY.length; i < n; i++){
            if(!val.codewars[TABLE_DISPLAY[i]] && TABLE_DISPLAY[i] === "honor") val.codewars[TABLE_DISPLAY[i]] = 0;
            else if(!val.codewars[TABLE_DISPLAY[i]]) val.codewars[TABLE_DISPLAY[i]] = "Anonymous";
        }
        updatedArr.push(val);
    });
    return updatedArr;
}

// initialising
function init(){
    usersInfo = fetchUsers();
    // diplaying data in descending order of honor
    usersInfo.then(data => {
        data = errCodewarsProfile(data);
        return inDescendingOrder(data, "honor");
    }).then(organisedData => {
        displayData(organisedData, TABLE_BODY_ID);
    });
}


// EXECUTION //
init();
// Calling function to fetch data on document load
// handleOnload();
// Calling function to handle click events on the buttons
handleOnClick();