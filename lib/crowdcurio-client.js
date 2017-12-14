CrowdCurioClient = function() {
    this.activeContextIds = {};
    this.readOnlyModeEnabled = false;
}

CrowdCurioClient.prototype.addCSRFTokenToRequestData = function(data) {
    if (!data) {
        return data;
    }
    if (!window.csrftoken) {
        console.error('Cannot authenticate API request because CSRF token is not set.');
        return data;
    }
    data.csrfmiddlewaretoken = window.csrftoken;
    return data;
};

CrowdCurioClient.prototype.setReadOnly = function(isReadOnly) {
    this.readOnlyModeEnabled = isReadOnly;
}

CrowdCurioClient.prototype.isReadOnly = function() {
    return !!this.readOnlyModeEnabled;
}

CrowdCurioClient.prototype.setActiveContextId = function(type, id) {
    this.activeContextIds[type] = id;
}

CrowdCurioClient.prototype.getActiveContextId = function(type) {
    return this.activeContextIds[type];
}

CrowdCurioClient.prototype.unsetActiveContextId = function(type) {
    delete this.activeContextIds[type];
}

CrowdCurioClient.prototype.defaultRelationships = function() {
    var that = this;
    var relationships = {
        activeUser: function() {
            return {
                type: 'User',
                id: window.user_id,
            };
        },
        activeCurio: function() {
            return {
                type: 'Curio',
                id: window.curio_id,
            };
        },
        activeTask: function() {
            return {
                type: 'Task',
                id: window.task_id,
            };
        },
        activeExperiment: function() {
            return {
                type: 'Experiment',
                id: window.experiment_id,
            };
        },
        activeCondition: function() {
            return {
                type: 'Condition',
                id: window.condition_id,
            };
        },
        activeSession: function() {
            return {
                type: 'string',
                id: window.session_key,
            };
        },
    };
    for (type in that.activeContextIds) {
        (function(type) {
            var relationshipFieldName = 'active' + type;
            relationships[relationshipFieldName] = function() {
                return {
                    type: type,
                    id: that.getActiveContextId(type),
                };
            };
        })(type);
    }
    return relationships;
};

CrowdCurioClient.prototype.makeAPICall = function(method, endpoint, data) {
    var that = this;
    data = that.addCSRFTokenToRequestData(data);
    if (data && method.toLowerCase() != 'get') {
        if (that.isReadOnly()) {
            return $.when({
                apiCallSuppressedBecauseReadOnlyModeEnabled: true,
            });
        }
        data = JSON.stringify(data);
    }
    return $.ajax({
        type: method,
        url: endpoint,
        contentType: 'application/vnd.api+json',
        data: data,
    });
};

CrowdCurioClient.prototype.routeNext = function(callback, numberOfDataRecordsToLoad, routing) {
    var that = this;
    if (!callback) {
        console.log('Please provide a callback function.');
        return;
    }
    var numberOfDataRecordsToLoad = numberOfDataRecordsToLoad || 1;
    var balanced = balanced !== undefined ? balanced : true;
    var request = {
        task: task_id,
        page_size: numberOfDataRecordsToLoad,
    }
    routing = routing !== undefined ? routing : window.task_routing;
    if (!routing) {
        routing = 'balanced';
    }
    request[routing] = 'True';
    if (window.experiment_id && window.condition_id) {
        request.experiment = experiment_id;
        request.condition = condition_id;
    } else {
        request.public = 'True';
    }
    var endpoint = '/api/route/';
    if (routing == 'random'){
        endpoint = '/api/route/random/';
    }
    that.makeAPICall('GET', endpoint, request)
        .done(function(response) {
            if (response.data.length > 0) {
                callback({
                    dataRecords: that.parse(response.data),
                    numberOfRemainingDataRecords: response.meta.pagination.count,
                });
            } else {
                // if (window.experiment_id) {
                //     incrementExperimentWorkflowIndex(csrftoken, user_id, experiment_id);
                // } else {
                callback(undefined, {
                    message: 'Sorry about that, something went wrong while loading the next task!',
                    allDataRecordsCompleted: true,
                });
                // }
            }
        })
        .fail(function() {
            callback(undefined, {
                message: 'API request to retrieve more data records failed.',
            });
        });
};

CrowdCurioClient.prototype.routeNextDeliberation = function(callback) {
    var that = this;
    if (!callback) {
        console.log('Please provide a callback function.');
        return;
    }
    var request = {
        task: task_id,
        page_size: 1,
    }
    if (window.condition_id) {
        request.condition = condition_id;
    }
    var endpoint = '/api/deliberation/route/';
    that.makeAPICall('GET', endpoint, request)
        .done(function(response) {
            if (response.data.length > 0) {
                callback(that.parse(response.data[0]));
            } else {
                callback(undefined, {
                    message: 'There is currently no deliberation available!',
                    noDeliberationAvailable: true,
                });
            }
        })
        .fail(function() {
            callback(undefined, {
                message: 'API request to retrieve deliberation failed.',
            });
        });
};

