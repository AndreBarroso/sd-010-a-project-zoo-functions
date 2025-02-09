/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const data = require('./data');

const { animals } = data;

function animalsByIds(...ids) {
  // seu código aqui
  const arr = [];
  data.animals.forEach((animal) => {
    const equal = ids.some((id) => id === animal.id);
    if (equal === true) arr.push(animal);
  });
  return arr;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const obj = data.animals.filter((element) => element.name === animal)[0];
  return obj.residents.every((elemento) => elemento.age > age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) return {};
  return data.employees
    .filter((employer) => employer.firstName === employeeName
    || employer.lastName === employeeName)[0];
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  // seu código aqui
  return data.employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countArrayAnimals() {
  const numberAnimals = animals.map(({ name, residents }) => {
    const obj = {};
    obj[name] = residents.length;
    return obj;
  });
  return numberAnimals;
}

function reduceAnimals() {
  return countArrayAnimals().reduce((acc, element) => {
    const [keyName] = Object.keys(element);
    const [valueNumberOfAnimals] = Object.values(element);
    acc[keyName] = valueNumberOfAnimals;
    return acc;
  }, {});
}

function animalCount(species) {
  // seu código aqui
  let animalNumbers = reduceAnimals();
  animals.forEach((animal, index) => {
    if (animal.name === species) {
      animalNumbers = countArrayAnimals()[index][species];
    }
  });
  return animalNumbers;
}
const totalCost = (entrants, element) => {
  let custo = 0;
  Object.entries(entrants).forEach((person) => {
    if (person[0] === element[0]) {
      custo = person[1] * element[1];
    } else {
      custo += 0;
    }
  });
  return custo;
};

function entryCalculator(entrants) {
  // seu código aqui
  let arrayCostForTypePerson = 0;
  if (entrants === undefined || Object.keys(entrants).length === 0) return 0;
  arrayCostForTypePerson = Object.entries(data.prices)
    .map((element) => totalCost(entrants, element));
  return arrayCostForTypePerson.reduce((acc, cur) => acc + cur);
}

/*
function animalMap(options) {
  // seu código aqui
}
*/
function transforSchedulesInArray() {
  return Object.entries(data.hours).map((element) => {
    const a = Object.entries(element[1]);
    const b = [...a[0], ...a[1]];
    return [element[0], ...b];
  });
}

function objDaySchedule(day) {
  const arraySchedule = transforSchedulesInArray();
  const arrayDayScheduleFilter = arraySchedule.filter((element) => element[0] === day)[0];
  const scheduleDay = {};
  scheduleDay[day] = 'CLOSED';
  if (day === undefined) {
    const objScheduleList = arraySchedule.reduce((acc, cur) => {
      acc[cur[0]] = `Open from ${cur[2]}am until ${cur[4] - 12}pm`;
      return acc;
    }, {});
    objScheduleList.Monday = 'CLOSED';
    return objScheduleList;
  }
  if (day !== 'Monday') {
    const initTime = arrayDayScheduleFilter[2];
    const endTime = arrayDayScheduleFilter[4] - 12;
    scheduleDay[day] = `Open from ${initTime}am until ${endTime}pm`;
  }
  return scheduleDay;
}

function schedule(dayName) {
  // seu código aqui
  return objDaySchedule(dayName);
}

//  Requisito 11
function getSpecieManegedForThisId(id) {
  return data.animals.filter((animal) => animal.id === data.employees
    .filter((element) => element.id === id)[0].responsibleFor[0])[0];
}
function oldestFromFirstSpecies(id) {
  // seu código aqui
  return Object.values(getSpecieManegedForThisId(id).residents.sort((a, b) => b.age - a.age)[0]);
}

// Requisito 12
function increasePrices(percentage) {
  // seu código aqui
  const arr = Object.keys(data.prices);
  arr.forEach((element) => {
    data.prices[element] = Math.round(((data.prices[element] * (percentage / 100))
    + data.prices[element]) * 100) / 100;
  });
}

// Requisito 13

function getArrayAninalsUnderResponsiniltes(arrayOfresponsibleFor) {
  const arrayAnimalsUnderCare = arrayOfresponsibleFor.map((element) => data.animals
    .filter((animal) => element === animal.id)[0].name);
  return arrayAnimalsUnderCare;
}

function employeeYAndHisAnimalsList() {
  return data.employees.reduce((acc, cur) => {
    const fullName = `${cur.firstName} ${cur.lastName}`;
    acc[fullName] = getArrayAninalsUnderResponsiniltes(cur.responsibleFor);
    return acc;
  }, {});
}

function employeeYAndHisAnimals(idOrName) {
  const employee = data.employees.filter((employeer) => employeer.id === idOrName
    || employeer.firstName === idOrName || employeer.lastName === idOrName)[0];
  const employeeRespForAnimals = {};
  const fullName = `${employee.firstName} ${employee.lastName}`;
  employeeRespForAnimals[fullName] = getArrayAninalsUnderResponsiniltes(employee.responsibleFor);
  return employeeRespForAnimals;
}

function employeeCoverage(idOrName) {
  // seu código aqui
  if (idOrName === undefined) return employeeYAndHisAnimalsList();
  return employeeYAndHisAnimals(idOrName);
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  //  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
