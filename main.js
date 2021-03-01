// 初始化数据
var param = init(), keys = param.keys, hash = param.hash;

// 生成键盘
generateKeyboard(keys, hash);

// 监听用户键盘输入
linsenerUserInput();

/*********************************************************************/

function linsenerUserInput() {
    document.onkeypress = function (ev) {
        var key = ev.key.toUpperCase(),
            website = hash[key];

        window.open( 'http://' + website);
    }
}

function generateKeyboard(keys, hash) {
    var div = null, kbd = null, row = null, span = null, btn = null, img = null;

    for (var index = 0; index < keys['length']; index = index + 1) {
        div = createDiv();

        row = keys[index];

        for (var index2 = 0; index2 < row.length; index2 = index2 + 1) {
            span = createSpan({
                textContent: row[index2],
                className: 'text'
            });

            btn = createButton(row[index2]);

            img = createIcon(hash[btn.id]);

            kbd = createTag('kbd');
            kbd.className = 'key';

            kbd.appendChild(img);
            kbd.appendChild(btn);
            kbd.appendChild(span);

            div.appendChild(kbd);
        }
        main.appendChild(div);
    }

}

function init() {
    var keys = {
        0: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        1: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        2: ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
        length: 3
    }

    var local = localStorage.getItem('zzz');
    var hash = {
        'A': 'angular.cn',
        'B': 'www.bilibili.com',
        'C': 'www.csdn.net',
        'D': '',
        'E': 'es6.ruanyifeng.com',
        'F': '',
        'G': 'gitee.com',
        'H': 'www.highcharts.com.cn',
        'I': '',
        'J': 'juejin.cn',
        'K': '',
        'L': 'lodash.com',
        'M': 'mockjs.com',
        'N': 'nodejs.cn',
        'O': '',
        'P': 'parceljs.org',
        'Q': '',
        'R': 'reactjs.bootcss.com',
        'S': 'www.sass.hk',
        'T': 'www.tslang.cn',
        'U': '',
        'V': 'cn.vuejs.org',
        'W': 'www.webpackjs.com',
        'X': '',
        'Y': 'yarn.bootcss.com',
        'Z': 'www.zhihu.com'
    }
    if (local) {
        hash = JSON.parse(local);
    }

    return {
        keys: keys,
        hash: hash
    }
}

// 创建dom
function createTag(tagName) {
    var tag = document.createElement(tagName);
    return tag;
}

function createDiv() {
    var div = createTag('div');
    div.className = 'row';
    return div;
}

function createSpan(attrs) {
    var span = createTag('span');

    for (var key in attrs) {
        span[key] = attrs[key];
    }

    return span;
}

function createButton(id) {
    var btn = createTag('button');
    btn.textContent = '编辑';
    btn.onclick = btnClick;
    btn.id = id;
    return btn;
}

function createImg(attrs) {
    var img = createTag('img');
    for (var key in attrs) {
        img[key] = attrs[key];
    }
    return img;
}

function createIcon(domain) {
    var icon = null;
    var w = domain;

    if (w) {
        icon = createImg({
            src: 'http://' + w + '/favicon.ico',
            onerror: imgOnerror
        });
    } else {
        icon = createSpan({
            textContent: '-'
        });
    }
    icon.className = 'img';

    return icon;
}

function getParentNode() {
    var parent = this.parentNode;
    return parent;
}

function btnClick(ev) {
    var target = ev.target;

    var result = prompt('请输入网址');

    if (result) {
        var key = target.id;
        hash[key] = result;
        localStorage.setItem('zzz', JSON.stringify(hash));

        var parent = getParentNode.call(target);

        var el = parent.getElementsByClassName('img')[0];
        var tag = el.tagName.toLowerCase();

        if (tag == 'span') {
            parent.removeChild(el);

            el = createImg({
                className: 'img'
            });

            parent.appendChild(el);
        }
        el.src = 'http://' + result + '/favicon.ico';
        el.onerror = imgOnerror;
    }
}

function imgOnerror(ev) {
    var parent = ev.target.parentNode;
    parent.removeChild(ev.target);

    var span = createSpan({
        className: 'img'
    });

    parent.appendChild(span);
}
