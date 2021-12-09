const file1 = './certs/starmap.luxe_nginx/4491630_starmap.luxe.pem'
const file2 = './certs/chchacu.com_nginx/5015739_chchacu.com.pem'

const tder = require('./src/parse-pem')
const fs = require('fs')
const ca = fs.readFileSync(file2)
let asn1 = tder.parsePem(ca)
asn1 = tder.interpreter.certInterpreter(asn1);
console.log(asn1)
