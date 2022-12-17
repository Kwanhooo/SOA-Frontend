window.document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        initSettings();
        setTimeout(() => {
            renderSettings();
        }, 1000)
        if (document.querySelector('#weather-iframe')) {
            document.querySelector('#weather-iframe').src = 'https://weathernew.pae.baidu.com/weathernew/pc?query=' + localStorage.getItem('geo') + '天气&srcid=4982';
        }
    }
}