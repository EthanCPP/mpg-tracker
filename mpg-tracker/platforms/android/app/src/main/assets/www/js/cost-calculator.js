$(document).ready(function() {
    if (current_car && car_item) {
        console.log(car_item);

        $('.car-name').html(car_item.car_name);
        $('.car-details').html(car_item.car_make + ' ' + car_item.car_model);

        if (!car_item.history) {
            $('#pill-not-available').removeClass('d-none');
        } else {
            $('#pill-available').removeClass('d-none');
        }

        $('#cost-calculator-form').on('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const miles = parseFloat($('[name="i-miles"]').val());
            const fuel_price = parseFloat($('[name="i-cost"]').val());
            const mpg = car_item.mpg;

            const fuel_used = (miles / mpg) / 0.219969;
            const cost_used = (fuel_used * fuel_price) / 100;
            const cost_final = Math.ceil(cost_used * 100) / 100;

            carData[current_car]['recent_fuel_price'] = fuel_price;

            localStorage.setItem('car_data', JSON.stringify(carData));

            $('#pill-cost-final').removeClass('d-none');
            $('#pill-cost-intro').addClass('d-none');
            $('#cost-display').html(cost_final.toLocaleString());
        });
    }
});