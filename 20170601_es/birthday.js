'use strict';

const YOUR_BIRTHDAY = '01/01/1989';

const _affixZero = (int) => {
    if (int < 10) int = '0' + int;
    return '' + int;
}

const calculateAge = (birthday) => {
    const  birth = birthday.split('/'); // birth[2]: year, birth[0]: month, birth[1]: day
    const _birth = parseInt('' + birth[2] + birth[0] + birth[1]);// 文字列型に明示変換後にparseInt
    const  today = new Date();
    const _today = parseInt(`${today.getFullYear()}${_affixZero(today.getMonth() + 1)}${_affixZero(today.getDate())}`);// 文字列型に明示変換後にparseInt
    return parseInt((_today - _birth) / 10000);
}

const birthday = calculateAge(YOUR_BIRTHDAY);