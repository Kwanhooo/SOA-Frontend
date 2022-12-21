// 实时路况图层
var trafficLayer = new AMap.TileLayer.Traffic({
    zIndex: 10
});
map.add(trafficLayer);

function toggleTraffic() {
    trafficLayerOn = !trafficLayerOn;
    if (trafficLayerOn) {
        map.add(trafficLayer);
    } else {
        map.remove(trafficLayer);
    }
}