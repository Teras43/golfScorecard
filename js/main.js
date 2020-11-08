let golfAPI = "https://golf-courses-api.herokuapp.com/courses";
const courseContainer = document.getElementById('courseContainer')
const bodyContainer = document.getElementById('bodyContainer');
let allCourses;

let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = () => {
    if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        allCourses = JSON.parse(xmlhttp.responseText)

        allCourses.courses.forEach((course, index) => {
            console.log(index, course)
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
        allCourses.courses.forEach((course, index) => {
            bodyContainer.insertAdjacentElement("beforeend", `
                <div id="pageContainer2">
                    <div>Course Information</div>
                    <div>Name: ${course.name}${course.city}${course.state_or_province}</div>
                    <div>Holes: ${course.hole_count}</div>
                    <div>Tee Types: ${course.holes[1].tee_type} Yards: ${course.holes[1].yards}</div>
                </div>
            `)
        })
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
    xmlhttp2.open("GET", golfAPI, true);
    xmlhttp2.setRequestHeader('ContentType', 'application/json');
    xmlhttp2.send();
}