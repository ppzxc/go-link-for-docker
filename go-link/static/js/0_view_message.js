let messagesKey = 0;
let messagesContainer = document.getElementById("messagesContainer");
let messagesUl = document.getElementById("messagesUl");

function addMessage(topicId, li) {
    let messageList = topicsMapObject.get(topicId)
    messageList.push(li)

    if (topicId === currentFocusTopic) {
        let doScroll = messagesContainer.scrollTop > messagesContainer.scrollHeight - messagesContainer.clientHeight - 1;
        messagesUl.appendChild(li);

        if (doScroll) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
        }
    }
}

function drawing(type, topic_id, message, from_user_id, from_user_name, file_id, mime, sequence_id) {
    messagesKey = messagesKey + 1;

    if (type === "notice") {
        addMessage(topic_id, drawingNotice(from_user_id, from_user_name, message))
    } else if (file_id === undefined) {
        addMessage(topic_id, drawingMessage(type, message, from_user_id, from_user_name, sequence_id, topic_id))
    } else {
        drawingFileDownload(type, topic_id, mime, from_user_id, from_user_name)
    }
}

function drawingMessage(type, message, from_user_id, from_user_name, sequence_id, topic_id) {
    // li.innerHTML = '<div class="bubble"><div class="message-content">' + message + '</div><span class="from">' + from_user_id + ', ' + from_user_name + '</span></div>'

    let content = document.createElement("div")
    content.className = "message-content"
    content.innerText = message

    let span = document.createElement("span")
    span.className = "from"
    span.innerText = "SID: " + sequence_id + " FROM ID: " + from_user_id + " NAME: " + from_user_name

    let bubble = document.createElement("div")
    bubble.className = "bubble"
    bubble.appendChild(content)
    bubble.appendChild(span)

    bubble.onclick = function () {
        let s = sequence_id
        let t = topic_id
        readAck(t, s)
    }

    // root
    let li = document.createElement("li");
    li.className = "ml " + type
    li.appendChild(bubble)
    return li
}

function drawingNotice(from_user_id, from_user_name, message) {
    let content = document.createElement("div")
    content.className = "message-content"
    content.innerText = from_user_id + ", " + from_user_name + ", " + message

    // root
    let li = document.createElement("li");
    li.className = "ml center"
    li.appendChild(content)
    return li
}

function drawingFileDownload(type, topicId, mime, from_user_id, from_user_name) {
    let li = document.createElement("li");

    $.ajax({
        type: "GET",
        url: "/api/v1/file/download/" + file_id,
        processData: false,
        contentType: false,
        // dataType: "binary",
        responseType: "blob",
        cache: false,
        timeout: 600000,
        beforeSend: function (xhr) {
            // xhr.responseType = 'blob'
            xhr.setRequestHeader("Authorization", "Bearer " + currentJwtToken)
        },
        success: function (e, xhr, settings) {
            Status("파일 다운로드 성공")
            // Log("RECV " + e)

            li.className = "ml " + type

            let div = document.createElement("div")
            div.className = "bubble"

            let div2 = document.createElement("div")
            div2.className = "message-content"

            let img = document.createElement('img')
            img.src = 'data:' + mime + ';base64,' + base64encode(e.responseText)
            img.alt = "embedded files"

            let span = document.createElement("span")
            span.className = "from"
            span.innerText = from_user_id + ", " + from_user_name

            div2.appendChild(img)
            div.appendChild(div2)
            div.appendChild(span)
            li.appendChild(div)
        },
        error: function (request, error) {
            Log("RECV " + request + ", " + error, "파일 다운로드 실패")
            li.className = "ml " + type
            li.innerHTML = '<div class="bubble"><div class="message-content">파일 다운로드 실패</div><span class="from">' + from_user_id + ', ' + from_user_name + '</span></div>'
        }
    });

    addMessage(topicId, li)
}