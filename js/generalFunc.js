function saveData() {
    localStorage.setItem('savedData', JSON.stringify(savedData));
};

function loadData() {
    const loadedData = localStorage.getItem('savedData')
    if (loadedData) {
        JSON.parse(loadedData);
    } else {
        return;
    }
};

const animateAwayProperties = {
    marginTop: '125%',
    opacity: 0
};

function selectCourse(id) {
    let selectedCourse = document.getElementById(id);
    let topText = document.getElementById('chooseCourseTxt');
    [...document.getElementsByClassName('active')].forEach(element => {
        element.classList.remove('active');
    });
    selectedCourse.classList.add('active');
    const pageBody = selectedCourse.parentNode.parentNode;
    pageBody.animate(animateAwayProperties, 800);
    selectedCourse.classList.remove('active');
    setTimeout(() => {
        selectedCourse.parentNode.remove();
        topText.remove();
    }, 800);
    
    xmlhttp2.open("GET", golfAPI + '/' + id, true);
    xmlhttp2.setRequestHeader('ContentType', 'application/json');
    xmlhttp2.send();
    // loadData();
};

function addPlayers(event) {
    let nameInput = document.getElementById('nameInput');
    let playerNames = document.getElementById('players');
    if(event.type === 'keydown' && event.keyCode !== 13) return;
    if(nameInput.value === null || nameInput.value === undefined) return;
    if (savedData.hasOwnProperty(nameInput.value.toLowerCase())) {
        document.getElementById('errorMsgName').innerHTML = 'Player already exists!';
        nameInput.value = '';
        setTimeout(() => {
            document.getElementById('errorMsgName').innerHTML = '';
        }, 1800);
        return;
    } else if (Object.keys(savedData).length === 4) {
        document.getElementById('errorMsgName').innerHTML = 'Player Roster is Full!';
        setTimeout(() => {
            document.getElementById('errorMsgName').innerHTML = '';
        }, 1800);
        nameInput.value = '';
        return
    }
    if (nameInput.value === '') {
        return
    } else {
        playerNames.insertAdjacentHTML('beforeend', `
            <div>${nameInput.value}</div>
        `)
    }
    savedData[nameInput.value.toLowerCase()] = {};
    nameInput.value = '';
    // saveData();
};