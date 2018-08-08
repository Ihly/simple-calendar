// Things i want to do with this code:
// Create a generateCalendar function that gets called whenever the page loads or arrows are clicked.
// Find more effective ways of doing certain things.

let d = new Date();

let currentYear = d.getFullYear();
let currentMonth = d.getMonth();
let nextMonth = "";
let prevMonth = "";
let nextMonthDays = [];
let prevMonthDays = [];
let currentDay = d.getDate();
console.log(currentMonth, currentYear);

// let currentLastDay = new Date(currentYear + "-" + currentMonth + "-" + lastDateInMonth(currentYear, currentMonth)).getDay();
// let currentFirstDay = new Date("2018-02-01").getDay();
// let currentFirstDay = new Date(currentYear + "-" + currentMonth + "-01").getDay();
// let currentLastDay = new Date(currentYear + currentMonth + 1, 0).getDay() - 1;
// let currentFirstDay = new Date(currentYear + currentMonth, 1).getDay();
var currentFirstDay;
var currentLastDay;

var FirstDay = new Date(currentYear, currentMonth, 1).getDay();
var LastDay = new Date(currentYear, currentMonth + 1, 0).getDay();
// var currentFirstDay = FirstDay.getDay();
// var currentLastDay = LastDay.getDay();
console.log(getDaysInMonth(currentMonth + 1, currentYear));
console.log(FirstDay);
console.log(LastDay);
if (FirstDay === 0) {
	currentFirstDay = 7;
	console.log("in if1");
} else {
	currentFirstDay = FirstDay;
}
if (LastDay == 0) {
	currentLastDay = 7;
	console.log("in if2");
} else {
	currentLastDay = LastDay;
}

console.log(currentFirstDay);
console.log(currentLastDay);

const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];

document.addEventListener(
	"DOMContentLoaded",
	function() {
		//Add current month name to the title of the calendar
		var monthElement = document.getElementById("monthName");
		monthElement.innerHTML = "";
		var monthText = document.createTextNode(monthNames[currentMonth]);
		monthElement.appendChild(monthText);

		// Create elements from previous month
		if (currentMonth == 0) {
			prevMonth = 11;
		} else {
			prevMonth = d.getMonth() - 1;
		}
		// Dont need to involve this in the above if, because only feb can have different amount of days, and that will work in the method below.
		prevMonthDays = getDaysInMonth(prevMonth, currentYear);
		console.log(prevMonthDays);
		// if (currentFirstDay == 0) {
		//     console.log("in if");
		//     var prevMonthDaysSliced = prevMonthDays.slice(-6);
		//     console.log(prevMonthDaysSliced);
		// }
		// else {
		//     console.log("else3");
		//     console.log(prevMonthDaysSliced);
		// }
		var prevMonthDaysSliced = prevMonthDays.slice(-(currentFirstDay - 1));

		for (let i = 0; i < currentFirstDay - 1 && i < 10; i++) {
			createDateElement(prevMonthDaysSliced[i], "not-current-month");
			// console.log("prevmonth - " + i);
		}

		//Create all elements for current month, and add a extra class to element for the current day
		for (let i = 1; i <= lastDateInMonth(currentMonth, currentYear); i++) {
			// console.log("currmonth - " + i);

			if (i == currentDay) {
				let isToday = true;
				createDateElement(i, "", isToday);
				console.log("in istoday if");
			} else {
				createDateElement(i, "");
			}
			console.log("in current for - " + i);
		}

		//Create elements for the start of next month to fill out th
		if (currentMonth == 11) {
			nextMonth = 0;
		} else {
			nextMonth = d.getMonth() + 1;
		}
		nextMonthDays = getDaysInMonth(nextMonth, currentYear);
		// console.log(nextMonthDays);

		currentNumber = "";
		let x = 0;
		for (let i = 7; i > currentLastDay && i > 0; i--) {
			// console.log("next   month - " + i);
			createDateElement(nextMonthDays[x], "not-current-month");
			x++;
		}
	},
	false
);

function createDateElement(t, c, isToday = false) {
	var e = document.createElement("div");
	e.className = c;
	var number = document.createTextNode(t);
	if (isToday) {
		e.className = "current-day";
	}
	e.appendChild(number);

	var dateEl = document.getElementById("date");
	dateEl.appendChild(e);
}

function lastDateInMonth(month, year) {
	return new Date(year, month + 1, 0).getDate();
}

function getDaysInMonth(month, year) {
	var date = new Date(year, month, 1);
	var days = [];
	var day = 1;
	while (date.getMonth() === month) {
		days.push(day);
		date.setDate(date.getDate() + 1);
		day++;
	}
	console.log(days);
	return days;
}
