
//
import React, { useState } from 'react'

//
import { convertDayNumberToName, getAnchorDayForCentury, getCenturyString } from './functions'

//Question One: What is the anchor day for the century?
function QuestionOne(props: { targetDate: Date }) {

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
    const century = Math.floor(props.targetDate.getFullYear() / 100) * 100

    //
    const handleButtonClick = (answer: number) => {

        //update the clicked button with the correct states (basically set if it was a correct or incorrect answer) (using let as we may update this a couple of times)
        let updatedButtons = buttons.map((button) => ((button.day === answer) ? { ...button, clicked: true, enabled: false, correct: (answer == getAnchorDayForCentury(century)) } : button ))

        //count how many wrong answers we have (from the clicked buttons) - if it's one, then disable two wrong buttons
        if (updatedButtons.filter((button) => button.clicked && button.correct === false).length == 1) {
            for (var i = 0; i < 2; i++) {

                //get any remaining options, filter out the correct value, and any that have already been clicked - we are going to
                const remainingButtons = updatedButtons.filter((button) => button.clicked == false && button.enabled == true && button.day !== getAnchorDayForCentury(century))

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

                <p className="questionText">What is the anchor day for the {getCenturyString(props.targetDate)} century?</p>
                <div className="questionOptions">
                    {buttons.map((button) => (
                        <button key={button.day} onClick={() => handleButtonClick(button.day)} disabled={!button.enabled} className={button.clicked ? (button.correct ? 'correct' : 'incorrect') : ''}>
                            {convertDayNumberToName(button.day)}
                        </button>
                    ))}
                </div>

                {showCorrectAnswer === true &&
                    <p className="questionAnswer">The correct answer is <b>{convertDayNumberToName(getAnchorDayForCentury(century))}</b>.</p>
                }

            </fieldset>

        </React.Fragment>
    )

}

//
export default QuestionOne
