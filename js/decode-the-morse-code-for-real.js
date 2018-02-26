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
};

let moreLike = function(chars, rate) {
    function repeat(str, num) {
        return (num < 0) ? '' : (new Array(num + 1)).join(str);
    }

    if (chars.length === 0) {
        return '';
    } else if (chars.length <= rate) {
        return repeat(chars[0],2);
    } else if (chars.length <= 3 * rate) {
        return repeat(chars[0],6);
    } else {
        return repeat(chars[0],15);
    }
}

let decodeBitsAdvanced = function(bits){
    // ToDo: Accept 0's and 1's, return dots, dashes and spaces
    console.log('bits: ' + bits);
    let _bits = bits.replace(/(^0+|0+$)/g, '');
    console.log('_bits: ' + _bits);

    if (_bits === '') return '';

    let _charStream = _bits.match(/0+|1+/g);
    console.log('_charStream: ' + _charStream);

    let minLength = Math.min.apply(null, _charStream.map(char => {return char.length}));
    let maxLength = Math.max.apply(null, _charStream.map(char => {return char.length}));
    let maxLengthOf1 = Math.max.apply(null, _bits.match(/1+/g).map(char => {return char.length}));


    let rate = null;
    if (maxLengthOf1 >= minLength * 3) {
        // 存在 long time
        rate = Math.ceil(maxLengthOf1/3);
    } else {
        // 只有 short time
        rate = maxLengthOf1;
    }

    console.log('minLength: ' + minLength);
    console.log('maxLength: ' + maxLength);
    console.log('maxLengthOf1: ' + maxLengthOf1);

    console.log('rate: ' + rate);


    let _result = _charStream.map(char => {
        console.log('input: ' + char);
        console.log('like: ' + moreLike(char, rate));

        return moreLike(char, rate);
    }).join('');
    console.log('final bits: ' + _result);

    _result = _result.replace(new RegExp("1{6}", 'ig'), '-')
        .replace(new RegExp("1{2}", 'ig'), '.')
        .replace(new RegExp("0{14,99}", 'ig'), '   ')
        .replace(new RegExp("0{6}", 'ig'), ' ')
        .replace(/0*/g, '')

    return _result;
}

let decodeMorse = function(morseCode){
    console.log('morseCode: ' + morseCode);
    if (morseCode === '') return '';
    let _result = '';
    morseCode.trim().split('   ').forEach(word => {
        _result += ' ';
        word.split(' ').forEach(char => {
            _result += MORSE_CODE[char];
        });
    });
    return _result.trim();
}

// console.log(decodeMorse(decodeBitsAdvanced('1100110011001100000011000000111111001100111111001111110000000000000011001111110011111100111111000000110011001111110000001111110011001100000011')));
// should return "HEY JUDE"

// console.log(decodeMorse(decodeBitsAdvanced('0000000011011010011100000110000001111110100111110011111100000000000111011111111011111011111000000101100011111100000111110011101100000100000')));
// should return "HEY JUDE"

console.log(decodeMorse(decodeBitsAdvanced('00000000000111111100000011010001110111000000001110000000000000000001111111011111100001101111100000111100111100011111100000001011100000011111110010001111100110000011111100101111100000000000000111111100001111010110000011000111110010000011111110001111110011111110000010001111110001111111100000001111111101110000000000000010110000111111110111100000111110111110011111110000000011111001011011111000000000000111011111011111011111000000010001001111100000111110111111110000001110011111100011111010000001100001001000000000000000000111111110011111011111100000010001001000011111000000100000000101111101000000000000011111100000011110100001001100000000001110000000000000001101111101111000100000100001111111110000000001111110011111100011101100000111111000011011111000111111000000000000000001111110000100110000011111101111111011111111100000001111110001111100001000000000000000000000000000000000000000000000000000000000000')));
// should return "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG"
// todo 此条失败，需要加入 k-means 算法

