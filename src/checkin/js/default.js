/**
 * Created by jim on 5/11/16.
 */

function prepare(element, check, done, fail) {
    $(element).change(function (evt) {
        //evt.preventDefault();
        console.log('file select clicked');
        if(!check()){
            return;
        }
        var fd = new FormData();
        fd.append('file', this.files[0], 'image.png');

        $.ajax({
            url: 'http://127.0.0.1:8089/v1/user/uploadimg',
            type: 'POST',
            data: fd,
            //async: false,
            cache: false,
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            success: function(res){
                url = Cookies.get('imgurl_prefix') + res.guid + '.' + res.ext;
                done({
                    'guid': res.guid,
                    'ext': res.ext,
                    'url': url
                });
            },
            error: function(res) {
                fail();
            }
        });
        //$("form").submit();
        //setInterval( function () { } , 1000 );
    });
}