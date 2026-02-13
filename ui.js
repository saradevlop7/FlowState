export const ui = {
    render: (element, html) => element.innerHTML = html,
    clearInput: (input) => input.value = '',
    showMessage: (container, msg) => {
        container.innerHTML = `<p class="empty-state">${msg}</p>`;
    }
};