CrowdCurioClient.prototype.collectInfoForTask = function(callback) {
    var that = this;
    if (!callback) {
        console.log('Please provide a callback function.');
        return;
    }
    if (window.experiment_id > 0 && window.condition_id > 0) {
        that.setActiveContextId('Experiment', window.experiment_id);
        that.setActiveContextId('Condition', window.condition_id);
        that.experiment().get(that.getActiveContextId('Experiment'), function(experiment, error) {
            if (error) {
                callback(undefined, error);
                return;
            }
            that.condition().get(that.getActiveContextId('Condition'), function(condition, error) {
                if (error) {
                    callback(undefined, error);
                    return;
                }
                that.subjectcondition().getForContext(function(subjectConditions, error) {
                    if (error) {
                        callback(undefined, error);
                        return;
                    }
                    var subjectCondition;
                    if (subjectConditions.length > 0) {
                        subjectCondition = subjectConditions[0];
                    }
                    var taskCount;
                    if (!subjectCondition) {
                        callback(undefined, {
                            message: 'Subject condition could not be found.',
                        });
                        return;
                    }
                    var workflowIndex = subjectCondition.supplementary.workflow_idx || 0;
                    var workflowKey = subjectCondition.supplementary.workflow_key || 'workflow';
                    var workflow = condition.configuration[workflowKey];
                    if (!workflow) {
                        callback(undefined, {
                            message: 'Workflow ' + workflowKey + ' is not defined in the condition configuration.',
                        });
                        return;
                    }
                    var workflowStepKey = workflow[workflowIndex];
                    if (!workflowStepKey) {
                        callback(undefined, {
                            message: 'Workflow index ' + workflowIndex + ' out of range.',
                        });
                        return;
                    }
                    var workflowStep = condition.configuration[workflowStepKey];
                    if (!workflowStep) {
                        callback(undefined, {
                            message: 'Workflow step ' + workflowStepKey + ' is not defined in the condition configuration.',
                        });
                        return;
                    }
                    var deliberationConfig = workflowStep.deliberation || {};
                    var collectedInfo = {
                        experiment: experiment,
                        condition: condition,
                        subjectCondition: subjectCondition,
                        taskCount: taskCount,
                        workflowKey: workflowKey,
                        workflow: workflow,
                        workflowIndex: workflowIndex,
                        workflowStepKey: workflowStepKey,
                        workflowStep: workflowStep,
                        deliberationConfig: deliberationConfig,
                    };
                    if (deliberationConfig.enabled) {
                        that.routeNextDeliberation(function(deliberation, error) {
                            if (error && !error.noDeliberationAvailable) {
                                callback(undefined, error);
                                return;
                            }
                            if (deliberation) {
                                window.data_id = deliberation.getRelationships('data').id;
                            }
                            collectedInfo.deliberation = deliberation;
                            collectInfoForDataObject(collectedInfo);
                        });
                    }
                    else {
                        collectInfoForDataObject(collectedInfo);
                    }
                });
            });
        });
    }
    else {
        collectInfoForDataObject();
    }
    function collectInfoForDataObject(collectedInfo) {
        collectedInfo = collectedInfo || {};
        that.response().getForContext(function(responses, error) {
            if (error) {
                callback(undefined, error);
                return;
            }
            that.task().get(task_id, function(task, error) {
                if (error) {
                    callback(undefined, error);
                    return;
                }
                that.taskconfiguration().getForContext(function(taskConfigurations, error) {
                    if (error) {
                        callback(undefined, error);
                        return;
                    }
                    if (taskConfigurations.length > 0) {
                        var taskConfiguration = taskConfigurations[0];
                    }
                    else {
                        var taskConfiguration = that.taskconfiguration().init();
                        taskConfiguration.configuration = {};
                    }
                    if (window.data_id > 0) {
                        that.setActiveContextId('Data', window.data_id);
                        getDataAnnotationsAndLabelDefinitionItems();
                    }
                    else {
                        if (collectedInfo.deliberationConfig.enabled && !collectedInfo.deliberationConfig.keep_labeling_if_no_deliberation_available) {
                            callback(undefined, {
                                message: 'No deliberation available and labeling turned off for deliberation tasks.',
                                noDeliberationAvailable: true,
                            });
                            return;
                        }
                        that.routeNext(function(response, error) {
                            if (error) {
                                callback(undefined, error);
                                return;
                            }
                            var activeDataRecord = response.dataRecords[0];
                            that.setActiveContextId('Data', activeDataRecord.data_id);
                            getDataAnnotationsAndLabelDefinitionItems();
                        }, 1, collectedInfo.workflowStep.routing);
                    }
                    function getDataAnnotationsAndLabelDefinitionItems() {
                        that.data().get(that.getActiveContextId('Data'), function(data, error) {
                            if (error) {
                                callback(undefined, error);
                                return;
                            }
                            var annotationsFilter = that.annotation().getContextFilter();
                            if (collectedInfo.deliberation) {
                                delete annotationsFilter['session'];
                            }
                            that.annotation().get({ filter: annotationsFilter }, function(annotations, error) {
                                if (error) {
                                    callback(undefined, error);
                                    return;
                                }
                                that.tasklabeldefinitionitem().get({ filter: { task: task.id } }, function(taskLabelDefinitionItems, error) {
                                    if (error) {
                                        callback(undefined, error);
                                        return;
                                    }
                                    var taskLabelDefinitionItemsByLabel = {};
                                    if (task.labels) {
                                        task.labels.forEach(function(entry) {
                                            taskLabelDefinitionItemsByLabel[entry.key] = [];
                                        });
                                        taskLabelDefinitionItems.forEach(function(item) {
                                            taskLabelDefinitionItemsByLabel[item.label].push(item);
                                        });
                                    }
                                    else {
                                        taskLabelDefinitionItemsByLabel = taskLabelDefinitionItems;
                                    }
                                    collectedInfo.responses = responses;
                                    collectedInfo.task = task;
                                    collectedInfo.taskConfiguration = taskConfiguration;
                                    collectedInfo.data = data;
                                    collectedInfo.annotations = annotations;
                                    collectedInfo.taskLabelDefinitionItems = taskLabelDefinitionItems;
                                    that.infoForTask = collectedInfo;
                                    callback(that.infoForTask);
                                });
                            });
                        });
                    }
                });
            });
        });
    }
}

