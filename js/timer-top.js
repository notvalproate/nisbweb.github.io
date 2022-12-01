var countDownDate = new Date("Dec 05, 2022 11:00:00").getTime();

// Update the count down every 1 second
var y = setInterval(function () {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hour = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var sec = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById("day").innerHTML = days + "d ";
    document.getElementById("hour").innerHTML = hour + "h ";
    document.getElementById("minute").innerHTML = minute + "m ";
    document.getElementById("sec").innerHTML = sec + "s ";

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(y);
        document.getElementById("day").innerHTML = "0";
        document.getElementById("hour").innerHTML = "0";
        document.getElementById("minute").innerHTML = "0";
        document.getElementById("sec").innerHTML = "0";
    }
}, 1000);