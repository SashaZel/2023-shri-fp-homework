import * as R from "ramda";

/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

// Functions predicates
const isGreaterOrEqualTwo = R.lte(2);
// console.log(isGreaterOrEqualTwo(1))

const isRed = R.equals("red");
const isGreen = R.equals("green");
const isBlue = R.equals("blue");
const isWhite = R.equals("white");
const isOrange = R.equals("orange");

const triangleProp = R.prop("triangle");
const squareProp = R.prop("square");
const circleProp = R.prop("circle");
const starProp = R.prop("star");

const isRedStar = R.compose(isRed, starProp);
const isWhiteStar = R.compose(isWhite, starProp);
const isGreenStar = R.compose(isGreen, starProp);
const isOrangeStar = R.compose(isOrange, starProp);

const isWhiteTriangle = R.compose(isWhite, triangleProp);
const isGreenTriangle = R.compose(isGreen, triangleProp);
const isOrangeTriangle = R.compose(isOrange, triangleProp);

const isWhiteSquare =R.compose(isWhite, squareProp);
const isOrangeSquare = R.compose(isOrange, squareProp);
const isGreenSquare = R.compose(isGreen, squareProp);

const isGreenCircle = R.compose(isGreen, circleProp);
const isWhiteCircle = R.compose(isWhite, circleProp);
const isBlueCircle = R.compose(isBlue, circleProp);
const isOrangeCircle = R.compose(isOrange, circleProp);

const twoIsGreen = R.compose(
    isGreaterOrEqualTwo,
    R.length,
    R.filter(isGreen),
    R.values
);
const isAllGreen = R.allPass([isGreenCircle, isGreenSquare, isGreenStar, isGreenTriangle]);
const numberOfRed = R.compose(
    R.length,
    R.filter(isRed),
    R.values
);
const numberOfBlue = R.compose(
    R.length,
    R.filter(isBlue),
    R.values
);

const toSingleArr = (fns) => (val) => fns.map((fn) => fn(val));

const countRedAndBlue = toSingleArr([numberOfRed, numberOfBlue]);
const allEqual = arr => arr.every(val => val === arr[0]);
const numberOfRedIsEqualsNumberOfBlue = R.compose(
    allEqual,
    countRedAndBlue
)

const blueCircleRedStarOrangeSquare = R.allPass([isBlueCircle, isRedStar, isOrangeSquare]);

const notEqualsWhite = R.compose(
    R.not,
    R.equals("white")
);

const hasThreeCommonColor = R.compose(
    R.lte(3),
    R.nth(0),
    R.values,
    R.countBy(R.toLower),
    R.filter(notEqualsWhite),
    R.values
);

const hasTwoGreen = R.compose(
    R.lte(2),
    R.length,
    R.filter(isGreen),
    R.values
);

const hasAnyRed = R.compose(
    R.find(isRed),
    R.values
);

const hasGreenTriangleGreenAnyRedAny = R.allPass([isGreenTriangle, hasTwoGreen, hasAnyRed]);

const isAllOrange = R.allPass([isOrangeCircle, isOrangeSquare, isOrangeStar, isOrangeTriangle]);

const isNotRedStar = R.compose(R.not, isRedStar);
const isNotWhiteStar = R.compose(R.not, isWhiteStar);
const hasNotWhiteStarNotRedStar = R.allPass([isNotRedStar, isNotWhiteStar]);

const isNotWhiteSquare = R.compose(R.not, isWhiteSquare);
const isNotWhiteTriangle = R.compose(R.not, isWhiteTriangle);

const hasEqualSquareAndTriangle = R.converge(R.equals, [squareProp, triangleProp]);
const hasEqualSquareAndTriangleButNotWhite = R.allPass([hasEqualSquareAndTriangle, isNotWhiteSquare, isNotWhiteTriangle]);

const redStarGreenSquareWhiteOthers = R.allPass([isRedStar, isGreenSquare, isWhiteTriangle, isWhiteCircle])

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = redStarGreenSquareWhiteOthers;

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = twoIsGreen;

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = numberOfRedIsEqualsNumberOfBlue;

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = blueCircleRedStarOrangeSquare;

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = hasThreeCommonColor;

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = hasGreenTriangleGreenAnyRedAny;

// 7. Все фигуры оранжевые.
export const validateFieldN7 = isAllOrange;

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = hasNotWhiteStarNotRedStar;

// 9. Все фигуры зеленые.
export const validateFieldN9 = isAllGreen;

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = hasEqualSquareAndTriangleButNotWhite;
