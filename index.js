function createEmployeeRecord(array){
    let user = {
        firstName : array[0],
        familyName : array[1],
        title : array[2],
        payPerHour : array[3],
        timeInEvents : [],
        timeOutEvents : [],
    };
    return user;
}
const createEmployeeRecords = arrays => arrays.map(x => createEmployeeRecord(x))

function createTimeInEvent(datestamp){
    //this === employee
    let [date,time] = datestamp.split(" ")
    let timein = {
        type: 'TimeIn',
        hour: Number(time),
        date: date
    }
    this.timeInEvents.push(timein)
    return this;
}
function createTimeOutEvent(datestamp){
    let [date,time] = datestamp.split(" ")   
    let timeout = {
        type: 'TimeOut',
        hour: Number(time),
        date: date
    }
    this.timeOutEvents.push(timeout)
    return this;
}
function hoursWorkedOnDate(date){
    let timeInHour ;
    let timeOutHour;
    for (const specificDate of this.timeInEvents){
        if(date === specificDate.date){
            timeInHour = specificDate.hour     
        }
    }
    for (const specificDate of this.timeOutEvents){
        if(date === specificDate.date){
            timeOutHour = specificDate.hour     
        }
    }
    return  (timeOutHour - timeInHour)/100;
}
function wagesEarnedOnDate(date){
    let hours = hoursWorkedOnDate.call(this,date);
    return hours * this.payPerHour;
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })
    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0); // <== Hm, why did we need to add bind() there? We'll discuss soon!
    return payable
}
function findEmployeeByFirstName(srcArray,name){
    return srcArray.filter(user => user.firstName === name)[0];

}
function calculatePayroll(employees){
    let sum = 0;
    let payrollarr = employees.map(employee => {sum += allWagesFor.call(employee)});
    return sum;
    
}


