localStorage.setItem("notificationCenter", "false");
localStorage.setItem("settings", "false");

// 屏蔽右键菜单
document.oncontextmenu = function () {
    return false;
}

function gotoHome() {
    window.location.href = "../../index.html";
}

function toggleNotificationCenter() {
    localStorage.getItem("notificationCenter") === "true" ? localStorage.setItem("notificationCenter", "false") : localStorage.setItem("notificationCenter", "true");
    if (localStorage.getItem("notificationCenter") === "true") {
        document.getElementById("notification-center").style.display = "block";
        setTimeout(() => {
            document.getElementById("notification-center").style.opacity = "1";
        }, 10);
    } else {
        document.getElementById("notification-center").style.opacity = "0";
        setTimeout(() => {
            document.getElementById("notification-center").style.display = "none";
        }, 150);
    }
}

function toggleSettings() {
    localStorage.getItem("settings") === "true" ? localStorage.setItem("settings", "false") : localStorage.setItem("settings", "true");
    if (localStorage.getItem("settings") === "true") {
        document.getElementById("settings").style.display = "block";
        document.getElementById("global-mask").style.display = "block";
        setTimeout(() => {
            document.getElementById("settings").style.opacity = "1";
            document.getElementById("global-mask").style.opacity = "1";
        }, 10);
    } else {
        document.getElementById("settings").style.opacity = "0";
        document.getElementById("global-mask").style.opacity = "0";
        setTimeout(() => {
            document.getElementById("settings").style.display = "none";
            document.getElementById("global-mask").style.display = "none";
        }, 150);
    }
}

