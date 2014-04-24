/*
 * (C) Copyright 2013-2014 Kurento (http://kurento.org/)
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Lesser General Public License
 * (LGPL) version 2.1 which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/lgpl-2.1.html
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 */

var extend   = require('extend');
var inherits = require('inherits');

var checkType = require('../checkType');


/**
 * Media API for the Kurento Web SDK
 *
 * @module kwsMediaApi/hubs
 *
 * @copyright 2013-2014 Kurento (http://kurento.org/)
 * @license LGPL
 */

var Hub = require('../Hub');


/**
 * A :rom:cls:`Hub` that allows routing between arbitrary port pairs
 *
 * @class   module:kwsMediaApi/hubs~Dispatcher
 * @extends module:kwsMediaApi~Hub
 */

/**
 * Create a :rom:cls:`Dispatcher` belonging to the given pipeline.
 *
 * @constructor
 *
 * @param {string} id
 * @param {module:kwsMediaApi~MediaContainer} parent
 * @param {module:kwsMediaApi~MediaPipeline} pipeline
 * @param {module:kwsMediaApi/hubs~Dispatcher.constructorParams} params
 */
function Dispatcher(id, parent, pipeline, params)
{
  Hub.call(this, id, parent, pipeline, params);
};
inherits(Dispatcher, Hub);


/**
 * Connects each corresponding :rom:enum:`MediaType` of the given source port with the sink port.
 *
 * @param {HubPort} source
 *  Source port to be connected
 *
 * @param {HubPort} sink
 *  Sink port to be connected
 *
 * @param {module:kwsMediaApi/hubs~Dispatcher.connectCallback} [callback]
 *
 * @return {module:kwsMediaApi/hubs~Dispatcher}
 *  The own media object
 */
Dispatcher.prototype.connect = function(source, sink, callback){
  checkType('HubPort', 'source', source, {required: true});
  checkType('HubPort', 'sink', sink, {required: true});

  var params = {
    source: source,
    sink: sink,
  };

  this.invoke('connect', params, callback);

  return this;
};
/**
 * @callback Dispatcher~connectCallback
 * @param {Error} error
 */

/**
 * @type   module:kwsMediaApi/hubs~Dispatcher.constructorParams
 * @extend module:kwsMediaApi~Hub.constructorParams
 *
 * @property {MediaPipeline} mediaPipeline
 *  the :rom:cls:`MediaPipeline` to which the dispatcher belongs
 */
Dispatcher.constructorParams = {
  mediaPipeline: {
    type: 'MediaPipeline',
    required: true
  },
};
extend(Dispatcher.constructorParams, Hub.constructorParams);

/**
 * @type   module:kwsMediaApi/hubs~Dispatcher.events
 * @extend module:kwsMediaApi~Hub.events
 */
Dispatcher.events = [];
Dispatcher.events.concat(Hub.events);


/**
 *
 *
 * @param {module:kwsMediaApi/hubs~Dispatcher.constructorParams} params
 */
Dispatcher.create = function(pipeline, params, callback)
{
  pipeline.createMediaElement('Dispatcher', params, callback);
};


module.exports = Dispatcher;