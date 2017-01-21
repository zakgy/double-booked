var dates = ["January 3 at 6pm"];

var doc = document.body.innerText;

allWords = doc.split (" ");

console.log(allWords);

var eventIndexes = [];
var events = [];

for (i in allWords) {
	if (findMonthNum(allWords[i]) > -1) {
		eventIndexes.push(i);
		console.log(allWords[i]);
	}
}

console.log (eventIndexes);

for (j in eventIndexes) {
	var _month = allWords[eventIndexes[j]];
	var _day = allWords[(eventIndexes[j]+1)];
	console.log (_day);
	var _time = allWords[(eventIndexes[j]+3)];
	var event = {month : _month, day : _month, time : _time};
	events.push(event);
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