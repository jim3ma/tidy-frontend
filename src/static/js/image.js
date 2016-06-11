/**
 * Created by jimmar on 6/10/16.
 */

// 用于压缩图片的canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext('2d');

// 瓦片canvas
var tCanvas = document.createElement("canvas");
var tctx = tCanvas.getContext("2d");

function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

function compress(img) {
    var initSize = img.src.length;
    var width = img.width;
    var height = img.height;

    //如果图片大于100万像素，计算压缩比并将大小压至100万以下
    var ratio;
    if ((ratio = width * height / 1000000)>1) {
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
    }else {
        ratio = 1;
    }

    canvas.width = width;
    canvas.height = height;

    // 铺底色
    //ctx.fillStyle = "#fff";
    //ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 如果图片像素大于100万则使用瓦片绘制
    var count;
    if ((count = width * height / 1000000) > 1) {
        //计算要分成多少块瓦片
        count = ~~(Math.sqrt(count)+1);
        
        // 计算每块瓦片的宽和高
        var nw = ~~(width / count);
        var nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (var i = 0; i < count; i++) {
            for (var j = 0; j < count; j++) {
                tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
            }
        }
    } else {
        ctx.drawImage(img, 0, 0, width, height);
    }

    //进行压缩
    var dataurl = canvas.toDataURL('image/png', 1);
    console.log('压缩前：' + initSize);
    console.log('压缩后：' + dataurl.length);
    console.log('压缩率：' + ~~(100 * (initSize - dataurl.length) / initSize) + "%");
    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
    return dataurl;
}