// window.document.onreadystatechange = function () {
//     if (document.readyState === "complete") {
//         initSettings();
//         setTimeout(() => {
//             renderSettings();
//         }, 1000)
//     }
// }

function initSettings() {
    if (localStorage.getItem("weatherSubscription") === "true") {
        document.getElementById("weatherSubscription").setAttribute("checked", "checked");
    } else {
        localStorage.setItem("weatherSubscription", "false");
        document.getElementById("weatherSubscription").removeAttribute("checked");
    }

    if (localStorage.getItem("autoLocation") === "true") {
        document.getElementById("autoLocation").setAttribute("checked", "checked");
    } else {
        localStorage.setItem("autoLocation", "false");
        document.getElementById("autoLocation").removeAttribute("checked");
    }
}

function renderSettings() {
    // console.log(document.getElementById("weatherSubscription"))
    if (localStorage.getItem("weatherSubscription") === "true") {
        document.getElementById("weatherSubscription").setAttribute("checked", "checked");
    } else {
        document.getElementById("weatherSubscription").removeAttribute("checked");
    }

    if (localStorage.getItem("autoLocation") === "true") {
        document.getElementById("autoLocation").setAttribute("checked", "checked");
    } else {
        document.getElementById("autoLocation").removeAttribute("checked");
    }

    if (localStorage.getItem("autoLocation") === "false") {
        document.getElementById("geo").removeAttribute("disabled");
        document.getElementById("geo").classList.remove('forbidden');
        document.getElementById("geo").value = localStorage.getItem("geo");
    } else {
        document.getElementById("geo").value = localStorage.getItem("geo");
        document.getElementById("geo").classList.add('forbidden');
        document.getElementById("geo").setAttribute("disabled", "disabled");
    }
}

function toggleWeather() {
    console.log("toggleWeather")
    if (localStorage.getItem("weatherSubscription") === "true") {
        localStorage.setItem("weatherSubscription", "false");
        renderSettings();
    } else {
        localStorage.setItem("weatherSubscription", "true");
        renderSettings();
    }
}

function toggleAutoLocation() {
    console.log("autoLocation")
    if (localStorage.getItem("autoLocation") === "true") {
        localStorage.setItem("autoLocation", "false");
        renderSettings();
    } else {
        localStorage.setItem("autoLocation", "true");
        renderSettings();
    }
}

function onLocationChange() {
    console.log("onLocationChange")
    localStorage.setItem("geo", document.getElementById("geo").value);
}