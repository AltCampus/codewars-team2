// OVERALL LEADERBOARD JSCODE // 


// DECLARING GLOBAL VARIABLES AND CONSTANTS //
// The url to fetch the data from backend from
const API_URL = "http://localhost:3000/api/v1/users";
// IDs
const TABLE_BODY_ID = "tableBody"
const ASCENDING_BTN = "ascendingBtn";
const DESCENDING_BTN = "descendingBtn";
const BATCH_DROPDOWN_ID = "batchDropdown";
// Class Names
const TABLE_BODY_CLASS = "tableBody";
const TDATA_CLASS = "tdata";
const TROW_CLASS = "trow";
// Keys of data to be displayed in correct order
const TABLE_DISPLAY = ["name", "username", "honor", "clan"];
// To store the fetched data in
let usersInfo = null;
// The data being displayed
let displayedData = null;


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

// sorting data as per selected batch
// data: the data to be sorted
// batch: the batch to be singled out
function sortData(data, batchNo){
    return data.filter((val) => {
        return (val.batch === batchNo);
    });
}

// Displaying data
// data: the data to be displayed
// tableBodyID: ID of the body of the table to display data in
function displayData(data, tableBodyID){
    // updating the data being displayed
    displayedData = data;
    // checking if displayed data if empty
    if(displayedData.length === 0) return 1;
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
        displayedData = inAscendingOrder(displayedData, "honor");
        displayData(displayedData, TABLE_BODY_ID);
    });

    let descendingBtn = document.querySelector("#" + DESCENDING_BTN);
    descendingBtn.addEventListener("click", () => {
        displayedData = inDescendingOrder(displayedData, "honor");
        displayData(displayedData, TABLE_BODY_ID);
    });
    return 0;
}

// handling error to check if codewars profile not found
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
    // updating usersInfo
    usersInfo = updatedArr;
    return updatedArr;
}

// displaying err message in the table
// message: the message to be displayed
// elementID: ID of the element to be updated
function displayMessage(message, elementID){
    let element = document.querySelector("#" + elementID);
    element.innerHTML = "<tr><td colspan='4'>" + message + "</td></tr>";
    return 0;
}

// handling batch selection
function handleBatchSelect(){
    let batchDropdown = document.querySelector("#" + BATCH_DROPDOWN_ID);
    batchDropdown.addEventListener("change", function(event){
        let batch = Number(event.target.value);
        if(batch !== 0){
            let sortedData = sortData(usersInfo, batch);
            if(sortedData.length !== 0) displayData(sortedData, TABLE_BODY_ID);
            else if(sortedData.length === 0) {
                displayedData = [];
                displayMessage("No Students Matched", TABLE_BODY_ID)
            }
        }
        else if(batch === 0){
            displayData(usersInfo, TABLE_BODY_ID);
        }
    });
    return 0;
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
    return 0;
}


// EXECUTION //
init();
// Calling function to handle click events on the buttons
handleOnClick();
// Handling batch selection
handleBatchSelect();
