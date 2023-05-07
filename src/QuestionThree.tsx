
//
import React, { useState } from 'react'
import { format, isSameDay, subDays } from 'date-fns'

//
import { getDateOfNearestDoomsday } from './functions'

//Question Three: What is the nearest doomsday to the date?
function QuestionThree(props: { targetDate: Date }) {

    //
    const [buttons, setButtons] = useState([
        { 'id' : 1, 'date': subDays(props.targetDate, 6), 'enabled': true, 'clicked': false, 'correct': false },
        { 'id' : 2, 'date': subDays(props.targetDate, 5), 'enabled': true, 'clicked': false, 'correct': false },
        { 'id' : 3, 'date': subDays(props.targetDate, 4), 'enabled': true, 'clicked': false, 'correct': false },
        { 'id' : 4, 'date': subDays(props.targetDate, 3), 'enabled': true, 'clicked': false, 'correct': false },
        { 'id' : 5, 'date': subDays(props.targetDate, 2), 'enabled': true, 'clicked': false, 'correct': false },
        { 'id' : 6, 'date': subDays(props.targetDate, 1), 'enabled': true, 'clicked': false, 'correct': false },
        { 'id' : 7, 'date': subDays(props.targetDate, 0), 'enabled': true, 'clicked': false, 'correct': false },
    ]);

    //
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)

    //calculate the correct answer
    const correctDate = getDateOfNearestDoomsday(props.targetDate)

    //
    const handleButtonClick = (answer: Date) => {

        //update the clicked button with the correct states (basically set if it was a correct or incorrect answer) (using let as we may update this a couple of times)
        let updatedButtons = buttons.map((button) => ((isSameDay(answer, button.date)) ? { ...button, clicked: true, enabled: false, correct: (isSameDay(answer, correctDate)) } : button ))

        //count how many wrong answers we have (from the clicked buttons) - if it's one, then disable two wrong buttons
        if (updatedButtons.filter((button) => button.clicked && button.correct === false).length == 1) {
            for (var i = 0; i < 2; i++) {

                //get any remaining options, filter out the correct value, and any that have already been clicked - we are going to
                const remainingButtons = updatedButtons.filter((button) => button.clicked == false && button.enabled == true && !isSameDay(button.date, correctDate))

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

    };

    //
    return (
        <React.Fragment>

            <fieldset className="questionWrapper" disabled={showCorrectAnswer}>

                <p className="questionText">What is the nearest doomsday for <b>{format(props.targetDate, 'MMMM do')}</b>?</p>
                <div className="questionOptions">
                    {buttons.map((button) => (
                        <button key={button.id} onClick={() => handleButtonClick(button.date)} disabled={!button.enabled} className={button.clicked ? (button.correct ? 'correct' : 'incorrect') : ''}>
                            {format(new Date(button.date), 'do') } <small>{format(new Date(button.date), 'MMMM') }</small>
                        </button>
                    ))}
                </div>

                {showCorrectAnswer === true &&
                    <p className="questionAnswer">The correct answer is <b>{format(getDateOfNearestDoomsday(props.targetDate), 'MMMM do')}</b>.</p>
                }

            </fieldset>

        </React.Fragment>
    )

}

//
export default QuestionThree