let __senecHelpButtonSet = false
let root = document.querySelector('#root')
let oldURI = root.baseURI
let autoRun = false
let auto = false 
chrome.storage.sync.get('auto', (d) => auto = d.auto)
chrome.storage.sync.onChanged.addListener((changes) => auto = changes.auto.newValue)

window.addEventListener('message', async (message) => {
	if (message.data === '__senecDone' && auto)
	{
		autoRun = true
	}
})

let helpObserver = new MutationObserver(async (mutRecords, observer) => {
	if(oldURI !== root.baseURI)
	{	
		oldURI = root.baseURI
		if(!auto)
		{
			__senecHelpButtonSet = false
		}
		if(root.baseURI.endsWith('section-overview')) autoRun = false
	}
	
	// b checks the page is loaded
	let b = document.querySelector('.SessionControlBar_wrapper__2XLzu')
	if(b)
	{
		if (!__senecHelpButtonSet)
		{
			let s = document.createElement('span')
			s.innerHTML = ' or senecDone'
			s.id = "senecHelp"
			s.onclick = () => {
				chrome.runtime.sendMessage({action: "runSenecDone"})
				s.remove()
			}
			__senecHelpButtonSet = true
			b.after(s)
		}
		else if (autoRun)
		{
			chrome.runtime.sendMessage({action: "runSenecDone"})
			autoRun = false
		}
	}
})
helpObserver.observe(root, {childList: true, subtree: true})