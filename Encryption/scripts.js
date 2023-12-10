//CEZAR
const alfabet = 'aąbcćdeęfghijklłmnńoóprsśtuwyzźż';

function modulo(a, b) {
    return ((a % b) + b) % b;
}

function szyfrCezara(tekst, przesuniecie) {
    let zaszyfrowanyTekst = '';

    for (let i = 0; i < tekst.length; i++) {
        const litera = tekst[i];
        const indeks = alfabet.indexOf(litera);

        if (indeks === -1) {
            zaszyfrowanyTekst += litera;
        } else {
            const nowyIndeks = modulo((indeks + przesuniecie), alfabet.length);
            zaszyfrowanyTekst += alfabet[nowyIndeks];
        }
    }

    return zaszyfrowanyTekst;
}

function encodeCezar() {
    const tekst = document.getElementById('inputTextEncode').value;
    const przesuniecie = parseInt(document.getElementById('cezarShiftEncode').value) || 3;
    const zaszyfrowanyTekst = szyfrCezara(tekst, przesuniecie);

    document.getElementById('outputTextEncode').value = zaszyfrowanyTekst;
    document.getElementById('inputTextDecode').value = zaszyfrowanyTekst; // Autofill decoding

    // Set the default decoding shift value
    const decodingShift = document.getElementById('cezarShiftDecode');
    decodingShift.value = przesuniecie.toString();
}

function decodeCezar() {
    const tekst = document.getElementById('inputTextDecode').value;
    const przesuniecie = parseInt(document.getElementById('cezarShiftDecode').value) || 3;
    const odszyfrowanyTekst = szyfrCezara(tekst, -przesuniecie);
    document.getElementById('outputTextDecode').value = odszyfrowanyTekst;
}

function autofillDecoding() {
    const encodedText = document.getElementById('outputTextEncode').value;
    document.getElementById('inputTextDecode').value = encodedText;
}

// Add event listener to update decoding shift value when encoding shift changes
document.getElementById('cezarShiftEncode').addEventListener('input', function () {
    const encodingShift = this.value;
    document.getElementById('cezarShiftDecode').value = encodingShift.toString();
});

// Initialize decoding shift with the default encoding shift value
document.getElementById('cezarShiftDecode').value = document.getElementById('cezarShiftEncode').value;

//POLYBIUS
function encodePolibiusz() {
    let inputTextEncode = document.getElementById("inputTextEncode");
    let outputTextEncode = document.getElementById("outputTextEncode");

    let inputText = inputTextEncode.value.toUpperCase();
    let polibiuszMap = {
        'A': '11', 'Ą': '12', 'B': '13', 'C': '14', 'Ć': '15',
        'D': '21', 'E': '22', 'Ę': '23', 'F': '24', 'G': '25',
        'H': '31', 'I': '32', 'J': '33', 'K': '34', 'L': '35',
        'Ł': '41', 'M': '42', 'N': '43', 'Ń': '44', 'O': '45',
        'Ó': '51', 'P': '52', 'Q': '53', 'R': '54', 'S': '55',
        'Ś': '61', 'T': '62', 'U': '63', 'V': '64', 'W': '65',
        'X': '71', 'Y': '72', 'Z': '73', 'Ź': '74', 'Ż': '75',
        ' ': '88',
    };
    let result = "";
    for (let i = 0; i < inputText.length; i++) {
        let char = inputText[i];
        if (polibiuszMap[char]) {
            result += polibiuszMap[char];
        } else {
            result += char;
        }
    }

    outputTextEncode.value = result;
    
    // Autofill decoding input with the encoded text
    let inputTextDecode = document.getElementById("inputTextDecode");
    inputTextDecode.value = result;
}

