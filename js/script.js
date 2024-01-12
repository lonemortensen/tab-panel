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
 * NOTE: Consider removing # in Model so value is simply the link name => don't have to remove anymore further down in code...
*/	
const tabsList = document.getElementsByClassName("tab-link"); // returns a live HTMLCollection
const panelsList = document.getElementsByClassName("panels"); // returns a live HTMLCollection
console.log(tabsList);
console.log(panelsList);

const getTabData = () => {
    for (let i = 0; i < tabsList.length; i++) {
        let tab = tabsList[i];
        let tabName = tab.id; // Gets value of current tab's id attribute
        let panelLink = tab.hash;
        //let panelLinkName = panelLink.replace("#", ""); // See NOTE above on removing #.
        console.log(tabName);
        tabSets[tabName] = panelLink;
        //tabSets[tabName] = panelLinkName; // See NOTE above on removing #.
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
 * @param tabSets the tabSets object. // NOTE: SHould the controller find the first tabSet and only pass that???
*/

const displayDefaultTabSet = (tabSets) => { 
    /* Adds click event listener to each tab: */
    for (let i = 0; i < tabsList.length; i++) {
        let tab = tabsList[i];
        tab.addEventListener("click", handleTabSelection);
    };
    
    // Gets all tabs in the tabSets object:
    let tabsArray = Object.keys(tabSets);
    console.log(tabsArray);
    // Gets the first tab in the tabSets object:
    let defaultTabName = tabsArray[0];
    console.log(defaultTabName);
        
    /* Compares the first tab's name to the tab names in the tabsList variable. If there's a match,
    highlight styling is added to the tab: */
    for (let i = 0; i < tabsList.length; i++) {
        let tab = tabsList[i];
        let tabName = tab.id; // Gets value of current tab's id attribute
        console.log(tabName);
        if (defaultTabName == tabName) {
            tab.classList.add("highlight-tab"); 
        }; 
    };

    // Gets  the panel linked to first tab:
    let defaultPanel = tabSets[defaultTabName];
    console.log(defaultPanel); //works, shows the hashtag (#html) stored as the value for the first key
    // Removes # from panel link:
    let defaultPanelLink = defaultPanel.replace("#", "");
    console.log(defaultPanelLink); //works, removes the #

    // Finds and displays the panel that matches the default panel link:
    for (i = 0; i < panelsList.length; i++) {
        let panel = panelsList[i];
        console.log(panel); //works, shows full panel div html
        let panelName = panel.id;
        console.log(panelName); // works, shows the value of the id 
        if (panelName.toLowerCase() == defaultPanelLink.toLowerCase()) {
            panel.classList.remove("hide-panels");
        };
    };
}; 

/** 
 * Applies styling to hide all panels.
 * Applies styling to remove highlight from all tabs.
 * Applies styling to highlight user's selected tab and display the associated panel. 
 * @param selectedTab the tab name that matches the user's selection.
 * @param selectedPanel the panel link that matches the user's selection. 
*/

const displaySelectedTabSet = (selectedTab, selectedPanel) => {
    hidePanels(panelsList);
    removeTabHighlight(tabsList);
    // Finds matching tab in tabsList and adds highlight:
    for (i = 0; i < tabsList.length; i++) {
        let tab = tabsList[i];
        let tabName = tab.id;
        if (tabName == selectedTab) {
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
 * Adds event listener to window and listens for page load.
 * Listens for page load and calls View to apply styling to highlight first tab and display first panel.
 *  
*/
const handlePageLoad = () => {
    hidePanels(panelsList);
    getTabData();
    displayDefaultTabSet(tabSets);    
};

window.addEventListener("load", handlePageLoad);


/**
 * Listens for user click on tab.
 * Gets the name (id attribute value) of the selected tab from the event object.
 * Calls Model to fetch the tab-panel set that matches the panel URL.
 * Calls View to remove styling from first tab and hide first panel and passes the matching 
 * tab-panel set for display. 
 * @param e the event object is used to access the panel URL from the selected tab.  
*/

const handleTabSelection = (e) => {
    e.preventDefault();
    getTabData();
    console.log(e); 
    // Gets the event objects tab id and panel link hashtag:
    let selectedTabName = e.target.id;
    console.log(selectedTabName); //works, logs the id of the tab (= object key)
    let selectedPanel = tabSets[selectedTabName];
    console.log(selectedPanel); //works, logs the hashtag (#) shown for the selected key
    let selectedPanelLink = selectedPanel.replace("#", "");
    console.log(selectedPanelLink); //works, removes the #
    // Calls view with selected panel set:
    //hidePanels(panelsList);
    displaySelectedTabSet(selectedTabName, selectedPanelLink);
};