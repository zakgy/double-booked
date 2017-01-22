class UnEvent:
    start = ""
    end = ""
    raw = ""
    month = ""
    sday = 0
    stime = 0
    eday = 0
    etime = 0
    year = 0

    def __init__(self, start):
        self.start = start

    def setend(self, end):
        self.end = end

    def parseSelf(self):
        def numtomonth(num):
            if num == 1:
                return "January"
            if num == 2 :
                return "February"
            if num == 3:
                return "March"
            if num == 4:
                return "April"
            if num == 5:
                return "May"
            if num == 6:
                return "June"
            if num == 7:
                return "July"
            if num == 8:
                return "August"
            if num == 9:
                return "September"
            if num == 10:
                return "October"
            if num == 11:
                return "November"
            if num == 12:
                return "December"
            return "January"
        splitTemp = self.start.split('T')
        self.year = int(splitTemp[0][:4])
        self.month = numtomonth(int(splitTemp[0][4:6]))
        self.sday = int(splitTemp[0][6:8])
        if len(splitTemp) > 1:
            self.stime = int(splitTemp[1][:2])
        splitTemp = self.end.split('T')
        self.eday = int(splitTemp[0][6:8])
        if len(splitTemp) > 1:
            self.etime = int(splitTemp[1][:2])

    def __str__(self):
        result = ""
        result += "{year :"
        result += str(self.year)
        result += ", month : "
        result += self.month
        result += ", sday : " + str(self.sday) + ", stime : " + str(self.stime) + ", stimeOLD : 0, eday : "
        result += str(self.eday) + ", etime : " + str(self.etime) + "}"
        return result
def Parser():
    file = input("Filename: ")
    raw = open(file, 'r')
    case = 1
    events = []
    newevents = []
    while True:
        line = raw.readline()
        line = line.strip('\n')
        splitLine = []
        if not line:
            break
        elif case == 1:
            splitLine = line.split(":")
            if splitLine[0] == 'BEGIN' and splitLine[1] == 'VEVENT':
                case = 2
        elif case == 2:
            splitLine = line.split(';')
            if splitLine[0] == 'DTSTART':
                case = 3
                events.append(line.split(':')[1])
        elif case == 3:
            splitLine = line.split(';')
            if splitLine[0] == 'DTEND':
                case = 4
                events.append(line.split(':')[1])
        elif case == 4:
            splitLine = line.split(':')
            if splitLine[0] == "END" and splitLine[1] == "VEVENT":
                case = 1
    i = 1
    for event in events:
        if i % 2 == 1:
            newevents.append(UnEvent(event))
        else:
            print(i//2)
            newevents[(i//2)-1].setend(event)
        i+=1
    for event in newevents:
        event.parseSelf()
    return newevents
events = Parser()
result = "{"
for event in events:
    result += str(event) + ", "
result = result[:len(result)-2] + "}"
print(result)