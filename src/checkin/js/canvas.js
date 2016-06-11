/**
 * Created by jim on 5/11/16.
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
                tctx.drawImage(img, ~~(i * nw * ratio), ~~(j * nh * ratio), ~~(nw * ratio), ~~(nh * ratio), 0, 0, nw, nh);
                console.log('image position: ' + ~~(i * nw * ratio) + ', ' + ~~(j * nh * ratio) + ', ' + ~~(nw * ratio) + ', ' +  ~~(nh * ratio));
                ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                console.log('canvas position: ' + i * nw + ', ' + j * nh + ', ' + nw, nh);
            }
        }
    } else {
        ctx.drawImage(img, 0, 0, width, height);
    }

    //进行压缩
    var dataurl = canvas.toDataURL('image/png', 0.8);
    console.log('压缩前：' + initSize);
    console.log('压缩后：' + dataurl.length);
    console.log('压缩率：' + ~~(100 * (initSize - dataurl.length) / initSize) + "%");
    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
    return dataurl;
}

function prepare(element, check, done, fail) {
    $(element).change(function (evt) {
        //evt.preventDefault();

        if (!check()){
            return;
        }

        var file = this.files[0];
        var img = new Image();
        img.onload = function() {
            /*
            var width = img.width,
                height = img.height,
                scale = width / height;
            width = parseInt(800);
            height = parseInt(width / scale);

            canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            var dataurl = canvas.toDataURL('image/png',0.8);
            */

            // TBD

            var dataurl = compress(img);
            var imgblob = dataURLtoBlob(dataurl);
            var fd = new FormData();
            fd.append('file', imgblob, 'image-scaled.png');

            $.ajax({
                url: 'http://127.0.0.1:8089/v1/user/uploadimg',
                type: 'POST',
                data: fd,
                cache: false,
                contentType: false,
                enctype: 'multipart/form-data',
                processData: false,
                timeout: 60000,
                success: function(res) {
                    done({
                        'guid': res.guid,
                        'ext': res.ext,
                        'url': dataurl
                    });
                },
                error: function(res) {
                    fail();
                }
            });
        };

        var reader = new FileReader();
        reader.onload = function() {
            var base64 = reader.result;
            img.src=base64;
        };
        reader.readAsDataURL(file);
    });
}