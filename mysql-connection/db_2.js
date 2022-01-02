const PI = 3.14159265359;

 function area(radius) {
  return {mult: radius*2}
}

 function circumference(radius) {
  return 2 * radius * PI;
}

module.exports = {
    area,
    circumference
  }