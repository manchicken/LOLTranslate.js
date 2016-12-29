/*----------------------------------------------------------
	* LOLTranslate - Javascript based LOLCat Translator
  ----------------------------------------------------------
	
	### Usage:
	
	Include this file in your project source and now you can translate a string
	to LolSpeak like so  
	
			let catSays = LOLTranslate('Hello World'); // outputs 'OH HAI WHIRLD'
	
	You can pass false as a second param to return lowercase output:  
	
			let catSays = LOLTranslate('Hello World', false); // outputs 'oh hai wurrld'
	
	that's about it... have fun!
	
	
  ----------------------------------------------------------
Copyright (C) 2011 by Derek Anderson / Media Upstream

MIT LICENSE

PRMARSHUN AR TEH HREBY GRANTED, FREE OV CHARGE, TO ANY PRSON OBTAININS A COPY
OV THIZ SOVTWAR AN AZSOCIATED DOCUMENTAZHUN FILES (TEH "SOVTWR"), TO DEAL
IN TEH SOVTWAR WITHOUT RESTRICSHUN, INCLUDIN WITHOUT LIMITASHUN TEH RITES
TO USE, COPY, MODIFY, MRGE, PUBLAR TEHH, DARTRIBUTE, SUBLICENSE, AN/OR SELL
COPIES OV TEH SOVTWR, AN TO PRMIT PRSONS TO HOOM TEH SOFTWAR AR TEH
FURNARHED TO DO SO, SUBJECT TO TEH FOLLOWNG CONARHUNS:

TEH ABOOVE COPYRITE NOTICE AN THIZ PRMARSHUN NOTICE SHALL BE INCLUDED IN
ALL COPIES OR SUBSTANTIAL PORSHUNS OF TEH SOFTWR.

TEH SOFTWAR AR PROVIDED "AS AR", WITHOUT WARRANTY OF ANY KIN, EXPRESS OR
IMPLIED, INCLUDIN BUT NOT LIMITED TO TEH WARRANTIES OF MRCHANTABILITY,
FITNESS FOAR A PARTICULAR PURPOZE AN NONINFRNGEMENT. IN NO EVENT SHALL TEH
AUTHORS OR COPYRITE HOLDRS BE LIABLE 4 ANY CLAIM, DAMUJS OR UDDR
LIABILITY, WHETEHR IN AN ACSHUN OF CONTRACT, TORT OR UDDRWISE, ARISINS FROM,
OUT OF OR IN CONNECSHUN WITH TEH SOFTWIS OR TEH USE OR UDDR DEALINGS IN
TEH SOFTWAR.
*/

let dictionary = 	{
	'i can have': "i can has",
	'oh really'	: "orly",
	'seriously'	: "srsly",
	'uestion'		: "wesjun",
	
	/* 6 */
	'unless'		: "unles",
	'really'		: ["rly", "rily", "rilly", "rilley"],
	"you're"		: ["yore", "yr"],
	'buddah'		: 'ceiling cat',
	'kitten'		: 'kitteh',
	
	/* 5 */
	'cture'			: "kshur",
	'esque'			: "esk",
	'tious'			: "shus",
	'thank'			: ["fank", "tank", "thx", "thnx"],
	'world'			: ["wurrld", "whirld", "wurld", "wrld"],
	'hello'			: 'oh hai',
	'howdy'			: 'oh hai',
	'allah'			: 'ceiling cat',
	'diety'			: 'ceiling cat',
	'kitty'			: 'kitteh',
	
	
	/* 4 */
	'this'			: "thiz",
	'eady'			: "eddy",
	'what'			: ["wut", "whut"],
	'more'			: "moar",
	'sion'			: "shun",
	'just'			: "jus",
	'want'			: "waants",
	'eese'			: "eez",
	'ucke'			: ["ukki", "ukke"],
	'sion'			: "shun",
	'like'			: ["likes", "liek"],
	'love'			: ["loves", "lub", "lubs", "luv"],
	'outh'			: "owf",
	'scio'			: "shu",
	'ture'			: "chur",
	'sure'			: "shur",
	'were'			: "was",
	'ease'			: "eez",
	'have'			: ["has", "hav", "haz a"],
	'your'			: ["yur", "ur", "yore", "yoar"],
	'good'			: ["gud", "goed", "guud", "gude", "gewd"],
	'ight'			: "ite",
	'tion'			: "shun",
	
	
	/* 3 */
	'ome'				: "um",
	'are'				: ["r", "is", "ar"],
	'you'				: ["yu", "yous", "yoo", "u"],
	'the'				: "teh",
	'ose'				: "oze",
	'ead'				: "edd",
	'eak'				: "ekk",
	'age'				: "uj",
	'dog'				: "slowpaw",
	'who'				: "hoo",
	'ese'				: "eez",
	'too'				: ["to", "2"],
	'tty'				: "tteh",
	'thy'				: "fee",
	'que'				: "kwe",
	'oth'				: "udd",
	'ing'				: ["in", "ins", "ng", "ing"],
	'ove'				: ["oov", "ove", "uuv", "uv", "oove"],
	'for'				: ["fore", "4", "fr", "fur", "for", "foar"],
	"i'm"				: "im",
	'hey'				: 'oh hai',
	'god'				: 'ceiling cat',
	'cat'				: 'kitteh',
	
	/* 2 */
	'ph'				: "f",
	'as'				: "az",
	'my'				: ["muh", "mah"],
	'er'				: "r",
	'of'				: ["of", "ov", "of"],
	'is'				: ["ar teh", "ar"],
	'nd'				: "n",
	'ok'				: ["k", "kay"],
	'ym'				: "im",
	'ly'				: "li"
};

let LOLTranslate = function(str, c){
	str = ""+str;
	c = (typeof c === 'undefined' || c == true) ? true : false;
	let regExp = '';

	str = str.toLowerCase();
	
	let tokens = str.match(new RegExp(/(\{[^{}]+?\}|{[^{}]+?,[^{}]+?,.*})/, 'gm'));
	let tokenMap = {};
	tokenId = 0;
	
	if (tokens) {
		for (let i=0, l=tokens.length; i<l; i++){
			let tokenKey = "!!!TOKEN:"+(tokenId++)+"!!!";
			tokenMap[tokenKey] = tokens[i];
			str = str.replace(tokens[i], tokenKey);
		}
	}
	
	for(k in dictionary){
		regExp += '('+k+')|';
	}
	regExp = regExp.slice(0, -1);
	
	let match = new RegExp(regExp, 'gm');
	let matches = str.match(match);

	if ( matches ) {
		for(let i=0, l=matches.length; i<l; i++){
			let replace = dictionary[matches[i]];
			if(typeof replace !== 'string'){
				replace = replace[ Math.floor(Math.random() * replace.length) ];
			}
			str = str.replace(matches[i], replace);
		}
	}
	
	let toReturn = (c) ? str.toUpperCase() : str;

	// Add tokens back.
	let tokenKeys = Object.keys(tokenMap);
	for (let i=0, l=tokenKeys.length; i<l; i++){
		toReturn = toReturn.replace(tokenKeys[i], tokenMap[tokenKeys[i]]);
	}
	
	return toReturn;
};

module.exports = LOLTranslate
