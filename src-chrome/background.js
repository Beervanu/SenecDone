function insertScript(scriptName)
{
	let s = document.createElement('script')
	s.src = chrome.runtime.getURL(scriptName)
	s.onload = function() {
		this.remove()
	}.bind(s)
	document.head.appendChild(s)
}

function onMessage(message, sender, sendResponse)
{
	if (message.action === "runSenecDone")
	{
		chrome.scripting.executeScript({
			target: {tabId: sender.tab.id},
			func: insertScript,
			args: ['script.js']
		})
	}
}
chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.set({auto:false})
})

chrome.runtime.onMessage.addListener(onMessage)