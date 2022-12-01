window.onload = () => {
    var x = document.getElementById("toast")
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 5000);
    setTimeout(function () {
        document.getElementById("announcement").style.display = "none";
        document.getElementById("cross").style.display = "none";
    }, 22000);
};

const cross = () => {
    document.getElementById("announcement").style.display = "none";
    document.getElementById("cross").style.display = "none";
}