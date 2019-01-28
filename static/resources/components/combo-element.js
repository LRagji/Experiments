import { html, LitElement } from 'https://unpkg.com/lit-element?module';

class comboElement extends LitElement {

    static get properties() {
        return {
            options: {
                type: Array
            },
            selectedValue: {
                type: Number
            },
            name: {
                type: String
            }
        };
    }

    constructor() {
        super();
        this.changed = this.changed.bind(this);
    }

    render() {
        return html`<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
        <input type="hidden" name="${this.name}" value="${this.selectedValue}" />
        <select @change="${this.changed}" class="custom-select">${this.options.map((option) => html`<option ?selected="${option.id === this.selectedValue}" value="${option.id}" >${option.name}</option>`)}</select>`
    }

    changed(e) {
        this.selectedValue = parseInt(e.target.value);
    }
}

customElements.define('combo-element', comboElement);