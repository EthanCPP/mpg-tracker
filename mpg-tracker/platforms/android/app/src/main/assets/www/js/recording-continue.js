$(document).ready(function() {
    if (current_car && car_item) {
        console.log(car_item);

        $('.car-name').html(car_item.car_name);
        $('.car-details').html(car_item.car_make + ' ' + car_item.car_model);

        $('#recording-continue-form').on('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();

            if ($('[name="i-current-mileage"]').val() != '' && $('[name="i-litres-used"]').val() != '') {
                const currentMileage = parseInt($('[name="i-current-mileage"]').val());
                const litresUsed = parseFloat($('[name="i-litres-used"]').val());

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

                    // avg yearly miles calculator
                    if (carData[current_car]['yearly_miles']) {
                        const yearStart = new Date(carData[current_car]['yearly_miles']['year_start']['date']);

                        if (currentDate.getFullYear() > yearStart.getFullYear()) {
                            // Broken into a new year, roll over data
                            const yearStartDate = new Date(currentDate.getFullYear());

                            carData[current_car]['yearly_miles']['year_start']['date'] = yearStartDate.getTime();
                            carData[current_car]['yearly_miles']['year_start']['mileage'] = carData[current_car]['yearly_miles']['year_end']['mileage'];
                            carData[current_car]['yearly_miles']['year_end']['date'] = currentDate.getTime();
                            carData[current_car]['yearly_miles']['year_end']['mileage'] = currentMileage;
                        } else {
                            carData[current_car]['yearly_miles']['year_end']['date'] = currentDate.getTime();
                            carData[current_car]['yearly_miles']['year_end']['mileage'] = currentMileage;
                        }
                    } else {
                        carData[current_car]['yearly_miles'] = {};
                        carData[current_car]['yearly_miles']['year_start'] = {};
                        carData[current_car]['yearly_miles']['year_end'] = {};
                        carData[current_car]['yearly_miles']['year_start']['date'] = currentDate.getTime();
                        carData[current_car]['yearly_miles']['year_start']['mileage'] = currentMileage;
                        carData[current_car]['yearly_miles']['year_end']['date'] = currentDate.getTime();
                        carData[current_car]['yearly_miles']['year_end']['mileage'] = currentMileage;
                    }

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