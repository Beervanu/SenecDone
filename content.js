function carousel(node, continueButton)
{
	log('carousel')
	arrow = node.getElementsByClassName('ConceptCarouselDesktop_rightArrow__Ef_84')[0]
	let rehKey = Object.getOwnPropertyNames(node).filter(item => item.startsWith('__reactEventHandlers'))[0]
	log(node.nodeName)
	log(node.nodeType)
	log(rehKey)
	log(node[rehKey])
	for (let i = 0; i<node[rehKey].children.props.children.length; i++)
	{
		log(i)
		arrow.click()
	}
	continueButton.click()
}

const actionNodes = {
	'.DesktopConcept_carousel__pw-xA': carousel
}

function log(message)
{
    chrome.runtime.sendMessage(message)
}

function searchO(mutationRecords)
{
	log('Called: search')
	continueButton = document.getElementsByClassName('Button_iconTextWrapper__2AVyk')[0]
	for(let i = 0; i<mutationRecords.length; i++)
	{
		let root = mutationRecords[i].addedNodes[0]
		for(nodeName in actionNodes)
		{
			foundNode = root.getElementsByClassName(nodeName)[0]
			foundNode ? actionNodes[nodeName](foundNode, continueButton) : log('Nothing')
		}
	}
}

function search()
{
	log('Called: search')
	continueButton = document.getElementsByClassName('Button_iconTextWrapper__2AVyk')[0]
	for(nodeName in actionNodes)
	{
		foundNode = document.querySelector(nodeName)
		foundNode ? actionNodes[nodeName](foundNode, continueButton) : log('Nothing')
	}
}


// setInterval(search, 1000)
// log('Started')
