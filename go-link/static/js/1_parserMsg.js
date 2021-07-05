function parseMessage(recv, msg) {
    if (recv.result === undefined || recv.result.status_code !== 200 || recv.from === undefined) {
        Log("RECV " + msg, "채팅방 메시지 수신 실패")
        return false
    }

    if (recv.msg.request.how === "read") {
        Log("AUTO SEND RECV " + msg, "read 수신")
        return false
    }

    if (recv.msg.request.how === "ack") {
        Log("AUTO SEND RECV " + msg, "ACK 수신")
        return false
    }

    if (recv.msg.request.message !== undefined) {
        if (recv.from.me === true) {
            drawing("left",
                recv.msg.request.topic_id,
                recv.msg.request.message,
                user_id,
                user_name,
                undefined,
                undefined,
                recv.msg.response.sequence_id)
            Log("RECV " + msg, "채팅방 메시지 수신")
        } else {
            drawing("right",
                recv.msg.request.topic_id,
                recv.msg.request.message,
                recv.from.user_id,
                recv.from.user_name,
                undefined,
                undefined,
                recv.msg.response.sequence_id)
            Log("RECV " + msg, "채팅방 메시지 수신")
        }

        receiveAck(recv.msg.request.topic_id, recv.msg.response.sequence_id)
        return false
    }

    if (recv.msg.request.using === "file") {
        if (recv.from.me === true) {
            drawing("left",
                recv.msg.request.topic_id,
                recv.msg.request.message,
                user_id,
                user_name,
                recv.msg.request.file_id,
                recv.msg.request.mime)
            Log("RECV " + msg, "채팅방 메시지 수신")
        } else {
            drawing("right",
                recv.msg.request.topic_id,
                recv.msg.request.message,
                recv.from.user_id,
                recv.from.user_name,
                recv.msg.request.file_id,
                recv.msg.request.mime)
            Log("RECV " + msg, "채팅방 메시지 수신")
        }

        receiveAck(recv.msg.request.topic_id, recv.msg.response.sequence_id)
        return false
    }
}