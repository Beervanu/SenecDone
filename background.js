chrome.action.onClicked.addListener((tab) => {
	chrome.scripting.executeScript({
		target: {tabId: tab.id},
		files: ['test.js']
	})
})

function onMessage(message, sender, sendResponse)
{
	console.log(message)
}

chrome.runtime.onMessage.addListener(onMessage)