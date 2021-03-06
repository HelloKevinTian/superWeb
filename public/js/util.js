function j(a, b) {
    var c, d, g, k, l = e,
        m, n = b[a];
    n && typeof n == "object" && typeof n.toJSON == "function" && (n = n.toJSON(a));
    typeof h == "function" && (n = h.call(b, a, n));
    switch (typeof n) {
        case "string":
            return i(n);
        case "number":
            return isFinite(n) ? String(n) : "null";
        case "boolean":
        case "null":
            return String(n);
        case "object":
            if (!n) return "null";
            e += f;
            m = [];
            if (Object.prototype.toString.apply(n) === "[object Array]") {
                k = n.length;
                for (c = 0; c < k; c += 1) m[c] = j(c, n) || "null";
                g = m.length === 0 ? "[]" : e ? "[\n" + e + m.join(",\n" + e) + "\n" + l + "]" : "[" + m.join(",") + "]";
                e = l;
                return g
            }
            if (h && typeof h == "object") {
                k = h.length;
                for (c = 0; c < k; c += 1) {
                    d = h[c];
                    if (typeof d == "string") {
                        g = j(d, n);
                        g && m.push(i(d) + (e ? ": " : ":") + g)
                    }
                }
            } else
                for (d in n)
                    if (Object.hasOwnProperty.call(n, d)) {
                        g = j(d, n);
                        g && m.push(i(d) + (e ? ": " : ":") + g)
                    }
            g = m.length === 0 ? "{}" : e ? "{\n" + e + m.join(",\n" + e) + "\n" + l + "}" : "{" + m.join(",") + "}";
            e = l;
            return g
    }
}

function i(a) {
    d.lastIndex = 0;
    return d.test(a) ? '"' + a.replace(d, function(a) {
        var b = g[a];
        return typeof b == "string" ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
    }) + '"' : '"' + a + '"'
}

function b(a) {
    return a < 10 ? "0" + a : a
}
if (typeof Date.prototype.toJSON != "function") {
    Date.prototype.toJSON = function(a) {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + b(this.getUTCMonth() + 1) + "-" + b(this.getUTCDate()) + "T" + b(this.getUTCHours()) + ":" + b(this.getUTCMinutes()) + ":" + b(this.getUTCSeconds()) + "Z" : null
    };
    String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(a) {
        return this.valueOf()
    }
}
var c = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    d = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    e, f, g = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    },
    h;
var JsonFormat = function(a, b, c) {
    var d;
    e = "";
    f = "";
    if (typeof c == "number")
        for (d = 0; d < c; d += 1) f += " ";
    else typeof c == "string" && (f = c);
    h = b;
    if (!b || typeof b == "function" || typeof b == "object" && typeof b.length == "number") return j("", {
        "": a
    });
    throw new Error("JSON.stringify")
}

/**
 * 判断是否为正确的json格式
 */
var IsJson = function(str) {
    if (JSON.stringify(str).indexOf('{') === -1) {
        return false;
    }
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

var FormatDate = function(format, date) {
    var date = date || new Date();
    var format = format || 'yyyy/MM/dd hh:mm:ss';
    var o = {
        "M+": date.getMonth() + 1, //月
        "d+": date.getDate(), //日
        "h+": date.getHours(), //时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};