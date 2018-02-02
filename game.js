let myGame = {
	initializeVars: function() {
		this.firstNode = 0;
		this.curNode = 0;
	},
	
	initializeGame: function() {
		myGame.initializeVars();
		this.setupNode(this.firstNode, 0);
	},
	
	setupNode: function(nodeIndex) {
		let currentNode = nodes[nodeIndex]; 
		console.log(nodeIndex);
		if (currentNode.type !== 'ending') {
			let block = this.textLink(currentNode.text, currentNode.type, currentNode.kids[0]);
		} else {
			let block = this.textLink(currentNode.text, currentNode.type, '');
		}
		
		
		if (currentNode.type == 'question'){
			let yes = this.textLink("yes", "yesNo", currentNode.kids[0]);
			let no = this.textLink("no", "yesNo", currentNode.kids[1]);
		}
	},
	
	textLink: function(text, type, next) {
		// create block container
		let cont = $('<div></div>')
			.addClass('block ' + type)
			.appendTo('#content');

		// create link
		let newLink = $('<a></a>')
			.addClass('link')
			.appendTo(cont)
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