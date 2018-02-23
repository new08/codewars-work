'use strict';

const MORSE_CODE = {
    '.-': 'A',
    '-...': 'B',
    '-.-.': 'C',
    '-..': 'D',
    '.': 'E',
    '..-.': 'F',
    '--.': 'G',
    '....': 'H',
    '..': 'I',
    '.---': 'J',
    '-.-': 'K',
    '.-..': 'L',
    '--': 'M',
    '-.': 'N',
    '---': 'O',
    '.--.': 'P',
    '--.-': 'Q',
    '.-.': 'R',
    '...': 'S',
    '-': 'T',
    '..-': 'U',
    '...-': 'V',
    '.--': 'W',
    '-..-': 'X',
    '-.--': 'Y',
    '--..': 'Z',
    '-----': '0',
    '.----': '1',
    '..---': '2',
    '...--': '3',
    '....-': '4',
    '.....': '5',
    '-....': '6',
    '--...': '7',
    '---..': '8',
    '----.': '9',
    '.-.-.-': '.',
    '--..--': ',',
    '..--..': '?',
    '.----.': '\'',
    '-.-.--': '!',
    '-..-.': '/',
    '-.--.': '(',
    '-.--.-': ')',
    '.-...': '&',
    '---...': ':',
    '-.-.-.': ';',
    '-...-': '=',
    '.-.-.': '+',
    '-....-': '-',
    '..--.-': '_',
    '.-..-.': '"',
    '...-..-': '$',
    '.--.-.': '@',
    '...---...': 'SOS'
}

let bitsTrim = function (bits) {
    let fromIndex = bits.indexOf('1');
    let lastIndex = bits.lastIndexOf('1');
    console.log('fromIndex: ' + fromIndex);
    console.log('lastIndex: ' + lastIndex);

    if (fromIndex + lastIndex > 0) {
        return bits.slice(fromIndex, lastIndex + 1);
    }
    return bits;
}
let decodeBitsLength = function (bits) {
    let _result = 1;
    let _bits = bitsTrim(bits);
    console.log('trim: ' + _bits);
    let arrOf1 = _bits.split(/0{1,99}/g);
    arrOf1.sort();
    if (arrOf1.length === 0) {
        return 1;
    }
    console.log('smallest length of 1: ' + arrOf1[0]);
    _result = arrOf1[0].length;

    let arrOf0 = _bits.split(/1{1,99}/g);
    // trim 后，首字母始终是1，split 的第一个元素是 ''
    if (arrOf0.length > 2) {
        if (arrOf0[1].length < _result) {
            _result = arrOf0[1].length;
        }
    }
    console.log('smallest length: ' + _result);
    return _result;
}

let decodeBits = function (bits) {
    // ToDo: Accept 0's and 1's, return dots, dashes and spaces

    console.log(bits)
    let length = decodeBitsLength(bits);
    console.log(length);
    const lengthOfDash = 3 * length;
    const lengthOfDot = 1 * length;
    const lengthOfLongSpace = 7 * length;
    const lengthOfSpace = 3 * length;

    return bits
        .replace(new RegExp("1{" + lengthOfDash + "}", 'ig'), '-')
        .replace(new RegExp("1{" + lengthOfDot + "}", 'ig'), '.')
        .replace(new RegExp("0{" + lengthOfLongSpace + ",99}", 'ig'), '   ')
        .replace(new RegExp("0{" + lengthOfSpace + "}", 'ig'), ' ')
        .replace(/0*/g, '')
}

let decodeMorse = function (morseCode) {
    // ToDo: Accept dots, dashes and spaces, return human-readable message
    console.log(morseCode);
    let _result = '';
    morseCode.trim().split('   ').forEach(word => {
        _result += ' ';
        word.split(' ').forEach(char => {
            _result += MORSE_CODE[char];
        });
    });
    return _result.trim();
}

decodeMorse(decodeBits('1100110011001100000011000000111111001100111111001111110000000000000011001111110011111100111111000000110011001111110000001111110011001100000011'));
// should return "HEY JUDE"