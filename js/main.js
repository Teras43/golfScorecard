// Variables

let golfAPI = "https://golf-courses-api.herokuapp.com/courses";
let allCourses;
let singleCourse;
const courseContainer = document.getElementById('courseContainer')
const bodyContainer = document.getElementById('bodyContainer');
let savedData = {};


// XMLHttpRequests + HTML Inserts

let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = () => {
    if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        allCourses = JSON.parse(xmlhttp.responseText);
        allCourses.courses.forEach((course, index) => {
            courseContainer.insertAdjacentHTML("beforeend", `
                <div class="courseNode col-sm-4" id="${course.id}" onclick="selectCourse(${course.id})">
                    <img class="courseImg" src="${course.image}" />
                    <div><span class="courseTxt">${course.name}</span></div>
                </div>
            `);
        });
    };
};
xmlhttp.open("GET", golfAPI, true);
xmlhttp.setRequestHeader('ContentType', 'application/json');
xmlhttp.send();

let xmlhttp2 = new XMLHttpRequest();
xmlhttp2.onreadystatechange = () => {
    if (xmlhttp2.readyState === 4 && xmlhttp2.status === 200) {
        singleCourse = JSON.parse(xmlhttp2.responseText);
        console.log(singleCourse);
        const totalYardage = addTeeYardage();
        if (totalYardage.proTotal !== 0) {
            bodyContainer.insertAdjacentHTML("beforeend", `
                <div id="bodyContainer2" class="bodyContainer2">
                    <div class="topSection">
                        <div class="header text-center">Course Information</div>
                        <div>${singleCourse.data.name} ${singleCourse.data.city} ${singleCourse.data.stateOrProvince}</div>
                        <div>${singleCourse.data.holeCount} Holes</div>
                        <br/>
                        <div class="teeTypesText">Tee Types:</div>
                        <div class="teeTypes">
                            <div class="proTee">
                                <div><button class='btn-xs btn-primary'>Pro</button> Yards: ${totalYardage.proTotal}</div>
                            </div>
                            <div class="champTee">
                                <div><button class='btn-xs btn-primary'>Champion</button> Yards: ${totalYardage.champTotal}</div>
                            </div>
                            <div class="menTee">
                                <div><button class='btn-xs btn-primary'>Men</button> Yards: ${totalYardage.menTotal}</div>
                            </div>
                            <div class="womenTee">
                                <div><button class='btn-xs btn-primary'>Women</button> Yards: ${totalYardage.womenTotal}</div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div class="bottomSection">
                    <div id="players" class="players">
                    
                    </div>
                    <div class="addPlayers">
                            <div class="playerName">
                                <input id="nameInput" type="text" placeholder="Player Name" onkeydown="addPlayers(event)"/>
                            </div>
                            <div class="buttonDiv">
                                <button type="button" class="addPlayerBtn btn-sm btn-primary" onclick="addPlayers(event)">
                                    Add
                                </button>
                            </div>
                        </div>
                        <button type="button" class="startBtn btn-sm btn-primary">
                            Start!
                        </button>
                    </div>
                </div>
            `)
        } else {
            bodyContainer.insertAdjacentHTML("beforeend", `
                <div id="bodyContainer2" class="bodyContainer2">
                    <div class="topSection">
                        <div class="header text-center">Course Information</div>
                        <div>${singleCourse.data.name} ${singleCourse.data.city} ${singleCourse.data.stateOrProvince}</div>
                        <div>${singleCourse.data.holeCount} Holes</div>
                        <br/>
                        <div class="teeTypesText">Tee Types:</div>
                        <div class="teeTypes">
                            <div class="champTee">
                                <div><button class='btn-xs btn-primary'>Champion</button> Yards: ${totalYardage.champTotal}</div>
                            </div>
                            <div class="menTee">
                                <div><button class='btn-xs btn-primary'>Men</button> Yards: ${totalYardage.menTotal}</div>
                            </div>
                            <div class="womenTee">
                                <div><button class='btn-xs btn-primary'>Women</button> Yards: ${totalYardage.womenTotal}</div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div class="bottomSection">
                    <div id="players" class="players">
                    
                    </div>
                    <div class="addPlayers">
                            <div class="playerName">
                                <input id="nameInput" type="text" placeholder="Player Name" onkeydown="addPlayers(event)"/>
                            </div>
                            <div class="buttonDiv">
                                <button type="button" class="addPlayerBtn btn-sm btn-primary" onclick="addPlayers(event)">
                                    Add
                                </button>
                            </div>
                        </div>
                        <button type="button" class="startBtn btn-sm btn-primary">
                            Start!
                        </button>
                    </div>
                </div>
            `)
        }
    };
};

// loadData();