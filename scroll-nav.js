(function () {
  const body = document.body;
  const nextPage = body.dataset.nextpage || "";
  const prevPage = body.dataset.prevpage || "";

  let isThrottled = false;

  window.addEventListener("wheel", (event) => {
    if (isThrottled) return;

    const delta = event.deltaY;
    const scrollY = window.scrollY;
    const nearBottom =
      window.innerHeight + scrollY >= document.body.offsetHeight - 5;
    const atTop = scrollY <= 5;

    // Scroll DOWN at the bottom -> go to next page
    if (delta > 0 && nearBottom && nextPage) {
      isThrottled = true;
      window.location.href = nextPage;
    }

    // Scroll UP at the top -> go to previous page
    if (delta < 0 && atTop && prevPage) {
      isThrottled = true;
      window.location.href = prevPage;
    }

    // small cooldown so one scroll doesn't trigger multiple times
    if (isThrottled) {
      setTimeout(() => {
        isThrottled = false;
      }, 700);
    }
  });
})();