CrowdCurioClient.prototype.updateProgressBar = function() {
    var that = this;
    if (!that.infoForTask) {
        return;
    }
    if (!that.infoForTask.responses) {
        return;
    }
    if (!that.infoForTask.condition) {
        return;
    }
    if (!that.infoForTask.workflowStep.batch_size) {
        return;
    }
    $('#task-progress-bar .tasks-completed').html(that.infoForTask.responses.length + 1);
    $('#task-progress-bar .tasks-total').html(that.infoForTask.workflowStep.batch_size);
};

CrowdCurioClient.prototype.initializeDeliberation = function() {
    var that = this;
    if (!that.infoForTask) {
        return;
    }
    if (!that.infoForTask.deliberation) {
        return;
    }
    if (!window.initializeDeliberationForTaskAndDataType) {
        console.error('Could not initialize deliberation because global function "initializeDeliberationForTaskAndDataType" is not defined.')
        return;
    }
    if (!window.initializeDeliberation) {
        console.error('Could not initialize deliberation because global function "initializeDeliberation" is not defined.')
        return;
    }
    var deliberationConfig = that.infoForTask.deliberationConfig || {};
    var deliberationInitializationOptions = {
        deliberationId: that.infoForTask.deliberation.id,
        readOnly: deliberationConfig.read_only || false,
        hideBackToProjectPageButton: true,
        hideCloseDeliberationButton: true,
        showCompleteButton: true,
        leave: leaveDeliberation,
        instructions: deliberationConfig.instructions,
        allowChangeOfLabelAtAnyTime: deliberationConfig.allow_change_of_label_at_any_time,
        askToReconsiderLabelAndConfidenceAtTheEnd: deliberationConfig.ask_to_reconsider_label_and_confidence_at_the_end,
        reconsiderLabelInstructions: deliberationConfig.reconsider_label_instructions,
        additionalLabelOptions: deliberationConfig.additional_label_options,
        showInitialVotes: deliberationConfig.show_initial_votes,
        showAllVoteUpdates: deliberationConfig.show_all_vote_updates,
        showCurrentVotes: deliberationConfig.show_current_votes,
        numMessagesRequired: deliberationConfig.num_messages_required,
        questionsBeforeSubmission: deliberationConfig.questions_before_submission,
    };
    window.initializeDeliberationForTaskAndDataType(deliberationInitializationOptions);
    window.initializeDeliberation(deliberationInitializationOptions);
    function leaveDeliberation(answers) {
        var responseContent = {
            completed: true,
        };
        if (answers) {
            responseContent.questions_before_submission = answers;
        }
        that.submitResponseAndLoadNextStep(responseContent);
    }
};

CrowdCurioClient.prototype.saveTaskConfiguration = function(key, value) {
    var that = this;
    if (!that.infoForTask) {
        return;
    }
    if (!that.infoForTask.taskConfiguration) {
        return;
    }
    that.infoForTask.taskConfiguration.configuration[key] = value;
    that.infoForTask.taskConfiguration.save();
};

CrowdCurioClient.prototype.getTaskConfiguration = function(key) {
    var that = this;
    if (!that.infoForTask) {
        return;
    }
    if (!that.infoForTask.taskConfiguration) {
        return;
    }
    return that.infoForTask.taskConfiguration.configuration[key];
};

CrowdCurioClient.prototype.submitResponseAndLoadNextStep = function(responseContent) {
    var that = this;
    response = that.response().init();
    if (responseContent) {
        response.content = responseContent;
    }
    else {
        response.content = {
            completed: true,
        };
    }
    if (that.infoForTask && that.infoForTask.deliberation) {
        response.setRelationship('deliberation', that.infoForTask.deliberation);
    }
    response.save(function(response, error) {
        if (error) {
            alert(error.message);
            return;
        }
        else {
            if (window.experiment_id && that.infoForTask && that.infoForTask.responses && that.infoForTask.condition && that.infoForTask.workflowStep.batch_size && that.infoForTask.responses.length + 1 >= that.infoForTask.workflowStep.batch_size) {
                incrementExperimentWorkflowIndex(csrftoken, user_id, experiment_id);
            }
            else {
                window.location = location.href.replace(location.hash, "");
            }
        }
    });
};

