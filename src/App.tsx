
//
import React, { useState } from 'react'

//
import __ from './i18n'

//
import { createRandomDate } from './functions'

//
import QuestionOne from './QuestionOne'      //What is the anchor day for the century?
import QuestionTwo from './QuestionTwo'      //What is the anchor date for the year?
import QuestionThree from './QuestionThree'  //What is the nearest doomsday to the date?
import QuestionFour from './QuestionFour'    //What day of the week is the date on?

//
function App() {

    //
    const [ targetDate, setTargetDate ] = useState(createRandomDate())

    //
    return (
        <React.Fragment>

            <h1 className="targetDate">{__`What day does ${targetDate}:d(P) land on?`}</h1>

            <QuestionOne targetDate={targetDate} />
            <QuestionTwo targetDate={targetDate} />
            <QuestionThree targetDate={targetDate} />
            <QuestionFour targetDate={targetDate} />

        </React.Fragment>
    )

}

//
export default App