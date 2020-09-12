$(document).ready(function() {
    if (current_car && car_item) {
        console.log(car_item);

        $('.car-name').html(car_item.car_name);
        $('.car-details').html(car_item.car_make + ' ' + car_item.car_model);

        $('#recording-erase').on('click', function() {
            carData[current_car]['mileage_start'] = 0;
            carData[current_car]['mileage_start_time'] = 0;

            localStorage.setItem('car_data', JSON.stringify(carData));

            window.location = 'car-view.html';
        });
    }
});