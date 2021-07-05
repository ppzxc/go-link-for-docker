function parseCtrl(recv, msg) {
    if (recv.result === undefined || recv.result.status_code !== 200 || recv.from === undefined) {
        Log("RECV " + msg, "parse ctrl 실패")
        return
    }

    if (recv.ctrl.request.what === "topic") {
        if (recv.ctrl.request.how === "create") {
            if (recv.ctrl.response === undefined || recv.ctrl.response.topic_id <= 0) {
                Log("RECV " + msg, "ctrl.request.how == create 실패")
                return
            }

            TopicAddChatRoom(recv.ctrl.response.topic_id, recv.ctrl.response.topic_name)
            Log("RECV " + msg, recv.ctrl.response.topic_id + ", " + recv.ctrl.response.topic_name + " 방 생성 성공")

            if (recv.from.me === true) {
                drawing("notice",
                    recv.ctrl.response.topic_id,
                    recv.ctrl.response.topic_id + "번 방 입장",
                    recv.from.user_id,
                    recv.from.user_name,
                    undefined)
            } else {
                drawing("notice",
                    recv.ctrl.response.topic_id,
                    recv.ctrl.response.topic_id + "번 방 입장",
                    user_id,
                    user_name,
                    undefined)
            }
        } else if (recv.ctrl.request.how === "join") {
            if (recv.from.me) {
                TopicAddChatRoom(recv.ctrl.request.topic_id, recv.ctrl.response.topic_name)
                Log("RECV " + msg, recv.ctrl.response.topic_id + ", " + recv.ctrl.response.topic_name + " 방 입장 성공")

                drawing("notice",
                    recv.ctrl.request.topic_id,
                    recv.ctrl.request.topic_id + "번 방 입장",
                    user_id,
                    user_name,
                    undefined)
            } else {
                Log("RECV " + msg, recv.ctrl.response.topic_id + ", " + recv.ctrl.response.topic_name + " 방 입장 성공")
                drawing("notice",
                    recv.ctrl.request.topic_id,
                    recv.ctrl.request.topic_id + "번 방 입장",
                    recv.from.user_id,
                    recv.from.user_name,
                    undefined)
            }
        } else if (recv.ctrl.request.how === "leave") {
            if (recv.from.me) {
                Log("RECV " + msg, recv.ctrl.response.topic_id + ", " + recv.ctrl.response.topic_name + " 방 퇴장 성공")
                drawing("notice",
                    recv.ctrl.request.topic_id,
                    recv.ctrl.request.topic_id + "번 방 퇴장",
                    user_id,
                    user_name,
                    undefined)
            } else {
                Log("RECV " + msg, recv.ctrl.response.topic_id + ", " + recv.ctrl.response.topic_name + " 방 퇴장 성공")
                drawing("notice",
                    recv.ctrl.request.topic_id,
                    recv.ctrl.request.topic_id + "번 방 퇴장",
                    recv.from.user_id,
                    recv.from.user_name,
                    undefined)
            }

            if (recv.from.me) {
                TopicListDelete(recv.ctrl.request.topic_id)
                currentFocusTopic = undefined
            }
        } else if (recv.ctrl.request.how === "invite") {
            if (recv.from.me) {
                Log("RECV " + msg, recv.ctrl.request.topic_id + ", " + recv.ctrl.response.user_name + " 방 초대 성공")
                drawing("notice",
                    recv.ctrl.request.topic_id,
                    recv.ctrl.request.topic_id + "번 방 초대 성공",
                    recv.ctrl.request.user_id,
                    recv.ctrl.response.user_name,
                    undefined)
            } else {
                TopicAddChatRoom(recv.ctrl.request.topic_id, recv.ctrl.response.topic_name)
                Log("RECV " + msg, user_id + ", " + user_name + " 방 초대 받음")
                drawing("notice",
                    recv.ctrl.request.topic_id,
                    recv.ctrl.request.topic_id + "번 방 초대 받고 입장",
                    user_id,
                    user_name,
                    undefined)
            }
        } else {
            Log("RECV " + msg, "how type 없음")
        }
    } else {
        Log("RECV " + msg, "what type 없음")
    }
}