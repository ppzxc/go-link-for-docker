let authLoginAnonForm = document.getElementById("authLoginAnonForm");
let authLoginAnonUserNameInput = document.getElementById("authLoginAnonUserNameInput");
let authLogoutAnonButton = document.getElementById("authLogoutAnonButton");

function jsonAuthAnonLoginUsingUserName(user_name) {
    let root = defaultJsonObject("auth")
    root.auth.request.what = "session"
    root.auth.request.how = "login"
    root.auth.request.using = "anonymous"
    root.auth.request.user_name = user_name
    return JSON.stringify(root)
    // return '{"auth":{"uuid":"' + uuidv4() + '","request":{"what":"session","how":"login","using":"anonymous","user_name":"' + user_name + '"}}}'
}

function jsonAuthAnonLoginUsingNone() {
    let root = defaultJsonObject("auth")
    root.auth.request.what = "session"
    root.auth.request.how = "login"
    root.auth.request.using = "anonymous"
    return JSON.stringify(root)
    // return '{"auth":{"uuid":"' + uuidv4() + '","request":{"what":"session","how":"login","using":"anonymous"}}}'
}

authLogoutAnonButton.onclick = function () {
    let msg = jsonAuthLogoutNoKeep()
    Log("SEND " + msg, "익명 로그아웃 요청");
    Send(msg);
    return false
}

authLoginAnonForm.onsubmit = function () {
    if (!websocketConnection) {
        Log("ws not connected.", "웹 소켓 연결 안됨");
        return false;
    }

    let msg;
    if (authLoginAnonUserNameInput.value !== '') {
        msg = jsonAuthAnonLoginUsingUserName(authLoginAnonUserNameInput.value)
    } else {
        msg = jsonAuthAnonLoginUsingNone()
    }

    Send(msg)
    Log("SEND " + msg, "익명 로그인 요청")
    return false;
}