let user_id;
let user_name;

let currentFocusTopic;

let currentJwtToken;

let topicsMapObject  = new Map();
let topicsMapButton = new Map();

let topicsDom = document.getElementById("topicsDom")

function TopicAddChatRoom(topic_id, topic_name) {
    if (topic_id === undefined) {
        Status("topic_id 없음, 채팅방 추가 실패")
        return false
    }

    if (topic_name === undefined) {
        Status("topic_name 없음")
    }

    // add topicsMap
    topicsMapObject.set(topic_id, [])


    let topic = document.createElement("button");
    topic.className = 'btn btn-secondary'
    topic.id = 'topic_' + topic_id
    topic.innerHTML = '<div class="d-flex w-100 align-items-center justify-content-between">'
        + '<strong class="mb-1">' + topic_name + '</strong>'
        + '<small>TID: ' + topic_id + '</small>'
        + '</div>'

    topicsDom.appendChild(topic)
    topicsMapButton.set(topic_id, topic)

    topic.onclick = function () {
        Status(topic_id + "번 방 선택됨")
        currentFocusTopic = topic_id

        let messageList = topicsMapObject.get(topic_id)
        messagesUl.innerHTML = '';

        for (let i in messageList) {
            let doScroll = messagesContainer.scrollTop > messagesContainer.scrollHeight - messagesContainer.clientHeight - 1;
            messagesUl.appendChild(messageList[i]);

            if (doScroll) {
                messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
            }
        }
    }
}

function TopicListDelete(id) {
    topicsMapObject.delete(id)
    topicsDom.removeChild(topicsMapButton.get(id))
    topicsMapButton.delete(id)
}