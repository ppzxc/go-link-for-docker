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
let buttonRequestToken = document.getElementById("buttonRequestToken");
let buttonRotary = document.getElementById("buttonRotary");
let buttonLogout = document.getElementById("buttonLogout");
let buttonCreateRoom = document.getElementById("buttonCreateRoom");
let buttonJoinRoom = document.getElementById("buttonJoinRoom");
let buttonLeaveRoom = document.getElementById("buttonLeaveRoom");
let buttonInviteRoom = document.getElementById("buttonInviteRoom");
let buttonTestLogin = document.getElementById("buttonTestLogin");

let buttonMetaAllChatRoom = document.getElementById("buttonMetaAllChatRoom");
let buttonMetaMyChatRoom = document.getElementById("buttonMetaMyChatRoom");
let buttonMetaAllUser = document.getElementById("buttonMetaAllUser");
let buttonMetaChatRoomUser = document.getElementById("buttonMetaChatRoomUser");
let buttonMetaChatRoomMessage = document.getElementById("buttonMetaChatRoomMessage");

let buttonMsgSend = document.getElementById("buttonMsgSend");
let buttonMsgReceiveAck = document.getElementById("buttonMsgReceiveAck");
let buttonMsgReadAck = document.getElementById("buttonMsgReadAck");

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

buttonMsgSend.onclick = function () {
    let root = defaultJsonObject("msg")
    root.msg.request.what = "message"
    root.msg.request.how = "send"
    root.msg.request.topic = {}
    root.msg.request.topic.id = 0
    root.msg.request.message = ""

    inputJson.value = JSON.stringify(root, null, 4)
}

buttonMsgReadAck.onclick = function () {
    let root = defaultJsonObject("msg")
    root.msg.request.what = "message"
    root.msg.request.how = "read"
    root.msg.request.topic = {}
    root.msg.request.topic.id = 0
    root.msg.request.sequence_id = 0

    inputJson.value = JSON.stringify(root, null, 4)
}

buttonMsgReceiveAck.onclick = function () {
    let root = defaultJsonObject("msg")
    root.msg.request.what = "message"
    root.msg.request.how = "ack"
    root.msg.request.topic = {}
    root.msg.request.topic.id = 0
    root.msg.request.sequence_id = 0

    inputJson.value = JSON.stringify(root, null, 4)
}

buttonMetaAllChatRoom.onclick = function () {
    let root = defaultJsonObject("meta")
    root.meta.request.what = "topic"
    root.meta.request.how = "select"

    inputJson.value = JSON.stringify(root, null, 4)
}

buttonMetaMyChatRoom.onclick = function () {
    let root = defaultJsonObject("meta")
    root.meta.request.what = "topic"
    root.meta.request.how = "select"
    root.meta.request.using = "me"

    inputJson.value = JSON.stringify(root, null, 4)
}

buttonMetaAllUser.onclick = function () {
    let root = defaultJsonObject("meta")
    root.meta.request.what = "user"
    root.meta.request.how = "select"

    inputJson.value = JSON.stringify(root, null, 4)
}

buttonMetaChatRoomUser.onclick = function () {
    let root = defaultJsonObject("meta")
    root.meta.request.what = "user"
    root.meta.request.how = "select"
    root.meta.request.using = "topic"
    root.meta.request.topic = {}
    root.meta.request.topic.id = 0

    inputJson.value = JSON.stringify(root, null, 4)
}

buttonMetaChatRoomMessage.onclick = function () {
    let root = defaultJsonObject("meta")
    root.meta.request.what = "message"
    root.meta.request.how = "select"
    root.meta.request.topic = {}
    root.meta.request.topic.id = 0

    inputJson.value = JSON.stringify(root, null, 4)
}

buttonCreateRoom.onclick = function () {
    let root = defaultJsonObject("ctrl")
    root.ctrl.request.what = "topic"
    root.ctrl.request.how = "create"
    root.ctrl.request.who = "alone"
    root.ctrl.request.private = false
    root.ctrl.request.topic = {}
    root.ctrl.request.topic.name = ""

    inputJson.value = JSON.stringify(root, null, 4)
}

buttonJoinRoom.onclick = function () {
    let root = defaultJsonObject("ctrl")
    root.ctrl.request.what = "topic"
    root.ctrl.request.how = "join"
    root.ctrl.request.topic = {}
    root.ctrl.request.topic.id = 0

    inputJson.value = JSON.stringify(root, null, 4)
}

buttonLeaveRoom.onclick = function () {
    let root = defaultJsonObject("ctrl")
    root.ctrl.request.what = "topic"
    root.ctrl.request.how = "leave"
    root.ctrl.request.topic = {}
    root.ctrl.request.topic.id = 0

    inputJson.value = JSON.stringify(root, null, 4)
}

buttonInviteRoom.onclick = function () {
    let root = defaultJsonObject("ctrl")
    root.ctrl.request.what = "topic"
    root.ctrl.request.how = "invite"
    root.ctrl.request.user = {}
    root.ctrl.request.user.id = 0
    root.ctrl.request.topic = {}
    root.ctrl.request.topic.id = 0

    inputJson.value = JSON.stringify(root, null, 4)
}

