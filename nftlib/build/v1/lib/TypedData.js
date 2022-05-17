"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTypedDataV4 = void 0;
/*
const EIP712DomainType = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
  { name: 'verifyingContract', type: 'address' },
];
*/
const ForwardRequestType = [
    { name: 'from', type: 'address' },
    { name: 'to', type: 'address' },
    { name: 'value', type: 'uint256' },
    { name: 'gas', type: 'uint256' },
    { name: 'nonce', type: 'uint256' },
    { name: 'data', type: 'bytes' },
];
// https://eips.ethereum.org/EIPS/eip-712
function createTypedDataV4(chainId, ForwarderAddress, message) {
    const TypedData = {
        primaryType: 'ForwardRequest',
        types: {
            // EIP712Domain: EIP712DomainType,
            ForwardRequest: ForwardRequestType,
        },
        domain: {
            // https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/metatx/MinimalForwarder.sol
            name: 'MinimalForwarder',
            version: '0.0.1',
            chainId,
            verifyingContract: ForwarderAddress,
        },
        message,
    };
    return TypedData;
}
exports.createTypedDataV4 = createTypedDataV4;
