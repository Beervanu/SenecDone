var s = document.createElement('script')
s.src = chrome.runtime.getURL('script.js')
s.onload = function() {
	this.remove()
}.bind(s)
document.head.appendChild(s)