// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

 

contract Notary {

    struct Document {

        bytes32 hash; // Hash of the document

        address notary; // Address of the notary

        uint256 timestamp; // Timestamp of notarization

    }

 

    mapping(bytes32 => Document) private documents; // Mapping to store documents by their hash

 

    event DocumentNotarized(bytes32 indexed documentHash, address indexed notary, uint256 timestamp);

 

    // Function to notarize a document with a specific notary address

    function notarizeDocument(bytes32 _documentHash, address _notaryAddress) public {

        require(documents[_documentHash].notary == address(0), "Document already notarized");

        require(_notaryAddress != address(0), "Invalid notary address");

 

        documents[_documentHash] = Document({

            hash: _documentHash,

            notary: _notaryAddress, // Set the provided notary address

            timestamp: block.timestamp

        });

 

        emit DocumentNotarized(_documentHash, _notaryAddress, block.timestamp);

    }

 

    // Function to get the details of a notarized document

    function getDocumentDetails(bytes32 _documentHash) public view returns (address notary, uint256 timestamp) {

        Document memory doc = documents[_documentHash];

        require(doc.notary != address(0), "Document not found");

 

        return (doc.notary, doc.timestamp);

    }

}