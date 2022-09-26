let autoButton = document.getElementById('auto')
let timeInput = document.getElementById('time')
let save = document.getElementById('save')

save.addEventListener('click', () => {
	chrome.storage.sync.set({
		auto: autoButton.checked,
		time: timeInput.value
	})
})

window.addEventListener('load', () => {
	chrome.storage.sync.get(['auto', 'time'], (result) => {
		
		autoButton.checked = result.auto
		timeInput.value = result.time
	})
})