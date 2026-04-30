
//
import React, { useState } from 'react'

//
import { __, getNameOfDay } from './i18n'

//
import { makeClassName, getAnchorDayForYear, getAnchorDayForYearWithWorking } from './functions'

//Question Two: What is the anchor date for the year?
function QuestionTwo(props: { cheatMode: boolean, targetDate: Date }) {

    //
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)
    const [showHelpText, setShowHelpText] = useState(false)

    //
    const [buttons, setButtons] = useState([
        { 'day': 1, 'enabled': true, 'clicked': false, 'correct': false },
        { 'day': 2, 'enabled': true, 'clicked': false, 'correct': false },
        { 'day': 3, 'enabled': true, 'clicked': false, 'correct': false },
        { 'day': 4, 'enabled': true, 'clicked': false, 'correct': false },
        { 'day': 5, 'enabled': true, 'clicked': false, 'correct': false },
        { 'day': 6, 'enabled': true, 'clicked': false, 'correct': false },
        { 'day': 0, 'enabled': true, 'clicked': false, 'correct': false },
    ]);

    //
    const year = props.targetDate.getFullYear()

    //
    const correctAnswer = getAnchorDayForYear(year);

    //
    const handleButtonClick = (answer: number) => {

        //update the clicked button with the correct states (basically set if it was a correct or incorrect answer) (using let as we may update this a couple of times)
        let updatedButtons = buttons.map((button) => ((button.day === answer) ? { ...button, clicked: true, enabled: false, correct: (answer == correctAnswer) } : button ))

        //count how many wrong answers we have (from the clicked buttons) - if it's one, then disable two wrong buttons
        if (updatedButtons.filter((button) => button.clicked && button.correct === false).length == 1) {
            for (let i = 0; i < 2; i++) {

                //get any remaining options, filter out the correct value, and any that have already been clicked - we are going to
                const remainingButtons = updatedButtons.filter((button) => button.clicked == false && button.enabled == true && button.day !== correctAnswer)

                //disable a day at random
                const dayToDisable = remainingButtons[Math.floor(Math.random() * remainingButtons.length)].day
                updatedButtons = updatedButtons.map((button) => ((button.day === dayToDisable) ? { ...button, enabled: false } : button ))

            }
        }

        //if they got an answer wrong again - just tell them the correct answer
        if (updatedButtons.filter((button) => button.clicked && button.correct === false).length == 2) {
            setShowCorrectAnswer(true)
        }

        //
        setButtons(updatedButtons)

    };

    //
    const { AC, T0, T1, T2, T3, T4, T5, T6 } = getAnchorDayForYearWithWorking(year)

    //
    return (
        <React.Fragment>

            <fieldset className="questionWrapper" disabled={showCorrectAnswer}>

                {!showCorrectAnswer === true && (
                    <button className="showHelpTextButton" onClick={() => setShowHelpText(!showHelpText)}>?</button>
                )}

                <p className="questionText">{__`What is the anchor day for the year ${year}?`}</p>
                <div className="questionOptions">
                    {buttons.map((button) => (
                        <button key={button.day} onClick={() => handleButtonClick(button.day)} disabled={!button.enabled} className={makeClassName({ 'correct': button.clicked && button.correct, 'incorrect': button.clicked && !button.correct, 'highlight': props.cheatMode && button.day == correctAnswer })}>
                            {getNameOfDay(button.day)}
                        </button>
                    ))}
                </div>

                {showCorrectAnswer === true &&
                    <p className="questionAnswer">{__`The correct answer is ${getNameOfDay(correctAnswer)}.`}</p>
                }

                {(showCorrectAnswer === true || showHelpText === true) &&
                    <div className="helpText helpTextQuestionTwo">

                        <div className="helpTextApology">
                            <p>{__`Sorry, I have not implemented a translation for this help text yet.`}</p>
                        </div>

                        <main>
                            <p>To calculate the anchor day for any year, follow these steps:</p>
                            <ul>

                                <li>Take the last 2 digits of the year so <code>{year} = {T0}</code>.</li>

                                { T0 % 2 === 1 ? (
                                    <li>As {T0} is odd, add 11, so <code>{T0} + 11 = {T1}</code>.</li>
                                ) : (
                                    <li>As {T0} is even, do nothing, (if it was odd, we would have added 11).</li>
                                )}

                                <li>Divide {T1} by 2, so <code>{T1} / 2 = {T2}</code>.</li>

                                { T2 % 2 === 1 ? (
                                    <li>As {T2} is odd, add 11, so <code>{T2} + 11 = {T3}</code>.</li>
                                ) : (
                                    <li>As {T2} is even, do nothing, (if it was odd, we would have added 11).</li>
                                )}

                                { T3 % 7 === 0 ? (
                                    <li>As {T3} is divisible by 7, we can skip the next step.</li>
                                ) : (
                                    <li>Work out the remainder when dividing by 7 <code>({T3} % 7 = {T3 % 7})</code>, as {T3} is slightly more than {Math.floor(T3 / 7) * 7} we can just do <code>{T3} - {Math.floor(T3 / 7) * 7} = {T4}</code>.</li>
                                ) }

                                <li>Subtract {T4} from 7, so <code>7 - {T4} == {T5}</code></li>

                                <li>Then add the result to the anchor day for the century (which is {getNameOfDay(AC)} or {AC}) <code>{T5} + {AC} == {T6}</code>.</li>

                                <li>Finally, take the result and wrap it around if it's greater than 6, so <code>{T6} mod 7 = {T6 % 7}</code>.</li>

                                <li><b>The answer is {getNameOfDay(T6 % 7)}!</b></li>

                            </ul>
                        </main>

                        <aside>
                            {Array.from({ length: 14 }).map((_, i) => {
                                const multiple = (i + 1) * 7;
                                return (
                                    <div key={i} className={T3 > multiple && T3 < multiple + 7 ? "highlight" : ""}>7 × {i + 1} = {multiple}</div>
                                )
                            })}
                        </aside>

                    </div>
                }

            </fieldset>

        </React.Fragment>
    )
}

//
export default QuestionTwo