chrome.contextMenus.create ({
  title: "Double Booking?",
  contexts: ["selection"],
  onclick: dateReader
});

const year = 2017;

function dateReader (selectedText) {
  //alert(selectedText.selectionText);
  var date = selectedText.selectionText;
  event = validDate (date);
  console.log(event);
  alert (event);



  //calendar = [event1, event2]

};

function validDate (text) {
  var slashDate = new RegExp(/\d\d\/\d\d\/\d\d\d\d/, "g");
  var normDate = new RegExp(/[A-z]{1,9}?\s(\d?\d)(\sat)?\s(\d?\d)\s?[A-z]{1,2}/, "g");
  var dashDate = new RegExp(/\d\d\d\d-\d\d-\d\d/, "g");

  if (text.match(normDate) != null) {
    console.log(text);

    /*
    text = text.trim();
    var month = text.substring(0, text.indexOf(" "));
    var day = text.substring(text.indexOf(" ") + 1, text.indexOf(" ") + 3);
    console.log (day);
    var time = text.substring(text.indexOf(" ") + 7, text.length);
    console.log (time);

    var timeEuro = utils.convertToEuroTime (time);
    var monthNum = utils.findMonthNum (month);
    var event = new Date();
    event.setFullYear (year);
    event.setMonth (monthNum);
    event.setDate (day);
    event.setHours (timeEuro);
    event.setMinutes (0);
    event.setSeconds (0);
    */

    var event = ({});

    event.title = text;
    event = utils.processEvent(event);

    return event;

  }
}
