const crypto = require('crypto');

class DatabaseEncryption {
    constructor (key) {
        this.algorithm = 'aes-256-cbc';
        this.key = key || 'pb3pFYeS7B9mVNsXhFfSx57g1GQsnb8J';
        this.iv = crypto.randomBytes(16);
    }
    encrypt(text) {
        let cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.key), this.iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return { iv: this.iv.toString('hex'), content: encrypted.toString('hex') };
       }
       
    decrypt(hash) {
        if (!hash.iv || !hash.content) {
            console.warn("Warning unencrypted data detected.");
            return JSON.stringify(hash);
        }
        let iv = Buffer.from(hash.iv, 'hex');
        let encryptedText = Buffer.from(hash.content, 'hex');
        let decipher = crypto.createDecipheriv(this.algorithm, Buffer.from(this.key), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
}

module.exports = DatabaseEncryption;