let carData, current_car, car_item;
const localStorage = window.localStorage;


$(document).ready(function() {
    carData = JSON.parse(localStorage.getItem('car_data'));

    if (carData == null) {
        carData = {};
    } else {
        if (localStorage.getItem('current_car')) {
            current_car = localStorage.getItem('current_car');
            car_item = carData[current_car];
        }
    }

    console.log(carData);
})