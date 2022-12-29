function getNewsByKeyWord(){
    let _keyword = document.getElementsByClassName('seachInput')[0].value;
    if(!_keyword) {
        _keyword = '';
    }
    console.log('发起请求的关键词是' + _keyword);


    // 每次发起请求前，先把有的元素删除
    let _eachNews = document.getElementsByClassName('each-news');
    if(_eachNews) {
        let _newsList = document.getElementsByClassName('newsList')[0];
        // console.log(document.getElementsByClassName('newsList'));
        // console.log(_newsList);
        // _newsList.innerHTML = "";
    }

    console.log('_keyword是' + _keyword); 
    fetch('https://hzy.0xcafebabe.cn/news/' + _keyword)
    .then(response => response.json())
    .then(data => {
        console.dir(data)
        data.forEach(function(item,index) {
            let link = item.link;
            let pubDate = item.pubDate.split(" ")[0];
            let image = item.img;
            // console.log('image', image);
            let title = item.title;
            let channelName = item.channelName;
            let desc = '当前文字暂时没有描述o(╥﹏╥)o请点击获取更多资讯~';
            if(item.desc) {
                desc = item.desc.length > 57 ? item.desc.slice(0, 57) + "..." : item.desc;
            }

            // 插入链接
            let _newsList = document.getElementsByClassName('newsList')[0];
            
            let _a = document.createElement('a');
            _a.setAttribute('href', link);
            _a.setAttribute('class', "each-news");

            // 添加图片
            if(image) {
                //有图片才加
                let _posterDiv = document.createElement('div');
                _posterDiv.setAttribute('class', 'posterContainer');
                let _img = document.createElement('img');
                _img.setAttribute('src', image);
                _img.setAttribute('class', 'poster');
    
                _posterDiv.appendChild(_img);
                _a.appendChild(_posterDiv);
            }


            let _wordsDiv = document.createElement('div');
            _wordsDiv.setAttribute('class', 'words');

            // 添加标题
            let _titleDiv = document.createElement('div');
            _titleDiv.innerHTML = title;
            _titleDiv.setAttribute('class', 'title');
            _wordsDiv.appendChild(_titleDiv);

            // 添加文本描述
            let _descDiv = document.createElement('div');
            _descDiv.innerHTML = desc;
            _descDiv.setAttribute('class', 'description');
            _wordsDiv.appendChild(_descDiv);

            // 添加时间和分类
            let _footFlagDiv = document.createElement('div');
            _footFlagDiv.setAttribute('class', 'footFlag');

            let _timeAndCategoryDiv = document.createElement('div');
            _timeAndCategoryDiv.innerHTML = pubDate + ' . ' + channelName;
            _timeAndCategoryDiv.setAttribute('class', 'timeAndCategory');
            _footFlagDiv.appendChild(_timeAndCategoryDiv);

            let _read = document.createElement('div');
            _read.setAttribute('class', 'readBtn');
            _read.innerHTML = '阅读本文';
            _footFlagDiv.appendChild(_read);

            _wordsDiv.appendChild(_footFlagDiv);

            _a.appendChild(_wordsDiv);

            // 添加 a 标签
            _newsList.appendChild(_a);
        });

    })
}


window.addEventListener('DOMContentLoaded', function() {
    getNewsByKeyWord();
    getNowCityNews();
});

// 搜索的时候按关键字搜索
var _seachBtn = document.getElementsByClassName('searchBtn')[0];
_seachBtn.addEventListener('click', getNewsByKeyWord2);

