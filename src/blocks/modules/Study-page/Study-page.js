    import $ from "jquery";

export class StudyPage {
    constructor(selector = ".js-cabinet__wrap") {
        this.$el = $(document).find(selector);
        this.page = selector;
        this.classes = {
            currentQuestion: 'current-question',
            currentCabinet: 'current-cabinet',
            activeClass: 'active',
            disabledClass: 'disabled',
        };

        this.selectors = {
            repeatTestBtn: '.js-repeat-test-btn',
            jsQuestionWrap: '.js-question-wrap',
            modalFailure: '.js-modal-failure',
            modalSuccess: '.js-modal-success',
            modalProfile: '.js-modal-profile',
            modalFinish: '.js-modal-finish',

            repeatTestBtn: '.js-repeat-test-btn',
            repeatLessonBtn: '.js-repeat-lesson-btn',

            jsModalText: '.js-modal-text',
            jsModalPicture: '.js-modal-picture',
            jsModalDescription: '.js-modal-description',
        };

        //elements
        this.testForm = $('.js-answer-form');

        this.testResultBlock = $('.cabinet-test__result');
        this.nextActionBlock = $('.test-next-action');
        this.videoBlockerBlock = $('.js-video-blocker');
        this.cabinetDynamicBlock = $('.js-cabinet-dynamic-block');

        this.questionWrap = $('.js-question-wrap');
        this.testWrap = $('.test-wrap');
        this.cabinetTabs = this.$el.find('.js-cabinet-tabs');

        this.currentQuestionCounter = $('.js-current-count');

        //btns
        this.nextBtn = $('.js-next-question-btn');
        this.repeatTestBtn = $(this.selectors.repeatTestBtn);
        this.repeatLessonBtn = $(this.selectors.repeatLessonBtn);
        this.videoTabBtn = $('.js-video-tab-btn');
        this.testTabBtn = $('.js-test-tab-btn');
        this.nextLessonBtn = $('.js-lesson-next-action');
        this.shareBtn = $('.js-share');

        //checkboxes
        this.answerCheckbox = $('.js-answer-checkbox');
        this.lessonVideo = $('#lessonVideo');

        //emojiPopup

        this.successPopup = $(this.selectors.modalSuccess);

        this.failurePopup = $(this.selectors.modalFailure);

        //profilePopup

        this.profilePopup = $(this.selectors.modalProfile);
        this.profilePopupCertDownloadLink = this.profilePopup.find('.js-link-download');

        //finishPopup
        this.finishPopup = $(this.selectors.modalFinish);
        this.init();
    }

    init() {
        this.repeatTestInit();
        this.repeatLessonInit();
        this.nextQuestionInit();
        this.choiceAnswerInit();
        this.setPassedQuestionsCountInit();
        this.disableVideoInit();
        this.enableVideoInit();
    }

    //eventListeners

    repeatTestInit() {
        this.repeatTestBtn.each((i, el) => {
            $(el).on('click', this.repeatTest.bind(this));
        });
    }

    repeatLessonInit() {
        this.repeatLessonBtn.each((i, el) => {
            $(el).on('click', this.repeatLesson.bind(this));
            $(el).on('click', this.showCabinetTabs.bind(this));
        });
    }

    nextQuestionInit() {
        this.nextBtn.on('click', this.sendAnswer.bind(this));
    }

    choiceAnswerInit() {
        this.answerCheckbox.on('change', this.choiceAnswer.bind(this));
    }

    //

    disableVideoInit() {
        this.testTabBtn.on('click', this.disableLessonVideo.bind(this));
        this.testTabBtn.on('click', this.hideCabinetTabs.bind(this));
    }

    enableVideoInit() {
        this.videoTabBtn.on('click', this.enableLessonVideo.bind(this));
        this.videoTabBtn.on('click', this.showCabinetTabs.bind(this));
    }

    setPassedQuestionsCountInit() {
        this.setPassedQuestionsCount();
    }

    disableLessonVideo() {
        if (this.testTabBtn.hasClass(this.classes.activeClass)) return false;
        this.videoTabBtn.removeClass(this.classes.activeClass);
        if (!this.videoTabBtn.hasClass(this.classes.disabledClass)) this.videoTabBtn.addClass(this.classes.disabledClass);
        this.testTabBtn.addClass(this.classes.activeClass);

        let src = this.lessonVideo.attr('src');

        this.lessonVideo.attr('src', '');
        this.lessonVideo.attr('src', src);

        if (!this.cabinetDynamicBlock.hasClass(this.classes.activeClass)) this.cabinetDynamicBlock.addClass(this.classes.activeClass);
        if (!this.videoBlockerBlock.hasClass(this.classes.activeClass)) this.videoBlockerBlock.addClass(this.classes.activeClass);
    }

