$(document).ready(function() {
    $('#add-car-form').on('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const $this_ = $('#add-car-form');

        if (!$this_.prop('disabled')) {
            $this_.prop('disabled', true);

            $('.validation-error').addClass('d-none');

            if ($('[name="i-car-make"]').val().length > 0 && $('[name="i-car-model"]').val().length > 0) {
                const carName = $('[name="i-car-name"]').val();
                const carMake = $('[name="i-car-make"]').val();
                const carModel = $('[name="i-car-model"]').val();
                const carId = Math.ceil(Math.random() * 100000);


                carData[carId] = {};
                carData[carId]['car_name'] = carName;
                carData[carId]['car_make'] = carMake;
                carData[carId]['car_model'] = carModel;
                carData[carId]['mpg'] = 0;

                localStorage.setItem('car_data', JSON.stringify(carData));
                localStorage.setItem('current_car', carId);

                window.location = 'car-view.html';
            } else {
                $('.validation-error').removeClass('d-none');
                $('.validation-error').html('Please enter a make and model.');
                $this_.prop('disabled', false);
            }
        }
    })
});