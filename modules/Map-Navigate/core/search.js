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

function showAroundType() {
    let types = [
        {
            name: '餐饮服务',
            brief: '周边的吃喝好店',
            icon: '../../assets/image/restaurant.png'
        },
        {
            name: '购物服务',
            brief: '周边的商圈以及购物店',
            icon: '../../assets/image/shopping.png'
        },
        {
            name: '交通设施服务',
            brief: '停车场等交通设施',
            icon: '../../assets/image/transit.png'
        },
        {
            name: '娱乐',
            brief: '周边的娱乐场所',
            icon: '../../assets/image/entertainment.png'
        },
        {
            name: '加油站',
            brief: '周边的加油站',
            icon: '../../assets/image/oil.png'
        },
        {
            name: '便利店',
            brief: '周边的便利店',
            icon: '../../assets/image/store.png'
        },
    ]
    let html = ''
    for (let i = 0; i < types.length; i++) {
        html += `
            <div class="search-result-item" style="padding-left: .25rem;padding-right: .25rem">
                <div class="search-result-item-info">
                    <div class="search-result-item-title">${types[i].name}</div>
                    <div class="search-result-item-brief">${types[i].brief}</div>
                </div>
                <div class="search-result-item-go" onclick="searchAround('${types[i].name}',5000)">
                    <img src="${types[i].icon}" class="pointer go-icon">
                </div>
            </div>
        `
    }
    document.getElementById('search-result-wrapper').innerHTML = html
}

function searchAround(type, distance) {
    console.log(city)
    AMap.plugin("AMap.PlaceSearch", function () {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
            // type: '餐饮服务', // 兴趣点类别
            // type: '购物服务', // 兴趣点类别
            // type: '交通设施服务', // 兴趣点类别
            // type: '娱乐', // 兴趣点类别
            // type: '加油站', // 兴趣点类别
            // type: '便利店', // 兴趣点类别
            type: type, // 兴趣点类别
            pageSize: 30, // 单页显示结果条数
            pageIndex: 1, // 页码
            city: localStorage.getItem('geo'), // 兴趣点城市
            citylimit: false,  //是否强制限制在设置的城市内搜索
            map: map, // 展现结果的地图实例
            // panel: "panel", // 结果列表将在此容器中进行展示。
            autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        var cpoint = [sessionStorage.getItem('lng'), sessionStorage.getItem('lat')]; // 中心点坐标
        console.log(cpoint)
        placeSearch.searchNearBy('', cpoint, distance, function (status, result) {
            console.log("status", status)
            console.log("result", result)
            if (result)
                renderSearchResult(result)
        });
    });
}


function renderSearchResult(result) {
    let data = result.poiList.pois
    let html = ''
    for (let i = 0; i < data.length; i++) {
        let type = data[i].type.split(';')[0]
        html += `
            <div class="search-result-item">
                <div class="search-result-item-info">
                    <div class="search-result-item-title">${data[i].name}</div>
                    <div class="search-result-item-brief">${type}&nbsp;·&nbsp;<span id="${data[i].id}">0 千米</span>&nbsp;·&nbsp;最快路线</div>
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
