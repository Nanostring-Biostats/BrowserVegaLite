const slideTrachea = require('./WTxBCobjects/slideperturbationbaseline.json');

import { addEListener, addSlidePolygon } from './nanostringUtils';

// Polygon objects for adding drawings over slide image
// In this case, we don't have a json with a set of coors for a
// large, free-hand drawn polygon. Instead, we just have 
// rectangles that highlight areas on the slide.
// Behavior is weird when some entries have compontns and others don't, so
// splitting into two lists (mask vs no mask).

const wypt7Polygons = {
    leftrectangle: {
        panCoord: { x: 0.1938, y: 0.4633 },    
        zoomRatio: 7.5279,
        ROIBox: [],
        maskName: ["CD8 cytotoxic effector T cell tumor core", "All tumor core cells"],
        channel: "Membrane"
    },
    rightrectangle: {
        panCoord: { x: 0.1938, y: 0.4633 },
        zoomRatio: 7.5279,
        ROIBox: [],
        maskName: ["CD8 cytotoxic effector T cell stromal", "All stromal cells"],
        chanel: "Membrane"
    }
}
const wypt9Polygons = {
    chr1rectangle: {
        panCoord: { x: 0.2764, y: 0.5818 }, 
        zoomRatio: 3.9027,
        ROIBox: [],
        maskName: ["CNV event Chr1"],
        channel: "Membrane"
    },
    chr19rectangle: {
        panCoord: { x: 0.2764, y: 0.5818 },
        zoomRatio: 3.9027,
        ROIBox: [],
        maskName: ["CNV event Chr19"],
        chanel: "Membrane"
    }
}

const wypt3Polygons = {
    baselinearea: {
        panCoord: { x:0.2742, y: 0.7826 }, 
        zoomRatio: 1.0505,
        ROIBox: [],
        maskName: ["Perturbation baseline"],
        channel: "Membrane"
    }
}

const wypt2Polygons = {
    hexplot: {
        panCoord: { x:0.249, y: 0.7819 }, 
        zoomRatio: 82.5565,
        ROIBox: [],
        maskName: ["All transcripts","Segmentation"],
        channel: "Membrane"
    }
}

// To be honest, I'm not sure if all of these are required
/**
 * Add text, images, and clickhandlers to a specific waypoint.
 * @param {number} waypointNum : The number of the current waypoint 
 * @param {number} storyNum : The story number for the current waypoint
 * @param {object} domElement : The DOM element (mninerva-viewer-waypoint) to act upon
 * @param {object} osd The osd object in use for building the story - passed from the waypoint build event
 * @param {function} finish_waypoint : finishes building the waypoint
 */

