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
        console.log('登录的data', data);
        fetch('http://localhost:3000/recommend/songs')
        .then(response => response.text())
        .then(data => {
            let dataJson = JSON.parse(data);
            // console.log('dataJson', dataJson);
            let dataShow = dataJson.data.dailySongs.slice(0, 6);
    
            showRecommendSongs(dataShow);
    
            localStorage.setItem('recommendMusic', JSON.stringify(dataShow));
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