/**
 * match end of string dots and non alphanumeric characters
 */

let patter_end_of_str= /(\s|\W|_|\.)*(\n|$)/g

/**
 * match begin of string non alphanumeric characters
 */

let str = " -=  '  p?!RegExr hosted by Media Temple?..לדססדג"
let pattern_begin_of_str = /^[\s\W|_]*/g

let res = str.replace(/^[\s\W|_]*/g, '')
console.log(res);