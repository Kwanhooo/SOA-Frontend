function getHotMusicList() {
    fetch('https://cloudmusic.0xcafebabe.cn/search/hot/detail')
    .then(response => response.text())
    .then(data => {
        // console.log('热搜列表', data);
        let dataJson = JSON.parse(data);
        // console.log(dataJson);

        let dataShow = dataJson.data;
        // 添加数据 
        let _hotMusicList = document.getElementsByClassName('upnote')[1];
        dataShow.forEach(function(item, index) {
            let searchWord = item.searchWord;
            let content = item.content ? item.content : '';
            let score = item.score;

            let listItem = document.createElement('div');
            listItem.setAttribute('class', 'uptext myMusic-item');

            let before = document.createElement('div');
            before.setAttribute('class', 'myMusic-item-before');

            let _index = document.createElement('div');
            _index.setAttribute('class', 'myMusic-item-index');
            let num = index + 1;
            if(num <= 3) {
                _index.style.color = '#dc001a';
            }
            _index.innerHTML = num;
            before.appendChild(_index);

            let _title = document.createElement('div');
            _title.setAttribute('class', 'myMusic-item-title');
            _title.innerHTML = searchWord;
            before.appendChild(_title);

            let _score = document.createElement('div');
            _score.setAttribute('class', 'myMusic-item-score');
            _score.innerHTML = score;
            before.appendChild(_score);

            listItem.appendChild(before);

            let _content = document.createElement('div');
            _content.setAttribute('class', 'myMusic-item-content');
            _content.innerHTML = content;
            listItem.appendChild(_content);

            _hotMusicList.appendChild(listItem);
        })


    })
}

let phone = '14750653386';
let password = 'wen8871490';

