let logMsgKey = 0
let loggingColumn = document.getElementById("loggingColumn");
let loggingList = document.getElementById("loggingList");

let statusMsgKey = 0
let statusColumn = document.getElementById("statusColumn");
let statusList = document.getElementById("statusList");

let websocketConnection;

function Send(msg) {
    if (!websocketConnection) {
        Status("ws is not connected.")
        return false
    }

    websocketConnection.binaryType = "blob"
    websocketConnection.send(msg)
}

function parseWebsocketReadMessage(msg) {
    let recv = JSON.parse(msg)
    if (recv.ctrl !== undefined) {
        parseCtrl(recv, msg);
    } else if (recv.auth !== undefined) {
        parseAuth(recv, msg)
    } else if (recv.msg !== undefined) {
        parseMessage(recv, msg)
    } else if (recv.meta !== undefined) {
        parseMeta(recv, msg)
    } else {
        Log("RECV " + msg, "json root object가 없음 ctrl, msg, auth, meta")
    }
}

function Status(msg) {
    let item = document.createElement("div");
    statusMsgKey = statusMsgKey + 1;
    item.id = "status " + statusMsgKey
    item.innerHTML = msg;

    let doScroll = statusColumn.scrollTop > statusColumn.scrollHeight - statusColumn.clientHeight - 1;
    statusList.appendChild(item);

    if (doScroll) {
        statusColumn.scrollTop = statusColumn.scrollHeight - statusColumn.clientHeight;
    }
}

function Log(msg, status) {
    let item = document.createElement("div");
    logMsgKey = logMsgKey + 1;
    item.id = "logging " + logMsgKey
    item.innerHTML = msg;

    let doScroll = loggingColumn.scrollTop > loggingColumn.scrollHeight - loggingColumn.clientHeight - 1;
    loggingList.appendChild(item);

    if (doScroll) {
        loggingColumn.scrollTop = loggingColumn.scrollHeight - loggingColumn.clientHeight;
    }

    Status(status)
}

if (window["WebSocket"]) {
    websocketConnection = new WebSocket("ws://" + document.location.host + "/api/v1/ws");

    websocketConnection.onclose = function (evt) {
        if (evt.wasClean) {
            Status("[close] 커넥션이 정상적으로 종료되었습니다 + (code=" + evt.code + " reason=" + evt.reason + ")")
        } else {
            Status("[close] 커넥션이 죽었습니다. + (code=" + evt.code + " reason=" + evt.reason + ")")
        }
    };

    websocketConnection.onopen = function (evt) {
        Status("Connection open.");
    };

    websocketConnection.onerror = function (error) {
        Status("[error] ${error.message}");
    };

    websocketConnection.onmessage = function (evt) {
        let messages = evt.data.split('\n');
        for (let index = 0; index < messages.length; index++) {
            parseWebsocketReadMessage(messages[index])
        }
    };
} else {
    Status("Your browser does not support WebSockets.");
}