(() => {

let __senecUtilities = {
	inputText: (input, text) =>
	{
		const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
		nativeInputValueSetter.call(input, text);
		const event = new Event('input', { bubbles: true });
		input.dispatchEvent(event);
	},
	eventHandler: (node) =>
	{
		return node[Object.keys(node).find(key=>key.startsWith('__reactEventHandlers'))]
	},
	internalInstance: (node) =>
	{
		return node[Object.keys(node).find(key=>key.startsWith('__reactInternalInstance'))]
	}
}


let __senecFunctions = {
	carousel: (node, continueButton) =>
	{
		continueButton.click()
	},

	missingWord: (node) =>
	{
		let props = __senecUtilities.internalInstance(node).child.memoizedProps
		if(props.children|| props.inputRef)
		{
			__senecUtilities.inputText(node.querySelector('.Input_input__3CI_c'), props.value)
		}
	},

	multipleChoice: (node) =>
	{
		let a = Array.from(node.querySelectorAll('button'))
		for(let i = 0; i<a.length; i++)
		{
			if (__senecUtilities.internalInstance(a[i].parentNode).child.memoizedProps.correct)
			{
				a[i].click()
			}
		}
		
	},

	imageMultipleChoice: (node) => 
	{
		Array.from(node.querySelectorAll('img')).find((el) => !el.currentSrc.includes('INCORRECT')).click()
	},

	toggle: (node) =>
	{
		let options = __senecUtilities.eventHandler(node).children[1].props.children
		let toggleNodes = Array.from(node.querySelectorAll('.Toggles__single__toggle'))
		for(let i = 0; i<options.length; i++)
		{
			if (options[i].props.answers.correctAnswer !== options[i].props.currentPosition)
			{
				toggleNodes[i].click()
			}		
		}
	},

	cont: (node, continueButton) =>
	{
		continueButton.click()
	},

	list: (node) =>
	{
		let wordNodes = Array.from(node.querySelectorAll('.BlurredWord__word--blurred'))
		let inputNode = node.querySelector('input')
		for(let i = 0; i<wordNodes.length; i++)
		{
			__senecUtilities.inputText(inputNode, wordNodes[i].textContent)
		}
	},

	exactList: (node) =>
	{
		node = node.parentNode
		let values = __senecUtilities.internalInstance(node).child.memoizedProps.content.values
		let inputNode = node.querySelector('input')
		for(let i = 0; i<values.length; i++)
		{
			__senecUtilities.inputText(inputNode, values[i].value[0].word)
		}
	},

	flashcard: (node) =>
	{
		node.querySelector('.Flashcard__cardFrontInner').click()
		node.querySelector('button').click()
	},

	hyperFlashcard: (node, continueButton) =>
	{
		continueButton.click()
		continueButton.click()
	},

	flow: (node, continueButton) =>
	{
		node = node.parentNode


		let orderedValues = __senecUtilities.internalInstance(node).child.memoizedProps.content.orderedValues

		for(let i = 0; i<orderedValues.length; i++)
		{
			let listValues = Array.from(node.querySelectorAll('.ListValue__value'))
			let nodeAtI = listValues.find(node => node.innerText === orderedValues[i])

			let {left, top} = nodeAtI.getBoundingClientRect()
			let {left: correctLeft, top: correctTop} = listValues[i].getBoundingClientRect()

			nodeAtI.dispatchEvent(new MouseEvent('mousedown', {
				clientX: left + window.pageXOffset,
				clientY: top + window.pageYOffset,
				bubbles: true
			}))
			nodeAtI.dispatchEvent(new MouseEvent('mousemove', {
				clientX: correctLeft + window.pageXOffset,
				clientY: correctTop + window.pageYOffset,
				bubbles: true
			}))
			nodeAtI.dispatchEvent(new MouseEvent('mouseup', {bubbles: true}))

		}
		continueButton.click()
	},

	colourMatch: (node) => 
	{
		node = node.parentNode
		__senecUtilities.internalInstance(node).memoizedProps.children.find((el) => el.props.correct).click()
	}
}


__senecFunctions.multiStep = (node) =>
{
	let tempObserver = new MutationObserver(search.bind({}, true))
	tempObserver.observe(node, {childList: true})
}



let __senecActionNodes = {
	'Steps_steps__2fyon': {
		func: "multiStep"
	},
	'PretestWrapper__outer': {
		func: "multiStep"
	},
	
	'DesktopConcept_carousel__pw-xA': {
		func: "carousel",
		waitForReady: true
	},

	'MissingWordInput_wrapper__2DM_a': {
		func: "missingWord",
		waitForReady: true
	},
	'EquationInputWithManagedFocus_wrapper__2hJ5g': {
		func: "missingWord",
		waitForReady: true
	},

	'MultipleChoiceCardContents_contents__2YA0v': {
		func: "multipleChoice"
	},
	'EquationMultipleChoice_container__8tld4': {
		func: "multipleChoice"
	},
	'MultiSelectCardContents_contents__cNf9H': {
		func: "multipleChoice"
	},

	'Toggles__wrapper': {
		func: "toggle"
	},

	'MessageStructure__outer': {
		func: "cont"
	},
	'ImageDescription_container__2Hwrn': {
		func: "cont",
		waitForReady: true
	},
	'Video__wrapper': {
		func: "cont",
		waitForReady: true
	},
	'Hierarchy__outer': {
		func: "cont",
		waitForReady: true
	},
	'Delve': {
		func: "cont",
		waitForReady: true
	},
	'ImageVideo_videoWrapper__1OsiV': {
		func: "cont",
		waitForReady: true
	},
	'TextBlock_content__g-0N6': {
		func: "cont",
		waitForReady: true
	},
	'ImageVideo_image__18quk Image_image__3spJM': {
		func: "cont",
		waitForReady: true
	},
	'Question_question__25RlY': {
		func: "cont",
		waitForReady: true
	},

	'List__wrapper': {
		func: "list",
		waitForReady: true
	},
	'ImageList__wrapper': {
		func: "list",
		waitForReady: true
	},
	'Mindmap__wrapper': {
		func: "list",
		waitForReady: true
	},
	
	'ExactList_wrapper__6RFC9': {
		func: "exactList",
		waitForReady: true
	},

	'Flashcard__card': {
		func: "flashcard"
	},
	'HyperFlashcard_card__dT3pd': {
		func: "hyperFlashcard"
	},

	'Flow__wrapper': {
		func: "flow",
		waitForReady: true
	},

	'EquationColorMatchButton_container__20P5p': {
		func: "colourMatch"
	},

	'ImageMultiChoice_images__1gRno': {
		func: "imageMultipleChoice"
	}
}

function search(multiStep, mutRecords)
{
	let node = mutRecords[0].addedNodes[0]
	if (!node) return
	node = multiStep ? node.parentNode : node
	let continueButton = Array.from(document.querySelectorAll('.Button_button__1Q4K4')).at(-1)
	for(let nodeName in __senecActionNodes)
	{
		let foundNodes = Array.from(node.getElementsByClassName(nodeName))
		for(let i = 0; i<foundNodes.length; i++)
		{
			if(__senecActionNodes[nodeName].waitForReady && !multiStep)
			{
				// only execute function when the page is ready
				let obv = new MutationObserver((mutRecords, mutObserver) => {
					if(!continueButton.getAttribute('disabled'))
					{
						__senecFunctions[__senecActionNodes[nodeName].func](foundNodes[i], continueButton)
						mutObserver.disconnect()
					}
				})
				obv.observe(continueButton, {attributeFilter: ['disabled']})
			}
			else
			{
				__senecFunctions[__senecActionNodes[nodeName].func](foundNodes[i], continueButton)
			}
		}
	
	}
}

let searchObserver = new MutationObserver(search.bind({}, false))
searchObserver.observe(document.querySelector('.ljGimB'), {childList: true})


let endObserver = new MutationObserver((mutRecords, mutObserver) => {
	let node = mutRecords.find((record) => !!record.addedNodes[0])

	if (!node) return
	node = node.addedNodes[0]
	if (node.nodeType !== Node.ELEMENT_NODE) return

	let end = node.querySelector('.ekaTJK')
	if(end)
	{
		end.click()
		Array.from(document.querySelectorAll('a')).find(node => node.innerText === 'Start new session').click()
		mutObserver.disconnect()
		searchObserver.disconnect()
		postMessage({action: "__senecDone"})
	}
})
endObserver.observe(document.getElementById('root'), {childList: true, subtree: true})


document.querySelector('.Button_button__1Q4K4').click()
})()