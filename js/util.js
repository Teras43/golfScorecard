function getPlayerScore() {
    
}

function getTeeYardage() {
    let teeList = document.getElementById('teeDropMenu');
    let outTotal = 0;
    let inTotal = 0;
    if (teeList.value === 'pro') {
        singleCourse.data.holes.forEach((i, val) => {
            if (i.teeBoxes[3] !== undefined) {
                $(`.yardsHole${val + 1}`).html(i.teeBoxes[0].yards)
                if (val < 9) {
                    outTotal += i.teeBoxes[0].yards;
                } else if (val > 8 && val < 18) {
                    inTotal += i.teeBoxes[0].yards;
                }
                $(`.yardsOut`).html(outTotal);
                $(`.yardsIn`).html(inTotal);
            }
        });
        $(`.totalsYards`).html(outTotal + inTotal);
        outTotal = 0;
        intotal = 0;
    } else if (teeList.value === 'champ') {
        singleCourse.data.holes.forEach((i, val) => {
            if (i.teeBoxes[3] !== undefined) {
                $(`.yardsHole${val + 1}`).html(i.teeBoxes[1].yards)
                if (val < 9) {
                    outTotal += i.teeBoxes[1].yards;
                } else if (val > 8 && val < 18) {
                    inTotal += i.teeBoxes[1].yards;
                }
                $(`.yardsOut`).html(outTotal);
                $(`.yardsIn`).html(inTotal);
            } else {
                $(`.yardsHole${val + 1}`).html(i.teeBoxes[0].yards)
                if (val < 9) {
                    outTotal += i.teeBoxes[0].yards;
                } else if (val > 8 && val < 18) {
                    inTotal += i.teeBoxes[0].yards;
                }
                $(`.yardsOut`).html(outTotal);
                $(`.yardsIn`).html(inTotal);
            }
        });
        $(`.totalsYards`).html(outTotal + inTotal);
        outTotal = 0;
        intotal = 0;
    } else if (teeList.value === 'men') {
        singleCourse.data.holes.forEach((i, val) => {
            if (i.teeBoxes[3] !== undefined) {
                $(`.yardsHole${val + 1}`).html(i.teeBoxes[2].yards)
                if (val < 9) {
                    outTotal += i.teeBoxes[2].yards;
                } else if (val > 8 && val < 18) {
                    inTotal += i.teeBoxes[2].yards;
                }
                $(`.yardsOut`).html(outTotal);
                $(`.yardsIn`).html(inTotal);
            } else {
                $(`.yardsHole${val + 1}`).html(i.teeBoxes[1].yards)
                if (val < 9) {
                    outTotal += i.teeBoxes[1].yards;
                } else if (val > 8 && val < 18) {
                    inTotal += i.teeBoxes[1].yards;
                }
                $(`.yardsOut`).html(outTotal);
                $(`.yardsIn`).html(inTotal);
            }
        });
        $(`.totalsYards`).html(outTotal + inTotal);
        outTotal = 0;
        intotal = 0;
    } else if (teeList.value === 'women') {
        singleCourse.data.holes.forEach((i, val) => {
            if(i.teeBoxes[3] !== undefined) {
                $(`.yardsHole${val + 1}`).html(i.teeBoxes[3].yards)
                if (val < 9) {
                    outTotal += i.teeBoxes[3].yards;
                } else if (val > 8 && val < 18) {
                    inTotal += i.teeBoxes[3].yards;
                }
                $(`.yardsOut`).html(outTotal);
                $(`.yardsIn`).html(inTotal);
            } else {
                $(`.yardsHole${val + 1}`).html(i.teeBoxes[2].yards)
                if (val < 9) {
                    outTotal += i.teeBoxes[2].yards;
                } else if (val > 8 && val < 18) {
                    inTotal += i.teeBoxes[2].yards;
                }
                $(`.yardsOut`).html(outTotal);
                $(`.yardsIn`).html(inTotal);
            }
        });
        $(`.totalsYards`).html(outTotal + inTotal);
        outTotal = 0;
        intotal = 0;
    }
};

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
        };
    });
    return {proTotal, champTotal, menTotal, womenTotal};
};

function addPar() {
    let outPar = 0;
    let inPar = 0;
    let totalPar = 0;
    singleCourse.data.holes.forEach((val, i) => {
        if (i < 9) {
            outPar += val.teeBoxes[0].par
        } else if (i > 8 && i < 18) {
            inPar += val.teeBoxes[0].par;
        }
    })
    totalPar = outPar + inPar;
    $(`.outPar`).html(outPar);
    $(`.inPar`).html(inPar);
    $(`.totalPar`).html(totalPar);
}