const dockContainer = document.querySelector('.dock');
const dockItems = dockContainer.querySelectorAll('.dock-item');

const defaultItemScale = 1;
const hoverItemScale = 1.6;
const neighborItemScale = 1.3;

const defaultMargin = '10px';
const expandedMargin = '20px';

const updateDockItems = () => {
  dockItems.forEach(item => {
    let scale = defaultItemScale;
    let margin = defaultMargin;

    if (item.isHovered) {
      scale = hoverItemScale;
      margin = expandedMargin;
    } else if (item.isNeighbor) {
      scale = neighborItemScale;
      margin = expandedMargin;
    }

    item.style.transform = `scale(${scale})`;
    item.style.margin = `${margin} 0`;
  });
};

dockItems.forEach(item => {
  item.addEventListener('mousemove', () => {
    dockItems.forEach(otherItem => {
      otherItem.isHovered = otherItem === item;
      otherItem.isNeighbor =
        Math.abs(
          Array.from(dockItems).indexOf(otherItem) -
            Array.from(dockItems).indexOf(item)
        ) === 1;
    });

    updateDockItems();
  });
});

dockContainer.addEventListener('mouseleave', () => {
  dockItems.forEach(item => {
    item.isHovered = item.isNeighbor = false;
  });

  updateDockItems();
});
