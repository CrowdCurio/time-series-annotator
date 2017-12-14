//  file:   main.js
//  author: Mike Schaekermann
//  desc:   root file for bundling the time series annotator
var CrowdCurioClient = require('./crowdcurio-client');
require('./time-series-annotator');

var csrftoken = $("[name='csrfmiddlewaretoken']").val();

// set global UI vars
var DEV = window.DEV;
var task = window.task || -1;
var user = window.user || -1;
var experiment = window.experiment || -1;
var containerId = window.container || 'task-container';
var containerElement = $('#' + containerId);

var apiClient = new CrowdCurioClient();
var config = {
    apiClient: apiClient,
    recordingName: '1209153-1_P',
};

containerElement.TimeSeriesAnnotator(config);