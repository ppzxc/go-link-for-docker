let friendsMapObject = new Map();
let friendsMapButtons = new Map();

let friendsDom = document.getElementById("friendsDom")

function AddFriends(users) {
    for (let i in users) {
        let index = parseInt(i)

        // add topicsMap
        friendsMapObject.set(users[index].user_id, [])

        let friend = document.createElement("button");
        friend.className = 'btn btn-secondary'
        friend.id = 'friend_' + users[index].user_id
        friend.innerHTML = '<div class="d-flex w-100 align-items-center justify-content-between">'
            + '<strong class="mb-1">' + users[index].user_name + '</strong>'
            + '<small>UID: ' + users[index].user_id + '</small>'
            + '</div>'

        friendsDom.appendChild(friend)
        friendsMapButtons.set(users[index].user_id, users[index])

        friend.onclick = function () {
            Status(users[index].user_id + ", " + users[index].user_name + ", 버튼 클릭 됨")
            // currentFocusTopic = topic_id
            //
            // let messageList = topicsMapObject.get(topic_id)
            // messagesUl.innerHTML = '';
            //
            // for (let i in messageList) {
            //     let doScroll = messagesContainer.scrollTop > messagesContainer.scrollHeight - messagesContainer.clientHeight - 1;
            //     messagesUl.appendChild(messageList[i]);
            //
            //     if (doScroll) {
            //         messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
            //     }
            // }
        }
    }
}
