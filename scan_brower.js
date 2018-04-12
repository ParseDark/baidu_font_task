var client = function(){
        //有bug，ie11并没有检测出来
    var engine = {
        ie: 0,
        gecko: 0,
        webkit: 0,
        khtml: 0,
        opera: 0,
        //具体的版本号
        version: null,
    }
    var browser = {
        ie: 0,
        firefox:0,
        safari: 0,
        kong: 0,
        opera: 0,
        chrome: 0,
        
        version: null,
    }
    var system = {
        win:false,
        mac:false,
        x11:false, 

        iphone: false,
        ipod: false,
        ipad: false,
        ios: false,
        android: false,
        nokiaN: false,
        winMobile: false,

        wii: false,
        ps: false
    }
    //这是你的代码，检测用户的代码
    //做浏览器识别，最重要的就是顺序，顺序不正确，那么结果也不会准确
    //第一位应该检测的是opera浏览器
    //第二位应该检测的是webkit,因为webkit的用户代理字符串中包含Gecko和khtml
    //由此可见，先检测Gecko和khtml会导致一些错误
    //而appleWebkit是独一无二的
    //接下来我们需要检测的呈现引擎是Khtml
    var engine_str = navigator.userAgent;
    if (window.opera) {//判断是否是opera
        engine.version = browser.version = window.opera.version;
        engine.opera = browser.opera = parseFloat(engine.version);
    }else if(/AppleWebKit\/(\S+)/.test(engine_str)){
        engine.version = RegExp["$1"];
        engine.webkit = parseFloat(engine.version);

        //判断是Chrome 还是 safari
        if(/Chrome\/(\S+)/.test(engine_str)){
            browser.version = RegExp["$1"];
            browser.chrome = parseFloat(engine.version);
        }else if(/version\/(\S+)/.test(engine_str)){
            browser.version = RegExp["$1"];
            browser.safari = parseFloat(engine.version);
        }else{
            var safariVersion = 1;
            if(engine.webkit < 100){
                safariVersion = 1;
            }else if(engine.webkit < 312){
                safariVersion = 1.2;
            }else if(engine.webkit < 412){
                safariVersion = 1.3;
            }else {
                safariVersion = 2;
            }
            browser.safari = safariVersion;
        }
    } else if (/KHTML\/(\S+)/.test(engine_str) || /Konqueror\/([^;]+)/.test(engine_str)){
        //KHTML引擎的浏览器同时包含Geock，所以在排除KHTML之前无法判定Geock
        //而Konqueror在3.1版本之前不包含KHTML版本，所以使用了Konqueror代替
        //所以如果找不到KHTML那么我们将用Konqueror代替
        engine.version = browser.version = RegExp["$1"];
        engine.khtml = browser.khtml = parseFloat(engine.version);
    } else if(/rv:([^\)] + )\) Gecko\/\d{8}/.test(engine_str)){
        engine.version = RegExp["$1"];
        engine.khtml = parseFloat(engine.version);
        //确定是否为firefox
        if(/Firefox\/(\S+)/.test(engine_str)){
            browser.version = RegExp["$1"];
            browser.firefox = parseFloat(engine.version);
        }
    }else if(/MSIE([^;]+)/.test(engine_str)){
        engine.version = browser.version = RegExp["$1"];
        engine.ie = browser.ie = parseFloat(engine.version);
    }
    //判断用户所使用的系统
    var platForm = navigator.platform;
    system.win = platForm.indexOf("Win") == 0;
    system.mac = platForm.indexOf("mac") == 0;
    system.x11 = (platForm.indexOf("X11") == 0) || (platForm.indexOf("Linux") == 0);

    system.iphone = engine_str.indexOf("iphone") > -1;
    system.ipad = engine_str.indexOf("ipad") > -1;
    system.ipod = engine_str.indexOf("ipod") > -1;
    system.nokiaN = engine_str.indexOf("NokiaN") > -1;

    system.wii = engine_str.indexOf("wii") > -1;
    system.ps = engine_str.indexOf("ps") > -1;
    //检测IOS版本
    if(system.mac && engine_str.indexOf("Mobile" > -1)){
        if(/CPU (?:iPhone )?OS (\d + _\d +)/.test(engine_str)){
            system.ios = parseFloat(RegExp.$1.replace("_","."));
        }else {
            system.ios = 2;//只是猜测
        }
    }
    //检测andrioid版本
    if(/Android(\d+\.\d)/.test(engine_str)){
        system.android = parseFloat(RegExp.$1);
    }

    return {
        engine: engine,
        browser: browser,
        system: system
    }
}();


