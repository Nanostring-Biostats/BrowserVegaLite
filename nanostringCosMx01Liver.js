import { addEListener, addSlidePolygon } from './nanostringUtils';

// Clickability on both copies of the fine morphology cartoon
// Each item, e.g., rectCholangiocyte, exactly matches the name of the compount path object
// from inside the SVG. 
// We are using the click handler "addMaskAndChannel", hence the inclusion of both mask name
// to turn on as well as the underlying hannel we want to change to.
// Of course, we also want to set the pan and zoom coors, which would be required for both
const liverStrucs = {
    rectCholangiocyte: {
        panCoord: { x: 0.2172, y: 0.23952 },
        zoomRatio: 3.3229,
        maskName: ["Portal triad cells"],
        channel: "PanCK"
    },
    rectKupfferCell: {
        panCoord: { x: 0.2172, y: 0.23952 },
        zoomRatio: 3.3229,
        maskName: ["Immune cells"],
        channel: "DNA",
        ROIBox: [{ overlay: { x: 0.1787, y: 0.1224, width: 0.1388, height: 0.1333 } }]
    },
    rectHepaticStellateCell: {
        panCoord: { x: 0.2172, y: 0.23952 },
        zoomRatio: 3.3229,
        maskName: ["Portal triad cells"],
        channel: "DNA"
    },
    rectPlasmaCell: {
        panCoord: { x: 0.2172, y: 0.23952 },
        zoomRatio: 3.3229,
        maskName: ["Immune cells"],
        channel: "DNA"
    },
    rectBCell: {
        panCoord: { x: 0.2172, y: 0.23952 },
        zoomRatio: 3.3229,
        maskName: ["Immune cells"],
        channel: "DNA"
    },
    rectTCells: {
        panCoord: { x: 0.2172, y: 0.23952 },
        zoomRatio: 3.3229,
        maskName: ["Immune cells"],
        channel: "DNA"
    },
    rectVascularEndothelialCell: {
        panCoord: { x: 0.2172, y: 0.23952 },
        zoomRatio: 3.3229,
        maskName: ["Portal triad cells", "Central venous LSECs"],
        channel: "DNA"
    },
    rectNKLikeCell: {
        panCoord: { x: 0.2172, y: 0.23952 },
        zoomRatio: 3.3229,
        maskName: ["Immune cells"],
        channel: "DNA"
    },
    rectHepatocyte: {
        panCoord: { x: 0.2935, y: 0.2105 },
        zoomRatio: 2.0264,
        maskName: ["Hepatocytes cell types"],
        channel: "All markers",
        ROIBox: [{ overlay: { x: 0.2069, y: 0.0961, width: 0.1776, height: 0.1852 } }]
    },
    rectInflammatoryMacrophage: {
        panCoord: { x: 0.2172, y: 0.23952 },
        zoomRatio: 3.3229,
        maskName: ["Immune cells"],
        channel: "DNA"
    },
    rectSinusoidalEndothelialCell: {
        panCoord: { x: 0.2172, y: 0.23952 },
        zoomRatio: 3.3229,
        maskName: ["Portal triad cells", "Central venous LSECs"],
        channel: "DNA"
    },
    rectHepaticArtery: {
        panCoord: { x: 0.25504360638726287, y: 0.2938107749705686 },
        zoomRatio: 17.1726,
        maskName:[],
        channel: "All markers"
    },
    rectCentralVein: {
        panCoord: { x: 0.279, y: 0.2035 },
        zoomRatio: 6.0509,
        maskName:[],
        channel: "All markers"
    },
    rectPortalVein: {
        panCoord: { x: 0.21527283251069884, y: 0.2785574151662562 },
        zoomRatio: 7.3589,
        maskName:[],
        channel: "All markers"
    },
    rectBileDuct: {
        panCoord: { x: 0.198569148270994, y: 0.25718526904140915 },
        zoomRatio: 17.1726,
        maskName:[],
        channel: "All markers"
    },
    rectZone3: {
        panCoord: { x: 0.4696, y: 0.5131 },
        zoomRatio: 2.7691,
        maskName: ["Hepatocytes cell types"],
        channel: "CK8/18"
    },
    rectZones12: {
        panCoord: { x: 0.4696, y: 0.5131 },
        zoomRatio: 2.7681,
        maskName: ["Hepatocytes cell types"],
        channel: "CK8/18"
    }

}

