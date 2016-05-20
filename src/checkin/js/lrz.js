/**
 * Created by jim on 5/11/16.
 */

function prepare(element, check, done, fail) {
    $.ajax({
        url: "../static/lrz/lrz.bundle.js",
        dataType: "script",
        cache: true
    }).done(function() {
        $(element).change(function (evt) {
            //evt.preventDefault();
            if(!check()){
                return;
            }
            lrz(this.files[0],{
                width: 800,
                quality: 0.8,
                fieldName: 'file'
            })
                .then(function (rst) {
                    // 处理成功会执行
                    //$('#lrzimg').attr('src', rst.base64);
                    console.log(rst);
                    $.ajax({
                        url: 'http://127.0.0.1:8089/v1/user/uploadimg',
                        type: 'POST',
                        data: rst.formData,
                        cache: false,
                        contentType: false,
                        enctype: 'multipart/form-data',
                        processData: false,
                        success: function (res) {
                            //console.log('lrz result:' + res);
                            done({
                                'guid': res.guid,
                                'ext': res.ext,
                                'url': rst.base64
                            });
                        },
                        error: function(res) {
                            fail();
                        }
                    });
                })
                .catch(function (err) {
                    // 处理失败会执行
                })
                .always(function () {
                    // 不管是成功失败，都会执行
                });
            //$("form").submit();
            //setInterval( function () { } , 1000 );
        });
    });
}