function smoothScroll(target, duration, addHeight) {
    let targetEl = document.querySelector(target);
    let targetPos = targetEl.getBoundingClientRect().top;
    let startPosition = window.pageYOffset;
    let distance = targetPos - startPosition;
    if (addHeight) {
        distance = distance + window.innerHeight
    }
    let startTime = null;

    function animationScroll(currentTime) {
        if (startTime == null) startTime = currentTime;
        let time = currentTime - startTime;
        let run = ease(time, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (time < duration) requestAnimationFrame(animationScroll);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animationScroll);
}
