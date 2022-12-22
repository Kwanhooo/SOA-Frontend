// window.document.onreadystatechange = function () {
//     if (document.readyState === "complete") {
//         initSettings();
//         setTimeout(() => {
//             renderSettings();
//         }, 1000)
//     }
// }

// let phone = '14750653386'; // 固定手机号 以后可以修改
let emailTitle = 'PowerLife服务订阅'; // 邮箱标题
let destination = '1336766559@qq.com';

function sendInfo(info) {
    fetch('http://www.csu-hzy.xyz:7504/email/?subject=' + emailTitle + '&text= ' + info + '&to=' + destination, {
        method: 'post'
    })
}

function initSettings() {
    if (localStorage.getItem("weatherSubscription") === "true") {
        document.getElementById("weatherSubscription").setAttribute("checked", "checked");
    } else {
        localStorage.setItem("weatherSubscription", "false");
        document.getElementById("weatherSubscription").removeAttribute("checked");
    }

    if (localStorage.getItem("musicSubscription") === "true") {
        document.getElementById("musicSubscription").setAttribute("checked", "checked");
    } else {
        localStorage.setItem("musicSubscription", "false");
        document.getElementById("musicSubscription").removeAttribute("checked");
    }

    if (localStorage.getItem("newsSubscription") === "true") {
        document.getElementById("newsSubscription").setAttribute("checked", "checked");
    } else {
        localStorage.setItem("newsSubscription", "false");
        document.getElementById("newsSubscription").removeAttribute("checked");
    }

    if (localStorage.getItem("autoLocation") === "true") {
        document.getElementById("autoLocation").setAttribute("checked", "checked");
    } else {
        localStorage.setItem("autoLocation", "false");
        document.getElementById("autoLocation").removeAttribute("checked");
    }
}

function renderSettings() {
    // console.log(document.getElementById("weatherSubscription"))
    if (localStorage.getItem("weatherSubscription") === "true") {
        document.getElementById("weatherSubscription").setAttribute("checked", "checked");
    } else {
        document.getElementById("weatherSubscription").removeAttribute("checked");
    }

    if (localStorage.getItem("musicSubscription") === "true") {
        document.getElementById("musicSubscription").setAttribute("checked", "checked");
    } else {
        document.getElementById("musicSubscription").removeAttribute("checked");
    }

    if (localStorage.getItem("newsSubscription") === "true") {
        document.getElementById("newsSubscription").setAttribute("checked", "checked");
    } else {
        document.getElementById("newsSubscription").removeAttribute("checked");
    }

    if (localStorage.getItem("autoLocation") === "true") {
        document.getElementById("autoLocation").setAttribute("checked", "checked");
    } else {
        document.getElementById("autoLocation").removeAttribute("checked");
    }

    if (localStorage.getItem("autoLocation") === "false") {
        document.getElementById("geo").removeAttribute("disabled");
        document.getElementById("geo").classList.remove('forbidden');
        document.getElementById("geo").value = localStorage.getItem("geo");
    } else {
        document.getElementById("geo").value = localStorage.getItem("geo");
        document.getElementById("geo").classList.add('forbidden');
        document.getElementById("geo").setAttribute("disabled", "disabled");
    }
}

function toggleWeather() {
    console.log("toggleWeather")
    if (localStorage.getItem("weatherSubscription") === "true") {
        localStorage.setItem("weatherSubscription", "false");
        renderSettings();
    } else {
        localStorage.setItem("weatherSubscription", "true");
        renderSettings();
        sendSubscriptionInfo('天气推送');
    }
}

function toggleAutoLocation() {
    console.log("autoLocation")
    if (localStorage.getItem("autoLocation") === "true") {
        localStorage.setItem("autoLocation", "false");
        renderSettings();
    } else {
        localStorage.setItem("autoLocation", "true");
        renderSettings();
    }
}

function onLocationChange() {
    console.log("onLocationChange")
    localStorage.setItem("geo", document.getElementById("geo").value);
}

function toggleMusic() {
    console.log("toggleMusic")
    if (localStorage.getItem("musicSubscription") === "true") {
        localStorage.setItem("musicSubscription", "false");
        renderSettings();
    } else {
        localStorage.setItem("musicSubscription", "true");
        renderSettings();
        sendSubscriptionInfo('音乐推送');
    }
}

