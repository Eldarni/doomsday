
//import the translations
import enTranslations from './languages/en-GB.json' //with { type: "json" };
import deTranslations from './languages/de-DE.json' //with { type: "json" };
import afTranslations from './languages/af.json' //with { type: "json" };

//get the format function from data-fns
import { format } from 'date-fns/esm'

//import the locales for dates
import { enGB, de, af } from 'date-fns/esm/locale'

//get the chosen locale
const locale = window.localStorage.getItem('locale') || 'en-GB'

//define a list of all the available languages - for the language selection
const availableLanguages = [
    { 'label': 'English',   'locale': 'en-GB' },
    { 'label': 'Deutsch',   'locale': 'de-DE' },
    { 'label': 'Afrikaans', 'locale': 'af'    },
]

//build up a list of all the available translations, so that we can pull the selected translation for export
const availableTranslations: { [key: string] : { [key: string]: string } } = {
    'en-GB' : enTranslations,
    'de-DE' : deTranslations,
    'af'    : afTranslations,
}

//build up a list of all the available date locales, so that we can pull the selected locale for export
const availableDateLocales: { [key: string] : Locale } = {
    'en-GB' : enGB,
    'de-DE' : de,
    'af'    : af,
}

//
const translations = availableTranslations[locale]
const dateLocale   = availableDateLocales[locale]

//format a date using data-fns and the slected locale
function formatDate(date: Date, pattern: string) : string {
    return format(date, pattern, {
        'locale': dateLocale,
        'useAdditionalWeekYearTokens': true,
        'useAdditionalDayOfYearTokens': true,
    })
}

//utility fuctions for looking up the corrct day name
function formatOrdinalNumber(number: number) : string {
    return dateLocale?.localize?.ordinalNumber(number) || String(number)
}

//utility fuctions for looking up the corrct day name
function getNameOfDay(day: number) : string {
    return dateLocale?.localize?.day(day, 'wide') || String(day)
}

//utility fuctions for looking up the corrct day name
function getNameOfMonth(month: number) : string {
    return dateLocale?.localize?.month(month, 'wide') || String(month)
}

//
export { availableLanguages, translations, formatDate, formatOrdinalNumber, getNameOfDay, getNameOfMonth }
