var jQuery = require('jquery');
var $ = jQuery;
require('jquery-ui-browserify');
global.bootbox = require('bootbox');
require('bootstrap');
require('./jquery.timer');
var Highcharts = require('highcharts');
var HighchartsAnnotations = require('highcharts-annotations')(Highcharts);

$.widget('crowdcurio.TimeSeriesAnnotator', {

    options: {
        optionsURLParameter: 'annotatorOptions',
        apiClient: undefined,
        projectUUID: undefined,
        requireConsent: false,
        trainingVideo: {
            forcePlay: false,
            blockInteraction: true,
            vimeoId: '169158678',
        },
        payment: 0.00,
        showConfirmationCode: false,
        confirmationCode: undefined,
        recordingName: undefined,
        channelsDisplayed: [0, 1, 2, 3, 4, 6, 7],
        channelGainAdjustmentEnabled: true,
        keyboardInputEnabled: true,
        isReadOnly: false,
        startTime: 0,
        visibleRegion: {
            start: undefined,
            end: undefined,
            showProgress: true,
            hitModeEnabled: true,
            training: {
                enabled: true,
                isTrainingOnly: false,
                numberOfInitialWindowsUsedForTraining: 0,
                windows: [],
            }
        },
        graph: {
            channelSpacing: 400,
            width: undefined,
            height: 600,
            marginTop: 10,
            marginBottom: 30,
            marginLeft: 90,
            marginRight: 30,
            backgroundColor: '#ffffff',
        },
        marginTop: null,
        marginBottom: null,
        windowSizeInSeconds: 30,
        windowJumpSizeFastForwardBackward: 10,
        numberOfForwardWindowsToPrefetch: 3,
        numberOfFastForwardWindowsToPrefetch: 3,
        numberOfBackwardWindowsToPrefetch: 3,
        numberOfFastBackwardWindowsToPrefetch: 3,
        relativeGainChangePerStep: 0.25,
        idleTimeThresholdSeconds: 300,
        experiment: {},
        showArtifactButtons: false,
        showSleepStageButtons: false,
        showNavigationButtons: true,
        showBackToLastActiveWindowButton: true,
        showFastBackwardButton: true,
        showBackwardButton: true,
        showForwardButton: true,
        showFastForwardButton: true,
        showShortcuts: false,
        showLogoutButton: false,
        showAnnotationTime: false,
        showReferenceLines: true,
        showTimeLabels: true,
        showChannelNames: true,
        features: {
            examplesModeEnabled: false,
            examples: [{
                recording: '1209153-1_P',
                channels_displayed: [0],
                channels: 0,
                type: 'sleep_spindle',
                start: 1925,
                end: 1928,
                annotator_experience: 1,
                confidence: 1,
                comment: 'Interesting!',
            }, {
                recording: '1209153-1_P',
                channels_displayed: [0],
                channels: 0,
                type: 'sleep_spindle',
                start: 2030,
                end: 2035,
                annotator_experience: 1,
                confidence: 1,
                comment: 'Interesting!',
            }],
            cheatSheetsEnabled: false,
            openCheatSheetOnPageLoad: true,
            scrollThroughExamplesAutomatically: true,
            scrollThroughExamplesSpeedInSeconds: 5,
            showUserAnnotations: true,
            order: ['sleep_spindle', 'k_complex', 'rem', 'vertex_wave'],
            options: {
                'sleep_spindle': {
                    name: 'Spindle',
                    annotation: {
                        red: 86,
                        green: 186,
                        blue: 219,
                        alpha: {
                            min: 0.22,
                            max: 0.45
                        }
                    },
                    answer: {
                        red: 0,
                        green: 0,
                        blue: 0,
                        alpha: {
                            min: 0.1,
                            max: 0.25
                        }
                    },
                    training: {
                        windows: [
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 1920,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 14790,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 1980,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 16680,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 2010,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 2040,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 2070,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 2130,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 17130,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 2160,
                                windowSizeInSeconds: 30,
                            },
                        ],
                    },
                },
                'k_complex': {
                    name: 'K-Complex',
                    annotation: {
                        red: 195,
                        green: 123,
                        blue: 225,
                        alpha: {
                            min: 0.18,
                            max: 0.35
                        }
                    },
                    answer: {
                        red: 0,
                        green: 0,
                        blue: 0,
                        alpha: {
                            min: 0.1,
                            max: 0.25
                        }
                    },
                    training: {
                        windows: [
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 1590,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 600,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 1620,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 900,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 1650,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 2700,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 1800,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 3300,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 1860,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 1200,
                                windowSizeInSeconds: 30,
                            },
                        ],
                    },
                },
                'rem': {
                    name: 'REM',
                    annotation: {
                        red: 238,
                        green: 75,
                        blue: 38,
                        alpha: {
                            min: 0.18,
                            max: 0.35
                        }
                    },
                    answer: {
                        red: 0,
                        green: 0,
                        blue: 0,
                        alpha: {
                            min: 0.1,
                            max: 0.25
                        }
                    },
                    training: {
                        windows: [
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 5250,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 600,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 5400,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 900,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 9810,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 2700,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 9960,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 3300,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 10230,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 1200,
                                windowSizeInSeconds: 30,
                            },
                        ],
                    },
                },
                'vertex_wave': {
                    name: 'Vertex Wave',
                    annotation: {
                        red: 0,
                        green: 0,
                        blue: 0,
                        alpha: {
                            min: 0.18,
                            max: 0.35
                        }
                    },
                    answer: {
                        red: 0,
                        green: 0,
                        blue: 0,
                        alpha: {
                            min: 0.1,
                            max: 0.25
                        }
                    },
                    training: {
                        windows: [
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 600,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 17550,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 5400,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 900,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 9810,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 12360,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 9960,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 3300,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 4230,
                                windowSizeInSeconds: 30,
                            },
                            {
                                recordingName: '1209056-1_P',
                                timeStart: 1200,
                                windowSizeInSeconds: 30,
                            },
                        ],
                    },
                },
                'delta_wave': {
                    name: 'Delta Wave',
                    annotation: {
                        red: 20,
                        green: 230,
                        blue: 30,
                        alpha: {
                            min: 0.18,
                            max: 0.35
                        }
                    },
                    answer: {
                        red: 0,
                        green: 0,
                        blue: 0,
                        alpha: {
                            min: 0.1,
                            max: 0.25
                        }
                    },
                    training: {
                        windows: [],
                    },
                }
            },
        },
    },

    _create: function() {
        var that = this;
        that._initializeVariables();
        $(that.element).addClass(that.vars.uniqueClass);
        that._fetchOptionsFromURLParameter();
        that._createHTMLContent();
        that._loadPreferences(function() {
            if (that.options.requireConsent) {
                that._showConsentForm();
            }
            if (that.options.trainingVideo.forcePlay) {
                that._forcePlayTrainingVideo();
            }
            that._setupHITMode();
            if (that.options.features.examplesModeEnabled) {
                that._setupExamplesMode();
                return;
            }
            if (that.options.experiment.running) {
                that._setupExperiment();
                that._setup();
            }
            else {
                var recordingNameFromGetParameter = that._getUrlParameter('recording_name');
                if (recordingNameFromGetParameter) {
                    that.options.recordingName = recordingNameFromGetParameter;
                }
                that._setup();
            }
        });
    },

    _initializeVariables: function() {
        var that = this;
        that.vars = {
            uniqueClass: that._getUUID(),
            activeFeatureType: 0,
            chart: null,
            activeAnnotations: [],
            annotationsLoaded: false,
            selectedChannelIndex: undefined,
            currentWindowData: null,
            currentWindowStart: null,
            lastActiveWindowStart: null,
            initialChannelGains: [],
            currentChannelGainAdjustments: [],
            forwardEnabled: undefined,
            fastForwardEnabled: undefined,
            backwardEnabled: undefined,
            fastBackwardEnabled: undefined,
            numberOfAnnotationsInCurrentWindow: 0,
            specifiedTrainingWindows: undefined,
            currentTrainingWindowIndex: 0,
            cheatSheetOpenedBefore: false,
            scrollThroughExamplesIntervalId: undefined,
            taskDataConfiguration: undefined,
            windowsCache: {},
            // windowCache is an object, keeping track of data that is loaded in the background:
            //
            // {
            //     'window_identifier_key_1': undefined,   // <-- data for this window is not available, but can be requested
            //     'window_identifier_key_2': false,       // <-- this window does not contain valid data
            //     'window_identifier_key_3': {            // <-- data for this window has been requested, but not been returned so far
            //         request: jqXHRObject,
            //         data: undefined
            //     },
            //     'window_identifier_key_4': {            // <-- data for this window is available
            //         request: jqXHRObject,
            //         data: dataObject
            //     },
            // }
            annotationsCache: {},
            // annotationsCache is an object, keeping track of annotations loaded from the server:
            //
            // {
            //     'start_end_answer': undefined,          // <-- data for this window is not available, but can be requested
            //     'start_end_answer': {},                 // <-- data for this window has been requested already
            // }
        }
    },

    _shouldBeMergedDeeply: function(objectA) {
        if (!objectA) return false;
        if (typeof objectA == 'number') return false;
        if (typeof objectA == 'string') return false;
        if (typeof objectA == 'boolean') return false;
        if (objectA instanceof Array) return false;
        return true;
    },

    _mergeObjectsDeeply: function(target) {
        var that = this;
        var sources = [].slice.call(arguments, 1);
        sources.forEach(function (source) {
            for (var prop in source) {
                if (that._shouldBeMergedDeeply(target[prop]) && that._shouldBeMergedDeeply(source[prop])) {
                    target[prop] = that._mergeObjectsDeeply(target[prop], source[prop]);
                }
                else {
                    target[prop] = source[prop];
                }
            }
        });
        return target;
    },

    _fetchOptionsFromURLParameter: function() {
        var that = this;
        if (!that.options.optionsURLParameter) return;
        var optionsStringFromURL = that._getUrlParameter(that.options.optionsURLParameter);
        if (!optionsStringFromURL) return;
        try {
            var optionsFromURL = JSON.parse(optionsStringFromURL);
            that._mergeObjectsDeeply(that.options, optionsFromURL);
        }
        catch (e) {
            console.log('The following options string does not have valid JSON syntax:', optionsStringFromURL);
        }
    },

    _createHTMLContent: function() {
        var that = this;
        var content = ' \
            <div class="graph_container"> \
                <div class="graph_control"> \
                    <div class="experiment_container container-fluid"> \
                        <div class="col-xs-12 col-sm-4"></div> \
                        <div class="hints_container col-xs-12 col-sm-4"></div> \
                        <div class="buttons_container col-xs-12 col-sm-4"></div> \
                    </div> \
                    <div class="button_container container-fluid"> \
                        <div class="feature_panel btn-group" role="group"> \
                        </div> \
                        <div class="correct-answer-explanation"> \
                        </div> \
                        <div class="artifact_panel btn-group" role="group"> \
                            <button type="button" class="btn btn-default artifact" data-annotation-type="artifacts_none">No Artifacts</button> \
                            <button type="button" class="btn btn-default artifact" data-annotation-type="artifacts_light">Light Artifacts</button> \
                            <button type="button" class="btn btn-default artifact" data-annotation-type="artifacts_medium">Medium Artifacts</button> \
                            <button type="button" class="btn btn-default artifact" data-annotation-type="artifacts_strong">Strong Artifacts</button> \
                        </div> \
                        <div class="sleep_stage_panel btn-group" role="group"> \
                            <button type="button" class="btn btn-default grey lighten-1 sleep_stage" data-annotation-type="sleep_stage_wake"><span class="shortcut-key">W</span>AKE</button> \
                            <button type="button" class="btn btn-default grey lighten-1 sleep_stage" data-annotation-type="sleep_stage_n1">N<span class="shortcut-key">1</span></button> \
                            <button type="button" class="btn btn-default grey lighten-1 sleep_stage" data-annotation-type="sleep_stage_n2">N<span class="shortcut-key">2</span></button> \
                            <button type="button" class="btn btn-default grey lighten-1 sleep_stage" data-annotation-type="sleep_stage_n3">N<span class="shortcut-key">3</span></button> \
                            <button type="button" class="btn btn-default grey lighten-1 sleep_stage" data-annotation-type="sleep_stage_rem"><span class="shortcut-key">R</span>EM</button> \
                            <button type="button" class="btn btn-default grey lighten-1 sleep_stage" data-annotation-type="sleep_stage_unknown"><span class="shortcut-key">U</span>NKNOWN</button> \
                        </div> \
                        <div class="navigation_panel"> \
                                <button type="button" class="btn btn-default backToLastActiveWindow" aria-label="Back to Last Active Window"> \
                                    <span class="fa fa-repeat" aria-hidden="true"></span> \
                                </button> \
                                <button type="button" class="btn btn-default fastBackward" aria-label="Fast Backward"> \
                                    <span class="fa fa-fast-backward" aria-hidden="true"></span> \
                                </button> \
                                <button type="button" class="btn btn-default backward" aria-label="Backward"> \
                                    <span class="fa fa-step-backward" aria-hidden="true"></span> \
                                </button> \
                                <button type="button" class="btn btn-default forward" aria-label="Forward"> \
                                    <span class="fa fa-step-forward" aria-hidden="true"></span> \
                                </button> \
                                <button type="button" class="btn btn-default fastForward" aria-label="Fast Forward"> \
                                    <span class="fa fa-fast-forward" aria-hidden="true"></span> \
                                </button> \
                                <button type="button" class="btn btn-default keyboardShortcuts" data-html="true" data-container=".' + that.vars.uniqueClass + '" data-toggle="popover" data-placement="bottom" data-content="<p>Forward: Right Arrow, Page up, D</p> \
                                                                    <p>Backward: Left Arrow, Page Down, A</p> \
                                                                    <p>Skip 5 Min: Up/Down Arrows</p> \
                                                                    <p>Back to Last Annotation: R</p> \
                                                                    <p>Feature Classifications: Number Keys</p>"> \
                                    <span class="fa fa-th" aria-hidden="true"></span> \
                                </button> \
                                <button type="button" class="btn btn-default annotationTime" aria-label="Total Annotation Time"> \
                                    <span class="fa fa-clock-o" aria-hidden="true"></span> \
                                    <div class="annotation-time-container"></div> \
                                </button> \
                        </div> \
                        <div class="progress pull-right"> \
                            <div class="determinate progress-bar progress-bar-success progress-bar-striped" role="progressbar" style="width: 0%"> \
                            </div> \
                        </div> \
                    </div> \
                </div> \
                <div class="graph"></div> \
                <div class="graph_footer"> \
                    <div class="container-fluid"> \
                        <div class="adjustment_buttons col-xs-4 left"> \
                            <button type="button" disabled="true" class="btn btn-default gain-button gainUp" aria-label="Left Align"> \
                            <span class="fa fa-plus" aria-hidden="true"></span> \
                            </button> \
                            <button type="button" class="btn btn-default gain-button gainDown" disabled="true" aria-label="Left Align"> \
                            <span class="fa fa-minus" aria-hidden="true"></span> \
                            </button> \
                            <button type="button" class="btn btn-default gain-button gainReset" disabled="true" aria-label="Left Align"> \
                            <span aria-hidden="true">Reset</span> \
                            </button> \
                        </div> \
                        <div class="adjustment_buttons col-xs-4 middle"> \
                        </div> \
                        <div class="adjustment_buttons col-xs-4 right"> \
                        </div> \
                    </div> \
                </div> \
            </div> \
        ';
        $(that.element).html(content);
    },

    _adaptContent: function() {
        var that = this;
        if (!that.options.channelGainAdjustmentEnabled) {
            $(that.element).find('.adjustment_buttons').hide();
        }
        if (!that.options.showArtifactButtons) {
            $(that.element).find('.artifact_panel').hide();
        }
        if (!that.options.showSleepStageButtons) {
            $(that.element).find('.sleep_stage_panel').hide();
        }
        if (!that.options.showNavigationButtons) {
            $(that.element).find('.navigation_panel').hide();
        }
        if (!that.options.showBackToLastActiveWindowButton) {
            $(that.element).find('.backToLastActiveWindow').hide();
        }
        if (!that.options.showFastBackwardButton) {
            $(that.element).find('.fastBackward').hide();
        }
        if (!that.options.showBackwardButton) {
            $(that.element).find('.backward').hide();
        }
        if (!that.options.showForwardButton) {
            $(that.element).find('.forward').hide();
        }
        if (!that.options.showFastForwardButton) {
            $(that.element).find('.fastForward').hide();
        }
        if (!that.options.showShortcuts) {
            $(that.element).find('.keyboardShortcuts').hide();
        }
        if (!that.options.showAnnotationTime) {
            $(that.element).find('.annotationTime').hide();
        }
        if (!that.options.showLogoutButton) {
            $(that.element).find('.logout').hide();
        }
        if (!that._isHITModeEnabled()) {
            $(that.element).find('.progress').hide();
        }
        $(that.element).css({
            marginTop: that.options.marginTop,
            marginBottom: that.options.marginBottom,
        })
    },

    _forcePlayTrainingVideo: function() {
        var that = this;
        var videoBox = bootbox.dialog({
            title: '<b>Training Video (PLEASE TURN UP YOUR SOUND VOLUME)</b>',
            onEscape: false,
            backdrop: false,
            closeButton: false,
            animate: true,
            message: '<div class="training-video"></div><div class="interaction-blocker"></div>',
            size: 'large',
        });
        videoBox.appendTo(that.element);
        videoBox.css({
            backgroundColor: 'rgba(0, 0, 0, 1)',
            zIndex: 999999,
        });
        if (that.options.trainingVideo.blockInteraction) {
            videoBox.find('.interaction-blocker').css({
                position: 'fixed',
                width: '100%',
                height: '100%',
                left: 0,
                top: 0,
            });
        }
        var videoContainer = videoBox.find('.training-video');
        var videoId = that.options.trainingVideo.vimeoId;
        var aspectRatio = 513 / 287
        var width = Math.round(videoContainer.width());
        var height = Math.round(width / aspectRatio);
        var playerId = that._getUUID();
        $.getJSON('http://www.vimeo.com/api/oembed.json?url=' + encodeURIComponent('http://vimeo.com/' + videoId) + '&title=0&byline=0&portrait=0&badge=0&loop=0&autoplay=1&width=' + width + '&height=' + height + '&api=1&player_id=' + playerId + '&callback=?', function(data) {
            var playerIFrame = $(data.html).attr('id', playerId).appendTo(videoContainer);
            var player = $f(playerIFrame[0]);
            player.addEvent('ready', function() {
                player.addEvent('finish',function() {
                    videoBox.remove();
                });
            });
        });
    },

    _showConsentForm: function() {
        var that = this;
        var confirmationCodeInfo = '';
        if (that.options.showConfirmationCode && that.options.confirmationCode) {
            confirmationCodeInfo = '. For the payment to be processed correctly you need to enter the confirmation code presented to you at the end of the task into the corresponding input field in the instructions panel on Mechanical Turk';
        }
        bootbox.dialog({
            onEscape: false,
            backdrop: false,
            closeButton: false,
            animate: true,
            title: 'Information Consent',
            message: ' \
                <div class="text-left"> \
                You are invited to participate in a research study conducted by Mike Schaekermann under the supervision of Professor Edith Law of the University of Waterloo, Canada. The objectives of the research study are to develop a low cost crowdsourcing system for EEG analysis for use in the third world.<br><br> \
                If you decide to participate, you will be asked to complete a 20-30 minute online EEG analysis task, as described on the task listing. Participation in this study is voluntary. You may decline to answer any questions that you do not wish to answer and you can withdraw your participation at any time by closing this browser tab or window. You will be paid $' + that.options.payment.toFixed(2) + ' upon completion of the task' + confirmationCodeInfo + '. Unfortunately we are unable to pay participants who do not complete the task. There are no known or anticipated risks from participating in this study.<br><br> \
                It is important for you to know that any information that you provide will be confidential. All of the data will be summarized and no individual could be identified from these summarized results. Furthermore, the web site is programmed to collect responses alone and will not collect any information that could potentially identify you (such as machine identifiers). The data collected from this study will be maintained on a password-protected computer database in a restricted access area of the university. As well, the data will be electronically archived after completion of the study and maintained for eight years and then erased.<br><br> \
                This survey uses Mechanical Turk which is a United States of America company. Consequently, USA authorities under provisions of the Patriot Act may access this survey data. If you prefer not to submit your data through Mechanical Turk, please do not participate.<br><br> \
                Note that the remuneration you receive may be taxable income. You are responsible for reporting this income for tax purposes. Should you have any questions about the study, please contact either Mike Schaekermann (mschaeke@uwaterloo.ca) or Edith Law (edith.law@uwaterloo.ca). Further, if you would like to receive a copy of the results of this study, please contact either investigator.<br><br> \
                I would like to assure you that this study has been reviewed and received ethics clearance through a University of Waterloo Research Ethics Committee. However, the final decision about participation is yours. Should you have any comments or concerns resulting about your participation in this study, please contact Dr. Maureen Nummelin in the Office of Research Ethics at 1-519-888-4567, Ext. 36005 or maureen.nummelin@uwaterloo.ca.<br><br> \
                </div> \
                ',
            buttons: {
                consent: {
                    label: 'I understand and accept the participant consent agreement',
                    className: 'btn-success',
                }
            }
        }).css({
            zIndex: 99999,
        }).appendTo(that.element);
    },

    _isHITModeEnabled: function() {
        var that = this;
        return (
            that._isVisibleRegionDefined()
            && that.options.visibleRegion.hitModeEnabled
        );
    },

    _isVisibleRegionDefined: function() {
        var that = this;
        return (
            that.options.visibleRegion.start !== undefined
            && that.options.visibleRegion.end !== undefined
        );
    },

    _setupHITMode: function() {
        var that = this;
        if (!that._isHITModeEnabled()) return;

        that.options.showBackToLastActiveWindowButton = false;
        that.options.showFastBackwardButton = false;
        that.options.showBackwardButton = false;
        that.options.showForwardButton = false;
        that.options.showFastForwardButton = false;
        that.options.showShortcuts = false;
        that.options.showAnnotationTime = false;

        $(that.element).find('.graph_footer .middle').append(' \
            <button type="button" class="btn btn-default no-features submit-annotations" aria-label="No features">I do not see any features</button> \
            <button type="button" class="btn btn-default submit-features submit-annotations" aria-label="Submit features" disabled>Submit features</button> \
            <button type="button" class="btn btn-default next-window" aria-label="Next window" disabled><i class="fa fa-step-forward"></i></button> \
        ');

        $(that.element).find('.submit-annotations').click(function () {
            that._blockGraphInteraction();
            if (that._isCurrentWindowTrainingWindow()) {
                that._revealCorrectAnnotations();
            }
            // log this window as complete and
            // set bookmark to next window so that
            // on page load, the user cannot change
            // any annotations made before submitting
            that._saveUserEventWindowComplete();
            that._savePreferences({ current_page_start: that.vars.currentWindowStart + that.options.windowSizeInSeconds })
            $(that.element).find('.submit-annotations').prop('disabled', true);
            $(that.element).find('.next-window').prop('disabled', false);
        });

        $(that.element).find('.next-window').click(function () {
            $(that.element).find('.no-features').prop('disabled', false);
            $(that.element).find('.submit-features').prop('disabled', true);
            $(that.element).find('.next-window').prop('disabled', true);
            if (that._isCurrentWindowLastTrainingWindow() && !that._isTrainingOnly()) {
                bootbox.alert({
                    closeButton: false,
                    title: 'End of the Training Phase',
                    message: 'You just completed the last window of the training phase. That means that, from now on, you will not be able to see the correct answer after submitting yours any longer. The examples panel below, however, will stay visible throughout the entire task. Hopefully, the training phase helped you learn more about the signal pattern we are looking for!',
                    callback: function() {
                        that._shiftChart(1);
                        that._unblockGraphInteraction();
                    }
                }).appendTo(that.element);
            }
            else {
                that._shiftChart(1);
                that._unblockGraphInteraction();
            }
        });

        that._fetchOptionsFromURLParameter();
    },

    _getCurrentWindowIndexInVisibleRegion: function() {
        var that = this;
        if (!that._isHITModeEnabled()) return;
        var windowIndex = Math.floor((that.vars.currentWindowStart - that.options.visibleRegion.start) / that.options.windowSizeInSeconds);
        return windowIndex;
    },

    _getNumberOfTrainingWindows: function() {
        var that = this;
        var training = that.options.visibleRegion.training;
        if (!that._isTrainingEnabled()) {
            return 0;
        }
        if (training.numberOfInitialWindowsUsedForTraining > 0) {
            return training.numberOfInitialWindowsUsedForTraining;
        }
        return that._getSpecifiedTrainingWindows().length;
    },

    _areTrainingWindowsSpecified: function() {
        var that = this;
        that._getSpecifiedTrainingWindows();
        return (
            that.vars.specifiedTrainingWindows !== undefined
            && that.vars.specifiedTrainingWindows.length > 0
        );
    },

    _getCurrentTrainingWindow: function() {
        var that = this;
        if (!that._areTrainingWindowsSpecified()) {
            return;
        }
        var trainingWindows = that._getSpecifiedTrainingWindows();
        var currentIndex = that.vars.currentTrainingWindowIndex;
        if (currentIndex > trainingWindows.length - 1) {
            return;
        }
        var trainingWindow = trainingWindows[currentIndex];
        return trainingWindow;
    },

    _isCurrentWindowSpecifiedTrainingWindow: function() {
        var that = this;
        if (!that._areTrainingWindowsSpecified()) return false;
        return that.vars.currentTrainingWindowIndex < that._getNumberOfTrainingWindows();
    },

    _getSpecifiedTrainingWindows: function() {
        var that = this;
        if (that.vars.specifiedTrainingWindows) {
            return that.vars.specifiedTrainingWindows;
        }
        var training = that.options.visibleRegion.training;
        if (!that._isTrainingEnabled() || training.numberOfInitialWindowsUsedForTraining > 0) {
            return [];
        }
        if (training.windows && training.windows.length > 0) {
            that.vars.specifiedTrainingWindows = training.windows;
            return that.vars.specifiedTrainingWindows;
        }
        var windows = [];
        var featureOrder = that.options.features.order;
        var featureOptions = that.options.features.options;
        for (f = 0; f < featureOrder.length; ++f) {
            var feature = featureOrder[f];
            var featureTrainingWindows = featureOptions[feature].training.windows;
            if (featureTrainingWindows && featureTrainingWindows.length > 0) {
                windows.push.apply(windows, featureTrainingWindows);
            }
        }
        that.vars.specifiedTrainingWindows = windows;
        return that.vars.specifiedTrainingWindows;
    },

    _isTrainingEnabled: function() {
        var that = this;
        return (that._isHITModeEnabled() && that.options.visibleRegion.training.enabled);
    },

    _isTrainingOnly: function() {
        var that = this;
        return that.options.visibleRegion.training.isTrainingOnly;
    },

    _isCurrentWindowTrainingWindow: function() {
        var that = this;
        if (!that._isHITModeEnabled()) return false;
        return that._getWindowIndexForTraining() <= that._getNumberOfTrainingWindows() - 1;
    },

    _isCurrentWindowFirstTrainingWindow: function() {
        var that = this;
        if (!that._isHITModeEnabled()) return false;
        return (
            that._getNumberOfTrainingWindows() > 0
            && that._getWindowIndexForTraining() === 0
        );
    },

    _isCurrentWindowLastTrainingWindow: function() {
        var that = this;
        if (!that._isHITModeEnabled()) return false;
        return that._getWindowIndexForTraining() == that._getNumberOfTrainingWindows() - 1;
    },

    _getWindowIndexForTraining: function() {
        var that = this;
        if (!that._isHITModeEnabled()) return false;
        if (that._areTrainingWindowsSpecified()) {
            return that.vars.currentTrainingWindowIndex;
        }
        else {
            return that._getCurrentWindowIndexInVisibleRegion();
        }
    },

    _revealCorrectAnnotations: function() {
        var that = this;
        that._getAnnotations(that.vars.currentWindowRecording, that.vars.currentWindowStart, that.vars.currentWindowStart + that.options.windowSizeInSeconds, true);
    },

    _setupExamplesMode: function() {
        var that = this;
        var examples = that.options.features.examples;

        if (!examples || examples.length == 0) {
            console.log('There are no examples for this viewer.');
            return;
        }
        examples.sort(function(a, b) {
            return a.start - b.start;
        });
        var firstExample = examples[0];
        var recordingName = firstExample.recording;
        var channelsDisplayed = [firstExample.channels_displayed[firstExample.channels]];
        that.options.recordingName = recordingName;
        that.options.channelsDisplayed = channelsDisplayed;
        that.options.graph.height = 200;
        that.options.features.showUserAnnotations = false;
        that.options.features.order = [ firstExample.type ];
        that.options.isReadOnly = true;
        that.options.channelGainAdjustmentEnabled = false;
        that.options.keyboardInputEnabled = false;
        that.options.showArtifactButtons = false;
        that.options.showNavigationButtons = false;
        that.options.showReferenceLines = false;
        that.options.features.cheatSheetsEnabled = true;
        that.options.features.openCheatSheetOnPageLoad = true;
        that.options.showTimeLabels = false;
        that._fetchOptionsFromURLParameter();

        $(that.element).find('.button_container').prepend('<span class="examples-title pull-left">Examples for:</span>');
        $(that.element).find('.button_container').append(' \
            <div class="examples_panel btn-group"> \
                <button type="button" class="btn btn-default open-cheat-sheet" aria-label="Open Cheat Sheet"> \
                    <span class="fa fa-info-circle" aria-hidden="true"></span> Open Cheat Sheet \
                </button> \
                <button type="button" class="btn btn-default previous-example" aria-label="Previous Example"> \
                    <span class="fa fa-chevron-left" aria-hidden="true"></span> \
                </button> \
                <button type="button" class="btn btn-default next-example" aria-label="Next Example"> \
                    <span class="fa fa-chevron-right" aria-hidden="true"></span> \
                </button> \
            </div> \
        ');

        if (!that.options.features.cheatSheetsEnabled) {
            $(that.element).find('.open-cheat-sheet').remove();
        }
        else {
            $(that.element).find('.open-cheat-sheet').click(function() {
                that._saveUserEvent('open_cheat_sheet', {
                    feature: firstExample.type,
                });
                openCheatSheet();
            });
            if (that.options.features.openCheatSheetOnPageLoad) {
                $(that.element).hover(function() {
                    if (that.vars.cheatSheetOpenedBefore) return;
                    openCheatSheet();
                });
            }
            function openCheatSheet() {
                that.vars.cheatSheetOpenedBefore = true;
                bootbox.dialog({
                    title: '<b>PLEASE READ CAREFULLY</b>',
                    message: '<img style="width: 100%; height: auto;" src="https://s3.amazonaws.com/curio-media/crowdeeg/feature-cheat-sheets/' + firstExample.type + '.png">',
                    buttons: {
                        close: {
                            label: 'Close',
                        }
                    },
                    size: 'large',
                }).appendTo(that.element);
            }
        }

        that.vars.currentExampleIndex = 0;
        that.options.startTime = that._getWindowStartForTime(examples[that.vars.currentExampleIndex].start);

        $(that.element).find('.next-example').click(function() {
            that._saveUserEvent('view_example_window', {
                feature: firstExample.type,
                direction: 'next',
            });
            that._clearScrollThroughExamplesInterval();
            that._showNextExample(1);
        });
        $(that.element).find('.previous-example').click(function() {
            that._saveUserEvent('view_example_window', {
                feature: firstExample.type,
                direction: 'previous',
            });
            that._clearScrollThroughExamplesInterval();
            that._showNextExample(-1);
        });
        if (that.options.features.scrollThroughExamplesAutomatically) {
            $(that.element).hover(function() {
                if (that.vars.scrollThroughExamplesIntervalId !== undefined) return;
                that.vars.scrollThroughExamplesIntervalId = window.setInterval(function() {
                    that._showNextExample(1);
                }, that.options.features.scrollThroughExamplesSpeedInSeconds * 1000);
            });
        }

        var wrapper = $('<div>').addClass('well');
        $(that.element).children().wrap(wrapper);
        that.options.graph.backgroundColor = 'none';

        that._setup();
    },

    _clearScrollThroughExamplesInterval: function() {
        var that = this;
        if (
            that.vars.scrollThroughExamplesIntervalId !== undefined
            && that.vars.scrollThroughExamplesIntervalId !== false
        ) {
            window.clearInterval(that.vars.scrollThroughExamplesIntervalId);
            that.vars.scrollThroughExamplesIntervalId = false;
        }
    },

    _showNextExample: function(stepLength) {
        var that = this;
        do {
            that.vars.currentExampleIndex += stepLength;
            that.vars.currentExampleIndex %= that.options.features.examples.length;
            while (that.vars.currentExampleIndex < 0) {
                that.vars.currentExampleIndex += that.options.features.examples.length;
            }
            var example = that.options.features.examples[that.vars.currentExampleIndex];
            var nextWindowStart = that._getWindowStartForTime(example.start);
        } while (nextWindowStart == that.vars.currentWindowStart);
        that._switchToWindow(that.options.recordingName, nextWindowStart, that.options.windowSizeInSeconds, that.options.graph.channelSpacing);
    },

    _getWindowStartForTime: function(time) {
        var that = this;
        var windowStart = Math.floor(time / that.options.windowSizeInSeconds);
        windowStart *= that.options.windowSizeInSeconds;
        return windowStart;
    },

    _setup: function() {
        var that = this;
        that._adaptContent();
        that._setupTimer();
        that._setupFeaturePanel();
        that._setupNavigationPanel();
        that._setupArtifactPanel();
        that._setupSleepStagePanel();
        that._setupTrainingPhase();
        that._getUserStatus();
    },

    _getUrlParameter: function(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    },

    _setupExperiment: function() {
        var that = this;
        if (!that.options.experiment.running) return;
        var temporalContextHint;
        switch (that.options.experiment.current_condition.temporal_context) {
            case 'continuous':
                temporalContextHint = 'Continuous sequence of windows';
                break;
            case 'shuffled':
                temporalContextHint = 'Shuffled sequence of windows';
                break;
        }
        var hint = $('<h4>').html(temporalContextHint);
        $(that.element).find('.experiment_container .hints_container').append(hint);
    },

    _updateNavigationStatusForExperiment: function() {
        var that = this;
        if (!that.options.experiment.running) return;
        var currentWindowIndex = that.options.experiment.current_condition.current_window_index;
        var conditionWindows = that.options.experiment.current_condition.windows;
        var lastWindowIndex = conditionWindows.length - 1;
        var windowsRemaining = lastWindowIndex - currentWindowIndex;
        that._setForwardEnabledStatus(windowsRemaining >= 1);
        if (windowsRemaining < 1) {
            that._lastWindowReached();
        }
        that._setFastForwardEnabledStatus(windowsRemaining >= that.options.windowJumpSizeFastForwardBackward);
        that._setBackwardEnabledStatus(currentWindowIndex >= 1);
        that._setFastBackwardEnabledStatus(currentWindowIndex >= that.options.windowJumpSizeFastForwardBackward);
        if (that.options.experiment.current_condition.temporal_context == 'shuffled') {
            that._setFastForwardEnabledStatus(false);
            that._setFastBackwardEnabledStatus(false);
            $(that.element).find('.fastForward').hide();
            $(that.element).find('.fastBackward').hide();
        }
    },

    _setupTimer: function() {
        var that = this;
        that.vars.totalAnnotationTimeSeconds = 0
        var preferences = {};
        if (that.vars.taskDataConfiguration) {
            preferences = that.vars.taskDataConfiguration.configuration;
        }
        if (preferences.total_annotation_time_seconds) {
            that.vars.totalAnnotationTimeSeconds = parseFloat(preferences.total_annotation_time_seconds);
        }
        that.vars.lastAnnotationTime = that._getCurrentServerTimeMilliSeconds();
        if (preferences.last_annotation_time) {
            that.vars.lastAnnotationTime = parseInt(preferences.last_annotation_time);
        }
        var timerContainer = $(that.element).find('.annotation-time-container');
        var timeContainer = $('<span>').addClass('time form-control');
        timerContainer.append(timeContainer);
        that.vars.annotationTimeContainer = timeContainer;
        that._setTotalAnnotationTimeSeconds(that.vars.totalAnnotationTimeSeconds);
    },

    _setTotalAnnotationTimeSeconds: function(timeSeconds) {
        var that = this;
        that.vars.totalAnnotationTimeSeconds = timeSeconds;
        if (!that.vars.annotationTimeContainer) {
            return;
        }
        that.vars.annotationTimeContainer
                    .timer('remove')
                    .timer({
                        seconds: that.vars.totalAnnotationTimeSeconds,
                        format: '%H:%M:%S'
                    })
                    .timer('pause');
    },

    _updateLastAnnotationTime: function() {
        var that = this;
        var currentTime = that._getCurrentServerTimeMilliSeconds();
        var timeDifferenceSeconds = (currentTime - that.vars.lastAnnotationTime) / 1000;
        that.vars.lastAnnotationTime = currentTime;
        var preferencesUpdates = {
            last_annotation_time: that.vars.lastAnnotationTime
        }
        if (timeDifferenceSeconds <= that.options.idleTimeThresholdSeconds) {
            that.vars.totalAnnotationTimeSeconds += timeDifferenceSeconds;
            that._setTotalAnnotationTimeSeconds(that.vars.totalAnnotationTimeSeconds);
            preferencesUpdates.total_annotation_time_seconds = that.vars.totalAnnotationTimeSeconds;
        }
        that.vars.lastActiveWindowStart = that.vars.currentWindowStart;
        that._savePreferences(preferencesUpdates);
    },

    _getCurrentServerTimeMilliSeconds: function() {
        var today = new Date();
        var serverOffset = -5;
        var date = new Date().getTime() + serverOffset * 3600 * 1000;
        return date;
    },

    _setupFeaturePanel: function() {
        var that = this;
        $('[data-toggle="popover"]').popover({ trigger: 'hover' });

        var firstFeature = that.options.features.order[0];
        that.vars.activeFeatureType = firstFeature;

        for (var i = 0; i < that.options.features.order.length; i++) {
            var feature_key = that.options.features.order[i];
            var feature_name = that.options.features.options[feature_key].name;
            var featureButton = $('<button type="button" class="btn btn-default feature ' + feature_key + '">' + feature_name + '</button>').data('annotation-type', feature_key);
            $(that.element).find('.feature_panel').append(featureButton);
            $('<style type="text/css">.feature.' + feature_key + ' { background-color: ' + that._getFeatureColor(feature_key, false, 0.05) + '} .feature.' + feature_key + '.active { background-color: ' + that._getFeatureColor(feature_key) + '}</style>').appendTo('head');
        }
        $(that.element).find('.feature').click(function(event) {
            that._selectFeatureClass($(this));
        });
        $(that.element).find('.feature.' + firstFeature)
            .addClass('active')
            .siblings()
            .removeClass('active');
    },

    _getUserStatus: function() {
        var that = this;
        if (that.options.experiment.running) {
            that._updateNavigationStatusForExperiment();
            var currentWindowIndex = that.options.experiment.current_condition.current_window_index;
            var conditionWindows = that.options.experiment.current_condition.windows;
            that.options.recordingName = that.options.experiment.current_condition.recording_name;
            var initialWindowStart = conditionWindows[currentWindowIndex];
            that.vars.lastActiveWindowStart = initialWindowStart;
            that._switchToWindow(that.options.recordingName, initialWindowStart, that.options.windowSizeInSeconds, that.options.graph.channelSpacing);
        }
        else if (that._areTrainingWindowsSpecified()) {
            var trainingWindow = that._getCurrentTrainingWindow();
            that._switchToWindow(trainingWindow.recordingName, trainingWindow.timeStart, trainingWindow.windowSizeInSeconds, that.options.graph.channelSpacing);
        }
        else if (that.options.recordingName) {
            that.vars.lastActiveWindowStart = that.options.startTime;
            that._switchToWindow(that.options.recordingName, that.vars.lastActiveWindowStart, that.options.windowSizeInSeconds, that.options.graph.channelSpacing);
        }
        else {
            alert('Could not retrieve user data.');
        }
    },

    _setupArtifactPanel: function() {
        var activeClass = 'teal darken-4';
        var that = this;
        $(that.element).find('.artifact_panel button.artifact').click(function() {
            var button = $(this);
            var type = button.data('annotation-type');
            that._saveArtifactAnnotation(type);
            button
                .addClass(activeClass)
                .siblings()
                .removeClass(activeClass);
        });
    },

    _setupSleepStagePanel: function() {
        var activeClass = 'teal';
        var inactiveClass = 'grey lighten-1';
        var that = this;
        $(that.element).find('.sleep_stage_panel button.sleep_stage').click(function() {
            var button = $(this);
            var type = button.data('annotation-type');
            that._saveSleepStageAnnotation(type);
            button
                .addClass(activeClass)
                .removeClass(inactiveClass)
                .siblings()
                .removeClass(activeClass)
                .addClass(inactiveClass);
        });
    },

    _setupNavigationPanel: function() {
        var that = this;
        that._setForwardEnabledStatus(false);
        that._setFastForwardEnabledStatus(false);
        that._setBackwardEnabledStatus(false);
        that._setFastBackwardEnabledStatus(false);

        if (that.options.showBackToLastActiveWindowButton) {
            $(that.element).find('.backToLastActiveWindow').click(function() {
                that._switchBackToLastActiveWindow();
            });
        }
        if (that.options.showForwardButton) {
            $(that.element).find('.forward').click(function() {
                that._shiftChart(1);
            });
        }
        if (that.options.showBackwardButton) {
            $(that.element).find('.backward').click(function() {
                that._shiftChart(-1);
            });
        }
        if (that.options.showFastForwardButton) {
            $(that.element).find('.fastForward').click(function() {
                that._shiftChart(that.options.windowJumpSizeFastForwardBackward);
            });
        }
        if (that.options.showFastBackwardButton) {
            $(that.element).find('.fastBackward').click(function() {
                that._shiftChart(-that.options.windowJumpSizeFastForwardBackward);
            });
        }
        $(that.element).find('.gainUp').click(function() {
            that._updateChannelGain('step_increase');
        });
        $(that.element).find('.gainDown').click(function() {
            that._updateChannelGain('step_decrease');
        });
        $(that.element).find('.gainReset').click(function() {
            that._updateChannelGain('reset');
        });
        if (that.options.keyboardInputEnabled) {
            // setup arrow key navigation
            $(document).keydown(function(e) {
                var keyCode = e.which;
                var metaKeyPressed = e.metaKey;
                if (keyCode == 82 && metaKeyPressed) {
                    // Suppress any action on CTRL+R / CMD+R page reload
                    return;
                }
                if(keyCode == 66 && that.options.showBackToLastActiveWindowButton) {
                    // back to last active window
                    that._switchBackToLastActiveWindow();
                    return;
                } else if((keyCode == 37 || keyCode == 65 || keyCode == 34) && that.options.showBackwardButton) { // left arrow, a, page down
                    // backward
                    e.preventDefault();
                    that._shiftChart(-1);
                    return;
                } else if ((keyCode == 39 || keyCode == 68 || keyCode == 33) && that.options.showForwardButton) { // right arrow, d, page up
                    // forward
                    e.preventDefault();
                    that._shiftChart(1);
                    return;
                } else if (keyCode == 38 && that.options.showFastForwardButton) { // up arrow
                    // fast foward
                    e.preventDefault();
                    that._shiftChart(that.options.windowJumpSizeFastForwardBackward);
                    return;
                } else if (keyCode == 40 && that.options.showFastBackwardButton) { // down arrow
                    // fast backward
                    e.preventDefault();
                    that._shiftChart(-that.options.windowJumpSizeFastForwardBackward);
                    return;
                } else if (that.options.showSleepStageButtons) {
                    var sleepStageShortCutPressed = false;
                    $(that.element).find('.sleep_stage_panel .shortcut-key').each(function() {
                        var character = $(this).text();
                        var characterKeyCodeLowerCase = character.toLowerCase().charCodeAt(0);
                        var characterKeyCodeAlternative = character.toUpperCase().charCodeAt(0);
                        if (characterKeyCodeLowerCase >= 49 && characterKeyCodeLowerCase <= 57) {
                            characterKeyCodeAlternative = characterKeyCodeLowerCase + 48;
                        }
                        if (keyCode == characterKeyCodeLowerCase || keyCode == characterKeyCodeAlternative) {
                            sleepStageShortCutPressed = true;
                            var button = $(this).parents('.sleep_stage').first();
                            button.click();
                        }
                    });
                    if (sleepStageShortCutPressed) {
                        return;
                    }
                // make it possible to choose feature classificaiton using number keys
                } else if (keyCode >= 49 && keyCode <= 57) {
                    e.preventDefault();
                    var featureClassButton = $(that.element).find('.feature').eq(keyCode - 49)
                    if (featureClassButton) {
                        that._selectFeatureClass(featureClassButton);
                    }
                    return;
                // separate case for the numpad keys, because javascript is a stupid language
                } else if (keyCode >= 97 && keyCode <= 105) {
                    e.preventDefault();
                    var featureClassButton = $(that.element).find('.feature').eq(keyCode - 97)
                    if (featureClassButton) {
                        that._selectFeatureClass(featureClassButton);
                    }
                    return;
                }
            });
        }
    },

    _setupTrainingPhase: function() {
        var that = this;
        if (!that._areTrainingWindowsSpecified()) return;
        that._setForwardEnabledStatus(true);
        that._getSpecifiedTrainingWindows();
    },

    _setForwardEnabledStatus: function(status) {
        var that = this;
        var status = !!status;

        that.vars.forwardEnabled = status;
        $(that.element).find('.forward').prop('disabled', !status);
    },

    _setFastForwardEnabledStatus: function(status) {
        var that = this;
        var status = !!status;

        that.vars.fastForwardEnabled = status;
        $(that.element).find('.fastForward').prop('disabled', !status);
    },

    _setBackwardEnabledStatus: function(status) {
        var that = this;
        var status = !!status;

        that.vars.backwardEnabled = status;
        $(that.element).find('.backward').prop('disabled', !status);
    },

    _setFastBackwardEnabledStatus: function(status) {
        var that = this;
        var status = !!status;

        that.vars.fastBackwardEnabled = status;
        $(that.element).find('.fastBackward').prop('disabled', !status);
    },

    _selectFeatureClass: function(featureClassButton) {
        /* called with the user clicks on one of the feature toggle buttons, or presses one of the
        relevant number keys, this method updates the state of the toggle buttons, and sets the
        feature type */
        var that = this;
        featureClassButton.addClass('active');
        featureClassButton.siblings().removeClass('active');
        that.vars.activeFeatureType = featureClassButton.data('annotation-type');
    },

    _shiftChart: function(windows) {
        var that = this;
        if (!that.vars.forwardEnabled && windows >= 1) return;
        if (!that.vars.fastForwardEnabled && windows >= that.options.windowJumpSizeFastForwardBackward) return;
        if (!that.vars.backwardEnabled && windows <= -1) return;
        if (!that.vars.fastBackwardEnabled && windows <= -that.options.windowJumpSizeFastForwardBackward) return;
        var nextRecordingName = that.options.recordingName;
        var nextWindowSizeInSeconds = that.options.windowSizeInSeconds;
        var nextWindowStart = that.options.currentWindowStart;
        if (that.options.experiment.running) {
            var currentWindowIndex = that.options.experiment.current_condition.current_window_index;
            currentWindowIndex += windows;
            that.options.experiment.current_condition.current_window_index = currentWindowIndex;
            nextWindowStart = that.options.experiment.current_condition.windows[currentWindowIndex];
            that._updateNavigationStatusForExperiment();
        }
        else if (
            that._areTrainingWindowsSpecified()
            && that._isCurrentWindowTrainingWindow()
        ) {
            that.vars.currentTrainingWindowIndex += windows;
            if (that._isCurrentWindowTrainingWindow()) {
                var nextTrainingWindow = that._getCurrentTrainingWindow();
                nextRecordingName = nextTrainingWindow.recordingName;
                nextWindowStart = nextTrainingWindow.timeStart;
                nextWindowSizeInSeconds = nextTrainingWindow.windowSizeInSeconds;
            }
            else {
                nextWindowStart = that.options.startTime;
                nextWindowSizeInSeconds = that.options.windowSizeInSeconds;
            }
            that._flushAnnotations();
        }
        else {
            if (that._areTrainingWindowsSpecified()) {
                that.vars.currentTrainingWindowIndex += windows;
            }
            nextWindowStart = Math.max(0, that.vars.currentWindowStart + that.options.windowSizeInSeconds * windows);
        }
        that._switchToWindow(nextRecordingName, nextWindowStart, nextWindowSizeInSeconds, that.options.graph.channelSpacing);
    },

    _switchToWindow: function (recording_name, start_time, window_length, channel_spacing) {
        var that = this;
        if (!that._isCurrentWindowSpecifiedTrainingWindow()) {
            if (that.options.visibleRegion.start !== undefined) {
                start_time = Math.max(that.options.visibleRegion.start, start_time);
                start_time = window_length * Math.ceil(start_time / window_length);
                that._setBackwardEnabledStatus(start_time - window_length >= that.options.visibleRegion.start);
                that._setFastBackwardEnabledStatus(start_time - window_length * that.options.windowJumpSizeFastForwardBackward >= that.options.visibleRegion.start);
            }

            if (that.options.visibleRegion.end !== undefined) {
                start_time = Math.min(that.options.visibleRegion.end - window_length, start_time);
                start_time = window_length * Math.floor(start_time / window_length);
                var forwardEnabled = start_time + window_length <= that.options.visibleRegion.end - window_length;
                that._setForwardEnabledStatus(forwardEnabled);
                if (!forwardEnabled) {
                    that._lastWindowReached();
                }
                that._setFastForwardEnabledStatus(start_time + window_length * that.options.windowJumpSizeFastForwardBackward < that.options.visibleRegion.end - window_length);
            }
        }

        if (that.vars.currentWindowStart != start_time) {
            that._setNumberOfAnnotationsInCurrentWindow(0);
            $(that.element).find('.correct-answer-explanation').children().remove();
        }

        that.vars.currentWindowStart = start_time;
        that.vars.currentWindowRecording = recording_name;

        if (that._isVisibleRegionDefined()) {
            var progress = that._getProgressInPercent();
            $(that.element).find('.progress-bar').css('width', progress + '%');
        }

        if (that._isCurrentWindowLastTrainingWindow() && that._isTrainingOnly()) {
            that._lastWindowReached();
        }

        if (that._isCurrentWindowFirstTrainingWindow() && !that._isTrainingOnly()) {
            bootbox.alert({
                closeButton: false,
                title: 'Beginning of the Training Phase',
                message: 'Welcome to our CrowdEEG experiment for scientific crowdsourcing!<br><br>This is the beginning of the training phase, meaning that, for the next ' + that._getNumberOfTrainingWindows() + ' window(s), we will show you the correct answer after you have submitted yours. The examples panel below will be visible throughout the entire task. We hope the training phase will help you learn more about the signal pattern we are looking for.',
                callback: function() {
                    that._saveUserEventWindowBegin();
                },
            }).css({zIndex: 1}).appendTo(that.element);
        }
        else {
            that._saveUserEventWindowBegin();
        }

        that._savePreferences({ current_page_start: start_time })

        var windowsToRequest = [
            start_time
        ];
        if (
            !that._isCurrentWindowSpecifiedTrainingWindow()
            && !that.options.experiment.running
        ) {
            for (var i = 1; i <= that.options.numberOfForwardWindowsToPrefetch; ++i) {
                windowsToRequest.push(start_time + i * window_length);
            }
            for (var i = 1; i <= that.options.numberOfFastForwardWindowsToPrefetch; ++i) {
                windowsToRequest.push(start_time + i * that.options.windowJumpSizeFastForwardBackward * window_length);
            }
            for (var i = 1; i <= that.options.numberOfBackwardWindowsToPrefetch; ++i) {
                windowsToRequest.push(start_time - i * window_length);
            }
            for (var i = 1; i <= that.options.numberOfFastBackwardWindowsToPrefetch; ++i) {
                windowsToRequest.push(start_time - i * that.options.windowJumpSizeFastForwardBackward * window_length);
            }
        }

        for (var i = 0; i < windowsToRequest.length; ++i) {
            (function (index) {
                var windowStartTime = windowsToRequest[i];
                var options = {
                    recording_name: recording_name,
                    channels_displayed: that.options.channelsDisplayed,
                    start_time: windowStartTime,
                    window_length: window_length,
                    channel_spacing: channel_spacing,
                    channel_gains: that._getCurrentChannelGains()
                };
                that._requestData(options, function(data, error) {
                    var windowAvailable = !error;
                    if (windowAvailable && windowStartTime == that.vars.currentWindowStart) {
                        that.vars.currentWindowData = data;
                        if (that.vars.initialChannelGains.length == 0) {
                            for (var i = 0; i < data.channels.length; ++i) {
                                that.vars.initialChannelGains.push(data.channels[i].gain);
                            }
                        }
                        if (that.vars.currentChannelGainAdjustments.length == 0) {
                            that.vars.currentChannelGainAdjustments = [];
                            for (var i = 0; i < data.channels.length; ++i) {
                                that.vars.currentChannelGainAdjustments.push(1);
                            }
                        }
                        that._populateGraph(that.vars.currentWindowData);
                    }
                    if (!that.options.experiment.running) {
                        switch (windowStartTime) {
                            case that.vars.currentWindowStart + window_length:
                                if (that.options.visibleRegion.end === undefined) {
                                    that._setForwardEnabledStatus(windowAvailable);
                                    if (!windowAvailable) {
                                        that._lastWindowReached();
                                    }
                                }
                                break;
                            case that.vars.currentWindowStart + window_length * that.options.windowJumpSizeFastForwardBackward:
                                if (that.options.visibleRegion.end === undefined) {
                                    that._setFastForwardEnabledStatus(windowAvailable);
                                }
                                break;
                            case that.vars.currentWindowStart - window_length:
                                if (that.options.visibleRegion.start === undefined) {
                                    that._setBackwardEnabledStatus(windowAvailable);
                                }
                                break;
                            case that.vars.currentWindowStart - window_length * that.options.windowJumpSizeFastForwardBackward:
                                if (that.options.visibleRegion.start === undefined) {
                                    that._setFastBackwardEnabledStatus(windowAvailable);
                                }
                                break;
                        }
                    }
                });
            })(i);
        }
    },

    _getProgressInPercent: function() {
        var that = this;
        if (!that._isVisibleRegionDefined()) return;
        var windowSize = that.options.windowSizeInSeconds;
        var start = windowSize * Math.ceil(that.options.visibleRegion.start / windowSize);
        var end = windowSize * Math.floor((that.options.visibleRegion.end - windowSize) / windowSize);
        if (!that._areTrainingWindowsSpecified()) {
            var progress = (that.vars.currentWindowStart - start + windowSize) / (end - start + 2 * windowSize);
        }
        else {
            var numberOfTrainingWindows = that._getNumberOfTrainingWindows();
            var numberOfWindowsInVisibleRegion = Math.floor((end - start) / windowSize);
            var numberOfWindowsTotal = numberOfWindowsInVisibleRegion + numberOfTrainingWindows;
            var currentWindowIndex = that.vars.currentTrainingWindowIndex;
            var progress = (currentWindowIndex + 1) / (numberOfWindowsTotal + 2);
        }
        var progressInPercent = Math.ceil(progress * 100);
        return progressInPercent;
    },

    _switchBackToLastActiveWindow: function() {
        var that = this;
        if (!that.vars.lastActiveWindowStart) {
            that.vars.lastActiveWindowStart = 0;
        }
        that._switchToWindow(that.options.recordingName, that.vars.lastActiveWindowStart, that.options.windowSizeInSeconds, that.options.graph.channelSpacing);
    },

    _getCurrentChannelGains: function() {
        var that = this;
        var currentChannelGains = [];
        for (var i = 0; i < that.vars.initialChannelGains.length; ++i) {
            var currentChannelGain = that.vars.initialChannelGains[i];
            if (that.vars.currentChannelGainAdjustments[i] !== undefined) {
                currentChannelGain *= that.vars.currentChannelGainAdjustments[i];
            }
            currentChannelGains.push(currentChannelGain);
        }
        return currentChannelGains;
    },

    _getGainForChannelIndex: function(index) {
        var that = this;
        var initialGain = that.vars.initialChannelGains[index];
        var currentGainAdjustment = that.vars.currentChannelGainAdjustments[index];
        var currentGain = initialGain * currentGainAdjustment;
        return currentGain;
    },

    _getOffsetForChannelIndex: function(index) {
        var that = this;
        var offset = (that.vars.currentWindowData.channels.length - 1 - index) * that.options.graph.channelSpacing;
        return offset;
    },

    _requestData: function(options, callback) {
        var that = this;
        var identifierKey = that._getIdentifierKeyForDataRequest(options);
        var noDataError = 'No data available for window with options ' + JSON.stringify(options);

        if (options.start_time < 0) {
            that.vars.windowsCache[identifierKey] = false;
        }

        if (that.vars.windowsCache[identifierKey] === false) {
            if (callback) {
                callback(null, noDataError);
            }
            return;
        }

        if (that.vars.windowsCache[identifierKey]) {
            if (that.vars.windowsCache[identifierKey].data && callback) {
                callback(that.vars.windowsCache[identifierKey].data);
            }
            return;
        }

        var url = '/data/edf/get/';
        if (that.options.experiment.running) {
            url += '?experiment_id=' + that.options.experiment.id;
        }

        var request = $.post(url, { options: JSON.stringify(options), csrfmiddlewaretoken: window.csrftoken }, function(data) {
            if (!that._isDataValid(data)) {
                that.vars.windowsCache[identifierKey] = false;
                if (callback) {
                    callback(null, noDataError);
                }
            }
            else {
                that.vars.windowsCache[identifierKey].data = that._transformData(data);
                if (callback) {
                    callback(that.vars.windowsCache[identifierKey].data);
                }
            }
        });

        that.vars.windowsCache[identifierKey] = {
            request: request
        };
    },

    _transformData: function(input) {
        var channels = [];
        for (var i = 0; i < input.channel_order.length; ++i) {
            var name = input.channel_order[i];
            var channel = {
                name: name,
                gain: input.channel_gains[i],
                values: input.channel_values[name]
            }
            channels.push(channel);
        }
        var output = {
            channels: channels,
            sampling_rate: input.sampling_rate
        }
        return output;
    },

    _getIdentifierObjectForDataRequest: function(options) {
        var options = options || {};
        var relevantOptions = [
            'recording_name',
            'start_time',
            'window_length',
            'channel_spacing',
            'channel_gains',
        ];
        var identifierObject = {};
        for (var i = 0; i < relevantOptions.length; ++i) {
            identifierObject[relevantOptions[i]] = options[relevantOptions[i]];
        }
        return identifierObject;
    },

    _getIdentifierKeyForDataRequest: function(options) {
        var that = this;
        var identifierKey = JSON.stringify(that._getIdentifierObjectForDataRequest(options));
        return identifierKey;
    },

    _isDataValid: function(data) {
        if (!data) return false;
        if (!data.sampling_rate) return false;
        if (!data.channel_order) return false;
        if (!data.channel_gains) return false;
        if (!data.channel_values) return false;
        return true;
    },

    _populateGraph: function(data) {
        /* plot all of the points to the chart */
        var that = this;
        // if the chart object does not yet exist, because the user is loading the page for the first time
        // or refreshing the page, then it's necessary to initialize the plot area
        if (!that.vars.chart) {
            // if this is the first pageload, then we'll need to load the entire
            that._initGraph(data);
        // if the plot area has already been initialized, simply update the data displayed using AJAX calls
        } else {
            for(var ii=0; ii<data.channels.length; ii++) {
                var channel = data.channels[ii];

                that.vars.chart.series[ii].update({
                    pointStart: that.vars.currentWindowStart,
                    pointInterval: 1 / data.sampling_rate,
                    name: channel.name,
                    type: 'line',
                    data: channel.values
                }, false); // false to supress redrawing after every series is added
            }
            that.vars.chart.xAxis[0].setExtremes(that.vars.currentWindowStart, that.vars.currentWindowStart + that.options.windowSizeInSeconds, false, false);
            that.vars.chart.redraw(); // efficiently redraw the entire window in one go
        }

        var chart = that.vars.chart;
        // use the chart start/end so that data and annotations can never
        // get out of synch
        that._getAnnotations(that.vars.currentWindowRecording, that.vars.currentWindowStart, that.vars.currentWindowStart + that.options.windowSizeInSeconds);
    },

    _initGraph: function(data) {
        /* This method is called only when the page is first loaded, it sets up the plot area, the
        axis, channel name labels, time formatting and everything else displayed on the plot

        subsequent changes to this plot to scroll through the signal use the much computationally expensive
        series update and axis update methods.
        */
        var that = this;
        var channels = data.channels;

        that.vars.graphID = 'time-series-graph-' + that._getUUID();
        $(that.element).find('.graph').append('<div id="' + that.vars.graphID + '" style="margin: 0 auto"></div>');

        that.vars.chart = new Highcharts.Chart({
            chart: {
                animation: false,
                renderTo: that.vars.graphID,
                width: that.options.graph.width,
                height: that.options.graph.height,
                marginTop: that.options.graph.marginTop,
                marginBottom: that.options.graph.marginBottom,
                marginLeft: that.options.graph.marginLeft,
                marginRight: that.options.graph.marginRight,
                backgroundColor: that.options.graph.backgroundColor,
                events: {
                    load: function(event) {
                        that._setupLabelHighlighting();
                    },
                    redraw: function(event) {
                        that._setupLabelHighlighting();
                        that._setupYAxisLinesAndLabels();
                    }
                },
            },
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            tooltip: {
                enabled: false
            },
            plotOptions: {
                series: {
                    animation: false,
                    turboThreshold: 0,
                    lineWidth: 1,
                    enableMouseTracking: false,
                    color: 'black',
                    pointInterval: 1 / data.sampling_rate,
                },
                line: {
                    marker: {
                        enabled: false,
                    }
                },
                polygon: {

                }
            },
            xAxis: {
                gridLineWidth: 1,
                labels: {
                    enabled: that.options.showTimeLabels,
                    crop: false,
                    step: 5,
                    formatter: function() {
                        // Format x-axis at HH:MM:SS
                        var s = this.value;
                        var h = Math.floor(s / 3600);
                        s -= h * 3600;
                        var m = Math.floor(s / 60);
                        s -= m * 60;
                        return h + ":" + (m < 10 ? '0' + m : m) + ":" + (s < 10 ? '0' + s : s); //zero padding on minutes and seconds
                    },
                },
                tickInterval: 1,
                minorTickInterval: 0.5,
                min: that.vars.currentWindowStart,
                max: that.vars.currentWindowStart + that.options.windowSizeInSeconds,
                unit: [
                    ['second', 1]
                ],
            },
            yAxis: {
                tickInterval: 100,
                minorTickInterval: 50,
                min: -0.75 * that.options.graph.channelSpacing * 0.75,
                max: (channels.length - 0.25) * that.options.graph.channelSpacing,
                gridLineWidth: 0,
                minorGridLineWidth: 0,
                labels: {
                    enabled: that.options.showChannelNames,
                    step: 1,
                    useHTML: true,
                    formatter: function() {
                        if (
                            this.value < 0
                            || this.value > channels.length * that.options.graph.channelSpacing
                            || this.value % that.options.graph.channelSpacing !== 0
                        ) {
                            return null;
                        };
                        var index = that._getChannelIndexFromY(this.value);
                        var channel = channels[index];
                        var html = '<span class="channel-label" id="channel-' + index + '" data-index="' + index + '">' + channel.name + "</span>";
                        return html;
                    },
                },
                title: {
                    text: null
                }
            },
            legend: {
                enabled: false
            },
            series: that._initSeries(data),
            annotationsOptions: {
                enabledButtons: false,
            }
        });
        if (that.options.features.examplesModeEnabled) {
            that._displayAnnotations(that._turnExamplesIntoAnnotations(that.options.features.examples));
        }
        that._setupYAxisLinesAndLabels();
        that._setupAnnotationInteraction();
    },

    _blockGraphInteraction: function() {
        var that = this;
        var container = $(that.element);
        var graph = $('#' + that.vars.graphID);
        var blocker = $('<div>')
            .addClass('blocker')
            .css({
                position: 'absolute',
                left: 0,
                width: '100%',
                top: graph.offset().top,
                height: graph.height(),
                backgroundColor: 'rgba(0, 0, 0, 0)',
            })
            .appendTo(container);
    },

    _unblockGraphInteraction: function() {
        var that = this;
        $(that.element).find('> .blocker').remove();
    },

    _setupAnnotationInteraction: function() {
        var that = this;
        if (that.options.isReadOnly) return;
        if (!that.options.features.order || !that.options.features.order.length) return;
        var chart = that.vars.chart;
        var container = chart.container;

        function drag(e) {
            var annotation,
                clickX = e.pageX - container.offsetLeft,
                clickY = e.pageY - container.offsetTop;
            if (!chart.isInsidePlot(clickX - chart.plotLeft, clickY - chart.plotTop)) {
                return;
            }
            Highcharts.addEvent(document, 'mousemove', step);
            Highcharts.addEvent(document, 'mouseup', drop);
            var annotationId = undefined;
            var clickXValue = that._convertPixelsToValue(clickX, 'x');
            var clickYValue = that._convertPixelsToValue(clickY, 'y');
            var channelIndex = that._getChannelIndexFromY(clickYValue);
            var featureType = that.vars.activeFeatureType;

            annotation = that._addAnnotationBox(annotationId, clickXValue, channelIndex, featureType);

            function getAnnotationAttributes(e) {
                var x = e.clientX - container.offsetLeft,
                    dx = x - clickX,
                    width = that._convertPixelsToValueLength(parseInt(dx, 10) + 1, 'x');

                if (dx >= 0) {
                    var xValue = that._convertPixelsToValue(clickX, 'x');
                }
                else {
                    var xValue = that._convertPixelsToValue(x, 'x');
                }
                return {
                    xValue: xValue,
                    shape: {
                        params: {
                            width: width
                        }
                    }
                };
            }

            function step(e) {
                annotation.update(getAnnotationAttributes(e));
            }

            function drop(e) {
                Highcharts.removeEvent(document, 'mousemove', step);
                Highcharts.removeEvent(document, 'mouseup', drop);
                var x = e.clientX - container.offsetLeft;
                if (x == clickX) {
                    annotation.destroy();
                    return;
                }
                if (annotation) {
                    annotation.update(getAnnotationAttributes(e));
                }
                annotation.outsideClickHandler = function() {
                    annotation.destroy();
                }
                $('html').on('mousedown', annotation.outsideClickHandler);
            }
        }

        Highcharts.addEvent(container, 'mousedown', drag);
    },

    _addAnnotationBox: function(annotationId, timeStart, channelIndex, featureType, timeEnd, confidence, comment, annotationData) {
        var that = this;
        var annotations = that.vars.chart.annotations.allItems;
        var timeEnd = timeEnd !== undefined ? timeEnd : false;
        var annotationData = annotationData !== undefined ? annotationData : {};
        var preliminary = timeEnd === false;
        var shapeParams = {
            height: that.options.graph.channelSpacing,
        }
        if (preliminary) {
            shapeParams.width = 0;
            shapeParams.fill = 'transparent';
            shapeParams.stroke = that._getFeatureColor(featureType, annotationData.is_answer);
            shapeParams.strokeWidth = 10;
        }
        else {
            shapeParams.width = timeEnd - timeStart;
            shapeParams.fill = that._getFeatureColor(featureType, annotationData.is_answer, confidence);
            shapeParams.stroke = 'transparent';
            shapeParams.strokeWidth = 0;
        }
        var channelTop = that._getBorderTopForChannelIndex(channelIndex);
        that.vars.chart.addAnnotation({
            xValue: timeStart,
            yValue: channelTop,
            allowDragX: preliminary,
            allowDragY: false,
            anchorX: 'left',
            anchorY: 'top',
            shape: {
                type: 'rect',
                units: 'values',
                params: shapeParams,
            },
            events: {
                dblclick: function(event) {
                    if (that.options.isReadOnly) return;
                    if (annotationData.is_answer) return;
                    event.preventDefault();
                    var xMinFixed = that._getAnnotationXMinFixed(this);
                    var xMaxFixed = that._getAnnotationXMaxFixed(this);
                    var annotationId = annotation.metadata.id;
                    var channelIndex = annotation.metadata.channelIndex;
                    var channelsDisplayed = that.options.channelsDisplayed;
                    if (annotation.metadata.originalData) {
                        channelIndex = annotation.metadata.originalData.channels;
                        channelsDisplayed = annotation.metadata.originalData.channels_displayed;
                    }
                    that._deleteAnnotation(annotationId, that.vars.currentWindowRecording, xMinFixed, xMaxFixed, channelIndex, channelsDisplayed);
                    annotation.destroy();
                }
            }
        });
        var annotation = annotations[annotations.length - 1];
        if (!preliminary) {
            var classString = $(annotation.group.element).attr('class');
            classString += ' saved';
            $(annotation.group.element).attr('class', classString);
        }
        $(annotation.group.element).on('mousedown', function(event) {
            event.stopPropagation();
        });
        annotation.metadata = {
            id: annotationId,
            featureType: featureType,
            channelIndex: channelIndex,
            comment: ''
        }
        if (!preliminary) {
            annotation.metadata.confidence = confidence;
            annotation.metadata.comment = comment;
            annotation.metadata.originalData = annotationData;
        }
        if (!that.options.isReadOnly && !annotationData.is_answer) {
            that._addConfidenceLevelButtonsToAnnotationBox(annotation);
            if (!preliminary) {
                that._addCommentFormToAnnotationBox(annotation);
            }
        }
        return annotation;
    },

    _addConfidenceLevelButtonsToAnnotationBox: function(annotation) {
        var that = this;
        var annotationElement = $(annotation.group.element);
        // To learn more about the foreignObject tag, see:
        // https://developer.mozilla.org/en/docs/Web/SVG/Element/foreignObject
        var htmlContext = $(document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject'));
        htmlContext
            .attr({
                width: 70,
                height: 25,
                x: 0,
                y: 0,
                zIndex: 2,
            })
            .mousedown(function(event) {
                event.stopPropagation();
            })
            .click(function(event) {
                event.stopPropagation();
            })
            .dblclick(function(event) {
                event.stopPropagation();
            });
        var body = $(document.createElement('body'))
            .addClass('toolbar confidence-buttons')
            .attr('xmlns', 'http://www.w3.org/1999/xhtml');
        var buttonGroup = $('<form>')
        var buttonDefinitions = [{
            confidence: 0,
            class: 'red',
        }, {
            confidence: 0.5,
            class: 'yellow',
        }, {
            confidence: 1,
            class: 'light-green',
        }]
        for (var i = 0; i < buttonDefinitions.length; ++i) {
            var buttonDefinition = buttonDefinitions[i];
            var buttonID = that._getUUID();
            var button = $('<div>')
                .addClass('btn')
                .addClass(buttonDefinition.class)
                .addClass(buttonDefinition.confidence == annotation.metadata.confidence ? 'active' : '')
                .data('confidence', buttonDefinition.confidence)
                .click(function(event) {
                    $(this).addClass('active').siblings().removeClass('active');
                    var confidence = $(this).data('confidence');
                    annotation.metadata.confidence = confidence;
                    that._saveFeatureAnnotation(annotation);
                    $('html').off('mousedown', annotation.outsideClickHandler);
                    var classString =  $(annotation.group.element).attr('class');
                    classString += ' saved';
                    $(annotation.group.element).attr('class', classString);
                    var newColor = that._getFeatureColor(annotation.metadata.featureType, false, confidence);
                    annotation.update({
                        allowDragX: false,
                        shape: {
                            params: {
                                strokeWidth: 0,
                                stroke: 'transparent',
                                fill: newColor,
                            }
                        }
                    });
                    that._addCommentFormToAnnotationBox(annotation);
                })
            buttonGroup.append(button);
        }
        body.append(buttonGroup);
        htmlContext.append(body);
        annotationElement.append(htmlContext);
    },

    _addCommentFormToAnnotationBox: function(annotation) {
        if (annotation.metadata.commentFormAdded) {
            return;
        }
        var that = this;
        var annotationElement = $(annotation.group.element);
        // To learn more about the foreignObject tag, see:
        // https://developer.mozilla.org/en/docs/Web/SVG/Element/foreignObject
        var htmlContext = $(document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject'));
        htmlContext
            .attr({
                width: 250,
                height: 25,
                x: 0,
                y: 20,
                zIndex: 2,
            })
            .mousedown(function(event) {
                event.stopPropagation();
            })
            .click(function(event) {
                event.stopPropagation();
            })
            .dblclick(function(event) {
                event.stopPropagation();
            });
        var body = $('<body>')
            .addClass('toolbar comment')
            .attr('xmlns', 'http://www.w3.org/1999/xhtml');
        var form = $('<form>');
        var toggleButton = $('<button type="submit" class="btn btn-primary fa fa-comment"></button>');
        form.append(toggleButton);
        var comment = annotation.metadata.comment;
        var input = $('<input type="text" placeholder="Your comment..." value="' + comment + '">')
            .hide()
            .keydown(function(event) {
                event.stopPropagation();
            });
        form.submit(function(event) {
            event.preventDefault();
            var collapsed = toggleButton.hasClass('fa-comment');
            if (collapsed) {
                toggleButton
                    .removeClass('fa-comment')
                    .addClass('fa-floppy-o')
                input.show().focus();
            }
            else {
                toggleButton
                    .removeClass('fa-floppy-o')
                    .addClass('fa-comment')
                input.hide();
                var comment = input.val();
                toggleButton.focus();
                annotation.metadata.comment = comment;
                that._saveFeatureAnnotation(annotation);
            }
        });
        form.append(input);
        body.append(form);
        htmlContext.append(body);
        annotationElement.append(htmlContext);
        annotation.metadata.commentFormAdded = true;
    },

    _saveFeatureAnnotation: function(annotation) {
        var that = this;
        var annotationId = annotation.metadata.id;
        var type = annotation.metadata.featureType;
        var time_start = that._getAnnotationXMinFixed(annotation);
        var time_end = that._getAnnotationXMaxFixed(annotation);
        var channel = annotation.metadata.channelIndex;
        var confidence = annotation.metadata.confidence;
        var comment = annotation.metadata.comment;
        var metadata = {}
        if (that._isHITModeEnabled()) {
            metadata = {
                visibleRegion: that.options.visibleRegion,
                windowSizeInSeconds: that.options.windowSizeInSeconds,
                isTrainingWindow: that._isCurrentWindowTrainingWindow(),
            }
            if (that.options.projectUUID) {
                metadata.projectUUID = that.options.projectUUID;
            }
        }
        that._saveAnnotation(annotationId, that.vars.currentWindowRecording, type, time_start, time_end, channel, confidence, comment, metadata, function(savedAnnotation, error) {
            if (savedAnnotation) {
                annotation.metadata.id = savedAnnotation.id;
            }
        });
    },

    _saveFullWindowLabel: function(annotationCategory, label) {
        var that = this;
        var label = label;
        var time_start = that.vars.currentWindowStart;
        var time_end = time_start + that.options.windowSizeInSeconds;
        var channel = undefined;
        var confidence = 1;
        var comment = '';
        var cacheKey = that._getAnnotationsCacheKey(that.vars.currentWindowRecording, time_start, time_end, false, annotationCategory);
        var annotationId = that.vars.annotationsCache[cacheKey];
        that._saveAnnotation(annotationId, that.vars.currentWindowRecording, label, time_start, time_end, channel, confidence, comment, {}, function(savedAnnotation, error) {
            if (savedAnnotation) {
                that.vars.annotationsCache[cacheKey] = savedAnnotation.id;
            }
        });
    },

    _saveArtifactAnnotation: function(type) {
        var that = this;
        that._saveFullWindowLabel('ARTIFACT', type);
    },

    _saveSleepStageAnnotation: function(type) {
        var that = this;
        that._saveFullWindowLabel('SLEEP_STAGE', type);
    },

    _getAnnotationXMinFixed: function(annotation) {
        return parseFloat(annotation.options.xValue).toFixed(2);
    },

    _getAnnotationXMaxFixed: function(annotation) {
        return parseFloat(annotation.options.xValue + annotation.options.shape.params.width).toFixed(2);
    },

    _getAxis: function(key) {
        var that = this;
        switch (key) {
            case 'x':
            case 'X':
                var axis = that.vars.chart.xAxis[0];
                break;
            default:
                var axis = that.vars.chart.yAxis[0];
                break;
        }
        return axis;
    },

    _convertPixelsToValue: function(pixels, axisKey) {
        var axis = this._getAxis(axisKey);
        return axis.toValue(pixels);
    },

    _convertValueToPixels: function(value, axisKey) {
        var axis = this._getAxis(axisKey);
        return axis.toPixels(value);
    },

    _convertPixelsToValueLength: function(pixels, axisKey) {
        var axis = this._getAxis(axisKey);
        return Math.abs(axis.toValue(pixels) - axis.toValue(0));
    },

    _convertValueToPixelsLength: function(value, axisKey) {
        var axis = this._getAxis(axisKey);
        return Math.abs(axis.toPixels(value) - axis.toPixels(0));
    },

    _getChannelsAnnotated: function(yMin, yMax) {
        var that = this;
        var index1 = that._getChannelIndexFromY(yMin);
        var index2 = that._getChannelIndexFromY(yMax);
        var indexMin = Math.min(index1, index2);
        var indexMax = Math.max(index1, index2);
        var channels = [];
        for (var i = indexMin; i <= indexMax; ++i) {
            channels.push(i);
        }
        return channels;
    },

    _getChannelIndexFromY: function(value) {
        var that = this;
        var numberOfChannels = that.vars.currentWindowData.channels.length;
        var indexFromEnd = Math.floor((value + that.options.graph.channelSpacing / 2) / that.options.graph.channelSpacing);
        var index = numberOfChannels - 1 - indexFromEnd;
        index = Math.min(numberOfChannels - 1, index);
        index = Math.max(index, 0);
        return index;
    },

    _setupLabelHighlighting: function() {
        var that = this;
        $(that.element).find('.channel-label').click(function(event) {
            that.vars.selectedChannelIndex = $(this).data('index');
            $(that.element).find('.gain-button').prop('disabled', false);
            $(that.element).find('.channel-label').removeClass('selected');
            $(this).addClass('selected');
        });
    },

    _setupYAxisLinesAndLabels: function() {
        var that = this;
        var axis = that.vars.chart.yAxis[0];
        var channels = that.vars.currentWindowData.channels;

        for (var i = 0; i < channels.length; ++i) {
            var channel = channels[i];
            var channelOffset = that._getOffsetForChannelIndex(i);
            var channelUnit = that._getUnitForChannel(channel);
            var zeroLineID = 'channel_' + i + '_zero';
            axis.removePlotLine(zeroLineID);
            var zeroLineOptions = {
                id: zeroLineID,
                color: '#dddddd',
                value: channelOffset,
                width: 1
            };
            axis.addPlotLine(zeroLineOptions);

            if (!that.options.showReferenceLines) continue;

            var referenceValue = that._getReferenceValueForChannel(channel);
            var referenceValueWithGain = referenceValue * that._getGainForChannelIndex(i);
            var polarities = [-1, 1];
            for (var j = 0; j < 2; ++j) {
                var referenceLineID = 'channel_' + i + '_reference_' + j;
                axis.removePlotLine(referenceLineID);
                if (referenceValue == 0) {
                    continue;
                }
                var polarity = polarities[j];
                var flipFactor = that._getFlipFactorForChannel(channel);
                var referenceLineOptions = {
                    id: referenceLineID,
                    color: '#ff0000',
                    dashStyle: 'dash',
                    value: channelOffset + polarity * referenceValueWithGain,
                    width: 1,
                    zIndex: 1,
                    label: {
                        text: (flipFactor * polarity * referenceValue) + ' ' + channelUnit,
                        textAlign: 'right',
                        verticalAlign: 'middle',
                        x: -15,
                        y: 3,
                        style: {
                            color: 'red',
                            marginRight: '50px',
                        }
                    }
                };
                axis.addPlotLine(referenceLineOptions);
            }
        }
    },

    _getFlipFactorForChannel: function(channel) {
        var that = this;
        if (that._shouldChannelBeFlippedVertically(channel)) {
            return -1;
        }
        return 1;
    },

    _shouldChannelBeFlippedVertically: function(channel) {
        return true;
    },

    _getUnitForChannel: function(channel) {
        // electrooculography
        if (
                channel.name.indexOf('EOG') > -1
            ||  channel.name.indexOf('LOC') > -1
            ||  channel.name.indexOf('ROC') > -1
        ) {
            return 'μV';
        }
        // electrocardiography
        if (channel.name.indexOf('ECG') > -1) {
            return 'mV';
        }
        // electromygraphy
        if (
                channel.name.indexOf('EMG') > -1
            ||  channel.name.indexOf('Chin') > -1
        ) {
            return 'μV';
        }
        // electroencephalography
        // (default if no other channel
        // type was recognized)
        return 'μV';
    },

    _getReferenceValueForChannel: function(channel) {
        // electrooculography
        if (
                channel.name.indexOf('EOG') > -1
            ||  channel.name.indexOf('LOC') > -1
            ||  channel.name.indexOf('ROC') > -1
        ) {
            return 75;
        }
        // electrocardiography
        if (channel.name.indexOf('ECG') > -1) {
            return 0.1;
        }
        // electromygraphy
        if (
                channel.name.indexOf('EMG') > -1
            ||  channel.name.indexOf('Chin') > -1
        ) {

            return 10;
        }
        // electroencephalography
        // (default if no other channel
        // type was recognized)
        return 75;
    },

    _updateChannelGain: function(action) {
        var that = this;
        var previewDataAdjusted = [];

        if (action === "reset") {
            that.vars.currentChannelGainAdjustments[that.vars.selectedChannelIndex] = 1;
        }
        else {
            var gainChangeFactor = 1 + that.options.relativeGainChangePerStep;
            if (action === "step_decrease") {
                var gainChangeFactor = 1 / gainChangeFactor;
            }
            that.vars.currentChannelGainAdjustments[that.vars.selectedChannelIndex] *= gainChangeFactor;
        }

        var channel = that.vars.currentWindowData.channels[that.vars.selectedChannelIndex];
        var currentGain = that._getGainForChannelIndex(that.vars.selectedChannelIndex);
        var channelOffset = that._getOffsetForChannelIndex(that.vars.selectedChannelIndex);

        for (var ii = 0; ii < channel.values.length; ii++) {
            previewDataAdjusted.push((channel.values[ii] - channelOffset) / channel.gain * currentGain + channelOffset);
        }

        that.vars.chart.series[that.vars.selectedChannelIndex].update({
            pointStart: that.vars.currentWindowStart,
            name: channel.name,
            type: 'line',
            data: previewDataAdjusted
        }, false);

        that.vars.chart.redraw();

        that._savePreferences({
            channel_gains: that._getCurrentChannelGains(),
            channels_displayed: that.options.channelsDisplayed
        });
    },

    _initSeries: function(data) {
        var that = this;
        var channels = data.channels;
        var series = [];

        for (var ii = 0; ii < channels.length; ++ii) {
            var channel = {
                pointStart: that.vars.currentWindowStart,
                name: channels[ii].name,
                type: 'line',
                data: channels[ii].values
            };
            series.push(channel);
        }
        return(series);
    },

    _getFeatureColor: function(featureKey, isAnswer, confidence) {
        var that = this;
        var isAnswer = !!isAnswer;
        var confidence = confidence !== undefined ? confidence : 1;
        var feature = that.options.features.options[featureKey];
        if (!feature) {
            console.error('Could not find feature', featureKey);
            return 'rgba(255, 0, 0, 1)';
        }
        if (isAnswer) {
            var color = feature.answer;
        }
        else {
            var color = feature.annotation;
        }
        var min = color.alpha.min;
        var max = color.alpha.max;
        var alpha = min + confidence * (max - min);
        var colorValues = [color.red, color.green, color.blue, alpha];
        var colorString = 'rgba(' + colorValues.join(',') + ')';
        return colorString;
    },

    _getUUID: function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },

    _getBorderTopForChannelIndex: function(index) {
        var that = this;
        var top = that._getOffsetForChannelIndex(index) + that.options.graph.channelSpacing / 2;
        return top;
    },

    _getBorderBottomForChannelIndex: function(index) {
        var that = this;
        var bottom = that._getOffsetForChannelIndex(index) - that.options.graph.channelSpacing / 2;
        return bottom;
    },

    _convertChannelsToNormalizedArray: function(channels) {
        var that = this;
        var numberOfChannels = that.vars.currentWindowData.channels.length;
        if (channels == 'ALL') {
            channels = [];
            for (var i = 0; i < numberOfChannels; ++i) {
                channels.push(i);
            }
            return channels;
        }
        if (!Array.isArray(channels)) {
            channels = channels.toString().split(',');
        }
        for (var i = 0; i < channels.length; ++i) {
            if (!that._isValidChannelIndex(channels[i])) {
                throw new RangeError('Channel ' + channels + ' is not a valid channel from range [0..' + (numberOfChannels - 1) + '].');
            }
            else {
                channels[i] = Number(channels[i]);
            }
        }
        channels.sort();
        return channels;
    },

    _convertChannelsToString: function(channels) {
        var that = this;
        if (typeof(channels) === 'string') {
            return channels;
        }
        return that._convertChannelsToNormalizedArray(channels).join(',');
    },

    _isInt: function(value) {
        var that = this;
        return (value % 1 === 0);
    },

    _isValidChannelIndex: function(value) {
        var that = this;
        return (that._isInt(value) && value >= 0 && value <= that.vars.currentWindowData.channels.length - 1);
    },

    _loadPreferences: function(callback) {
        var that = this;
        // that._getApiClient().taskdataconfiguration().getForContext(function(configs, error) {
        //     if (configs && configs.length) {
        //         that.vars.taskDataConfiguration = configs[0];
        //     }
        //     else {
        //         that.vars.taskDataConfiguration = that._getApiClient().taskdataconfiguration().init();
        //         that.vars.taskDataConfiguration.configuration = {};
        //     }
        //     if (that.vars.taskDataConfiguration.configuration.current_page_start !== undefined) {
        //         that.options.startTime = that.vars.taskDataConfiguration.configuration.current_page_start;
        //     }
        //     if (that.vars.taskDataConfiguration.configuration.channel_gains) {
        //         that.vars.initialChannelGains = that.vars.taskDataConfiguration.configuration.channel_gains;
        //     }
        //     callback && callback();
        // });
        if (that.options.channelGains) {
            that.vars.initialChannelGains = that.options.channelGains;
        }
        callback && callback();
    },

    _savePreferences: function(updates) {
        var that = this;
        if (that.options.isReadOnly) return;
        if (!that.vars.taskDataConfiguration) return;
        for (key in updates) {
            that.vars.taskDataConfiguration.configuration[key] = updates[key];
        }
        that.vars.taskDataConfiguration.save();
    },

    _saveUserEvent: function(eventType, metadata) {
        var that = this;
        var eventType = eventType !== undefined ? eventType : 'undefined';
        var metadata = metadata !== undefined ? metadata : {};
        if (that.options.projectUUID) {
            metadata.projectUUID = that.options.projectUUID;
        }
        var options = JSON.stringify({
            eventType: eventType,
            metadata: metadata,
        });
        console.error('Trying to save a user event, but this feature is not implemented yet.');
    },

    _saveUserEventWindow: function(beginOrComplete) {
        var that = this;
        if (!that._isHITModeEnabled()) return;
        that._saveUserEvent('window_' + beginOrComplete, {
            recordingName: that.options.recordingName,
            windowStart: that.vars.currentWindowStart,
            windowSizeInSeconds: that.options.windowSizeInSeconds,
            channelsDisplayed: that.options.channelsDisplayed,
            features: that.options.features.order,
            isTraining: that._isCurrentWindowTrainingWindow(),
        });
    },

    _saveUserEventWindowBegin: function() {
        var that = this;
        that._saveUserEventWindow('begin');
    },

    _saveUserEventWindowComplete: function() {
        var that = this;
        that._saveUserEventWindow('complete');
    },

    _getAnnotations: function(recording_name, window_start, window_end, correctAnswers) {
        var that = this;
        if (!that.options.features.showUserAnnotations) return;

        var cacheKey = that._getAnnotationsCacheKey(recording_name, window_start, window_end, correctAnswers);
        if (that.vars.annotationsLoaded || that.vars.annotationsCache[cacheKey]) {
            var data = that.vars.annotationsCache[cacheKey] || {
                annotations: [],
            };
            if (!correctAnswers) {
                that._incrementNumberOfAnnotationsInCurrentWindow(that._getVisibleAnnotations(data.annotations).length);
            }
            that._displayArtifactsSelection(data.annotations);
            that._displaySleepStageSelection(data.annotations);
            return;
        }
        that.vars.annotationsCache[cacheKey] = {
            annotations: [],
        };
        that.vars.annotationsLoaded = true;
        that._getApiClient().listAll('response', {}, function(annotations) {
            if (!annotations) {
                return;
            }
            // sort annotations by the date they were last updated, most recently updated first
            annotations = annotations.sort(function(a, b) {
                return (a.updated < b.updated) ? 1 : (a.updated > b.updated) ? -1 : 0;
            });
            var annotations = annotations.map(function(annotation) {
                var annotationFormatted = annotation.content
                annotationFormatted.id = annotation.id;
                return annotationFormatted;
            });
            annotations.forEach(function(annotation) {
                var annotationWindowStart = Math.floor(annotation.position.start / that.options.windowSizeInSeconds) * that.options.windowSizeInSeconds;
                var annotationWindowEnd = annotationWindowStart + that.options.windowSizeInSeconds;
                var annotationCacheKey = that._getAnnotationsCacheKey(recording_name, annotationWindowStart, annotationWindowEnd, correctAnswers);
                if (!that.vars.annotationsCache[annotationCacheKey]) {
                    that.vars.annotationsCache[annotationCacheKey] = {
                        annotations: [],
                    };
                }
                that.vars.annotationsCache[annotationCacheKey].annotations.push(annotation);
            });
            var data = that.vars.annotationsCache[cacheKey] || {
                annotations: [],
            };
            that._displayArtifactsSelection(data.annotations);
            that._displaySleepStageSelection(data.annotations);
            that._displayAnnotations(data.annotations);
        });
    },

    _getVisibleAnnotations: function(annotations) {
        var that = this;
        var visibleAnnotations = annotations.filter(function(annotation) {
            var isVisibleFeature = that.options.features.order.indexOf(annotation.label) > -1;
            var isVisibleChannel = false;
            var annotationChannels = annotation.position.channels;
            if (annotationChannels) {
                if (!annotationChannels.length) {
                    annotationChannels = [annotationChannels];
                }
                for (var c = 0; c < annotationChannels.length; ++c) {
                    var channel = annotation.metadata.channels_displayed[annotationChannels[c]];
                    if (that.options.channelsDisplayed.indexOf(channel) > -1) {
                        isVisibleChannel = true;
                        break;
                    }
                }
            }
            return isVisibleFeature && isVisibleChannel;
        });
        return visibleAnnotations;
    },

    _getAnnotationsCacheKey: function(recording_name, window_start, window_end, correctAnswers, cacheCategory) {
        cacheCategory = cacheCategory || 'FEATURE';
        var key = recording_name + '_' + cacheCategory + '_' + window_start + '_' + window_end;
        if (correctAnswers) {
            key += '_correct_answers';
        }
        return key;
    },

    _displayArtifactsSelection: function(annotations) {
        var that = this;
        var activeClass = 'teal darken-4';
        var validKeys = [
            'artifacts_none',
            'artifacts_light',
            'artifacts_medium',
            'artifacts_strong',
        ];
        var noArtifactAnnotation = true;
        $(that.element).find('.artifact_panel button.artifact').removeClass(activeClass);
        for (var i = 0; i < annotations.length; ++i) {
            var annotation = annotations[i];
            if (validKeys.indexOf(annotation.label) > -1) {
                var cacheKey = that._getAnnotationsCacheKey(that.vars.currentWindowRecording, annotation.position.start, annotation.position.end, false, 'ARTIFACT');
                that.vars.annotationsCache[cacheKey] = annotation.id;
                $(that.element).find('.artifact_panel button.artifact[data-annotation-type="' + annotation.label + '"]').addClass(activeClass);
                noArtifactAnnotation = false;
                break;
            }
        }
        if (noArtifactAnnotation) {
            $(that.element).find('.artifact_panel button.artifact[data-annotation-type="artifacts_none"]').addClass(activeClass);
        }
    },

    _displaySleepStageSelection: function(annotations) {
        var that = this;
        var activeClass = 'teal';
        var inactiveClass = 'grey lighten-1';
        var validKeys = [
            'sleep_stage_wake',
            'sleep_stage_n1',
            'sleep_stage_n2',
            'sleep_stage_n3',
            'sleep_stage_rem',
            'sleep_stage_unknown',
        ];
        var noSleepStageAnnotation = true;
        $(that.element).find('.sleep_stage_panel button.sleep_stage').removeClass(activeClass).addClass(inactiveClass);
        for (var i = 0; i < annotations.length; ++i) {
            var annotation = annotations[i];
            if (validKeys.indexOf(annotation.label) > -1) {
                var cacheKey = that._getAnnotationsCacheKey(that.vars.currentWindowRecording, annotation.position.start, annotation.position.end, false, 'SLEEP_STAGE');
                that.vars.annotationsCache[cacheKey] = annotation.id;
                $(that.element).find('.sleep_stage_panel button.sleep_stage[data-annotation-type="' + annotation.label + '"]').addClass(activeClass).removeClass(inactiveClass);
                noSleepStageAnnotation = false;
                break;
            }
        }
    },

    _turnExampleIntoAnnotation: function(example) {
        var that = this;
        var annotation = {
            id: that._getUUID(),
            label: example.type,
            confidence: example.confidence,
            position: {
                start: example.start,
                end: example.end,
                channels: example.channels,
            },
            metadata: {
                channels_displayed: example.channels_displayed,
                comment: example.comment,
            },
        };
        return annotation;
    },

    _turnExamplesIntoAnnotations: function(examples) {
        var that = this;
        var annotations = [];
        examples.forEach(function(example) {
            annotations.push(that._turnExampleIntoAnnotation(example));
        });
        return annotations;
    },

    _displayAnnotations: function(annotations) {
        var that = this;

        for (var ii = 0; ii < annotations.length; ii++) {
            var annotation = annotations[ii];
            var channelIndex = annotation.position.channels;
            if (channelIndex === undefined) {
                continue;
            }
            if (channelIndex.length) {
                channelIndex = channelIndex[0];
            }
            var channelIndexRecording = annotation.metadata.channels_displayed[channelIndex];
            var channelIndexMapped = that.options.channelsDisplayed.indexOf(channelIndexRecording);
            if (channelIndexMapped < 0) {
                continue;
            }

            var annotationId = annotation.id;
            var start_time = annotation.position.start;
            var end_time = annotation.position.end;
            var type = annotation.label;
            var confidence = annotation.confidence;
            var comment = annotation.metadata.comment;
            var chart = that.vars.chart;

            if (chart != undefined && that.options.features.order.indexOf(type) > -1) {
                that._addAnnotationBox(annotationId, start_time, channelIndexMapped, type, end_time, confidence, comment, annotation);
            }
        }
    },

    _flushAnnotations: function() {
        var that = this;
        annotations = that.vars.chart.annotations.allItems;
        while (annotations && annotations.length > 0) {
            annotations[0].destroy();
        }
        that.vars.annotationsCache = {};
    },

    _getApiClient: function() {
        var that = this;
        return that.options.apiClient;
    },

    _saveAnnotation: function(annotationId, recording_name, type, start, end, channels, confidence, comment, metadata, callback) {

        var that = this;
        if (that.options.isReadOnly) return;
        that._incrementNumberOfAnnotationsInCurrentWindow(1);
        that._updateLastAnnotationTime();
        var metadata = metadata !== undefined ? metadata : {};
        if (channels && !channels.length) {
            channels = [ channels ];
        }
        var apiClient = that._getApiClient();
        var params = {
            content: {
                label: type,
                confidence: confidence,
                position: {
                    channels: channels,
                    start: parseFloat(start),
                    end: parseFloat(end),
                },
                metadata: {
                    channels_displayed: that.options.channelsDisplayed,
                    comment: comment,
                    metadata: metadata,
                },
            }
        }
        if (!annotationId) {
            apiClient.create('response', params, updateCache);
        }
        else {
            params.id = annotationId;
            apiClient.partialUpdate('response', params, updateCache);
        }
        function updateCache(annotation) {
            callback && callback(annotation, null);
            var window_start = that.vars.currentWindowStart;
            var window_end = window_start + that.options.windowSizeInSeconds;
            var key = that._getAnnotationsCacheKey(recording_name, window_start, window_end);
            var cacheEntry = that.vars.annotationsCache[key];
            if (!cacheEntry) {
                cacheEntry = {
                    annotations: []
                }
            }
            cacheEntry.annotations.unshift(annotation.content);
            that.vars.annotationsCache[key] = cacheEntry;
        }
    },

    _deleteAnnotation: function(annotationId, recording_name, start, end, channels, channelsDisplayed) {
        var that = this;
        if (that.options.isReadOnly) return;
        that._incrementNumberOfAnnotationsInCurrentWindow(-1);
        that._updateLastAnnotationTime();        
        // that._getApiClient().annotation().delete(annotationId, function(response, error) {
        //     if (error) {
        //         alert(error.message);
        //         return;
        //     }
        // });
    },

    _incrementNumberOfAnnotationsInCurrentWindow: function(increment) {
        var that = this;
        that._setNumberOfAnnotationsInCurrentWindow(that.vars.numberOfAnnotationsInCurrentWindow + increment);
    },

    _setNumberOfAnnotationsInCurrentWindow: function(value) {
        var that = this;
        that.vars.numberOfAnnotationsInCurrentWindow = Math.max(0, value);
        var zeroAnnotations = that.vars.numberOfAnnotationsInCurrentWindow == 0
        $(that.element).find('.no-features').prop('disabled', !zeroAnnotations);
        $(that.element).find('.submit-features').prop('disabled', zeroAnnotations);
    },

    _lastWindowReached: function() {
        var that = this;
        if (!that.vars.lastWindowHasBeenReachedBefore) {
            that._lastWindowReachedForTheFirstTime();
        }
        that.vars.lastWindowHasBeenReachedBefore = true;
        $(that.element).find('.next-window').hide();
    },

    _lastWindowReachedForTheFirstTime: function() {
        var that = this;
        if (that.options.showConfirmationCode && that.options.confirmationCode) {
            var code = that.options.confirmationCode;
            var textCompletionButton = 'Show Confirmation Code'
            var confirmationCodeInstructions = 'You need to copy and paste your confirmation code into the input field on the Mechanical Turk instructions page and submit in order to receive the full payment for this task.';
            if (!that._isHITModeEnabled()) {
                bootbox.alert('<div style="text-align: left;">This is the last data window. Please annotate it just like you did with the others. After that, please click the green button saying "<b>' + textCompletionButton + '</b>" to get your confirmation code and finish the task.<br><br><span style="color: #ff0000; font-weight: bold;">Important: ' + confirmationCodeInstructions + '</span>', showCompletionButton)
                    .appendTo(that.element);
            }
            else {
                $(that.element).find('.submit-annotations').add('.next-window').click(function() {
                    showCompletionButton();
                    showConfirmationCode();
                });
            }

            function showCompletionButton() {
                $(that.element).find('.graph_footer .middle').children().hide();
                var taskCompletionCodeButton = $("<button>")
                    .addClass('btn btn-success')
                    .html(textCompletionButton)
                    .click(function() {
                        showConfirmationCode();
                    })
                    .appendTo('.graph_footer .middle');
            }

            function showConfirmationCode() {
                completeProgressBar();
                bootbox.alert({
                    title: 'Thank you for completing the task!',
                    message: 'Your confirmation code is:<br><br><span style="color: #ff0000; font-weight: bold; font-size: 30px">' + code + '</span><br><br>' + confirmationCodeInstructions + '<br><br>After that, you can simply close this tab. Thank you for your participation!'
                }).appendTo(that.element);
            }

            function completeProgressBar() {
                $(that.element).find('.progress-bar').css('width', '100%');
            }
        }
    }

});
