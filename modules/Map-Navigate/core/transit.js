function stationSearch(keyword) {
    console.log(city)
    AMap.plugin('AMap.StationSearch', function () {
        station = new AMap.StationSearch({
            pageIndex: 1, //页码
            pageSize: 100, //单页显示结果条数
            city: city  //确定搜索城市
        });
    });
    var stationKeyWord = keyword;
    if (!stationKeyWord) return
    station.search(stationKeyWord, function (status, result) {
        stationSearchCallBack(result, keyword);
    });
}

/* 公交站点查询返回数据解析 */
function stationSearchCallBack(searchResult, keyword) {
    console.log(searchResult)
    var stationArr = searchResult.stationInfo;
    var searchNum = stationArr.length;
    if (searchNum > 0) {
        for (var i = 0; i < searchNum; i++) {
            var marker = new AMap.Marker({
                icon: new AMap.Icon({
                    image: 'https://cloud.0xcafebabe.cn/' + keyword + '.png',
                    size: new AMap.Size(32, 32),
                    imageSize: new AMap.Size(32, 32)
                }),
                offset: new AMap.Pixel(-16, -32),
                position: stationArr[i].location,
                map: map,
                title: stationArr[i].name
            });
            marker.info = new AMap.InfoWindow({
                content: stationArr[i].name,
                offset: new AMap.Pixel(0, -30)
            });
            marker.on('mouseover', function (e) {
                e.target.info.open(map, e.target.getPosition())
            })
        }
        map.setFitView();
    }
}

// document.getElementById('search').onclick = stationSearch;
