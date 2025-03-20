// Function to create an employee record from an array
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  // Function to create multiple employee records from an array of arrays
  function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
  }
  
  // Function to create a timeIn event
  function createTimeInEvent(employeeRecord, dateTimeString) {
    if (typeof dateTimeString !== "string") {
      throw new Error(`Invalid dateTimeString: Expected a string, got ${typeof dateTimeString}`);
    }
    const [date, hour] = dateTimeString.split(" ");
    
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      date,
      hour: parseInt(hour, 10),
    });
  
    return employeeRecord;
  }
  
  // Function to create a timeOut event
  function createTimeOutEvent(employeeRecord, dateTimeString) {
    if (typeof dateTimeString !== "string") {
      throw new Error(`Invalid dateTimeString: Expected a string, got ${typeof dateTimeString}`);
    }
    const [date, hour] = dateTimeString.split(" ");
    
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      date,
      hour: parseInt(hour, 10),
    });
  
    return employeeRecord;
  }
  
  // Function to calculate hours worked on a specific date
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find((e) => e.date === date);
    const timeOut = employeeRecord.timeOutEvents.find((e) => e.date === date);
  
    if (!timeIn || !timeOut) return 0;
  
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  // Function to calculate wages earned on a specific date
  function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
  }
  
  // Function to calculate total wages for an employee
  function allWagesFor(employeeRecord) {
    return employeeRecord.timeInEvents.reduce(
      (total, event) => total + wagesEarnedOnDate(employeeRecord, event.date),
      0
    );
  }
  
  // Function to calculate payroll for all employees
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce(
      (totalPayroll, record) => totalPayroll + allWagesFor(record),
      0
    );
  }
  
  // Function to find an employee by first name
  function findEmployeeByFirstName(employeeRecords, firstName) {
    return employeeRecords.find((record) => record.firstName === firstName);
  }
  
  // Export for Node.js
  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      createEmployeeRecord,
      createEmployeeRecords,
      createTimeInEvent,
      createTimeOutEvent,
      hoursWorkedOnDate,
      wagesEarnedOnDate,
      allWagesFor,
      calculatePayroll,
      findEmployeeByFirstName,
    };
  }
  
  // Export for browser
  if (typeof window !== "undefined") {
    window.createEmployeeRecord = createEmployeeRecord;
    window.createEmployeeRecords = createEmployeeRecords;
    window.createTimeInEvent = createTimeInEvent;
    window.createTimeOutEvent = createTimeOutEvent;
    window.hoursWorkedOnDate = hoursWorkedOnDate;
    window.wagesEarnedOnDate = wagesEarnedOnDate;
    window.allWagesFor = allWagesFor;
    window.calculatePayroll = calculatePayroll;
    window.findEmployeeByFirstName = findEmployeeByFirstName;
  }
  