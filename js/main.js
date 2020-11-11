// Variables

let golfAPI = 'https://golf-courses-api.herokuapp.com/courses';
let allCourses;
let singleCourse;
const courseContainer = document.getElementById('courseContainer')
const bodyContainer = document.getElementById('bodyContainer');
let savedData = {};


// XMLHttpRequests & HTML Inserts

let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = () => {
    if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        allCourses = JSON.parse(xmlhttp.responseText);
        allCourses.courses.forEach((course) => {
            courseContainer.insertAdjacentHTML('beforeend', `
                <div class='courseNode col-sm-4' id='${course.id}' onclick='selectCourse(${course.id})'>
                    <img class='courseImg' src='${course.image}' />
                    <div><span class='courseTxt'>${course.name}</span></div>
                </div>
            `);
        });
    };
};
xmlhttp.open('GET', golfAPI, true);
xmlhttp.setRequestHeader('ContentType', 'application/json');
xmlhttp.send();

let xmlhttp2 = new XMLHttpRequest();
xmlhttp2.onreadystatechange = () => {
    if (xmlhttp2.readyState === 4 && xmlhttp2.status === 200) {
        singleCourse = JSON.parse(xmlhttp2.responseText);
        console.log(singleCourse);
        const totalYardage = addTeeYardage();
        if (totalYardage.proTotal !== 0) {
            bodyContainer.insertAdjacentHTML('beforeend', `
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
            `)
        } else {
            bodyContainer.insertAdjacentHTML('beforeend', `
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
            `)
        }
    };
};

