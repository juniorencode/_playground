const PreloaderFullScreen = () => {
  const preloader = document.querySelector('.preloader');
  const preloaderBlock = preloader.querySelector('.preloader__block');
  const progressNumber = preloaderBlock.querySelector('.preloader__percent');
  const progressTitle = preloaderBlock.querySelector('.preloader__title');
  const progressLoading = preloaderBlock.querySelector('.preloader__loading');

  const preloaderBar = preloader.querySelector('.preloader__bar');
  const preloaderProgress = preloaderBar.querySelector('.preloader__progress');

  const preloaderAfter = preloader.querySelector('.preloader__after');
  const preloaderBefore = preloader.querySelector('.preloader__before');

  window.addEventListener('load', () => {
    let val = 0;

    const updateAnimation = () => {
      val += 0.5;
      preloaderProgress.style.width = val + '%'; // progress bar
      let f =
        (preloaderProgress.clientWidth /
          preloaderProgress.parentNode.clientWidth) *
        100; // percentage
      progressNumber.innerText = parseInt(f);

      if (val === 100) {
        clearInterval(preloadInterval);

        // animate progress bar
        let bar = 0;
        const barAnimation = () => {
          bar += 0.5;
          preloaderBar.style.left = bar + '%';
          if (bar === 100) {
            clearInterval(barInterval);
          }
        };
        const barInterval = setInterval(barAnimation, 1);

        // animate title
        let titleAlpha = 1;
        let titleY = 0;
        const posTitle = progressTitle.getBoundingClientRect().top;
        const titleAnimation = () => {
          titleAlpha -= 0.01;
          titleY -= 1;
          progressTitle.style.opacity = titleAlpha;
          progressTitle.style.top = posTitle + titleY + 'px';
          if (titleAlpha <= 0 && titleY <= -100) {
            clearInterval(titleInterval);
          }
        };
        const titleInterval = setInterval(titleAnimation, 1);
      }
    };

    const preloadInterval = setInterval(updateAnimation, 1);
  });
};