// 附近榜 根据当前城市查所在新闻
function getNowCityNews() {
    let city = sessionStorage.getItem('myCity');
    if(!city) {
        // 没有城市就显示错误信息
        // 插入当前标题
        let _nearList = document.getElementsByClassName('nearList');

        let _nearItem = document.createElement('div');
        _nearItem.setAttribute('class', 'nearItem');
        _nearItem.innerHTML = '当前定位错误o(╥﹏╥)o请在主页重新获取IP地址后再试'; 

        _nearList.appendChild(_nearItem);
    }else {
        fetch('https://hzy.0xcafebabe.cn/news/?keyword=' + city)
            .then(response => response.json())
            .then(data => {
                data.forEach(function(item, index) {
                    let title = item.title.length > 10 ? item.title.slice(0, 10) + "..." : item.title;
                    let link = item.link;

                    // 插入当前标题
                    let _nearList = document.getElementsByClassName('nearList')[0];
                    
                    let _nearItem = document.createElement('a');
                    _nearItem.setAttribute('class', 'nearItem');
                    _nearItem.setAttribute('href', link);
                    
                    let num = index + 1;
                    _nearItem.innerHTML = '【' + num + '】' + title; 

                    _nearList.appendChild(_nearItem);
                })
            })
    }
}


function getNewsByKeyWord2(){
    let _keyword = document.getElementsByClassName('seachInput')[0].value;
    if(!_keyword) {
        _keyword = '';
    }
    console.log('发起请求的关键词是' + _keyword);


    // 每次发起请求前，先把有的元素删除
    let _eachNews = document.getElementsByClassName('each-news');
    if(_eachNews) {
        let _newsList = document.getElementsByClassName('newsList')[0];
        // console.log(document.getElementsByClassName('newsList'));
        // console.log(_newsList);
        _newsList.innerHTML = "";
    }

    console.log('_keyword是' + _keyword); 
    fetch('https://hzy.0xcafebabe.cn/news/?keyword=' + _keyword)
    .then(response => response.json())
    .then(data => {
        console.dir(data)
        data.forEach(function(item,index) {
            let link = item.link;
            let pubDate = item.pubDate.split(" ")[0];
            let image = item.img;
            // console.log('image', image);
            let title = item.title;
            let channelName = item.channelName;
            let desc = '当前文字暂时没有描述o(╥﹏╥)o请点击获取更多资讯~';
            if(item.desc) {
                desc = item.desc.length > 57 ? item.desc.slice(0, 57) + "..." : item.desc;
            }

            // 插入链接
            let _newsList = document.getElementsByClassName('newsList')[0];
            
            let _a = document.createElement('a');
            _a.setAttribute('href', link);
            _a.setAttribute('class', "each-news");

            // 添加图片
            if(image) {
                //有图片才加
                let _posterDiv = document.createElement('div');
                _posterDiv.setAttribute('class', 'posterContainer');
                let _img = document.createElement('img');
                _img.setAttribute('src', image);
                _img.setAttribute('class', 'poster');
    
                _posterDiv.appendChild(_img);
                _a.appendChild(_posterDiv);
            }


            let _wordsDiv = document.createElement('div');
            _wordsDiv.setAttribute('class', 'words');

            // 添加标题
            let _titleDiv = document.createElement('div');
            _titleDiv.innerHTML = title;
            _titleDiv.setAttribute('class', 'title');
            _wordsDiv.appendChild(_titleDiv);

            // 添加文本描述
            let _descDiv = document.createElement('div');
            _descDiv.innerHTML = desc;
            _descDiv.setAttribute('class', 'description');
            _wordsDiv.appendChild(_descDiv);

            // 添加时间和分类
            let _footFlagDiv = document.createElement('div');
            _footFlagDiv.setAttribute('class', 'footFlag');

            let _timeAndCategoryDiv = document.createElement('div');
            _timeAndCategoryDiv.innerHTML = pubDate + ' . ' + channelName;
            _timeAndCategoryDiv.setAttribute('class', 'timeAndCategory');
            _footFlagDiv.appendChild(_timeAndCategoryDiv);

            let _read = document.createElement('div');
            _read.setAttribute('class', 'readBtn');
            _read.innerHTML = '阅读本文';
            _footFlagDiv.appendChild(_read);

            _wordsDiv.appendChild(_footFlagDiv);

            _a.appendChild(_wordsDiv);

            // 添加 a 标签
            _newsList.appendChild(_a);
        });

    })
}