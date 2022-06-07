window.addEventListener('DOMContentLoaded', () => {
    const footblock = `<div class="footer text-muted py-1 gradient">
    <div class="container copyright py-2">
      <p class="mb-0">Privacy, Security and Accessibility | <a href="https://www.wv.gov/Pages/default.aspx" target="_blank">WV.gov</a> | <a href="https://www.usa.gov/" target="_blank">USA.gov</a> | © 2022 State of West Virginia</p>
    </div>
  </div>`;
    let footerElement = document.querySelector('footer[role="footer"]');
    footerElement.innerHTML = footblock;
});