CrowdCurioClient.prototype.toModelInstance = function(data) {
    var ModelInstanceConstructor = CrowdCurioClient.ModelInstance;
    if (data.attributes && data.attributes.field_dict) {
        ModelInstanceConstructor = CrowdCurioClient.Version;
    }
    else if (data.type && CrowdCurioClient.modelTypes.indexOf(data.type) >= 0) {
        ModelInstanceConstructor = CrowdCurioClient[data.type];
    }
    return new ModelInstanceConstructor(data, this);
};

CrowdCurioClient.prototype.parse = function(data) {
    var that = this;
    if (data.length !== undefined && data.length >= 0) {
        return data.map(function(dataInstance) {
            return that.toModelInstance(dataInstance);
        });
    }
    return that.toModelInstance(data);
};

CrowdCurioClient.ModelInstance = function(data, client) {
    this.setClient(client);
    if (data) {
        this.parseJSONAPIRepresentation(data);
    }
    else {
        this.initialize();
    }
};

CrowdCurioClient.ModelInstance.prototype.getClient = function() {
    return this.__client__;
}

CrowdCurioClient.ModelInstance.prototype.setClient = function(client) {
    this.__client__ = client;
}

CrowdCurioClient.ModelInstance.prototype.initialize = function() {
    var that = this;
    var data = {
        attributes: {},
    };
    this.parseJSONAPIRepresentation(data);
    var clientDefaultRelationships = that.getClient().defaultRelationships();
    if (this.defaultRelationships) {
        for (relationshipField in this.defaultRelationships) {
            var relationshipFunctionKey = this.defaultRelationships[relationshipField];
            var relationshipFunction = clientDefaultRelationships[relationshipFunctionKey];
            if (relationshipFunction) {
                relationship = relationshipFunction();
                if (relationship.type !== undefined && relationship.id !== undefined) {
                    if (relationship.type == 'string') {
                        that[relationshipField] = relationship.id;
                    }
                    else {
                        that.setRelationship(relationshipField, relationship.type, relationship.id);                        
                    }
                }
            }
        }
    }
}

CrowdCurioClient.ModelInstance.prototype.parseJSONAPIRepresentation = function(data) {
    // reset properties
    for (propertyName in this) {
        if (this.hasOwnProperty(propertyName)) {
            if (propertyName == '__client__') {
                continue;
            }
            delete this[propertyName];
        }
    }
    // create a deep copy of the data to encapsulate state
    this.__data__ = JSON.parse(JSON.stringify(data));
    if (this.__data__.id !== undefined) {
        this.id = parseInt(this.__data__.id);
    }
    if (this.__data__.attributes !== undefined) {
        for (key in this.__data__.attributes) {
            this[key] = this.__data__.attributes[key];
        }
    }
    if (this.created) {
        this.created = new Date(this.created);
    }
    if (this.updated) {
        this.updated = new Date(this.updated);
    }
    return this;
}

CrowdCurioClient.ModelInstance.prototype.getJSONAPIRepresentation = function() {
    this.__data__.attributes = this.__data__.attributes || {};
    for (propertyName in this) {
        if (
                propertyName == '__data__'
            ||  propertyName == '__client__'
            ||  propertyName == '__instance_type__'
        ) {
            continue;
        }
        if (this.hasOwnProperty(propertyName)) {
            this.__data__.attributes[propertyName] = this[propertyName];
        }
    }
    if (this.__data__.attributes.id) {
        this.__data__.id = this.__data__.attributes.id;
        delete this.__data__.attributes.id;
    }
    this.__data__.type = this.getType();
    return this.__data__;
}

CrowdCurioClient.ModelInstance.prototype.getType = function() {
    return this.__data__.type;
}

CrowdCurioClient.ModelInstance.prototype.setRelationship = function(field, type, id) {
    var that = this;
    var relationships = that.__data__.relationships || {};
    that.__data__.relationships = relationships;
    relationships[field] = {
        data: that.constructRelationship(type, id),
    };
    return that;
}

CrowdCurioClient.ModelInstance.prototype.addRelationship = function(field, type, id) {
    var that = this;
    var relationships = that.__data__.relationships || {};
    that.__data__.relationships = relationships;
    if (!relationships[field] || !relationships[field].data) {
        that.setRelationship(field, type, id);
        return that;
    }
    if (!relationships[field].data.length) {
        relationships[field].data = [relationships[field].data];
    }
    var newRelationships = that.constructRelationship(type, id);
    if (!newRelationships.length) {
        newRelationships = [newRelationships];
    }
    var existingRelationShipsById = {};
    relationships[field].data.forEach(function(existingRelationShip) {
        existingRelationShipsById[existingRelationShip.id] = existingRelationShip;
    });
    newRelationships.forEach(function(newRelationship) {
        if (!existingRelationShipsById[newRelationship.id]) {
            relationships[field].data.push(newRelationship);
        }
    });
    if (relationships[field].data.length == 1) {
        relationships[field].data = relationships[field].data[0];
    }
    return that;
}

