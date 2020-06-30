class Tooltip extends HTMLElement{
    constructor(){
        super();
        this._tooltipContainer;
        this._tooltipIcon;
        this._tooltipText = "Default text" 
        this.attachShadow({mode: 'open'})
        this.shadowRoot.innerHTML = `
            <style>
                div {
                    font-weight: normal;
                    background-color: green;
                    color: white;
                    position: absolute;
                    top: 1rem;
                    left:0.75rem;
                    z-index: 1;
                    padding: 0.15rem;
                    border-radius: 3px;
                    box-shadow: 1px 1px 6px rgba(0,0,0,0.26)
                }
                :host(.important){
                    background-color: var(--color-primary);
                    color: green;
                    padding 0.15;
                }
                :host-context(p){
                    font-weight: bold;
                    font-size: 15px;
                }
                ::slotted(.highlight){
                    font-family: verdana;                  
                    color: white;
                }
                .icon{
                    background: black;
                    color: white;
                    padding: 0.25rem;
                    text-align: center;
                    border-radius: 30%
                }
            </style>
            <slot></slot>
            <span class="icon">?</span>
            `;
    }

    connectedCallback(){
        if(this.hasAttribute('text')){
            this._tooltipText =  this.getAttribute('text');     
        }
        this._tooltipIcon = this.shadowRoot.querySelector('span')
        this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
        this.style.position = "relative";
    }

    attributeChangedCallback(name, oldValue, newValue){
        if(oldValue === newValue){
            return;
        }
        if(name === 'text'){
            this._tooltipText = newValue;
        }
    }

    static get observedAttributes(){
        return ['text'];
    }

    disconnectedCallback(){
        this._tooltipIcon.removeEventListener('mouseenter',this._showTooltip);
        this._tooltipIcon.removeEventListener('mouseleave',this._hideTooltip)
    }

    _showTooltip(){
        this._tooltipContainer =  document.createElement('div');
        this._tooltipContainer.textContent = this._tooltipText;
        this.shadowRoot.appendChild(this._tooltipContainer);
    }

    _hideTooltip(){
        this.shadowRoot.removeChild(this._tooltipContainer);
    }
}

customElements.define('gk-tooltip', Tooltip);