function getRecommendSongs() {
    fetch('https://cloudmusic.0xcafebabe.cn/login/cellphone?phone=' + phone + '&password=' + password)
    .then(response => response.text())
    .then(data => {
        // console.log('登录的data', data);
        fetch('https://cloudmusic.0xcafebabe.cn/recommend/songs')
        .then(response => response.text())
        .then(data => {
            let dataJson = JSON.parse(data);
            // console.log('dataJson', dataJson);
            let dataShow = dataJson.data.dailySongs.slice(0, 6);
    
            showRecommendSongs(dataShow);
    
            localStorage.setItem('recommendMusic', JSON.stringify(dataShow));
        })
        .catch(function(error) {
            // console.log('出现错误了');
            // 直接放假数据
            let dataShow = '[{"name":"The Show","id":16607964,"pst":0,"t":0,"ar":[{"id":64143,"name":"Lenka","tns":[],"alias":[]}],"alia":[],"pop":100,"st":0,"rt":"","fee":8,"v":41,"crbt":null,"cf":"","al":{"id":1530750,"name":"Lenka","picUrl":"http://p3.music.126.net/Tfaddll3SKve6_2WkGGvxg==/109951163441000456.jpg","tns":[],"pic_str":"109951163441000456","pic":109951163441000450},"dt":235693,"h":{"br":320000,"fid":0,"size":9430248,"vd":-64174,"sr":44100},"m":{"br":192000,"fid":0,"size":5658166,"vd":-64174,"sr":44100},"l":{"br":128000,"fid":0,"size":3772125,"vd":-64174,"sr":44100},"sq":{"br":935961,"fid":0,"size":27574996,"vd":-64174,"sr":44100},"hr":null,"a":null,"cd":"1","no":1,"rtUrl":null,"ftype":0,"rtUrls":[],"djId":0,"copyright":1,"s_id":0,"mark":270336,"originCoverType":1,"originSongSimpleData":null,"tagPicList":null,"resourceState":true,"version":41,"songJumpInfo":null,"entertainmentTags":null,"single":0,"noCopyrightRcmd":null,"mst":9,"cp":7001,"mv":504138,"rtype":0,"rurl":null,"publishTime":1220889600007,"reason":"超74%人播放","recommendReason":"超74%人播放","privilege":{"id":16607964,"fee":8,"payed":0,"st":0,"pl":128000,"dl":0,"sp":7,"cp":1,"subp":1,"cs":false,"maxbr":999000,"fl":128000,"toast":false,"flag":4,"preSell":false,"playMaxbr":999000,"downloadMaxbr":999000,"maxBrLevel":"lossless","playMaxBrLevel":"lossless","downloadMaxBrLevel":"lossless","plLevel":"standard","dlLevel":"none","flLevel":"standard","rscl":null,"freeTrialPrivilege":{"resConsumable":false,"userConsumable":false,"listenType":0},"chargeInfoList":[{"rate":128000,"chargeUrl":null,"chargeMessage":null,"chargeType":0},{"rate":192000,"chargeUrl":null,"chargeMessage":null,"chargeType":1},{"rate":320000,"chargeUrl":null,"chargeMessage":null,"chargeType":1},{"rate":999000,"chargeUrl":null,"chargeMessage":null,"chargeType":1}]},"alg":"itembased_on"},{"name":"Empty Love","id":1435828582,"pst":0,"t":0,"ar":[{"id":1115185,"name":"Lulleaux","tns":[],"alias":[]},{"id":34704316,"name":"Kid Princess","tns":[],"alias":[]}],"alia":[],"pop":100,"st":0,"rt":"","fee":8,"v":24,"crbt":null,"cf":"","al":{"id":87122489,"name":"Empty Love (feat. Kid Princess)","picUrl":"http://p3.music.126.net/xrWSChs7pIOWFjOz5eQIzw==/109951164855840145.jpg","tns":[],"pic_str":"109951164855840145","pic":109951164855840140},"dt":170314,"h":{"br":320000,"fid":0,"size":6814868,"vd":-59301,"sr":44100},"m":{"br":192000,"fid":0,"size":4088938,"vd":-56803,"sr":44100},"l":{"br":128000,"fid":0,"size":2725973,"vd":-55330,"sr":44100},"sq":{"br":997578,"fid":0,"size":21237727,"vd":-59314,"sr":44100},"hr":null,"a":null,"cd":"01","no":1,"rtUrl":null,"ftype":0,"rtUrls":[],"djId":0,"copyright":1,"s_id":0,"mark":270336,"originCoverType":0,"originSongSimpleData":null,"tagPicList":null,"resourceState":true,"version":24,"songJumpInfo":null,"entertainmentTags":null,"single":0,"noCopyrightRcmd":null,"mst":9,"cp":1416676,"mv":0,"rtype":0,"rurl":null,"publishTime":1588176000000,"reason":null,"tns":["虚无之爱"],"recommendReason":null,"privilege":{"id":1435828582,"fee":8,"payed":0,"st":0,"pl":128000,"dl":0,"sp":7,"cp":1,"subp":1,"cs":false,"maxbr":999000,"fl":128000,"toast":false,"flag":4,"preSell":false,"playMaxbr":999000,"downloadMaxbr":999000,"maxBrLevel":"lossless","playMaxBrLevel":"lossless","downloadMaxBrLevel":"lossless","plLevel":"standard","dlLevel":"none","flLevel":"standard","rscl":null,"freeTrialPrivilege":{"resConsumable":false,"userConsumable":false,"listenType":0},"chargeInfoList":[{"rate":128000,"chargeUrl":null,"chargeMessage":null,"chargeType":0},{"rate":192000,"chargeUrl":null,"chargeMessage":null,"chargeType":1},{"rate":320000,"chargeUrl":null,"chargeMessage":null,"chargeType":1},{"rate":999000,"chargeUrl":null,"chargeMessage":null,"chargeType":1}]},"alg":"off_playendRed"},{"name":"多远都要在一起","id":30612793,"pst":0,"t":0,"ar":[{"id":7763,"name":"G.E.M.邓紫棋","tns":[],"alias":[]}],"alia":["Long Distance"],"pop":100,"st":0,"rt":null,"fee":1,"v":64,"crbt":null,"cf":"","al":{"id":3189002,"name":"新的心跳","picUrl":"http://p3.music.126.net/kVwk6b8Qdya8oDyGDcyAVA==/1364493930777368.jpg","tns":[],"pic":1364493930777368},"dt":216880,"h":{"br":320000,"fid":0,"size":8677921,"vd":-40544,"sr":44100},"m":{"br":192000,"fid":0,"size":5206770,"vd":-37950,"sr":44100},"l":{"br":128000,"fid":0,"size":3471195,"vd":-36289,"sr":44100},"sq":{"br":886486,"fid":0,"size":24032654,"vd":-40533,"sr":44100},"hr":null,"a":null,"cd":"1","no":1,"rtUrl":null,"ftype":0,"rtUrls":[],"djId":0,"copyright":2,"s_id":0,"mark":8192,"originCoverType":1,"originSongSimpleData":null,"tagPicList":null,"resourceState":true,"version":64,"songJumpInfo":null,"entertainmentTags":null,"single":0,"noCopyrightRcmd":null,"mst":9,"cp":1415926,"mv":384709,"rtype":0,"rurl":null,"publishTime":1446739200000,"reason":"第14届新城国语力颁奖礼","recommendReason":"第14届新城国语力颁奖礼","privilege":{"id":30612793,"fee":1,"payed":0,"st":0,"pl":0,"dl":0,"sp":0,"cp":0,"subp":0,"cs":false,"maxbr":999000,"fl":0,"toast":false,"flag":4,"preSell":false,"playMaxbr":999000,"downloadMaxbr":999000,"maxBrLevel":"lossless","playMaxBrLevel":"lossless","downloadMaxBrLevel":"lossless","plLevel":"none","dlLevel":"none","flLevel":"none","rscl":null,"freeTrialPrivilege":{"resConsumable":false,"userConsumable":false,"listenType":0},"chargeInfoList":[{"rate":128000,"chargeUrl":null,"chargeMessage":null,"chargeType":1},{"rate":192000,"chargeUrl":null,"chargeMessage":null,"chargeType":1},{"rate":320000,"chargeUrl":null,"chargeMessage":null,"chargeType":1},{"rate":999000,"chargeUrl":null,"chargeMessage":null,"chargeType":1}]},"alg":"daily_audition_itemBase","s_ctrp":"yunbeiRcmd_rcmdInfo_1927049087&30612793"},{"name":"最后一页","id":247936,"pst":0,"t":0,"ar":[{"id":8153,"name":"江语晨","tns":[],"alias":[]}],"alia":[],"pop":100,"st":0,"rt":"600902000008129682","fee":0,"v":17,"crbt":null,"cf":"","al":{"id":24837,"name":"恋习","picUrl":"http://p3.music.126.net/XvVUZQTCxmhjNOcfEnJYew==/109951163610134059.jpg","tns":[],"pic_str":"109951163610134059","pic":109951163610134060},"dt":245547,"h":{"br":320000,"fid":0,"size":9824174,"vd":-31595,"sr":44100},"m":{"br":192000,"fid":0,"size":5894522,"vd":-29014,"sr":44100},"l":{"br":128000,"fid":0,"size":3929696,"vd":-27392,"sr":44100},"sq":{"br":884980,"fid":0,"size":27163079,"vd":-31600,"sr":44100},"hr":null,"a":null,"cd":"1","no":2,"rtUrl":null,"ftype":0,"rtUrls":[],"djId":0,"copyright":2,"s_id":0,"mark":0,"originCoverType":0,"originSongSimpleData":null,"tagPicList":null,"resourceState":true,"version":17,"songJumpInfo":null,"entertainmentTags":null,"single":0,"noCopyrightRcmd":null,"mst":9,"cp":0,"mv":0,"rtype":0,"rurl":null,"publishTime":1284652800000,"reason":null,"recommendReason":null,"privilege":{"id":247936,"fee":0,"payed":0,"st":0,"pl":320000,"dl":999000,"sp":7,"cp":1,"subp":1,"cs":false,"maxbr":999000,"fl":320000,"toast":false,"flag":0,"preSell":false,"playMaxbr":999000,"downloadMaxbr":999000,"maxBrLevel":"lossless","playMaxBrLevel":"lossless","downloadMaxBrLevel":"lossless","plLevel":"exhigh","dlLevel":"lossless","flLevel":"exhigh","rscl":null,"freeTrialPrivilege":{"resConsumable":false,"userConsumable":false,"listenType":0},"chargeInfoList":[{"rate":128000,"chargeUrl":null,"chargeMessage":null,"chargeType":0},{"rate":192000,"chargeUrl":null,"chargeMessage":null,"chargeType":0},{"rate":320000,"chargeUrl":null,"chargeMessage":null,"chargeType":0},{"rate":999000,"chargeUrl":null,"chargeMessage":null,"chargeType":1}]},"alg":"itembased_on"},{"name":"Oops","id":441491080,"pst":0,"t":0,"ar":[{"id":96072,"name":"Little Mix","tns":[],"alias":[]},{"id":90331,"name":"Charlie Puth","tns":[],"alias":[]}],"alia":[],"pop":100,"st":0,"rt":null,"fee":8,"v":42,"crbt":null,"cf":"","al":{"id":34928617,"name":"Glory Days (Deluxe Concert Film Edition)","picUrl":"http://p4.music.126.net/lCxrFkMt1q71Pjo9i3AxlA==/109951165976214835.jpg","tns":[],"pic_str":"109951165976214835","pic":109951165976214830},"dt":204760,"h":{"br":320000,"fid":0,"size":8193089,"vd":-68498,"sr":44100},"m":{"br":192000,"fid":0,"size":4915871,"vd":-68498,"sr":44100},"l":{"br":128000,"fid":0,"size":3277262,"vd":-68498,"sr":44100},"sq":{"br":964737,"fid":0,"size":24692461,"vd":-68498,"sr":44100},"hr":null,"a":null,"cd":"1","no":4,"rtUrl":null,"ftype":0,"rtUrls":[],"djId":0,"copyright":2,"s_id":0,"mark":270336,"originCoverType":1,"originSongSimpleData":null,"tagPicList":null,"resourceState":true,"version":42,"songJumpInfo":null,"entertainmentTags":null,"single":0,"noCopyrightRcmd":null,"mst":9,"cp":7001,"mv":0,"rtype":0,"rurl":null,"publishTime":1479398400007,"reason":null,"recommendReason":null,"privilege":{"id":441491080,"fee":8,"payed":0,"st":0,"pl":128000,"dl":0,"sp":7,"cp":1,"subp":1,"cs":false,"maxbr":999000,"fl":128000,"toast":false,"flag":4,"preSell":false,"playMaxbr":999000,"downloadMaxbr":999000,"maxBrLevel":"lossless","playMaxBrLevel":"lossless","downloadMaxBrLevel":"lossless","plLevel":"standard","dlLevel":"none","flLevel":"standard","rscl":null,"freeTrialPrivilege":{"resConsumable":false,"userConsumable":false,"listenType":0},"chargeInfoList":[{"rate":128000,"chargeUrl":null,"chargeMessage":null,"chargeType":0},{"rate":192000,"chargeUrl":null,"chargeMessage":null,"chargeType":1},{"rate":320000,"chargeUrl":null,"chargeMessage":null,"chargeType":1},{"rate":999000,"chargeUrl":null,"chargeMessage":null,"chargeType":1}]},"alg":"itembased_on"},{"name":"这世界那么多人","id":1842025914,"pst":0,"t":0,"ar":[{"id":8926,"name":"莫文蔚","tns":[],"alias":[]}],"alia":["电影《我要我们在一起》主题曲"],"pop":100,"st":0,"rt":"","fee":8,"v":19,"crbt":null,"cf":"","al":{"id":126837556,"name":"这世界那么多人","picUrl":"http://p4.music.126.net/LOTxqRjFm03VJEOHJbUqMw==/109951165944804127.jpg","tns":[],"pic_str":"109951165944804127","pic":109951165944804130},"dt":285884,"h":{"br":320000,"fid":0,"size":11436452,"vd":-24264,"sr":44100},"m":{"br":192000,"fid":0,"size":6861889,"vd":-21628,"sr":44100},"l":{"br":128000,"fid":0,"size":4574607,"vd":-19844,"sr":44100},"sq":null,"hr":null,"a":null,"cd":"01","no":1,"rtUrl":null,"ftype":0,"rtUrls":[],"djId":0,"copyright":1,"s_id":0,"mark":8192,"originCoverType":1,"originSongSimpleData":null,"tagPicList":null,"resourceState":true,"version":19,"songJumpInfo":null,"entertainmentTags":null,"single":0,"noCopyrightRcmd":null,"mst":9,"cp":7001,"mv":0,"rtype":0,"rurl":null,"publishTime":1620316800000,"reason":null,"recommendReason":null,"privilege":{"id":1842025914,"fee":8,"payed":0,"st":0,"pl":128000,"dl":0,"sp":7,"cp":1,"subp":1,"cs":false,"maxbr":320000,"fl":128000,"toast":false,"flag":260,"preSell":false,"playMaxbr":320000,"downloadMaxbr":320000,"maxBrLevel":"exhigh","playMaxBrLevel":"exhigh","downloadMaxBrLevel":"exhigh","plLevel":"standard","dlLevel":"none","flLevel":"standard","rscl":null,"freeTrialPrivilege":{"resConsumable":false,"userConsumable":false,"listenType":0},"chargeInfoList":[{"rate":128000,"chargeUrl":null,"chargeMessage":null,"chargeType":0},{"rate":192000,"chargeUrl":null,"chargeMessage":null,"chargeType":1},{"rate":320000,"chargeUrl":null,"chargeMessage":null,"chargeType":1},{"rate":999000,"chargeUrl":null,"chargeMessage":null,"chargeType":1}]},"alg":"off_playendRed"}]';
            localStorage.setItem('recommendMusic', dataShow);
            showRecommendSongs(JSON.parse(dataShow));
        })
    })

}

