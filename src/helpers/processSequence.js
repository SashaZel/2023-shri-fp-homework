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

// console.clear();


// Constants
const justPass = (a) => a;
// Props
const value = R.prop("value");
const intValue = R.prop("intVal")
const logFn= R.prop("writeLog");
const successFn= R.prop("handleSuccess");
const logError = R.prop("handleError");
const valueLens = R.lens(value);
const processHasError = R.prop("error");
const callIfNoError = R.ifElse(processHasError, justPass);

// 1: Log value
const logValue = R.converge(R.call, [logFn, value]);

// 2a: validate input and set error
// const validationErrorMessage = R.always("ValidationError");
const stringLength = R.prop("length");
const hasLengthLessThanTen = R.gt(10);
const isLongerThanTen = R.pipe(
    value,
    stringLength,
    hasLengthLessThanTen,
    R.not,
    );
const hasLengthLongerThanTwo = R.lte(2); 
const isShorterThanTwo = R.pipe(
    value,
    stringLength,
    hasLengthLongerThanTwo,
    R.not
    );
const isDigitsAndDot = R.test(/^-?\d+\.?\d*$/);
const isNotDigit = R.pipe(
    value,
    isDigitsAndDot,
    R.not,
);    
const isNotValidString = R.anyPass([isShorterThanTwo, isLongerThanTen, isNotDigit]);
const setError = R.assoc("error");
const setValidationError = setError("ValidationError");
const setEmptyError = setError("");
const setErrorMessage = R.ifElse( isNotValidString, setValidationError, setEmptyError);

// 3: Input string to number
const toNumber = Number;
const roundNumber = Math.round;
const stringToNumber = R.pipe(
    toNumber,
    roundNumber,
);
const assocIntVal = R.assoc("intVal");
const valueToIntLens = valueLens(assocIntVal);
const setIntegerValue = R.over(valueToIntLens, stringToNumber);
const setIntegerValueIfNoError = callIfNoError(setIntegerValue);
const logIntValue = R.converge(R.call, [logFn, intValue]);
const logIntValueIfNoError = callIfNoError(logIntValue);

// 2b: Log Error
const loggingError = R.converge(R.call, [logError, processHasError])
const logErrorIfExist = R.when(processHasError, loggingError);

// 4: API Call
const getProp = R.prop("get");
const apiGet = getProp(api);
const apiGetBaseUrl = apiGet('https://api.tech/numbers/base');
const apiTemplateFromTenToTwo = {from: 10, to: 2};
const assocNumber = R.assoc("number");
const fetchBinaryData = R.pipe(
    R.assoc("number", R.__, apiTemplateFromTenToTwo),
    apiGetBaseUrl,
    R.andThen(R.prop("result")),
);

// Final: compose all
const processSequence = R.pipe(
    R.tap(logValue),
    setErrorMessage,
    R.tap(logErrorIfExist),
    setIntegerValueIfNoError,
    logIntValueIfNoError,
) 

export default processSequence;
////////////////////////////////////////////
// const petVal = R.prop("val");
// const petLogging = R.prop("logging");
// const petError = R.prop("error");
// const petString = "aaa";
// const petIsLongerThanTen = R.compose(
//     R.not,
//     hasLengthLessThanTen,
//     stringLength,
//     petVal
// );
// const petIsShorterThanTwo = R.compose(
//     R.not,
//     hasLengthLongerThanTwo,
//     stringLength,
//     petVal
// );

// const petIsValidString = R.anyPass([petIsShorterThanTwo, petIsLongerThanTen]);
// // const petLogWarning = R.converge(R.call, [petLogging, validationErrorMessage]);
// const petSetValidationError = R.ifElse( petIsValidString, setValidationError, setEmptyError);

// // console.log(hasLengthLessThanTen(8))
// // console.log(stringLength(petString))
// // console.log(isLongerThanTen(petString));

// // const petWriteLog = (logger, log) => logger(log);

// const is9 = R.test(/^-?\d+\.?\d*$/);

// // console.log(is9("9000.10"))
// //////  /////////  /////////  //////////  ////////// /  
// const petLogConverge = R.converge(R.call, [petLogging, petVal]);
// const petLogError = R.converge(R.call, [petLogging, petError])
// const petGetError = R.when(petError, petLogError);
// const petObj = {
//     val: "123",
//     logging: console.log
// }
// const petLog = R.prop("logging");

// // const petFn = (args) => {
// //   args.logging(args.val)
// // }

// const pettoNumber = Number;
// const petroundNumber = Math.round;
// const petstringToNumber = R.compose(
//     petroundNumber,
//     pettoNumber,
// );
// const valLens = R.lens(R.prop('val'), R.assoc('intVal'));
// const petSetIntegerValue = R.over(valLens, petstringToNumber)
// // const f = R.pipe(assocIntegerVal);

// // eslint-disable-next-line react-hooks/rules-of-hooks
// // const setIntegerValue = R.useWith(assocIntegerVal, [stringToNumber]); 
// // const setIntegerValue = R.useWith(assocIntegerVal, [stringToNumber]); 

// /////// API //////////////////////////
// // console.log("@API ", api.get('https://api.tech/numbers/base')({from: 10, to: 2, number: '125'}).then((r) => console.log(r)))

// // const getProp = R.prop("get");
// // const apiGet = getProp(api);
// // const apiGetBaseUrl = apiGet('https://api.tech/numbers/base');
// // const apiTemplateFromTenToTwo = {from: 10, to: 2};
// // const assocNumber = R.assoc("number");
// const fetchData = R.pipe(
//     // R.prop("val"),
//     assocNumber,   
// );
// // console.log(fetchData(22)(apiTemplateFromTenToTwo));

// const petnumberLens = R.lensProp("number");
// const petnumberSet = R.set(petnumberLens);
// const petfetchBinaryData = R.pipe(
//     R.assoc("number", R.__, apiTemplateFromTenToTwo),
//     // api.get('https://api.tech/numbers/base')
//     apiGetBaseUrl,
//     R.andThen(console.log)
// );
// // console.log("@@ ", petfetchBinaryData(123))
// const petbinaryLens = R.lens(R.prop("val"), R.assoc("binaryVal"));
// const petsetBinary = R.over(petbinaryLens, petfetchBinaryData);

// // console.log("@@ ", f(12)(petObj));

// const petFn = R.pipe(
//     R.tap(petLogConverge),
//     R.tap(petLogConverge),
//     petSetValidationError,
//     R.tap(petGetError),
//     petSetIntegerValue,
//     // petsetBinary,
//     // R.prop(R.andThen(petLogConverge))
//     // writeLogHi,
//     // petLog
//     // setIntegerValue,
//     // stringToNumber,
//     // R.assoc("int", stringToNumber(petObj)),
// );
// // petFn(petObj);
// console.log(petFn(petObj));
// // console.log(R.andThen(petFn(petObj).binaryVal()));
// // const processSequence = (args) => args.writeLog("hi");


