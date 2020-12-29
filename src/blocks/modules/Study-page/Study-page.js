import $ from "jquery";
// import {BaseModal} from "./../../../js/classes/base-modal";

export class StudyPage {
    constructor(selector = ".js-cabinet__wrap") {
        this.page = selector;
        this.classes = {
            currentQuestion: 'current-question',
            currentCabinet: 'current-cabinet',
            activeClass: 'active',
            disabledClass: 'disabled',
            testTabBtnClass: '.js-test-tab-btn',
            videoTabBtnClass: '.js-video-tab-btn',
        };

        this.selectors = {
            jsCabinetQuestion: '.js-cabinet-question',
            repeatTestBtn: '.js-repeat-test-btn',
            jsQuestionWrap: '.js-question-wrap',
            jsAnswerInputChecked: '.js-answer-checkbox:checked',
        };

        //elements
        this.testForm = $('.js-answer-form');

        this.testResultBlock = $('.cabinet-test__result');
        this.successBlock = $('.js-success');
        this.errorBlock = $('.js-error');
        this.nextActionBlock = $('.test-next-action');
        this.videoBlockerBlock = $('.js-video-blocker');
        this.cabinetDynamicBlock = $('.js-cabinet-dynamic-block');

        this.questionWrap = $('.js-question-wrap');
        this.testWrap = $('.test-wrap');

        this.currentQuestionCounter = $('.js-current-count');

        //btns
        this.nextBtn = $('.js-next-question-btn');
        this.repeatTestBtn = $('.js-repeat-test-btn');
        this.videoTabBtn = $('.js-video-tab-btn');
        this.testTabBtn = $('.js-test-tab-btn');
        this.nextLessonBtn = $('.js-lesson-next-action');
        this.shareBtn = $('.js-share');
        //checkboxes
        this.answerCheckbox = $('.js-answer-checkbox');
        this.lessonVideo = $('#lessonVideo');

        //emojiPopup

        this.successPopup = $('.js-success-popup');
        this.failurePopup = $('.js-failure-popup');
        this.init();
    }

    init() {
        // this.successModal = new BaseModal(this.successPopup);
        this.repeatTestInit();
        this.nextQuestionInit();
        this.choiceAnswerInit();
        this.setPassedQuestionsCountInit();
        this.disableVideoInit();
        this.enableVideoInit();
    }

    //eventListeners

    repeatTestInit() {
        this.repeatTestBtn.on('click', this.repeatTest.bind(this));
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
    }

    enableVideoInit() {
        this.videoTabBtn.on('click', this.enableLessonVideo.bind(this));
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

    // AJAX

    sendAnswer() {
        let formData = this.parseFormDataJsonToObject();
        let JSONData = JSON.stringify(formData);
        this.sendAnswers(JSONData);
    }

    sendAnswers(data) {
        if (!data) return false;
        let self = this;

        $.ajax('/ajax-virtual/student-progress/send-answer/', {
            type: 'POST',
            data: {'jsonResultString': data},
            success(response) {
                if (response.success && response.data) {
                    let jsonString = '"' + response.data + '"';
                    let jsonStringForHTML = self.parseFormDataJsonToHTMLFormat(jsonString);
                    let parsedData = JSON.parse(response.data);
                    if (!parsedData.is_final) {
                        if (parsedData && parsedData.current_question_id) {
                            self.showQuestionNodeById(parsedData.current_question_id);
                        }
                    } else {
                        self.sendAllAnswers(response.data);
                    }

                    self.setFormDataJsonResult(jsonStringForHTML);
                    self.setPassedQuestionsCount();
                }
            }
        });
    }

    sendAllAnswers(data) {
        if (!data) return false;
        let self = this;

        $.ajax('/ajax-virtual/student-progress/send-answers/', {
            type: 'POST',
            data: {'jsonResultString': data},
            success(response) {
                let responseData = JSON.parse(response.data);
                if (self.videoTabBtn.hasClass(self.classes.disabledClass)) self.videoTabBtn.removeClass(self.classes.disabledClass);
                let activeClass = self.classes.activeClass;
                let successResult = self.successBlock;
                let errorResult = self.errorBlock;
                self.testWrap.removeClass(activeClass);
                self.nextActionBlock.addClass(activeClass);
                self.nextBtn.removeClass(activeClass);
                if (response.success) {
                    self.showSuccessPopup(responseData);
                    successResult.toggleClass(activeClass, true);
                    errorResult.toggleClass(activeClass, false);
                    self.nextLessonBtn.addClass(self.classes.activeClass);
                    self.shareBtn.addClass(self.classes.activeClass);
                } else {
                    self.showFailurePopup();
                    successResult.toggleClass(activeClass, false);
                    errorResult.toggleClass(activeClass, true);
                }
            }
        })
    }

    //Optional

    showSuccessPopup(data) {
        let text = data.text ? data.text : undefined;
        let picture = data.picture ? data.picture : undefined;
        let description = data.description ? data.description : undefined;

        this.successPopup.find('.js-modal-text').html(text);
        this.successPopup.find('.js-modal-picture').attr("src", picture);
        if (description) {
            this.successPopup.find('.js-modal-description').html(description);
        }
        // BaseModal.openModal('study-success');
        // this.successModal.open(this.successPopup.data("modal-type"));
    }

    showFailurePoup(data) {

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
        let self = this;
        $.ajax('/ajax-virtual/student-progress/reset-progress/', {
            type: 'POST',
            data: {'jsonResultString': JSONData},
            success(response) {
                if (response.success && response.data) {
                    let jsonString = '"' + response.data + '"';
                    let jsonStringForHTML = self.parseFormDataJsonToHTMLFormat(jsonString);

                    self.setFormDataJsonResult(jsonStringForHTML);
                    self.resetProgress();
                }
            }
        });
    }
}
