function base64encode(binary) {
    return btoa(unescape(encodeURIComponent(binary)));
}

function base64decode(base64) {
    return decodeURIComponent(escape(atob(base64)));
}

function strByteLength (s, b, i, c) {
    for (b = i = 0; c = s.charCodeAt(i++); b += c >> 11 ? 3 : c >> 7 ? 2 : 1) ;
    return b
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function defaultJsonObject(type) {
    let root = {}

    switch (type) {
        case "auth":
            root.auth = {}
            root.auth.uuid = uuidv4()
            root.auth.request = {}
            return root
        case "meta":
            root.meta = {}
            root.meta.uuid = uuidv4()
            root.meta.request = {}
            return root
        case "ctrl":
            root.ctrl = {}
            root.ctrl.uuid = uuidv4()
            root.ctrl.request = {}
            return root
        case "msg":
            root.msg = {}
            root.msg.uuid = uuidv4()
            root.msg.request = {}
            return root
        case "file":
            root.file = {}
            root.file.uuid = uuidv4()
            root.file.request = {}
            return root
        default:
            root.null = {}
            root.null.uuid = uuidv4()
            root.null.request = {}
    }
}