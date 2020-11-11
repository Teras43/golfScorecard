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

// function getPar() {
//     let par1 = 0;
//     let par2 = 0;
//     let par3 = 0;
//     let par4 = 0;
//     let par5 = 0;
//     let par6 = 0;
//     let par7 = 0;
//     let par8 = 0;
//     let par9 = 0;
//     let par10 = 0;
//     let par11 = 0;
//     let par12 = 0;
//     let par13 = 0;
//     let par14 = 0;
//     let par15 = 0;
//     let par16 = 0;
//     let par17 = 0;
//     let par18 = 0;
//     singleCourse.data.holes.forEach(val => {
//         par1 =
//     })
// }