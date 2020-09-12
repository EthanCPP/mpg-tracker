$(document).ready(function() {
    if (current_car && car_item) {
        console.log(car_item);

        $('.car-name').html(car_item.car_name);
        $('.car-details').html(car_item.car_make + ' ' + car_item.car_model);

        if (car_item.mpg && car_item.mpg > 0) {
            $('.mpg-score').html(car_item.mpg);
        } else {
            $('.mpg-score').html('0');
        }

        if (car_item.mileage_start && car_item.mileage_start != 0) {
            const startDate = new Date(car_item.mileage_start_time);

            $('#recording-mileage-start').html(car_item.mileage_start);
            $('#recording-date-start').html(startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate());
            $('#data-recording').removeClass('d-none');
            $('#data-no-data').addClass('d-none');
        }
    }
});