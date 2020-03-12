
import UIkit from 'node_modules/uikit/dist/js/uikit.js';
import Icons from 'node_modules/uikit/dist/js/uikit-icons.js';

// loads the Icon plugin
UIkit.use(Icons);

// components can be called from the imported UIkit reference
UIkit.notification('Hello world.');
// Global
app.global = {
    init: function(){ // Load all global functions here
        console.log("load global functions");
        app.global.loadHeader();
    },
    loadHeader: function(){ // Some specific function
        console.log("loadHeader()");
    }
}

// Run the global stuff
app.global.init();