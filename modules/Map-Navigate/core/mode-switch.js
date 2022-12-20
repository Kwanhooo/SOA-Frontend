function switchMode() {
    // console.log(naviMode)
    if (naviMode === 'driving') {
        naviMode = 'transfer';
        document.getElementById('mode-switch-text').innerText = '驾车';
        document.getElementById('mode-icon').src = '../../assets/image/drive.png';
        stationSearch();
        log.success('已切换到公交模式');
    } else {
        naviMode = 'driving';
        document.getElementById('mode-switch-text').innerText = '公交地铁';
        document.getElementById('mode-icon').src = '../../assets/image/transfer.png';
        log.success('已切换到驾车模式');
    }
}

function getNaviMode() {
    return naviMode;
}