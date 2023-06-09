
//
import { isLeapYear, setDate, subDays, differenceInCalendarDays, addDays } from 'date-fns'

//generate a random date
function createRandomDate(from: number = 1600, to: number = 2299) : Date {

    //get a random year
    const year = Math.floor(Math.random() * (to - from + 1)) + from

    //get a random month
    const month = Math.floor(Math.random() * 12)

    //get a random day (1 to the number of days in the selected month)
    const day = Math.floor(Math.random() * ((new Date(year, (month + 1), 0)).getDate())) + 1

    //
    return new Date(year, month, day);

}

//calculate the anchor day for the century
function getAnchorDayForCentury(century:number) : number {
    return (9 - (Math.floor(century / 100) % 4) * 2) % 7;
}

//calculate the anchor day for the year
function getAnchorDayForYear(year:number) : number {
    const lastTwoDigitsOfYear = (year % 100);
    return (lastTwoDigitsOfYear + Math.floor(lastTwoDigitsOfYear / 4) + getAnchorDayForCentury(Math.floor(year / 100) * 100)) % 7;
}

//Return the doomsday for the month, this returns the mnemonic date for extra points
function getDoomsdayForMonth(date: Date): Date {
    return setDate(date, ([((!isLeapYear(date)) ? 3 : 4), ((!isLeapYear(date)) ? 28 : 29), 14, 4, 9, 6, 11, 8, 5, 10, 7, 12])[date.getMonth()])
}

//calculate the nearest doomsday for the supplied date using "price is right" rules
function getDateOfNearestDoomsday(date: Date): Date {
    const doomsday = subDays(getDoomsdayForMonth(date), 35)
    return addDays(doomsday, Math.floor(differenceInCalendarDays(date, doomsday) / 7) * 7)
}

//
export { createRandomDate, getAnchorDayForCentury, getAnchorDayForYear, getDoomsdayForMonth, getDateOfNearestDoomsday }