var utils = {};

utils.MAX_CHARS_PER_FIELD_ = 300;

utils.findMonthNum = function (monthName) {
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

utils.convertToEuroTime = function (oldtime) {
  if (oldtime.substring(oldtime.indexOf("M") - 1, oldtime.indexOf("M")) == "PM") {
    var newTime = oldtime.substring (0, oldtime.indexOf("M") - 2) + 12;
    return newTime;
  }
  else {
    var newTime = oldtime.substring (0, oldtime.indexOf("M") - 2);
    return newTime;
  }
};

utils.processEvent = function(event) {
  if (!event.end) {  // If there's no end time, infer one as best as we can.
    var startMoment = moment(event.start);
    if (startMoment.hours() === 0 && startMoment.minutes() === 0) {
      // Assume it's an all-day event if hh=0 & mm=0.
      event.end = startMoment.add('d', 1).valueOf();
    } else {
      // It's not an all-day event, so default to start + X hours, and the user
      // can tweak it before adding to their calendar.
      event.end = startMoment.add('h', 2).valueOf();
    }
  }

  // Trim each field to a maximum acceptable length.
  for (var field in event) {
    if (event.hasOwnProperty(field) &&
        event[field].length > utils.MAX_CHARS_PER_FIELD_) {
      event[field] = event[field].replace(/[\s]+/gi, ' ').
          substring(0, utils.MAX_CHARS_PER_FIELD_ - 2) + ' \u2026';
    }
  }

/*
  //probably not important
  if (event.address) {
    if (event.location) {
      event.location = event.address + ' (' + event.location + ')';
    } else {
      event.location = event.address;
    }
    delete event.address;
  }

  // Create Calendar URL after all fields have been trimmed.
  event.gcal_url = utils.getGCalUrl_(event);
  */

  return event;
};

