function addTeeYardage() {
    let proTotal = 0;
    let champTotal = 0;
    let menTotal = 0;
    let womenTotal = 0;
    singleCourse.data.holes.forEach(val => {
        if (val.teeBoxes[3] === undefined) {
            champTotal += val.teeBoxes[0].yards;
            menTotal += val.teeBoxes[1].yards;
            womenTotal += val.teeBoxes[2].yards;
        } else {
            proTotal += val.teeBoxes[0].yards;
            champTotal += val.teeBoxes[1].yards;
            menTotal += val.teeBoxes[2].yards;
            womenTotal += val.teeBoxes[3].yards;
        }
    });
    return {proTotal, champTotal, menTotal, womenTotal};
};