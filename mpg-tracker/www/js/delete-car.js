$(document).ready(function() {
    if (current_car && car_item) {
        console.log(car_item);

        $('.car-name').html(car_item.car_name);
        $('.car-details').html(car_item.car_make + ' ' + car_item.car_model);

        $('#btn-delete-car').on('click', function() {
            delete carData[current_car];

            localStorage.setItem('car_data', JSON.stringify(carData));
            localStorage.setItem('current_car', -1);

            window.location = 'dashboard.html';
        });
    }
});