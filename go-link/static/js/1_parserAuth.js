function parseAuth(recv, msg) {
    if (recv.result === undefined) {
        Log("RECV " + msg, "auth result object 없음")
        return
    }

    if (recv.result.status_code !== 200) {
        Log("RECV " + msg, "auth status code 실패 코드")
        return
    }

    if (recv.from === undefined) {
        Log("RECV " + msg, "auth from == undefined")
        return
    }

    if (recv.auth.request.what === "jwt" && recv.auth.request.how === "select") {
        currentJwtToken = recv.auth.response.jwt_token
        Log("RECV " + msg, "auth [" + recv.auth.response.jwt_token + "] JWT TOKEN 저장 완료")
        return
    }

    if (recv.auth.request.how === "login") {
        user_id = recv.auth.response.user_id
        user_name = recv.auth.response.user_name

        Log("RECV " + msg, "auth 로그인 성공")
        let c = jsonMetaTopicRequestByMe()

        Log("AUTO SEND " + c, "auth 자동 참여된 방 정보 요청")
        Send(c)
    } else if (recv.auth.request.how === "logout") {
        user_id = undefined
        user_name = undefined
        currentFocusTopic = undefined
        currentJwtToken = undefined

        topicsMapObject.forEach((value, key, map) => TopicListDelete(key))

        while (messagesUl.hasChildNodes()) {
            messagesUl.removeChild(messagesUl.firstChild)
        }

        while (friendsDom.hasChildNodes()) {
            friendsDom.removeChild(friendsDom.firstChild)
        }

        Log("RECV " + msg, "auth 로그아웃 성공")
    } else {
        Log("RECV " + msg, "auth how type 없음")
    }
}