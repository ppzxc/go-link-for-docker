let topicExit = document.getElementById("topicExit")
let topicExitRoomId = document.getElementById("topicExitRoomId")
let topicCreate = document.getElementById("topicCreate")
let topicCreateName = document.getElementById("topicCreateName")
let topicJoin = document.getElementById("topicJoin")
let topicJoinName = document.getElementById("topicJoinName")
let topicInviteUserFrom = document.getElementById("topicInviteUserFrom")
let topicInviteUserId = document.getElementById("topicInviteUserId")
let topicInviteTopicId = document.getElementById("topicInviteTopicId")

function jsonRoomExit(id) {
    return '{"ctrl":{"uuid":"' + uuidv4() + '","request":{"what":"topic","how":"leave","topic_id":' + id + '}}}'
}

function jsonTopicJoin(id) {
    return '{"ctrl":{"uuid":"' + uuidv4() + '","request":{"what":"topic","how":"join","topic_id":' + id + '}}}'
}

function jsonTopicInviteUser(user_id, topic_id) {
    return '{"ctrl":{"uuid":"' + uuidv4() + '","request":{"what":"topic","how":"invite","topic_id":' + topic_id + ', "user_id": ' + user_id + '}}}'
}

function jsonTopicCreate() {
    if (topicCreateName.value) {
        return '{"ctrl":{"uuid":"' + uuidv4() + '","request":{"what":"topic","how":"create","who":"alone","topic_name":"' + topicCreateName.value + '"}}}'
    } else {
        return '{"ctrl":{"uuid":"' + uuidv4() + '","request":{"what":"topic","how":"create","who":"alone"}}}'
    }
}

topicExit.onsubmit = function () {
    if (!topicExitRoomId.value) {
        let msg = jsonRoomExit(0)
        Log("SEND " + msg, "나갈 방 번호 입력 안됨")
        Send(msg)
        return false
    } else {
        let msg = jsonRoomExit(topicExitRoomId.value)
        Log("SEND " + msg, "방 나가기 요청")
        Send(msg)
        return false
    }
}

topicInviteUserFrom.onsubmit = function () {
    if (topicInviteUserId.value === undefined) {
        let invite = jsonTopicInviteUser(0, 0)
        Send(invite)
        Log("SEND " + invite, "초대할 user id 입력 안됨")
        return false
    }

    if (topicInviteTopicId.value === undefined) {
        let invite = jsonTopicInviteUser(0, 0)
        Send(invite)
        Log("SEND " + invite, "초대할 topic id 입력 안됨")
        return false
    }

    let invite = jsonTopicInviteUser(topicInviteUserId.value, topicInviteTopicId.value)
    Send(invite)
    Log("SEND " + invite, "채팅방 초대 요청")
    return false
}

topicJoin.onsubmit = function () {
    if (!topicJoinName.value) {
        let msg = jsonTopicJoin(0)
        Log("SEND " + msg, "참가할 방 번호가 입력되어 있지 않음")
        Send(msg)
        return false;
    } else {
        let msg = jsonTopicJoin(topicJoinName.value)
        Log("SEND " + msg, "방 참가 요청 전송")
        Send(msg)
        return false;
    }
}

topicCreate.onsubmit = function () {
    let msg = jsonTopicCreate(topicCreateName.value)
    Log("SEND " + msg, "방 생성 요청")
    Send(msg)
    return false;
}