buttonRegister.onclick = function () {
    let root = defaultJsonObject("auth")
    root.auth.request.what = "user"
    root.auth.request.how = "register"
    root.auth.request.user = {}
    root.auth.request.user.auth = {}
    root.auth.request.user.auth.name = ""
    root.auth.request.user.auth.email = ""
    root.auth.request.user.auth.password = ""

    inputJson.value = JSON.stringify(root, null, 4)
}

buttonTestLogin.onclick = function () {
    let root = defaultJsonObject("auth")
    root.auth.request.what = "session"
    root.auth.request.how = "login"
    root.auth.request.using = "id"
    root.auth.request.user = {}
    root.auth.request.user.auth = {}
    root.auth.request.user.auth.email = "asdf@asdf"
    root.auth.request.user.auth.password = "asdfasdf"

    inputJson.value = JSON.stringify(root, null, 4)
}

buttonIdPassword.onclick = function () {
    let root = defaultJsonObject("auth")
    root.auth.request.what = "session"
    root.auth.request.how = "login"
    root.auth.request.using = "id"
    root.auth.request.user = {}
    root.auth.request.user.auth = {}
    root.auth.request.user.auth.email = ""
    root.auth.request.user.auth.password = ""

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
    root.auth.request.user = {}
    root.auth.request.user.id = 0

    inputJson.value = JSON.stringify(root, null, 4)
}

buttonRequestToken.onclick = function () {
    let root = defaultJsonObject("auth")
    root.auth.request.what = "token"
    root.auth.request.how = "select"

    inputJson.value = JSON.stringify(root, null, 4)
}

buttonToken.onclick = function () {
    let root = defaultJsonObject("auth")
    root.auth.request.what = "session"
    root.auth.request.how = "login"
    root.auth.request.using = "token"
    root.auth.request.token = ""

    inputJson.value = JSON.stringify(root, null, 4)
}

buttonLogout.onclick = function () {
    let root = defaultJsonObject("auth")
    root.auth.request.what = "session"
    root.auth.request.how = "logout"

    inputJson.value = JSON.stringify(root, null, 4)
}

function Log(msg) {
    let item = document.createElement("li");
    logMsgKey = logMsgKey + 1;
    // item.id = "logging " + logMsgKey
    item.key = logMsgKey
    item.innerHTML = msg;

    let doScroll = logDiv.scrollTop > logDiv.scrollHeight - logDiv.clientHeight - 1;
    logList.appendChild(item);

    if (doScroll) {
        logDiv.scrollTop = logDiv.scrollHeight - logDiv.clientHeight;
    }
}

function AddResult(msg) {
    let doScroll = receiveJson.scrollTop > receiveJson.scrollHeight - receiveJson.clientHeight - 1;
    receiveJson.value = receiveJson.value + "====================================\r\n"
    receiveJson.value = receiveJson.value + msg
    if (doScroll) {
        receiveJson.scrollTop = receiveJson.scrollHeight - receiveJson.clientHeight;
    }
}

function parseWebsocketReadMessage(msg) {
    Log("RECV " + msg)
    let recv = JSON.parse(msg)
    if (recv.ctrl !== undefined) {
        AddResult(JSON.stringify(recv, null, 4))
        // receiveJson.value = receiveJson.value + JSON.stringify(recv, null, 4)
    } else if (recv.auth !== undefined) {
        AddResult(JSON.stringify(recv, null, 4))
        // receiveJson.value = receiveJson.value + JSON.stringify(recv, null, 4)
    } else if (recv.msg !== undefined) {
        AddResult(JSON.stringify(recv, null, 4))
        // receiveJson.value = receiveJson.value + JSON.stringify(recv, null, 4)
        if (recv.result.status_code === 200) {
            let recvAck = {}
            recvAck.msg = {}
            recvAck.msg.uuid = uuidv4()
            recvAck.msg.request = {}
            recvAck.msg.request.what = "message"
            recvAck.msg.request.how = "ack"
            recvAck.msg.request.topic.id = recv.msg.request.topic.id
            recvAck.msg.request.sequence_id = recv.msg.response.message.sequence_id
            let recvAckJson = JSON.stringify(recvAck)
            Log("SEND " + recvAckJson)
            websocketConnection.send(recvAckJson)

            let readAck = {}
            readAck.msg = {}
            readAck.msg.uuid = uuidv4()
            readAck.msg.request = {}
            readAck.msg.request.what = "message"
            readAck.msg.request.how = "read"
            readAck.msg.request.topic.id = recv.msg.request.topic.id
            readAck.msg.request.sequence_id = recv.msg.response.message.sequence_id
            let readAckJson = JSON.stringify(readAck)
            Log("SEND " + readAckJson)
            websocketConnection.send(readAckJson)
        }
    } else if (recv.meta !== undefined) {
        AddResult(JSON.stringify(recv, null, 4))
        // receiveJson.value = receiveJson.value + JSON.stringify(recv, null, 4)
    } else if (recv.ack !== undefined) {
        if (recv.result.status_code !== 200) {
            AddResult(JSON.stringify(recv, null, 4))
            // receiveJson.value = receiveJson.value + JSON.stringify(recv, null, 4)
        }
    } else {
        Log("json root object가 없음 ctrl, msg, auth, meta")
        AddResult(JSON.stringify(recv, null, 4))
        // receiveJson.value = receiveJson.value + JSON.stringify(recv, null, 4)
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

    // websocketConnection.on("ping", function () {
    //     Log("receive ping")
    // })

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