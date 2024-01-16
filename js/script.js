/* ====================================================================
Project:  Tab Panel
Author:  Lone Mortensen
Description:  TBD

===== *** =====

==================================================================== */

/* ===== MODEL ===== */

/* Data model: Object stores tabs (keys) and their associated panels (values): */ 
let tabSets = {};

/**
 * Loops through the tabs list and stores each tab as a property key and each 
 * associated panel link as a value in the tabSets object.
*/	
/* All tabs: */
const tabsList = document.getElementsByClassName("tab-link"); // returns a live HTMLCollection
/* All panels: */
const panelsList = document.getElementsByClassName("panels"); // returns a live HTMLCollection
console.log(tabsList);
console.log(panelsList);

const getTabData = () => {
    for (let i = 0; i < tabsList.length; i++) {
        let tab = tabsList[i];
        let tabName = tab.id; // Gets the value of current tab's id attribute
        let panelLink = tab.hash; // Gets the anchor part of the href attribute value associated with current tab
        let panelLinkName = panelLink.replace("#", ""); // Removes # from the href attribute value
        console.log(tabName);
        console.log(panelLink);
        console.log(panelLinkName); //works, removed #
        tabSets[tabName] = panelLinkName; // Stores an object property key-value pair for each tab and associated panel 
    };
};

console.log(tabSets);

/* ===== VIEW ===== */

/** 
 * Applies styling to hide all panels.
 * @param panels the panelsList variable selecting all the panels.
*/
const hidePanels = (panels) => {
    for (let i = 0; i < panels.length; i++) {
        let panel = panels[i];
        panel.classList.add("hide-panels");
    }    
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
 * Applies styling to highlight and display only the default (first) tab and panel set on page load.
 * @param defaultTab the first (default) tab in the tabSets object.
 * @param defaultPanel the panel that is stored as the value of the default (first) tab in the tabSets object.
 */
const displayDefaultTabSet = (defaultTab, defaultPanel) => { 
    // Adds click event listener to each tab: 
    for (let i = 0; i < tabsList.length; i++) {
        let tab = tabsList[i];
        tab.addEventListener("click", handleTabSelection);
    };
    
    /* Compares the first (default) tab's name to the tab names in the tabsList variable. If there's a match,
    highlight styling is added to the tab: */
    for (let i = 0; i < tabsList.length; i++) {
        let tab = tabsList[i];
        let tabName = tab.id; // Gets value of current tab's id attribute
        console.log(tabName); // works, shows the value of the tab's id attribute
        console.log(defaultTab); // works, shows the value of the default tab's id attribute
        if (defaultTab == tabName) {
            tab.classList.add("highlight-tab"); 
        }; 
    };

    /* Finds and displays the panel that matches the default panel link: */
    for (i = 0; i < panelsList.length; i++) {
        let panel = panelsList[i];
        console.log(panel); //works, shows full panel <div>
        let panelName = panel.id;
        console.log(panelName); // works, shows the value of the panel's id 
        console.log(defaultPanel); // works, shows the default panel (html)
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
    /* Finds matching tab in tabsList and adds highlight: */
    for (i = 0; i < tabsList.length; i++) {
        let tab = tabsList[i];
        let tabName = tab.id;
        if (tabName == selectedTab) {
            tab.classList.add("highlight-tab"); 
        };
    };

    /* Finds matching panel in panelsList and displays panel: */
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
 * Adds event listener to window and listens for page load.
 * Listens for page load and calls View to apply styling to highlight first tab and display first panel.
 *  
*/
const handlePageLoad = () => {
    hidePanels(panelsList);
    getTabData();

    // Gets all tabs in the tabSets object:
    let tabsArray = Object.keys(tabSets);
    console.log(tabsArray);
    // Gets the first tab in the tabSets object:
    let defaultTabName = tabsArray[0];
    console.log(defaultTabName);
    // Gets  the panel linked to first tab:
    let defaultPanel = tabSets[defaultTabName];
    console.log(defaultPanel); //works, shows the value stored for the first key    

    displayDefaultTabSet(defaultTabName, defaultPanel);
};

window.addEventListener("load", handlePageLoad);


/**
 * Listens for user click on tab.
 * Gets the name (id attribute value) of the selected tab from the event object.
 * Gets the tab-panel set that matches the selected tab from the tabSets object.
 * Calls View to remove styling from default tab and hide default panel and passes the selected 
 * tab-panel set for display. 
 * @param e the event object is used to access the panel URL from the selected tab.  
*/
const handleTabSelection = (e) => {
    e.preventDefault();
    getTabData();
    console.log(e); 
    // Gets the event objects tab id and gets the associated panel from the tabSets object:
    let selectedTabName = e.target.id;
    console.log(selectedTabName); //works, logs the id of the tab (= object key)
    let selectedPanel = tabSets[selectedTabName];
    console.log(selectedPanel); //works, logs the value stored for the selected key

    // Calls View to hide all panels and remove all tab highlights:
    hidePanels(panelsList); 
    removeTabHighlight(tabsList); 
    // Calls View and passes selected panel set:
    displaySelectedTabSet(selectedTabName, selectedPanel);
};