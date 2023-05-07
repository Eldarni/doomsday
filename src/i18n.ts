
//import the translations
import enGB from './languages/en-GB.json' //with { type: "json" };
import deDE from './languages/de-DE.json' //with { type: "json" };

//defaine the available translations
const translations = {
    'en-GB' : enGB,
    'de-DE' : deDE,
}

//what locale to use
const locale = 'de-DE'

// Matches optional type annotations in i18n strings. 
// e.g. i18n`This is a number ${x}:n(2)` formats x as number with two fractional digits.
const typeAnnotationsRegex = /^:([a-z])(\((.+)\))?/

//format the value based on the type annotations, if no annotation is found, it defaults to ":s"
const localizers = {

    //
    's': (value:string) => {
        return value
    },

    //
    'n': (value:number, fractionalDigits:number) => {
        return value.toLocaleString(locale, {
            minimumFractionDigits: fractionalDigits,
            maximumFractionDigits: fractionalDigits
        })
    }

}

//main translation function - used as a tag on template literals
function __(strings:string[], ...values:unknown[]) {

    //
    let translationKey = buildTranslationKey(strings)

    //
    let translationString = translations[locale][translationKey]

    //
    if (translationString) {
        let typeInfoForValues = strings.slice(1).map(extractTypeAnnotation)
        let localizedValues = values.map((v, i) => localiseValue(v, typeInfoForValues[i]))
        return buildMessage(translationString, ...localizedValues)
    }

    //
    return 'Error: translation missing!'

}

//parse the annotations, and return a object to pass to the localiser function
function extractTypeAnnotation(value:string) {
    let match = typeAnnotationsRegex.exec(value)
    if (match) {
        return { 'type': match[1], 'options': match[3] }
    } else {
        return { 'type': 's', 'options': '' }
    }
}

//use the appropiate localiser on the value
function localiseValue(value:unknown, { type, options }) {
    return localizers[type](value, options)
}

//conver the incoming strings data into a key that we can use to lookup the appropiate translation
function buildTranslationKey(strings:string[]) {

    //define a funtion to strip the type annotiations from the strings
    const stripAnnotations = (string:string) => { 
        return string.replace(typeAnnotationsRegex, '')
    }

    //strip the annotations from the last element first, and use this to bu
    const lastPartialKey = stripAnnotations(strings[strings.length - 1])

    //
    const prependPartialKey = (initialValue:string, currentValue:string, index:number) => { 
        return `${stripAnnotations(currentValue)}{${index}}${initialValue}`
    }
    return strings.slice(0, -1).reduceRight(prependPartialKey, lastPartialKey)

}

//build the final translated string by replacing the numbered placeholders with the appropiate values
function buildMessage(string:string, ...values:string[]) {
    return string.replace(/{(\d)}/g, (_, index) => { 
        return values[Number(index)]
    })
}

//
export default __