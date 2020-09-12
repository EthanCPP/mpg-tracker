$(document).ready(function() {
    if (Object.keys(carData).length == 0) {
        $('.no-cars').removeClass('d-none');
    } else {
        Object.entries(carData).forEach(item => {
            const car_id = item[0];
            const car_name = item[1].car_name;
            const car_make = item[1].car_make;
            const car_model = item[1].car_model;
            const car_mpg = item[1].mpg;

            const $car_button = $('.car-entry-prototype').clone();
            $car_button.removeClass('d-none');
            $car_button.removeClass('car-entry-prototype');
            $car_button.addClass('car-entry');

            $car_button.find('.entry-name').html(car_name);
            $car_button.find('.entry-details').html(car_make + ' ' + car_model);
            $car_button.find('.entry-mpg').html((car_mpg ? car_mpg : '0') + ' mpg');

            $car_button.data('car-id', car_id);

            $car_button.on('click', function() {
                localStorage.setItem('current_car', $(this).data('car-id'));
                window.location = 'car-view.html';
            })

            $('.cars-wrap').append($car_button);
        });
    }
});