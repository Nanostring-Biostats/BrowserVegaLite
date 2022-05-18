import { addEListener } from './nanostringUtils';
const slideCortex = require('./humanBrainObjects/cortex.json');
const slideHippocampus = require('./humanBrainObjects/hippocampus.json');
const slideWhiteMatter = require('./humanBrainObjects/whiteMatter.json');

const allROIs = {
    // best-in-class Cortical Layer I
    r001: {
        panCoord: {x: 0.2893, y: 0.6163},
        zoomRatio: 5.6315,
        ROIBox: [{overlay: {x: 0.2731, y: 0.5968, width: 0.0324, height: 0.0392}}],
        maskName: ["Cortical layer I"]
    },
    // best-in-class Cortical Layer II/III
    r003: {
        panCoord: {x: 0.3148, y: 0.6090},
        zoomRatio: 5.6315,
        ROIBox: [{overlay: {x: 0.283, y: 0.5894, width: 0.0473, height: 0.044}}],
        maskName: ["Cortical layer II/III"]
    },
    // best-in-class Cortical Layer IV
    r029: {
        panCoord: {x: 0.4158, y: 0.6929},
        zoomRatio: 5.6315,
        ROIBox: [{overlay: {x: 0.3995, y: 0.6769, width: 0.0326, height: 0.0320}}],
        maskName: ["Cortical layer IV"]
    },
    // best-in-class Cortical Layer V
    r025: {
        panCoord: {x: 0.3396, y: 0.5500},
        zoomRatio: 5.6315,
        ROIBox: [{overlay: {x: 0.3238, y: 0.5346, width: 0.0317, height: 0.0308}}],
        maskName: ["Cortical layer V"]
    },
    // best-in-class Cortical Layer V (GFAP)
    r033GFAP: {
        panCoord: {x: 0.2903, y: 0.4578},
        zoomRatio: 5.6315,
        ROIBox: [{overlay: {x: 0.2742, y: 0.4392, width: 0.0321, height: 0.0371}}],
        maskName: ["Cortical layer V - GFAP+"]
    },
    // best-in-class Cortical Layer V (Iba1)
    r033Iba1: {
        panCoord: {x: 0.2903, y: 0.4578},
        zoomRatio: 5.6315,
        ROIBox: [{overlay: {x: 0.2742, y: 0.4392, width: 0.0321, height: 0.0371}}],
        maskName: ["Cortical layer V - Iba1+"]
    },
    // best-in-class Cortical Layer V (Neuropil)
    r033Neuropil: {
        panCoord: {x: 0.2903, y: 0.4578},
        zoomRatio: 5.6315,
        ROIBox: [{overlay: {x: 0.2742, y: 0.4392, width: 0.0321, height: 0.0371}}],
        maskName: ["Cortical layer V - Neuropil"]
    },
    // best-in-class Cortical Layer V (NeuN+)
    r033NeuN: {
        panCoord: {x: 0.2903, y: 0.4578},
        zoomRatio: 5.6315,
        ROIBox: [{overlay: {x: 0.2742, y: 0.4392, width: 0.0321, height: 0.0371}}],
        maskName: ["Cortical layer V - NeuN+"]
    },
}


const allPolygons = {
    cortexPolygon: {
        file: slideCortex,
        polygonID: 'slideCortex'
    },

    hippocampusPolygon: {
        file: slideHippocampus,
        polygonID: 'slideHippocampus'
    },

    whiteMatterPolygon: {
        file: slideWhiteMatter,
        polygonID: 'slideWhiteMatter'
    }
}

/**
 * Add text, images, and clickhandlers to a specific waypoint.
 * @param {number} waypointNum : The number of the current waypoint 
 * @param {number} storyNum : The story number for the current waypoint
 * @param {object} domElement : The DOM element (mninerva-viewer-waypoint) to act upon
 * @param {object} osd The osd object in use for building the story - passed from the waypoint build event
 * @param {function} finish_waypoint : finishes building the waypoint
 */
function buildWaypoint(waypointNum, storyNum, domElement, osd, finish_waypoint) {
    const showdown_text = new showdown.Converter({tables: true});

    if (waypointNum === 0 && storyNum === 1) {
        const svgContainer = document.createElement('object');
        svgContainer.data = 'svg/grossBrainStructure.svg'
        svgContainer.type = 'image/svg+xml'
        svgContainer.id = 'grossImage'
        // Add interactivity to the clickable regions in the cartoon image SVG
        svgContainer.onload = function (){
            const doc = this.getSVGDocument();
            Object.entries(allPolygons).forEach(([key, val]) => {
                const el = doc.querySelector(`#${key}`);
                if (el) {
                    addEListener(osd, val, el, ['addPolygon'], storyNum, waypointNum);
                }
            });
            finish_waypoint('')
        }
        domElement.appendChild(svgContainer);
    }
    else if (waypointNum === 1 && storyNum === 1) {
        const svgContainer = document.createElement('object');
        svgContainer.data = 'svg/humanBrainCortex2.svg'
        svgContainer.type = 'image/svg+xml'
        svgContainer.id = 'grossImage'
        // Add interactivity to the clickable regions in the cartoon image SVG
        svgContainer.onload = function (){
            const doc = this.getSVGDocument();
            Object.entries(allROIs).forEach(([key, val]) => {
                const el = doc.querySelector(`#${key}`);
                if (el) {
                    addEListener(osd, val, el, ['addMask', 'panZoom'], storyNum, waypointNum);
                }
            });
            finish_waypoint('')
        }
        domElement.appendChild(svgContainer);
    } 
}

/**
 * Add images, text, and click handlers to specific waypoints in the minerva story
 * Recieves the waypoint number, story number, wayoint DOM element, osd object, and finish_wayoint function from the context of the 
 *      fillWaypointView function 
 */
document.addEventListener('waypointBuildEvent', function(e) {
    const {waypointNum, storyNum, domElement, osd, finish_waypoint} = e.detail;
    const width = window.innerWidth;
    window.waypointAttr = {
        waypointNum: waypointNum,
        storyNum: storyNum,
        domElement: domElement,
        osd: osd,
        width: width
    }

    // Remove polygons and overlays when the waypoint is changed
    const overlayIds = ['#slideHippocampus', '#slideCortex', "#slideWhiteMatter"]
    overlayIds.forEach((id) => {
        if (document.querySelector(id)) {
            document.querySelector(id).remove();
        }
    });

    if (document.querySelector('[id^=ROIBox]')){
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
@media (min-width: 1100px) {
    .minerva-root .minerva-sidebar-menu {
        width: 455px !important;
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
        width: 250px !important;
    }
    .minerva-root .minerva-sidebar-menu.toggled {
        margin-left: -185px !important;
    }

`;

export const story = {
    'css': css
};

const styleElement = document.createElement('style');
styleElement.innerText = css;
document.head.appendChild(styleElement);