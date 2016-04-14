/**
 * Created by jimmar on 4/13/16.
 *
 * Load js.cookie.js first!
 *
 */
function check_auth() {
    auth = Cookies.getJSON('auth');
    console.log('auth_id:' + auth.id + ', '
        + 'last checkin: '
        + auth.last_checkin.year + '-'
        + auth.last_checkin.month + '-'
        + auth.last_checkin.day);
    if( auth.id != 3 ){
        console.log('check auth failed!')
        window.location.href = '../auth/login.html'
    }
}

function do_auth() {
    Cookies.set('auth', { id: '1', last_checkin: { year : 2016, month: 3, day:3 } });
}

function clear_auth() {
    Cookies.set('auth', {});
}

check_auth();