CrowdCurioClient.ModelInstance.prototype.resetRelationship = function(field) {
    var that = this;
    var relationships = that.__data__.relationships || {};
    that.__data__.relationships = relationships;
    delete relationships[field];
    return that;
}

CrowdCurioClient.ModelInstance.prototype.constructRelationship = function(type, id) {
    var that = this;
    if (id !== undefined) {
        if (id.constructor === Array) {
            var relationship = [];
            var ids = id;
            ids.forEach(function(id) {
                relationship.push(that.constructRelationship(type, id));
            });
            return relationship;
        }
        return {
            type: type,
            id: id,
        };
    }
    else {
        var instance = type;
        if (instance.constructor === Array) {
            var relationship = [];
            var instances = instance;
            instances.forEach(function(instance) {
                relationship.push(that.constructRelationship(instance));
            });
            return relationship;
        }
        return {
            type: instance.getType(),
            id: instance.id,
        };
    }
}

CrowdCurioClient.ModelInstance.prototype.getRelationships = function(type) {
    if (!this.__data__.relationships) {
        return;
    }
    if (type && this.__data__.relationships[type] && this.__data__.relationships[type].data) {
        return this.getClient().parse(this.__data__.relationships[type].data);
    }
    var relationships = {};
    for (type in this.__data__.relationships) {
        if (this.__data__.relationships[type].data) {
            relationships[type] = this.getClient().parse(this.__data__.relationships[type].data);
        }
    }
    return relationships;
}

CrowdCurioClient.ModelInstance.prototype.getAPIEndpoint = function(method) {
    return '/api/' + this.getType().toLowerCase() + '/';
}

CrowdCurioClient.ModelInstance.prototype.getAPIEndpointForInstance = function(id, method) {
    id = id || this.id;
    return this.getAPIEndpoint(method) + id + '/'
}

CrowdCurioClient.ModelInstance.prototype.getAPIEndpointForInstanceHistory = function(id) {
    return this.getAPIEndpointForInstance(id) + 'history/'
}

CrowdCurioClient.ModelInstance.prototype.update = function(attributes) {
    var that = this;
    // create a deep copy of the attributes to encapsulate state
    attributes = attributes || {};
    attributes = JSON.parse(JSON.stringify(attributes));
    for (key in attributes) {
        that[key] = attributes[key];
    }
    return that;
}

CrowdCurioClient.ModelInstance.prototype.save = function(callback) {
    var that = this;
    request = {
        data: that.getJSONAPIRepresentation(),
    }
    var method = 'POST'
    var endpoint = that.getAPIEndpoint(method);
    if (that.id) {
        method = 'PUT',
        endpoint = that.getAPIEndpointForInstance();
    }
    that.getClient().makeAPICall(method, endpoint, request)
    .done(function(response) {
        if (response.apiCallSuppressedBecauseReadOnlyModeEnabled) {
            callback && callback(that);
            return;
        }
        that.parseJSONAPIRepresentation(response.data);
        callback && callback(that);
    })
    .fail(function(response) {
        callback && callback(undefined, {
            message: that.getType() + ' could not be saved.',
            response: response,
        });
    });
}

CrowdCurioClient.ModelInstance.prototype.delete = function(callback) {
    var that = this;
    if (!that.id) {
        console.log(that.getType() + ' must be saved first before it can be deleted.');
        return;
    }
    that.getClient()[that.getType().toLowerCase()]().delete(that.id, function(response, error) {
        if (!error) {
            delete that.id;
            delete that.__data__.id;
        }
        callback && callback(response, error);
    });
}

CrowdCurioClient.ModelInstance.prototype.isIdenticalWith = function(otherInstance) {
    var that = this;
    if (that.getType() !== otherInstance.getType()) return false;
    if (JSON.stringify(that.getJSONAPIRepresentation()) !== JSON.stringify(otherInstance.getJSONAPIRepresentation())) return false;
    return true;
};

CrowdCurioClient.Version = function Version(data, client) {
    CrowdCurioClient.ModelInstance.call(this, data, client);
    this.__instance_type__ = data.type;
};
CrowdCurioClient.Version.prototype = Object.create(CrowdCurioClient.ModelInstance.prototype);
CrowdCurioClient.Version.prototype.getType = function() {
    return 'Version';
}
CrowdCurioClient.Version.prototype.getInstanceType = function() {
    return this.__instance_type__;
}
CrowdCurioClient.Version.prototype.getInstanceId = function() {
    return this.field_dict.id;
}
CrowdCurioClient.Version.prototype.getInstance = function() {
    var that = this;
    var attributes = JSON.parse(JSON.stringify(that.field_dict));
    delete attributes.id;
    var relationships = {}
    for (key in attributes) {
        if (key.endsWith('_id')) {
            var keyStripped = key.slice(0, -3);
            relationships[keyStripped] = {
                id: attributes[key],
            }
            delete attributes[key];
        }
    }
    var data = {
        attributes: attributes,
        type: that.getInstanceType(),
        id: that.getInstanceId(),
        relationships: relationships,
    }
    return new CrowdCurioClient[this.__instance_type__](data, this.__client__);
}

