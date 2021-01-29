export class CabinetVideo {
    constructor(containerSelector = 'video-player', srcBlockSelector, blockerSelector, options = {}) {
        this.src = document.querySelector(srcBlockSelector).dataset.video;
        this.blocker = document.querySelector(blockerSelector);
        this.containerSelector = containerSelector;
        this.script;
        this.player;
        this.activeClass = 'active';
        this.iframeApi = "https://www.youtube.com/iframe_api";

        this.width = options.width;
        this.height = options.height;
        this.init();
    }

    init() {
        this.prepareSrc();
        this.getScript();
        this.insertScript();

        this.playerInit();
    }

    playerInit() {
        window.onload = () => {
            if (this.src) {
                console.log(this.src);
                this.player = new YT.Player(this.containerSelector, {
                    height: this.height,
                    width: this.width,
                    videoId: this.src,
                    events: {
                        'onReady': this.onPlayerReady.bind(this),
                        'onStateChange': this.onPlayerStateChange.bind(this)
                    }
            });

            }
        }
    }

    prepareSrc() {
        this.src =  this.src.replace(/^https:\/\/www.youtube.com\/embed\//, '');
    }

    getScript() {
        this.script = document.createElement('script');
        this.script.src = this.iframeApi;
    }

    insertScript() {
        let firstScriptTag = document.getElementsByTagName('script')[0];
        console.log(firstScriptTag, this.script);
        firstScriptTag.parentNode.insertBefore(this.script, firstScriptTag);
    }

    onPlayerReady(event) {
        console.log('ready');
    }

    onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING) {
            this.playVideo();
        } else if (event.data == YT.PlayerState.PAUSED){
            this.stopVideo();
        }
    }

    stopVideo() {
        if (!this.blocker.classList.contains(this.activeClass)) this.blocker.classList.add(this.activeClass);
    }

    playVideo() {
        if (this.blocker.classList.contains(this.activeClass)) this.blocker.classList.remove(this.activeClass);

    }

}