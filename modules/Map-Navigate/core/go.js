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
    if (callingModeOn) {
        log.info('正在为您请求打车服务，请耐心等待...')
        setTimeout(() => {
            log.success('李师傅（粤Z WA741），为您服务')
            document.getElementById('search-result-wrapper').innerHTML = `
        <div class="calling-wrapper">
                        <div class="calling-cover">
                            <span>PowerLife 专享快车</span>
                        </div>
                        <div class="calling-tips">
                            <div class="title-tips">快车司机正努力赶来，请避开人群等候</div>
                            <div>
                                请前往<span class="strong-tips">${sessionStorage.getItem('geo')}</span>上车。请戴好口罩，保持安全距离，健康出行。
                            </div>
                        </div>
                        <div class="calling-details">
                            <div class="car-plate">
                                粤Z WA741
                            </div>
                            <div class="car-model">
                                丰田-卡罗拉 · 白色
                            </div>
                            <div class="car-driver">
                                李师傅&nbsp;&nbsp;⭐4.7&nbsp;&nbsp;1.2万单
                            </div>
                        </div>
                        <div class="calling-operation">
                            <button class="calling-op-btn" onclick="log.warn('警情已上报，请等待')">
                                <img class="calling-op-icon" src="../../assets/svgs/police.svg">
                                <div>110报警</div>
                            </button>
                            <button class="calling-op-btn" onclick="log.success('电话已复制到剪贴板')">
                                <img class="calling-op-icon" src="../../assets/svgs/call.svg">
                                <div>打电话</div>
                            </button>
                            <button class="calling-op-btn" onclick="log.success('订单已取消');showAroundType()">
                                <img class="calling-op-icon" src="../../assets/svgs/cancel.svg">
                                <div>取消订单</div>
                            </button>
                            <button class="calling-op-btn" onclick="log.success('路线规划已更新')">
                                <img class="calling-op-icon" src="../../assets/svgs/route.svg">
                                <div>更新路线</div>
                            </button>
                        </div>
                    </div>
        `
        }, 5000)
        return;
    }
    if (naviMode === 'driving') {
        driving.search(new AMap.LngLat(sessionStorage.getItem('lng'), sessionStorage.getItem('lat')),
            new AMap.LngLat(lng, lat),
            function (status, result) {
                console.log('驾车路线', result)
                if (status === 'complete') {
                    log.success('驾车路线规划完成', result)
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
                    log.success('公交路线规划完成', result)
                } else {
                    log.error('公交路线数据查询失败' + result)
                }
            });
    }
}

