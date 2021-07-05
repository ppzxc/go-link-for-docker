function parseMeta(recv, msg) {
    if (recv.meta === undefined || recv.result.status_code !== 200) {
        Log("RECV " + msg, "meta 파싱 실패")
        return
    }

    // request user
    if (recv.meta.request.what === "user" && recv.meta.request.how === "select") {
        AddFriends(recv.meta.response.users)
        return
    }

    if (recv.meta.request.what === "topic" && recv.meta.request.how === "select" && recv.meta.request.using === "me") {
        if (recv.meta.response.topics !== undefined) {
            let index = 0
            for (; index < recv.meta.response.topics.length; index++) {
                if (!topicsMapObject.has(recv.meta.response.topics[index].topic_id)) {
                    Status(recv.meta.response.topics[index].topic_id + ", " + recv.meta.response.topics[index].topic_name + " 방 추가")
                    TopicAddChatRoom(recv.meta.response.topics[index].topic_id, recv.meta.response.topics[index].topic_name)

                    Status(recv.meta.response.topics[index].topic_id + ", " + recv.meta.response.topics[index].topic_name + " 방 메시지 요청")

                    let m = jsonMetaMessageRequest(recv.meta.response.topics[index].topic_id)
                    Send(m);
                    Log("AUTO SEND " + m, "해당 채팅방의 메시지 메타 정보 요청")
                } else {
                    Log("RECV " + msg, "meta topic id 없음")
                }
            }
        } else {
            Log("RECV " + msg, "meta topics 없음")
        }

        return
    }

    if (recv.meta.request.what === "message" && recv.meta.request.how === "select") {
        if (recv.meta.response.messages !== undefined) {
            if (topicsMapObject.get(recv.meta.request.topic_id).length <= 0) {
                for (let index = 0; index < recv.meta.response.messages.length; index++) {
                    if (recv.meta.response.messages[index].user_id === user_id) {
                        drawing("left",
                            recv.meta.request.topic_id, recv.meta.response.messages[index].message,
                            user_id,
                            user_name,
                            undefined)
                        Log("RECOVERY RECV " + msg, "채팅방 리스트 복구")
                    } else {
                        drawing("right",
                            recv.meta.request.topic_id,
                            recv.meta.response.messages[index].message,
                            recv.meta.response.messages[index].user_id,
                            recv.meta.response.messages[index].user_name,
                            undefined)
                        Log("RECOVERY RECV " + msg, "채팅방 리스트 복구")
                    }
                }
            } else {
                Log("RECV " + msg, "meta topic_id 없음")
            }
        } else {
            Log("RECV " + msg, "meta messages 없음")
        }
        return
    }

    Log("RECV " + msg, "meta parse 정보 없음")
}