function goByKeyword(to) {
    driving.search([
        {keyword: sessionStorage.getItem('address'), city: '长沙'},
        {keyword: to, city: '长沙'}
    ], function (status, result) {
        if (status === 'complete') {
            log.success('驾车路线规划完成')
        } else {
            log.error('获取驾车数据失败：' + result)
        }
    });
}

function go(lng, lat) {
    if (naviMode === 'driving') {
        driving.search(new AMap.LngLat(sessionStorage.getItem('lng'), sessionStorage.getItem('lat')),
            new AMap.LngLat(lng, lat),
            function (status, result) {
                console.log('驾车路线', result)
                if (status === 'complete') {
                    log.success('绘制驾车路线完成', result)
                } else {
                    log.error('获取驾车数据失败：' + result)
                }
            });
    } else if (naviMode === 'transfer') {
        transfer.search(new AMap.LngLat(sessionStorage.getItem('lng'), sessionStorage.getItem('lat')),
            new AMap.LngLat(lng, lat),
            function (status, result) {
                console.log('公交status', status)
                console.log('公交result', result)
                if (status === 'complete') {
                    log.success('绘制公交路线完成', result)
                } else {
                    log.error('公交路线数据查询失败' + result)
                }
            });
    }
}

