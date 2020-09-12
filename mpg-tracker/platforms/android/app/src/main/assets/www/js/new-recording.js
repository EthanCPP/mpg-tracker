$(document).ready(function() {
    if (current_car && car_item) {
        console.log(car_item);

        $('.car-name').html(car_item.car_name);
        $('.car-details').html(car_item.car_make + ' ' + car_item.car_model);

        $('#new-recording-form').on('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const mileage = $('[name="i-mileage"]').val();

            if (mileage && mileage > 0) {

                const currentDate = new Date();

                carData[current_car]['mileage_start'] = mileage;
                carData[current_car]['mileage_start_time'] = currentDate.getTime();

                localStorage.setItem('car_data', JSON.stringify(carData));

                window.location = 'new-recording-complete.html';

            }
        });
    }
});