function toggleNews() {
    console.log("toggleNews")
    if (localStorage.getItem("newsSubscription") === "true") {
        localStorage.setItem("newsSubscription", "false");
        renderSettings();
    } else {
        localStorage.setItem("newsSubscription", "true");
        renderSettings();
        sendSubscriptionInfo('新闻推送');
    }
}

function sendSubscriptionInfo(subscriptionType) {
    // 发送初次使用的感谢短信 永远不删
    let haveBuy = localStorage.getItem('haveBuy');
    if (haveBuy == null) {
        sendInfo('感谢您的初次消费！我们会努力做得更好，竭诚为您服务。')
        localStorage.setItem('haveBuy', 'true');
    }

    // 根据subscriptionType发送感谢开通的短信 
    sendInfo('感谢您开通' + subscriptionType + '服务一个月，即日起生效，逾期将自动停止服务，请知晓。');
}

function sendInfoEveryDay() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let time = year + '年' + month + '月' + day + '日';

    let saveTime = localStorage.getItem('saveTime');
    // console.log('time = ' + time + ', saveTime = ' + saveTime);

    // 逻辑判断为 只要你有一次订阅 我就加这个saveTime 字段
    // 避免同一天重复刷新
    let musicInfo = localStorage.getItem('musicInfo');
    let newsInfo = localStorage.getItem('newsInfo');
    let weatherInfo = localStorage.getItem('weatherInfo');
    // 发消息 每天只发一次
    if (localStorage.getItem('haveBuy') === 'true' && saveTime != time) {
        //  发送三条消息
        if (localStorage.getItem('musicSubscription') === 'true') {
            setTimeout(function() {
                let dataShow = JSON.parse(localStorage.getItem('recommendMusic'));
                let musicInfo = '今日为您推荐的歌曲有：' + dataShow[0].name + '-' + dataShow[0].ar[0].name 
                    + '、' + dataShow[1].name + '-' + dataShow[1].ar[0].name
                    + '、' + dataShow[2].name + '-' + dataShow[2].ar[0].name
                    + '等6首歌曲，欢迎您到本网站欣赏。';

                sendInfo(musicInfo);
                // 显示在消息页面
                localStorage.setItem('musicInfo', musicInfo);
                showMessageInNotificationCenter(musicInfo, 'musicSubscription');
            }, 3000);
        }

        if (localStorage.getItem('newsSubscription') === 'true') {
            setTimeout(function() {
                let newsInfo = '今日为您推荐的新闻是：贺州四年级学生高热惊厥离世，惊厥是否与新冠相关？专家解答。详情请点击：https://new.qq.com/rain/a/20221220A08M5L00';
                sendInfo(newsInfo);
    
                // 显示在消息页面
                localStorage.setItem('newsInfo', '今日为您推荐的新闻是：贺州四年级学生高热惊厥离世，惊厥是否与新冠相关？专家解答。详情请点击：<a href="https://new.qq.com/rain/a/20221220A08M5L00">https://new.qq.com/rain/a/20221220A08M5L00</a>');
                showMessageInNotificationCenter('今日为您推荐的新闻是：贺州四年级学生高热惊厥离世，惊厥是否与新冠相关？专家解答。详情请点击：<a href="https://new.qq.com/rain/a/20221220A08M5L00">https://new.qq.com/rain/a/20221220A08M5L00</a>', 'newsSubscription');
            }, 3000)
        }

        if (localStorage.getItem('weatherSubscription') === 'true') {
            // 就怕前一个获取天气的API还没执行完 加个定时器
            setTimeout(function() {
                let city = document.getElementById('wea_text').innerText;
                let tem = document.getElementById('tem_text').innerText;
                let win = document.getElementById('win_text').innerText;
                let win_speed = document.getElementById('win_speed').innerText;
                // console.log('短信中' + city + ' - ' + tem + '-' + win + '-' + win_speed);
                // sendInfo( '今日' + city + ' ' + tem + ' ' + win + ' ' + win_speed + ' '+ ' 建议穿着轻薄的长袖衬衫或毛衣，加上牛仔裤或长裤，也可以考虑穿着单层的夹克或风衣来保暖。')
                let info = '今日' + city + ' ' + tem + ' ' + win + ' ' + win_speed + '，';
    
                sendWeatherAIAdvice(info, '温度' + win + '摄氏度' + '适合穿什么衣服');
                
            }, 3000);
        }

        localStorage.setItem('saveTime', time);
    }

    // 展示数据 每天第二次访问 不会再次发送短信
    if(musicInfo != null) {
        showMessageInNotificationCenter(musicInfo, 'musicSubscription');
    }
    if(newsInfo != null) {
        showMessageInNotificationCenter(newsInfo, 'newsSubscription');
    }
    if(weatherInfo != null) {
        showMessageInNotificationCenter(weatherInfo, 'weatherSubscription');
    }
}


