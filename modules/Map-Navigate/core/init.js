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
var callingModeOn = false;

// 获取当前城市
AMap.plugin('AMap.CitySearch', function () {
    var citySearch = new AMap.CitySearch()
    citySearch.getLocalCity(function (status, result) {
        console.log('当前城市',result)
        cityCode = result.adcode
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

// POST
// fetch('https://eolink.o.apispace.com/qhcx/common/postcode/queryCodeByAddr', {
//     method: 'POST',
//     // 跨域
//     mode: 'no-cors',
//     headers: {
//         'Access-Control-Allow-Headers': 'X-APISpace-Token,Content-Type, Content-Length, Authorization, Accept, X-Requested-With',
//         'X-APISpace-Token': 'g71s99res63uco9uv9yakferkmndp3dk',
//         'Authorization-Type': 'apikey',
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//         // 允许头部
//     },
//     body: 'city=' + '广州'
// }).then(res => {
//     console.log('res', res)
//     // console.log(res)
// })


AMap.plugin("AMap.Geocoder", function () {
    geocoder = new AMap.Geocoder({
        city: "",
        radius: 500  //范围，默认：500
    });
});

AMap.plugin('AMap.Geolocation', function () {
    var geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        // timeout: 10000,
        // 定位按钮的停靠位置的偏移量
        offset: [20, 100],
        // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true,
        //  定位按钮的排放位置,  RB表示右下
        position: 'RB'
    })
    map.addControl(geolocation);
    geolocation.getCurrentPosition(function (status, result) {
        console.log('精确定位', result.position)
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
                console.log('精确定位编码', address)
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
