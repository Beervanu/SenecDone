let __senecHelpButtonSet = false
let root = document.querySelector('#root')
let oldURI = root.baseURI
window.addEventListener('mouse', (e) => {
	if(e.action === '__senecDone')
	{
		__senecHelpButtonSet = false
	}
})

let helpObserver = new MutationObserver((mutRecords, observer) => {
	if(oldURI !== root.baseURI)
	{
		oldURI = root.baseURI
		__senecHelpButtonSet = false
	}

	let b = document.querySelector('.SessionControlBar_wrapper__2XLzu')
	if(b && !__senecHelpButtonSet)
	{
		let s = document.createElement('span')
		s.innerHTML = ' or senecDone'
		s.id = "senecHelp"
		s.onclick = () => {
			chrome.runtime.sendMessage({action: "runSenecDone"}, () => {
				s.remove()
			})
		}
		__senecHelpButtonSet = true
		b.after(s)
	}
})
helpObserver.observe(root, {childList: true, subtree: true})