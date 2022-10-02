let root = document.querySelector('#root'),
	oldURI,
	config = {auto:false}
chrome.storage.sync.get(['auto'], (cfg) => config = cfg)
chrome.storage.sync.onChanged.addListener((changes) => Object.assign(config, changes))
//doesn't work yet
function __run()
{
	let randMillisec = Math.floor((config.time + Math.random()-.5)*60*1000)

	
	root.style.setProperty('opacity', 0.5)
	config.time ? setTimeout(() => 
	{
		root.style.setProperty('opacity', 1)
		chrome.runtime.sendMessage({action: "runSenecDone"})
	}, randMillisec) : chrome.runtime.sendMessage({action: "runSenecDone"})
	return randMillisec
}

function run()
{
	chrome.runtime.sendMessage({action: "runSenecDone"})
}

let helpObserver = new MutationObserver((mutRecords, observer) => {
	// when uri has changed and we are on a start new session page
	let sessionButton = document.querySelector('#session_startNewSession')
	if(sessionButton && oldURI !== root.baseURI)
	{
		oldURI = root.baseURI
		if (config.auto)
		{
			run()
		}
		else
		{
			let s = document.createElement('span')
			s.innerHTML = ' or senecDone'
			s.id = "senecHelp"
			s.onclick = () => {
				run()
				s.remove()
			}
			document.querySelector('.SessionControlBar_wrapper__2XLzu').after(s)
			sessionButton.addEventListener('click', () => s.remove())
		}
	}
})
helpObserver.observe(root, {childList: true, subtree: true})