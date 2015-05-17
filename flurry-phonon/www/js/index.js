/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


    Phonon.Navigator({
            defaultPage: 'home',
            templatePath: 'tpl',
            
            hammer: {
                // path: 'vendors/hammer', // use this option only if you use Hammer.js with AMD
                tapOptions: { time: 1500, threshold: 8 } // Custom options for the tap event
            },
            pageAnimations: true,
            panels: {
                autoClose: true,
                // path: 'phonon/panels' // use this option only if you use panels.js with AMD
            }
            
    });


    Phonon.Navigator().on({page: 'home', template: 'home', asynchronous: false}, function(activity) {

        activity.onCreate(function(self, el) { });

        activity.onReady(function(self) { });

        activity.onTransitionEnd(function() { });

        activity.onQuit(function(self) { });

        activity.onHidden(function(el) { });
    });

    Phonon.Navigator().on({page: 'gallery', template: 'gallery', asynchronous: true}, function(activity) {

        activity.onCreate(function(self, el) { 
            self.runReady();
        });

        activity.onReady(function(self) { 
            self.startTransition();
        });

        activity.onTransitionEnd(function() { });

        activity.onQuit(function(self) { 
            self.quit();
        });

        activity.onHidden(function(el) { });
    });


    Phonon.Navigator().start('home');



var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.init();
    },

    init: function(){
            Phonon.Navigator().start('home');
    }
};
