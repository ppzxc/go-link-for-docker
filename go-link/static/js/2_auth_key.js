let authLoginJwtForm = document.getElementById("authLoginJwtForm")
let authLoginJwtTokenInput = document.getElementById("authLoginJwtTokenInput")
let authLogoutKeepTrueButton = document.getElementById("authLogoutKeepTrueButton")
let authLogoutKeepFalseButton = document.getElementById("authLogoutKeepFalseButton")
let authGetJwtKeyButton = document.getElementById("authGetJwtKeyButton")

function jsonAuthLogoutNoKeep() {
    let root = defaultJsonObject("auth")
    root.auth.request.what = "session"
    root.auth.request.how = "logout"
    return JSON.stringify(root)
    // return '{"auth":{"uuid":"' + uuidv4() + '","request":{"what":"session","how":"logout"}}}'
}

function jsonAuthLogoutKeepTrue() {
    let root = defaultJsonObject("auth")
    root.auth.request.what = "session"
    root.auth.request.how = "logout"
    root.auth.request.keep = true
    return JSON.stringify(root)
    // return '{"auth":{"uuid":"' + uuidv4() + '","request":{"what":"session","how":"logout","keep":true}}}'
}

function jsonAuthLogoutKeepFalse() {
    let root = defaultJsonObject("auth")
    root.auth.request.what = "session"
    root.auth.request.how = "logout"
    root.auth.request.keep = false
    return JSON.stringify(root)
    // return '{"auth":{"uuid":"' + uuidv4() + '","request":{"what":"session","how":"logout","keep":false}}}'
}

function jsonAuthGetJwtToken() {
    let root = defaultJsonObject("auth")
    root.auth.request.what = "jwt"
    root.auth.request.how = "select"
    return JSON.stringify(root)
    // return '{"auth":{"uuid":"' + uuidv4() + '","request":{"what":"jwt","how":"select"}}}'
}
function jsonAuthJwtLoginUsingToken(token) {
    let root = defaultJsonObject("auth")
    root.auth.request.what = "session"
    root.auth.request.how = "login"
    root.auth.request.using = "key"
    root.auth.request.jwt_token = token
    return JSON.stringify(root)
    // return '{"auth":{"uuid":"' + uuidv4() + '","request":{"what":"session","how":"login","using":"key","jwt_token":"' + token + '"}}}'
}

function jsonAuthJwtLoginNoneToken() {
    let root = defaultJsonObject("auth")
    root.auth.request.what = "session"
    root.auth.request.how = "login"
    root.auth.request.using = "key"
    return JSON.stringify(root)
    // return '{"auth":{"uuid":"' + uuidv4() + '","request":{"what":"session","how":"login","using":"key"}}}'
}

authLogoutKeepTrueButton.onclick = function () {
    let msg = jsonAuthLogoutKeepTrue()
    Log("SEND " + msg, "TOKEN 로그아웃, 정보 유지");
    Send(msg);
    return false
}

authLogoutKeepFalseButton.onclick = function () {
    let msg = jsonAuthLogoutKeepFalse()
    Log("SEND " + msg, "TOKEN 로그아웃, 정보 폐기");
    Send(msg);
    return false
}

authGetJwtKeyButton.onclick = function () {
    let msg = jsonAuthGetJwtToken()
    Log("SEND " + msg, "JWT 토큰 요청");
    Send(msg);
    return false
}

authLoginJwtForm.onsubmit = function () {
    let msg;
    if (authLoginJwtTokenInput.value !== '') {
        msg = jsonAuthJwtLoginUsingToken(authLoginJwtTokenInput.value)
    } else {
        msg = jsonAuthJwtLoginNoneToken()
    }

    Send(msg)
    Log("SEND " + msg, "jwt 로그인 요청")
    return false;
}