CrowdCurioClient.modelTypes = [
    'User', 'Profile', 'Project', 'Curio', 'Task', 'Response', 'Annotation',
    'Data', 'Dataset', 'Datarecord', 'Training', 'Resource', 'Experiment',
    'ExperimentFeedback', 'Condition', 'ExperimentMember', 'SubjectCondition',
    'TaskConfiguration', 'TaskDataConfiguration', 'ExperimentConfirmationCode',
    'BonusPayment', 'DeliberationSession', 'Deliberation', 'Reference',
    'DataHighlight', 'Message', 'MessageReferenceAssignment', 'DeliberationStatus',
    'DeliberationStatusMessageAssignment', 'TaskLabelDefinitionItem',
];

CrowdCurioClient.modelTypes.forEach(function(modelType) {
    CrowdCurioClient[modelType] = new Function(
        "return function " + modelType + "(data, client) {\n" +
        "    CrowdCurioClient.ModelInstance.call(this, data, client);\n" +
        "};"
    )();
    CrowdCurioClient[modelType].prototype = Object.create(CrowdCurioClient.ModelInstance.prototype);
    CrowdCurioClient[modelType].prototype.getType = function() {
        return modelType;
    }
    var modelTypeLowerCase = modelType.toLowerCase();
    CrowdCurioClient.prototype[modelTypeLowerCase] = function() {
        var client = this;
        return {
            init: function(attributes) {
                modelInstance = new CrowdCurioClient[modelType](undefined, client);
                modelInstance.update(attributes);
                return modelInstance;
            },
            getHistory: function(id, callback) {
                if (!callback) {
                    console.log('Please provide a callback function.');
                    return;
                }
                var endpoint = client[modelTypeLowerCase]().init().getAPIEndpointForInstanceHistory(id);
                client.makeAPICall('GET', endpoint)
                    .done(function(response) {
                        var versions = client.parse(response.data).reverse();
                        callback(versions);
                    })
                    .fail(function(response) {
                        callback(undefined, {
                            message: 'API request to retrieve history for ' + modelType + ' (ID = ' + id + ') failed.',
                            response: response,
                        });
                    });
            },
            subscribeToHistory: function(id, callbacks, options) {
                var subscribed = true;
                var timeoutId;
                var numberOfFailedAttempts = 0;
                var isFirstPoll = true;
                var options = options || {};

                var onVersionAdded = callbacks.onVersionAdded || function() {};
                var onRemoved = callbacks.onRemoved || function() {};
                var onError = callbacks.onError || function() {};
                var onFailure = callbacks.onFailure || function() {};
                var onPoll = callbacks.onPoll || function() {};

                var pollIntervalInMilliSeconds = options.pollIntervalInMilliSeconds || 3000;
                var numberOfAttemptsUntilFailure = options.numberOfAttemptsUntilFailure || 10;
                var versionsFromLastPoll = [];
                var versionsFromLastPollById = {};

                (function poll(){
                    timeoutId = setTimeout(function(){
                        client[modelTypeLowerCase]().getHistory(id, function(versions, error) {
                            if (!subscribed) return;
                            onPoll(versions, error);
                            if (error) {
                                onError(error);
                                numberOfFailedAttempts += 1;
                                if (numberOfAttemptsUntilFailure > 0 && numberOfFailedAttempts >= numberOfAttemptsUntilFailure) {
                                    unsubscribe();
                                    onFailure();
                                    return;
                                }
                            }
                            else {
                                numberOfFailedAttempts = 0;
                                var versionsById = {};
                                versions.forEach(function(version) {
                                    versionsById[version.id] = version;
                                });
                                if (versions.length == 0 && versionsFromLastPoll.length > 0) {
                                    unsubscribe();
                                    onRemoved(versionsFromLastPoll);
                                    return;
                                }
                                versions.forEach(function(version) {
                                    if (!versionsFromLastPollById[version.id]) {
                                        onVersionAdded(version);
                                    }
                                });
                                versionsFromLastPoll = versions;
                                versionsFromLastPollById = versionsById;
                            }
                            poll();
                        });
                    }, isFirstPoll ? 0 : pollIntervalInMilliSeconds);
                    isFirstPoll = false;
                })();

                function unsubscribe() {
                    if (!subscribed) {
                        return;
                    }
                    subscribed = false;
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                        timeoutId = undefined;
                    }
                }

                return {
                    unsubscribe: unsubscribe,
                }
            },
            get: function(options, callback) {
                if (!callback) {
                    callback = options;
                    options = {}
                }
                if (!callback) {
                    console.log('Please provide a callback function.');
                    return;
                }
                if (options > 0) {
                    var id = options;
                    var endpoint = client[modelTypeLowerCase]().init().getAPIEndpointForInstance(id);
                    client.makeAPICall('GET', endpoint)
                        .done(function(response) {
                            callback(client.parse(response.data));
                        })
                        .fail(function(response) {
                            callback(undefined, {
                                message: 'API request to retrieve ' + modelType + ' (ID = ' + id + ') failed.',
                                response: response,
                            });
                        });
                    return;
                }
                var request = {
                    page: 1,
                }
                options.filter = options.filter || {};
                for (propertyName in options.filter) {
                    request[propertyName] = options.filter[propertyName];
                }
                var endpoint = client[modelTypeLowerCase]().init().getAPIEndpoint('GET');
                var allModelInstances = [];
                function getNextPage() {
                    client.makeAPICall('GET', endpoint, request)
                        .done(function(response) {
                            var modelInstances = client.parse(response.data);
                            Array.prototype.push.apply(allModelInstances, modelInstances);
                            if (
                                (options.limit === undefined || allModelInstances.length < options.limit)
                                && response.meta && response.meta.pagination
                                && response.meta.pagination.page < response.meta.pagination.pages
                            ) {
                                request.page += 1;
                                getNextPage();
                            }
                            else {
                                if (options.limit >= 0) {
                                    allModelInstances = allModelInstances.slice(0, options.limit);
                                }
                                callback(allModelInstances);
                            }
                        })
                        .fail(function(response) {
                            callback(undefined, {
                                message: 'API request to retrieve ' + modelType + ' objects failed.',
                                response: response,
                            });
                        });
                }
                getNextPage();
            },
            getContextFilter: function() {
                var filter = {};
                var modelInstance = client[modelTypeLowerCase]().init();
                var clientDefaultRelationships = client.defaultRelationships();
                if (modelInstance.defaultRelationships) {
                    for (relationshipField in modelInstance.defaultRelationships) {
                        var relationshipFunctionKey = modelInstance.defaultRelationships[relationshipField];
                        var relationshipFunction = clientDefaultRelationships[relationshipFunctionKey];
                        if (relationshipFunction) {
                            relationship = relationshipFunction();
                            if (relationship.type !== undefined && relationship.id !== undefined) {
                                filter[relationshipField] = relationship.id;
                            }
                        }
                    }
                }
                return filter;
            },
            getForContext: function(options, callback) {
                if (!callback) {
                    callback = options;
                    options = {}
                }
                options.filter = options.filter || {};
                var modelTypeClient = client[modelTypeLowerCase]();
                var filter = modelTypeClient.getContextFilter();
                for (key in filter) {
                    options.filter[key] = filter[key];
                }
                modelTypeClient.get(options, callback);
            },
            subscribe: function(options, callbacks) {
                var subscribed = true;
                var timeoutId;
                var numberOfFailedAttempts = 0;
                var isFirstPoll = true;

                var onAdded = callbacks.onAdded || function() {};
                var onChanged = callbacks.onChanged || function() {};
                var onRemoved = callbacks.onRemoved || function() {};
                var onError = callbacks.onError || function() {};
                var onFailure = callbacks.onFailure || function() {};
                var onPoll = callbacks.onPoll || function() {};

                var pollIntervalInMilliSeconds = options.pollIntervalInMilliSeconds || 3000;
                var numberOfAttemptsUntilFailure = options.numberOfAttemptsUntilFailure || 10;
                var instancesFromLastPoll = [];
                var instancesFromLastPollById = {};

                (function poll(){
                    timeoutId = setTimeout(function(){
                        client[modelTypeLowerCase]().get(options, function(instances, error) {
                            if (!subscribed) return;

                            onPoll(instances, error);
                            if (error) {
                                onError(error);
                                numberOfFailedAttempts += 1;
                                if (numberOfAttemptsUntilFailure > 0 && numberOfFailedAttempts >= numberOfAttemptsUntilFailure) {
                                    unsubscribe();
                                    onFailure();
                                    return;
                                }
                            }
                            else {
                                numberOfFailedAttempts = 0;

                                var instancesById = {};
                                instances.forEach(function(instance) {
                                    instancesById[instance.id] = instance;
                                });

                                var instancesAdded = [];
                                var instancesChanged = [];
                                var instancesRemovedIds = [];

                                instances.forEach(function(instance) {
                                    if (!instancesFromLastPollById[instance.id]) {
                                        instancesAdded.push(instance);
                                    }
                                });
                                instancesFromLastPoll.forEach(function(instanceFromLastPoll) {
                                    var instance = instancesById[instanceFromLastPoll.id];
                                    if (!instance) {
                                        instancesRemovedIds.push(instanceFromLastPoll.id);
                                    }
                                    else if (!instance.isIdenticalWith(instanceFromLastPoll)) {
                                        instancesChanged.push(instance);
                                    }
                                });

                                if (instancesAdded.length) {
                                    onAdded(instancesAdded);
                                }
                                if (instancesChanged.length) {
                                    onChanged(instancesChanged);
                                }
                                if (instancesRemovedIds.length) {
                                    onRemoved(instancesRemovedIds);
                                }

                                instancesFromLastPoll = instances;
                                instancesFromLastPollById = instancesById;
                            }
                            poll();
                        });
                    }, isFirstPoll ? 0 : pollIntervalInMilliSeconds);
                    isFirstPoll = false;
                })();

                function unsubscribe() {
                    if (!subscribed) {
                        return;
                    }
                    subscribed = false;
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                        timeoutId = undefined;
                    }
                }

                return {
                    unsubscribe: unsubscribe,
                }
            },
            delete: function(id, callback) {
                client
                    .makeAPICall('DELETE', client[modelTypeLowerCase]().init().getAPIEndpointForInstance(id))
                    .done(function(response) {
                        callback && callback(response);
                    })
                    .fail(function(response) {
                        callback && callback(undefined, {
                            message: modelType + ' (ID = ' + id + ') could not be deleted.',
                            response: response,
                        });
                    });
            },
        }
    }
})

