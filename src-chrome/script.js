(() => {
let ended = false
let searchTimer = setTimeout(searchTimeout,300)

function searchTimeout()
{
	clearTimeout(searchTimer)
	searchTimer = setTimeout(searchTimeout, 1000)
	let nl = document.querySelector('.SessionScrollView__wrapper').querySelectorAll('.SessionItemEntranceTransitionWrapper')//.SessionItemFocusWrapper_wrapper__2rhF8 
	let root = document.querySelector('#root')
	if(root.baseURI.includes("end-session"))
	{
		ended = true
		let endScreenContent = document.querySelector('.hEZfbO')
		if(endScreenContent)
		{
			endScreenContent.querySelector('a')?.click()
			endScreenContent.parentElement.querySelector('.cASbJs')?.click()
		}		
	}
	
	if(!ended)
	{
		search(nl[nl.length-1], true)
	}
	else
	{
		document.querySelector('.SessionControlBar_wrapper__bPDBU').querySelector('a')?.click()
	}
}


let __senecUtilities = {
	inputText: (input, text) =>
	{
		const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
		nativeInputValueSetter.call(input, text);
		const event = new Event('input', {target: input, bubbles: true });
		input.dispatchEvent(event);
	},
	eventHandler: (node) =>
	{
		return node[Object.keys(node).find(key=>key.startsWith('__reactEventHandler'))]
	},
	internalInstance: (node) =>
	{
		return node[Object.keys(node).find(key=>key.startsWith('__reactInternalInstance'))]
	},
	props: (node) =>
	{
		return node[Object.keys(node).find(key=>key.startsWith('__reactProps'))]
	},
	fiber: (node) =>
	{
		return node[Object.keys(node).find(key=>key.startsWith('__reactFiber'))]
	}
}


let __senecFunctions = {
	cont: (node, continueButton) =>
	{
		continueButton.click()
	},

	numberInput: (node, continueButton) => {
		__senecUtilities.inputText(node, __senecUtilities.fiber(node.parentNode).child.memoizedProps.inputPart.value.toJSON().value)
		continueButton.click()
	},

	carousel: (node, continueButton) =>
	{
		continueButton.click()
	},

	missingWord: (node) =>
	{
		let props = __senecUtilities.fiber(node).child.memoizedProps
		if(props.children|| props.inputRef)
		{
			let input = node.querySelector('.Input_input__TSvFd')
			let inputChangeObserver = new MutationObserver(() => __senecUtilities.inputText(input, props.value))
			inputChangeObserver.observe(input, {attributes:true})
			__senecUtilities.inputText(input, props.value)
		}
	},

	wrongWord: (node) => {
		let sentence = __senecUtilities.fiber(node).memoizedProps.children.props.sentence

		for(let i = 0; i<sentence.length; i++)
		{
			if(sentence[i].shouldBeSelected)
			{
				node.childNodes[i].click()
			}
		}
	},

	multipleChoice: (node) =>
	{
		let a = Array.from(node.querySelectorAll('button'))
		for(let i = 0; i<a.length; i++)
		{
			if (__senecUtilities.fiber(a[i].parentNode).child.memoizedProps.correct)
			{
				a[i].click()
			}
		}
		
	},

	imageMultipleChoice: (node) => 
	{
		let key = __senecUtilities.fiber(node).memoizedProps.children.find((el) => el.props.correct).key
		Array.from(node.querySelectorAll('img')).find((el) => __senecUtilities.fiber(el).src === key).click()
	},

	toggle: (node) =>
	{
		let options = __senecUtilities.props(node).children[1].props.children
		let toggleNodes = Array.from(node.querySelectorAll('.Toggles__single__toggle'))
		for(let i = 0; i<options.length; i++)
		{
			if (options[i].props.answers.correctAnswer !== options[i].props.currentPosition)
			{
				toggleNodes[i].click()
			}		
		}
	},

	list: (node) =>
	{
		let wordNodes = Array.from(node.querySelectorAll('.BlurredWord__word--hidden'))
		let inputNode = node.querySelector('input')
		for(let i = 0; i<wordNodes.length; i++)
		{
			__senecUtilities.inputText(inputNode, __senecUtilities.fiber(wordNodes[i]).return.memoizedProps.word)
		}
	},

	mindMap: (node) =>
	{
		let wordNodes = __senecUtilities.fiber(node).pendingProps.children[0].props.children[0].props.children
		let inputNode = node.querySelector('input')
		for(let i = 0; i<wordNodes.length; i++)
		{
			if (wordNodes[i].props.testing)
			{
				let values = wordNodes[i].props.value.value
				for(let j = 0; j<values; j++)
				{
					if(value[j]?.word) __senecUtilities.inputText(inputNode, value[j].word)
				}
				
			}
			
		}
	},

	exactList: (node) =>
	{
		node = node.parentNode
		let values = __senecUtilities.fiber(node).child.memoizedProps.content.values
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
		let orderedValues = __senecUtilities.fiber(node).memoizedProps.children.props.content.orderedValues

		for(let i = 0; i<orderedValues.length; i++)
		{

			let listValues = Array.from(node.querySelectorAll('.ListValue__value'))
			let nodeAtI = listValues.find(node => __senecUtilities.props(node).children.props.markdown === orderedValues[i].trim())

			let {left, top} = nodeAtI.getBoundingClientRect()
			let {top: correctTop} = listValues[i].getBoundingClientRect()

			nodeAtI.dispatchEvent(new MouseEvent('mousedown', {
				clientX: left + window.pageXOffset,
				clientY: top + window.pageYOffset,
				bubbles: true
			}))
			nodeAtI.dispatchEvent(new MouseEvent('mousemove', {
				clientX: left + window.pageXOffset,
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
		node.childNodes[__senecUtilities.fiber(node).memoizedProps.children.find((el) => el.props.correct).key].click()
	}
}


let __senecActionNodes = {

	'WrongWord__selectableSentenceWrapper': {
		func: 'wrongWord'
	},

	'UserInput_NumberInput__3r7pm': {
		func: "numberInput",
		waitForReady: true
	},

	'DesktopConcept_carousel__h572H': {
		func: "carousel",
		waitForReady: true
	},

	'MissingWordInput_container__sopKj': {
		func: "missingWord",
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
	'EquationInputWithManagedFocus_container__NpHPN': {
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
	'MultipleChoiceQuestion_answerAndImageContainer__Yrxix': {
		func: "multipleChoice"
	},

	'Toggles__wrapper': {
		func: "toggle"
	},
	'Toggles__container': {
		func: "toggle"
	},

	'MessageStructure__outer': {
		func: "cont"
	},
	'ImageDescription_container__KioEt': {
		func: "cont",
		waitForReady: true
	},
	'Video__wrapper': {
		func: "cont",
		waitForReady: true
	},
	'Video__container': {
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
	'ImageVideo_video__Lrju- Image_image__TrOf4': {
		func: "cont",
		waitForReady: true
	},
	'Question_question__25RlY': {
		func: "cont",
		waitForReady: true
	},
	'Pattern__wrapper': {
		func: "cont",
		waitForReady: true
	},
	'Pattern__container': {
		func: "cont",
		waitForReady: true
	},

	'List__wrapper': {
		func: "list",
		waitForReady: true
	},

	'List__container': {
		func: "list",
		waitForReady: true
	},

	'ImageList__wrapper': {
		func: "list",
		waitForReady: true
	},

	'ImageList__container': {
		func: "list",
		waitForReady: true
	},
	'Mindmap__wrapper': {
		func: "list",
		waitForReady: true
	},
	'Mindmap__container': {
		func: "mindMap",
		waitForReady: true
	},
	
	'ExactList_wrapper__6RFC9': {
		func: "exactList",
		waitForReady: true
	},

	'ExactList_container__Xo5mU': {
		func: "exactList",
		waitForReady: true
	},
	'Flashcard__card': {
		func: "flashcard"
	},
	'HyperFlashcard_card__dT3pd': {
		func: "hyperFlashcard"
	},

	// 'Flow__wrapper': {
	// 	func: "flow",
	// 	waitForReady: true
	// },
	// 'Flow__container': {
	// 	func: "flow",
	// 	waitForReady: true
	// },

	'EquationColorMatchButton_container__20P5p': {
		func: "colourMatch"
	},

	'ImageMultiChoice_images__1gRno': {
		func: "imageMultipleChoice"
	}
}

//returns true if a node is found
//false in all other cases

function processSearch(mutRecords)
{
	for(let m in mutRecords)
	{
		searched = Array.from(mutRecords[m].addedNodes).map(search)
	}
	if(searched.every((res)=> !res))
	{
		__senecFunctions.cont(document.querySelector('.SessionControlBar_wrapper__bPDBU').querySelector('button'))
	}
}

function search(node, fromTimeout)
{
	if (!node) return false
	let scrollUp = document.querySelector('.ScrolledUpControlBar__wrapper')
	if(scrollUp) scrollUp.click()
	let continueButton = document.querySelector('.SessionControlBar_wrapper__bPDBU')?.querySelector('button')
	let nodeIsFound = false
	for(let nodeName in __senecActionNodes)
	{
		let foundNodes = Array.from(node.getElementsByClassName(nodeName))
		for(let i = 0; i<foundNodes.length; i++)
		{
			console.log(foundNodes[i])
			nodeIsFound = true
			if(__senecActionNodes[nodeName].waitForReady && !fromTimeout)//!multiStep && 
			{
				// console.log("started waiting", foundNodes, continueButton)
				if(!continueButton.disabled)
				{
					__senecFunctions[__senecActionNodes[nodeName].func](foundNodes[i], continueButton)
					continue
				}
				// only execute function when the page is ready
				let obv = new MutationObserver((mutRecords, mutObserver) => {
					if(!continueButton.disabled)
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
	return nodeIsFound
}
let searchObserver = new MutationObserver(processSearch.bind({}))
searchObserver.observe(document.querySelector('.SessionScrollView__wrapper')?.childNodes[0], {childList: true, subtree:true})

// end observer waits for the end of the session, and redirects us to the new one
// let endObserver = new MutationObserver((mutRecords, mutObserver) => {
// 	let end = document.querySelector('.EndSessionModalRouter_wrapper__3hwdx')
// 	if(end && !ended)
// 	{
// 		ended = true
// 		end.querySelectorAll('a')[1].click()
// 		Array.from(document.querySelectorAll('.Button_content__1Q0Uw')).find(btn => btn.outerText==="Start new session").click()
// 	}
// })
// endObserver.observe(document.getElementById('root'), {childList: true, subtree: true})

//start learning button
function start()
{
	let startButton = document.querySelector('#session_startNewSession')
	if (startButton)
	{
		startButton.click()
	}
	else 
	{
		document.querySelector('.sc-iBYQkv').click()
	}
}
setTimeout(start, 1000)


})()

	// 'Steps_steps__2fyon': {
	// 	func: "multiStep"
	// },
	// // 'PretestWrapper__outer': {
	// // 	func: "multiStep"
	// // },
	// 'WrongWord': {
	// 	func: "multiStep"
	// },
		// multiStep: (node) =>
	// {
	// 	let tempObserver = new MutationObserver(search.bind({}, true))
	// 	tempObserver.observe(node, {childList: true})
	// }	