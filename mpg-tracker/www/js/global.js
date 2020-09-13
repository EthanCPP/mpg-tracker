let carData, current_car, car_item;
const localStorage = window.localStorage;


$(document).ready(function() {
    carData = JSON.parse(localStorage.getItem('car_data'));
    console.log(carData);

    if (carData == null) {
        carData = {};
    } else {
        if (localStorage.getItem('current_car')) {
            current_car = localStorage.getItem('current_car');

            if (parseInt(current_car) != -1) {
                car_item = carData[current_car];
            }
        }
    }

    $('.nav-logo').on('click', function() {
        window.location = 'dashboard.html';
    });

    // transition overlay
    setTimeout(function() {
        $('body').addClass('body-loaded');
    }, 100);

    // render overlay
    const $overlayContainer = $(`<div class="overlay"></div>`);
    $overlayContainer.insertAfter('.navbar');

    const $overlayDashboard = $(`<a href="dashboard.html" class="overlay-btn">Dashboard</a>`);
    $overlayContainer.append($overlayDashboard);

    const $overlayCostCalculator = $(`<a href="cost-calculator.html" class="overlay-btn">Cost calculator</a>`);
    $overlayContainer.append($overlayCostCalculator);

    const $overlayAbout = $(`<a href="about.html" class="overlay-btn">About app</a>`);
    $overlayContainer.append($overlayAbout);

    $('.burger-stack').on('click', function() {
        $(this).toggleClass('menu-show');
        $overlayContainer.toggleClass('overlay-visible');
        $('body').toggleClass('overflow-hidden');
    });

    console.log(carData);
})