function sendWeatherAIAdvice(weather, question) {
    // console.log('sendAIAdvice');
    fetch('http://www.csu-hzy.xyz:7504/chat/?str=' + question, {
        method: 'post'
    })
        .then(response => {
            // console.log('response' , response.text())
            return response.text()
        })
        .then(data => {
            let advice = data + '';
            // 将信息发送出去
            sendInfo(weather + advice);

            // 显示在消息页面
            localStorage.setItem('weatherInfo', weather + advice);
            showMessageInNotificationCenter(weather + advice, 'weatherSubscription');
        })
    // return advice;
}

function showMessageInNotificationCenter(info, subscriptionType) {
    let center = document.getElementById('notification-center');

    if (localStorage.getItem(subscriptionType) === 'true') {
        let _notificationItem = document.createElement('div');
        _notificationItem.setAttribute('class', 'notification-item');

        // 添加标题部分
        let _header = document.createElement('div');
        _header.setAttribute('class', 'header')
        
        let _title = document.createElement('div');
        _title.setAttribute('class', 'title');

        let _notificationIconWrapper = document.createElement('div');
        _notificationIconWrapper.setAttribute('class', 'notification-icon-wrapper');

        let _img = document.createElement('img');
        if(subscriptionType == 'weatherSubscription') {
            _img.setAttribute('src', '../../assets/image/weather.jpg'); 
        }else if(subscriptionType == 'newsSubscription') {
            _img.setAttribute('src', '../../assets/image/news.png'); 
        }else {
            _img.setAttribute('src', '../../assets/image/music.png'); 
        }
        _img.setAttribute('class', 'notification-icon-rebuild');
        _notificationIconWrapper.appendChild(_img);
        _title.appendChild(_notificationIconWrapper);
        
        let titleTextRebuild = document.createElement('div');
        titleTextRebuild.setAttribute('class', 'title-text-rebuild');
        if(subscriptionType == 'weatherSubscription') {
            titleTextRebuild.innerHTML = '天气';
        }else if(subscriptionType == 'newsSubscription') {
            titleTextRebuild.innerHTML = '新闻';
        }else {
            titleTextRebuild.innerHTML = '音乐';
        }
        _title.appendChild(titleTextRebuild);
        
        _header.appendChild(_title);

        let closeBtn = document.createElement('div');
        closeBtn.setAttribute('class', 'btn');
        
        let _img2 = document.createElement('img');
        _img2.setAttribute('class', 'icon pointer');
        _img2.setAttribute('src', '../../assets/svgs/close.svg');
        closeBtn.appendChild(_img2);

        _header.appendChild(closeBtn);
        _notificationItem.appendChild(_header);

        // 添加hr
        let _hr = document.createElement('hr');
        _hr.style.width = '100%';
        _notificationItem.appendChild(_hr);

        // 添加内容
        let content = document.createElement('div');
        content.setAttribute('class', 'content');
        content.innerHTML = info;
        _notificationItem.appendChild(content);

        center.appendChild(_notificationItem);
    }
}

// showMessageInNotificationCenter('今日为您推荐的歌曲有： 此生不换-青鸟飞鱼 、바람에 쓰는 편지-July、The Way I Still Love You-Reynard Silva等6首歌曲，欢迎您到本网站欣赏。', 'musicSubscription');
// showMessageInNotificationCenter('今日为您推荐的新闻是：贺州四年级学生高热惊厥离世，惊厥是否与新冠相关？专家解答。详情请点击：https://new.qq.com/rain/a/20221220A08M5L00', 'newsSubscription');
// showMessageInNotificationCenter('2022年12月21日韶关的气温一般都比较暖和，因此穿衣应该以毛衣、棉衣、羽绒服、卫衣为主。可根据天气情况增减。建议穿裤子可以选择牛仔裤、运动裤、休闲裤等。若是要外出游玩，可选择薄外套、防水外套、风衣等来添加上衣。', 'weatherSubscription');


window.addEventListener('load', sendInfoEveryDay);