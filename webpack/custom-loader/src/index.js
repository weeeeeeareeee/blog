import test from "./test.dataurl"
console.log(typeof test)
const test1 = JSON.parse(test)
console.log(test1.name, '====', test1.age)