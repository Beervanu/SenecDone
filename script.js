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
	let correct = internalInstance(node).child.memoizedProps.value
	inputText(node.querySelector('.Input_input__3CI_c'), correct)
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
		func: multipleChoice,
		waitForReady: false
	},
	'Toggles__wrapper': {
		func: toggle,
		waitForReady: false
	},
	'MessageStructure__outer': {
		func: cont,
		waitForReady: false
	},
	'ImageDescription_container__2Hwrn': {
		func: cont,
		waitForReady: true
	},
	'Video__wrapper': {
		func: cont,
		waitForReady: false
	},
	'List__wrapper': {
		func: list,
		waitForReady: true
	}
}

function search(mutRecords)
{
	let node = mutRecords[0].addedNodes[0]
	let continueButton = document.querySelector('.Button_button__1Q4K4')
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