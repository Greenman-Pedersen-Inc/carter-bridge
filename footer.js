window.addEventListener('DOMContentLoaded', () => {
    const footblock = `<div class="footer text-muted py-1 gradient">
    <div class="container copyright py-2">
      <p class="mb-0">Privacy, Security and Accessibility | WV.gov | USA.gov | © 2022 State of West Virginia</p>
    </div>
  </div>`;
    let footerElement = document.querySelector('footer[role="footer"]');
    footerElement.innerHTML = footblock;
});
