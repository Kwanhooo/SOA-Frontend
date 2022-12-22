function switchMode() {
    // console.log(naviMode)
    if (naviMode === 'driving') {
        naviMode = 'transfer';
        document.getElementById('mode-switch-text').innerText = '驾车';
        document.getElementById('mode-icon').src = '../../assets/image/drive.png';
        stationSearch('公交站');
        stationSearch('地铁站');
        log.success('已切换到公交模式');
        callingModeOn = false;
    } else {
        naviMode = 'driving';
        document.getElementById('mode-switch-text').innerText = '公交地铁';
        document.getElementById('mode-icon').src = '../../assets/image/transfer.png';
        log.success('已切换到驾车模式');
        callingModeOn = false;
    }
}

function toggleCallingMode() {
    callingModeOn = !callingModeOn;
    if (callingModeOn) {
        log.success('已切换至打车模式');
    } else {
        log.success('已退出打车模式');
    }
}
