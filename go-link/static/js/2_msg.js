let msgSend = document.getElementById("msgSend")
let msg = document.getElementById("msg")

function jsonSendMessage(topic_id, msg) {
    return '{"msg":{"uuid":"' + uuidv4() + '","request":{"what":"message","how":"send","topic_id":' + topic_id + ',"message":"' + msg + '"}}}'
}

function jsonReceiveAck(topic_id, sequence_id) {
    return '{"msg":{"uuid":"' + uuidv4() + '","request":{"what":"message","how":"ack","topic_id":' + topic_id + ',"sequence_id":' + sequence_id + '}}}'
}

function jsonReadAck(topic_id, sequence_id) {
    return '{"msg":{"uuid":"' + uuidv4() + '","request":{"what":"message","how":"read","topic_id":' + topic_id + ',"sequence_id":' + sequence_id + '}}}'
}

function jsonSendFile(topic_id, file_id, mime) {
    let msg = '{"msg":{"uuid":"' + uuidv4() + '","request":{"what":"message","how":"send","using": "file", "topic_id":' + topic_id + ',"file_id": ' + file_id + ', "mime": "' + mime + '"}}}'
    Send(msg)
    Log("SEND " + msg, "채팅방으로 파일 전송 메시지 발송")
    return false
}

function readAck(topic_id, sequence_id) {
    let readAck = jsonReadAck(topic_id, sequence_id)
    Send(readAck)
    Log("AUTO SEND " + readAck, topic_id + ", " + sequence_id + " READ ACK 전송")
}

function receiveAck(topic_id, sequence_id) {
    let ack = jsonReceiveAck(topic_id, sequence_id)
    Send(ack)
    Log("AUTO SEND " + ack, topic_id + ", " + sequence_id + " RECEIVE ACK 전송")
}

msgSend.onsubmit = function () {
    if (!websocketConnection || !msg.value) {
        return false;
    }

    let topic_id = 0
    if (currentFocusTopic === undefined) {
        Status("방 선택 안됨")
    } else {
        topic_id = currentFocusTopic
    }

    let sendMsg = jsonSendMessage(topic_id, msg.value)
    Send(sendMsg);
    Log("[" + strByteLength(sendMsg) + "] SEND " + sendMsg, "메시지 전송")
    msg.value = "";
    return false;
}