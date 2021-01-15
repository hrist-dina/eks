import $ from "jquery";

export class YaShare {
    constructor(selector) {
        this.selector = selector;
        this.el = document.querySelector(this.selector);

        this.init()
    }

    init() {
        this.setLinks();
    }

    setLinks() {
        Ya.share2(this.el, {
            content: {
                url: this.el.dataset.videoLink,
            },
            theme: {
                services: 'vkontakte,facebook,odnoklassniki,telegram,whatsapp',
                size: 'l',
                shape: 'normal',
                colorScheme: 'blackwhite',

            }
        });
    }
}