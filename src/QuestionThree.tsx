
//
import React, { useState } from 'react'
import { isSameDay, subDays, getDate, getMonth } from 'date-fns'

//
import { __, formatOrdinalNumber, getNameOfMonth } from './i18n'

//
import { makeClassName, getDateOfNearestDoomsday } from './functions'

//Question Three: What is the nearest doomsday to the date?
function QuestionThree(props: { cheatMode: boolean, targetDate: Date }) {

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
    const [showHelpText, setShowHelpText] = useState(false)

    //calculate the correct answer
    const correctAnswer = getDateOfNearestDoomsday(props.targetDate)

    //
    const handleButtonClick = (answer: Date) => {

        //update the clicked button with the correct states (basically set if it was a correct or incorrect answer) (using let as we may update this a couple of times)
        let updatedButtons = buttons.map((button) => ((isSameDay(answer, button.date)) ? { ...button, clicked: true, enabled: false, correct: (isSameDay(answer, correctAnswer)) } : button ))

        //count how many wrong answers we have (from the clicked buttons) - if it's one, then disable two wrong buttons
        if (updatedButtons.filter((button) => button.clicked && button.correct === false).length == 1) {
            for (let i = 0; i < 2; i++) {

                //get any remaining options, filter out the correct value, and any that have already been clicked - we are going to
                const remainingButtons = updatedButtons.filter((button) => button.clicked == false && button.enabled == true && !isSameDay(button.date, correctAnswer))

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
    const table = [
        { "month": "January",              "day":  3, "date": "January 3rd",   "mnemonic": " - ",                                "days": [3, 10, 17, 24, 31] },
        { "month": "January (Leap Year)",  "day":  4, "date": "January 4th",   "mnemonic": " - ",                                "days": [4, 11, 18, 25]     },
        { "month": "February",             "day": 28, "date": "February 28th", "mnemonic": "The last day of February",           "days": [7, 14, 21, 28]     },
        { "month": "February (Leap Year)", "day": 29, "date": "February 29th", "mnemonic": "The last day of February",           "days": [1, 8, 15, 22, 29]  },
        { "month": "March",                "day": 14, "date": "March 14th",    "mnemonic": "Pi Day",                             "days": [7, 14, 21, 28]     },
        { "month": "April",                "day":  4, "date": "April 4th",     "mnemonic": "<b>4/4</b>, 6/6, 8/8, 10/10, 12/12", "days": [4, 11, 18, 25]     },
        { "month": "May",                  "day":  9, "date": "May 9th",       "mnemonic": "9-to-5 at the 7-11",                 "days": [2, 9, 16, 23, 30]  },
        { "month": "June",                 "day":  6, "date": "June 6th",      "mnemonic": "4/4, <b>6/6</b>, 8/8, 10/10, 12/12", "days": [6, 13, 20, 27]     },
        { "month": "July",                 "day": 11, "date": "July 11th",     "mnemonic": "9-to-5 at <b>7-11</b>",              "days": [4, 11, 18, 25]     },
        { "month": "August",               "day":  8, "date": "August 8th",    "mnemonic": "4/4, 6/6, <b>8/8</b>, 10/10, 12/12", "days": [1, 8, 15, 22, 29]  },
        { "month": "September",            "day":  5, "date": "September 5th", "mnemonic": "<b>9-to-5</b> at 7-11",              "days": [5, 12, 19, 26]     },
        { "month": "October",              "day": 10, "date": "October 10th",  "mnemonic": "4/4, 6/6, 8/8, <b>10/10</b>, 12/12", "days": [3, 10, 17, 24, 31] },
        { "month": "November",             "day":  7, "date": "November 7th",  "mnemonic": "9-to-5 at <b>7-11</b>",              "days": [7, 14, 21, 28]  },
        { "month": "December",             "day": 12, "date": "December 12th", "mnemonic": "4/4, 6/6, 8/8, 10/10, <b>12/12</b>", "days": [5, 12, 19, 26]     },
    ];

    //are we in a leap year?
    const isLeapYear = ((year) => {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    })(props.targetDate.getFullYear());

    //get the current month index - account for leap years etc
    const currentMonth = ((): { month: string; day: number; date: string; mnemonic: string; days: number[] } => {

        //all months except January and February
        if (props.targetDate.getMonth() >= 2) {
            return table[props.targetDate.getMonth() + 2];
        }

        //January
        if (props.targetDate.getMonth() === 0) {
            return ((!isLeapYear) ? table[0] : table[1]);
        }

        //February
        return ((!isLeapYear) ? table[2] : table[3]);

    })();

    //
    return (
        <React.Fragment>

            <fieldset className="questionWrapper" disabled={showCorrectAnswer}>

                {!showCorrectAnswer === true && (
                    <button className="showHelpTextButton" onClick={() => setShowHelpText(!showHelpText)}>?</button>
                )}

                <p className="questionText">{__`What is the nearest doomsday for ${props.targetDate}:d(MMMM do)?`}</p>
                <div className="questionOptions">
                    {buttons.map((button) => (
                        <button key={button.id} onClick={() => handleButtonClick(button.date)} disabled={!button.enabled} className={makeClassName({ 'correct': button.clicked && button.correct, 'incorrect': button.clicked && !button.correct, 'highlight': props.cheatMode && isSameDay(button.date, correctAnswer) })}>
                            {formatOrdinalNumber(getDate(button.date))} <small>{getNameOfMonth(getMonth((button.date)))}</small>
                        </button>
                    ))}
                </div>

                {showCorrectAnswer === true &&
                    <p className="questionAnswer">{__`The correct answer is ${getDateOfNearestDoomsday(props.targetDate)}:d(PPP).`}</p>
                }

                {(showCorrectAnswer === true || showHelpText === true) &&
                    <div className="helpText helpTextQuestionThree">

                        <div className="helpTextApology">
                            <p>{__`Sorry, I have not implemented a translation for this help text yet.`}</p>
                        </div>

                        <p>We can use a series of mnemonics to remember the doomsdays for each month, from there it's a matter of counting forward or backward to find the nearest one.</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Month</th>
                                    <th>Memorable date</th>
                                    <th>Mnemonic</th>
                                    <th>List</th>
                                </tr>
                            </thead>
                            <tbody>
                                {table.map((row) => (
                                    <tr key={row.month} className={((row.month === currentMonth.month) ? 'highlight' : '')}>
                                        <td>{row.month}</td>
                                        <td>{row.date}</td>
                                        <td dangerouslySetInnerHTML={{ __html: row.mnemonic }}></td>
                                        <td>
                                            {row.days.map((day, index) => (
                                                day == row.day ? (<span key={day}><b>{day}</b>{index < row.days.length - 1 ? ', ' : ''}</span>) : (<span key={day}>{day}{index < row.days.length - 1 ? ', ' : ''}</span>)
                                            ))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }

            </fieldset>

        </React.Fragment>
    )

}

//
export default QuestionThree