function showRecommendSongs(dataShow) {
    let _recommendList = document.getElementsByClassName('recommand-list')[0];
    dataShow.forEach(function(item, index) {
        let songName = item.name;
        let picUrl = item.al.picUrl;
        let authorName = item.ar[0].name;
        let recommendReason = item.reason;
        // console.log('recommendReason', recommendReason)

        let _recommandItem = document.createElement('div');
        _recommandItem.setAttribute('class', 'recommand-item');

        let _recPicture = document.createElement('div');
        _recPicture.setAttribute('class', 'rec-picture');

        // 添加图片
        let _recPic = document.createElement('img');
        _recPic.setAttribute('class', 'rec-pic');
        _recPic.setAttribute('src', picUrl);

        _recPicture.appendChild(_recPic);
        _recommandItem.appendChild(_recPicture);

        // 添加文字
        let _recWord = document.createElement('div');
        _recWord.setAttribute('class', 'recommand-word');

        let text1 = document.createElement('span');
        text1.setAttribute('class', 'recommand-word-text-1');
        text1.innerHTML = recommendReason != null ? songName + '-' + authorName + '-' + recommendReason : songName + '-' + authorName;
        let text2 = document.createElement('span');
        text2.setAttribute('class', 'recommand-word-text-2');
        text2.innerHTML = recommendReason != null ? songName + '-' + authorName + '-' + recommendReason : songName + '-' + authorName;

        _recWord.appendChild(text1);
        _recWord.appendChild(text2);
        _recommandItem.appendChild(_recWord);

        _recommendList.appendChild(_recommandItem);

    })
}



window.addEventListener('load', function() {
    getHotMusicList();
    let dataShow = JSON.parse(localStorage.getItem('recommendMusic'));
    // console.log('首次加载', dataShow);
    if(!dataShow) {
        // 首次加载
        // console.log('要发送获取推荐列表请求')
        getRecommendSongs();
    }else {
        showRecommendSongs(dataShow);
    }
    
});