import * as R from "ramda";

/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
 import Api from '../tools/api';

 const api = new Api();

 /**
  * Я – пример, удали меня
  */
 const wait = time => new Promise(resolve => {
     setTimeout(resolve, time);
 })

//  const processSequence = ({value, writeLog, handleSuccess, handleError}) => {
//      /**
//       * Я – пример, удали меня
//       */
//      writeLog(value);

//      api.get('https://api.tech/numbers/base', {from: 2, to: 10, number: '01011010101'}).then(({result}) => {
//          writeLog(result);
//      });

//      wait(2500).then(() => {
//          writeLog('SecondLog')

//          return wait(1500);
//      }).then(() => {
//          writeLog('ThirdLog');

//          return wait(400);
//      }).then(() => {
//          handleSuccess('Done');
//      });
//  }

console.clear();

// Constants
const justCopy = (a) => a;
// Props
const value = R.prop("value");
const logFn= R.prop("writeLog");
const successFn= R.prop("handleSuccess");
const logError = R.prop("handleError");

// 1: Log value
const logValue = R.converge(R.call, [logFn, value])

// 2a: validate input and set error
// const validationErrorMessage = R.always("ValidationError");
const stringLength = R.prop("length");
const hasLengthLessThanTen = R.gt(10);
const isLongerThanTen = R.compose(
    R.not,
    hasLengthLessThanTen,
    stringLength,
    value
    );
const hasLengthLongerThanTwo = R.lte(2); 
const isShorterThanTwo = R.compose(
    R.not,
    hasLengthLongerThanTwo,
    stringLength,
    value
    );
const isDigitsAndDot = R.test(/^-?\d+\.?\d*$/);
const isNotDigit = R.compose(
    R.not,
    isDigitsAndDot,
    value
);    
const isNotValidString = R.anyPass([isShorterThanTwo, isLongerThanTen, isNotDigit]);
const setError = R.assoc("error");
const setValidationError = setError("ValidationError");
const setEmptyError = setError("");
const setErrorMessage = R.ifElse( isNotValidString, setValidationError, setEmptyError);

// 3: Input string to number


// 2b: Log Error
const processHasError = R.prop("error");
const loggingError = R.converge(R.call, [logError, processHasError])
const logErrorIfExist = R.when(processHasError, loggingError);

// Final: compose all
const processSequence = R.compose(
    R.tap(logErrorIfExist),
    setErrorMessage,
    R.tap(logValue)
) 

export default processSequence;
////////////////////////////////////////////
const petVal = R.prop("val");
const petLogging = R.prop("logging");
const petError = R.prop("error");
const petString = "aaa";
const petIsLongerThanTen = R.compose(
    R.not,
    hasLengthLessThanTen,
    stringLength,
    petVal
);
const petIsShorterThanTwo = R.compose(
    R.not,
    hasLengthLongerThanTwo,
    stringLength,
    petVal
);

const petIsValidString = R.anyPass([petIsShorterThanTwo, petIsLongerThanTen]);
// const petLogWarning = R.converge(R.call, [petLogging, validationErrorMessage]);
const petSetValidationError = R.ifElse( petIsValidString, setValidationError, setEmptyError);

// console.log(hasLengthLessThanTen(8))
// console.log(stringLength(petString))
// console.log(isLongerThanTen(petString));

// const petWriteLog = (logger, log) => logger(log);

const is9 = R.test(/^-?\d+\.?\d*$/);

// console.log(is9("9000.10"))
//////  /////////  /////////  //////////  ////////// /  
const petLogConverge = R.converge(R.call, [petLogging, petVal]);
const petLogError = R.converge(R.call, [petLogging, petError])
const petGetError = R.when(petError, petLogError);
const petObj = {
    val: "Joooo",
    logging: console.log
}
const petLog = R.prop("logging");

// const petFn = (args) => {
//   args.logging(args.val)
// }

const toNumber = Number;
const roundNumber = Math.round;


const petFn = R.compose(
    // writeLogHi,
    // petLog
    R.tap(petGetError),
    petSetValidationError,
    R.tap(petLogConverge),
    R.tap(petLogConverge)
);
// petFn(petObj);
console.log(petFn(petObj));
// const processSequence = (args) => args.writeLog("hi");


