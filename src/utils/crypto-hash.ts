import crypto from "crypto";

// Update the paremter type later
const cryptoHash = (...inputs) => {
    const hash = crypto.createHash('sha256');
    hash.update(inputs.sort().join(' '));
    return hash.digest('hex');
};

export default cryptoHash;