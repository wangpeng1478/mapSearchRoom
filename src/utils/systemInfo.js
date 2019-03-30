import MobileDetect from 'mobile-detect';
const systempInfo = () => {
    let u = navigator.userAgent;
    let md = new MobileDetect(u);
    let osInfo = md.os(),
        os = 4,
        networkType = navigator.connection.effectiveType,
        model = md.mobile(),
        osVersion = '1.0';
    if (osInfo == "iOS") {
        os = 2
    } else if (osInfo == "AndroidOS") {
        os = 1
    }

    if (os == 1) {
        osVersion = u.split(';')[1].match(/\d+\.\d+/g)[0]
    }
    if (os == 2) {
        osVersion = u.split(';')[1].match(/(\d+)_(\d+)_?(\d+)?/)[0];
    }

    return {
        os,
        networkType,
        osVersion,
        model
    }
}

export default systempInfo;