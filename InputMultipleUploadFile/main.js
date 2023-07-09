document.querySelector('.file-input').addEventListener('change', () => {
  let allowed_mine_types = [];

  // allowed max size in MB
  let allowed_size_mb = 100;

  const files_input = document.querySelector('.file-input').files;

  // user has not choosen any file
  if (files_input.length === 0) {
    alert('Error: No file selected');
    return;
  }

  for (let i = 0; i < files_input.length; i++) {
    const file = files_input[i];

    // validate file size
    if (file.size > allowed_size_mb * 1024 * 1024) {
      alert('Error: Exceed size => ' + file.name);
      return;
    }
  }
});
