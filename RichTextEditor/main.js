const optionsButtons = document.querySelectorAll('.option-button');
const advancedOptionButton = document.querySelectorAll('.adv-option-button');
const fontName = document.getElementById('fontName');
const fontSizeRef = document.getElementById('fontSize');
const writingArea = document.getElementById('text-input');
const linkButton = document.getElementById('createLink');
const alignButtons = document.querySelectorAll('.align');
const spacingButtons = document.querySelectorAll('.format');
const scriptButtons = document.querySelectorAll('.script');

// List of fonts
const fontList = [
  'Arial',
  'Verdana',
  'Times New Roman',
  'Garamond',
  'Georgia',
  'Courier New',
  'Cursive'
];

// Initial settings
const initializer = () => {
  // function calls for highlighting buttons
  // no highlights for link, unlink, lists, undo, redo since they are no time operations
  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);
};

// Highlight clicked button
const highlighter = (className, needsRemoval) => {
  className.forEach(button => {
    button.addEventListener('click', () => {
      // needsRemoval = true means only one button should be highlight and other would be normal
      if (needsRemoval) {
        let alreadyActive = false;

        // if currently clicked button is already active
        if (button.classList.contains('active')) {
          alreadyActive = true;
        }

        // remove highlight from other buttons
        highlighterRemover(className);

        // highlight clicked button
        if (!alreadyActive) button.classList.add('active');
      } else {
        // if other buttons can be highlighted
      }
    });
  });
};
