let myGame = {		
	initializeGame: function() {
		myGame.initializeVars();
		this.setupNode(this.firstNode);
	},

	initializeVars: function() {
		this.firstNode = 0;
		this.curNode = 0;
	},
	
	setupNode: function(nodeIndex) {
		// there are only two types of nodes in source file nodes.js:  
		// question and ending. 
		// For questions, we will create 3 blocks after clicking 
		// (question itself, yes, no)
		// For endings, only one block will be created

		let currentNode = nodes[nodeIndex];
		
		if (currentNode.type == 'question'){
			this.textLink(currentNode.text, currentNode.type, '');
			this.textLink("yes", "yesNo", currentNode.kids[0]);
			this.textLink("no", "yesNo", currentNode.kids[1]);
		}

		if (currentNode.type == 'ending') {
			this.textLink(currentNode.text, currentNode.type, '');
		}
	},
	
	textLink: function(text, type, nextIndex) {
		// an intelligent monkey to create blocks, add links in HTML

		// create block container
		let container = $('<div></div>')
			.addClass('block ' + type)
			.appendTo('#content');

		// create text and put it into the container
		let text = $('<a></a>')
			.addClass('link')
			.appendTo(container)
			.html(text);

		// create links of yes/no buttons
		if (type == "yesNo") {
			text.click(function(){
					myGame.setupNode(nextIndex);
				}
			);
		}
	}
};

$(document).ready(function(){
	myGame.initializeGame();
});