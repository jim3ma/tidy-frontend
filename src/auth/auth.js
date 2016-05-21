/**
 * Created by jimmar on 4/13/16.
 *
 * Load js.cookie.js first!
 *
 */
function check_auth() {
    auth_token = Cookies.get('auth_token');
    console.log(auth_token);
    try {
        exp = jwt_decode(auth_token)['exp'];
        console.log('expire time:' + exp);
        d = new Date();
        console.log('current time:' + d.getTime()/1000);
        if(d.getTime()/1000 >= exp) {
            console.log('auth_token expired!');
            window.location.href = '../auth/login.html';
        } else {
            console.log('auth_token doesn\'t expired!')
        }
    }
    catch (err) {
        console.log('check auth_token failed!');
        window.location.href = '../auth/login.html';
    }
    user_info = Cookies.getJSON('user_info');
    console.log(user_info);
    //console.log('user id:' + user_info.uid + ', '
    //    + 'last checkin: '
    //    + user_info.last_checkin.year + '-'
    //    + user_info.last_checkin.month + '-'
    //    + user_info.last_checkin.day);
}

/*
function do_auth(username, password) {
    $.ajax({
        url: 'http://127.0.0.1:8089/v1/user/login',
        dataType: 'jsonp',
        //type: 'POST',
        data: {
            username: 'abc',
            password: 'xyz'
        },
        success: function(res) {
            console.log(res);
        }
    });
    Cookies.set('auth_token', { id: '1', last_checkin: { year : 2016, month: 3, day:3 } });
    Cookies.set('user_info', {})
}
*/

function clear_auth() {
    Cookies.remove('auth_token');
    Cookies.remove('user_info');
}

check_auth();

