
//
import React, { useState } from 'react'
import { format } from 'date-fns'

//
import { __, getNameOfDay } from './i18n'

//Question Four: (Now this is the big one) - What day of the week is the date on?
function QuestionFour(props: { targetDate: Date }) {

    //
    const [buttons, setButtons] = useState([
        { 'id' : 1, 'day': 1, 'enabled': true, 'clicked': false, 'correct': false },
        { 'id' : 2, 'day': 2, 'enabled': true, 'clicked': false, 'correct': false },
        { 'id' : 3, 'day': 3, 'enabled': true, 'clicked': false, 'correct': false },
        { 'id' : 4, 'day': 4, 'enabled': true, 'clicked': false, 'correct': false },
        { 'id' : 5, 'day': 5, 'enabled': true, 'clicked': false, 'correct': false },
        { 'id' : 6, 'day': 6, 'enabled': true, 'clicked': false, 'correct': false },
        { 'id' : 7, 'day': 0, 'enabled': true, 'clicked': false, 'correct': false },
    ]);

    //
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)

    //calculate the correct answer
    const correctDate = props.targetDate.getDay()

    //
    const handleButtonClick = (answer: number) => {

        //update the clicked button with the correct states (basically set if it was a correct or incorrect answer) (using let as we may update this a couple of times)
        let updatedButtons = buttons.map((button) => ((button.day == answer) ? { ...button, clicked: true, enabled: false, correct: correctDate == answer } : button ))

        //count how many wrong answers we have (from the clicked buttons) - if it's one, then disable two wrong buttons
        if (updatedButtons.filter((button) => button.clicked && button.correct === false).length == 1) {
            for (var i = 0; i < 2; i++) {

                //get any remaining options, filter out the correct value, and any that have already been clicked - we are going to
                const remainingButtons = updatedButtons.filter((button) => button.clicked == false && button.enabled == true && (button.day != correctDate))

                //disable one of the buttons
                const buttonToDisable = remainingButtons[Math.floor(Math.random() * remainingButtons.length)].id
                updatedButtons = updatedButtons.map((button) => ((button.id === buttonToDisable) ? { ...button, enabled: false } : button ))

            }
        }

        //if they got an answer wrong again - just tell them the correct answer
        if (updatedButtons.filter((button) => button.clicked && button.correct === false).length == 2) {
            setShowCorrectAnswer(true)
        }

        //
        setButtons(updatedButtons)

    }

    //
    return (
        <React.Fragment>

            <fieldset className="questionWrapper" disabled={showCorrectAnswer}>

                <p className="questionText">{__`And finally, what day of the of the week does the ${props.targetDate}:d(PPP) fall on?`}</p>
                <div className="questionOptions">
                    {buttons.map((button) => (
                        <button key={button.day} onClick={() => handleButtonClick(button.day)} disabled={!button.enabled} className={button.clicked ? (button.correct ? 'correct' : 'incorrect') : ''}>
                            {getNameOfDay(button.day)}
                        </button>
                    ))}
                </div>

                {showCorrectAnswer === true &&
                    <p className="questionAnswer">{__`The correct answer is ${props.targetDate}:d(EEEE).`}</p>
                }

            </fieldset>

        </React.Fragment>
    )

}

//
export default QuestionFour