function decodePolibiusz() {
    let inputText = document.getElementById("inputTextDecode").value;
    let polibiuszMap = {
        '11': 'A', '12': 'Ą', '13': 'B', '14': 'C', '15': 'Ć',
        '21': 'D', '22': 'E', '23': 'Ę', '24': 'F', '25': 'G',
        '31': 'H', '32': 'I', '33': 'J', '34': 'K', '35': 'L',
        '41': 'Ł', '42': 'M', '43': 'N', '44': 'Ń', '45': 'O',
        '51': 'Ó', '52': 'P', '53': 'Q', '54': 'R', '55': 'S',
        '61': 'Ś', '62': 'T', '63': 'U', '64': 'V', '65': 'W',
        '71': 'X', '72': 'Y', '73': 'Z', '74': 'Ź', '75': 'Ż',
        '88': ' ',
    };  
    let result = "";
    for (let i = 0; i < inputText.length; i += 2) {
        let pair = inputText.substring(i, i + 2);
        if (polibiuszMap[pair]) {
            result += polibiuszMap[pair];
        } else if (pair.trim() !== '') {
            result += pair; 
        }
    }
    document.getElementById("outputTextDecode").value = result;
}


//HOMOPHONIC
function encodeHomofoniczny() {
    let inputText = document.getElementById("inputTextEncode").value.toUpperCase();
    let homophonicMap = {
        'A': ['11', '21', '31'],
        'Ą': ['12', '22', '32'],
        'B': ['13', '23', '33'],
        'C': ['14', '24', '34'],
        'Ć': ['15', '25', '35'],
        'D': ['16', '26', '36'],
        'E': ['17', '27', '37'],
        'Ę': ['18', '28', '38'],
        'F': ['19', '29', '39'],
        'G': ['110', '120', '130'],
        'H': ['111', '121', '131'],
        'I': ['42', '52', '62'],
        'J': ['43', '53', '63'],
        'K': ['44', '54', '64'],
        'L': ['45', '55', '65'],
        'Ł': ['46', '56', '66'],
        'M': ['47', '57', '67'],
        'N': ['48', '58', '68'],
        'Ń': ['49', '59', '69'],
        'O': ['40', '50', '60'],
        'Ó': ['71', '81', '91'],
        'P': ['72', '82', '92'],
        'Q': ['73', '83', '93'],
        'R': ['74', '84', '94'],
        'S': ['75', '85', '95'],
        'Ś': ['76', '86', '96'],
        'T': ['77', '87', '97'],
        'U': ['78', '88', '98'],
        'V': ['79', '89', '99'],
        'W': ['70', '80', '90'],
        'X': ['01', '02', '03'],
        'Y': ['04', '05', '06'],
        'Z': ['07', '08', '09'],
        'Ż': ['00', '10', '20'],
        'Ź': ['141', '151', '161'],
    };
    let result = "";
    for (let i = 0; i < inputText.length; i++) {
        let char = inputText[i];
        if (homophonicMap[char]) {
            let randomIndex = Math.floor(Math.random() * homophonicMap[char].length);
            result += homophonicMap[char][randomIndex] + ' ';
        } else if (char !== ' ') {
            result += char + ' ';
        }
    }

    document.getElementById("outputTextEncode").value = result.trim();
    
    // Autofill decoding input with the encoded text
    let inputTextDecode = document.getElementById("inputTextDecode");
    inputTextDecode.value = result.trim();
}

