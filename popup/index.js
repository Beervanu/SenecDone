let autoButton = document.getElementById('auto')

autoButton.addEventListener('click', () => {
	chrome.storage.sync.set({auto: autoButton.checked})
})

window.addEventListener('load', () => {
	chrome.storage.sync.get('auto', (result) => {
		autoButton.checked = result.auto
	})
})