    enableLessonVideo() {
        if (this.videoTabBtn.hasClass(this.classes.activeClass) || this.videoTabBtn.hasClass(this.classes.disabledClass)) return false;
        this.videoTabBtn.addClass(this.classes.activeClass);
        this.testTabBtn.removeClass(this.classes.activeClass);
        if (this.cabinetDynamicBlock.hasClass(this.classes.activeClass)) this.cabinetDynamicBlock.removeClass(this.classes.activeClass);
        if (this.videoBlockerBlock.hasClass(this.classes.activeClass)) this.videoBlockerBlock.removeClass(this.classes.activeClass);
    }

    showQuestionNodeById(id) {
        let questionWrap = document.querySelectorAll(this.selectors.jsQuestionWrap);
        let currentQuestionClass = this.classes.currentQuestion;
        for (let i = 0; i < questionWrap.length; i ++) {
            questionWrap[i].classList.remove(currentQuestionClass);
            if (Number(questionWrap[i].dataset.questionId) === Number(id)) {
                questionWrap[i].classList.add(currentQuestionClass)
            }
        }
    }

    parseFormDataJsonToObject() {
        let DATA = this.testForm.attr('data-json-result').replace(/\u005c/g , '');
        /** переводим JS0N.строку из дата-аттрибута в обычную JSON.строку и преобразуем в объект */
        DATA = DATA.substring(1, DATA.length);
        DATA = DATA.substring(0, DATA.length - 1);
        return JSON.parse(DATA);
    }

    parseFormDataJsonToHTMLFormat(data) {
        return data.replace(/&quot;/g, '\\');
    }

    checkIfAnswersSelected(questionBlock) {
        return questionBlock.find(this.selectors.answerInputChecked).length > 0;
    }

    setFormDataJsonResult(data) {
        this.testForm.attr('data-json-result', data);
        return true;
    }

    choiceAnswer(e) {
        let checkbox = $(e.target);
        let addToList = true;
        let currentQuestionWrapper = checkbox.parents(this.selectors.jsQuestionWrap);
        let questionId = currentQuestionWrapper.attr('data-question-id');
        let answerId = checkbox.attr('data-answer-id');
        if (!checkbox.is(':checked')) addToList = false;
        this.setAnswer(questionId, answerId, addToList);
    }

    setAnswer(questionId, answerId, addToList = true) {
        let formData = this.parseFormDataJsonToObject();
        for (let currentAnswersList of formData.answers_list) {
            let checkBoxIsSet = false;
            if (checkBoxIsSet) break;
            if (Number(currentAnswersList.question_id) === Number(questionId)) {
                if (addToList) {
                    currentAnswersList.answers = currentAnswersList.answers.filter(item => Number(item) !== Number(answerId));
                    currentAnswersList.answers.push(Number(answerId));
                    checkBoxIsSet = true;
                } else {
                    currentAnswersList.answers = currentAnswersList.answers.filter(item => Number(item) !== Number(answerId));
                    checkBoxIsSet = true;

                }
            }
        }
        let jsonString = '"' + JSON.stringify(formData) + '"';
        this.setFormDataJsonResult(this.parseFormDataJsonToHTMLFormat(jsonString));
    }

    enableCert(href) {
        if (!this.profilePopupCertDownloadLink) return false;
        this.profilePopupCertDownloadLink.attr('href', href);
        this.profilePopupCertDownloadLink.toggleClass('active', true);
        return true;
    }

    // AJAX

    sendAnswer() {
        let formData = this.parseFormDataJsonToObject();
        let JSONData = JSON.stringify(formData);
        this.sendAnswers(JSONData);
    }

    sendAnswers(data) {
        if (!data) return false;

        $.ajax('/ajax-virtual/student-progress/send-answer/', {
            type: 'POST',
            data: {'jsonResultString': data},
            success: response => {
                if (response.success && response.data) {
                    let jsonString = '"' + response.data + '"';
                    let jsonStringForHTML = this.parseFormDataJsonToHTMLFormat(jsonString);
                    let parsedData = JSON.parse(response.data);
                    if (!parsedData.is_final) {
                        if (parsedData && parsedData.current_question_id) {
                            this.showQuestionNodeById(parsedData.current_question_id);
                        }
                    } else {
                        this.sendAllAnswers(response.data);
                    }

                    this.setFormDataJsonResult(jsonStringForHTML);
                    this.setPassedQuestionsCount();
                }
            }
        });
    }

    sendAllAnswers(data) {
        if (!data) return false;

        $.ajax('/ajax-virtual/student-progress/send-answers/', {
            type: 'POST',
            data: {'jsonResultString': data},
            success: response => {
                let parsedResponse = JSON.parse(response);
                if (this.videoTabBtn.hasClass(this.classes.disabledClass)) this.videoTabBtn.removeClass(this.classes.disabledClass);
                let activeClass = this.classes.activeClass;
                this.testWrap.removeClass(activeClass);
                this.nextActionBlock.addClass(activeClass);
                this.nextBtn.removeClass(activeClass);
                console.log(parsedResponse);
                if (parsedResponse.success) {
                    // Если это последний урок из серии - делаем сертификат активным для скачивания
                    if (parsedResponse.data.file_path) {
                        this.enableCert(parsedResponse.data.file_path);
                        this.showFinishPopup(Object.assign({text: parsedResponse.message}, parsedResponse.data));
                    } else {
                        this.showSuccessPopup(parsedResponse);
                        this.nextLessonBtn.addClass(this.classes.activeClass);
                        this.shareBtn.addClass(this.classes.activeClass);
                    }
                } else {
                    this.showFailurePopup(parsedResponse.data);
                }
            }
        })
    }

