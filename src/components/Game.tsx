import {Text, TouchableOpacity, TouchableOpacityProps, View} from "react-native";
import {StyleSheet} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useEffect, useState} from "react";

interface TargetNumberProps {
    x: number;
    y: number;
}

interface ScoreBoardProps {
    correct: number;
    incorrect: number;
}

interface GameButtonProps extends TouchableOpacityProps {
    value: number;
}

const GameButton = (props: GameButtonProps) => {
    const {value, ...rest} = props;

    return (
        <TouchableOpacity style={styles.gameButton} {...rest}>
            <Text style={styles.gameButtonText}>{value}</Text>
        </TouchableOpacity>
    );
}



const ScoreBoard = (props: ScoreBoardProps) => {
    return (
        <View>
            <Text>Correct: {props.correct}</Text>
            <Text>Wrong: {props.incorrect}</Text>
        </View>
    );
}

const TargetSum = (props: TargetNumberProps) => {
    return (
        <View style={styles.target}>
            <Text style={styles.targetText}>{props.x} + {props.y}</Text>
        </View>
    );
}

const Game = () => {
    const [numX, setNumX] = useState<number>(0);
    const [numY, setNumY] = useState<number>(0);
    const [numCorrect, setNumCorrect] = useState<number>(0);
    const [numIncorrect, setNumIncorrect] = useState<number>(0);
    const [buttonValues, setButtonValues] = useState<number[]>([]);

    const getValue = (value: number) => {
        if (value === (numX + numY)) {
            setNumCorrect(prev => prev + 1);
        }
        else {
            setNumIncorrect(prev => prev + 1);
        }
    }

    useEffect(() => {
        const randomX = Math.floor(Math.random() * 10);
        const randomY = Math.floor(Math.random() * 10);
        setNumX(randomX);
        setNumY(randomY);

        const sum = randomX + randomY;
        const correctPos = Math.floor(Math.random() * 3); // index of correct value

        const newArr = [0, 0, 0];
        for (let i = 0; i < 3; i++) {
            if (i === correctPos) {
                newArr[i] = sum;
            } //
            else {
                let wrongNum = sum;
                while (wrongNum === sum) {
                    wrongNum += Math.floor(Math.random() * 3);
                }
                newArr[i] = wrongNum;
            }
        }

        setButtonValues(newArr);

    }, [numCorrect, numIncorrect]);

    return (
        <SafeAreaView style={styles.game}>
            <ScoreBoard correct={numCorrect} incorrect={numIncorrect} />
            <TargetSum x={numX} y={numY} />
            <View style={styles.gameBoard}>
                <GameButton value={buttonValues[0]} onPress={() => getValue(buttonValues[0])}/>
                <GameButton value={buttonValues[1]} onPress={() => getValue(buttonValues[1])}/>
                <GameButton value={buttonValues[2]} onPress={() => getValue(buttonValues[2])}/>
            </View>
        </SafeAreaView>
    );
}

export default Game;

const styles = StyleSheet.create({
    game: {
        flex: 1,
        backgroundColor: 'lightblue'
    },
    gameBoard: {
        height: '30%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    gameButton: {
        height: 80,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 8,
        margin: 2,
        backgroundColor: 'white',
    },
    gameButtonText: {
        fontSize: 30
    },
    target: {
        height: '50%',
        width: '100%',
        margin: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
    },
    targetText: {
        fontSize: 64,
    },
})