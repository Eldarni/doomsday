
//
import React, { useState } from 'react'

//
import { __, getNameOfDay } from './i18n'

//
import { getAnchorDayForYear } from './functions'

//Question Two: What is the anchor date for the year?
function QuestionTwo(props: { targetDate: Date }) {

    //
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)

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
    const handleButtonClick = (answer: number) => {

        //update the clicked button with the correct states (basically set if it was a correct or incorrect answer) (using let as we may update this a couple of times)
        let updatedButtons = buttons.map((button) => ((button.day === answer) ? { ...button, clicked: true, enabled: false, correct: (answer == getAnchorDayForYear(year)) } : button ))

        //count how many wrong answers we have (from the clicked buttons) - if it's one, then disable two wrong buttons
        if (updatedButtons.filter((button) => button.clicked && button.correct === false).length == 1) {
            for (var i = 0; i < 2; i++) {

                //get any remaining options, filter out the correct value, and any that have already been clicked - we are going to
                const remainingButtons = updatedButtons.filter((button) => button.clicked == false && button.enabled == true && button.day !== getAnchorDayForYear(year))

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
    return (
        <React.Fragment>

            <fieldset className="questionWrapper" disabled={showCorrectAnswer}>

                <p className="questionText">{__`What is the anchor day for the year ${year}?`}</p>
                <div className="questionOptions">
                    {buttons.map((button) => (
                        <button key={button.day} onClick={() => handleButtonClick(button.day)} disabled={!button.enabled} className={button.clicked ? (button.correct ? 'correct' : 'incorrect') : ''}>
                            {getNameOfDay(button.day)}
                        </button>
                    ))}
                </div>

                {showCorrectAnswer === true &&
                    <p className="questionAnswer">{__`The correct answer is ${getAnchorDayForYear(year)}:d(EEEE).`}</p>
                }

            </fieldset>

        </React.Fragment>
    )
}

//
export default QuestionTwo