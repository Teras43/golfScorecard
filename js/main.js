let golfAPI = "https://golf-courses-api.herokuapp.com/courses";
const courseContainer = document.getElementById('courseContainer')
const bodyContainer = document.getElementById('bodyContainer');
let allCourses;
let singleCourse;

let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = () => {
    if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        allCourses = JSON.parse(xmlhttp.responseText);

        allCourses.courses.forEach((course, index) => {
            // console.log(index, course)
            courseContainer.insertAdjacentHTML("beforeend", `
                 <div class="courseNode col-sm-4" id="${course.id}" onclick="selectCourse(${course.id})">
                    <img class="courseImg" src="${course.image}" />
                    <div><span class="courseTxt">${course.name}</span></div>
                </div>
            `)
        })
    }
}
xmlhttp.open("GET", golfAPI, true);
xmlhttp.setRequestHeader('ContentType', 'application/json');
xmlhttp.send();

let xmlhttp2 = new XMLHttpRequest();
xmlhttp2.onreadystatechange = () => {
    if (xmlhttp2.readyState === 4 && xmlhttp2.status === 200) {
        singleCourse = JSON.parse(xmlhttp2.responseText);
        console.log(singleCourse);
            bodyContainer.insertAdjacentElement("beforeend", `
                <div id="pageContainer2">
                    <div class="header text-center">Course Information</div>
                    <div>Name: ${singleCourse.data.name}${singleCourse.data.city}${singleCourse.data.stateOrProvince}</div>
                    <div>Holes: ${singleCourse.data.holeCount}</div>
                    <div>Tee Types & Yards:
                        <div>Pro - </div>
                        <div>Champion - </div>
                        <div>Men - </div>
                        <div>Women - </div>
                    </div>
                </div>
            `)
    }
}

const animateAwayProperties = {
    marginTop: '125%',
    opacity: 0
}

function selectCourse(id) {
    let selectedCourse = document.getElementById(id);
    [...document.getElementsByClassName('active')].forEach(element => {
        element.classList.remove('active');
    });
    selectedCourse.classList.add('active');
    const pageBody = selectedCourse.parentNode.parentNode;
    pageBody.animate(animateAwayProperties, 800);
    [...document.getElementsByClassName('active')].forEach(element => {
        element.classList.remove('active');
    });
    xmlhttp2.open("GET", golfAPI + '/' + id, true);
    xmlhttp2.setRequestHeader('ContentType', 'application/json');
    xmlhttp2.send();
    if (xmlhttp2.response) {
        addProTeeYardage();
    }
}