window.addEventListener('DOMContentLoaded', () => {
    const footblock = `
            <div class="copyright">
                <p class="mb-0">
                    Privacy, Security and Accessibility | 
                    <a href="https://www.wv.gov/Pages/default.aspx" target="_blank">WV.gov</a> | 
                    <a href="https://www.usa.gov/" target="_blank">USA.gov</a> | © 2022 State of West Virginia
                </p>
            </div>`;
    let footerElement = document.querySelector('footer');
    footerElement.innerHTML = footblock;
});
