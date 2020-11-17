// Variables

let golfAPI = "https://golf-courses-api.herokuapp.com/courses";
let allCourses;
let singleCourse;
const courseContainer = document.getElementById("courseContainer");
const bodyContainer = document.getElementById("bodyContainer");
let savedData = {};

// XMLHttpRequests & HTML Inserts

let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = () => {
  if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
    allCourses = JSON.parse(xmlhttp.responseText);
    allCourses.courses.forEach((course) => {
      courseContainer.insertAdjacentHTML(
        "beforeend",
        `
                <div class='courseNode col-sm-4' id='${course.id}' onclick='selectCourse(${course.id})'>
                    <img class='courseImg' src='${course.image}' />
                    <div><span class='courseTxt'>${course.name}</span></div>
                </div>
            `
      );
    });
  }
};
xmlhttp.open("GET", golfAPI, true);
xmlhttp.setRequestHeader("ContentType", "application/json");
xmlhttp.send();

let xmlhttp2 = new XMLHttpRequest();
xmlhttp2.onreadystatechange = () => {
  if (xmlhttp2.readyState === 4 && xmlhttp2.status === 200) {
    singleCourse = JSON.parse(xmlhttp2.responseText);
    const totalYardage = addTeeYardage();
    console.log(singleCourse);
    if (totalYardage.proTotal !== 0) {
      bodyContainer.insertAdjacentHTML(
        "beforeend",
        `
                <div id='bodyContainer2' class='bodyContainer2'>
                    <div class='topSection'>
                        <div class='header text-center'>Course Information</div>
                        <div>${singleCourse.data.name} ${singleCourse.data.city} ${singleCourse.data.stateOrProvince}</div>
                        <div>${singleCourse.data.addr1}</div>
                        <div>${singleCourse.data.phone}</div>
                        <div>${singleCourse.data.holeCount} Holes</div>
                        <div class='singleCourseImgContainer'>
                          <img class='singleCourseImg' src='${singleCourse.data.thumbnail}'/>
                        </div>
                        <br/>
                        <div class='teeTypesText'>Tee Types:</div>
                        <div class='teeTypesContainer'>
                          <div class='teeTypesTop'>
                              <div class='proTee'>
                                  <div class='proTotalDiv'>Pro:</div> 
                                  <div class='proTotalYd'>Yards - ${totalYardage.proTotal}</div>
                              </div>
                              <div class='champTee'>
                                  <div class='champTotalDiv'>Champion:</div>
                                  <div class'champTotalYd'>Yards - ${totalYardage.champTotal}</div>
                              </div>
                          </div>
                          <br/>
                          <div class='teeTypesBottom'>
                              <div class='menTee'>
                                  <div class='menTotalDiv'>Men:</div>
                                  <div class='menTotalYd'>Yards - ${totalYardage.menTotal}</div>
                              </div>
                              <div class='womenTee'>
                                  <div class='womenTotalDiv'>Women:</div>
                                  <div class='womenTotalYd'>Yards - ${totalYardage.womenTotal}</div>
                              </div>
                          </div>
                        </div>
                    </div>
                    <br/>
                    <div class='bottomSection'>
                      <div class='playerList'>Player List</div>
                      <div id='players' class='players'>
                    
                      </div>
                      <div id='errorMsgName' class='text-danger'></div>
                      <div class='addPlayers'>
                        <div class='playerName'>
                          <input id='nameInput' type='text' placeholder='Player Name' onkeydown='addPlayers(event)'/>
                        </div>
                        <div class='buttonDiv'>
                          <button type='button' class='addPlayerBtn btn-sm btn-primary' onclick='addPlayers(event)'>
                            Add
                          </button>
                        </div>
                      </div>
                        <button type='button' class='startBtn btn-sm btn-primary' onclick='startGame()'>
                            Start!
                        </button>
                    </div>
                </div>
            `
      );
    } else {
      bodyContainer.insertAdjacentHTML(
        "beforeend",
        `
                <div id='bodyContainer2' class='bodyContainer2'>
                    <div class='topSection'>
                        <div class='header text-center'>Course Information</div>
                        <div>${singleCourse.data.name} ${singleCourse.data.city} ${singleCourse.data.stateOrProvince}</div>
                        <div>${singleCourse.data.addr1}</div>
                        <div>${singleCourse.data.phone}</div>
                        <div>${singleCourse.data.holeCount} Holes</div>
                        <div class='singleCourseImgContainer'>
                          <img class='singleCourseImg' src='${singleCourse.data.thumbnail}'/>
                        </div>
                        <br/>
                        <div class='teeTypesText'>Tee Types:</div>
                        <div class='teeTypesContainer'>
                          <div class='teeTypesTop'>
                              <div class='champTee'>
                                  <div class='champTotalDiv'>Champion:</div>
                                  <div class'champTotalYd'>Yards - ${totalYardage.champTotal}</div>
                              </div>
                          </div>
                          <br/>
                          <div class='teeTypesBottom'>
                              <div class='menTee'>
                                  <div class='menTotalDiv'>Men:</div>
                                  <div class='menTotalYd'>Yards - ${totalYardage.menTotal}</div>
                              </div>
                              <div class='womenTee'>
                                  <div class='womenTotalDiv'>Women:</div>
                                  <div class='womenTotalYd'>Yards - ${totalYardage.womenTotal}</div>
                              </div>
                          </div>
                        </div>
                    </div>
                    <br/>
                    <div class='bottomSection'>
                      <div class='playerList'>Player List</div>
                      <div id='players' class='players'>
                    
                      </div>
                      <div class='addPlayers'>
                        <div class='playerName'>
                          <input id='nameInput' type='text' placeholder='Player Name' onkeydown='addPlayers(event)'/>
                        </div>
                        <div class='buttonDiv'>
                          <button type='button' class='addPlayerBtn btn-sm btn-primary' onclick='addPlayers(event)'>
                            Add
                          </button>
                        </div>
                      </div>
                        <button type='button' class='startBtn btn-sm btn-primary' onclick='startGame()'>
                            Start!
                        </button>
                    </div>
                </div>
            `
      );
    }
  }
};

