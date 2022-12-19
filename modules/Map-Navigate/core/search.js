function search(keywords) {
    console.log(keywords)
    AMap.plugin('AMap.PlaceSearch', function () {
        var options = {
            city: '全国'
        }
        var placeSearch = new AMap.PlaceSearch(options);
        placeSearch.search(keywords, function (status, result) {
            console.log("status", status)
            console.log("result", result)
            searchResult = result
            renderSearchResult(result)
        })
    })
}

function renderSearchResult(result) {
    let data = result.poiList.pois
    let html = ''
    for (let i = 0; i < data.length; i++) {
        // console.log(data[i])
        let type = data[i].type.split(';')[0]
        html += `
            <div class="search-result-item">
                <div class="search-result-item-info">
                    <div class="search-result-item-title">${data[i].name}</div>
                    <div class="search-result-item-brief">${type}&nbsp;·&nbsp;<span id="${data[i].id}">0 KM</span>&nbsp;·&nbsp;最快路线</div>
                    <div class="search-result-item-address">${data[i].address}</div>
                </div>
                <div class="search-result-item-go">
                    <button class="go-btn" onclick="go(${data[i].location.KL},${data[i].location.kT})">出发</button>
                </div>
            </div>
        `
        getDistance(data[i].location.KL, data[i].location.kT, data[i].id)
    }
    document.getElementById('search-result-wrapper').innerHTML = html


    var pois = result.poiList.pois;
    for (var i = 0; i < pois.length; i++) {
        var poi = pois[i];
        var marker = [];
        marker[i] = new AMap.Marker({
            position: poi.location,   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: poi.name
        });
        // 将创建的点标记添加到已有的地图实例：
        map.add(marker[i]);
    }
    map.setFitView();
}

function getDistance(lng, lat, id) {
    fetch(`https://restapi.amap.com/v3/distance?key=30551afd76e4982342ad0ff817d8aab0&origins=${sessionStorage.getItem('lng')},${sessionStorage.getItem('lat')}&destination=${lng},${lat}&type=1`).then(r => r.json()).then(r => {
        // console.log(r)
        if (r.status == '1') {
            // console.log(r.results[0].distance)
            document.getElementById(id).innerHTML = (r.results[0].distance / 1000).toFixed(2) + '公里'
        } else {
            log.error('获取距离失败', r)
        }
    })
}