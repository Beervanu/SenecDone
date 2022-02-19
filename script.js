//order steps
//list of words
//incorrect word in sentence

function inputText(input, text)
{
	const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
	nativeInputValueSetter.call(input, text);
	const event = new Event('input', { bubbles: true });
	input.dispatchEvent(event);
}

function eventHandler(node)
{
	return node[Object.keys(node).filter(key=>key.startsWith('__reactEventHandlers'))[0]]
}

function internalInstance(node)
{
	return node[Object.keys(node).filter(key=>key.startsWith('__reactInternalInstance'))[0]]
}

function carousel(node, continueButton)
{
	continueButton.click()
}

function missingWord(node, continueButton)
{
	let props = internalInstance(node).child.memoizedProps
	if(props.children)
	{
		inputText(node.querySelector('.Input_input__3CI_c'), props.value)
	}
}

function multipleChoice(node, continueButton)
{
	let a = Array.from(node.getElementsByClassName('cUAqtk'))
	for(let i = 0; i<a.length; i++)
	{
		if (internalInstance(a[i]).child.memoizedProps.correct)
		{
			a[i].querySelector('button').click()
			break
		}
	}
	
}

function toggle(node, continueButton)
{
	let options = eventHandler(node).children[1].props.children
	let toggleNodes = Array.from(node.querySelectorAll('.Toggles__single__toggle'))
	for(let i = 0; i<options.length; i++)
	{
		if (options[i].props.answers.correctAnswer !== options[i].props.currentPosition)
		{
			toggleNodes[i].click()
		}		
	}
}

function cont(node, continueButton)
{
	continueButton.click()
}

function list(node, continueButton)
{
	let wordNodes = Array.from(node.querySelectorAll('.BlurredWord__word--blurred'))
	let inputNode = node.querySelector('input')
	for(let i = 0; i<wordNodes.length; i++)
	{
		inputText(inputNode, wordNodes[i].textContent)
	}
}

function exactList(node, continueButton)
{
	node = node.parentNode
	let values = internalInstance(node).child.memoizedProps.content.values
	let inputNode = node.querySelector('input')
	for(let i = 0; i<values.length; i++)
	{
		inputText(inputNode, values[i].value[0].word)
	}
}

function flashcard(node)
{
	node.querySelector('.Flashcard__cardFrontInner').click()
	node.querySelector('button').click()
}

function flow()
{
	return null
}

function _flow(node, continueButton)
{
	node = node.parentNode


	let content = internalInstance(node).child.memoizedProps.content,
		finished = false,
		lookup = {}
	for(let i = 0; i<content.orderedValues.length; i++)
	{
		lookup[content.orderedValues[i]] = i	
	}

	let j = 0;
	while(!finished)
	{
		let listValues = Array.from(node.querySelectorAll('.ListValue__value'))
		let eventTarget = listValues[0].parentNode
		//if the node is in the wrong place
		let correctIndex = lookup[listValues[j].innerText]
		if(correctIndex !== j)
		{
			let {x, y} = listValues[j].getBoundingClientRect()
			let {x: correctX, y: correctY} = listValues[correctIndex].getBoundingClientRect()
			eventTarget.dispatchEvent(new MouseEvent('mousedown', {
				clientX: x,
				clientY: y
			}))
			eventTarget.dispatchEvent(new MouseEvent('mousemove', {
				clientX: correctX,
				clientY: correctY
			}))
			eventTarget.dispatchEvent(new MouseEvent('mouseup'))
			j++
		}
		else
		{
			j++
		}

		finished = j===content.values.length
	}
}

const actionNodes = {
	'DesktopConcept_carousel__pw-xA': {
		func: carousel,
		waitForReady: true
	},
	'MissingWordInput_wrapper__2DM_a': {
		func: missingWord,
		waitForReady: true
	},
	'MultipleChoiceCardContents_contents__2YA0v': {
		func: multipleChoice
	},
	'Toggles__wrapper': {
		func: toggle
	},
	'MessageStructure__outer': {
		func: cont
	},
	'ImageDescription_container__2Hwrn': {
		func: cont,
		waitForReady: true
	},
	'Video__wrapper': {
		func: cont,
		waitForReady: true
	},
	'List__wrapper': {
		func: list,
		waitForReady: true
	},
	'ImageList__wrapper': {
		func: list,
		waitForReady: true
	},
	'Hierarchy__outer': {
		func: cont,
		waitForReady: true
	},
	'ExactList_wrapper__6RFC9': {
		func: exactList,
		waitForReady: true
	},
	'Flashcard__card': {
		func: flashcard
	},
	'Delve': {
		func: cont,
		waitForReady: true
	},
	'Flow__wrapper': {
		func: flow,
		waitForReady: true
	}
}

function search(mutRecords)
{
	let node = mutRecords[0].addedNodes[0]
	let continueButton = Array.from(document.querySelectorAll('.Button_button__1Q4K4')).at(-1)
	for(let nodeName in actionNodes)
	{
		let foundNodes = Array.from(node.getElementsByClassName(nodeName))
		for(let i = 0; i<foundNodes.length; i++)
		{
			if(!foundNodes[i]) continue

			if(actionNodes[nodeName].waitForReady)
			{
				// only execute function when the page is ready
				let obv = new MutationObserver((mutRecords, mutObserver) => {
					if(!continueButton.getAttribute('disabled'))
					{
						actionNodes[nodeName].func(foundNodes[i], continueButton)
						mutObserver.disconnect()
					}
				})
				obv.observe(continueButton, {attributeFilter: ['disabled']})
			}
			else
			{
				actionNodes[nodeName].func(foundNodes[i], continueButton)
			}
		}
		
	}
}

const observer = new MutationObserver(search)
observer.observe(document.getElementsByClassName('ljGimB')[0], {childList: true})