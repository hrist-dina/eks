import $ from "jquery";
import {BaronScroll} from "../../../js/classes/BaronScroll";

export class Search {
    constructor(selector = ".js-search") {
        this.search = $(selector);
        this.resultContainer = this.search.find('.js-result-container');
        this.searchLink = this.search.find('.js-search-result-link');

        this.init();
    }

    init() {
        this.focus();
    }

    focus() {
        let xhr;

        this.search.find("input").on('input change', (e) => {
            let searchString = $(e.target).val();

            if (xhr && "0" != xhr) {
                xhr.abort();
            }

            if (searchString.length > 2) {
                this.setSearchLink(searchString);

                xhr = $.ajax({
                    type: "POST",
                    data: {search: searchString},
                    url: '/ajax-virtual/search/',
                    success: (request) => {
                        xhr = "0";
                        request = $.parseJSON(request);

                        if (request.success == 1) {
                            let renderedResults = Search.renderNewResult(request.data.ITEMS);

                            this.clearContainer();
                            this.addResultInContainer(renderedResults);

                            new BaronScroll({
                                root: '.js-result-container'
                            });
                        }
                    }
                });
            } else {
                this.search.removeClass("active");
            }
        });
    }

    addResultInContainer(html) {
        this.resultContainer.append(html);

        if (html !== "") {
            this.search.addClass("active");
        } else {
            this.search.removeClass("active");
        }
    }

    clearContainer() {
        this.resultContainer.empty();
    }

    setSearchLink(queryString) {
        this.searchLink.attr('href', this.searchLink.data('url') + queryString)
    }

    static renderNewResult(data) {
        let list = '';

        for (let key in data) {
            console.log(data[key]);
            list = list + '<div class="search__result-item"><a class="search__result-left" href="#">\n' +
                '                                                    <div class="search__result-img"><img src="' + data[key].PICTURE.src + '"></div>\n' +
                '                                                    <div class="search__result-name">' + data[key].NAME + '</div></a>\n' +
                '                                                <div class="search__result-rigth">\n' +
                '                                                    <div class="search__result-price">5 999 ₽</div>\n' +
                '                                                </div><a class="btn-yellow js-modal-open" href="#" data-modal-type="buy">В корзину</a>\n' +
                '                                            </div>';
        }

        return list;
    }
}
