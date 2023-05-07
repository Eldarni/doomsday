
//
import React, { useState } from 'react'

//
import { format } from 'date-fns'

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

    //split the date into some useful values
    const century = Math.floor(targetDate.getFullYear() / 100) * 100
    const year    = targetDate.getFullYear()
    const month   = (targetDate.getMonth() + 1)
    const date    = targetDate.getDate()

    //
    return (
        <React.Fragment>
            
            <h1 className="targetDate">{format(targetDate, 'yyyy-MM-dd')}</h1>

            <QuestionOne century={century} />
            <QuestionTwo year={year} />
            <QuestionThree targetDate={targetDate} />
            <QuestionFour targetDate={targetDate} />

        </React.Fragment>
    )

}

export default App
