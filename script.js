var service = new google.maps.DistanceMatrixService();

    function calculateDistance() {
        var origin = "Hardcoded Origin";
        var destination = document.getElementById("dest").value;
        service.getDistanceMatrix({
                origins: [origin],
                destinations: [destination],
                travelMode: google.maps.TravelMode.DRIVING,
                avoidHighways: false,
                avoidTolls: false,
                unitSystem: google.maps.UnitSystem.IMPERIAL
            },
            callback
        );
    }

    function callback(response, status) {
        var dest = document.getElementById("dest"),
            dist = document.getElementById("dist"),
            rate = document.getElementById("shipping-rate");

        if (status == "OK") {
            dist.value = response.rows[0].elements[0].distance.text;
            dist.value = dist.value.replace(/[^0-9$.,]/g, '');
            if (dist.value > 0 && dist.value < 3.99) {
                rate.innerHTML = "Your shipping rate is £3.";
            } else if (dist.value > 4.00 && dist.value < 7.99) {
                rate.innerHTML = "Your shipping rate is £5.";
            } else if (dist.value > 8.00 && dist.value < 11.99) {
                rate.innerHTML = "Your shipping cost is £7.";
            } else if (dist.value > 12.00 && dist.value < 15.00) {
                rate.innerHTML = "Your shipping cost is £10.";
            } else {
                rate.innerHTML = "Sorry, we don't deliver over 15 miles.";
            }
            dist.value = dist.value + " miles";
        } else {
            rate.innerHTML = "Error: " + status;
        }
    };
