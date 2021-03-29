let $btnContainer = document.getElementById('btn-container')
let $formMenuContainer = document.getElementById('story-form-container')

function createStoryButtons() {
	for (let i = 0; i< stories.length; i++) {
		$btnContainer.insertAdjacentHTML('afterbegin', `<button id='story${i + 1}' data-index="${i}" class="storyButton btn btn-dark" type='button'>${stories[i].title}</button>`)
	}
}

createStoryButtons()

let buttons = document.getElementsByClassName('storyButton')

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', showStory);
}

function showStory(e) {
	// hide the buttons
	$btnContainer.classList.add('disappear')
	// show the story container
	$formMenuContainer.classList.remove('disappear')
	// append all the required fields
	let storyIndex = e.target.getAttribute("data-index")
	setupForm(storyIndex, $formMenuContainer)
}

function setupForm(index, container) {
	// append read story button
	let story = stories[index]
	container.innerHTML = ''
	
	// append story fields
	for (let i = 0; i < stories[index].words.length; i++) {
		let name = stories[index].words[i];
		container.insertAdjacentHTML('beforeend', `<input type="text" class="textBox" name="${name}" placeholder="${name}">`)
	}
	container.insertAdjacentHTML('beforeend', `<button id='readStory' class="storyButton btn btn-dark" type='button'>Read ${story.title} Story</button>`)
	// bind read story button action
	let button = document.getElementById('readStory')
	button.addEventListener("click", function() {
		let fields = document.getElementsByClassName('textBox')
		let values = {}
		for(let i = 0; i<fields.length; i++) {
			values[fields[i].name] = fields[i].value
		}
		displayStory(container, story, values)
	})
}

function displayStory(container, story, values) {
	container.innerHTML = story.output(values)
	container.insertAdjacentHTML('beforeend', `<button id='startNewStory' class="storyButton btn btn-dark" type='button'>Start New Story</button>`)
	let $restartBtn = document.getElementById('startNewStory')
	$restartBtn.addEventListener("click", function() {
		$formMenuContainer.innerHTML = ''
		$formMenuContainer.classList.add('disappear')
		$btnContainer.classList.remove('disappear')
	})
}