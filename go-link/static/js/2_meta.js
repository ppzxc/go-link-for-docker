let metaTopicRequest = document.getElementById("metaTopicRequest");
let metaTopicRequestByMe = document.getElementById("metaTopicRequestByMe");
let metaUserRequest = document.getElementById("metaUserRequest");
let metaMessageRequest = document.getElementById("metaMessageRequest");
let metaMessageRequestTopicId = document.getElementById("metaMessageRequestTopicId");

function jsonMetaTopicRequestByMe() {
    let root = defaultJsonObject("meta")
    root.meta.request.what = "topic"
    root.meta.request.how = "select"
    root.meta.request.using = "me"
    return JSON.stringify(root)
    // return '{"meta":{"uuid":"' + uuidv4() + '","request":{"what":"topic","how":"select", "using": "me"}}}'
}

function jsonMetaTopicRequest() {
    let root = defaultJsonObject("meta")
    root.meta.request.what = "topic"
    root.meta.request.how = "select"
    return JSON.stringify(root)
    // return '{"meta":{"uuid":"' + uuidv4() + '","request":{"what":"topic","how":"select"}}}'
}

function jsonMetaUserRequest() {
    let root = defaultJsonObject("meta")
    root.meta.request.what = "user"
    root.meta.request.how = "select"
    return JSON.stringify(root)
    // return '{"meta":{"uuid":"' + uuidv4() + '","request":{"what":"user","how":"select"}}}'
}

function jsonMetaMessageRequest(topic_id) {
    let root = defaultJsonObject("meta")
    root.meta.request.what = "message"
    root.meta.request.how = "select"
    root.meta.request.topic_id = parseInt(topic_id)
    return JSON.stringify(root)
    // return '{"meta":{"uuid":"' + uuidv4() + '","request":{"what":"message","how":"select", "topic_id": ' + topic_id + '}}}'
}

metaMessageRequest.onsubmit = function () {
    if (metaMessageRequestTopicId.value) {
        let msg = jsonMetaMessageRequest(metaMessageRequestTopicId.value)
        Log("SEND " + msg, "메시지 메타 정보 요청");
        Send(msg);
        return false
    } else {
        let msg = jsonMetaMessageRequest(0)
        Log("SEND " + msg, "메시지 메타 정보 요청");
        Send(msg);
        return false
    }
}

metaUserRequest.onclick = function () {
    let msg = jsonMetaUserRequest()
    Log("SEND " + msg, "사용자 메타 정보 요청");
    Send(msg);
    return false
}

metaTopicRequestByMe.onclick = function () {
    let msg = jsonMetaTopicRequestByMe()
    Log("SEND " + msg, "내가 구독중인 채팅방 메타 정보 요청")
    Send(msg)
    return false
}

metaTopicRequest.onclick = function () {
    let msg = jsonMetaTopicRequest()
    Log("SEND " + msg, "모든 채팅방 메타 정보 요청")
    Send(msg)
    return false
}

