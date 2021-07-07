let websocketConnection;

let logMsgKey = 0
let logDiv = document.getElementById("logDiv");
let logList = document.getElementById("logList");
let connection_status = document.getElementById("connection_status");

let inputJson = document.getElementById("inputJson");
let receiveJson = document.getElementById("receiveJson");

let buttonRegister = document.getElementById("buttonRegister");
let buttonIdPassword = document.getElementById("buttonIdPassword");
let buttonAnonymous = document.getElementById("buttonAnonymous");
let buttonToken = document.getElementById("buttonToken");
let buttonRotary = document.getElementById("buttonRotary");
let buttonLogout = document.getElementById("buttonLogout");

let buttonSend = document.getElementById("buttonSend");

buttonSend.onclick = function () {
    if (inputJson.value === undefined || inputJson.value === "") {
        Log("input value 없음")
        return
    }

    if (!websocketConnection) {
        Log("Websocket 연결 안됨")
        return
    }

    Log("SEND " + inputJson.value)
    websocketConnection.send(inputJson.value)
}

buttonRegister.onclick = function () {
    let root = defaultJsonObject("auth")
    root.auth.request.what = "user"
    root.auth.request.how = "register"
    root.auth.request.user = {}
    root.auth.request.user.name = ""
    root.auth.request.user.email = ""
    root.auth.request.user.password = ""

    inputJson.value = JSON.stringify(root, null, 4)
}

buttonIdPassword.onclick = function () {
    let root = defaultJsonObject("auth")
    root.auth.request.what = "session"
    root.auth.request.how = "login"
    root.auth.request.using = "id"
    root.auth.request.user = {}
    root.auth.request.user.email = ""
    root.auth.request.user.password = ""

    inputJson.value = JSON.stringify(root, null, 4)
}

buttonAnonymous.onclick = function () {
    let root = defaultJsonObject("auth")
    root.auth.request.what = "session"
    root.auth.request.how = "login"
    root.auth.request.using = "anonymous"

    inputJson.value = JSON.stringify(root, null, 4)
}

buttonRotary.onclick = function () {
    let root = defaultJsonObject("auth")
    root.auth.request.what = "session"
    root.auth.request.how = "login"
    root.auth.request.using = "rotary"
    root.auth.request.user_id = 0

    inputJson.value = JSON.stringify(root, null, 4)
}

buttonToken.onclick = function () {
    let root = defaultJsonObject("auth")
    root.auth.request.what = "session"
    root.auth.request.how = "login"
    root.auth.request.using = "key"
    root.auth.request.jwt_token = ""

    inputJson.value = JSON.stringify(root, null, 4)
}

buttonLogout.onclick = function () {
    let root = defaultJsonObject("auth")
    root.auth.request.what = "session"
    root.auth.request.how = "logout"

    inputJson.value = JSON.stringify(root, null, 4)
}

function Log(msg) {
    let item = document.createElement("div");
    logMsgKey = logMsgKey + 1;
    item.id = "logging " + logMsgKey
    item.innerHTML = msg;

    let doScroll = logDiv.scrollTop > logDiv.scrollHeight - logDiv.clientHeight - 1;
    logList.appendChild(item);

    if (doScroll) {
        logDiv.scrollTop = logDiv.scrollHeight - logDiv.clientHeight;
    }
}

function parseWebsocketReadMessage(msg) {
    Log("RECV " + msg)
    let recv = JSON.parse(msg)
    if (recv.ctrl !== undefined) {
        receiveJson.value = JSON.stringify(recv, null, 4)
    } else if (recv.auth !== undefined) {
        receiveJson.value = JSON.stringify(recv, null, 4)
    } else if (recv.msg !== undefined) {
        receiveJson.value = JSON.stringify(recv, null, 4)
    } else if (recv.meta !== undefined) {
        receiveJson.value = JSON.stringify(recv, null, 4)
    } else if (recv.ack !== undefined) {
        if (recv.result.status_code !== 200) {
            receiveJson.value = JSON.stringify(recv, null, 4)
        }
    } else {
        Log("json root object가 없음 ctrl, msg, auth, meta")
        receiveJson.value = JSON.stringify(recv, null, 4)
    }
}

if (window["WebSocket"]) {
    websocketConnection = new WebSocket("ws://" + document.location.host + "/api/v1/ws");

    websocketConnection.onclose = function (evt) {
        connection_status.innerText = "CONNECTION STATUS : CLOSE"
        if (evt.wasClean) {
            Log("[close] 커넥션이 정상적으로 종료되었습니다 + (code=" + evt.code + " reason=" + evt.reason + ")")
        } else {
            Log("[close] 커넥션이 죽었습니다. + (code=" + evt.code + " reason=" + evt.reason + ")")
        }
    };

    websocketConnection.onopen = function (evt) {
        connection_status.innerText = "CONNECTION STATUS : OPEN"
        Log("Connection open.");
    };

    websocketConnection.onerror = function (error) {
        connection_status.innerText = "CONNECTION STATUS : ERROR"
        Log("[error] ${error.message}");
    };

    websocketConnection.onmessage = function (evt) {
        connection_status.innerText = "CONNECTION STATUS : OPEN"
        let messages = evt.data.split('\n');
        for (let index = 0; index < messages.length; index++) {
            parseWebsocketReadMessage(messages[index])
        }
    };
} else {
    Log("Your browser does not support WebSockets.");
}

function defaultJsonObject(type) {
    let root = {}

    switch (type) {
        case "auth":
            root.auth = {}
            root.auth.uuid = uuidv4()
            root.auth.request = {}
            return root
        case "meta":
            root.meta = {}
            root.meta.uuid = uuidv4()
            root.meta.request = {}
            return root
        case "ctrl":
            root.ctrl = {}
            root.ctrl.uuid = uuidv4()
            root.ctrl.request = {}
            return root
        case "msg":
            root.msg = {}
            root.msg.uuid = uuidv4()
            root.msg.request = {}
            return root
        case "file":
            root.file = {}
            root.file.uuid = uuidv4()
            root.file.request = {}
            return root
        default:
            root.null = {}
            root.null.uuid = uuidv4()
            root.null.request = {}
    }
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}