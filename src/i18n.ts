
//import the translations and localiser/helper functions (some of these are just passed directly to the export)
import { translations, formatDate, formatOrdinalNumber, getNameOfDay, getNameOfMonth } from './languages'

//format the value based on the type annotations, if no annotation is found, it defaults to ":s"
const localizers = {
    's': (value:string) => value,
    'd': (value:Date, pattern:string) => formatDate(value, pattern),
    'o': (value:number) => formatOrdinalNumber(value),
}

//main translation function - used as a tag on template literals
function __(strings:TemplateStringsArray, ...values:unknown[]) {

    //
    let translationKey = buildTranslationKey(strings)

    //
    let translationString = translations[translationKey]

    //
    if (translationString) {
        let typeInfoForValues = strings.slice(1).map(extractTypeAnnotation)
        let localizedValues = values.map((v, i) => localiseValue(v, typeInfoForValues[i]))
        return buildMessage(translationString, ...localizedValues)
    }

    //
    console.warn(`Translation missing for key: "${translationKey}"`)

    //
    return 'Error: translation missing!'

}

//parse the annotations, and return a object to pass to the localiser function
function extractTypeAnnotation(value:string) {
    let match = /^:([a-z])(\((.+)\))?/.exec(value)
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
function buildTranslationKey(strings:TemplateStringsArray) {

    //define a funtion to strip the type annotiations from the strings
    const stripAnnotations = (string:string) => { 
        return string.replace(/^:([a-z])(\((.+)\))?/, '')
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
export { __, getNameOfDay, getNameOfMonth }
