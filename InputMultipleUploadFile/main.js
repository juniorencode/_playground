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

    const uniq = 'id-' + btoa(file.name).replace(/=/g, '').substring(0, 7);
    const filetype = file.type.match(/([^\/]+)\//);

    const li = `
    <li class="file-list ${filetype[i]}" id="${uniq}" data-filename="${file.name}">
      <div class="thumbnail">
        <ion-icon name="document-outline"></ion-icon>
        <ion-icon name="image-outline"></ion-icon>
        <ion-icon name="musical-notes-outline"></ion-icon>
        <ion-icon name="videocam-outline"></ion-icon>
        <span class="completed">
          <ion-icon name="checkmark"></ion-icon>
        </span>
      </div>
      <div class="properties">
        <span class="title">
          <strong></strong>
        </span>
        <span class="size"></span>
        <span class="progress">
          <span class="buffer"></span>
          <span class="percentage">0%</span>
        </span>
      </div>
      <button class="remove">
        <ion-icon name="close"></ion-icon>
      </button>
    </li>
    `;

    document.querySelector('.list-upload ul').innerHTML =
      li + document.querySelector('.list-upload ul').innerHTML;

    const li_el = document.querySelector('#' + uniq);
    const name = li_el.querySelector('.title strong');
    const size = li_el.querySelector('.size');

    name.innerHTML = file.name;
  }
});
