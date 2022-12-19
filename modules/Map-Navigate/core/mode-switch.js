function switchMode() {
    if ('driving' === naviMode) {
        naviMode = 'transfer';
        document.getElementById('mode-switch-text').innerText = '驾车';
    } else {
        naviMode = 'driving';
        document.getElementById('mode-switch-text').innerText = '公交地铁';
    }
}

function getNaviMode() {
    return naviMode;
}