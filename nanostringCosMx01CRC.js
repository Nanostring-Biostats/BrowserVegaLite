import { addEListener, addSlidePolygon } from './nanostringUtils';

// Polygon objects for adding drawings over slide image
// In this case, we don't have a json with a set of coors for a
// large, free-hand drawn polygon. Instead, we just have 
// rectangles that highlight areas on the slide.
const allSlidePolygons = {
    wypt6left: {
        panCoord: { x: 0.07599129314066355, y: 0.19842878139408823 },
        zoomRatio: 5.7,
        ROIBox: [{ overlay: { x: 0.0612, y: 0.1844, width: 0.0301, height: 0.027 } }]
    },
    wypt6right: {
        panCoord: { x: 0.4487303694068083, y: 0.22606379197232945 },
        zoomRatio: 5.7,
        ROIBox: [{ overlay: { x: 0.4109, y: 0.1967, width: 0.089, height: 0.0619 } }]
    },
    wypt7upper: {
        panCoord: { x: 0.238, y: 0.1264 },
        zoomRatio: 3.3,
        ROIBox: [{ overlay: { x: 0.1658, y: 0.0533, width: 0.1974, height: 0.1446 } }]
    },
    wypt7lower: {
        panCoord: { x: 0.3187915800441821, y: 0.8661443007582452 },
        zoomRatio: 3.3,
        ROIBox: [{ overlay: { x: 0.2715, y: 0.839, width: 0.0994, height: 0.0625 } }]
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

    // This is for the waypoint displayed as "6/n"
    // storyNum is 0 for the Table of Contents (ToC), then 1 for subsequent pages
    // Hence, the first non-ToC page is the 0th index of the 1st index "story"
    // Waypoint 6 svg
    if (waypointNum === 4 && storyNum === 1) {
        const svgContainer = document.createElement('object');
        svgContainer.type = 'image/svg+xml';
        // path to SVG file
        svgContainer.data = 'svg/waypoint6.svg';
        svgContainer.id = 'wypt6figure'
        // Add interactivity to the figure
        // Cartoon click spots have SVG object ids that exactly match the object keys in the
        // data structure "allSlidePolygons" above
        svgContainer.onload = function () {
            const doc = this.getSVGDocument();
            Object.entries(allSlidePolygons).forEach(([key, val]) => {
                const el = doc.querySelector(`#${key}`);
                if (el) {
                    // adding in only the click handler for panZoom
                    addEListener(osd, val, el, ['panZoom'], storyNum, waypointNum);
                }
            });
            finish_waypoint('');
        }
        domElement.appendChild(svgContainer);
    }

    // This is for the waypoint displayed as "7/n"
    // first fine liver cartoon (histological substructures)
    else if (waypointNum === 5 && storyNum === 1) {
        const svgContainer = document.createElement('object');
        // path to SVG file
        svgContainer.data = 'svg/waypoint7.svg'
        svgContainer.type = 'image/svg+xml'
        svgContainer.id = 'waypoint7figure'
        // Add interactivity to the figure
        // Cartoon click spots have SVG object ids that exactly match the object keys in the
        // data structure "allSlidePolygons" above
        svgContainer.onload = function () {
            const doc = this.getSVGDocument();
            Object.entries(allSlidePolygons).forEach(([key, val]) => {
                const el = doc.querySelector(`#${key}`);
                if (el) {
                    // adding in only the click handler for panZoom
                    addEListener(osd, val, el, ['panZoom'], storyNum, waypointNum);
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