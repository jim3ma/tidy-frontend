/**
 * Created by jim on 5/11/16.
 */

function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

function prepare(element, check, callback) {
    $(element).change(function (evt) {
        //evt.preventDefault();

        if (!check()){
            return;
        }

        var file = this.files[0];
        var img = new Image();
        img.onload = function() {
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
            var base64 = canvas.toDataURL('image/png',0.8);

            var imgblob = dataURLtoBlob(base64);
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
                success: function(res) {
                    callback({
                        'guid': res.guid,
                        'ext': res.ext,
                        'url': base64
                    });
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