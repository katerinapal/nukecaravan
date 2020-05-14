import { GameConstants } from "..\\data\\GameConstants.js";
import { Caravan } from "..\\data\\CaravanConstants.js";

/**
 *  Функции для вычисления данных по параметрам мира
 */

// детекция, что точка 1 находится рядом с точкой 2
// nearDistance - расстояние срабатывания
export function areNearPoints(point1, point2, nearDistance) {
    return getDistance(point1, point2) <= nearDistance;
}

// расстояние между двумя точками (объектами с полями x и y)
export function getDistance(point1, point2) {
    return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
}

// максимальный вес, который может нести караван
export function getCaravanMaxWeight(world) {
    return world.oxen * Caravan.WEIGHT_PER_OX + world.crew * Caravan.WEIGHT_PER_PERSON;
}

// текущий вес, который тащит  караван
export function getCaravanWeight(world) {
    return world.food * Caravan.FOOD_WEIGHT
        + world.firepower * Caravan.FIREPOWER_WEIGHT
        + world.cargo;
}

// не перегружен ли караван
export function hasCaravanOverweight(world) {
    return getCaravanWeight(world) > getCaravanMaxWeight(world);
}

// Награда за прибытие в город - премия за сохраненный груз
export function sellCargo(world) {
    var cargo = world.cargo;
    var money = cargo * Caravan.CARGO_PRICE;
    world.money += money;
    world.cargo = 0;
    return {money: money, cargo: cargo};
}

// Покупка груза, учитывает вес уже купленного и наличие денег
export function buyCargo(world) {
    var cargoMax = world.money / Caravan.CARGO_BUY_PRICE;
    var newCargo = world.oxen * Caravan.CARGO_PER_OX - world.cargo; // сколько можем купить
    newCargo = Math.min(cargoMax, newCargo); // вычисляем адекватную нагрузку по кошельку
    var money = newCargo * Caravan.CARGO_BUY_PRICE;
    world.cargo += newCargo;
    world.money -= money;
    return {money: money, cargo: newCargo};
}

// добавляем сообщение в лог
export function addLogMessage(world, goodness, message) {
    world.log.push({
        day: world.day,
        message: message,
        goodness: goodness
    });

    // если лог превысил указанный размер, удаляем старые сообщения
    if(Object.keys(world.log).length > GameConstants.MAX_LOG_MESSAGES){
        world.log.shift();
    }
}

/**
 *  Тип события для лога - положительный, отрицательный, нейтральный
 */
export var Goodness = {
    positive: 'positive',
    negative: 'negative',
    neutral: 'neutral'
};