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

// TODO: insert each line into blockchain
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

	console.log(Blockchain.blocks[len]);
}

console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);


// **********************************
function blockHash(bl) {
	return crypto.createHash("sha256").update(
		bl
	).digest("hex");
}

function verifyChain(blockchain) {
	for (let i = blockchain.blocks.length - 1; i > 0; --i) {
		if (blockchain.blocks[i].prevHash !== blockchain.blocks[i - 1].hash) return false;
	}

	return true;
}
