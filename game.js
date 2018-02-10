let myGame = {		
	initializeGame: function() {
		myGame.initializeVars();
		this.setupNode(this.firstNode);
	},

	initializeVars: function() {
		this.firstNode = 0;
	},
	
	// give instructions to the intelligent monkey to construct blocks
	setupNode: function(nodeIndex) {
		let currentNode = nodes[nodeIndex]; // get current node index
		$('.link').unbind('click'); // prevent users to click another selection
		
		// there are only two types of nodes in source file nodes.js:  
		// question and ending. 
		// For questions, we will create 3 blocks after clicking 
		// (question itself, yes, no)
		// For endings, only one block will be created

		if (currentNode.type == 'question'){
			this.textLink(currentNode.text, currentNode.type, '');
			this.textLink("yes", "yesNo", currentNode.kids[0]);
			this.textLink("no", "yesNo", currentNode.kids[1]);
		}

		if (currentNode.type == 'ending') {
			this.textLink(currentNode.text, currentNode.type, '');
			// show retry button in 0.5s
			window.setTimeout(function() {
				myGame.textLink("Try again", "reset", '');
			}, 500);
		}
	},
	
	// an intelligent monkey to create blocks, add content and links in HTML
	textLink: function(text, type, nextIndex) {

		// create block container
		let container = $('<div></div>')
			.addClass('block ' + type)
			.appendTo('#content');

		// create content and put it into the container
		let content = $('<button></button>')
			.addClass('link')
			.appendTo(container)
			.html(text);

		// create links on yes/no buttons
		if (type == "yesNo") {
			content.click(function(){
					myGame.setupNode(nextIndex);
				}
			);
		}

		if (type == "reset") {
			$('.reset').click(function() {
				myGame.reset();
			})
		}
	},

	reset: function() {
		$('#content').html('');
		myGame.initializeGame();
	}
};

$(document).ready(function(){
	myGame.initializeGame();
});