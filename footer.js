window.addEventListener('DOMContentLoaded', () => {
    // let footerElement = document.getElementsByTagName('title')[0];
    // let title = titleElement.innerText;
    const footblock = `<div class="footer text-muted py-1 gradient">
    <div class="container copyright">
      <p class="mb-0">Privacy, Security and Accessibility | WV.gov | USA.gov | © 2022 State of West Virginia</p>
    </div>
  </div>`;
    let footerElement = document.querySelector('footer[role="footer"]');
    footerElement.innerHTML = footblock;
    console.log(footerElement);
});
