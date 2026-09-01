/* =========================================
   SFX FLOW V3 - Analytics
   Visitor tracking foundation
   ========================================= */

// Count visits on this device
const visitKey = "sfx_flow_visits";
const firstVisitKey = "sfx_flow_first_visit";

let visits = Number(localStorage.getItem(visitKey) || 0);
visits++;

localStorage.setItem(visitKey, visits);

if (!localStorage.getItem(firstVisitKey)) {
    localStorage.setItem(firstVisitKey, new Date().toISOString());
}

// Basic visitor information
const visitorData = {
    visitNumber: visits,
    firstVisit: localStorage.getItem(firstVisitKey),
    lastVisit: new Date().toISOString(),
    page: window.location.pathname,
    screen: `${window.innerWidth}x${window.innerHeight}`,
    language: navigator.language,
    device: /Mobi|Android/i.test(navigator.userAgent)
        ? "Mobile"
        : "Desktop"
};

// Save locally
localStorage.setItem(
    "sfx_flow_visitor_data",
    JSON.stringify(visitorData)
);

// Make analytics available to the website
window.SFXAnalytics = {
    getVisits: function () {
        return Number(localStorage.getItem(visitKey) || 0);
    },

    getVisitorData: function () {
        return JSON.parse(
            localStorage.getItem("sfx_flow_visitor_data") || "{}"
        );
    }
};

console.log("SFX FLOW Analytics loaded");
console.log("Visits on this device:", window.SFXAnalytics.getVisits());
