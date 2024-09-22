
//
import React, { useState } from 'react'

//
import __ from './i18n'

//
import { availableLanguages } from './languages'

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
    const [ targetDate ] = useState(createRandomDate())

    //
    const [ cheatMode, setCheatMode ] = useState(false)

    //
    const setLanguage = (locale: string) => {
        window.localStorage.setItem('locale', locale)
        window.location.reload()
    }

    //
    const setTheme = (theme: string) => {
        window.localStorage.setItem('theme', theme)
        window.location.reload()
    }

    //listen out for the super secret cheat code
    React.useEffect(() => {

        //
        const cheatCode = 'iamnotconway'

        //
        const checkForCheatMode = (event: KeyboardEventInit) => {

            //
            window.sessionStorage.setItem('history', (window.sessionStorage.getItem('history')?.slice(cheatCode.length * -1) || '') + event.key)

            //
            const currentKeyPressHistory = window.sessionStorage.getItem('history') || ''
            if (currentKeyPressHistory?.slice(cheatCode.length * -1) === cheatCode) {
                setCheatMode(true)
            }

        }

        //
        document.addEventListener('keypress', checkForCheatMode)

        //
        return () => {
            document.removeEventListener('keypress', checkForCheatMode)
        }

    }, [])

    //
    document.body.setAttribute('data-theme', (window.localStorage.getItem('theme') || ((window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light') || 'dark'))

    //
    return (
        <React.Fragment>

            <h1 className="targetDate">{__`What day does ${targetDate}:d(P) land on?`}</h1>

            <QuestionOne   cheatMode={cheatMode} targetDate={targetDate} />
            <QuestionTwo   cheatMode={cheatMode} targetDate={targetDate} />
            <QuestionThree cheatMode={cheatMode} targetDate={targetDate} />
            <QuestionFour  cheatMode={cheatMode} targetDate={targetDate} />

            <footer>
                <div className="languageSelector">
                    {availableLanguages.map((languages) => <div onClick={() => setLanguage(languages.locale)}>{languages.label}</div> )}
                </div>

                <div className="themeSelector">
                    <div onClick={() => setTheme('light')}>Light</div>
                    <div onClick={() => setTheme('dark')}>Dark</div>
                </div>

            </footer>

        </React.Fragment>
    )

}

//
export default App