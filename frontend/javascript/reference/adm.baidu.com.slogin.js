//百度广告管家登录
//http://adm.baidu.com/home/common/js/slogin-89d78d4d06d4ecf3d5e6b0e645c196aa.js

var T, baidu = T = baidu || {
	version: "1.5.0"
};
baidu.guid = "$BAIDU$";
window[baidu.guid] = window[baidu.guid] || {};
baidu.ajax = baidu.ajax || {};
baidu.fn = baidu.fn || {};
baidu.fn.blank = function() {};
baidu.ajax.request = function(g, k) {
	var d = k || {},
		r = d.data || "",
		h = !(d.async === false),
		f = d.username || "",
		a = d.password || "",
		c = (d.method || "GET").toUpperCase(),
		b = d.headers || {},
		j = d.timeout || 0,
		l = {},
		o, s, i;

	function n() {
		if (i.readyState == 4) {
			try {
				var u = i.status
			} catch (t) {
				q("failure");
				return
			}
			q(u);
			if ((u >= 200 && u < 300) || u == 304 || u == 1223) {
				q("success")
			} else {
				q("failure")
			}
			window.setTimeout(function() {
				i.onreadystatechange = baidu.fn.blank;
				if (h) {
					i = null
				}
			}, 0)
		}
	}
	function m() {
		if (window.ActiveXObject) {
			try {
				return new ActiveXObject("Msxml2.XMLHTTP")
			} catch (t) {
				try {
					return new ActiveXObject("Microsoft.XMLHTTP")
				} catch (t) {}
			}
		}
		if (window.XMLHttpRequest) {
			return new XMLHttpRequest()
		}
	}
	function q(v) {
		v = "on" + v;
		var u = l[v],
			w = baidu.ajax[v];
		if (u) {
			if (o) {
				clearTimeout(o)
			}
			if (v != "onsuccess") {
				u(i)
			} else {
				try {
					i.responseText
				} catch (t) {
					return u(i)
				}
				u(i, i.responseText)
			}
		} else {
			if (w) {
				if (v == "onsuccess") {
					return
				}
				w(i)
			}
		}
	}
	for (s in d) {
		l[s] = d[s]
	}
	b["X-Requested-With"] = "XMLHttpRequest";
	try {
		i = m();
		if (c == "GET") {
			if (r) {
				g += (g.indexOf("?") >= 0 ? "&" : "?") + r;
				r = null
			}
			if (d.noCache) {
				g += (g.indexOf("?") >= 0 ? "&" : "?") + "b" + (+new Date) + "=1"
			}
		}
		if (f) {
			i.open(c, g, h, f, a)
		} else {
			i.open(c, g, h)
		}
		if (h) {
			i.onreadystatechange = n
		}
		if (c == "POST") {
			i.setRequestHeader("Content-Type", (b["Content-Type"] || "application/x-www-form-urlencoded"))
		}
		for (s in b) {
			if (b.hasOwnProperty(s)) {
				i.setRequestHeader(s, b[s])
			}
		}
		q("beforerequest");
		if (j) {
			o = setTimeout(function() {
				i.onreadystatechange = baidu.fn.blank;
				i.abort();
				q("timeout")
			}, j)
		}
		i.send(r);
		if (!h) {
			n()
		}
	} catch (p) {
		q("failure")
	}
	return i
};
baidu.url = baidu.url || {};
baidu.url.escapeSymbol = function(a) {
	return String(a).replace(/[#%&+=\/\\\ \　\f\r\n\t]/g, function(b) {
		return "%" + (256 + b.charCodeAt()).toString(16).substring(1).toUpperCase()
	})
};
baidu.ajax.form = function(a, c) {
	c = c || {};
	var g = a.elements,
		o = g.length,
		b = a.getAttribute("method"),
		f = a.getAttribute("action"),
		u = c.replacer ||
	function(v, i) {
		return v
	}, r = {}, t = [], m, q, s, n, d, h, j, l, k;

	function p(i, v) {
		t.push(i + "=" + v)
	}
	for (m in c) {
		if (c.hasOwnProperty(m)) {
			r[m] = c[m]
		}
	}
	for (m = 0; m < o; m++) {
		q = g[m];
		n = q.name;
		if (!q.disabled && n) {
			s = q.type;
			d = baidu.url.escapeSymbol(q.value);
			switch (s) {
			case "radio":
			case "checkbox":
				if (!q.checked) {
					break
				}
			case "textarea":
			case "text":
			case "password":
			case "hidden":
			case "select-one":
				p(n, u(d, n));
				break;
			case "select-multiple":
				h = q.options;
				l = h.length;
				for (j = 0; j < l; j++) {
					k = h[j];
					if (k.selected) {
						p(n, u(k.value, n))
					}
				}
				break
			}
		}
	}
	r.data = t.join("&");
	r.method = a.getAttribute("method") || "GET";
	return baidu.ajax.request(f, r)
};
baidu.ajax.get = function(b, a) {
	return baidu.ajax.request(b, {
		onsuccess: a
	})
};
baidu.ajax.post = function(b, c, a) {
	return baidu.ajax.request(b, {
		onsuccess: a,
		method: "POST",
		data: c
	})
};
baidu.array = baidu.array || {};
baidu.array.indexOf = function(f, b, d) {
	var a = f.length,
		c = b;
	d = d | 0;
	if (d < 0) {
		d = Math.max(0, a + d)
	}
	for (; d < a; d++) {
		if (d in f && f[d] === b) {
			return d
		}
	}
	return -1
};
baidu.array.contains = function(a, b) {
	return (baidu.array.indexOf(a, b) >= 0)
};
baidu.each = baidu.array.forEach = baidu.array.each = function(h, f, b) {
	var d, g, c, a = h.length;
	if ("function" == typeof f) {
		for (c = 0; c < a; c++) {
			g = h[c];
			d = f.call(b || h, g, c);
			if (d === false) {
				break
			}
		}
	}
	return h
};
baidu.array.empty = function(a) {
	a.length = 0
};
baidu.array.every = function(f, d, b) {
	var c = 0,
		a = f.length;
	for (; c < a; c++) {
		if (c in f && !d.call(b || f, f[c], c)) {
			return false
		}
	}
	return true
};
baidu.array.filter = function(j, g, d) {
	var c = [],
		b = 0,
		a = j.length,
		h, f;
	if ("function" == typeof g) {
		for (f = 0; f < a; f++) {
			h = j[f];
			if (true === g.call(d || j, h, f)) {
				c[b++] = h
			}
		}
	}
	return c
};
baidu.array.find = function(f, c) {
	var d, b, a = f.length;
	if ("function" == typeof c) {
		for (b = 0; b < a; b++) {
			d = f[b];
			if (true === c.call(f, d, b)) {
				return d
			}
		}
	}
	return null
};
baidu.array.hash = function(f, b) {
	var g = {},
		d = b && b.length,
		c = 0,
		a = f.length;
	for (; c < a; c++) {
		g[f[c]] = (d && d > c) ? b[c] : true
	}
	return g
};
baidu.array.lastIndexOf = function(d, b, c) {
	var a = d.length;
	c = c | 0;
	if (!c || c >= a) {
		c = a - 1
	}
	if (c < 0) {
		c += a
	}
	for (; c >= 0; c--) {
		if (c in d && d[c] === b) {
			return c
		}
	}
	return -1
};
baidu.array.map = function(g, f, b) {
	var d = [],
		c = 0,
		a = g.length;
	for (; c < a; c++) {
		d[c] = f.call(b || g, g[c], c)
	}
	return d
};
baidu.array.reduce = function(g, c, d) {
	var b = 0,
		a = g.length,
		f = 0;
	if (arguments.length < 3) {
		for (; b < a; b++) {
			d = g[b++];
			f = 1;
			break
		}
		if (!f) {
			return
		}
	}
	for (; b < a; b++) {
		if (b in g) {
			d = c(d, g[b], b, g)
		}
	}
	return d
};
baidu.array.remove = function(c, b) {
	var a = c.length;
	while (a--) {
		if (a in c && c[a] === b) {
			c.splice(a, 1)
		}
	}
	return c
};
baidu.array.removeAt = function(b, a) {
	return b.splice(a, 1)[0]
};
baidu.array.some = function(f, d, b) {
	var c = 0,
		a = f.length;
	for (; c < a; c++) {
		if (c in f && d.call(b || f, f[c], c)) {
			return true
		}
	}
	return false
};
baidu.array.unique = function(f, g) {
	var b = f.length,
		a = f.slice(0),
		d, c;
	if ("function" != typeof g) {
		g = function(i, h) {
			return i === h
		}
	}
	while (--b > 0) {
		c = a[b];
		d = b;
		while (d--) {
			if (g(c, a[d])) {
				a.splice(b, 1);
				break
			}
		}
	}
	return a
};
baidu.async = baidu.async || {};
baidu.object = baidu.object || {};
baidu.extend = baidu.object.extend = function(c, a) {
	for (var b in a) {
		if (a.hasOwnProperty(b)) {
			c[b] = a[b]
		}
	}
	return c
};
baidu.lang = baidu.lang || {};
baidu.lang.isFunction = function(a) {
	return "[object Function]" == Object.prototype.toString.call(a)
};
baidu.async._isDeferred = function(b) {
	var a = baidu.lang.isFunction;
	return b && a(b.success) && a(b.then) && a(b.fail) && a(b.cancel)
};
baidu.async.Deferred = function() {
	var b = this;
	baidu.extend(b, {
		_fired: 0,
		_firing: 0,
		_cancelled: 0,
		_resolveChain: [],
		_rejectChain: [],
		_result: [],
		_isError: 0
	});

	function a() {
		if (b._cancelled || b._firing) {
			return
		}
		if (b._nextDeferred) {
			b._nextDeferred.then(b._resolveChain[0], b._rejectChain[0]);
			return
		}
		b._firing = 1;
		var g = b._isError ? b._rejectChain : b._resolveChain,
			c = b._result[b._isError ? 1 : 0];
		while (g[0] && (!b._cancelled)) {
			try {
				var d = g.shift().call(b, c);
				if (baidu.async._isDeferred(d)) {
					b._nextDeferred = d;
					[].push.apply(d._resolveChain, b._resolveChain);
					[].push.apply(d._rejectChain, b._rejectChain);
					g = b._resolveChain = [];
					b._rejectChain = []
				}
			} catch (f) {
				throw f
			} finally {
				b._fired = 1;
				b._firing = 0
			}
		}
	}
	b.resolve = b.fireSuccess = function(c) {
		b._result[0] = c;
		a();
		return b
	};
	b.reject = b.fireFail = function(c) {
		b._result[1] = c;
		b._isError = 1;
		a();
		return b
	};
	b.then = function(c, d) {
		b._resolveChain.push(c);
		b._rejectChain.push(d);
		if (b._fired) {
			a()
		}
		return b
	};
	b.success = function(c) {
		return b.then(c, baidu.fn.blank)
	};
	b.fail = function(c) {
		return b.then(baidu.fn.blank, c)
	};
	b.cancel = function() {
		b._cancelled = 1
	}
};
baidu.async.get = function(b) {
	var a = new baidu.async.Deferred();
	baidu.ajax.request(b, {
		onsuccess: function(d, c) {
			a.resolve({
				xhr: d,
				responseText: c
			})
		},
		onfailure: function(c) {
			a.reject({
				xhr: c
			})
		}
	});
	return a
};
baidu.async.post = function(b, c) {
	var a = new baidu.async.Deferred();
	baidu.ajax.request(b, {
		method: "POST",
		data: c,
		onsuccess: function(f, d) {
			a.resolve({
				xhr: f,
				responseText: d
			})
		},
		onfailure: function(d) {
			a.reject({
				xhr: d
			})
		}
	});
	return a
};
baidu.async.when = function(c, b, d) {
	if (baidu.async._isDeferred(c)) {
		c.then(b, d);
		return c
	}
	var a = new baidu.async.Deferred();
	a.then(b, d).resolve(c);
	return a
};
baidu.browser = baidu.browser || {};
baidu.browser.chrome = /chrome\/(\d+\.\d+)/i.test(navigator.userAgent) ? +RegExp["\x241"] : undefined;
baidu.browser.firefox = /firefox\/(\d+\.\d+)/i.test(navigator.userAgent) ? +RegExp["\x241"] : undefined;
baidu.browser.ie = baidu.ie = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? (document.documentMode || +RegExp["\x241"]) : undefined;
baidu.browser.isGecko = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent);
baidu.browser.isStrict = document.compatMode == "CSS1Compat";
baidu.browser.isWebkit = /webkit/i.test(navigator.userAgent);
try {
	if (/(\d+\.\d+)/.test(external.max_version)) {
		baidu.browser.maxthon = +RegExp["\x241"]
	}
} catch (e) {}
baidu.browser.opera = /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(navigator.userAgent) ? +(RegExp["\x246"] || RegExp["\x242"]) : undefined;
(function() {
	var a = navigator.userAgent;
	baidu.browser.safari = /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(a) && !/chrome/i.test(a) ? +(RegExp["\x241"] || RegExp["\x242"]) : undefined
})();
baidu.cookie = baidu.cookie || {};
baidu.cookie._isValidKey = function(a) {
	return (new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+\x24')).test(a)
};
baidu.cookie.getRaw = function(b) {
	if (baidu.cookie._isValidKey(b)) {
		var c = new RegExp("(^| )" + b + "=([^;]*)(;|\x24)"),
			a = c.exec(document.cookie);
		if (a) {
			return a[2] || null
		}
	}
	return null
};
baidu.cookie.get = function(a) {
	var b = baidu.cookie.getRaw(a);
	if ("string" == typeof b) {
		b = decodeURIComponent(b);
		return b
	}
	return null
};
baidu.cookie.setRaw = function(c, d, b) {
	if (!baidu.cookie._isValidKey(c)) {
		return
	}
	b = b || {};
	var a = b.expires;
	if ("number" == typeof b.expires) {
		a = new Date();
		a.setTime(a.getTime() + b.expires)
	}
	document.cookie = c + "=" + d + (b.path ? "; path=" + b.path : "") + (a ? "; expires=" + a.toGMTString() : "") + (b.domain ? "; domain=" + b.domain : "") + (b.secure ? "; secure" : "")
};
baidu.cookie.remove = function(b, a) {
	a = a || {};
	a.expires = new Date(0);
	baidu.cookie.setRaw(b, "", a)
};
baidu.cookie.set = function(b, c, a) {
	baidu.cookie.setRaw(b, encodeURIComponent(c), a)
};
baidu.date = baidu.date || {};
baidu.number = baidu.number || {};
baidu.number.pad = function(d, c) {
	var f = "",
		b = (d < 0),
		a = String(Math.abs(d));
	if (a.length < c) {
		f = (new Array(c - a.length + 1)).join("0")
	}
	return (b ? "-" : "") + f + a
};
baidu.date.format = function(a, g) {
	if ("string" != typeof g) {
		return a.toString()
	}
	function d(m, l) {
		g = g.replace(m, l)
	}
	var b = baidu.number.pad,
		h = a.getFullYear(),
		f = a.getMonth() + 1,
		k = a.getDate(),
		i = a.getHours(),
		c = a.getMinutes(),
		j = a.getSeconds();
	d(/yyyy/g, b(h, 4));
	d(/yy/g, b(parseInt(h.toString().slice(2), 10), 2));
	d(/MM/g, b(f, 2));
	d(/M/g, f);
	d(/dd/g, b(k, 2));
	d(/d/g, k);
	d(/HH/g, b(i, 2));
	d(/H/g, i);
	d(/hh/g, b(i % 12, 2));
	d(/h/g, i % 12);
	d(/mm/g, b(c, 2));
	d(/m/g, c);
	d(/ss/g, b(j, 2));
	d(/s/g, j);
	return g
};
baidu.date.parse = function(c) {
	var a = new RegExp("^\\d+(\\-|\\/)\\d+(\\-|\\/)\\d+\x24");
	if ("string" == typeof c) {
		if (a.test(c) || isNaN(Date.parse(c))) {
			var g = c.split(/ |T/),
				b = g.length > 1 ? g[1].split(/[^\d]/) : [0, 0, 0],
				f = g[0].split(/[^\d]/);
			return new Date(f[0] - 0, f[1] - 1, f[2] - 0, b[0] - 0, b[1] - 0, b[2] - 0)
		} else {
			return new Date(c)
		}
	}
	return new Date()
};
baidu.dom = baidu.dom || {};
baidu.dom._NAME_ATTRS = (function() {
	var a = {
		cellpadding: "cellPadding",
		cellspacing: "cellSpacing",
		colspan: "colSpan",
		rowspan: "rowSpan",
		valign: "vAlign",
		usemap: "useMap",
		frameborder: "frameBorder"
	};
	if (baidu.browser.ie < 8) {
		a["for"] = "htmlFor";
		a["class"] = "className"
	} else {
		a.htmlFor = "for";
		a.className = "class"
	}
	return a
})();
baidu.lang.isString = function(a) {
	return "[object String]" == Object.prototype.toString.call(a)
};
baidu.isString = baidu.lang.isString;
baidu.dom._g = function(a) {
	if (baidu.lang.isString(a)) {
		return document.getElementById(a)
	}
	return a
};
baidu._g = baidu.dom._g;
baidu.dom.g = function(a) {
	if ("string" == typeof a || a instanceof String) {
		return document.getElementById(a)
	} else {
		if (a && a.nodeName && (a.nodeType == 1 || a.nodeType == 9)) {
			return a
		}
	}
	return null
};
baidu.g = baidu.G = baidu.dom.g;
baidu.dom._matchNode = function(a, c, d) {
	a = baidu.dom.g(a);
	for (var b = a[d]; b; b = b[c]) {
		if (b.nodeType == 1) {
			return b
		}
	}
	return null
};
baidu.dom._styleFilter = baidu.dom._styleFilter || [];
baidu.dom._styleFilter[baidu.dom._styleFilter.length] = {
	get: function(c, d) {
		if (/color/i.test(c) && d.indexOf("rgb(") != -1) {
			var f = d.split(",");
			d = "#";
			for (var b = 0, a; a = f[b]; b++) {
				a = parseInt(a.replace(/[^\d]/gi, ""), 10).toString(16);
				d += a.length == 1 ? "0" + a : a
			}
			d = d.toUpperCase()
		}
		return d
	}
};
baidu.dom._styleFilter.filter = function(b, f, g) {
	for (var a = 0, d = baidu.dom._styleFilter, c; c = d[a]; a++) {
		if (c = c[g]) {
			f = c(b, f)
		}
	}
	return f
};
baidu.dom._styleFilter[baidu.dom._styleFilter.length] = {
	set: function(a, b) {
		if (b.constructor == Number && !/zIndex|fontWeight|opacity|zoom|lineHeight/i.test(a)) {
			b = b + "px"
		}
		return b
	}
};
baidu.dom._styleFixer = baidu.dom._styleFixer || {};
baidu.dom._styleFixer.display = baidu.browser.ie && baidu.browser.ie < 8 ? {
	set: function(a, b) {
		a = a.style;
		if (b == "inline-block") {
			a.display = "inline";
			a.zoom = 1
		} else {
			a.display = b
		}
	}
} : baidu.browser.firefox && baidu.browser.firefox < 3 ? {
	set: function(a, b) {
		a.style.display = b == "inline-block" ? "-moz-inline-box" : b
	}
} : null;
baidu.dom._styleFixer["float"] = baidu.browser.ie ? "styleFloat" : "cssFloat";
baidu.dom._styleFixer.opacity = baidu.browser.ie ? {
	get: function(a) {
		var b = a.style.filter;
		return b && b.indexOf("opacity=") >= 0 ? (parseFloat(b.match(/opacity=([^)]*)/)[1]) / 100) + "" : "1"
	},
	set: function(a, c) {
		var b = a.style;
		b.filter = (b.filter || "").replace(/alpha\([^\)]*\)/gi, "") + (c == 1 ? "" : "alpha(opacity=" + c * 100 + ")");
		b.zoom = 1
	}
} : null;
baidu.dom.getDocument = function(a) {
	a = baidu.dom.g(a);
	return a.nodeType == 9 ? a : a.ownerDocument || a.document
};
baidu.dom.getComputedStyle = function(b, a) {
	b = baidu.dom._g(b);
	var d = baidu.dom.getDocument(b),
		c;
	if (d.defaultView && d.defaultView.getComputedStyle) {
		c = d.defaultView.getComputedStyle(b, null);
		if (c) {
			return c[a] || c.getPropertyValue(a)
		}
	}
	return ""
};
baidu.string = baidu.string || {};
baidu.string.toCamelCase = function(a) {
	if (a.indexOf("-") < 0 && a.indexOf("_") < 0) {
		return a
	}
	return a.replace(/[-_][^-_]/g, function(b) {
		return b.charAt(1).toUpperCase()
	})
};
baidu.dom.getStyle = function(c, b) {
	var f = baidu.dom;
	c = f.g(c);
	b = baidu.string.toCamelCase(b);
	var d = c.style[b] || (c.currentStyle ? c.currentStyle[b] : "") || f.getComputedStyle(c, b);
	if (!d) {
		var a = f._styleFixer[b];
		if (a) {
			d = a.get ? a.get(c) : baidu.dom.getStyle(c, a)
		}
	}
	if (a = f._styleFilter) {
		d = a.filter(b, d, "get")
	}
	return d
};
baidu.getStyle = baidu.dom.getStyle;
baidu.dom._styleFixer.textOverflow = (function() {
	var b = {};

	function a(f) {
		var g = f.length;
		if (g > 0) {
			g = f[g - 1];
			f.length--
		} else {
			g = null
		}
		return g
	}
	function c(f, g) {
		f[baidu.browser.firefox ? "textContent" : "innerText"] = g
	}
	function d(n, j, t) {
		var l = baidu.browser.ie ? n.currentStyle || n.style : getComputedStyle(n, null),
			s = l.fontWeight,
			r = "font-family:" + l.fontFamily + ";font-size:" + l.fontSize + ";word-spacing:" + l.wordSpacing + ";font-weight:" + ((parseInt(s) || 0) == 401 ? 700 : s) + ";font-style:" + l.fontStyle + ";font-variant:" + l.fontVariant,
			f = b[r];
		if (!f) {
			l = n.appendChild(document.createElement("div"));
			l.style.cssText = "float:left;" + r;
			f = b[r] = [];
			for (var p = 0; p < 256; p++) {
				p == 32 ? (l.innerHTML = "&nbsp;") : c(l, String.fromCharCode(p));
				f[p] = l.offsetWidth
			}
			c(l, "\u4e00");
			f[256] = l.offsetWidth;
			c(l, "\u4e00\u4e00");
			f[257] = l.offsetWidth - f[256] * 2;
			f[258] = f[".".charCodeAt(0)] * 3 + f[257] * 3;
			n.removeChild(l)
		}
		for (var m = n.firstChild, q = f[256], h = f[257], g = f[258], v = [], t = t ? g : 0; m; m = m.nextSibling) {
			if (j < t) {
				n.removeChild(m)
			} else {
				if (m.nodeType == 3) {
					for (var p = 0, u = m.nodeValue, k = u.length; p < k; p++) {
						l = u.charCodeAt(p);
						v[v.length] = [j, m, p];
						j -= (p ? h : 0) + (l < 256 ? f[l] : q);
						if (j < t) {
							break
						}
					}
				} else {
					l = m.tagName;
					if (l == "IMG" || l == "TABLE") {
						l = m;
						m = m.previousSibling;
						n.removeChild(l)
					} else {
						v[v.length] = [j, m];
						j -= m.offsetWidth
					}
				}
			}
		}
		if (j < t) {
			while (l = a(v)) {
				j = l[0];
				m = l[1];
				l = l[2];
				if (m.nodeType == 3) {
					if (j >= g) {
						m.nodeValue = m.nodeValue.substring(0, l) + "...";
						return true
					} else {
						if (!l) {
							n.removeChild(m)
						}
					}
				} else {
					if (d(m, j, true)) {
						return true
					} else {
						n.removeChild(m)
					}
				}
			}
			n.innerHTML = ""
		}
	}
	return {
		get: function(h) {
			var g = baidu.browser,
				f = dom.getStyle;
			return (g.opera ? f("OTextOverflow") : g.firefox ? h._baiduOverflow : f("textOverflow")) || "clip"
		},
		set: function(g, i) {
			var f = baidu.browser;
			if (g.tagName == "TD" || g.tagName == "TH" || f.firefox) {
				g._baiduHTML && (g.innerHTML = g._baiduHTML);
				if (i == "ellipsis") {
					g._baiduHTML = g.innerHTML;
					var j = document.createElement("div"),
						h = g.appendChild(j).offsetWidth;
					g.removeChild(j);
					d(g, h)
				} else {
					g._baiduHTML = ""
				}
			}
			j = g.style;
			f.opera ? (j.OTextOverflow = i) : f.firefox ? (g._baiduOverflow = i) : (j.textOverflow = i)
		}
	}
})();
(function() {
	var a = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g");
	baidu.string.trim = function(b) {
		return String(b).replace(a, "")
	}
})();
baidu.trim = baidu.string.trim;
baidu.dom.addClass = function(g, h) {
	g = baidu.dom.g(g);
	var b = h.split(/\s+/),
		a = g.className,
		f = " " + a + " ",
		d = 0,
		c = b.length;
	for (; d < c; d++) {
		if (f.indexOf(" " + b[d] + " ") < 0) {
			a += (a ? " " : "") + b[d]
		}
	}
	g.className = a;
	return g
};
baidu.addClass = baidu.dom.addClass;
baidu.dom.children = function(b) {
	b = baidu.dom.g(b);
	for (var a = [], c = b.firstChild; c; c = c.nextSibling) {
		if (c.nodeType == 1) {
			a.push(c)
		}
	}
	return a
};
baidu.dom.contains = function(a, b) {
	var c = baidu.dom._g;
	a = c(a);
	b = c(b);
	return a.contains ? a != b && a.contains(b) : !! (a.compareDocumentPosition(b) & 16)
};
baidu.dom.setAttr = function(b, a, c) {
	b = baidu.dom.g(b);
	if ("style" == a) {
		b.style.cssText = c
	} else {
		a = baidu.dom._NAME_ATTRS[a] || a;
		b.setAttribute(a, c)
	}
	return b
};
baidu.setAttr = baidu.dom.setAttr;
baidu.dom.setAttrs = function(c, a) {
	c = baidu.dom.g(c);
	for (var b in a) {
		baidu.dom.setAttr(c, b, a[b])
	}
	return c
};
baidu.setAttrs = baidu.dom.setAttrs;
baidu.dom.create = function(c, a) {
	var d = document.createElement(c),
		b = a || {};
	return baidu.dom.setAttrs(d, b)
};
(function() {
	var a = window[baidu.guid];
	baidu.lang.guid = function() {
		return "TANGRAM__" + (a._counter++).toString(36)
	};
	a._counter = a._counter || 1
})();
window[baidu.guid]._instances = window[baidu.guid]._instances || {};
baidu.lang.Class = function(a) {
	this.guid = a || baidu.lang.guid();
	window[baidu.guid]._instances[this.guid] = this
};
window[baidu.guid]._instances = window[baidu.guid]._instances || {};
baidu.lang.Class.prototype.dispose = function() {
	delete window[baidu.guid]._instances[this.guid];
	for (var a in this) {
		if (!baidu.lang.isFunction(this[a])) {
			delete this[a]
		}
	}
	this.disposed = true
};
baidu.lang.Class.prototype.toString = function() {
	return "[object " + (this._className || "Object") + "]"
};
baidu.lang.Event = function(a, b) {
	this.type = a;
	this.returnValue = true;
	this.target = b || null;
	this.currentTarget = null
};
baidu.lang.Class.prototype.addEventListener = function(d, c, b) {
	if (!baidu.lang.isFunction(c)) {
		return
	}!this.__listeners && (this.__listeners = {});
	var a = this.__listeners,
		f;
	if (typeof b == "string" && b) {
		if (/[^\w\-]/.test(b)) {
			throw ("nonstandard key:" + b)
		} else {
			c.hashCode = b;
			f = b
		}
	}
	d.indexOf("on") != 0 && (d = "on" + d);
	typeof a[d] != "object" && (a[d] = {});
	f = f || baidu.lang.guid();
	c.hashCode = f;
	a[d][f] = c
};
baidu.lang.Class.prototype.removeEventListener = function(d, c) {
	if (typeof c != "undefined") {
		if ((baidu.lang.isFunction(c) && !(c = c.hashCode)) || (!baidu.lang.isString(c))) {
			return
		}
	}!this.__listeners && (this.__listeners = {});
	d.indexOf("on") != 0 && (d = "on" + d);
	var b = this.__listeners;
	if (!b[d]) {
		return
	}
	if (typeof c != "undefined") {
		b[d][c] && delete b[d][c]
	} else {
		for (var a in b[d]) {
			delete b[d][a]
		}
	}
};
baidu.lang.Class.prototype.dispatchEvent = function(d, a) {
	if (baidu.lang.isString(d)) {
		d = new baidu.lang.Event(d)
	}!this.__listeners && (this.__listeners = {});
	a = a || {};
	for (var c in a) {
		d[c] = a[c]
	}
	var c, b = this.__listeners,
		f = d.type;
	d.target = d.target || this;
	d.currentTarget = this;
	f.indexOf("on") != 0 && (f = "on" + f);
	baidu.lang.isFunction(this[f]) && this[f].apply(this, arguments);
	if (typeof b[f] == "object") {
		for (c in b[f]) {
			b[f][c].apply(this, arguments)
		}
	}
	return d.returnValue
};
baidu.lang.createSingle = function(b) {
	var d = new baidu.lang.Class();
	for (var a in b) {
		d[a] = b[a]
	}
	return d
};
baidu.dom.ddManager = baidu.lang.createSingle({
	_targetsDroppingOver: {}
});
baidu.event = baidu.event || {};
baidu.event._listeners = baidu.event._listeners || [];
baidu.event.on = function(b, f, h) {
	f = f.replace(/^on/i, "");
	b = baidu.dom._g(b);
	var g = function(j) {
			h.call(b, j)
		},
		a = baidu.event._listeners,
		d = baidu.event._eventFilter,
		i, c = f;
	f = f.toLowerCase();
	if (d && d[f]) {
		i = d[f](b, f, g);
		c = i.type;
		g = i.listener
	}
	if (b.addEventListener) {
		b.addEventListener(c, g, false)
	} else {
		if (b.attachEvent) {
			b.attachEvent("on" + c, g)
		}
	}
	a[a.length] = [b, f, h, g, c];
	return b
};
baidu.on = baidu.event.on;
baidu.event.un = function(c, g, b) {
	c = baidu.dom._g(c);
	g = g.replace(/^on/i, "").toLowerCase();
	var j = baidu.event._listeners,
		d = j.length,
		f = !b,
		i, h, a;
	while (d--) {
		i = j[d];
		if (i[1] === g && i[0] === c && (f || i[2] === b)) {
			h = i[4];
			a = i[3];
			if (c.removeEventListener) {
				c.removeEventListener(h, a, false)
			} else {
				if (c.detachEvent) {
					c.detachEvent("on" + h, a)
				}
			}
			j.splice(d, 1)
		}
	}
	return c
};
baidu.un = baidu.event.un;
baidu.event.preventDefault = function(a) {
	if (a.preventDefault) {
		a.preventDefault()
	} else {
		a.returnValue = false
	}
};
baidu.page = baidu.page || {};
baidu.page.getScrollTop = function() {
	var a = document;
	return window.pageYOffset || a.documentElement.scrollTop || a.body.scrollTop
};
baidu.page.getScrollLeft = function() {
	var a = document;
	return window.pageXOffset || a.documentElement.scrollLeft || a.body.scrollLeft
};
(function() {
	baidu.page.getMousePosition = function() {
		return {
			x: baidu.page.getScrollLeft() + a.x,
			y: baidu.page.getScrollTop() + a.y
		}
	};
	var a = {
		x: 0,
		y: 0
	};
	baidu.event.on(document, "onmousemove", function(b) {
		b = window.event || b;
		a.x = b.clientX;
		a.y = b.clientY
	})
})();
baidu.dom.getPosition = function(a) {
	a = baidu.dom.g(a);
	var k = baidu.dom.getDocument(a),
		d = baidu.browser,
		h = baidu.dom.getStyle,
		c = d.isGecko > 0 && k.getBoxObjectFor && h(a, "position") == "absolute" && (a.style.top === "" || a.style.left === ""),
		i = {
			left: 0,
			top: 0
		},
		g = (d.ie && !d.isStrict) ? k.body : k.documentElement,
		l, b;
	if (a == g) {
		return i
	}
	if (a.getBoundingClientRect) {
		b = a.getBoundingClientRect();
		i.left = Math.floor(b.left) + Math.max(k.documentElement.scrollLeft, k.body.scrollLeft);
		i.top = Math.floor(b.top) + Math.max(k.documentElement.scrollTop, k.body.scrollTop);
		i.left -= k.documentElement.clientLeft;
		i.top -= k.documentElement.clientTop;
		var j = k.body,
			m = parseInt(h(j, "borderLeftWidth")),
			f = parseInt(h(j, "borderTopWidth"));
		if (d.ie && !d.isStrict) {
			i.left -= isNaN(m) ? 2 : m;
			i.top -= isNaN(f) ? 2 : f
		}
	} else {
		l = a;
		do {
			i.left += l.offsetLeft;
			i.top += l.offsetTop;
			if (d.isWebkit > 0 && h(l, "position") == "fixed") {
				i.left += k.body.scrollLeft;
				i.top += k.body.scrollTop;
				break
			}
			l = l.offsetParent
		} while (l && l != a);
		if (d.opera > 0 || (d.isWebkit > 0 && h(a, "position") == "absolute")) {
			i.top -= k.body.offsetTop
		}
		l = a.offsetParent;
		while (l && l != k.body) {
			i.left -= l.scrollLeft;
			if (!d.opera || l.tagName != "TR") {
				i.top -= l.scrollTop
			}
			l = l.offsetParent
		}
	}
	return i
};
(function() {
	var n, m, h, f, q, i, r, a, p, g = baidu.lang.isFunction,
		d, k, c;
	baidu.dom.drag = function(t, s) {
		p = a = null;
		if (!(n = baidu.dom.g(t))) {
			return false
		}
		m = baidu.object.extend({
			autoStop: true,
			capture: true,
			interval: 16,
			handler: n
		}, s);
		k = baidu.dom.getPosition(n.offsetParent);
		c = baidu.dom.getPosition(n);
		if (baidu.getStyle(n, "position") == "absolute") {
			q = c.top - (n.offsetParent == document.body ? 0 : k.top);
			i = c.left - (n.offsetParent == document.body ? 0 : k.left)
		} else {
			q = parseFloat(baidu.getStyle(n, "top")) || -parseFloat(baidu.getStyle(n, "bottom")) || 0;
			i = parseFloat(baidu.getStyle(n, "left")) || -parseFloat(baidu.getStyle(n, "right")) || 0
		}
		if (m.mouseEvent) {
			h = baidu.page.getScrollLeft() + m.mouseEvent.clientX;
			f = baidu.page.getScrollTop() + m.mouseEvent.clientY
		} else {
			var u = baidu.page.getMousePosition();
			h = u.x;
			f = u.y
		}
		m.autoStop && baidu.event.on(m.handler, "mouseup", o);
		m.autoStop && baidu.event.on(window, "mouseup", o);
		baidu.event.on(document, "selectstart", j);
		if (m.capture && m.handler.setCapture) {
			m.handler.setCapture()
		} else {
			if (m.capture && window.captureEvents) {
				window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP)
			}
		}
		r = document.body.style.MozUserSelect;
		document.body.style.MozUserSelect = "none";
		if (g(m.ondragstart)) {
			m.ondragstart(n, m)
		}
		d = setInterval(b, m.interval);
		return {
			stop: o,
			update: l
		}
	};

	function l(s) {
		baidu.extend(m, s)
	}
	function o() {
		clearInterval(d);
		if (m.capture && m.handler.releaseCapture) {
			m.handler.releaseCapture()
		} else {
			if (m.capture && window.releaseEvents) {
				window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP)
			}
		}
		document.body.style.MozUserSelect = r;
		baidu.event.un(document, "selectstart", j);
		m.autoStop && baidu.event.un(m.handler, "mouseup", o);
		m.autoStop && baidu.event.un(window, "mouseup", o);
		if (g(m.ondragend)) {
			m.ondragend(n, m)
		}
	}
	function b(w) {
		var s = m.range,
			v = baidu.page.getMousePosition(),
			t = i + v.x - h,
			u = q + v.y - f;
		if (typeof s == "object" && s && s.length == 4) {
			t = Math.max(s[3], t);
			t = Math.min(s[1] - n.offsetWidth, t);
			u = Math.max(s[0], u);
			u = Math.min(s[2] - n.offsetHeight, u)
		}
		n.style.top = u + "px";
		n.style.left = t + "px";
		if ((a !== t || p !== u) && (a !== null || p !== null)) {
			if (g(m.ondrag)) {
				m.ondrag(n, m)
			}
		}
		a = t;
		p = u
	}
	function j(s) {
		return baidu.event.preventDefault(s, false)
	}
})();
baidu.dom.setStyle = function(c, b, d) {
	var f = baidu.dom,
		a;
	c = f.g(c);
	b = baidu.string.toCamelCase(b);
	if (a = f._styleFilter) {
		d = a.filter(b, d, "set")
	}
	a = f._styleFixer[b];
	(a && a.set) ? a.set(c, d) : (c.style[a || b] = d);
	return c
};
baidu.setStyle = baidu.dom.setStyle;
baidu.dom.draggable = function(b, l) {
	l = baidu.object.extend({
		toggle: function() {
			return true
		}
	}, l || {});
	l.autoStop = true;
	b = baidu.dom.g(b);
	l.handler = l.handler || b;
	var a, j = ["ondragstart", "ondrag", "ondragend"],
		c = j.length - 1,
		d, k, g = {
			dispose: function() {
				k && k.stop();
				baidu.event.un(l.handler, "onmousedown", h);
				baidu.lang.Class.prototype.dispose.call(g)
			}
		},
		f = this;
	if (a = baidu.dom.ddManager) {
		for (; c >= 0; c--) {
			d = j[c];
			l[d] = (function(i) {
				var m = l[i];
				return function() {
					baidu.lang.isFunction(m) && m.apply(f, arguments);
					a.dispatchEvent(i, {
						DOM: b
					})
				}
			})(d)
		}
	}
	if (b) {
		function h(m) {
			var i = l.mouseEvent = window.event || m;
			if (i.button > 1 || (baidu.lang.isFunction(l.toggle) && !l.toggle())) {
				return
			}
			if (baidu.dom.getStyle(b, "position") == "static") {
				baidu.dom.setStyle(b, "position", "relative")
			}
			if (baidu.lang.isFunction(l.onbeforedragstart)) {
				l.onbeforedragstart(b)
			}
			k = baidu.dom.drag(b, l);
			g.stop = k.stop;
			g.update = k.update;
			baidu.event.preventDefault(i)
		}
		baidu.event.on(l.handler, "onmousedown", h)
	}
	return {
		cancel: function() {
			g.dispose()
		}
	}
};
baidu.dom.intersect = function(j, i) {
	var h = baidu.dom.g,
		f = baidu.dom.getPosition,
		a = Math.max,
		c = Math.min;
	j = h(j);
	i = h(i);
	var d = f(j),
		b = f(i);
	return a(d.left, b.left) <= c(d.left + j.offsetWidth, b.left + i.offsetWidth) && a(d.top, b.top) <= c(d.top + j.offsetHeight, b.top + i.offsetHeight)
};
baidu.dom.droppable = function(f, c) {
	c = c || {};
	var d = baidu.dom.ddManager,
		h = baidu.dom.g(f),
		b = baidu.lang.guid(),
		g = function(k) {
			var j = d._targetsDroppingOver,
				i = {
					trigger: k.DOM,
					reciever: h
				};
			if (baidu.dom.intersect(h, k.DOM)) {
				if (!j[b]) {
					(typeof c.ondropover == "function") && c.ondropover.call(h, i);
					d.dispatchEvent("ondropover", i);
					j[b] = true
				}
			} else {
				if (j[b]) {
					(typeof c.ondropout == "function") && c.ondropout.call(h, i);
					d.dispatchEvent("ondropout", i)
				}
				delete j[b]
			}
		},
		a = function(j) {
			var i = {
				trigger: j.DOM,
				reciever: h
			};
			if (baidu.dom.intersect(h, j.DOM)) {
				typeof c.ondrop == "function" && c.ondrop.call(h, i);
				d.dispatchEvent("ondrop", i)
			}
			delete d._targetsDroppingOver[b]
		};
	d.addEventListener("ondrag", g);
	d.addEventListener("ondragend", a);
	return {
		cancel: function() {
			d.removeEventListener("ondrag", g);
			d.removeEventListener("ondragend", a)
		}
	}
};
baidu.dom.empty = function(a) {
	a = baidu.dom.g(a);
	while (a.firstChild) {
		a.removeChild(a.firstChild)
	}
	return a
};
baidu.dom.first = function(a) {
	return baidu.dom._matchNode(a, "nextSibling", "firstChild")
};
baidu.dom.getAttr = function(b, a) {
	b = baidu.dom.g(b);
	if ("style" == a) {
		return b.style.cssText
	}
	a = baidu.dom._NAME_ATTRS[a] || a;
	return b.getAttribute(a)
};
baidu.getAttr = baidu.dom.getAttr;
baidu.dom.setStyles = function(b, c) {
	b = baidu.dom.g(b);
	for (var a in c) {
		baidu.dom.setStyle(b, a, c[a])
	}
	return b
};
baidu.setStyles = baidu.dom.setStyles;
baidu.page.getViewHeight = function() {
	var b = document,
		a = b.compatMode == "BackCompat" ? b.body : b.documentElement;
	return a.clientHeight
};
baidu.page.getViewWidth = function() {
	var b = document,
		a = b.compatMode == "BackCompat" ? b.body : b.documentElement;
	return a.clientWidth
};
baidu.dom.fixable = function(a, b) {
	var u = baidu.g(a),
		p = baidu.browser.ie && baidu.browser.ie <= 7 ? true : false,
		k = b.vertival || "top",
		s = b.horizontal || "left",
		r = typeof b.autofix != "undefined" ? b.autofix : true,
		j, d, i = false,
		m = b.onrender || new Function(),
		c = b.onupdate || new Function(),
		l = b.onrelease || new Function();
	if (!u) {
		return
	}
	j = h();
	d = {
		y: p ? (j.position == "static" ? baidu.dom.getPosition(u).top : baidu.dom.getPosition(u).top - baidu.dom.getPosition(u.parentNode).top) : u.offsetTop,
		x: p ? (j.position == "static" ? baidu.dom.getPosition(u).left : baidu.dom.getPosition(u).left - baidu.dom.getPosition(u.parentNode).left) : u.offsetLeft
	};
	baidu.extend(d, b.offset || {});
	r && t();

	function q() {
		return {
			top: k == "top" ? d.y : baidu.page.getViewHeight() - d.y - j.height,
			left: s == "left" ? d.x : baidu.page.getViewWidth() - d.x - j.width
		}
	}
	function n() {
		var v = q();
		u.style.setExpression("left", "eval((document.body.scrollLeft || document.documentElement.scrollLeft) + " + v.left + ") + 'px'");
		u.style.setExpression("top", "eval((document.body.scrollTop || document.documentElement.scrollTop) + " + v.top + ") + 'px'")
	}
	function h() {
		var v = {
			position: baidu.getStyle(u, "position"),
			height: function() {
				var w = baidu.getStyle(u, "height");
				return (w != "auto") ? (/\d+/.exec(w)[0]) : u.offsetHeight
			}(),
			width: function() {
				var x = baidu.getStyle(u, "width");
				return (x != "auto") ? (/\d+/.exec(x)[0]) : u.offsetWidth
			}()
		};
		f("top", v);
		f("left", v);
		f("bottom", v);
		f("right", v);
		return v
	}
	function f(w, x) {
		var v;
		if (x.position == "static") {
			x[w] = ""
		} else {
			v = baidu.getStyle(u, w);
			if (v == "auto" || v == "0px") {
				x[w] = ""
			} else {
				x[w] = v
			}
		}
	}
	function t() {
		if (i) {
			return
		}
		baidu.setStyles(u, {
			top: "",
			left: "",
			bottom: "",
			right: ""
		});
		if (!p) {
			var v = {
				position: "fixed"
			};
			v[k == "top" ? "top" : "bottom"] = d.y + "px";
			v[s == "left" ? "left" : "right"] = d.x + "px";
			baidu.setStyles(u, v)
		} else {
			baidu.setStyle(u, "position", "absolute");
			n()
		}
		m();
		i = true
	}
	function o() {
		if (!i) {
			return
		}
		var v = {
			position: j.position,
			left: j.left == "" ? "auto" : j.left,
			top: j.top == "" ? "auto" : j.top,
			bottom: j.bottom == "" ? "auto" : j.bottom,
			right: j.right == "" ? "auto" : j.right
		};
		if (p) {
			u.style.removeExpression("left");
			u.style.removeExpression("top")
		}
		baidu.setStyles(u, v);
		l();
		i = false
	}
	function g(v) {
		if (!v) {
			return
		}
		m = v.onrender || m;
		c = v.onupdate || c;
		l = v.onrelease || l;
		k = v.vertival || "top";
		s = v.horizontal || "left";
		baidu.extend(d, v.offset || {});
		c()
	}
	return {
		render: t,
		update: g,
		release: o
	}
};
baidu.dom.getAncestorBy = function(a, b) {
	a = baidu.dom.g(a);
	while ((a = a.parentNode) && a.nodeType == 1) {
		if (b(a)) {
			return a
		}
	}
	return null
};
baidu.dom.getAncestorByClass = function(a, b) {
	a = baidu.dom.g(a);
	b = new RegExp("(^|\\s)" + baidu.string.trim(b) + "(\\s|\x24)");
	while ((a = a.parentNode) && a.nodeType == 1) {
		if (b.test(a.className)) {
			return a
		}
	}
	return null
};
baidu.dom.getAncestorByTag = function(b, a) {
	b = baidu.dom.g(b);
	a = a.toUpperCase();
	while ((b = b.parentNode) && b.nodeType == 1) {
		if (b.tagName == a) {
			return b
		}
	}
	return null
};
baidu.dom.getParent = function(a) {
	a = baidu.dom._g(a);
	return a.parentElement || a.parentNode || null
};
baidu.dom.getText = function(d) {
	var b = "",
		f, c = 0,
		a;
	d = baidu._g(d);
	if (d.nodeType === 3 || d.nodeType === 4) {
		b += d.nodeValue
	} else {
		if (d.nodeType !== 8) {
			f = d.childNodes;
			for (a = f.length; c < a; c++) {
				b += baidu.dom.getText(f[c])
			}
		}
	}
	return b
};
baidu.dom.getWindow = function(a) {
	a = baidu.dom.g(a);
	var b = baidu.dom.getDocument(a);
	return b.parentWindow || b.defaultView || null
};
baidu.dom.hasAttr = function(c, b) {
	c = baidu.g(c);
	var a = c.attributes.getNamedItem(b);
	return !!(a && a.specified)
};
baidu.dom.hasClass = function(c, d) {
	c = baidu.dom.g(c);
	var b = baidu.string.trim(d).split(/\s+/),
		a = b.length;
	d = c.className.split(/\s+/).join(" ");
	while (a--) {
		if (!(new RegExp("(^| )" + b[a] + "( |\x24)")).test(d)) {
			return false
		}
	}
	return true
};
baidu.dom.hide = function(a) {
	a = baidu.dom.g(a);
	a.style.display = "none";
	return a
};
baidu.hide = baidu.dom.hide;
baidu.dom.insertAfter = function(d, c) {
	var b, a;
	b = baidu.dom._g;
	d = b(d);
	c = b(c);
	a = c.parentNode;
	if (a) {
		a.insertBefore(d, c.nextSibling)
	}
	return d
};
baidu.dom.insertBefore = function(d, c) {
	var b, a;
	b = baidu.dom._g;
	d = b(d);
	c = b(c);
	a = c.parentNode;
	if (a) {
		a.insertBefore(d, c)
	}
	return d
};
baidu.dom.insertHTML = function(d, a, c) {
	d = baidu.dom.g(d);
	var b, f;
	if (d.insertAdjacentHTML && !baidu.browser.opera) {
		d.insertAdjacentHTML(a, c)
	} else {
		b = d.ownerDocument.createRange();
		a = a.toUpperCase();
		if (a == "AFTERBEGIN" || a == "BEFOREEND") {
			b.selectNodeContents(d);
			b.collapse(a == "AFTERBEGIN")
		} else {
			f = a == "BEFOREBEGIN";
			b[f ? "setStartBefore" : "setEndAfter"](d);
			b.collapse(f)
		}
		b.insertNode(b.createContextualFragment(c))
	}
	return d
};
baidu.insertHTML = baidu.dom.insertHTML;
baidu.dom.last = function(a) {
	return baidu.dom._matchNode(a, "previousSibling", "lastChild")
};
baidu.dom.next = function(a) {
	return baidu.dom._matchNode(a, "nextSibling", "nextSibling")
};
baidu.dom.prev = function(a) {
	return baidu.dom._matchNode(a, "previousSibling", "previousSibling")
};
baidu.string.escapeReg = function(a) {
	return String(a).replace(new RegExp("([.*+?^=!:\x24{}()|[\\]/\\\\])", "g"), "\\\x241")
};
baidu.dom.q = function(j, f, b) {
	var k = [],
		d = baidu.string.trim,
		h, g, a, c;
	if (!(j = d(j))) {
		return k
	}
	if ("undefined" == typeof f) {
		f = document
	} else {
		f = baidu.dom.g(f);
		if (!f) {
			return k
		}
	}
	b && (b = d(b).toUpperCase());
	if (f.getElementsByClassName) {
		a = f.getElementsByClassName(j);
		h = a.length;
		for (g = 0; g < h; g++) {
			c = a[g];
			if (b && c.tagName != b) {
				continue
			}
			k[k.length] = c
		}
	} else {
		j = new RegExp("(^|\\s)" + baidu.string.escapeReg(j) + "(\\s|\x24)");
		a = b ? f.getElementsByTagName(b) : (f.all || f.getElementsByTagName("*"));
		h = a.length;
		for (g = 0; g < h; g++) {
			c = a[g];
			j.test(c.className) && (k[k.length] = c)
		}
	}
	return k
};
baidu.q = baidu.Q = baidu.dom.q;
/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2011, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function() {
	var n = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
		i = "sizcache" + (Math.random() + "").replace(".", ""),
		o = 0,
		r = Object.prototype.toString,
		h = false,
		g = true,
		q = /\\/g,
		u = /\r\n/g,
		w = /\W/;
	[0, 0].sort(function() {
		g = false;
		return 0
	});
	var d = function(C, x, F, G) {
			F = F || [];
			x = x || document;
			var I = x;
			if (x.nodeType !== 1 && x.nodeType !== 9) {
				return []
			}
			if (!C || typeof C !== "string") {
				return F
			}
			var z, K, N, y, J, M, L, E, B = true,
				A = d.isXML(x),
				D = [],
				H = C;
			do {
				n.exec("");
				z = n.exec(H);
				if (z) {
					H = z[3];
					D.push(z[1]);
					if (z[2]) {
						y = z[3];
						break
					}
				}
			} while (z);
			if (D.length > 1 && j.exec(C)) {
				if (D.length === 2 && k.relative[D[0]]) {
					K = s(D[0] + D[1], x, G)
				} else {
					K = k.relative[D[0]] ? [x] : d(D.shift(), x);
					while (D.length) {
						C = D.shift();
						if (k.relative[C]) {
							C += D.shift()
						}
						K = s(C, K, G)
					}
				}
			} else {
				if (!G && D.length > 1 && x.nodeType === 9 && !A && k.match.ID.test(D[0]) && !k.match.ID.test(D[D.length - 1])) {
					J = d.find(D.shift(), x, A);
					x = J.expr ? d.filter(J.expr, J.set)[0] : J.set[0]
				}
				if (x) {
					J = G ? {
						expr: D.pop(),
						set: l(G)
					} : d.find(D.pop(), D.length === 1 && (D[0] === "~" || D[0] === "+") && x.parentNode ? x.parentNode : x, A);
					K = J.expr ? d.filter(J.expr, J.set) : J.set;
					if (D.length > 0) {
						N = l(K)
					} else {
						B = false
					}
					while (D.length) {
						M = D.pop();
						L = M;
						if (!k.relative[M]) {
							M = ""
						} else {
							L = D.pop()
						}
						if (L == null) {
							L = x
						}
						k.relative[M](N, L, A)
					}
				} else {
					N = D = []
				}
			}
			if (!N) {
				N = K
			}
			if (!N) {
				d.error(M || C)
			}
			if (r.call(N) === "[object Array]") {
				if (!B) {
					F.push.apply(F, N)
				} else {
					if (x && x.nodeType === 1) {
						for (E = 0; N[E] != null; E++) {
							if (N[E] && (N[E] === true || N[E].nodeType === 1 && d.contains(x, N[E]))) {
								F.push(K[E])
							}
						}
					} else {
						for (E = 0; N[E] != null; E++) {
							if (N[E] && N[E].nodeType === 1) {
								F.push(K[E])
							}
						}
					}
				}
			} else {
				l(N, F)
			}
			if (y) {
				d(y, I, F, G);
				d.uniqueSort(F)
			}
			return F
		};
	d.uniqueSort = function(y) {
		if (p) {
			h = g;
			y.sort(p);
			if (h) {
				for (var x = 1; x < y.length; x++) {
					if (y[x] === y[x - 1]) {
						y.splice(x--, 1)
					}
				}
			}
		}
		return y
	};
	d.matches = function(x, y) {
		return d(x, null, null, y)
	};
	d.matchesSelector = function(x, y) {
		return d(y, null, null, [x]).length > 0
	};
	d.find = function(E, x, F) {
		var D, z, B, A, C, y;
		if (!E) {
			return []
		}
		for (z = 0, B = k.order.length; z < B; z++) {
			C = k.order[z];
			if ((A = k.leftMatch[C].exec(E))) {
				y = A[1];
				A.splice(1, 1);
				if (y.substr(y.length - 1) !== "\\") {
					A[1] = (A[1] || "").replace(q, "");
					D = k.find[C](A, x, F);
					if (D != null) {
						E = E.replace(k.match[C], "");
						break
					}
				}
			}
		}
		if (!D) {
			D = typeof x.getElementsByTagName !== "undefined" ? x.getElementsByTagName("*") : []
		}
		return {
			set: D,
			expr: E
		}
	};
	d.filter = function(I, H, L, B) {
		var D, x, G, N, K, y, A, C, J, z = I,
			M = [],
			F = H,
			E = H && H[0] && d.isXML(H[0]);
		while (I && H.length) {
			for (G in k.filter) {
				if ((D = k.leftMatch[G].exec(I)) != null && D[2]) {
					y = k.filter[G];
					A = D[1];
					x = false;
					D.splice(1, 1);
					if (A.substr(A.length - 1) === "\\") {
						continue
					}
					if (F === M) {
						M = []
					}
					if (k.preFilter[G]) {
						D = k.preFilter[G](D, F, L, M, B, E);
						if (!D) {
							x = N = true
						} else {
							if (D === true) {
								continue
							}
						}
					}
					if (D) {
						for (C = 0;
						(K = F[C]) != null; C++) {
							if (K) {
								N = y(K, D, C, F);
								J = B ^ N;
								if (L && N != null) {
									if (J) {
										x = true
									} else {
										F[C] = false
									}
								} else {
									if (J) {
										M.push(K);
										x = true
									}
								}
							}
						}
					}
					if (N !== undefined) {
						if (!L) {
							F = M
						}
						I = I.replace(k.match[G], "");
						if (!x) {
							return []
						}
						break
					}
				}
			}
			if (I === z) {
				if (x == null) {
					d.error(I)
				} else {
					break
				}
			}
			z = I
		}
		return F
	};
	d.error = function(x) {
		throw "Syntax error, unrecognized expression: " + x
	};
	var b = d.getText = function(B) {
			var z, A, x = B.nodeType,
				y = "";
			if (x) {
				if (x === 1) {
					if (typeof B.textContent === "string") {
						return B.textContent
					} else {
						if (typeof B.innerText === "string") {
							return B.innerText.replace(u, "")
						} else {
							for (B = B.firstChild; B; B = B.nextSibling) {
								y += b(B)
							}
						}
					}
				} else {
					if (x === 3 || x === 4) {
						return B.nodeValue
					}
				}
			} else {
				for (z = 0;
				(A = B[z]); z++) {
					if (A.nodeType !== 8) {
						y += b(A)
					}
				}
			}
			return y
		};
	var k = d.selectors = {
		order: ["ID", "NAME", "TAG"],
		match: {
			ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
			CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
			NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
			ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
			TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
			CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
			POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
			PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
		},
		leftMatch: {},
		attrMap: {
			"class": "className",
			"for": "htmlFor"
		},
		attrHandle: {
			href: function(x) {
				return x.getAttribute("href")
			},
			type: function(x) {
				return x.getAttribute("type")
			}
		},
		relative: {
			"+": function(D, y) {
				var A = typeof y === "string",
					C = A && !w.test(y),
					E = A && !C;
				if (C) {
					y = y.toLowerCase()
				}
				for (var z = 0, x = D.length, B; z < x; z++) {
					if ((B = D[z])) {
						while ((B = B.previousSibling) && B.nodeType !== 1) {}
						D[z] = E || B && B.nodeName.toLowerCase() === y ? B || false : B === y
					}
				}
				if (E) {
					d.filter(y, D, true)
				}
			},
			">": function(D, y) {
				var C, B = typeof y === "string",
					z = 0,
					x = D.length;
				if (B && !w.test(y)) {
					y = y.toLowerCase();
					for (; z < x; z++) {
						C = D[z];
						if (C) {
							var A = C.parentNode;
							D[z] = A.nodeName.toLowerCase() === y ? A : false
						}
					}
				} else {
					for (; z < x; z++) {
						C = D[z];
						if (C) {
							D[z] = B ? C.parentNode : C.parentNode === y
						}
					}
					if (B) {
						d.filter(y, D, true)
					}
				}
			},
			"": function(A, y, C) {
				var B, z = o++,
					x = t;
				if (typeof y === "string" && !w.test(y)) {
					y = y.toLowerCase();
					B = y;
					x = a
				}
				x("parentNode", y, z, A, B, C)
			},
			"~": function(A, y, C) {
				var B, z = o++,
					x = t;
				if (typeof y === "string" && !w.test(y)) {
					y = y.toLowerCase();
					B = y;
					x = a
				}
				x("previousSibling", y, z, A, B, C)
			}
		},
		find: {
			ID: function(y, z, A) {
				if (typeof z.getElementById !== "undefined" && !A) {
					var x = z.getElementById(y[1]);
					return x && x.parentNode ? [x] : []
				}
			},
			NAME: function(z, C) {
				if (typeof C.getElementsByName !== "undefined") {
					var y = [],
						B = C.getElementsByName(z[1]);
					for (var A = 0, x = B.length; A < x; A++) {
						if (B[A].getAttribute("name") === z[1]) {
							y.push(B[A])
						}
					}
					return y.length === 0 ? null : y
				}
			},
			TAG: function(x, y) {
				if (typeof y.getElementsByTagName !== "undefined") {
					return y.getElementsByTagName(x[1])
				}
			}
		},
		preFilter: {
			CLASS: function(A, y, z, x, D, E) {
				A = " " + A[1].replace(q, "") + " ";
				if (E) {
					return A
				}
				for (var B = 0, C;
				(C = y[B]) != null; B++) {
					if (C) {
						if (D ^ (C.className && (" " + C.className + " ").replace(/[\t\n\r]/g, " ").indexOf(A) >= 0)) {
							if (!z) {
								x.push(C)
							}
						} else {
							if (z) {
								y[B] = false
							}
						}
					}
				}
				return false
			},
			ID: function(x) {
				return x[1].replace(q, "")
			},
			TAG: function(y, x) {
				return y[1].replace(q, "").toLowerCase()
			},
			CHILD: function(x) {
				if (x[1] === "nth") {
					if (!x[2]) {
						d.error(x[0])
					}
					x[2] = x[2].replace(/^\+|\s*/g, "");
					var y = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(x[2] === "even" && "2n" || x[2] === "odd" && "2n+1" || !/\D/.test(x[2]) && "0n+" + x[2] || x[2]);
					x[2] = (y[1] + (y[2] || 1)) - 0;
					x[3] = y[3] - 0
				} else {
					if (x[2]) {
						d.error(x[0])
					}
				}
				x[0] = o++;
				return x
			},
			ATTR: function(B, y, z, x, C, D) {
				var A = B[1] = B[1].replace(q, "");
				if (!D && k.attrMap[A]) {
					B[1] = k.attrMap[A]
				}
				B[4] = (B[4] || B[5] || "").replace(q, "");
				if (B[2] === "~=") {
					B[4] = " " + B[4] + " "
				}
				return B
			},
			PSEUDO: function(B, y, z, x, C) {
				if (B[1] === "not") {
					if ((n.exec(B[3]) || "").length > 1 || /^\w/.test(B[3])) {
						B[3] = d(B[3], null, null, y)
					} else {
						var A = d.filter(B[3], y, z, true ^ C);
						if (!z) {
							x.push.apply(x, A)
						}
						return false
					}
				} else {
					if (k.match.POS.test(B[0]) || k.match.CHILD.test(B[0])) {
						return true
					}
				}
				return B
			},
			POS: function(x) {
				x.unshift(true);
				return x
			}
		},
		filters: {
			enabled: function(x) {
				return x.disabled === false && x.type !== "hidden"
			},
			disabled: function(x) {
				return x.disabled === true
			},
			checked: function(x) {
				return x.checked === true
			},
			selected: function(x) {
				if (x.parentNode) {
					x.parentNode.selectedIndex
				}
				return x.selected === true
			},
			parent: function(x) {
				return !!x.firstChild
			},
			empty: function(x) {
				return !x.firstChild
			},
			has: function(z, y, x) {
				return !!d(x[3], z).length
			},
			header: function(x) {
				return (/h\d/i).test(x.nodeName)
			},
			text: function(z) {
				var x = z.getAttribute("type"),
					y = z.type;
				return z.nodeName.toLowerCase() === "input" && "text" === y && (x === y || x === null)
			},
			radio: function(x) {
				return x.nodeName.toLowerCase() === "input" && "radio" === x.type
			},
			checkbox: function(x) {
				return x.nodeName.toLowerCase() === "input" && "checkbox" === x.type
			},
			file: function(x) {
				return x.nodeName.toLowerCase() === "input" && "file" === x.type
			},
			password: function(x) {
				return x.nodeName.toLowerCase() === "input" && "password" === x.type
			},
			submit: function(y) {
				var x = y.nodeName.toLowerCase();
				return (x === "input" || x === "button") && "submit" === y.type
			},
			image: function(x) {
				return x.nodeName.toLowerCase() === "input" && "image" === x.type
			},
			reset: function(y) {
				var x = y.nodeName.toLowerCase();
				return (x === "input" || x === "button") && "reset" === y.type
			},
			button: function(y) {
				var x = y.nodeName.toLowerCase();
				return x === "input" && "button" === y.type || x === "button"
			},
			input: function(x) {
				return (/input|select|textarea|button/i).test(x.nodeName)
			},
			focus: function(x) {
				return x === x.ownerDocument.activeElement
			}
		},
		setFilters: {
			first: function(y, x) {
				return x === 0
			},
			last: function(z, y, x, A) {
				return y === A.length - 1
			},
			even: function(y, x) {
				return x % 2 === 0
			},
			odd: function(y, x) {
				return x % 2 === 1
			},
			lt: function(z, y, x) {
				return y < x[3] - 0
			},
			gt: function(z, y, x) {
				return y > x[3] - 0
			},
			nth: function(z, y, x) {
				return x[3] - 0 === y
			},
			eq: function(z, y, x) {
				return x[3] - 0 === y
			}
		},
		filter: {
			PSEUDO: function(z, E, D, F) {
				var x = E[1],
					y = k.filters[x];
				if (y) {
					return y(z, D, E, F)
				} else {
					if (x === "contains") {
						return (z.textContent || z.innerText || b([z]) || "").indexOf(E[3]) >= 0
					} else {
						if (x === "not") {
							var A = E[3];
							for (var C = 0, B = A.length; C < B; C++) {
								if (A[C] === z) {
									return false
								}
							}
							return true
						} else {
							d.error(x)
						}
					}
				}
			},
			CHILD: function(z, B) {
				var A, H, D, G, x, C, F, E = B[1],
					y = z;
				switch (E) {
				case "only":
				case "first":
					while ((y = y.previousSibling)) {
						if (y.nodeType === 1) {
							return false
						}
					}
					if (E === "first") {
						return true
					}
					y = z;
				case "last":
					while ((y = y.nextSibling)) {
						if (y.nodeType === 1) {
							return false
						}
					}
					return true;
				case "nth":
					A = B[2];
					H = B[3];
					if (A === 1 && H === 0) {
						return true
					}
					D = B[0];
					G = z.parentNode;
					if (G && (G[i] !== D || !z.nodeIndex)) {
						C = 0;
						for (y = G.firstChild; y; y = y.nextSibling) {
							if (y.nodeType === 1) {
								y.nodeIndex = ++C
							}
						}
						G[i] = D
					}
					F = z.nodeIndex - H;
					if (A === 0) {
						return F === 0
					} else {
						return (F % A === 0 && F / A >= 0)
					}
				}
			},
			ID: function(y, x) {
				return y.nodeType === 1 && y.getAttribute("id") === x
			},
			TAG: function(y, x) {
				return (x === "*" && y.nodeType === 1) || !! y.nodeName && y.nodeName.toLowerCase() === x
			},
			CLASS: function(y, x) {
				return (" " + (y.className || y.getAttribute("class")) + " ").indexOf(x) > -1
			},
			ATTR: function(C, A) {
				var z = A[1],
					x = d.attr ? d.attr(C, z) : k.attrHandle[z] ? k.attrHandle[z](C) : C[z] != null ? C[z] : C.getAttribute(z),
					D = x + "",
					B = A[2],
					y = A[4];
				return x == null ? B === "!=" : !B && d.attr ? x != null : B === "=" ? D === y : B === "*=" ? D.indexOf(y) >= 0 : B === "~=" ? (" " + D + " ").indexOf(y) >= 0 : !y ? D && x !== false : B === "!=" ? D !== y : B === "^=" ? D.indexOf(y) === 0 : B === "$=" ? D.substr(D.length - y.length) === y : B === "|=" ? D === y || D.substr(0, y.length + 1) === y + "-" : false
			},
			POS: function(B, y, z, C) {
				var x = y[2],
					A = k.setFilters[x];
				if (A) {
					return A(B, z, y, C)
				}
			}
		}
	};
	var j = k.match.POS,
		c = function(y, x) {
			return "\\" + (x - 0 + 1)
		};
	for (var f in k.match) {
		k.match[f] = new RegExp(k.match[f].source + (/(?![^\[]*\])(?![^\(]*\))/.source));
		k.leftMatch[f] = new RegExp(/(^(?:.|\r|\n)*?)/.source + k.match[f].source.replace(/\\(\d+)/g, c))
	}
	var l = function(y, x) {
			y = Array.prototype.slice.call(y, 0);
			if (x) {
				x.push.apply(x, y);
				return x
			}
			return y
		};
	try {
		Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType
	} catch (v) {
		l = function(B, A) {
			var z = 0,
				y = A || [];
			if (r.call(B) === "[object Array]") {
				Array.prototype.push.apply(y, B)
			} else {
				if (typeof B.length === "number") {
					for (var x = B.length; z < x; z++) {
						y.push(B[z])
					}
				} else {
					for (; B[z]; z++) {
						y.push(B[z])
					}
				}
			}
			return y
		}
	}
	var p, m;
	if (document.documentElement.compareDocumentPosition) {
		p = function(y, x) {
			if (y === x) {
				h = true;
				return 0
			}
			if (!y.compareDocumentPosition || !x.compareDocumentPosition) {
				return y.compareDocumentPosition ? -1 : 1
			}
			return y.compareDocumentPosition(x) & 4 ? -1 : 1
		}
	} else {
		p = function(F, E) {
			if (F === E) {
				h = true;
				return 0
			} else {
				if (F.sourceIndex && E.sourceIndex) {
					return F.sourceIndex - E.sourceIndex
				}
			}
			var C, y, z = [],
				x = [],
				B = F.parentNode,
				D = E.parentNode,
				G = B;
			if (B === D) {
				return m(F, E)
			} else {
				if (!B) {
					return -1
				} else {
					if (!D) {
						return 1
					}
				}
			}
			while (G) {
				z.unshift(G);
				G = G.parentNode
			}
			G = D;
			while (G) {
				x.unshift(G);
				G = G.parentNode
			}
			C = z.length;
			y = x.length;
			for (var A = 0; A < C && A < y; A++) {
				if (z[A] !== x[A]) {
					return m(z[A], x[A])
				}
			}
			return A === C ? m(F, x[A], -1) : m(z[A], E, 1)
		};
		m = function(y, x, z) {
			if (y === x) {
				return z
			}
			var A = y.nextSibling;
			while (A) {
				if (A === x) {
					return -1
				}
				A = A.nextSibling
			}
			return 1
		}
	}(function() {
		var y = document.createElement("div"),
			z = "script" + (new Date()).getTime(),
			x = document.documentElement;
		y.innerHTML = "<a name='" + z + "'/>";
		x.insertBefore(y, x.firstChild);
		if (document.getElementById(z)) {
			k.find.ID = function(B, C, D) {
				if (typeof C.getElementById !== "undefined" && !D) {
					var A = C.getElementById(B[1]);
					return A ? A.id === B[1] || typeof A.getAttributeNode !== "undefined" && A.getAttributeNode("id").nodeValue === B[1] ? [A] : undefined : []
				}
			};
			k.filter.ID = function(C, A) {
				var B = typeof C.getAttributeNode !== "undefined" && C.getAttributeNode("id");
				return C.nodeType === 1 && B && B.nodeValue === A
			}
		}
		x.removeChild(y);
		x = y = null
	})();
	(function() {
		var x = document.createElement("div");
		x.appendChild(document.createComment(""));
		if (x.getElementsByTagName("*").length > 0) {
			k.find.TAG = function(y, C) {
				var B = C.getElementsByTagName(y[1]);
				if (y[1] === "*") {
					var A = [];
					for (var z = 0; B[z]; z++) {
						if (B[z].nodeType === 1) {
							A.push(B[z])
						}
					}
					B = A
				}
				return B
			}
		}
		x.innerHTML = "<a href='#'></a>";
		if (x.firstChild && typeof x.firstChild.getAttribute !== "undefined" && x.firstChild.getAttribute("href") !== "#") {
			k.attrHandle.href = function(y) {
				return y.getAttribute("href", 2)
			}
		}
		x = null
	})();
	if (document.querySelectorAll) {
		(function() {
			var x = d,
				A = document.createElement("div"),
				z = "__sizzle__";
			A.innerHTML = "<p class='TEST'></p>";
			if (A.querySelectorAll && A.querySelectorAll(".TEST").length === 0) {
				return
			}
			d = function(L, C, G, K) {
				C = C || document;
				if (!K && !d.isXML(C)) {
					var J = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(L);
					if (J && (C.nodeType === 1 || C.nodeType === 9)) {
						if (J[1]) {
							return l(C.getElementsByTagName(L), G)
						} else {
							if (J[2] && k.find.CLASS && C.getElementsByClassName) {
								return l(C.getElementsByClassName(J[2]), G)
							}
						}
					}
					if (C.nodeType === 9) {
						if (L === "body" && C.body) {
							return l([C.body], G)
						} else {
							if (J && J[3]) {
								var F = C.getElementById(J[3]);
								if (F && F.parentNode) {
									if (F.id === J[3]) {
										return l([F], G)
									}
								} else {
									return l([], G)
								}
							}
						}
						try {
							return l(C.querySelectorAll(L), G)
						} catch (H) {}
					} else {
						if (C.nodeType === 1 && C.nodeName.toLowerCase() !== "object") {
							var D = C,
								E = C.getAttribute("id"),
								B = E || z,
								N = C.parentNode,
								M = /^\s*[+~]/.test(L);
							if (!E) {
								C.setAttribute("id", B)
							} else {
								B = B.replace(/'/g, "\\$&")
							}
							if (M && N) {
								C = C.parentNode
							}
							try {
								if (!M || N) {
									return l(C.querySelectorAll("[id='" + B + "'] " + L), G)
								}
							} catch (I) {} finally {
								if (!E) {
									D.removeAttribute("id")
								}
							}
						}
					}
				}
				return x(L, C, G, K)
			};
			for (var y in x) {
				d[y] = x[y]
			}
			A = null
		})()
	}(function() {
		var x = document.documentElement,
			z = x.matchesSelector || x.mozMatchesSelector || x.webkitMatchesSelector || x.msMatchesSelector;
		if (z) {
			var B = !z.call(document.createElement("div"), "div"),
				y = false;
			try {
				z.call(document.documentElement, "[test!='']:sizzle")
			} catch (A) {
				y = true
			}
			d.matchesSelector = function(D, F) {
				F = F.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
				if (!d.isXML(D)) {
					try {
						if (y || !k.match.PSEUDO.test(F) && !/!=/.test(F)) {
							var C = z.call(D, F);
							if (C || !B || D.document && D.document.nodeType !== 11) {
								return C
							}
						}
					} catch (E) {}
				}
				return d(F, null, null, [D]).length > 0
			}
		}
	})();
	(function() {
		var x = document.createElement("div");
		x.innerHTML = "<div class='test e'></div><div class='test'></div>";
		if (!x.getElementsByClassName || x.getElementsByClassName("e").length === 0) {
			return
		}
		x.lastChild.className = "e";
		if (x.getElementsByClassName("e").length === 1) {
			return
		}
		k.order.splice(1, 0, "CLASS");
		k.find.CLASS = function(y, z, A) {
			if (typeof z.getElementsByClassName !== "undefined" && !A) {
				return z.getElementsByClassName(y[1])
			}
		};
		x = null
	})();

	function a(y, D, C, G, E, F) {
		for (var A = 0, z = G.length; A < z; A++) {
			var x = G[A];
			if (x) {
				var B = false;
				x = x[y];
				while (x) {
					if (x[i] === C) {
						B = G[x.sizset];
						break
					}
					if (x.nodeType === 1 && !F) {
						x[i] = C;
						x.sizset = A
					}
					if (x.nodeName.toLowerCase() === D) {
						B = x;
						break
					}
					x = x[y]
				}
				G[A] = B
			}
		}
	}
	function t(y, D, C, G, E, F) {
		for (var A = 0, z = G.length; A < z; A++) {
			var x = G[A];
			if (x) {
				var B = false;
				x = x[y];
				while (x) {
					if (x[i] === C) {
						B = G[x.sizset];
						break
					}
					if (x.nodeType === 1) {
						if (!F) {
							x[i] = C;
							x.sizset = A
						}
						if (typeof D !== "string") {
							if (x === D) {
								B = true;
								break
							}
						} else {
							if (d.filter(D, [x]).length > 0) {
								B = x;
								break
							}
						}
					}
					x = x[y]
				}
				G[A] = B
			}
		}
	}
	if (document.documentElement.contains) {
		d.contains = function(y, x) {
			return y !== x && (y.contains ? y.contains(x) : true)
		}
	} else {
		if (document.documentElement.compareDocumentPosition) {
			d.contains = function(y, x) {
				return !!(y.compareDocumentPosition(x) & 16)
			}
		} else {
			d.contains = function() {
				return false
			}
		}
	}
	d.isXML = function(x) {
		var y = (x ? x.ownerDocument || x : 0).documentElement;
		return y ? y.nodeName !== "HTML" : false
	};
	var s = function(z, x, D) {
			var C, E = [],
				B = "",
				F = x.nodeType ? [x] : x;
			while ((C = k.match.PSEUDO.exec(z))) {
				B += C[0];
				z = z.replace(k.match.PSEUDO, "")
			}
			z = k.relative[z] ? z + "*" : z;
			for (var A = 0, y = F.length; A < y; A++) {
				d(z, F[A], E, D)
			}
			return d.filter(B, E)
		};
	baidu.dom.query = d
})();
(function() {
	var a = baidu.dom.ready = function() {
			var h = false,
				g = [],
				c;
			if (document.addEventListener) {
				c = function() {
					document.removeEventListener("DOMContentLoaded", c, false);
					d()
				}
			} else {
				if (document.attachEvent) {
					c = function() {
						if (document.readyState === "complete") {
							document.detachEvent("onreadystatechange", c);
							d()
						}
					}
				}
			}
			function d() {
				if (!d.isReady) {
					d.isReady = true;
					for (var l = 0, k = g.length; l < k; l++) {
						g[l]()
					}
				}
			}
			function b() {
				try {
					document.documentElement.doScroll("left")
				} catch (i) {
					setTimeout(b, 1);
					return
				}
				d()
			}
			function f() {
				if (h) {
					return
				}
				h = true;
				if (document.readyState === "complete") {
					d.isReady = true
				} else {
					if (document.addEventListener) {
						document.addEventListener("DOMContentLoaded", c, false);
						window.addEventListener("load", d, false)
					} else {
						if (document.attachEvent) {
							document.attachEvent("onreadystatechange", c);
							window.attachEvent("onload", d);
							var i = false;
							try {
								i = window.frameElement == null
							} catch (j) {}
							if (document.documentElement.doScroll && i) {
								b()
							}
						}
					}
				}
			}
			f();
			return function(i) {
				d.isReady ? i() : g.push(i)
			}
		}();
	a.isReady = false
})();
baidu.dom.remove = function(a) {
	a = baidu.dom._g(a);
	var b = a.parentNode;
	b && b.removeChild(a)
};
baidu.dom.removeClass = function(g, h) {
	g = baidu.dom.g(g);
	var d = g.className.split(/\s+/),
		k = h.split(/\s+/),
		b, a = k.length,
		c, f = 0;
	for (; f < a; ++f) {
		for (c = 0, b = d.length; c < b; ++c) {
			if (d[c] == k[f]) {
				d.splice(c, 1);
				break
			}
		}
	}
	g.className = d.join(" ");
	return g
};
baidu.removeClass = baidu.dom.removeClass;
baidu.dom.removeStyle = function() {
	var b = document.createElement("DIV"),
		a, c = baidu.dom._g;
	if (b.style.removeProperty) {
		a = function(f, d) {
			f = c(f);
			f.style.removeProperty(d);
			return f
		}
	} else {
		if (b.style.removeAttribute) {
			a = function(f, d) {
				f = c(f);
				f.style.removeAttribute(baidu.string.toCamelCase(d));
				return f
			}
		}
	}
	b = null;
	return a
}();
baidu.object.each = function(f, c) {
	var b, a, d;
	if ("function" == typeof c) {
		for (a in f) {
			if (f.hasOwnProperty(a)) {
				d = f[a];
				b = c.call(f, d, a);
				if (b === false) {
					break
				}
			}
		}
	}
	return f
};
baidu.lang.isNumber = function(a) {
	return "[object Number]" == Object.prototype.toString.call(a) && isFinite(a)
};
baidu.event.getTarget = function(a) {
	return a.target || a.srcElement
};
baidu.dom.setBorderBoxSize = function(c, b) {
	var a = {};
	b.width && (a.width = parseFloat(b.width));
	b.height && (a.height = parseFloat(b.height));

	function d(g, f) {
		return parseFloat(baidu.getStyle(g, f)) || 0
	}
	if (baidu.browser.isStrict) {
		if (b.width) {
			a.width = parseFloat(b.width) - d(c, "paddingLeft") - d(c, "paddingRight") - d(c, "borderLeftWidth") - d(c, "borderRightWidth");
			a.width < 0 && (a.width = 0)
		}
		if (b.height) {
			a.height = parseFloat(b.height) - d(c, "paddingTop") - d(c, "paddingBottom") - d(c, "borderTopWidth") - d(c, "borderBottomWidth");
			a.height < 0 && (a.height = 0)
		}
	}
	return baidu.dom.setStyles(c, a)
};
baidu.dom.setOuterHeight = baidu.dom.setBorderBoxHeight = function(b, a) {
	return baidu.dom.setBorderBoxSize(b, {
		height: a
	})
};
baidu.dom.setOuterWidth = baidu.dom.setBorderBoxWidth = function(a, b) {
	return baidu.dom.setBorderBoxSize(a, {
		width: b
	})
};
baidu.dom.resizable = function(d, h) {
	var z, m, j = {},
		c, a = {},
		r, x, u, b, f, k, o, s = false,
		v = {
			direction: ["e", "s", "se"],
			minWidth: 16,
			minHeight: 16,
			classPrefix: "tangram",
			directionHandlePosition: {}
		};
	if (!(z = baidu.dom.g(d)) && baidu.getStyle(z, "position") == "static") {
		return false
	}
	b = z.offsetParent;
	var n = baidu.getStyle(z, "position");
	m = baidu.extend(v, h);
	baidu.each(["minHeight", "minWidth", "maxHeight", "maxWidth"], function(A) {
		m[A] && (m[A] = parseFloat(m[A]))
	});
	r = [m.minWidth || 0, m.maxWidth || Number.MAX_VALUE, m.minHeight || 0, m.maxHeight || Number.MAX_VALUE];
	y();

	function y() {
		k = baidu.extend({
			e: {
				right: "-5px",
				top: "0px",
				width: "7px",
				height: z.offsetHeight
			},
			s: {
				left: "0px",
				bottom: "-5px",
				height: "7px",
				width: z.offsetWidth
			},
			n: {
				left: "0px",
				top: "-5px",
				height: "7px",
				width: z.offsetWidth
			},
			w: {
				left: "-5px",
				top: "0px",
				height: z.offsetHeight,
				width: "7px"
			},
			se: {
				right: "1px",
				bottom: "1px",
				height: "16px",
				width: "16px"
			},
			sw: {
				left: "1px",
				bottom: "1px",
				height: "16px",
				width: "16px"
			},
			ne: {
				right: "1px",
				top: "1px",
				height: "16px",
				width: "16px"
			},
			nw: {
				left: "1px",
				top: "1px",
				height: "16px",
				width: "16px"
			}
		}, m.directionHandlePosition);
		baidu.each(m.direction, function(A) {
			var B = m.classPrefix.split(" ");
			B[0] = B[0] + "-resizable-" + A;
			var D = baidu.dom.create("div", {
				className: B.join(" ")
			}),
				C = k[A];
			C.cursor = A + "-resize";
			C.position = "absolute";
			baidu.setStyles(D, C);
			D.key = A;
			D.style.MozUserSelect = "none";
			z.appendChild(D);
			j[A] = D;
			baidu.on(D, "mousedown", i)
		});
		s = false
	}
	function g() {
		f && t();
		baidu.object.each(j, function(A) {
			baidu.un(A, "mousedown", i);
			baidu.dom.remove(A)
		});
		s = true
	}
	function l(A) {
		if (!s) {
			m = baidu.extend(m, A || {});
			g();
			y()
		}
	}
	function i(C) {
		var B = baidu.event.getTarget(C),
			A = B.key;
		f = B;
		if (B.setCapture) {
			B.setCapture()
		} else {
			if (window.captureEvents) {
				window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP)
			}
		}
		u = baidu.getStyle(document.body, "cursor");
		baidu.setStyle(document.body, "cursor", A + "-resize");
		baidu.on(B, "mouseup", t);
		baidu.on(document.body, "selectstart", p);
		x = document.body.style.MozUserSelect;
		document.body.style.MozUserSelect = "none";
		var D = baidu.page.getMousePosition();
		a = q();
		o = setInterval(function() {
			w(A, D)
		}, 20);
		baidu.lang.isFunction(m.onresizestart) && m.onresizestart();
		baidu.event.preventDefault(C)
	}
	function t() {
		if (f.releaseCapture) {
			f.releaseCapture()
		} else {
			if (window.releaseEvents) {
				window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP)
			}
		}
		baidu.un(f, "mouseup", t);
		baidu.un(document, "selectstart", p);
		document.body.style.MozUserSelect = x;
		baidu.un(document.body, "selectstart", p);
		clearInterval(o);
		baidu.setStyle(document.body, "cursor", u);
		f = null;
		baidu.lang.isFunction(m.onresizeend) && m.onresizeend()
	}
	function w(B, H) {
		var G = baidu.page.getMousePosition(),
			C = a.width,
			A = a.height,
			F = a.top,
			E = a.left,
			D;
		if (B.indexOf("e") >= 0) {
			C = Math.max(G.x - H.x + a.width, r[0]);
			C = Math.min(C, r[1])
		} else {
			if (B.indexOf("w") >= 0) {
				C = Math.max(H.x - G.x + a.width, r[0]);
				C = Math.min(C, r[1]);
				E -= C - a.width
			}
		}
		if (B.indexOf("s") >= 0) {
			A = Math.max(G.y - H.y + a.height, r[2]);
			A = Math.min(A, r[3])
		} else {
			if (B.indexOf("n") >= 0) {
				A = Math.max(H.y - G.y + a.height, r[2]);
				A = Math.min(A, r[3]);
				F -= A - a.height
			}
		}
		D = {
			width: C,
			height: A,
			top: F,
			left: E
		};
		baidu.dom.setOuterHeight(z, A);
		baidu.dom.setOuterWidth(z, C);
		baidu.setStyles(z, {
			top: F,
			left: E
		});
		j.n && baidu.setStyle(j.n, "width", C);
		j.s && baidu.setStyle(j.s, "width", C);
		j.e && baidu.setStyle(j.e, "height", A);
		j.w && baidu.setStyle(j.w, "height", A);
		baidu.lang.isFunction(m.onresize) && m.onresize({
			current: D,
			original: a
		})
	}
	function p(A) {
		return baidu.event.preventDefault(A, false)
	}
	function q() {
		var A = baidu.dom.getPosition(z.offsetParent),
			B = baidu.dom.getPosition(z),
			D, C;
		if (n == "absolute") {
			D = B.top - (z.offsetParent == document.body ? 0 : A.top);
			C = B.left - (z.offsetParent == document.body ? 0 : A.left)
		} else {
			D = parseFloat(baidu.getStyle(z, "top")) || -parseFloat(baidu.getStyle(z, "bottom")) || 0;
			C = parseFloat(baidu.getStyle(z, "left")) || -parseFloat(baidu.getStyle(z, "right")) || 0
		}
		baidu.setStyles(z, {
			top: D,
			left: C
		});
		return {
			width: z.offsetWidth,
			height: z.offsetHeight,
			top: D,
			left: C
		}
	}
	return {
		cancel: g,
		update: l,
		enable: y
	}
};
baidu.dom.setPosition = function(b, a) {
	return baidu.dom.setStyles(b, {
		left: a.left - (parseFloat(baidu.dom.getStyle(b, "margin-left")) || 0),
		top: a.top - (parseFloat(baidu.dom.getStyle(b, "margin-top")) || 0)
	})
};
baidu.dom.show = function(a) {
	a = baidu.dom.g(a);
	a.style.display = "";
	return a
};
baidu.show = baidu.dom.show;
baidu.dom.toggle = function(a) {
	a = baidu.dom.g(a);
	a.style.display = a.style.display == "none" ? "" : "none";
	return a
};
baidu.dom.toggleClass = function(a, b) {
	if (baidu.dom.hasClass(a, b)) {
		baidu.dom.removeClass(a, b)
	} else {
		baidu.dom.addClass(a, b)
	}
};
baidu.lang.isArray = function(a) {
	return "[object Array]" == Object.prototype.toString.call(a)
};
baidu.lang.toArray = function(b) {
	if (b === null || b === undefined) {
		return []
	}
	if (baidu.lang.isArray(b)) {
		return b
	}
	if (typeof b.length !== "number" || typeof b === "string" || baidu.lang.isFunction(b)) {
		return [b]
	}
	if (b.item) {
		var a = b.length,
			c = new Array(a);
		while (a--) {
			c[a] = b[a]
		}
		return c
	}
	return [].slice.call(b)
};
baidu.fn.methodize = function(b, a) {
	return function() {
		return b.apply(this, [(a ? this[a] : this)].concat([].slice.call(arguments)))
	}
};
baidu.fn.wrapReturnValue = function(a, c, b) {
	b = b | 0;
	return function() {
		var d = a.apply(this, arguments);
		if (b > 0) {
			return new c(arguments[b - 1])
		}
		if (!b) {
			return new c(d)
		}
		return d
	}
};
baidu.fn.multize = function(d, b, a) {
	var c = function() {
			var m = arguments[0],
				j = b ? c : d,
				g = [],
				l = [].slice.call(arguments, 0),
				h = 0,
				f, k;
			if (m instanceof Array) {
				for (f = m.length; h < f; h++) {
					l[0] = m[h];
					k = j.apply(this, l);
					if (a) {
						if (k) {
							g = g.concat(k)
						}
					} else {
						g.push(k)
					}
				}
				return g
			} else {
				return d.apply(this, arguments)
			}
		};
	return c
};
baidu.element = function(b) {
	var a = baidu._g(b);
	if (!a && baidu.dom.query) {
		a = baidu.dom.query(b)
	}
	return new baidu.element.Element(a)
};
baidu.e = baidu.element;
baidu.element.Element = function(a) {
	if (!baidu.element._init) {
		baidu.element._makeChain();
		baidu.element._init = true
	}
	this._dom = (a.tagName || "").toLowerCase() == "select" ? [a] : baidu.lang.toArray(a)
};
baidu.element.Element.prototype.each = function(a) {
	baidu.array.each(this._dom, function(c, b) {
		a.call(c, c, b)
	})
};
baidu.element._toChainFunction = function(c, b, a) {
	return baidu.fn.methodize(baidu.fn.wrapReturnValue(baidu.fn.multize(c, 0, 1), baidu.element.Element, b), "_dom")
};
baidu.element._makeChain = function() {
	var b = baidu.element.Element.prototype,
		c = baidu.element._toChainFunction;
	baidu.each(("draggable droppable resizable fixable").split(" "), function(d) {
		b[d] = c(baidu.dom[d], 1)
	});
	baidu.each(("remove getText contains getAttr getPosition getStyle hasClass intersect hasAttr getComputedStyle").split(" "), function(d) {
		b[d] = b[d.replace(/^get[A-Z]/g, a)] = c(baidu.dom[d], -1)
	});
	baidu.each(("addClass empty hide show insertAfter insertBefore insertHTML removeClass setAttr setAttrs setStyle setStyles show toggleClass toggle next first getAncestorByClass getAncestorBy getAncestorByTag getDocument getParent getWindow last next prev g removeStyle setBorderBoxSize setOuterWidth setOuterHeight setBorderBoxWidth setBorderBoxHeight setPosition children query").split(" "), function(d) {
		b[d] = b[d.replace(/^get[A-Z]/g, a)] = c(baidu.dom[d], 0)
	});
	b.q = b.Q = c(function(f, d) {
		return baidu.dom.q.apply(this, [d, f].concat([].slice.call(arguments, 2)))
	}, 0);
	baidu.each(("on un").split(" "), function(d) {
		b[d] = c(baidu.event[d], 0)
	});
	baidu.each(("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error").split(" "), function(d) {
		b[d] = function(f) {
			return this.on(d, f)
		}
	});

	function a(d) {
		return d.charAt(3).toLowerCase()
	}
};
baidu.element.extend = function(a) {
	var b = baidu.element;
	baidu.object.each(a, function(d, c) {
		b.Element.prototype[c] = baidu.element._toChainFunction(d, -1)
	})
};
baidu.event.EventArg = function(c, f) {
	f = f || window;
	c = c || f.event;
	var d = f.document;
	this.target = (c.target) || c.srcElement;
	this.keyCode = c.which || c.keyCode;
	for (var a in c) {
		var b = c[a];
		if ("function" != typeof b) {
			this[a] = b
		}
	}
	if (!this.pageX && this.pageX !== 0) {
		this.pageX = (c.clientX || 0) + (d.documentElement.scrollLeft || d.body.scrollLeft);
		this.pageY = (c.clientY || 0) + (d.documentElement.scrollTop || d.body.scrollTop)
	}
	this._event = c
};
baidu.event.EventArg.prototype.preventDefault = function() {
	if (this._event.preventDefault) {
		this._event.preventDefault()
	} else {
		this._event.returnValue = false
	}
	return this
};
baidu.event.EventArg.prototype.stopPropagation = function() {
	if (this._event.stopPropagation) {
		this._event.stopPropagation()
	} else {
		this._event.cancelBubble = true
	}
	return this
};
baidu.event.EventArg.prototype.stop = function() {
	return this.stopPropagation().preventDefault()
};
baidu.event._eventFilter = baidu.event._eventFilter || {};
baidu.event._eventFilter._crossElementBoundary = function(a, d) {
	var c = d.relatedTarget,
		b = d.currentTarget;
	if (c === false || b == c || (c && (c.prefix == "xul" || baidu.dom.contains(b, c)))) {
		return
	}
	return a.call(b, d)
};
baidu.fn.bind = function(b, a) {
	var c = arguments.length > 2 ? [].slice.call(arguments, 2) : null;
	return function() {
		var f = baidu.lang.isString(b) ? a[b] : b,
			d = (c) ? c.concat([].slice.call(arguments, 0)) : arguments;
		return f.apply(a || f, d)
	}
};
baidu.event._eventFilter.mouseenter = window.attachEvent ? null : function(a, b, c) {
	return {
		type: "mouseover",
		listener: baidu.fn.bind(baidu.event._eventFilter._crossElementBoundary, this, c)
	}
};
baidu.event._eventFilter.mouseleave = window.attachEvent ? null : function(a, b, c) {
	return {
		type: "mouseout",
		listener: baidu.fn.bind(baidu.event._eventFilter._crossElementBoundary, this, c)
	}
};
baidu.event._unload = function() {
	var c = baidu.event._listeners,
		a = c.length,
		b = !! window.removeEventListener,
		f, d;
	while (a--) {
		f = c[a];
		if (f[1] == "unload") {
			continue
		}
		if (!(d = f[0])) {
			continue
		}
		if (d.removeEventListener) {
			d.removeEventListener(f[1], f[3], false)
		} else {
			if (d.detachEvent) {
				d.detachEvent("on" + f[1], f[3])
			}
		}
	}
	if (b) {
		window.removeEventListener("unload", baidu.event._unload, false)
	} else {
		window.detachEvent("onunload", baidu.event._unload)
	}
};
if (window.attachEvent) {
	window.attachEvent("onunload", baidu.event._unload)
} else {
	window.addEventListener("unload", baidu.event._unload, false)
}
baidu.object.values = function(d) {
	var a = [],
		c = 0,
		b;
	for (b in d) {
		if (d.hasOwnProperty(b)) {
			a[c++] = d[b]
		}
	}
	return a
};
(function() {
	var d = baidu.browser,
		l = {
			keydown: 1,
			keyup: 1,
			keypress: 1
		},
		a = {
			click: 1,
			dblclick: 1,
			mousedown: 1,
			mousemove: 1,
			mouseup: 1,
			mouseover: 1,
			mouseout: 1
		},
		i = {
			abort: 1,
			blur: 1,
			change: 1,
			error: 1,
			focus: 1,
			load: d.ie ? 0 : 1,
			reset: 1,
			resize: 1,
			scroll: 1,
			select: 1,
			submit: 1,
			unload: d.ie ? 0 : 1
		},
		g = {
			scroll: 1,
			resize: 1,
			reset: 1,
			submit: 1,
			change: 1,
			select: 1,
			error: 1,
			abort: 1
		},
		k = {
			KeyEvents: ["bubbles", "cancelable", "view", "ctrlKey", "altKey", "shiftKey", "metaKey", "keyCode", "charCode"],
			MouseEvents: ["bubbles", "cancelable", "view", "detail", "screenX", "screenY", "clientX", "clientY", "ctrlKey", "altKey", "shiftKey", "metaKey", "button", "relatedTarget"],
			HTMLEvents: ["bubbles", "cancelable"],
			UIEvents: ["bubbles", "cancelable", "view", "detail"],
			Events: ["bubbles", "cancelable"]
		};
	baidu.object.extend(g, l);
	baidu.object.extend(g, a);

	function c(r, p) {
		var o = 0,
			n = r.length,
			q = {};
		for (; o < n; o++) {
			q[r[o]] = p[r[o]];
			delete p[r[o]]
		}
		return q
	}
	function f(p, o, n) {
		n = baidu.object.extend({}, n);
		var q = baidu.object.values(c(k[o], n)),
			r = document.createEvent(o);
		q.unshift(p);
		if ("KeyEvents" == o) {
			r.initKeyEvent.apply(r, q)
		} else {
			if ("MouseEvents" == o) {
				r.initMouseEvent.apply(r, q)
			} else {
				if ("UIEvents" == o) {
					r.initUIEvent.apply(r, q)
				} else {
					r.initEvent.apply(r, q)
				}
			}
		}
		baidu.object.extend(r, n);
		return r
	}
	function b(n) {
		var o;
		if (document.createEventObject) {
			o = document.createEventObject();
			baidu.object.extend(o, n)
		}
		return o
	}
	function h(q, n) {
		n = c(k.KeyEvents, n);
		var r;
		if (document.createEvent) {
			try {
				r = f(q, "KeyEvents", n)
			} catch (p) {
				try {
					r = f(q, "Events", n)
				} catch (o) {
					r = f(q, "UIEvents", n)
				}
			}
		} else {
			n.keyCode = n.charCode > 0 ? n.charCode : n.keyCode;
			r = b(n)
		}
		return r
	}
	function m(o, n) {
		n = c(k.MouseEvents, n);
		var p;
		if (document.createEvent) {
			p = f(o, "MouseEvents", n);
			if (n.relatedTarget && !p.relatedTarget) {
				if ("mouseout" == o.toLowerCase()) {
					p.toElement = n.relatedTarget
				} else {
					if ("mouseover" == o.toLowerCase()) {
						p.fromElement = n.relatedTarget
					}
				}
			}
		} else {
			n.button = n.button == 0 ? 1 : n.button == 1 ? 4 : baidu.lang.isNumber(n.button) ? n.button : 0;
			p = b(n)
		}
		return p
	}
	function j(p, n) {
		n.bubbles = g.hasOwnProperty(p);
		n = c(k.HTMLEvents, n);
		var r;
		if (document.createEvent) {
			try {
				r = f(p, "HTMLEvents", n)
			} catch (q) {
				try {
					r = f(p, "UIEvents", n)
				} catch (o) {
					r = f(p, "Events", n)
				}
			}
		} else {
			r = b(n)
		}
		return r
	}
	baidu.event.fire = function(o, p, n) {
		var q;
		p = p.replace(/^on/i, "");
		o = baidu.dom._g(o);
		n = baidu.object.extend({
			bubbles: true,
			cancelable: true,
			view: window,
			detail: 1,
			screenX: 0,
			screenY: 0,
			clientX: 0,
			clientY: 0,
			ctrlKey: false,
			altKey: false,
			shiftKey: false,
			metaKey: false,
			keyCode: 0,
			charCode: 0,
			button: 0,
			relatedTarget: null
		}, n);
		if (l[p]) {
			q = h(p, n)
		} else {
			if (a[p]) {
				q = m(p, n)
			} else {
				if (i[p]) {
					q = j(p, n)
				} else {
					throw (new Error(p + " is not support!"))
				}
			}
		}
		if (q) {
			if (o.dispatchEvent) {
				o.dispatchEvent(q)
			} else {
				if (o.fireEvent) {
					o.fireEvent("on" + p, q)
				}
			}
		}
	}
})();
baidu.event.get = function(a, b) {
	return new baidu.event.EventArg(a, b)
};
baidu.event.getKeyCode = function(a) {
	return a.which || a.keyCode
};
baidu.event.getPageX = function(b) {
	var a = b.pageX,
		c = document;
	if (!a && a !== 0) {
		a = (b.clientX || 0) + (c.documentElement.scrollLeft || c.body.scrollLeft)
	}
	return a
};
baidu.event.getPageY = function(b) {
	var a = b.pageY,
		c = document;
	if (!a && a !== 0) {
		a = (b.clientY || 0) + (c.documentElement.scrollTop || c.body.scrollTop)
	}
	return a
};
baidu.event.once = function(a, b, c) {
	a = baidu.dom._g(a);

	function d(f) {
		c.call(a, f);
		baidu.event.un(a, b, d)
	}
	baidu.event.on(a, b, d);
	return a
};
baidu.event.stopPropagation = function(a) {
	if (a.stopPropagation) {
		a.stopPropagation()
	} else {
		a.cancelBubble = true
	}
};
baidu.event.stop = function(a) {
	var b = baidu.event;
	b.stopPropagation(a);
	b.preventDefault(a)
};
baidu.fn.abstractMethod = function() {
	throw Error("unimplemented abstract method")
};
baidu.json = baidu.json || {};
baidu.json.parse = function(a) {
	return (new Function("return (" + a + ")"))()
};
baidu.json.decode = baidu.json.parse;
baidu.json.stringify = (function() {
	var b = {
		"\b": "\\b",
		"\t": "\\t",
		"\n": "\\n",
		"\f": "\\f",
		"\r": "\\r",
		'"': '\\"',
		"\\": "\\\\"
	};

	function a(g) {
		if (/["\\\x00-\x1f]/.test(g)) {
			g = g.replace(/["\\\x00-\x1f]/g, function(h) {
				var i = b[h];
				if (i) {
					return i
				}
				i = h.charCodeAt();
				return "\\u00" + Math.floor(i / 16).toString(16) + (i % 16).toString(16)
			})
		}
		return '"' + g + '"'
	}
	function d(n) {
		var h = ["["],
			j = n.length,
			g, k, m;
		for (k = 0; k < j; k++) {
			m = n[k];
			switch (typeof m) {
			case "undefined":
			case "function":
			case "unknown":
				break;
			default:
				if (g) {
					h.push(",")
				}
				h.push(baidu.json.stringify(m));
				g = 1
			}
		}
		h.push("]");
		return h.join("")
	}
	function c(g) {
		return g < 10 ? "0" + g : g
	}
	function f(g) {
		return '"' + g.getFullYear() + "-" + c(g.getMonth() + 1) + "-" + c(g.getDate()) + "T" + c(g.getHours()) + ":" + c(g.getMinutes()) + ":" + c(g.getSeconds()) + '"'
	}
	return function(l) {
		switch (typeof l) {
		case "undefined":
			return "undefined";
		case "number":
			return isFinite(l) ? String(l) : "null";
		case "string":
			return a(l);
		case "boolean":
			return String(l);
		default:
			if (l === null) {
				return "null"
			} else {
				if (l instanceof Array) {
					return d(l)
				} else {
					if (l instanceof Date) {
						return f(l)
					} else {
						var h = ["{"],
							k = baidu.json.stringify,
							g, j;
						for (var i in l) {
							if (Object.prototype.hasOwnProperty.call(l, i)) {
								j = l[i];
								switch (typeof j) {
								case "undefined":
								case "unknown":
								case "function":
									break;
								default:
									if (g) {
										h.push(",")
									}
									g = 1;
									h.push(k(i) + ":" + k(j))
								}
							}
						}
						h.push("}");
						return h.join("")
					}
				}
			}
		}
	}
})();
baidu.json.encode = baidu.json.stringify;
baidu.lang.Class.prototype.addEventListeners = function(c, d) {
	if (typeof d == "undefined") {
		for (var b in c) {
			this.addEventListener(b, c[b])
		}
	} else {
		c = c.split(",");
		var b = 0,
			a = c.length,
			f;
		for (; b < a; b++) {
			this.addEventListener(baidu.trim(c[b]), d)
		}
	}
};
baidu.lang.createClass = function(g, b) {
	b = b || {};
	var f = b.superClass || baidu.lang.Class;
	var d = function() {
			if (f != baidu.lang.Class) {
				f.apply(this, arguments)
			} else {
				f.call(this)
			}
			g.apply(this, arguments)
		};
	d.options = b.options || {};
	var j = function() {},
		h = g.prototype;
	j.prototype = f.prototype;
	var a = d.prototype = new j();
	for (var c in h) {
		a[c] = h[c]
	}
	typeof b.className == "string" && (a._className = b.className);
	a.constructor = h.constructor;
	d.extend = function(l) {
		for (var k in l) {
			d.prototype[k] = l[k]
		}
		return d
	};
	return d
};
baidu.lang.decontrol = function(b) {
	var a = window[baidu.guid];
	a._instances && (delete a._instances[b])
};
baidu.lang.eventCenter = baidu.lang.eventCenter || baidu.lang.createSingle();
baidu.lang.getModule = function(b, c) {
	var d = b.split("."),
		f = c || window,
		a;
	for (; a = d.shift();) {
		if (f[a] != null) {
			f = f[a]
		} else {
			return null
		}
	}
	return f
};
baidu.lang.inherits = function(h, f, d) {
	var c, g, a = h.prototype,
		b = new Function();
	b.prototype = f.prototype;
	g = h.prototype = new b();
	for (c in a) {
		g[c] = a[c]
	}
	h.prototype.constructor = h;
	h.superClass = f.prototype;
	if ("string" == typeof d) {
		g._className = d
	}
};
baidu.inherits = baidu.lang.inherits;
baidu.lang.instance = function(a) {
	return window[baidu.guid]._instances[a] || null
};
baidu.lang.isBoolean = function(a) {
	return typeof a === "boolean"
};
baidu.lang.isDate = function(a) {
	return {}.toString.call(a) === "[object Date]" && a.toString() !== "Invalid Date" && !isNaN(a)
};
baidu.lang.isElement = function(a) {
	return !!(a && a.nodeName && a.nodeType == 1)
};
baidu.lang.isObject = function(a) {
	return "function" == typeof a || !! (a && "object" == typeof a)
};
baidu.isObject = baidu.lang.isObject;
baidu.lang.module = function(name, module, owner) {
	var packages = name.split("."),
		len = packages.length - 1,
		packageName, i = 0;
	if (!owner) {
		try {
			if (!(new RegExp("^[a-zA-Z_\x24][a-zA-Z0-9_\x24]*\x24")).test(packages[0])) {
				throw ""
			}
			owner = eval(packages[0]);
			i = 1
		} catch (e) {
			owner = window
		}
	}
	for (; i < len; i++) {
		packageName = packages[i];
		if (!owner[packageName]) {
			owner[packageName] = {}
		}
		owner = owner[packageName]
	}
	if (!owner[packages[len]]) {
		owner[packages[len]] = module
	}
};
baidu.number.comma = function(b, a) {
	if (!a || a < 1) {
		a = 3
	}
	b = String(b).split(".");
	b[0] = b[0].replace(new RegExp("(\\d)(?=(\\d{" + a + "})+$)", "ig"), "$1,");
	return b.join(".")
};
baidu.number.randomInt = function(b, a) {
	return Math.floor(Math.random() * (a - b + 1) + b)
};
baidu.object.isPlain = function(c) {
	var b = Object.prototype.hasOwnProperty,
		a;
	if (!c || Object.prototype.toString.call(c) !== "[object Object]" || !("isPrototypeOf" in c)) {
		return false
	}
	if (c.constructor && !b.call(c, "constructor") && !b.call(c.constructor.prototype, "isPrototypeOf")) {
		return false
	}
	for (a in c) {}
	return a === undefined || b.call(c, a)
};
baidu.object.clone = function(f) {
	var b = f,
		c, a;
	if (!f || f instanceof Number || f instanceof String || f instanceof Boolean) {
		return b
	} else {
		if (baidu.lang.isArray(f)) {
			b = [];
			var d = 0;
			for (c = 0, a = f.length; c < a; c++) {
				b[d++] = baidu.object.clone(f[c])
			}
		} else {
			if (baidu.object.isPlain(f)) {
				b = {};
				for (c in f) {
					if (f.hasOwnProperty(c)) {
						b[c] = baidu.object.clone(f[c])
					}
				}
			}
		}
	}
	return b
};
baidu.object.isEmpty = function(b) {
	for (var a in b) {
		return false
	}
	return true
};
baidu.object.keys = function(d) {
	var a = [],
		c = 0,
		b;
	for (b in d) {
		if (d.hasOwnProperty(b)) {
			a[c++] = b
		}
	}
	return a
};
baidu.object.map = function(d, c) {
	var b = {};
	for (var a in d) {
		if (d.hasOwnProperty(a)) {
			b[a] = c(d[a], a)
		}
	}
	return b
};
(function() {
	var b = function(c) {
			return baidu.lang.isObject(c) && !baidu.lang.isFunction(c)
		};

	function a(h, g, f, d, c) {
		if (g.hasOwnProperty(f)) {
			if (c && b(h[f])) {
				baidu.object.merge(h[f], g[f], {
					overwrite: d,
					recursive: c
				})
			} else {
				if (d || !(f in h)) {
					h[f] = g[f]
				}
			}
		}
	}
	baidu.object.merge = function(j, c, l) {
		var f = 0,
			m = l || {},
			h = m.overwrite,
			k = m.whiteList,
			d = m.recursive,
			g;
		if (k && k.length) {
			g = k.length;
			for (; f < g; ++f) {
				a(j, c, k[f], h, d)
			}
		} else {
			for (f in c) {
				a(j, c, f, h, d)
			}
		}
		return j
	}
})();
baidu.page.createStyleSheet = function(a) {
	var g = a || {},
		d = g.document || document,
		c;
	if (baidu.browser.ie) {
		if (!g.url) {
			g.url = ""
		}
		return d.createStyleSheet(g.url, g.index)
	} else {
		c = "<style type='text/css'></style>";
		g.url && (c = "<link type='text/css' rel='stylesheet' href='" + g.url + "'/>");
		baidu.dom.insertHTML(d.getElementsByTagName("HEAD")[0], "beforeEnd", c);
		if (g.url) {
			return null
		}
		var b = d.styleSheets[d.styleSheets.length - 1],
			f = b.rules || b.cssRules;
		return {
			self: b,
			rules: b.rules || b.cssRules,
			addRule: function(h, k, j) {
				if (b.addRule) {
					return b.addRule(h, k, j)
				} else {
					if (b.insertRule) {
						isNaN(j) && (j = f.length);
						return b.insertRule(h + "{" + k + "}", j)
					}
				}
			},
			removeRule: function(h) {
				if (b.removeRule) {
					b.removeRule(h)
				} else {
					if (b.deleteRule) {
						isNaN(h) && (h = 0);
						b.deleteRule(h)
					}
				}
			}
		}
	}
};
baidu.page.getHeight = function() {
	var d = document,
		a = d.body,
		c = d.documentElement,
		b = d.compatMode == "BackCompat" ? a : d.documentElement;
	return Math.max(c.scrollHeight, a.scrollHeight, b.clientHeight)
};
baidu.page.getWidth = function() {
	var d = document,
		a = d.body,
		c = d.documentElement,
		b = d.compatMode == "BackCompat" ? a : d.documentElement;
	return Math.max(c.scrollWidth, a.scrollWidth, b.clientWidth)
};
baidu.page.lazyLoadImage = function(a) {
	a = a || {};
	a.preloadHeight = a.preloadHeight || 0;
	baidu.dom.ready(function() {
		var f = document.getElementsByTagName("IMG"),
			g = f,
			h = f.length,
			d = 0,
			l = c(),
			k = "data-tangram-ori-src",
			j;
		if (a.className) {
			g = [];
			for (; d < h; ++d) {
				if (baidu.dom.hasClass(f[d], a.className)) {
					g.push(f[d])
				}
			}
		}
		function c() {
			return baidu.page.getScrollTop() + baidu.page.getViewHeight() + a.preloadHeight
		}
		for (d = 0, h = g.length; d < h; ++d) {
			j = g[d];
			if (baidu.dom.getPosition(j).top > l) {
				j.setAttribute(k, j.src);
				a.placeHolder ? j.src = a.placeHolder : j.removeAttribute("src")
			}
		}
		var b = function() {
				var n = c(),
					p, q = true,
					o = 0,
					m = g.length;
				for (; o < m; ++o) {
					j = g[o];
					p = j.getAttribute(k);
					p && (q = false);
					if (baidu.dom.getPosition(j).top < n && p) {
						j.src = p;
						j.removeAttribute(k);
						baidu.lang.isFunction(a.onlazyload) && a.onlazyload(j)
					}
				}
				q && baidu.un(window, "scroll", b)
			};
		baidu.on(window, "scroll", b)
	})
};
baidu.page.load = function(c, k, f) {
	k = k || {};
	var i = baidu.page.load,
		a = i._cache = i._cache || {},
		h = i._loadingCache = i._loadingCache || {},
		g = k.parallel;

	function d() {
		for (var m = 0, l = c.length; m < l; ++m) {
			if (!a[c[m].url]) {
				setTimeout(arguments.callee, 10);
				return
			}
		}
		k.onload()
	}
	function b(n, p) {
		var o, m, l;
		switch (n.type.toLowerCase()) {
		case "css":
			o = document.createElement("link");
			o.setAttribute("rel", "stylesheet");
			o.setAttribute("type", "text/css");
			break;
		case "js":
			o = document.createElement("script");
			o.setAttribute("type", "text/javascript");
			o.setAttribute("charset", n.charset || i.charset);
			break;
		case "html":
			o = document.createElement("iframe");
			o.frameBorder = "none";
			break;
		default:
			return
		}
		l = function() {
			if (!m && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
				m = true;
				baidu.un(o, "load", l);
				baidu.un(o, "readystatechange", l);
				p.call(window, o)
			}
		};
		baidu.on(o, "load", l);
		baidu.on(o, "readystatechange", l);
		if (n.type == "css") {
			(function() {
				if (m) {
					return
				}
				try {
					o.sheet.cssRule
				} catch (q) {
					setTimeout(arguments.callee, 20);
					return
				}
				m = true;
				p.call(window, o)
			})()
		}
		o.href = o.src = n.url;
		document.getElementsByTagName("head")[0].appendChild(o)
	}
	baidu.lang.isString(c) && (c = [{
		url: c
	}]);
	if (!(c && c.length)) {
		return
	}
	function j(n) {
		var m = n.url,
			o = !! g,
			l, p = function(q) {
				a[n.url] = q;
				delete h[n.url];
				if (baidu.lang.isFunction(n.onload)) {
					if (false === n.onload.call(window, q)) {
						return
					}
				}!g && i(c.slice(1), k, true);
				if ((!f) && baidu.lang.isFunction(k.onload)) {
					d()
				}
			};
		n.type = n.type || m.substr(m.lastIndexOf(".") + 1);
		n.requestType = n.requestType || (n.type == "html" ? "ajax" : "dom");
		if (l = a[n.url]) {
			p(l);
			return o
		}
		if (!k.refresh && h[n.url]) {
			setTimeout(function() {
				j(n)
			}, 10);
			return o
		}
		h[n.url] = true;
		if (n.requestType.toLowerCase() == "dom") {
			b(n, p)
		} else {
			baidu.ajax.get(n.url, function(r, q) {
				p(q)
			})
		}
		return o
	}
	baidu.each(c, j)
};
baidu.page.load.charset = "UTF8";
baidu.page.loadCssFile = function(b) {
	var a = document.createElement("link");
	a.setAttribute("rel", "stylesheet");
	a.setAttribute("type", "text/css");
	a.setAttribute("href", b);
	document.getElementsByTagName("head")[0].appendChild(a)
};
baidu.page.loadJsFile = function(b) {
	var a = document.createElement("script");
	a.setAttribute("type", "text/javascript");
	a.setAttribute("src", b);
	a.setAttribute("defer", "defer");
	document.getElementsByTagName("head")[0].appendChild(a)
};
baidu.platform = baidu.platform || {};
baidu.platform.isAndroid = /android/i.test(navigator.userAgent);
baidu.platform.isIpad = /ipad/i.test(navigator.userAgent);
baidu.platform.isIphone = /iphone/i.test(navigator.userAgent);
baidu.platform.isMacintosh = /macintosh/i.test(navigator.userAgent);
baidu.platform.isWindows = /windows/i.test(navigator.userAgent);
baidu.platform.isX11 = /x11/i.test(navigator.userAgent);
baidu.sio = baidu.sio || {};
baidu.sio._createScriptTag = function(b, a, c) {
	b.setAttribute("type", "text/javascript");
	c && b.setAttribute("charset", c);
	b.setAttribute("src", a);
	document.getElementsByTagName("head")[0].appendChild(b)
};
baidu.sio._removeScriptTag = function(b) {
	if (b.clearAttributes) {
		b.clearAttributes()
	} else {
		for (var a in b) {
			if (b.hasOwnProperty(a)) {
				delete b[a]
			}
		}
	}
	if (b && b.parentNode) {
		b.parentNode.removeChild(b)
	}
	b = null
};
baidu.sio.callByBrowser = function(a, h, j) {
	var d = document.createElement("SCRIPT"),
		f = 0,
		k = j || {},
		c = k.charset,
		i = h ||
	function() {}, g = k.timeOut || 0, b;
	d.onload = d.onreadystatechange = function() {
		if (f) {
			return
		}
		var l = d.readyState;
		if ("undefined" == typeof l || l == "loaded" || l == "complete") {
			f = 1;
			try {
				i();
				clearTimeout(b)
			} finally {
				d.onload = d.onreadystatechange = null;
				baidu.sio._removeScriptTag(d)
			}
		}
	};
	if (g) {
		b = setTimeout(function() {
			d.onload = d.onreadystatechange = null;
			baidu.sio._removeScriptTag(d);
			k.onfailure && k.onfailure()
		}, g)
	}
	baidu.sio._createScriptTag(d, a, c)
};
baidu.sio.callByServer = function(a, n, o) {
	var j = document.createElement("SCRIPT"),
		i = "bd__cbs__",
		l, f, p = o || {},
		d = p.charset,
		g = p.queryField || "callback",
		m = p.timeOut || 0,
		b, c = new RegExp("(\\?|&)" + g + "=([^&]*)"),
		h;
	if (baidu.lang.isFunction(n)) {
		l = i + Math.floor(Math.random() * 2147483648).toString(36);
		window[l] = k(0)
	} else {
		if (baidu.lang.isString(n)) {
			l = n
		} else {
			if (h = c.exec(a)) {
				l = h[2]
			}
		}
	}
	if (m) {
		b = setTimeout(k(1), m)
	}
	a = a.replace(c, "\x241" + g + "=" + l);
	if (a.search(c) < 0) {
		a += (a.indexOf("?") < 0 ? "?" : "&") + g + "=" + l
	}
	baidu.sio._createScriptTag(j, a, d);

	function k(q) {
		return function() {
			try {
				if (q) {
					p.onfailure && p.onfailure()
				} else {
					n.apply(window, arguments);
					clearTimeout(b)
				}
				window[l] = null;
				delete window[l]
			} catch (r) {} finally {
				baidu.sio._removeScriptTag(j)
			}
		}
	}
};
baidu.sio.log = function(b) {
	var a = new Image(),
		c = "tangram_sio_log_" + Math.floor(Math.random() * 2147483648).toString(36);
	window[c] = a;
	a.onload = a.onerror = a.onabort = function() {
		a.onload = a.onerror = a.onabort = null;
		window[c] = null;
		a = null
	};
	a.src = b
};
baidu.string.decodeHTML = function(a) {
	var b = String(a).replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
	return b.replace(/&#([\d]+);/g, function(d, c) {
		return String.fromCharCode(parseInt(c, 10))
	})
};
baidu.decodeHTML = baidu.string.decodeHTML;
baidu.string.encodeHTML = function(a) {
	return String(a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
};
baidu.encodeHTML = baidu.string.encodeHTML;
baidu.string.filterFormat = function(c, a) {
	var b = Array.prototype.slice.call(arguments, 1),
		d = Object.prototype.toString;
	if (b.length) {
		b = b.length == 1 ? (a !== null && (/\[object Array\]|\[object Object\]/.test(d.call(a))) ? a : b) : b;
		return c.replace(/#\{(.+?)\}/g, function(g, k) {
			var m, j, h, f, l;
			if (!b) {
				return ""
			}
			m = k.split("|");
			j = b[m[0]];
			if ("[object Function]" == d.call(j)) {
				j = j(m[0])
			}
			for (h = 1, f = m.length; h < f; ++h) {
				l = baidu.string.filterFormat[m[h]];
				if ("[object Function]" == d.call(l)) {
					j = l(j)
				}
			}
			return (("undefined" == typeof j || j === null) ? "" : j)
		})
	}
	return c
};
baidu.string.filterFormat.escapeJs = function(f) {
	if (!f || "string" != typeof f) {
		return f
	}
	var d, a, b, c = [];
	for (d = 0, a = f.length; d < a; ++d) {
		b = f.charCodeAt(d);
		if (b > 255) {
			c.push(f.charAt(d))
		} else {
			c.push("\\x" + b.toString(16))
		}
	}
	return c.join("")
};
baidu.string.filterFormat.js = baidu.string.filterFormat.escapeJs;
baidu.string.filterFormat.escapeString = function(a) {
	if (!a || "string" != typeof a) {
		return a
	}
	return a.replace(/["'<>\\\/`]/g, function(b) {
		return "&#" + b.charCodeAt(0) + ";"
	})
};
baidu.string.filterFormat.e = baidu.string.filterFormat.escapeString;
baidu.string.filterFormat.toInt = function(a) {
	return parseInt(a, 10) || 0
};
baidu.string.filterFormat.i = baidu.string.filterFormat.toInt;
baidu.string.format = function(c, a) {
	c = String(c);
	var b = Array.prototype.slice.call(arguments, 1),
		d = Object.prototype.toString;
	if (b.length) {
		b = b.length == 1 ? (a !== null && (/\[object Array\]|\[object Object\]/.test(d.call(a))) ? a : b) : b;
		return c.replace(/#\{(.+?)\}/g, function(f, h) {
			var g = b[h];
			if ("[object Function]" == d.call(g)) {
				g = g(h)
			}
			return ("undefined" == typeof g ? "" : g)
		})
	}
	return c
};
baidu.format = baidu.string.format;
(function() {
	var c = /^\#[\da-f]{6}$/i,
		b = /^rgb\((\d+), (\d+), (\d+)\)$/,
		a = {
			black: "#000000",
			silver: "#c0c0c0",
			gray: "#808080",
			white: "#ffffff",
			maroon: "#800000",
			red: "#ff0000",
			purple: "#800080",
			fuchsia: "#ff00ff",
			green: "#008000",
			lime: "#00ff00",
			olive: "#808000",
			yellow: "#ffff0",
			navy: "#000080",
			blue: "#0000ff",
			teal: "#008080",
			aqua: "#00ffff"
		};
	baidu.string.formatColor = function(f) {
		if (c.test(f)) {
			return f
		} else {
			if (b.test(f)) {
				for (var k, j = 1, f = "#"; j < 4; j++) {
					k = parseInt(RegExp["\x24" + j]).toString(16);
					f += ("00" + k).substr(k.length)
				}
				return f
			} else {
				if (/^\#[\da-f]{3}$/.test(f)) {
					var h = f.charAt(1),
						g = f.charAt(2),
						d = f.charAt(3);
					return "#" + h + h + g + g + d + d
				} else {
					if (a[f]) {
						return a[f]
					}
				}
			}
		}
		return ""
	}
})();
baidu.string.getByteLength = function(a) {
	return String(a).replace(/[^\x00-\xff]/g, "ci").length
};
baidu.string.stripTags = function(a) {
	return String(a || "").replace(/<[^>]+>/g, "")
};
baidu.string.subByte = function(c, b, a) {
	c = String(c);
	a = a || "";
	if (b < 0 || baidu.string.getByteLength(c) <= b) {
		return c + a
	}
	c = c.substr(0, b).replace(/([^\x00-\xff])/g, "\x241 ").substr(0, b).replace(/[^\x00-\xff]$/, "").replace(/([^\x00-\xff]) /g, "\x241");
	return c + a
};
baidu.string.toHalfWidth = function(a) {
	return String(a).replace(/[\uFF01-\uFF5E]/g, function(b) {
		return String.fromCharCode(b.charCodeAt(0) - 65248)
	}).replace(/\u3000/g, " ")
};
baidu.string.wbr = function(a) {
	return String(a).replace(/(?:<[^>]+>)|(?:&#?[0-9a-z]{2,6};)|(.{1})/gi, "$&<wbr>").replace(/><wbr>/g, ">")
};
baidu.swf = baidu.swf || {};
baidu.swf.getMovie = function(c) {
	var a = document[c],
		b;
	return baidu.browser.ie == 9 ? a && a.length ? (b = baidu.array.remove(baidu.lang.toArray(a), function(d) {
		return d.tagName.toLowerCase() != "embed"
	})).length == 1 ? b[0] : b : a : a || window[c]
};
baidu.swf.Proxy = function(g, c, d) {
	var b = this,
		a = this._flash = baidu.swf.getMovie(g),
		f;
	if (!c) {
		return this
	}
	f = setInterval(function() {
		try {
			if (a[c]) {
				b._initialized = true;
				clearInterval(f);
				if (d) {
					d()
				}
			}
		} catch (h) {}
	}, 100)
};
baidu.swf.Proxy.prototype.getFlash = function() {
	return this._flash
};
baidu.swf.Proxy.prototype.isReady = function() {
	return !!this._initialized
};
baidu.swf.Proxy.prototype.call = function(a, f) {
	try {
		var c = this.getFlash(),
			b = Array.prototype.slice.call(arguments);
		b.shift();
		if (c[a]) {
			c[a].apply(c, b)
		}
	} catch (d) {}
};
baidu.swf.version = (function() {
	var h = navigator;
	if (h.plugins && h.mimeTypes.length) {
		var d = h.plugins["Shockwave Flash"];
		if (d && d.description) {
			return d.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".") + ".0"
		}
	} else {
		if (window.ActiveXObject && !window.opera) {
			for (var b = 12; b >= 2; b--) {
				try {
					var g = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + b);
					if (g) {
						var a = g.GetVariable("$version");
						return a.replace(/WIN/g, "").replace(/,/g, ".")
					}
				} catch (f) {}
			}
		}
	}
})();
baidu.swf.createHTML = function(t) {
	t = t || {};
	var l = baidu.swf.version,
		h = t.ver || "6.0.0",
		g, d, f, c, j, s, a = {},
		p = baidu.string.encodeHTML;
	for (c in t) {
		a[c] = t[c]
	}
	t = a;
	if (l) {
		l = l.split(".");
		h = h.split(".");
		for (f = 0; f < 3; f++) {
			g = parseInt(l[f], 10);
			d = parseInt(h[f], 10);
			if (d < g) {
				break
			} else {
				if (d > g) {
					return ""
				}
			}
		}
	} else {
		return ""
	}
	var n = t.vars,
		m = ["classid", "codebase", "id", "width", "height", "align"];
	t.align = t.align || "middle";
	t.classid = "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000";
	t.codebase = "http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0";
	t.movie = t.url || "";
	delete t.vars;
	delete t.url;
	if ("string" == typeof n) {
		t.flashvars = n
	} else {
		var q = [];
		for (c in n) {
			s = n[c];
			q.push(c + "=" + encodeURIComponent(s))
		}
		t.flashvars = q.join("&")
	}
	var o = ["<object "];
	for (f = 0, j = m.length; f < j; f++) {
		s = m[f];
		o.push(" ", s, '="', p(t[s]), '"')
	}
	o.push(">");
	var b = {
		wmode: 1,
		scale: 1,
		quality: 1,
		play: 1,
		loop: 1,
		menu: 1,
		salign: 1,
		bgcolor: 1,
		base: 1,
		allowscriptaccess: 1,
		allownetworking: 1,
		allowfullscreen: 1,
		seamlesstabbing: 1,
		devicefont: 1,
		swliveconnect: 1,
		flashvars: 1,
		movie: 1
	};
	for (c in t) {
		s = t[c];
		c = c.toLowerCase();
		if (b[c] && (s || s === false || s === 0)) {
			o.push('<param name="' + c + '" value="' + p(s) + '" />')
		}
	}
	t.src = t.movie;
	t.name = t.id;
	delete t.id;
	delete t.movie;
	delete t.classid;
	delete t.codebase;
	t.type = "application/x-shockwave-flash";
	t.pluginspage = "http://www.macromedia.com/go/getflashplayer";
	o.push("<embed");
	var r;
	for (c in t) {
		s = t[c];
		if (s || s === false || s === 0) {
			if ((new RegExp("^salign\x24", "i")).test(c)) {
				r = s;
				continue
			}
			o.push(" ", c, '="', p(s), '"')
		}
	}
	if (r) {
		o.push(' salign="', p(r), '"')
	}
	o.push("></embed></object>");
	return o.join("")
};
baidu.swf.create = function(a, c) {
	a = a || {};
	var b = baidu.swf.createHTML(a) || a.errorMessage || "";
	if (c && "string" == typeof c) {
		c = document.getElementById(c)
	}
	if (c) {
		c.innerHTML = b
	} else {
		document.write(b)
	}
};
baidu.url.getQueryValue = function(b, c) {
	var d = new RegExp("(^|&|\\?|#)" + baidu.string.escapeReg(c) + "=([^&#]*)(&|\x24|#)", "");
	var a = b.match(d);
	if (a) {
		return a[2]
	}
	return null
};
baidu.url.jsonToQuery = function(c, f) {
	var a = [],
		d, b = f ||
	function(g) {
		return baidu.url.escapeSymbol(g)
	};
	baidu.object.each(c, function(h, g) {
		if (baidu.lang.isArray(h)) {
			d = h.length;
			while (d--) {
				a.push(g + "=" + b(h[d], g))
			}
		} else {
			a.push(g + "=" + b(h, g))
		}
	});
	return a.join("&")
};
baidu.url.queryToJson = function(a) {
	var g = a.substr(a.lastIndexOf("?") + 1),
		c = g.split("&"),
		f = c.length,
		l = {},
		d = 0,
		j, h, k, b;
	for (; d < f; d++) {
		if (!c[d]) {
			continue
		}
		b = c[d].split("=");
		j = b[0];
		h = b[1];
		k = l[j];
		if ("undefined" == typeof k) {
			l[j] = h
		} else {
			if (baidu.lang.isArray(k)) {
				k.push(h)
			} else {
				l[j] = [k, h]
			}
		}
	}
	return l
};
var ucsl = UC_SAFE_LOGIN;
ucsl.reset = ucsl.reset ||
function() {
	var a = document.getElementById("ucsl-input-sid");
	var b = document.getElementById("ucsl-input-pwd");
	if (a) {
		a.value = ""
	}
	if (b) {
		b.value = ""
	}
};
var Form = (function() {
	var $ = baidu.G;
	var isIE = !! window.ActiveXObject;
	var trim = baidu.string.trim;
	var hasClass = baidu.dom.hasClass;
	var addClass = baidu.addClass;
	var setAttr = baidu.dom.setAttr;
	var removeClass = baidu.removeClass;
	var BaiduSafeInput = ucsl.BaiduSafeInput;
	var config = {
		PLUGID: "password_edit",
		PLUGCONTAINERID: "uc-safe-pwd-input",
		LoginFormID: "login_form",
		UserNameID: "username",
		PasswordAreaID: "entered_password_area",
		PasswordID: "entered_password",
		VerifyCodeID: "entered_imagecode",
		IsSafeContainnerID: "is-safe-container",
		IsSafeID: "is-safe",
		ErrorBoxID: "ErrorSpan",
		ErrorNameID: "ErrorSpan",
		ErrorPswID: "ErrorSpan",
		ErrorCodeID: "ErrorSpan",
		useSafe: ucsl.support(),
		issafe: 0,
		isMultiple: 1,
		showDefault: 1,
		isUseful: 1,
		boxHeight: 30
	};
	config.isMultiple = config.isMultiple && config.useSafe;
	if (baidu.cookie.get("isSafe") != null && config.isMultiple) {
		config.issafe = baidu.cookie.get("isSafe") == 1 && config.useSafe
	} else {
		config.issafe = config.issafe && config.useSafe
	}
	var showDefault = config.showDefault;
	var formInterval = 0;
	var useFormInterval = showDefault || baidu.browser.chrome;
	var filedInfos = {};
	var passwordFocusing = false;
	var userNameLabel = $(config.UserNameID + "Label");
	var passwordLabel = $(config.PasswordID + "Label");
	var verifyCodeLabel = $(config.VerifyCodeID + "Label");
	var passwordInput = $(config.PasswordID);
	var passwordArea = $(config.PasswordAreaID);
	var plugInputContainer = $(config.PLUGCONTAINERID);
	var plugInput = null;

	function onFocus() {
		addClass(this.parentNode, "login-input-hover");
		switch (this.id) {
		case config.UserNameID:
			$(config.ErrorNameID).innerHTML = "";
			break;
		case config.PasswordID:
			$(config.ErrorPswID).innerHTML = "";
			passwordFocusing = true;
			break;
		case config.VerifyCodeID:
			$(config.ErrorCodeID).innerHTML = "";
			break
		}
		if (showDefault) {
			var label = $(this.id + "Label");
			if (label) {
				label.style.display = "none"
			}
			if ((!isIE && config.issafe)) {
				hidePasswordLabel();
				showPasswordInput()
			}
		}
	}
	function onBlur() {
		removeClass(this.parentNode, "login-input-hover");
		if (showDefault) {
			var label = $(this.id + "Label");
			if (label && trim(this.value) == "") {
				label.style.display = "block"
			}
			if (this.id == config.PasswordID) {
				passwordFocusing = 0
			}
		}
	}
	function onLabelClick() {
		this.style.display = "none";
		if (!isIE && config.issafe) {
			hidePasswordLabel()
		}
	}
	function onPasswordLabelClick(e) {
		passwordFocusing = 1;
		hidePasswordLabel();
		showPasswordInput();
		if (config.issafe) {
			if (plugInput && plugInput.focus) {
				plugInput.focus()
			}
		} else {
			passwordInput.focus()
		}
	}
	function showPasswordInput() {
		if (config.issafe) {
			passwordArea.scrollTop = config.boxHeight
		} else {
			passwordArea.scrollTop = 0
		}
	}
	function hidePasswordInput() {
		passwordArea.scrollTop = 0
	}
	function showPasswordLabel() {
		passwordLabel.style.display = "block"
	}
	function hidePasswordLabel() {
		passwordLabel.style.display = "none"
	}
	function useSafeLogin() {
		config.issafe = 1;
		baidu.cookie.set("isSafe", config.issafe, {
			expires: 3600 * 1000 * 24 * 180
		});
		showPasswordInput();
		passwordFocusing = 0;
		if (useFormInterval) {
			if (formInterval > 0) {
				window.clearInterval(formInterval)
			}
			formInterval = 0
		}
	}
	function useNormalLogin() {
		config.issafe = 0;
		baidu.cookie.set("isSafe", config.issafe, {
			expires: 3600 * 1000 * 24 * 180
		});
		ucsl.reset();
		showPasswordInput();
		passwordInput.value = "";
		if (useFormInterval) {
			formInterval = window.setInterval(formIntervalHandler, 100);
			window.onunload = function() {
				window.clearInterval(formInterval)
			}
		}
	}
	function bindEventHandler() {
		var username = $(config.UserNameID);
		var usernameLabel = $(config.UserNameID + "Label");
		var password = $(config.PasswordID);
		var passwordLabel = $(config.PasswordID + "Label");
		var code = $(config.VerifyCodeID);
		var codeLabel = $(config.VerifyCodeID + "Label");
		var submitBtn = $(config.SubmitBtnID);
		var changeCode = $("changeVerifyCode");
		var form = $(config.LoginFormID);
		username.onfocus = onFocus;
		password.onfocus = onFocus;
		code.onfocus = onFocus;
		username.onblur = onBlur;
		password.onblur = onBlur;
		code.onblur = onBlur;
		changeCode.onclick = reloadVerifyImg;
		username.onkeydown = userNameKeyDown;
		password.onkeydown = passwordKeyDown;
		form.onsubmit = formSubmit;
		if (showDefault) {
			usernameLabel.onclick = onLabelClick;
			codeLabel.onclick = onLabelClick;
			passwordLabel.onclick = onPasswordLabelClick
		}
	}
	function reloadVerifyImg() {
		var verifyCodeUrl = $("verifyCodeImage").src;
		$("verifyCodeImage").src = verifyCodeUrl + "&_=" + Math.random();
		return false
	}
	function displayError(message, preserveHTML) {
		var label = $(config.ErrorCodeID);
		if (preserveHTML) {
			label.innerHTML = preserveHTML
		} else {
			label.innerHTML = message
		}
		label.style.display = "block"
	}
	function formSubmit() {
		var form = $(config.LoginFormID);
		if (trim(form.username.value) == "") {
			displayError("请输入用户名");
			return false
		}
		if (!config.issafe && trim(form.entered_password.value) == "") {
			displayError("请输入密码");
			return false
		}
		if (config.issafe) {
			if (!ucsl.verify()) {
				displayError("请输入密码");
				return false
			} else {
				displayError("")
			}
		}
		if (trim(form.entered_imagecode.value) == "") {
			displayError("请输入验证码");
			return false
		}
		var username = form.username.value;
		if (username.indexOf("@") >= 0) {
			baidu.ajax.post("user!getUserName.action", "userName=" + username, function(xhr) {
				var result = eval("(" + xhr.responseText + ")");
				if (result.success === "true") {
					form.entered_login.value = result.userName;
					login()
				} else {
					displayError(result.message.field.userName)
				}
			})
		} else {
			form.entered_login.value = username;
			login()
		}
		return false
	}
	function login() {
		document.cookie = "lst_i=" + (+new Date);
		document.cookie = "lst_m=; expires=" + (new Date(0)).toGMTString();
		document.cookie = "lst_s=; expires=" + (new Date(0)).toGMTString();
		var form = $(config.LoginFormID);
		var now = +new Date;
		form.fromu.value = form.fromu.value + "?.stamp=" + now;
		setTimeout(function() {
			form.submit()
		}, 200)
	}
	function userNameKeyDown(e) {
		var evt = e || window.event;
		if (config.issafe && 9 == evt.keyCode) {
			try {
				if (plugInput && plugInput.focus) {
					hidePasswordLabel();
					plugInput.focus()
				}
			} catch (er) {}
			evt.returnValue = false;
			return false
		}
	}
	function passwordKeyDown(e) {
		var evt = e || window.event;
		if (9 == evt.keyCode) {
			if (showDefault) {
				verifyCodeLabel.style.display = "none"
			}
			$(config.VerifyCodeID).focus();
			if (e && e.preventDefault) {
				e.preventDefault()
			} else {
				window.event.returnValue = false
			}
			return false
		}
	}
	function queryToJson(url) {
		var query = url.substr(url.lastIndexOf("?") + 1);
		var params = query.split("&");
		var len = params.length;
		var result = {};
		var i = 0;
		var key;
		var value;
		var item;
		var param;
		for (; i < len; i++) {
			if (!params[i]) {
				continue
			}
			param = params[i].split("=");
			key = decodeURIComponent(param[0]);
			value = decodeURIComponent(param[1]);
			item = result[key];
			if ("undefined" == typeof item) {
				result[key] = value
			} else {
				if (baidu.lang.isArray(item)) {
					item.push(value)
				} else {
					result[key] = [item, value]
				}
			}
		}
		return result
	}
	function encodeHTML(str) {
		return str.replace(/([&<>'"])/g, function(matcher, symbol) {
			return "&#" + symbol.charCodeAt(0) + ";"
		})
	}
	function setFieldValue(source) {
		if (source.errno) {
			var errorBox = $(config.ErrorBoxID);
			if (errorBox) {
				if (source.errno == "135") {
					displayError('账户被锁定,请用“<a href="http://adm.baidu.com/findPassword.jsp">忘记密码</a>”解锁')
				} else {
					displayError(encodeHTML(decodeURI(source.e)))
				}
			}
		}
	}
	function checkPassword() {
		var value = passwordInput ? trim(passwordInput.value) : "";
		return value.length > 0
	}
	function passwordChange() {
		if (showDefault && !passwordFocusing && !config.issafe) {
			if (checkPassword()) {
				hidePasswordLabel()
			} else {
				showPasswordLabel();
				hidePasswordInput()
			}
		}
	}
	function formIntervalHandler() {
		passwordChange();
		if (baidu.browser.chrome) {
			if (passwordFocusing) {
				showPasswordInput()
			}
		}
	}
	function render() {
		if (config.useSafe) {
			if (config.issafe) {
				useSafeLogin()
			} else {
				useNormalLogin()
			}
			if (config.isMultiple) {
				var isSafeContainer = $(config.IsSafeContainnerID);
				var isSafe = $(config.IsSafeID);
				if (isSafeContainer && isSafe) {
					removeClass(isSafeContainer, "hidden");
					isSafe.onclick = function() {
						var checked = isSafe.checked;
						if (checked) {
							useSafeLogin()
						} else {
							useNormalLogin()
						}
					};
					isSafe.checked = !! config.issafe
				}
			}
		}
		showPasswordInput();
		if (showDefault) {
			userNameLabel.style.display = "block";
			verifyCodeLabel.style.display = "block";
			passwordLabel.style.display = "block";
			if (!config.issafe || ucsl.isInstall) {
				hidePasswordInput();
				showPasswordLabel()
			}
		}
	}
	function safeInputReady() {
		config.isUseful = 1;
		plugInput = $(config.PLUGID)
	}
	function safeInputFail() {
		config.isUseful = 0
	}
	return {
		reloadVerifyImg: reloadVerifyImg,
		render: render,
		bindEventHandler: bindEventHandler,
		setFieldValue: setFieldValue,
		queryToJson: queryToJson,
		safeInputReady: safeInputReady,
		safeInputFail: safeInputFail,
		config: config
	}
})();
baidu.dom.ready(function() {
	if (Form.config.useSafe) {
		ucsl.init({
			fid: Form.config.PLUGCONTAINERID,
			style: {
				width: 262,
				height: 29,
				tabindex: -1
			},
			tabout: Form.config.VerifyCodeID,
			ready: function() {
				Form.safeInputReady()
			},
			fail: function() {
				Form.safeInputFail()
			}
		})
	}
	Form.render();
	Form.setFieldValue(Form.queryToJson(top.location.href));
	Form.bindEventHandler()
});