function startGame() {
    if (Object.keys(savedData).length === 0) {
        document.getElementById('errorMsgName').innerHTML = 'Need to add player(s)!';
            setTimeout(() => {
                document.getElementById('errorMsgName').innerHTML = '';
            }, 1800);
    } else {
        document.getElementById('bodyContainer2').animate(animateAwayProperties, 800);
        setTimeout(() => {
            document.getElementById('bodyContainer2').remove();
    bodyContainer.insertAdjacentHTML('beforeend', `
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
            <div class='golfGrid'>
                <div class='holesGrid'>Hole</div>
                <div class='parGrid'>Par</div>
                <div class='handcapGrid'>Handicap</div>
                <div class='playerOne'>${Object.keys(savedData)[0]}</div>
                <div class='playerTwo'>${Object.keys(savedData)[1]}</div>
                <div class='playerThree'>${Object.keys(savedData)[2]}</div>
                <div class='playerFour'>${Object.keys(savedData)[3]}</div>

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
                <div class='allTotals'>Total</div>


                <div class='par1'>${singleCourse.data.holes[0].teeBoxes[0].par}</div>
                <div class='par2'>${singleCourse.data.holes[1].teeBoxes[0].par}</div>
                <div class='par3'>${singleCourse.data.holes[2].teeBoxes[0].par}</div>
                <div class='par4'>${singleCourse.data.holes[3].teeBoxes[0].par}</div>
                <div class='par5'>${singleCourse.data.holes[4].teeBoxes[0].par}</div>
                <div class='par6'>${singleCourse.data.holes[5].teeBoxes[0].par}</div>
                <div class='par7'>${singleCourse.data.holes[6].teeBoxes[0].par}</div>
                <div class='par8'>${singleCourse.data.holes[7].teeBoxes[0].par}</div>
                <div class='par9'>${singleCourse.data.holes[8].teeBoxes[0].par}</div>

                <div class='par10'>${singleCourse.data.holes[9].teeBoxes[0].par}</div>
                <div class='par11'>${singleCourse.data.holes[10].teeBoxes[0].par}</div>
                <div class='par12'>${singleCourse.data.holes[11].teeBoxes[0].par}</div>
                <div class='par13'>${singleCourse.data.holes[12].teeBoxes[0].par}</div>
                <div class='par14'>${singleCourse.data.holes[13].teeBoxes[0].par}</div>
                <div class='par15'>${singleCourse.data.holes[14].teeBoxes[0].par}</div>
                <div class='par16'>${singleCourse.data.holes[15].teeBoxes[0].par}</div>
                <div class='par17'>${singleCourse.data.holes[16].teeBoxes[0].par}</div>
                <div class='par18'>${singleCourse.data.holes[17].teeBoxes[0].par}</div>


                <div class='handicap1'>${singleCourse.data.holes[0].teeBoxes[0].hcp}</div>
                <div class='handicap2'>${singleCourse.data.holes[1].teeBoxes[0].hcp}</div>
                <div class='handicap3'>${singleCourse.data.holes[2].teeBoxes[0].hcp}</div>
                <div class='handicap4'>${singleCourse.data.holes[3].teeBoxes[0].hcp}</div>
                <div class='handicap5'>${singleCourse.data.holes[4].teeBoxes[0].hcp}</div>
                <div class='handicap6'>${singleCourse.data.holes[5].teeBoxes[0].hcp}</div>
                <div class='handicap7'>${singleCourse.data.holes[6].teeBoxes[0].hcp}</div>
                <div class='handicap8'>${singleCourse.data.holes[7].teeBoxes[0].hcp}</div>
                <div class='handicap9'>${singleCourse.data.holes[8].teeBoxes[0].hcp}</div>

                <div class='handicap10'>${singleCourse.data.holes[9].teeBoxes[0].hcp}</div>
                <div class='handicap11'>${singleCourse.data.holes[10].teeBoxes[0].hcp}</div>
                <div class='handicap12'>${singleCourse.data.holes[11].teeBoxes[0].hcp}</div>
                <div class='handicap13'>${singleCourse.data.holes[12].teeBoxes[0].hcp}</div>
                <div class='handicap14'>${singleCourse.data.holes[13].teeBoxes[0].hcp}</div>
                <div class='handicap15'>${singleCourse.data.holes[14].teeBoxes[0].hcp}</div>
                <div class='handicap16'>${singleCourse.data.holes[15].teeBoxes[0].hcp}</div>
                <div class='handicap17'>${singleCourse.data.holes[16].teeBoxes[0].hcp}</div>
                <div class='handicap18'>${singleCourse.data.holes[17].teeBoxes[0].hcp}</div>


                <input placeholder='placeholder' type='number' class='player1Hole1 gridInputs'>
                <input placeholder='placeholder' type='number' class='player1Hole2 gridInputs'>
                <input placeholder='placeholder' type='number' class='player1Hole3 gridInputs'>
                <input placeholder='placeholder' type='number' class='player1Hole4 gridInputs'>
                <input placeholder='placeholder' type='number' class='player1Hole5 gridInputs'>
                <input placeholder='placeholder' type='number' class='player1Hole6 gridInputs'>
                <input placeholder='placeholder' type='number' class='player1Hole7 gridInputs'>
                <input placeholder='placeholder' type='number' class='player1Hole8 gridInputs'>
                <input placeholder='placeholder' type='number' class='player1Hole9 gridInputs'>

                <input placeholder='placeholder' type='number' class='player1Hole10 gridInputs'>
                <input placeholder='placeholder' type='number' class='player1Hole11 gridInputs'>
                <input placeholder='placeholder' type='number' class='player1Hole12 gridInputs'>
                <input placeholder='placeholder' type='number' class='player1Hole13 gridInputs'>
                <input placeholder='placeholder' type='number' class='player1Hole14 gridInputs'>
                <input placeholder='placeholder' type='number' class='player1Hole15 gridInputs'>
                <input placeholder='placeholder' type='number' class='player1Hole16 gridInputs'>
                <input placeholder='placeholder' type='number' class='player1Hole17 gridInputs'>
                <input placeholder='placeholder' type='number' class='player1Hole18 gridInputs'>
 

                <input placeholder='placeholder' type='number' class='player2Hole1 gridInputs'>
                <input placeholder='placeholder' type='number' class='player2Hole2 gridInputs'>
                <input placeholder='placeholder' type='number' class='player2Hole3 gridInputs'>
                <input placeholder='placeholder' type='number' class='player2Hole4 gridInputs'>
                <input placeholder='placeholder' type='number' class='player2Hole5 gridInputs'>
                <input placeholder='placeholder' type='number' class='player2Hole6 gridInputs'>
                <input placeholder='placeholder' type='number' class='player2Hole7 gridInputs'>
                <input placeholder='placeholder' type='number' class='player2Hole8 gridInputs'>
                <input placeholder='placeholder' type='number' class='player2Hole9 gridInputs'>

                <input placeholder='placeholder' type='number' class='player2Hole10 gridInputs'>
                <input placeholder='placeholder' type='number' class='player2Hole11 gridInputs'>
                <input placeholder='placeholder' type='number' class='player2Hole12 gridInputs'>
                <input placeholder='placeholder' type='number' class='player2Hole13 gridInputs'>
                <input placeholder='placeholder' type='number' class='player2Hole14 gridInputs'>
                <input placeholder='placeholder' type='number' class='player2Hole15 gridInputs'>
                <input placeholder='placeholder' type='number' class='player2Hole16 gridInputs'>
                <input placeholder='placeholder' type='number' class='player2Hole17 gridInputs'>
                <input placeholder='placeholder' type='number' class='player2Hole18 gridInputs'>


                <input placeholder='placeholder' type='number' class='player3Hole1 gridInputs'>
                <input placeholder='placeholder' type='number' class='player3Hole2 gridInputs'>
                <input placeholder='placeholder' type='number' class='player3Hole3 gridInputs'>
                <input placeholder='placeholder' type='number' class='player3Hole4 gridInputs'>
                <input placeholder='placeholder' type='number' class='player3Hole5 gridInputs'>
                <input placeholder='placeholder' type='number' class='player3Hole6 gridInputs'>
                <input placeholder='placeholder' type='number' class='player3Hole7 gridInputs'>
                <input placeholder='placeholder' type='number' class='player3Hole8 gridInputs'>
                <input placeholder='placeholder' type='number' class='player3Hole9 gridInputs'>

                <input placeholder='placeholder' type='number' class='player3Hole10 gridInputs'>
                <input placeholder='placeholder' type='number' class='player3Hole11 gridInputs'>
                <input placeholder='placeholder' type='number' class='player3Hole12 gridInputs'>
                <input placeholder='placeholder' type='number' class='player3Hole13 gridInputs'>
                <input placeholder='placeholder' type='number' class='player3Hole14 gridInputs'>
                <input placeholder='placeholder' type='number' class='player3Hole15 gridInputs'>
                <input placeholder='placeholder' type='number' class='player3Hole16 gridInputs'>
                <input placeholder='placeholder' type='number' class='player3Hole17 gridInputs'>
                <input placeholder='placeholder' type='number' class='player3Hole18 gridInputs'>


                <input placeholder='placeholder' type='number' class='player4Hole1 gridInputs'>
                <input placeholder='placeholder' type='number' class='player4Hole2 gridInputs'>
                <input placeholder='placeholder' type='number' class='player4Hole3 gridInputs'>
                <input placeholder='placeholder' type='number' class='player4Hole4 gridInputs'>
                <input placeholder='placeholder' type='number' class='player4Hole5 gridInputs'>
                <input placeholder='placeholder' type='number' class='player4Hole6 gridInputs'>
                <input placeholder='placeholder' type='number' class='player4Hole7 gridInputs'>
                <input placeholder='placeholder' type='number' class='player4Hole8 gridInputs'>
                <input placeholder='placeholder' type='number' class='player4Hole9 gridInputs'>

                <input placeholder='placeholder' type='number' class='player4Hole10 gridInputs'>
                <input placeholder='placeholder' type='number' class='player4Hole11 gridInputs'>
                <input placeholder='placeholder' type='number' class='player4Hole12 gridInputs'>
                <input placeholder='placeholder' type='number' class='player4Hole13 gridInputs'>
                <input placeholder='placeholder' type='number' class='player4Hole14 gridInputs'>
                <input placeholder='placeholder' type='number' class='player4Hole15 gridInputs'>
                <input placeholder='placeholder' type='number' class='player4Hole16 gridInputs'>
                <input placeholder='placeholder' type='number' class='player4Hole17 gridInputs'>
                <input placeholder='placeholder' type='number' class='player4Hole18 gridInputs'>
            </div>
        </div>
    `)
        }, 800);
    }
}