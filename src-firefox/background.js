function insertScript(scriptName)
{
	let s = document.createElement('script')
	s.src = browser.runtime.getURL(scriptName)
	s.onload = function() {
		this.remove()
	}.bind(s)
	document.head.appendChild(s)
}

function onMessage(message, sender, sendResponse)
{
	if (message.action === "runSenecDone")
	{
		browser.scripting.executeScript({
			target: {tabId: sender.tab.id},
			func: insertScript,
			args: ['script.js']
		})
	}
}
browser.runtime.onInstalled.addListener(() => {
	browser.storage.sync.set({auto:false})
})

browser.runtime.onMessage.addListener(onMessage)