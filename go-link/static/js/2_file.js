let fileUploadBtn = document.getElementById("btnUpload");
let uploadForm = document.getElementById("uploadForm")
let fileDownloadForm = document.getElementById("fileDownloadForm")
let fileDownloadFileId = document.getElementById("fileDownloadFileId")

fileDownloadForm.onsubmit = function () {
    let fileId = 0
    if (fileDownloadFileId.value === undefined) {
        Status("file id 지정 안됨")
    } else {
        fileId = fileDownloadFileId.value
    }

    if (currentJwtToken === undefined) {
        Status("Jwt Token 설정 안됨")
    }

    $.ajax({
        type: "GET",
        url: "/api/v1/file/download/" + fileId,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + currentJwtToken)
        },
        complete: function (e, xhr, settings) {
            if (e.status === 200) {
                Log("RECV " + e.status + ", " + e.statusText + ", " + e.responseText, "파일 다운로드 성공")
            } else {
                Log("RECV " + e.status + ", " + e.statusText + ", " + e.responseText, "파일 다운로드 실패")
            }
        }
    });

    return false
}

fileUploadBtn.onclick = function (e) {
    e.preventDefault();

    if (currentFocusTopic === undefined) {
        Status("파일을 전송할 채팅방 선택 안됨")
    }

    if (currentJwtToken === undefined) {
        Status('jwt token 없음')
    }

    let form = $('#uploadForm')[0]
    let data = new FormData(form);

    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/api/v1/file/upload",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + currentJwtToken)
        },
        complete: function (e, xhr, settings) {
            if (e.status === 200) {
                Log("RECV " + e.status + ", " + e.statusText + ", " + e.responseText, "파일 업로드 성공")

                let res = JSON.parse(e.responseText)
                let topic_id = 0
                if (currentFocusTopic !== undefined) {
                    topic_id = currentFocusTopic
                }
                jsonSendFile(topic_id, res.file.response.file_id, res.file.response.mime)
            } else {
                Log("RECV " + e.status + ", " + e.statusText + ", " + e.responseText, "파일 업로드 실패")
            }
        }
    });
    return false
}
