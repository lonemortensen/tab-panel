/* ====================================================================
Project:  Tab Panel
Author:  Lone Mortensen
Description:  The Tab Panel features a collection of tabs and 
associated panels. The content of each panel is reflected in the tab 
label. The tabs are clickable and enable users to navigate between 
panels and their contents. All tabs remain visible at all times, but 
only one panel - the one associated with the active tab’s label - 
is showing at a time. 
Built with: JavaScript, HTML5, CSS3, and Flexbox.

===== *** =====

==================================================================== */

/* ===== MODEL ===== */

/* Data model: Object stores tabs (keys) and their associated panels (values): */ 
let tabSets = {};

/* All tabs: */
const tabsList = document.getElementsByClassName("tab-link"); 
/* All panels: */
const panelsList = document.getElementsByClassName("panels"); 

/**
 * Loops through the tabs list and stores each tab as a property key and each 
 * associated panel link as a value in the tabSets object.
*/	
const getTabData = () => {
    for (let i = 0; i < tabsList.length; i++) {
        let tab = tabsList[i];
        let tabName = tab.id; 
        let panelLink = tab.hash; // Gets the anchor part of the href attribute value associated with current tab
        let panelLinkName = panelLink.replace("#", ""); // Removes # from the href attribute value
        tabSets[tabName] = panelLinkName;  
    };
};


/* ===== VIEW ===== */

/** 
 * Applies styling to hide all panels.
 * @param panels the panelsList variable selecting all the panels.
*/
const hidePanels = (panels) => {
    for (let i = 0; i < panels.length; i++) {
        let panel = panels[i];
        panel.classList.add("hide-panels");
    };    
};


/**
 * Applies styling to remove highlight from all tabs.
 * @param tabs the tabsList variable selecting all the tabs.
*/
const removeTabHighlight = (tabs) => {
    for (let i = 0; i < tabs.length; i++) {
        let tab = tabs[i];
        tab.classList.remove("highlight-tab"); 
    }; 
};


/** 
 * Adds a click event listener to each tab. 
 * Applies styling to highlight and display only the default (first) tab and panel on page load.
 * @param defaultTab the first (default) tab in the tabSets object.
 * @param defaultPanel the panel that is stored as the value of the default (first) tab in the tabSets object.
*/
const displayDefaultTabSet = (defaultTab, defaultPanel) => { 
    for (let i = 0; i < tabsList.length; i++) {
        let tab = tabsList[i];
        tab.addEventListener("click", handleTabSelection);
    };
    
    // Compares the default tab's id to the tab id's in the tabsList variable. If there's a match,
    // highlight styling is added to the tab: 
    for (let i = 0; i < tabsList.length; i++) {
        let tab = tabsList[i];
        let tabName = tab.id; 
        if (defaultTab.toLowerCase() == tabName.toLowerCase()) {
            tab.classList.add("highlight-tab"); 
        }; 
    };

    // Finds and displays the panel that matches the default panel link: 
    for (i = 0; i < panelsList.length; i++) {
        let panel = panelsList[i];
        let panelName = panel.id; 
        if (panelName.toLowerCase() == defaultPanel.toLowerCase()) {
            panel.classList.remove("hide-panels");
        };
    };
}; 


/** 
 * Applies styling to highlight user's selected tab and display the associated panel. 
 * @param selectedTab the tab name that matches the user's selection.
 * @param selectedPanel the panel that matches the user's selection. 
*/
const displaySelectedTabSet = (selectedTab, selectedPanel) => {
    // Finds matching tab in tabsList and adds highlight: 
    for (i = 0; i < tabsList.length; i++) {
        let tab = tabsList[i];
        let tabName = tab.id;
        if (tabName.toLowerCase() == selectedTab.toLowerCase()) {
            tab.classList.add("highlight-tab"); 
        };
    };

    // Finds matching panel in panelsList and displays panel: 
    for (i = 0; i < panelsList.length; i++) {
        let panel = panelsList[i];
        let panelName = panel.id;
        if (panelName.toLowerCase() == selectedPanel.toLowerCase()) {
            panel.classList.remove("hide-panels");
        };
    };
};


/* ===== CONTROLLER ===== */

/**
 * Adds event listener to window. 
 * Listens for page load and calls View to apply styling to hide all panels. 
 * Calls Model to access tabSets object in order to get the default tab-panel set.
 * Calls View and passes the default tab and panel to highlight and display.
*/
const handlePageLoad = () => {
    hidePanels(panelsList);
    getTabData();
    // Gets all tabs in the tabSets object:
    let tabsArray = Object.keys(tabSets);
    // Gets the first (default) tab in the tabSets object:
    let defaultTabName = tabsArray[0];
    // Gets the panel linked to the default tab:
    let defaultPanel = tabSets[defaultTabName];

    displayDefaultTabSet(defaultTabName, defaultPanel);
};

window.addEventListener("load", handlePageLoad);


/**
 * Listens for user click on tab.
 * Calls Model to access the tabSets object.
 * Gets the name (id attribute value) of the selected tab from the event object.
 * Gets the panel that matches the selected tab from the tabSets object.
 * Calls View to remove styling from the default tab and panel, and passes the selected 
 * tab-panel set for highlight and display. 
 * @param e the event object is used to access the id attribute value of the selected tab.  
*/
const handleTabSelection = (e) => {
    e.preventDefault();
    getTabData();
    let selectedTabName = e.target.id;
    let selectedPanel = tabSets[selectedTabName];

    hidePanels(panelsList); 
    removeTabHighlight(tabsList); 
    displaySelectedTabSet(selectedTabName, selectedPanel);
};