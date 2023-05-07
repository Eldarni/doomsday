
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

    //
    return (
        <React.Fragment>
            
            <h1 className="targetDate">{format(targetDate, 'yyyy-MM-dd')}</h1>

            <QuestionOne targetDate={targetDate} />
            <QuestionTwo targetDate={targetDate} />
            <QuestionThree targetDate={targetDate} />
            <QuestionFour targetDate={targetDate} />

        </React.Fragment>
    )

}

export default App
