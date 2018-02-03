let myGame = {
	initializeVars: function() {
		this.firstNode = 0;
		this.curNode = 0;
	},
	
	initializeGame: function() {
		myGame.initializeVars();
		this.setupNode(this.firstNode);
	},
	
	setupNode: function(nodeIndex) {
		// there are only two types of nodes in nodes.js - question and ending

		let currentNode = nodes[nodeIndex];
		
		if (currentNode.type == 'question'){
			this.textLink(currentNode.text, currentNode.type, '');
			console.log(currentNode);
			this.textLink("yes", "yesNo", currentNode.kids[0]);
			this.textLink("no", "yesNo", currentNode.kids[1]);
		}

		if (currentNode.type == 'ending') {
			this.textLink(currentNode.text, currentNode.type, '');
		}
	},
	
	textLink: function(text, type, next) {
		// create block container
		let container = $('<div></div>')
			.addClass('block ' + type)
			.appendTo('#content');

		// create link
		let newLink = $('<a></a>')
			.addClass('link')
			.appendTo(container)
			.html(text);

		if (type == "yesNo") {
			newLink.click(function(){
					myGame.setupNode(next);
				}
			);
		}
	}
};

$(document).ready(function(){
	myGame.initializeGame();
});