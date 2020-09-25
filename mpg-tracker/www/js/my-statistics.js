$(document).ready(function() {
    if (current_car && car_item) {
        console.log(car_item);

        $('.car-name').html(car_item.car_name);
        $('.car-details').html(car_item.car_make + ' ' + car_item.car_model);

        if (Object.keys(car_item.history).length >= 2) {
            $('#nothing-to-show').addClass('d-none');
            $('#my-stats').removeClass('d-none');

            const thisReading = car_item.history[Object.keys(car_item.history)[Object.keys(car_item.history).length - 1]].mpg;
            const previousReading = car_item.history[Object.keys(car_item.history)[Object.keys(car_item.history).length - 2]].mpg;

            let lastYearlyCostUsedFinal, thisYearlyCostUsedFinal;

            if (car_item.recent_fuel_price && car_item.yearly_miles && car_item.yearly_miles.year_end.date > car_item.yearly_miles.year_start.date) {
                const lastPrice = car_item.recent_fuel_price;
                
                const secondsDifference = Math.round((car_item.yearly_miles.year_end.date - car_item.yearly_miles.year_start.date) / 1000);
                const yearlyMultiplier = (86400 * 365.25) / secondsDifference;
                const mileageDifference = car_item.yearly_miles.year_end.mileage - car_item.yearly_miles.year_start.mileage;
                const avgYearlyMileage = mileageDifference * yearlyMultiplier;

                const lastYearlyFuelUsed = (avgYearlyMileage / previousReading) / 0.219969;
                const lastYearlyCostUsed = (lastYearlyFuelUsed * lastPrice) / 100;
                lastYearlyCostUsedFinal = Math.ceil(lastYearlyCostUsed * 100) / 100;

                const thisYearlyFuelUsed = (avgYearlyMileage / thisReading) / 0.219969;
                const thisYearlyCostUsed = (thisYearlyFuelUsed * lastPrice) / 100;
                thisYearlyCostUsedFinal = Math.ceil(thisYearlyCostUsed * 100) / 100;

                const avgYearlyMileageFinal = Math.ceil(avgYearlyMileage).toLocaleString();
                $('#annual-mileage').removeClass('d-none');
                $('#mileage-amount').html(`${avgYearlyMileageFinal} miles`);
            }

            if (thisReading >= previousReading) {
                $('#improvement-type').html('IMPROVED');
                const improvementAmount = (Math.round((((thisReading - previousReading) / previousReading) * 100) * 100) / 100) + '%';
                $('#improvement-amount').html(improvementAmount);

                if (car_item.recent_fuel_price && car_item.yearly_miles && car_item.yearly_miles.year_end.date > car_item.yearly_miles.year_start.date) {

                    const yearlyCostDifference = lastYearlyCostUsedFinal - thisYearlyCostUsedFinal;
                    const yearlyCostDifferenceFinal = (Math.round(yearlyCostDifference * 100) / 100).toLocaleString();

                    $('#improvement-tip').html(`Nice! Based off your estimated annual mileage and most recent fuel price, you could save around <strong>&pound;${yearlyCostDifferenceFinal}</strong> on fuel per year!`);
                } else {
                    $('#improvement-tip').html('Nice job! Use the <strong>cost calculator</strong> tool to estimate how much a journey will cost you in fuel.');
                }
            } else {
                $('#improvement-type').html('DECREASED');
                const improvementAmount = (Math.round((((previousReading - thisReading) / previousReading) * 100) * 100) / 100) + '%';
                $('#improvement-amount').html(improvementAmount);

                if (car_item.recent_fuel_price && car_item.yearly_miles && car_item.yearly_miles.year_end.date > car_item.yearly_miles.year_start.date) {
                    
                    const yearlyCostDifference = thisYearlyCostUsedFinal - lastYearlyCostUsedFinal;
                    const yearlyCostDifferenceFinal = (Math.round(yearlyCostDifference * 100) / 100).toLocaleString();

                    $('#improvement-tip').html(`Hmm.. Based off your estimated annual mileage and most recent fuel price, you could be spending around <strong>&pound;${yearlyCostDifferenceFinal}</strong> more on fuel per year.`);
                } else {
                    $('#improvement-tip').html('Let\'s start climbing! Use the <strong>cost calculator</strong> tool to estimate how much a journey will cost you in fuel.');
                }
            }
            
        }
    }
});