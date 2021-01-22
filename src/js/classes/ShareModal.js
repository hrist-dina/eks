import {BaseModal} from "./base-modal";
const selectorBase = ".js-modal-share";

class ShareModal extends BaseModal {
    constructor(selector = selectorBase, options = {}) {
        super(selector, options);
    }

    init() {
        super.init();

        this.copyShareLinkInit();
    }

    copyShareLinkInit() {
        this.shareLink = this.element.find('.js-share-link');
        console.log(this.shareLink);
        this.shareLink.on('click', this.copyShareLink.bind(this));
    }

    copyShareLink(event) {
        event.preventDefault();
        if (!this.shareLink.length || !this.shareLink.attr('href')) return false;
        let tmp = $('<textarea>');
        $("body").append(tmp);
        tmp.val(this.shareLink.attr('href')).select();
        document.execCommand("copy");
        tmp.remove();

        return true;
    }
}
export {ShareModal};
