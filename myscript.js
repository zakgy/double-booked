const _year = 2017;

var doc = document.body.innerText;

allWords = doc.split (/\s|\n|,/);

console.log(allWords);

var eventIndexes = [];
var events = [];

for (i in allWords) {
	if (findMonthNum(allWords[i]) > -1) {
		eventIndexes.push(i);
	}
}

console.log (eventIndexes);

for (j in eventIndexes) {
	if (allWords[Number(eventIndexes[j])+1] == parseInt(allWords[Number(eventIndexes[j])+1], 10)){
		if (allWords[Number(eventIndexes[j])+2] == "at") {
			var _month = allWords[eventIndexes[j]];
			var _day = allWords[Number(eventIndexes[j])+1];
			var _time = allWords[Number(eventIndexes[j])+3];

			if ((allWords[Number(eventIndexes[j]) + 4]) === ("PM"))
				_time = Number(_time) + 12;
			
			if ((allWords[Number(eventIndexes[j]) + 5]) === ("-")) {
				_etime = allWords[Number(eventIndexes[j])+6];
				if ((allWords[Number(eventIndexes[j]) + 7]) === ("PM"))
					_etime = Number(_etime) + 12;
			}
			else
				_etime = Number(_time) + 2;

			var event = {year : _year, month : _month, sday : _day, stime : _time, eday : _day, etime : _etime};
			events.push(event);
		}
		else if (allWords[Number(eventIndexes[j])+2] == "-") {
			var _month = allWords[eventIndexes[j]];
			var _day = allWords[Number(eventIndexes[j])+1];
			var _eday = allWords[Number(eventIndexes[j])+4];
			var event = {year : _year, month : _month, sday : _day, stime : 0, eday : _eday, etime : 24};
			events.push(event);
		}
	}
}

console.log(events);

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