CrowdCurioClient.Profile.prototype.getAPIEndpoint = function () {
    return '/api/user/profile/';
}

CrowdCurioClient.Response.prototype.getAPIEndpoint = function(method) {
    var methodLowerCase = method.toLowerCase();
    if (methodLowerCase == 'get') {
        return '/api/response/history/';
    }
    return '/api/response/';
}

CrowdCurioClient.Response.prototype.getAPIEndpointForInstance = function(id) {
    id = id || this.id;
    return '/api/response/' + id + '/';
}

CrowdCurioClient.Response.prototype.defaultRelationships = {
    owner: 'activeUser',
    data: 'activeData',
    task: 'activeTask',
    curio: 'activeCurio',
    experiment: 'activeExperiment',
    condition: 'activeCondition',
    session: 'activeSession',
}

CrowdCurioClient.Annotation.prototype.defaultRelationships = {
    owner: 'activeUser',
    data: 'activeData',
    task: 'activeTask',
    curio: 'activeCurio',
    experiment: 'activeExperiment',
    condition: 'activeCondition',
    session: 'activeSession',
}

CrowdCurioClient.Experiment.prototype.defaultRelationships = {
    experiment: 'activeExperiment',
}

CrowdCurioClient.Condition.prototype.defaultRelationships = {
    experiment: 'activeExperiment',
    condition: 'activeCondition',
}

