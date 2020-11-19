import releasesInit from "./releases.js";
import highlightedInit from "./highlighted.js";

$(document).ready(async() => {
    await releasesInit();
    await highlightedInit();
});