function decodeHomofoniczny() {
    let inputText = document.getElementById("inputTextDecode").value;
    let homophonicMap = {
        '11': 'A', '21': 'A', '31': 'A',
        '12': 'Ą', '22': 'Ą', '32': 'Ą',
        '13': 'B', '23': 'B', '33': 'B',
        '14': 'C', '24': 'C', '34': 'C',
        '15': 'Ć', '25': 'Ć', '35': 'Ć',
        '16': 'D', '26': 'D', '36': 'D',
        '17': 'E', '27': 'E', '37': 'E',
        '18': 'Ę', '28': 'Ę', '38': 'Ę',
        '19': 'F', '29': 'F', '39': 'F',
        '110': 'G', '120': 'G', '130': 'G',
        '111': 'H', '121': 'H', '131': 'H',
        '42': 'I', '52': 'I', '62': 'I',
        '43': 'J', '53': 'J', '63': 'J',
        '44': 'K', '54': 'K', '64': 'K',
        '45': 'L', '55': 'L', '65': 'L',
        '46': 'Ł', '56': 'Ł', '66': 'Ł',
        '47': 'M', '57': 'M', '67': 'M',
        '48': 'N', '58': 'N', '68': 'N',
        '49': 'Ń', '59': 'Ń', '69': 'Ń',
        '40': 'O', '50': 'O', '60': 'O',
        '71': 'Ó', '81': 'Ó', '91': 'Ó',
        '72': 'P', '82': 'P', '92': 'P',
        '73': 'Q', '83': 'Q', '93': 'Q',
        '74': 'R', '84': 'R', '94': 'R',
        '75': 'S', '85': 'S', '95': 'S',
        '76': 'Ś', '86': 'Ś', '96': 'Ś',
        '77': 'T', '87': 'T', '97': 'T',
        '78': 'U', '88': 'U', '98': 'U',
        '79': 'V', '89': 'V', '99': 'V',
        '70': 'W', '80': 'W', '90': 'W',
        '01': 'X', '02': 'X', '03': 'X',
        '04': 'Y', '05': 'Y', '06': 'Y',
        '07': 'Z', '08': 'Z', '09': 'Z',
        '00': 'Ż', '10': 'Ż', '20': 'Ż',
        '141': 'Ź', '151': 'Ź', '161': 'Ź',
    };
    let result = "";
    let tokens = inputText.split(' ');
    for (let i = 0; i < tokens.length; i++) {
        if (homophonicMap[tokens[i]]) {
            result += homophonicMap[tokens[i]];
        } else {
            result += tokens[i];
        }
    }
    document.getElementById("outputTextDecode").value = result;
}

//TRITHEMIUS
function modulo(n, m) {
    return ((n % m) + m) % m;
}

function encodeTritemiusz() {
    let inputTextEncode = document.getElementById("inputTextEncode");
    let outputTextEncode = document.getElementById("outputTextEncode");

    let inputText = inputTextEncode.value.toUpperCase();
    let result = "";
    let key = 5;
    let alphabet = 'AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻ';
    for (let i = 0; i < inputText.length; i++) {
        let index = alphabet.indexOf(inputText[i]);
        if (index !== -1) {
            result += alphabet[modulo((index + key), alphabet.length)];
            key++;
        } else {
            result += inputText[i];
        }
    }

    outputTextEncode.value = result;
    
    // Autofill decoding input with the encoded text
    let inputTextDecode = document.getElementById("inputTextDecode");
    inputTextDecode.value = result;
}

function decodeTritemiusz() {
    let inputText = document.getElementById("inputTextDecode").value.toUpperCase();
    let outputTextDecode = document.getElementById("outputTextDecode");

    let result = "";
    let key = 5;
    let alphabet = 'AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻ';
    for (let i = 0; i < inputText.length; i++) {
        let index = alphabet.indexOf(inputText[i]);
        if (index !== -1) {
            result += alphabet[modulo((index - key + alphabet.length), alphabet.length)];
            key++;
        } else {
            result += inputText[i];
        }
    }

    outputTextDecode.value = result;
}

//VIGENERE
function encodeVigener() {
    let inputTextEncode = document.getElementById("inputTextEncode");
    let outputTextEncode = document.getElementById("outputTextEncode");
    let vigenerKeyEncode = document.getElementById("vigenerKeyEncode").value.toUpperCase();

    if (!vigenerKeyEncode) {
        alert("Wprowadź klucz aby kontynuować");
        return;
    }

    let result = "";
    let keyIndex = 0;
    let alphabet = 'AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻ';

    for (let i = 0; i < inputTextEncode.value.length; i++) {
        let char = inputTextEncode.value[i].toUpperCase();
        let charIndex = alphabet.indexOf(char);

        if (charIndex !== -1) {
            let keyChar = vigenerKeyEncode[keyIndex % vigenerKeyEncode.length];
            let keyCharIndex = alphabet.indexOf(keyChar);
            result += alphabet[(charIndex + keyCharIndex) % alphabet.length];
            keyIndex++;
        } else {
            result += inputTextEncode.value[i];
        }
    }

    outputTextEncode.value = result;

    // Autofill decoding inputs with the encoded text
    let inputTextDecode = document.getElementById("inputTextDecode");
    inputTextDecode.value = result;

    // Autofill decoding key input with the encoding key
    let vigenerKeyDecode = document.getElementById("vigenerKeyDecode");
    vigenerKeyDecode.value = vigenerKeyEncode;
}

