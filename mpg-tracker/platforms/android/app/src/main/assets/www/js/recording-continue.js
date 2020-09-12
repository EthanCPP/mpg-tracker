$(document).ready(function() {
    if (current_car && car_item) {
        console.log(car_item);

        $('.car-name').html(car_item.car_name);
        $('.car-details').html(car_item.car_make + ' ' + car_item.car_model);

        $('#recording-continue-form').on('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();

            if ($('[name="i-current-mileage"]').val() != '' && $('[name="i-litres-used"]').val() != '') {
                const currentMileage = $('[name="i-current-mileage"]').val();
                const litresUsed = $('[name="i-litres-used"]').val();

                if (currentMileage > car_item.mileage_start) {

                    const currentDate = new Date();

                    // work out mpg
                    const mileageUsed = currentMileage - car_item.mileage_start;
                    const gallonsUsed = litresUsed * 0.219969;
                    const mpg = Math.round((mileageUsed / gallonsUsed) * 100) / 100;

                    carData[current_car]['mileage_end'] = currentMileage;
                    carData[current_car]['mileage_end_time'] = currentDate.getTime();
                    carData[current_car]['mpg'] = mpg;

                    if (!carData[current_car]['history']) {
                        carData[current_car]['history'] = {};
                    }

                    carData[current_car]['history'][currentDate.getTime()] = {};
                    carData[current_car]['history'][currentDate.getTime()]['mileage_used'] = mileageUsed;
                    carData[current_car]['history'][currentDate.getTime()]['mpg'] = mpg;

                    // whipe the current recording
                    carData[current_car]['mileage_start'] = 0;
                    carData[current_car]['mileage_start_time'] = 0;

                    localStorage.setItem('car_data', JSON.stringify(carData));

                    window.location = 'recording-complete.html';

                }
            }
        })
    }
});