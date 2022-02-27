let root = document.querySelector('#root'),
	oldURI,
	auto = false
chrome.storage.sync.get('auto', (d) => auto = d.auto)
chrome.storage.sync.onChanged.addListener((changes) => auto = changes.auto.newValue)

let helpObserver = new MutationObserver(async (mutRecords, observer) => {
	// when uri has changed and we are on a start new session page
	if(document.querySelector('#session_startNewSession') && oldURI !== root.baseURI)
	{
		oldURI = root.baseURI
		if (auto)
		{
			chrome.runtime.sendMessage({action: "runSenecDone"})
		}
		else
		{
			let s = document.createElement('span')
			s.innerHTML = ' or senecDone'
			s.id = "senecHelp"
			s.onclick = () => {
				chrome.runtime.sendMessage({action: "runSenecDone"})
				s.remove()
			}
			document.querySelector('.SessionControlBar_wrapper__2XLzu').after(s)
		}
	}
})
helpObserver.observe(root, {childList: true, subtree: true})