function decodeVigener() {
    let inputTextDecode = document.getElementById("inputTextDecode");
    let outputTextDecode = document.getElementById("outputTextDecode");
    let vigenerKeyDecode = document.getElementById("vigenerKeyDecode").value.toUpperCase();

    if (!vigenerKeyDecode) {
        alert("Wprowadź klucz aby kontynuować");
        return;
    }

    let result = "";
    let keyIndex = 0;
    let alphabet = 'AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻ';

    for (let i = 0; i < inputTextDecode.value.length; i++) {
        let char = inputTextDecode.value[i].toUpperCase();
        let charIndex = alphabet.indexOf(char);

        if (charIndex !== -1) {
            let keyChar = vigenerKeyDecode[keyIndex % vigenerKeyDecode.length];
            let keyCharIndex = alphabet.indexOf(keyChar);
            result += alphabet[(charIndex - keyCharIndex + alphabet.length) % alphabet.length];
            keyIndex++;
        } else {
            result += inputTextDecode.value[i];
        }
    }

    outputTextDecode.value = result;
}

//PLAYFAIR
function generatePlayfairMatrix(key) {
    const alphabet = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻ";
    const keyWithoutJ = key.replace(/J/g, "I").replace(/j/g, "i");
    const keySet = new Set(keyWithoutJ);
    const remainingLetters = alphabet.split("").filter(letter => !keySet.has(letter));

    const matrix = [];

    let keyIndex = 0;
    for (let i = 0; i < 6; i++) {
        const row = [];
        for (let j = 0; j < 6; j++) {
            if (keyIndex < keyWithoutJ.length) {
                row.push(keyWithoutJ[keyIndex]);
                keyIndex++;
            } else {
                row.push(remainingLetters.shift());
            }
        }
        matrix.push(row);
    }

    return matrix;
}

function processPlayfair(inputText, key, encode = true) {
    if (key.length === 0) {
        alert("Wprowadź klucz Playfaira.");
        return;
    }

    const matrix = generatePlayfairMatrix(key);
    let result = "";

    for (let i = 0; i < inputText.length; i += 2) {
        const pair = inputText.substring(i, i + 2);
        const firstLetter = pair[0];
        const secondLetter = pair.length === 1 ? 'Q' : pair[1];

        const [firstLetterRow, firstLetterCol] = findLetterInMatrix(matrix, firstLetter) || [];
        const [secondLetterRow, secondLetterCol] = findLetterInMatrix(matrix, secondLetter) || [];

        if (firstLetterRow !== undefined && secondLetterRow !== undefined) {
            if (firstLetterRow === secondLetterRow) {
                const shift = encode ? 1 : -1;
                result += matrix[firstLetterRow][(firstLetterCol + shift + 6) % 6];
                result += matrix[secondLetterRow][(secondLetterCol + shift + 6) % 6];
            } else if (firstLetterCol === secondLetterCol) {
                const shift = encode ? 1 : -1;
                result += matrix[(firstLetterRow + shift + 6) % 6][firstLetterCol];
                result += matrix[(secondLetterRow + shift + 6) % 6][secondLetterCol];
            } else {
                result += matrix[firstLetterRow][secondLetterCol];
                result += matrix[secondLetterRow][firstLetterCol];
            }
        } else {
            // Handle the case when a letter is not found in the matrix
            result += pair;
        }
    }

    return result;
}

function encodePlayfair() {
    const inputText = document.getElementById("inputTextEncode").value.toUpperCase();
    const key = document.getElementById("playfairKeyEncode").value.toUpperCase().replace(/J/g, "I").replace(/j/g, "i");
    const result = processPlayfair(inputText, key, true);

    document.getElementById("outputTextEncode").value = result;
    document.getElementById("playfairKeyDecode").value = key;
    document.getElementById("inputTextDecode").value = result;
}

function decodePlayfair() {
    const inputText = document.getElementById("inputTextDecode").value.toUpperCase();
    const key = document.getElementById("playfairKeyDecode").value.toUpperCase().replace(/J/g, "I").replace(/j/g, "i");
    const result = processPlayfair(inputText, key, false);

    document.getElementById("outputTextDecode").value = result;
}

function findLetterInMatrix(matrix, letter) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === letter) {
                return [i, j];
            }
        }
    }
}
