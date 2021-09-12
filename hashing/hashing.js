"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});

for (let line of poem) {
	const len = Blockchain.blocks.length;
	const prevBlock = Blockchain.blocks[len - 1];
	const currentBlock = {
		index: prevBlock.index + 1,
		data: blockHash(line),
		prevHash: prevBlock.hash,
		timestamp: Date.now(),
	}

	Blockchain.blocks.push({
		...currentBlock,
		hash: blockHash(JSON.stringify(currentBlock)),
	});
}
console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);


// **********************************
function blockHash(bl) {
	return crypto.createHash("sha256").update(
		bl
	).digest("hex");
}

function verifyBlock(block) {
	if (typeof block.index === 'undefined') return false;

	if (block.index === 0) {
		return block.hash === '000000' && block.data === ''
	} else {
		if (typeof block.timestamp !== 'number') return false
		if (typeof block.data !== 'string') return false
		if (block.hash === blockHash(JSON.stringify(block))) return false
	}

	return true;
}

function verifyChain(blockchain) {
	const len = blockchain.blocks.length
	const blocks = blockchain.blocks

	for (let i = len - 1; i > 0; i--) {
		if (
			blocks[i].prevHash !== blocks[i - 1].hash ||
			!verifyBlock(blocks[i])
		)
			return false;
	}

	if (!verifyBlock(blocks[0])) return false
	return true;
}