function startGame() {
  if (Object.keys(savedData).length === 0) {
    document.getElementById("errorMsgName").innerHTML =
      "Need to add player(s)!";
    setTimeout(() => {
      document.getElementById("errorMsgName").innerHTML = "";
    }, 1800);
  } else {
    document
      .getElementById("bodyContainer2")
      .animate(animateAwayProperties, 800);
    setTimeout(() => {
      document.getElementById("bodyContainer2").remove();
      let playerInputs = ``;
      let playerNames = ``;
      let outTotals = ``;
      let inTotals = ``;
      let playerTotals = ``;
      let playerNameComplete = ``;
      Object.keys(savedData).forEach((playerName, Index) => {
        for (let i = 1; i <= 18; i++) {
          playerInputs += `<input type='number' min='0' id='${playerName + i}' class='player${Index + 1}Hole${i} gridInputs' onkeydown='keydown(event)' onblur='getPlayerScore()'/>`;
          // if (Index === 0 || Index === 2) {
          //   $(`#${playerName + i}`).css('background-color', 'lightgray');
          // }
        }
          playerNames += `<div id='player${Index + 1}' class='player${Index + 1}'>${savedData[playerName].Name}</div>`
          outTotals += `<div id='${playerName}Out' class='outScoreP${Index + 1}'>0</div>`
          inTotals += `<div id='${playerName}In' class='inScoreP${Index + 1}'>0</div>`
          playerTotals += `<div id='${playerName}Total'class='totalsP${Index + 1}'>0</div>`
          playerNameComplete += `<div id='${playerName}Complete'></div>`
      });
      bodyContainer.insertAdjacentHTML(
        "beforeend",
        `
        <div id='bodyContainer3'>
            <div class='teeChange'>
                <div class='teeChangeTxt'>Change Tee?</div>
                <select id='teeDropMenu' class='teeDropMenu' onchange='getTeeYardage()'>
                </select>
            </div>
            <div id='golfGrid' class='golfGrid'>
                <div class='holesGrid'>Hole</div>
                <div class='parGrid'>Par</div>
                <div class='handicapGrid'>HDCP</div>
                ${playerNames}
                <div class='yardsGrid'>Yards</div>

                <div class='hole1'>1</div>
                <div class='hole2'>2</div>
                <div class='hole3'>3</div>
                <div class='hole4'>4</div>
                <div class='hole5'>5</div>
                <div class='hole6'>6</div>
                <div class='hole7'>7</div>
                <div class='hole8'>8</div>
                <div class='hole9'>9</div>

                <div class='outScore'>Out</div>
                ${outTotals}
                
                <div class='hole10'>10</div>
                <div class='hole11'>11</div>
                <div class='hole12'>12</div>
                <div class='hole13'>13</div>
                <div class='hole14'>14</div>
                <div class='hole15'>15</div>
                <div class='hole16'>16</div>
                <div class='hole17'>17</div>
                <div class='hole18'>18</div>

                <div class='inScore'>In</div>
                ${inTotals}

                <div class='totalPar'></div>

                <div class='allTotals'>Total</div>
                ${playerTotals}
                <div class='totalsYards'></div>


                <div class='par1'>${
                  singleCourse.data.holes[0].teeBoxes[0].par
                }</div>
                <div class='par2'>${
                  singleCourse.data.holes[1].teeBoxes[0].par
                }</div>
                <div class='par3'>${
                  singleCourse.data.holes[2].teeBoxes[0].par
                }</div>
                <div class='par4'>${
                  singleCourse.data.holes[3].teeBoxes[0].par
                }</div>
                <div class='par5'>${
                  singleCourse.data.holes[4].teeBoxes[0].par
                }</div>
                <div class='par6'>${
                  singleCourse.data.holes[5].teeBoxes[0].par
                }</div>
                <div class='par7'>${
                  singleCourse.data.holes[6].teeBoxes[0].par
                }</div>
                <div class='par8'>${
                  singleCourse.data.holes[7].teeBoxes[0].par
                }</div>
                <div class='par9'>${
                  singleCourse.data.holes[8].teeBoxes[0].par
                }</div>
                <div class='inPar'></div>
                <div class='par10'>${
                  singleCourse.data.holes[9].teeBoxes[0].par
                }</div>
                <div class='par11'>${
                  singleCourse.data.holes[10].teeBoxes[0].par
                }</div>
                <div class='par12'>${
                  singleCourse.data.holes[11].teeBoxes[0].par
                }</div>
                <div class='par13'>${
                  singleCourse.data.holes[12].teeBoxes[0].par
                }</div>
                <div class='par14'>${
                  singleCourse.data.holes[13].teeBoxes[0].par
                }</div>
                <div class='par15'>${
                  singleCourse.data.holes[14].teeBoxes[0].par
                }</div>
                <div class='par16'>${
                  singleCourse.data.holes[15].teeBoxes[0].par
                }</div>
                <div class='par17'>${
                  singleCourse.data.holes[16].teeBoxes[0].par
                }</div>
                <div class='par18'>${
                  singleCourse.data.holes[17].teeBoxes[0].par
                }</div>
                <div class='outPar'></div>


                <div class='handicap1'>${
                  singleCourse.data.holes[0].teeBoxes[0].hcp
                }</div>
                <div class='handicap2'>${
                  singleCourse.data.holes[1].teeBoxes[0].hcp
                }</div>
                <div class='handicap3'>${
                  singleCourse.data.holes[2].teeBoxes[0].hcp
                }</div>
                <div class='handicap4'>${
                  singleCourse.data.holes[3].teeBoxes[0].hcp
                }</div>
                <div class='handicap5'>${
                  singleCourse.data.holes[4].teeBoxes[0].hcp
                }</div>
                <div class='handicap6'>${
                  singleCourse.data.holes[5].teeBoxes[0].hcp
                }</div>
                <div class='handicap7'>${
                  singleCourse.data.holes[6].teeBoxes[0].hcp
                }</div>
                <div class='handicap8'>${
                  singleCourse.data.holes[7].teeBoxes[0].hcp
                }</div>
                <div class='handicap9'>${
                  singleCourse.data.holes[8].teeBoxes[0].hcp
                }</div>

                <div class='handicap10'>${
                  singleCourse.data.holes[9].teeBoxes[0].hcp
                }</div>
                <div class='handicap11'>${
                  singleCourse.data.holes[10].teeBoxes[0].hcp
                }</div>
                <div class='handicap12'>${
                  singleCourse.data.holes[11].teeBoxes[0].hcp
                }</div>
                <div class='handicap13'>${
                  singleCourse.data.holes[12].teeBoxes[0].hcp
                }</div>
                <div class='handicap14'>${
                  singleCourse.data.holes[13].teeBoxes[0].hcp
                }</div>
                <div class='handicap15'>${
                  singleCourse.data.holes[14].teeBoxes[0].hcp
                }</div>
                <div class='handicap16'>${
                  singleCourse.data.holes[15].teeBoxes[0].hcp
                }</div>
                <div class='handicap17'>${
                  singleCourse.data.holes[16].teeBoxes[0].hcp
                }</div>
                <div id='finalHandicap' class='handicap18'>${
                  singleCourse.data.holes[17].teeBoxes[0].hcp
                }</div>
                
                ${playerInputs}

                <div class='yardsHole1'></div>
                <div class='yardsHole2'></div>
                <div class='yardsHole3'></div>
                <div class='yardsHole4'></div>
                <div class='yardsHole5'></div>
                <div class='yardsHole6'></div>
                <div class='yardsHole7'></div>
                <div class='yardsHole8'></div>
                <div class='yardsHole9'></div>
                <div class='yardsOut'></div>
                <div class='yardsHole10'></div>
                <div class='yardsHole11'></div>
                <div class='yardsHole12'></div>
                <div class='yardsHole13'></div>
                <div class='yardsHole14'></div>
                <div class='yardsHole15'></div>
                <div class='yardsHole16'></div>
                <div class='yardsHole17'></div>
                <div class='yardsHole18'></div>
                <div class='yardsIn'></div>

                <div class='empty1'>Total</div>
                <div class='empty2'>Out</div>
                <div class='empty3'>In</div>
            </div>
            ${playerNameComplete}
        </div>
    `
      );
      let dropMenuPro = ``;
      let dropMenuNoPro = ``;
      if (singleCourse.data.holes[0].teeBoxes[3] === undefined) {
        dropMenuNoPro += 
        `
          <option class='champDropDown' value='champ'>Champion</option>
          <option class='menDropDown' value='men'>Men</option>
          <option class='womenDropDown' value='women'>Women</option>
        `
        $(`#teeDropMenu`).html(dropMenuNoPro);
      } else {
        dropMenuPro += 
        `
          <option class='proDropDown' value='pro'>Pro</option>
          <option class='champDropDown' value='champ'>Champion</option>
          <option class='menDropDown' value='men'>Men</option>
          <option class='womenDropDown' value='women'>Women</option>
        `
        $(`#teeDropMenu`).html(dropMenuPro);
      }
      addPar();
      addTeeYardage();
      getTeeYardage();
      let golfGridId = document.getElementById("golfGrid");
        if (Object.keys(savedData).length === 2) {
            golfGridId.removeAttribute("golfGrid");
            golfGridId.className = "golfGrid2";
        } else if (Object.keys(savedData).length === 3) {
            golfGridId.removeAttribute("golfGrid");
            golfGridId.className = "golfGrid3";
        } else if (Object.keys(savedData).length === 4) {
            golfGridId.removeAttribute("golfGrid");
            golfGridId.className = "golfGrid4";
        }
    }, 800);
  }
}