let autoButton = document.getElementById('auto')
let save = document.getElementById('save')

save.addEventListener('click', () => {
	chrome.storage.sync.set({
		auto: autoButton.checked
	})
})

window.addEventListener('load', () => {
	chrome.storage.sync.get(['auto'], (result) => {
		autoButton.checked = result.auto
	})
})