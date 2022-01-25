/**
 * match end of string dots and non alphanumeric characters
 */

let patter_end_of_str= /(\s|\W|_|\.)*(\n|$)/g

/**
 * match begin of string non alphanumeric characters
 */

let str = " -=  '  p?!RegExr hosted by Media Temple?..לדססדג"
let pattern_begin_of_str = /^[\s|\W|_]*/g

let res = str.replace(pattern_begin_of_str, '')
console.log(res);

/**
 * Detect string which contains only spaces
 */
let str = "    ";
if (!str.replace(/\s/g, '').length) {
  console.log('string only contains whitespace (ie. spaces, tabs or line breaks)');
}