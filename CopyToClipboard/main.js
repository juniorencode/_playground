const btnCopy = document.querySelector('button');
const text = 'Hello World!';

btnCopy.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text copied to clipboard!');
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
});

// btnCopy.addEventListener('click', () => {
//   const prevSelection = document.getSelection();
//   let active, ranges;

//   // save actual selection
//   if (prevSelection.rangeCount) {
//     active = document.activeElement;
//     ranges = [];

//     for (var i = 0; i < prevSelection.rangeCount; i++) {
//       ranges.push(prevSelection.getRangeAt(i));
//     }

//     switch (active.tagName.toUpperCase()) {
//       case 'INPUT':
//       case 'TEXTAREA':
//         active.blur();
//         break;

//       default:
//         active = null;
//         break;
//     }

//     prevSelection.removeAllRanges();
//   }

//   // create temporal element
//   const mark = document.createElement('span');
//   mark.textContent = text;
//   mark.setAttribute('aria-hidden', 'true');
//   mark.style.position = 'fixed';
//   mark.style.top = 0;
//   mark.style.left = 0;
//   mark.style.clip = 'rect(0, 0, 0, 0)';
//   mark.style.whiteSpace = 'pre';
//   mark.style.userSelect = 'text';

//   document.body.appendChild(mark);

//   // select content
//   const range = document.createRange();
//   range.selectNodeContents(mark);
//   const selection = document.getSelection();
//   selection.addRange(range);

//   // copy to clipboard
//   document.execCommand('copy');

//   // clear selection
//   selection.removeAllRanges();
//   document.body.removeChild(mark);

//   // restore previous selection
//   if (!prevSelection.rangeCount) {
//     ranges.forEach(function (range) {
//       prevSelection.addRange(range);
//     });
//   }

//   // for input or textarea
//   if (active) active.focus();
// });