    //Optional

    showSuccessPopup(data) {
        // TODO
        let text = data.text ? data.text : undefined;
        let picture = data.picture ? data.picture : undefined;
        let description = data.description ? data.description : undefined;

        if (text) this.successPopup.find(this.selectors.jsModalText).html(text);
        if (picture) this.successPopup.find(this.selectors.jsModalText).attr('src', picture);
        if (description) {
            this.successPopup.find(this.selectors.jsModalDescription).html(description);
        }

        this.successPopup.trigger('click');

    }

    showFailurePopup(data) {
        let text = data.text ? data.text : undefined;
        let picture = data.picture ? data.picture : undefined;
        let description = data.description ? data.description : undefined;

        if (text) this.failurePopup.find(this.selectors.jsModalText).html(text);
        if (picture) this.failurePopup.find(this.selectors.jsModalPicture).attr('src', picture);

        if (description) {
            this.failurePopup.find(this.selectors.jsModalDescription).html(description);
        }

        this.failurePopup.trigger('click');
        this.failurePopup.find(this.selectors.repeatTestBtn).on('click', this.repeatTest.bind(this));
        this.failurePopup.find(this.selectors.repeatLessonBtn).on('click', this.repeatLesson.bind(this));
    }

    showFinishPopup(data) {
        console.log(data);
        let picture = data.certificate_icon ? data.certificate_icon : undefined;
        console.log(picture)

        if (picture) {
            console.log(this.finishPopupPicture);
            console.log(picture);
            this.finishPopup.find(this.selectors.jsModalPicture).attr('src', picture);
        }
        this.finishPopup.trigger('click');

    }


    /** Устанавливаем номер текущего вопроса */
    setPassedQuestionsCount() {
        let passedQuestionsNode = this.currentQuestionCounter
        let lessonInfoObject = this.parseFormDataJsonToObject();
        let currentQuestionId = lessonInfoObject.current_question_id;
        let allQuestionsIds = lessonInfoObject.lesson_questions_ids;
        for (let i = 0; i < allQuestionsIds.length; i ++) {
            if (currentQuestionId == allQuestionsIds[i]) {
                passedQuestionsNode.html(i + 1);
                break;
            }
        }
    }

    /** Начать тест заново */
    resetProgress() {
        let activeClass = this.classes.activeClass;
        let currentQuestion = this.classes.currentQuestion;
        let resultNode = this.testResultBlock;
        let questionNode = this.questionWrap;
        resultNode.removeClass(activeClass);
        questionNode.removeClass(currentQuestion);
        this.testWrap.addClass(activeClass);
        questionNode.eq(0).addClass(currentQuestion);
        this.answerCheckbox.prop('checked', false);
        this.nextActionBlock.removeClass(activeClass);
        this.nextBtn.addClass(activeClass);

        this.setPassedQuestionsCount();
    }

    repeatTest() {
        let formData = this.parseFormDataJsonToObject();
        let JSONData = JSON.stringify(formData);
        $.ajax('/ajax-virtual/student-progress/reset-progress/', {
            type: 'POST',
            data: {'jsonResultString': JSONData},
            success: response => {
                if (response.success && response.data) {
                    let jsonString = '"' + response.data + '"';
                    let jsonStringForHTML = this.parseFormDataJsonToHTMLFormat(jsonString);

                    this.setFormDataJsonResult(jsonStringForHTML);
                    this.resetProgress();
                }
            }
        });
    }

    repeatLesson() {
        let formData = this.parseFormDataJsonToObject();
        let JSONData = JSON.stringify(formData);
        $.ajax('/ajax-virtual/student-progress/reset-progress/', {
            type: 'POST',
            data: {'jsonResultString': JSONData},
            success: response => {
                if (response.success && response.data) {
                    let jsonString = '"' + response.data + '"';
                    let jsonStringForHTML = this.parseFormDataJsonToHTMLFormat(jsonString);

                    this.setFormDataJsonResult(jsonStringForHTML);
                    this.resetProgress();

                    this.enableLessonVideo();

                }
            }
        });
    }

    showCabinetTabs() {
        if (!this.cabinetTabs.hasClass(this.classes.activeClass)) this.cabinetTabs.addClass(this.classes.activeClass)
    }

    hideCabinetTabs() {
        if (this.cabinetTabs.hasClass(this.classes.activeClass)) this.cabinetTabs.removeClass(this.classes.activeClass)
    }
}
