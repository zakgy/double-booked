const _year = 2017;

var doc = document.body.innerText;

allWords = doc.split (/\s|\n|,/);

//console.log(allWords);

var eventIndexes = [];
var events = [];

for (i in allWords) {
	if (findMonthNum(allWords[i]) > -1) {
		eventIndexes.push(i);
	}
}

//console.log (eventIndexes);

for (j in eventIndexes) {
	// check for valid formats
	if (allWords[Number(eventIndexes[j])+1] == parseInt(allWords[Number(eventIndexes[j])+1], 10)){
		// format: month day "at" time AM/PM
		if (allWords[Number(eventIndexes[j])+2] == "at") {
			var _month = allWords[eventIndexes[j]];
			var _day = allWords[Number(eventIndexes[j])+1];
			var _oldtime = allWords[Number(eventIndexes[j])+3];

			if ((allWords[Number(eventIndexes[j]) + 4]) === ("PM"))
				_time = Number(_oldtime) + 12;

			var _w = 5;

			if ((allWords[Number(eventIndexes[j]) + 5]) === ("-")) {
				_etime = allWords[Number(eventIndexes[j])+6];
				if ((allWords[Number(eventIndexes[j]) + 7]) === ("PM"))
					_etime = Number(_etime) + 12;
				_w += 3;
			}
			else
				_etime = Number(_time) + 2;

			var event = {year : _year, month : _month, sday : _day, stime : _time, stimeOLD : _oldtime, eday : _day, etime : _etime, wordLength : _w, index : j};
			events.push(event);
		}
		// format: month day "-" month day
		else if (allWords[Number(eventIndexes[j])+2] == "-") {
			var _month = allWords[eventIndexes[j]];
			var _day = allWords[Number(eventIndexes[j])+1];
			var _eday = allWords[Number(eventIndexes[j])+4];
			var event = {year : _year, month : _month, sday : _day, stime : 0, eday : _eday, etime : 24, wordLength : 5, index : j};
			events.push(event);
		}
	}
}

console.log(events);

var tag = "\\s?(<.{1,20}>)?\\s?";

var matchingEvent = {year : 2017, month : "January", sday : 26, stime : 0, stimeOLD : 0, eday : 26, etime : 24};

var calendar = [{year :2017, month : "January", sday : 26, stime : 18, stimeOLD : 6, eday : 26, etime : 21}, {year :2017, month : "February", sday : 4, stime : 0, stimeOLD : 0, eday : 5, etime : 0}, {year :2017, month : "January", sday : 23, stime : 0, stimeOLD : 0, eday : 24, etime : 0}, {year :2017, month : "January", sday : 24, stime : 10, stimeOLD : 10, eday : 24, etime : 15}, {year :2017, month : "January", sday : 25, stime : 12, stimeOLD : 12, eday : 25, etime : 16}, {year :2017, month : "January", sday : 29, stime : 9, stimeOLD : 9, eday : 29, etime : 13}, {year :2017, month : "January", sday : 27, stime : 11, stimeOLD : 11, eday : 27, etime : 14}, {year :2017, month : "January", sday : 26, stime : 9, stimeOLD : 9, eday : 26, etime : 11}, {year :2017, month : "January", sday : 22, stime : 0, stimeOLD : 0, eday : 23, etime : 0}, {year :2017, month : "January", sday : 28, stime : 14, stimeOLD : 2, eday : 28, etime : 18}, {year :2017, month : "January", sday : 30, stime : 5, stimeOLD : 5, eday : 30, etime : 7}, {year :2017, month : "February", sday : 2, stime : 7, stimeOLD : 7, eday : 2, etime : 14}, {year :2017, month : "February", sday : 1, stime : 12, stimeOLD : 12, eday : 1, etime : 18}, {year :2017, month : "January", sday : 30, stime : 14, stimeOLD : 2, eday : 30, etime : 17}, {year :2017, month : "January", sday : 31, stime : 9, stimeOLD : 9, eday : 31, etime : 14}, {year :2017, month : "February", sday : 3, stime : 6, stimeOLD : 6, eday : 3, etime : 13}, {year :2017, month : "January", sday : 29, stime : 15, stimeOLD : 3, eday : 29, etime : 20}];
//calendar.push(matchingEvent);


for (i in events) {
	for (j in calendar) {
		if (isBusy (events[i], calendar[j])) {
			console.log(i);
			var normDate = new RegExp(events[i].month + tag + events[i].sday + tag + "at" + tag + events[i].stimeOLD, "g");
			var dashDate = new RegExp(events[i].month + tag + events[i].sday + tag + "-" + tag + events[i].month + tag + events[i].eday, "g");
			console.log(normDate);
			document.body.innerHTML = document.body.innerHTML.replace(normDate, function myFunction(x){return "<div style=\"border: 3px solid orange; border-radius: 5px; background-color: lightgrey;\">"+x+"</div>";});
			document.body.innerHTML = document.body.innerHTML.replace(dashDate, function myFunction(x){return "<div style=\"border: 3px solid orange; border-radius: 5px; background-color: lightgrey;\">"+x+"</div>";});
		}
	}
}

function isBusy (event, calendarEvent) {
	if (event.year == calendarEvent.year && event.month == calendarEvent.month) {
		console.log(event.month);
		if (isOverlap(event.sday, event.eday, calendarEvent.sday, calendarEvent.eday)) {
			console.log(event.sday);
			if (isOverlap(event.stime, event.etime, calendarEvent.stime, calendarEvent.etime))
				return true;
		}
	}
	return false;
}

function isOverlap (x1, x2, y1, y2) {
	if (x2 < y1 || x1 > y2)
		return false;
	else
		return true;
}

function findMonthNum(monthName) {
  if (monthName == "January")
    return 0;
  else if (monthName == "February")
    return 1;
  else if (monthName == "March")
    return 2;
  else if (monthName == "April")
    return 3;
  else if (monthName == "May")
    return 4;
  else if (monthName == "June")
    return 5;
  else if (monthName == "July")
    return 6;
  else if (monthName == "August")
    return 7;
  else if (monthName == "September")
    return 8;
  else if (monthName == "October")
    return 9;
  else if (monthName == "November")
    return 10;
  else if (monthName == "December")
    return 11;
  else
    return -1;
};

function convertToEuroTime (oldtime) {
  if (oldtime.substring(oldtime.indexOf("M") - 1, oldtime.indexOf("M")) == "PM") {
    var newTime = oldtime.substring (0, oldtime.indexOf("M") - 2) + 12;
    return newTime;
  }
  else {
    var newTime = oldtime.substring (0, oldtime.indexOf("M") - 2);
    return newTime;
  }
};

chrome.runtime.onMessage.addListener(
  function(response, sender, sendResponse) {
    console.log(response);
  });