const sharp = require('sharp');

sharp('./input.jpg').blur(25).toFile('output0.jpg');
sharp('./input.jpg').grayscale().toFile('output1.jpg');
sharp('./input.jpg').rotate(90).toFile('output2.jpg');
sharp('./input.jpg').flip().toFile('output3.jpg');
sharp('./input.jpg').negate().toFile('output4.jpg');
sharp('./input.jpg')
  .modulate({ brightness: 1.2, saturation: 0.8, contrast: 1.1 })
  .toFile('output5.jpg');
sharp('./input.jpg').resize(200, 200).toFile('output6.jpg');
sharp('./input.jpg')
  .resize(200, 200, {
    fit: 'contain',
    background: { r: 0, b: 0, g: 0, alpha: 0 }
  })
  .toFile('output7.jpg');
sharp('./input.jpg')
  .extract({ left: 680, top: 200, width: 200, height: 330 })
  .toFile('output8.jpg');