CrowdCurioClient.SubjectCondition.prototype.defaultRelationships = {
    experiment: 'activeExperiment',
    condition: 'activeCondition',
    user: 'activeUser',
}

CrowdCurioClient.TaskConfiguration.prototype.defaultRelationships = {
    owner: 'activeUser',
    task: 'activeTask',
}

CrowdCurioClient.TaskConfiguration.prototype.getAPIEndpoint = function () {
    return '/api/task/config/';
}

CrowdCurioClient.TaskDataConfiguration.prototype.defaultRelationships = {
    owner: 'activeUser',
    data: 'activeData',
    task: 'activeTask',
}

CrowdCurioClient.TaskDataConfiguration.prototype.getAPIEndpoint = function () {
    return '/api/task/config/data/';
}

CrowdCurioClient.DeliberationSession.prototype.getAPIEndpoint = function () {
    return '/api/deliberation/session/';
}

CrowdCurioClient.Deliberation.prototype.defaultRelationships = {
    data: 'activeData',
    task: 'activeTask',
}

CrowdCurioClient.DataHighlight.prototype.defaultRelationships = {
    owner: 'activeUser',
    data: 'activeData',
    deliberation: 'activeDeliberation',
}

CrowdCurioClient.DataHighlight.prototype.getAPIEndpoint = function () {
    return '/api/data/highlight/';
}

CrowdCurioClient.Message.prototype.defaultRelationships = {
    owner: 'activeUser',
    deliberation: 'activeDeliberation',
}

CrowdCurioClient.MessageReferenceAssignment.prototype.getAPIEndpoint = function () {
    return '/api/message/reference/';
}

CrowdCurioClient.DeliberationStatus.prototype.defaultRelationships = {
    owner: 'activeUser',
    deliberation: 'activeDeliberation',
}

CrowdCurioClient.DeliberationStatus.prototype.getAPIEndpoint = function () {
    return '/api/deliberation/status/';
}

CrowdCurioClient.DeliberationStatusMessageAssignment.prototype.defaultRelationships = {
    owner: 'activeUser',
    status: 'activeDeliberationStatus',
}

CrowdCurioClient.DeliberationStatusMessageAssignment.prototype.getAPIEndpoint = function () {
    return '/api/deliberation/status/message/';
}

CrowdCurioClient.TaskLabelDefinitionItem.prototype.defaultRelationships = {
    owner: 'activeUser',
    task: 'activeTask',
    deliberation: 'activeDeliberation',
}

CrowdCurioClient.TaskLabelDefinitionItem.prototype.getAPIEndpoint = function () {
    return '/api/task/label/definition/item/';
}

module.exports = CrowdCurioClient;
