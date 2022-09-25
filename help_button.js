let root = document.querySelector('#root'),
	oldURI,
	config = {auto:false, time: 0}
chrome.storage.sync.get(['auto', 'time'], (cfg) => config = cfg)
chrome.storage.sync.onChanged.addListener((changes) => Object.assign(config, changes))
//doesn't work yet
function __run()
{
	let randTime = config.time*1000*60 + (Math.random()*120-60)

	
	document.querySelector(body).style.setProperty('opacity', 0.5)
	timerID = setInterval(()=> {}, 1000)
	document.querySelector('#session_startNewSession').click()
	config.time ? setTimeout(() => 
	{
		chrome.runtime.sendMessage({action: "runSenecDone"})
		clearInterval(timerID)
		document.querySelector(body).style.setProperty('opacity', 1)
	}, randTime) : chrome.runtime.sendMessage({action: "runSenecDone"})
	return randTime
}

function run()
{
	chrome.runtime.sendMessage({action: "runSenecDone"})
}

let helpObserver = new MutationObserver((mutRecords, observer) => {
	// when uri has changed and we are on a start new session page
	if(document.querySelector('#session_startNewSession') && oldURI !== root.baseURI)
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
		}
	}
})
helpObserver.observe(root, {childList: true, subtree: true})

// let root = document.querySelector('#root'),
// 	oldURI,
// 	auto = false
// chrome.storage.sync.get('auto', (d) => auto = d.auto)
// chrome.storage.sync.onChanged.addListener((changes) => auto = changes.auto.newValue)

// let helpObserver = new MutationObserver(async (mutRecords, observer) => {
// 	// when uri has changed and we are on a start new session page
// 	if(document.querySelector('#session_startNewSession') && oldURI !== root.baseURI)
// 	{
// 		oldURI = root.baseURI
// 		if (auto)
// 		{
// 			chrome.runtime.sendMessage({action: "runSenecDone"})
// 		}
// 		else
// 		{
// 			let s = document.createElement('span')
// 			s.innerHTML = ' or senecDone'
// 			s.id = "senecHelp"
// 			s.onclick = () => {
// 				chrome.runtime.sendMessage({action: "runSenecDone"})
// 				s.remove()
// 			}
// 			document.querySelector('.SessionControlBar_wrapper__2XLzu').after(s)
// 		}
// 	}
// })
// helpObserver.observe(root, {childList: true, subtree: true})