// Polygon objects for adding drawings over slide image
// In this case, we don't have a json with a set of coors for a
// large, free-hand drawn polygon. Instead, we just have one 
// rectangle that encircles the entire slide.
const allSlidePolygons = {
    grossRect: {
        panCoord: { x: 0.6563, y: 0.4867 },
        zoomRatio: 0.5327,
        ROIBox: [{ overlay: { x: 0.0229, y: -0.0147, width: 1.282, height: 0.9414 } }]
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

    // This is for the waypoint displayed as "2/n"
    // storyNum is 0 for the Table of Contents (ToC), then 1 for subsequent pages
    // Hence, the first non-ToC page is the 0th index of the 1st index "story"
    // Gross morphology liver cartoon
    if (waypointNum === 0 && storyNum === 1) {
        const svgContainer = document.createElement('object');
        svgContainer.type = 'image/svg+xml';
        // path to SVG file
        svgContainer.data = 'svg/liver_gross_230111.svg';
        svgContainer.id = 'grossAnatomyCartoon'
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

    // This is for the waypoint displayed as "3/n"
    // first fine liver cartoon (histological substructures)
    else if (waypointNum === 1 && storyNum === 1) {
        const svgContainer = document.createElement('object');
        // path to SVG file
        svgContainer.data = 'svg/liver_fine_230123_substructures.svg'
        svgContainer.type = 'image/svg+xml'
        svgContainer.id = 'detailImage1'
        // Add interactivity to each column in the heatmap SVG file
        // Cartoon click spots have SVG object ids that exactly match the object keys in the
        // data structure "liverStrucs" above
        svgContainer.onload = function () {
            const doc = this.getSVGDocument();
            Object.entries(liverStrucs).forEach(([key, val]) => {
                const el = doc.querySelector(`#${key}`);
                if (el) {
                    // Adding in the click handler for panZoom
                    // Also adding in the click handler for adjusting overlying mask
                    // and  underlying channel
                    addEListener(osd, val, el, ['addMaskAndChannel', 'panZoom'], storyNum, waypointNum)
                }
            });
            finish_waypoint('')
        }
        domElement.appendChild(svgContainer);
    }

    // This is for the waypoint displayed as "6/n"
    // second fine liver cartoon (cell types)
    else if (waypointNum === 4 && storyNum === 1) {
        const svgContainer = document.createElement('object');
        // path to SVG file
        svgContainer.data = 'svg/liver_fine_230123_cells_niches.svg'
        svgContainer.type = 'image/svg+xml'
        svgContainer.id = 'detailImage2'
        // Add interactivity to each column in the heatmap SVG file
        // Cartoon click spots have SVG object ids that exactly match the object keys in the
        // data structure "liverStrucs" above
        svgContainer.onload = function () {
            const doc = this.getSVGDocument();
            Object.entries(liverStrucs).forEach(([key, val]) => {
                const el = doc.querySelector(`#${key}`);
                if (el) {
                    // Adding in the click handler for panZoom
                    // Also adding in the click handler for adjusting overlying mask
                    // and  underlying channel
                    addEListener(osd, val, el, ['addMaskAndChannel', 'panZoom'], storyNum, waypointNum)
                }
            });
            finish_waypoint('')
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
}

`;

export const story = {
    'css': css
};

const styleElement = document.createElement('style');
styleElement.innerText = css;
document.head.appendChild(styleElement);