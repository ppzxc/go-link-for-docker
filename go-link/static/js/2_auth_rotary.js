let authLoginRotaryForm = document.getElementById("authLoginRotaryForm")
let authLoginRotaryUserIdInput = document.getElementById("authLoginRotaryUserIdInput")
let authLogoutRotaryButton = document.getElementById("authLogoutRotaryButton")

function jsonAuthLogoutRotary() {
    let root = defaultJsonObject("auth")
    root.auth.request.what = "session"
    root.auth.request.how = "logout"
    root.auth.request.using = "rotary"
    return JSON.stringify(root)
    // return '{"auth":{"uuid":"' + uuidv4() + '","request":{"what":"session","how":"logout","using":"rotary"}}}'
}

function jsonAuthRotaryLogin(user_id) {
    let root = defaultJsonObject("auth")
    root.auth.request.what = "session"
    root.auth.request.how = "login"
    root.auth.request.using = "rotary"
    root.auth.request.user_id = parseInt(user_id)
    return JSON.stringify(root)
    // return '{"auth":{"uuid":"' + uuidv4() + '","request":{"what":"session","how":"login","using":"rotary","user_id":' + user_id + '}}}'
}

authLogoutRotaryButton.onclick = function () {
    let msg = jsonAuthLogoutRotary()
    Log("SEND " + msg, "로타리 로그아웃 요청");
    Send(msg);
    return false
}

authLoginRotaryForm.onsubmit = function () {
    if (!authLoginRotaryUserIdInput.value) {
        let msg = jsonAuthRotaryLogin()
        Log("SEND " + msg, "로타리 로그인 요청")
        Send(msg)
    } else {
        let msg = jsonAuthRotaryLogin(authLoginRotaryUserIdInput.value)
        Log("SEND " + msg, "로타리 로그인 요청")
        Send(msg)
    }
    return false
}

