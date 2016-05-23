/**
 * Created by jim on 5/22/16.
 */
$(document).ready(function(){
    $('#feedback').click(function(){
        $.get('../system/feedback.html', function(html) {
            $('body').append(html);
            $('#feedback_dialog').modal('show');
            $('#upload_feedback').click(function(){
                var user_info = Cookies.getJSON('user_info');
                var user_name = "";
                if(user_info != undefined){
                    user_name = user_info.user_name;
                }
                $.ajax({
                    url: 'http://127.0.0.1:8089/v1/user/feedback',
                    dataType: 'json',
                    type: 'POST',
                    data: {
                        user_name: user_name,
                        content: $('#fd_content').val()
                    },

                    success: function (res) {
                        console.log(res);
                        $('#fd_msg_ok').show();
                        setTimeout(function(){
                            $('#feedback_dialog').modal('hide');
                            $('#fd_msg_ok').hide();
                        }, 3000);
                    },
                    statusCode: {
                        403: function() {
                        }
                    },
                    error: function (res) {
                        console.log(res);
                        $('#fd_msg_error').show();
                        setTimeout(function(){
                            $('#fd_msg_error').hide();
                        }, 3000);
                    }
                });

            });
        }).fail(function(jqXHR) {
            //$('#container').html('An error occurred: ' + jqXHR.status).append(jqXHR.responseText);
        });
    });
});