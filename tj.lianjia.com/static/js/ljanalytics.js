//google
(function(i, s, o, g, r, a, m) {

    function lazyloadJs(fn) {
        var hasFired = false;
        var wrapFn = function(callbackfn) {
            return function() {
                setTimeout(function() {
                    if(hasFired) {

                    } else {
                        callbackfn();
                        hasFired = true;
                    }
                }, 1e3);
            };
        };

        var cb = wrapFn(fn);

        if (window.attachEvent) {
            window.attachEvent("onload", cb);
        } else if (window.addEventListener) {
            window.addEventListener("load", cb, false);
        }

        setTimeout(function() {
            cb();
        }, 1e4);
    }

    var loadJs = function(node, callback) {
        var doc                = document;
        var readyState         = "readyState";
        var onreadystatechange = "onreadystatechange";
        var loaded;
        var timer;

        function getString() {
            return (window.ga && ga.toString()) || '';
        }

        var originStr = getString();

        var _time = +new Date;


        node.onload = node[onreadystatechange] = function() {
            if (loaded || (node[readyState] && !(/^c|loade/.test(node[readyState])))) return;

            node.onload = node.onerror = node[onreadystatechange] = null;
            loaded = 1;

            timer && clearTimeout(timer);

            if(originStr === getString()) {
                callback && callback('error', 80000);
            } else {
                callback && callback('success', +new Date - _time);
            }

        };
        node.onerror = function() {

            node.onload = node.onerror = node[onreadystatechange] = null;
            loaded = 1;

            timer && clearTimeout(timer);
            callback && callback('error', 80000);
        };

        timer = setTimeout(function() {

            node.onload = node.onerror = node[onreadystatechange] = null;
            loaded = 1;

            callback && callback('timeout', 8000);
        }, 8e3);

    };

    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] ||
        function() {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
    a = s.createElement(o), m = s.getElementsByTagName(o)[0];


    lazyloadJs(function() {
        loadJs(a, function(typ, tim) {
            window.console && console.log && console.log("ga 加载状态：" + typ + "，加载时间：" + tim + "ms");

            var dataMap = {
                'success': 10079,
                'timeout': 10080,
                'error': 10081
            };

            window.LjUserTrack && LjUserTrack.sendId && LjUserTrack.sendId(dataMap[typ]);

        });

        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m);
    });


})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
switch (window.location.hostname) {
    case "www.lianjia.com":
        ga('create', 'UA-55936351-1', 'auto');
        ga('send', 'pageview');
        ga('create', 'UA-64253156-1', 'auto', {
            'name' : 'past'
        });
        ga('past.send', 'pageview');
        break;
    case "bj.lianjia.com":
        ga('create', 'UA-55871340-1', 'auto');
        ga('send', 'pageview');
        ga('create', 'UA-64257554-1', 'auto', {
            'name' : 'past'
        });
        ga('past.send', 'pageview');
        break;
    case 'tj.lianjia.com':
        ga('create', 'UA-55875231-1', 'auto');
        ga('send', 'pageview');
        ga('create', 'UA-64257943-1', 'auto', {
            'name' : 'past'
        });
        ga('past.send', 'pageview');
        break;
    case 'nj.lianjia.com':
        ga('create', 'UA-55873426-1', 'auto');
        ga('send', 'pageview');
        ga('create', 'UA-64253751-1', 'auto', {
            'name' : 'past'
        });
        ga('past.send', 'pageview');
        break;
    case 'dl.lianjia.com':
        ga('create', 'UA-55870447-1', 'auto');
        ga('send', 'pageview');
        ga('create', 'UA-64247539-1', 'auto', {
            'name' : 'past'
        });
        ga('past.send', 'pageview');
        break;
    case 'cd.lianjia.com':
        ga('create', 'UA-55870653-1', 'auto');
        ga('send', 'pageview');
        ga('create', 'UA-64268152-1', 'auto', {
            'name' : 'past'
        });
        ga('past.send', 'pageview');
        break;
    case 'qd.lianjia.com':
        ga('create', 'UA-55872336-1', 'auto');
        ga('create', 'UA-64261868-1', 'auto', {
            'name' : 'past'
        });
        ga('send', 'pageview');
        ga('past.send', 'pageview');
        break;
    case 'hz.lianjia.com':
        ga('create', 'UA-55872128-1', 'auto');
        ga('create', 'UA-64269651-1', 'auto', {
            'name' : 'past'
        });
        ga('send', 'pageview');
        ga('past.send', 'pageview');
        break;
    case 'sh.lianjia.com':
        ga('create', 'UA-55872133-1', 'auto');
        ga('send', 'pageview');
        ga('create', 'UA-64248152-1', 'auto', {
            'name' : 'past'
        });
        ga('past.send', 'pageview');
        break;
    case 'su.lianjia.com':
        ga('create', 'UA-60600448-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'xm.lianjia.com':
        ga('create', 'UA-65428058-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'sz.lianjia.com':
        ga('create', 'UA-66812100-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'xa.lianjia.com':
        ga('create', 'UA-66848023-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'cq.lianjia.com':
        ga('create', 'UA-66832431-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'wh.lianjia.com':
        ga('create', 'UA-66856830-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'cs.lianjia.com':
        ga('create', 'UA-66847639-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'dg.lianjia.com':
        ga('create', 'UA-82228321-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'fang.lianjia.com':
        ga('create', 'UA-66842144-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'bj.fang.lianjia.com':
        ga('create', 'UA-66849657-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'sh.fang.lianjia.com':
        ga('create', 'UA-66853440-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'sz.fang.lianjia.com':
        ga('create', 'UA-66847941-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'cd.fang.lianjia.com':
        ga('create', 'UA-66833338-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'tj.fang.lianjia.com':
        ga('create', 'UA-66833962-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'nj.fang.lianjia.com':
        ga('create', 'UA-66829759-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'dl.fang.lianjia.com':
        ga('create', 'UA-66834157-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'qd.fang.lianjia.com':
        ga('create', 'UA-66847673-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'hz.fang.lianjia.com':
        ga('create', 'UA-66830161-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'su.fang.lianjia.com':
        ga('create', 'UA-66834360-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'xm.fang.lianjia.com':
        ga('create', 'UA-66842359-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'cs.fang.lianjia.com':
        ga('create', 'UA-66848242-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'wh.fang.lianjia.com':
        ga('create', 'UA-66837255-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'cq.fang.lianjia.com':
        ga('create', 'UA-66854882-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'xa.fang.lianjia.com':
        ga('create', 'UA-66848778-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'us.lianjia.com':
        ga('create', 'UA-79166897-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'ja.lianjia.com':
        ga('create', 'UA-92537319-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'nz.lianjia.com':
        ga('create', 'UA-92411727-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'uk.lianjia.com':
        ga('create', 'UA-92511836-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'au.lianjia.com':
        ga('create', 'UA-92532534-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'ca.lianjia.com':
        ga('create', 'UA-92559102-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'fr.lianjia.com':
        ga('create', 'UA-92547422-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'ger.lianjia.com':
        ga('create', 'UA-92523017-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'sg.lianjia.com':
        ga('create', 'UA-92539822-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'kr.lianjia.com':
        ga('create', 'UA-92549433-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'm.lianjia.com':
        ga('create', 'UA-55871942-1', 'auto');
        ga('create', 'UA-34859395-1', 'auto', {
            'name' : 'past'
        });
        ga('create', 'UA-61982569-1', 'auto', {
            'name' : 'new'
        });
        ga('send', 'pageview');
        ga('past.send', 'pageview');
        ga('new.send', 'pageview');
        break;
    case 'agent.lianjia.com':
        ga('create', 'UA-60860114-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'login.lianjia.com':
        ga('create', 'UA-60863507-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'cms.lianjia.com':
        ga('create', 'UA-60839596-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'user.lianjia.com':
        ga('create', 'UA-64593984-1', 'auto');
        ga('send', 'pageview');
        break;
     case 'gz.lianjia.com':
        ga('create', 'UA-75271495-1', 'auto');
        ga('send', 'pageview');
        break;
     case 'jn.lianjia.com':
        ga('create', 'UA-75308015-1', 'auto');
        ga('send', 'pageview');
        break;
     case 'sjz.lianjia.com':
        ga('create', 'UA-75270183-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'fs.lianjia.com':
        ga('create', 'UA-80346942-1', 'auto');
        ga('send', 'pageview');
        break;

    case 'yt.lianjia.com':
        ga('create', 'UA-86668246-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'research.lianjia.com':
        ga('create', 'UA-89500309-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'zs.lianjia.com':
        ga('create', 'UA-90305398-1', 'auto');
        ga('send', 'pageview');
        break;
    case 'zh.lianjia.com':
        ga('create', 'UA-90447824-1', 'auto');
        ga('send', 'pageview');
        break;
}
ga('create', 'UA-55876525-1', 'auto', {
    'name' : 'global'
});
ga('global.send', 'pageview');
ga('create', 'UA-60608360-1', 'auto', {
    'name' : 'new_global'
});
ga('new_global.send', 'pageview');
ga('create', 'UA-64639325-1', 'auto', {
    'name' : 'dianpu_agent'});
ga('dianpu_agent.send', 'pageview');
$(document).on('click','[data-dianji]',function(){ga('send','event',$(this).data('dianji'),'click','inside_referral',1);});


    //CNZZ STAT
    (function() {

        function getId(hostStr) {
            var id = 0;

            var idsMap = {
                "news.bj.lianjia.com": 1259633087,
                "news.tj.lianjia.com": 1259668296,
                "news.nj.lianjia.com": 1259668368,
                "news.qd.lianjia.com": 1259668413,
                "news.dl.lianjia.com": 1259668669,
                "news.sz.lianjia.com": 1259668679,
                "news.cd.lianjia.com": 1259668683,
                "news.cq.lianjia.com": 1259668714,
                "news.jn.lianjia.com": 1259668731,
                "news.gz.lianjia.com": 1259668753,
                "news.hz.lianjia.com": 1259668755,
                "news.sjz.lianjia.com": 1259668764,
                "news.xa.lianjia.com": 1259668767,
                "news.wh.lianjia.com": 1259668787,
                "news.cs.lianjia.com": 1259668790,
                "news.xm.lianjia.com": 1259668795,

                "guide.bj.lianjia.com": 1259668801,
                "guide.tj.lianjia.com": 1259668809,
                "guide.nj.lianjia.com": 1259668814,
                "guide.qd.lianjia.com": 1259668819,
                "guide.dl.lianjia.com": 1259668829,
                "guide.sz.lianjia.com": 1259668851,
                "guide.cd.lianjia.com": 1259668879,
                "guide.cq.lianjia.com": 1259668898,
                "guide.jn.lianjia.com": 1259668925,
                "guide.gz.lianjia.com": 1259668953,
                "guide.hz.lianjia.com": 1259668969,
                "guide.sjz.lianjia.com": 1259669013,
                "guide.xa.lianjia.com": 1259669059,
                "guide.wh.lianjia.com": 1259669088,
                "guide.cs.lianjia.com": 1259669129,
                "guide.xm.lianjia.com": 1259669132
            };

            for(var i in idsMap) {
                if(idsMap.hasOwnProperty(i)) {
                    if(i == hostStr) {
                        id = idsMap[i];
                        break;
                    }
                }
            }



            return id;
        }
            var id=0;
            switch (window.location.hostname) {
                case "www.lianjia.com":
                    id=1253477541;
                    break;
                case "bj.lianjia.com":
                    id=1253477573;
                    break;
                case "news.bj.lianjia.com":
                    id=1259633087;
                    break;
                case "nj.lianjia.com":
                    id=1253492138;
                    break;
                case "tj.lianjia.com":
                    id=1253477585;
                    break;
                case "cd.lianjia.com":
                    id=1253492306;
                    break;
                case "dl.lianjia.com":
                    id=1253492418;
                    break;
                case "qd.lianjia.com":
                    id=1253492431;
                    break;
                case "hz.lianjia.com":
                    id=1253492436;
                    break;
                case "sh.lianjia.com":
                    id=1253492439;
                    break;
                case "su.lianjia.com":
                    id=1254525908;
                    break;
                case "m.lianjia.com":
                    id=1253491255;
                    break;
                case "agent.lianjia.com":
                    id=1254574589;
                    break;
                case "login.lianjia.com":
                    id=1254574635;
                    break;
                case "cms.lianjia.com":
                    id=1254574663;
                    break;
                case "user.lianjia.com":
                    id=1255606315;
                    break;
                case "xm.lianjia.com":
                    id=1255847100;
                    break;
                case "sz.lianjia.com":
                    id=1255849469;
                    break;
                case "wh.lianjia.com":
                    id=1255849575;
                    break;
                case "xa.lianjia.com":
                    id=1255849580;
                    break;
                case "cq.lianjia.com":
                    id=1255849584;
                    break;
                case "cs.lianjia.com":
                    id=1255849590;
                    break;
                case "gz.lianjia.com":
                    id=1255849599;
                    break;
                case "nc.lianjia.com":
                    id=1255849602;
                    break;
                case "wx.lianjia.com":
                    id=1255849628;
                    break;
                case "sy.lianjia.com":
                    id=1255849613;
                    break;
                case "fz.lianjia.com":
                    id=1255849622;
                    break;
                case "sjz.lianjia.com":
                    id=1255849629;
                    break;
                case "zz.lianjia.com":
                    id=1255849631;
                    break;
                case "hrb.lianjia.com":
                    id=1255849634;
                    break;
                case "nb.lianjia.com":
                    id=1255849638;
                    break;
                case "jn.lianjia.com":
                    id=1255849654;
                    break;
                case "ty.lianjia.com":
                    id=1255849660;
                    break;
                case "fang.lianjia.com":
                    id=1256144437;
                    break;
                case "bj.fang.lianjia.com":
                    id=1256144455;
                    break;
                case "sh.fang.lianjia.com":
                    id=1256144506;
                    break;
                case "tj.fang.lianjia.com":
                    id=1256144531;
                    break;
                case "nj.fang.lianjia.com":
                    id=1256144568;
                    break;
                case "cd.fang.lianjia.com":
                    id=1256144579;
                    break;
                case "sz.fang.lianjia.com":
                    id=1256189346;
                    break;
                case "dl.fang.lianjia.com":
                    id=1256189370;
                    break;
                case "qd.fang.lianjia.com":
                    id=1256189385;
                    break;
                case "hz.fang.lianjia.com":
                    id=1256189456;
                    break;
                case "cs.fang.lianjia.com":
                    id=1256189477;
                    break;
                case "xa.fang.lianjia.com":
                    id=1256189488;
                    break;
                case "cq.fang.lianjia.com":
                    id=1256189500;
                    break;
                case "su.fang.lianjia.com":
                    id=1256189521;
                    break;
                case "xm.fang.lianjia.com":
                    id=1256189542;
                    break;
                case "wh.fang.lianjia.com":
                    id=1256296306;
                    break;
                case "fs.fang.lianjia.com":
                    id=1259272651;
                    break;
                case "dg.fang.lianjia.com":
                    id=1259317044;
                    break;
                case "gz.fang.lianjia.com":
                    id=1259317647;
                    break;
                case "hui.fang.lianjia.com":
                    id=1259317812;
                    break;
                case "sy.fang.lianjia.com":
                    id=1259317822;
                    break;
                case "yt.fang.lianjia.com":
                    id=1259317870;
                    break;
                case "zs.fang.lianjia.com":
                    id=1259318357;
                    break;
                case "zh.fang.lianjia.com":
                    id=1259318412;
                    break;
                case "yz.fang.lianjia.com":
                    id=1259318446;
                    break;
                case "nt.fang.lianjia.com":
                    id=1259318479;
                    break;
                case "wf.fang.lianjia.com":
                    id=1259318494;
                    break;
                case "wx.fang.lianjia.com":
                    id=1259318563;
                    break;
                case "wz.fang.lianjia.com":
                    id=1259318613;
                    break;
                case "ts.fang.lianjia.com":
                    id=1259318691;
                    break;
                case "jx.fang.lianjia.com":
                    id=1259318709;
                    break;
                case "ty.fang.lianjia.com":
                    id=1259318742;
                    break;
                case "hk.fang.lianjia.com":
                    id=1259318778;
                    break;
                case "lin.fang.lianjia.com":
                    id=1259318881;
                    break;
                case "xz.fang.lianjia.com":
                    id=1259318896;
                    break;
                case "world.lianjia.com":
                    id=1256189625;
                    break;
                case "us.lianjia.com":
                    id=1256189653;
                    break;
                case "uk.lianjia.com":
                    id=1256189664;
                    break;
                case "au.lianjia.com":
                    id=1256189704;
                    break;
                case "ca.lianjia.com":
                    id=1256189731;
                    break;
                default:
                    id=(getId(window.location.hostname) || id);
            }
            var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
            if (id) {
                document.write(unescape("%3Cspan id='cnzz_stat_icon_" + id + "'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "w.cnzz.com/c.php%3Fid%3D" + id + "' type='text/javascript'%3E%3C/script%3E"));
            }
        }
    )();
var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cspan id='cnzz_stat_icon_1254525948'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "w.cnzz.com/c.php%3Fid%3D1254525948' type='text/javascript'%3E%3C/script%3E"));
var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cspan id='cnzz_stat_icon_1255633284'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "w.cnzz.com/c.php%3Fid%3D1255633284' type='text/javascript'%3E%3C/script%3E"));
var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1255604082'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s95.cnzz.com/z_stat.php%3Fid%3D1255604082' type='text/javascript'%3E%3C/script%3E"));
$(document).on('click','[data-dianji]',function(){_czc.push(['_trackEvent',$(this).data('dianji'),'click','inside_referral',1]);});
//DSP统计
var _mvq = _mvq || [];
_mvq.push(['$setAccount', 'm-173171-0']);
_mvq.push(['$logConversion']);
(function() {
    var mvl = document.createElement('script');
    mvl.type = 'text/javascript'; mvl.async = true;
    mvl.src = ('https:' == document.location.protocol ? 'https://static-ssl.mediav.com/mvl.js' : 'http://static.mediav.com/mvl.js');
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(mvl, s);
})();

// lianjia ulog
(function (hostname) {
    var dateFormater = function (date) {
        var year  = date.getFullYear() + '',
            month = date.getMonth() + 1 + '',
            day   = date.getDate() + '';

        month = ((month.length === 1) ? ('0' + month) : (month));
        day = ((day.length === 1) ? ('0' + day) : (day));

        return (year + month + day);
    };
    var pid = '';
    switch (hostname) {
        case 'user.lianjia.com' :
            pid = 'user';
            break;

        case 'agent.lianjia.com' :
            pid = 'agent';
            break;

        case 'page.lianjia.com' :
            pid = 'page';
            break;

        case 'm.bianque.link.lianjia.com' :
            pid = 'linkappm';
            break;

        default :
            if (hostname.match(/^(us|ca|uk|au|nz|ja|fr|kr|ger|sg)\.lianjia\.com/g) !== null) {
                pid = 'overseas';
            } else if (hostname.match(/^dianpu\.lianjia\.com/g) !== null) {
                pid = 'dianpu';
            } else {
                pid = 'lianjiaweb';
            }
            break;
    }

    if (pid) {
        window.__UDL_CONFIG = window.__UDL_CONFIG || {};
        window.__UDL_CONFIG.pid = window.__UDL_CONFIG.pid || pid;
        window.__UDL_CONFIG.ljweb_channel_key = (window.__STAT_LJ_CONF && __STAT_LJ_CONF.params && __STAT_LJ_CONF.params.ljweb_page) || '';
        window.__UDL_CONFIG.compare_group = (window.compareGroup) || 0;
        window.__UDL_CONFIG.cid = (window.ljConf && window.ljConf['city_id']) || "";
    }

    var ulogScript = document.createElement('script');
    ulogScript.src = '//s1.ljcdn.com/dig-log/static/lianjiaUlog.js?t=' + (dateFormater(new Date()));
    document.getElementsByTagName('head')[0].appendChild(ulogScript);

    if(window.$ && $.ajax && pid) {
        $(document).on('click', '[data-lj_dianji]', function() {
            var ids = ($(this).data('lj_dianji') + '').split(" ");

            for(var inx = 0, len = ids.length; inx < len; inx++) {
                try {
                    $ULOG.send(
                        ids[inx],
                        {
                            "pid": pid,
                            "key": window.location.href
                        }
                    );
                } catch (e) {

                }
            }
        });
    }

})(window.location.hostname);


