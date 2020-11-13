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
    console.log(singleCourse);
    const totalYardage = addTeeYardage();
    if (totalYardage.proTotal !== 0) {
      bodyContainer.insertAdjacentHTML(
        "beforeend",
        `
                <div id='bodyContainer2' class='bodyContainer2'>
                    <div class='topSection'>
                        <div class='header text-center'>Course Information</div>
                        <div>${singleCourse.data.name} ${singleCourse.data.city} ${singleCourse.data.stateOrProvince}</div>
                        <div>${singleCourse.data.holeCount} Holes</div>
                        <br/>
                        <div class='teeTypesText'>Tee Types:</div>
                        <div class='teeTypes'>
                            <div class='proTee'>
                                <div><button class='btn-xs btn-primary'>Pro</button> Yards: ${totalYardage.proTotal}</div>
                            </div>
                            <div class='champTee'>
                                <div><button class='btn-xs btn-primary'>Champion</button> Yards: ${totalYardage.champTotal}</div>
                            </div>
                            <div class='menTee'>
                                <div><button class='btn-xs btn-primary'>Men</button> Yards: ${totalYardage.menTotal}</div>
                            </div>
                            <div class='womenTee'>
                                <div><button class='btn-xs btn-primary'>Women</button> Yards: ${totalYardage.womenTotal}</div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div class='bottomSection'>
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
                        <div>${singleCourse.data.holeCount} Holes</div>
                        <br/>
                        <div class='teeTypesText'>Tee Types:</div>
                        <div class='teeTypes'>
                            <div class='champTee'>
                                <div><button class='btn-xs btn-primary'>Champion</button> Yards: ${totalYardage.champTotal}</div>
                            </div>
                            <div class='menTee'>
                                <div><button class='btn-xs btn-primary'>Men</button> Yards: ${totalYardage.menTotal}</div>
                            </div>
                            <div class='womenTee'>
                                <div><button class='btn-xs btn-primary'>Women</button> Yards: ${totalYardage.womenTotal}</div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div class='bottomSection'>
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
      Object.keys(savedData).forEach((playerName, Index) => {
        for (let i = 1; i <= 18; i++) {
          playerInputs += `<input type='tel' id='${
            playerName + i
          }' class='player${Index + 1}Hole${i} gridInputs'/>`;
        }
    });
        let playerNames = ``;
        Object.keys(savedData).forEach((playerName, Index) => {
            for (let i = 0; i <= 3; i++) {
                playerNames += `<div id='player${Index + 1}' class='player${Index + 1}'>${playerName}</div>`
            }
        });
      bodyContainer.insertAdjacentHTML(
        "beforeend",
        `
        <div id='bodyContainer3'>
            <div class='teeChange'>
                <div class='teeChangeTxt'>Change Tee?</div>
                <select class='teeDropMenu'>
                    <option class='proDropDown' value='pro'>Pro</option>
                    <option class='champDropDown' value='champ'>Champion</option>
                    <option class='menDropDown' value='men'>Men</option>
                    <option class='womenDropDown' value='women'>Women</option>
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
                <div class='outScoreP1'></div>
                <div class='outScoreP2'></div>
                <div class='outScoreP3'></div>
                <div class='outScoreP4'></div>
                
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
                <div class='inScoreP1'></div>
                <div class='inScoreP2'></div>
                <div class='inScoreP3'></div>
                <div class='inScoreP4'></div>

                <div class='allTotals'>Total</div>
                <div class='totalsP1'></div>
                <div class='totalsP2'></div>
                <div class='totalsP3'></div>
                <div class='totalsP4'></div>
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
                <div class='yardsIn'></div>
                <div class='yardsHole10'></div>
                <div class='yardsHole11'></div>
                <div class='yardsHole12'></div>
                <div class='yardsHole13'></div>
                <div class='yardsHole14'></div>
                <div class='yardsHole15'></div>
                <div class='yardsHole16'></div>
                <div class='yardsHole17'></div>
                <div class='yardsHole18'></div>
                <div class='yardsOut'></div>
            </div>
        </div>
    `
      );
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