function buildWaypoint(waypointNum, storyNum, domElement, osd, finish_waypoint) {
    const showdown_text = new showdown.Converter({ tables: true });


    // This is for the waypoint displayed as "7/n"
    // storyNum is 0 for the Table of Contents (ToC), then 1 for subsequent pages
    // Hence, the first non-ToC page is the 0th index of the 1st index "story"
    // Waypoint 7 figure - volcano plot
    if (waypointNum === 5 && storyNum === 1) {
        const svgContainer = document.createElement('object');
        // path to SVG file
        svgContainer.data = 'svg/CD8_tcell_DE_volcano.svg'
        svgContainer.type = 'image/svg+xml'
        svgContainer.id = 'waypoint7figure'
        // Add interactivity to the figure
        // Cartoon click spots have SVG object ids that exactly match the object keys in the
        // data structure "wypt7Polygons" above
        svgContainer.onload = function () {
            const doc = this.getSVGDocument();
            Object.entries(wypt7Polygons).forEach(([key, val]) => {
                const el = doc.querySelector(`#${key}`);
                if (el) {
                    // adding in only the click handler for panZoom
                    addEListener(osd, val, el, ['addMaskAndChannel', 'panZoom'], storyNum, waypointNum);
                }
            });
            finish_waypoint('');
        }
        domElement.appendChild(svgContainer);
    }

    // This is for the waypoint displayed as "9/n"
    // Waypoint 9 figure - CNV plot
    else if (waypointNum === 7 && storyNum === 1) {
        const svgContainer = document.createElement('object');
        // path to SVG file
        svgContainer.data = 'svg/cnv_plot.svg'
        svgContainer.type = 'image/svg+xml'
        svgContainer.id = 'waypoint9figure'
        // Add interactivity to the figure
        // Cartoon click spots have SVG object ids that exactly match the object keys in the
        // data structure "wypt7Polygons" above
        svgContainer.onload = function () {
            const doc = this.getSVGDocument();
            Object.entries(wypt9Polygons).forEach(([key, val]) => {
                const el = doc.querySelector(`#${key}`);
                if (el) {
                    // adding in only the click handler for panZoom
                    addEListener(osd, val, el, ['addMaskAndChannel', 'panZoom'], storyNum, waypointNum);
                }
            });
            finish_waypoint('');
        }
        domElement.appendChild(svgContainer);
    }

    // This is for the waypoint displayed as "2/n"
    // Waypoint 2 figure - intro to sample
    else if (waypointNum === 0 && storyNum === 1) {
        const svgContainer = document.createElement('object');
        // path to SVG file
        svgContainer.data = 'svg/features_by_counts.svg'
        svgContainer.type = 'image/svg+xml'
        svgContainer.id = 'waypoint2figure'
        // Add interactivity to the figure
        // Cartoon click spots have SVG object ids that exactly match the object keys in the
        // data structure "wypt2Polygons" above
        svgContainer.onload = function () {
            const doc = this.getSVGDocument();
            Object.entries(wypt2Polygons).forEach(([key, val]) => {
                const el = doc.querySelector(`#${key}`);
                if (el) {
                    // adding in only the click handler for panZoom
                    addEListener(osd, val, el, ['addMaskAndChannel', 'panZoom'], storyNum, waypointNum);
                }
            });
            finish_waypoint('');
        }
        domElement.appendChild(svgContainer);
    }

    
    // This is for the waypoint displayed as "3/n"
    // Waypoint 3 figure - insitudiff baseline
    else if (waypointNum === 1 && storyNum === 1) {
        const svgContainer = document.createElement('object');
        // path to SVG file
        svgContainer.data = 'svg/insitudiff_baseline.svg'
        svgContainer.type = 'image/svg+xml'
        svgContainer.id = 'waypoint3figure'
        // Add interactivity to the figure
        // Cartoon click spots have SVG object ids that exactly match the object keys in the
        // data structure "wypt7Polygons" above
        svgContainer.onload = function () {
            const doc = this.getSVGDocument();
            Object.entries(wypt3Polygons).forEach(([key, val]) => {
                const el = doc.querySelector(`#${key}`);
                if (el) {
                    // adding in only the click handler for panZoom
                    addEListener(osd, val, el, ['addMaskAndChannel', 'panZoom'], storyNum, waypointNum);
                }
            });
            finish_waypoint('');
        }
        domElement.appendChild(svgContainer);
    }

};



// Add cartoon image or text to a specific waypoint
// Change the number that HS.w is equal to based on which waypoint the image needs to appear on.
// If the waypoint is the first one after the Table of Contents HS.s must also be set, otherwise, it appears in the TOC too
document.addEventListener('waypointBuildEvent', function (e) {
    const { waypointNum, storyNum, domElement, osd, finish_waypoint } = e.detail;
    const width = window.innerWidth;
    window.waypointAttr = {
        waypointNum: waypointNum,
        storyNum: storyNum,
        domElement: domElement,
        osd: osd,
        width: width
    }

    // Remove ROIBox overlays when the waypoint is changed
    if (document.querySelector('[id^=ROIBox]')) {
        const ROIBoxes = document.querySelectorAll('[id^=ROIBox]')
        ROIBoxes.forEach((box) => {
            osd.viewer.removeOverlay(box.id)
            document.querySelector(`#${box.id}`).remove()
        });
    }
    buildWaypoint(waypointNum, storyNum, domElement, osd, finish_waypoint)
}
);

const css = `
#logoDiv {
    display: flex;
    align-items: center;
    justify-content: center;
}
#logoDiv img {
    width:50%;
}
@media (min-width: 1100px) {
    .minerva-root .minerva-sidebar-menu {
        width: 450px !important;
    }
    .minerva-root .minerva-sidebar-menu.toggled {
        margin-left: -420px !important;
    }
    .minerva-root .openseadragon-canvas {
        left: 100px !important;
    }
}

@media (max-width: 1099px) {
    .minerva-root .openseadragon-canvas {
        left: 50px !important;
    }
}

@media (max-width: 674px) {
    .minerva-root .minerva-sidebar-menu {
        width: 200px !important;
    }
    .minerva-root .minerva-sidebar-menu.toggled {
        margin-left: -185px !important;
    }
}
`;

export const story = {
    'css': css
};

const styleElement = document.createElement('style');
styleElement.innerText = css;
document.head.appendChild(styleElement);