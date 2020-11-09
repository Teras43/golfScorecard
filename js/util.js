function addProTeeYardage() {
    let total = 0;
    singleCourse.data.holes.forEach(i => {
        if(singleCourse.data.holes[i].includes(teeBoxes[0])) {
            total += singleCourse.data.holes[i].teeBoxes[0].yards;
        };
    });
    if (total !== 0) {
        return console.log(total);
    } else {
        return console.log("Not working");
    }
}