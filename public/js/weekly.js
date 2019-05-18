// weekly LEADERBOARD JSCODE // 


const API_URL = "http://localhost:3000/api/v1/weekly";
// IDs
const TABLE_BODY_ID = "tableBodyw"
const ASCENDING_BTN = "ascendingBtnw";
const DESCENDING_BTN = "descendingBtnw";
(function () {
  let userData;
  let tbody = document.getElementById(TABLE_BODY_ID);

  fetch(API_URL).then(res => res.json()).then(data => {
    userData = data;
    display(userData)
  })

  document.getElementById(ASCENDING_BTN).addEventListener('click', () => {
    if (!userData) return
    let ascending = userData.sort((a, b) => {
      let al = (a.prevWeek.data) ? a.prevWeek.data.length : 0;
      let bl = (b.prevWeek.data) ? b.prevWeek.data.length : 0;
      return al - bl;
    })
    display(ascending)
  })

  document.getElementById(DESCENDING_BTN).addEventListener('click', () => {
    if (!userData) return
    let descending = userData.sort((a, b) => {
      let al = (a.prevWeek.data) ? a.prevWeek.data.length : 0;
      let bl = (b.prevWeek.data) ? b.prevWeek.data.length : 0;
      return bl - al;
    })
    display(descending)
  })



  function display(data) {
    tbody.innerHTML = '';
    data.forEach(user => {
      tbody.innerHTML += `
        <tr class='trow'>
        <td class='tdata'>${user.email}</td>
        <td class='tdata'>${user.username}</td>
        <td class='tdata'>${(user.prevWeek.data) ? user.prevWeek.data.length : 'NA'}</td>
        </tr>
        `
    })
  }
})();
