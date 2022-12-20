var map = new AMap.Map('container', {
    zoom: 10,
    resizeEnable: true,
    displayMode: '3D',
    viewMode: '3D',
    pitch: 30,
    rotation: -15,
})
var searchResult;
var geocoder;
var driving;
var transfer;
var naviMode = 'driving';
var trafficLayerOn = true;
var city;
var cityCode;

// 获取当前城市
AMap.plugin('AMap.CitySearch', function () {
    var citySearch = new AMap.CitySearch()
    citySearch.getLocalCity(function (status, result) {
        // console.log(result)
        // cityCode = result.adcode
        city = result.city
        showAroundType()
        AMap.plugin('AMap.Transfer', function () {
            transfer = new AMap.Transfer({
                map: map,
                panel: 'panel',
                city: city,
                policy: AMap.TransferPolicy.LEAST_TIME
            });
        })
    })
})

fetch('https://restapi.amap.com/v3/geocode/geocode?key=6c75d672a9a64b86f998f3fc51e25e1c&city=长沙市')
    .then(r => r.json()).then(r => {
    console.log(r)
})


AMap.plugin("AMap.Geocoder", function () {
    geocoder = new AMap.Geocoder({
        city: "",
        radius: 1000 //范围，默认：500
    });
});

AMap.plugin('AMap.Geolocation', function () {
    var geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        // 定位按钮的停靠位置的偏移量
        offset: [20, 100],
        // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true,
        //  定位按钮的排放位置,  RB表示右下
        position: 'RB'
    })
    map.addControl(geolocation);
    geolocation.getCurrentPosition(function (status, result) {
        if (status == 'complete') {
            onComplete(result)
        } else {
            onError(result)
        }
    });

    function onComplete(data) {
        sessionStorage.setItem('lng', data.position.KL)
        sessionStorage.setItem('lat', data.position.kT)

        lnglat = [data.position.KL, data.position.kT]

        geocoder.getAddress(lnglat, function (status, result) {
            if (status === 'complete' && result.regeocode) {
                var address = result.regeocode.formattedAddress;
                sessionStorage.setItem('address', address)
            } else {
                log.error('根据经纬度查询地址失败')
            }
        });
    }

    function onError(data) {
        console.log('定位失败', data)
    }
})
AMap.plugin('AMap.Driving', function () {
    driving = new AMap.Driving({
        map: map,
        panel: "panel"
    })
})