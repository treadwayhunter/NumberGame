export function gameArrayGenerator(correctSum: number) {
    const newArr = [0, 0, 0] // fine to preset.. it will always have 3

    const correctPos: number = Math.floor(Math.random() * 3);

    let wrongNum1Pos = 0;
    let wrongNum2Pos = 0;

    switch(correctPos) {
        case 0:
            wrongNum1Pos = 1;
            wrongNum2Pos = 2;
            break;
        case 1:
            wrongNum1Pos = 0;
            wrongNum2Pos = 2;
            break;
        case 2:
            wrongNum1Pos = 0;
            wrongNum2Pos = 1;
            break;
    }

    let wrongNum1: number = correctSum;
    let wrongNum2: number = correctSum;

    let wrongNum1Positive: boolean = Math.floor(Math.random() * 2) == 0 ? true : false;
    let wrongNum2Positive: boolean = Math.floor(Math.random() * 2) == 0 ? true : false;



    while (wrongNum1 === correctSum) {
        if (wrongNum1Positive) {
            wrongNum1 += Math.floor(Math.random() * 5);
        }
        else {
            wrongNum1 -= Math.floor(Math.random() * 5);
        }

        if (wrongNum1 < 0) {
            wrongNum1 *= -1;
        }
    }

    while (wrongNum2 === correctSum) {
        if (wrongNum2Positive) {
            wrongNum2 += Math.floor(Math.random() * 5);
        }
        else {
            wrongNum2 -= Math.floor(Math.random() * 5);
        }

        if (wrongNum2 < 0) {
            wrongNum2 *= -1;
        }

        if (wrongNum2 === wrongNum1) {
            wrongNum2 = correctSum;
        }
    }

    newArr[wrongNum1Pos] = wrongNum1;
    newArr[wrongNum2Pos] = wrongNum2;
    newArr[correctPos] = correctSum;

    return newArr;
}