const slideTrachea = require('./mouseDevObjects/slideTrachea.json');
const slideMidgut = require('./mouseDevObjects/slideMidgut.json');
const slideStomach = require('./mouseDevObjects/slideStomach.json');
const slideAtrium = require('./mouseDevObjects/slideAtrium.json');
const slideBrain = require('./mouseDevObjects/slideBrain.json');
const slideVentricle = require('./mouseDevObjects/slideVentricle.json');
const slideEsophagus = require('./mouseDevObjects/slideEsophagus.json');
const slideLung = require('./mouseDevObjects/slideLung.json');
const slidePancreas = require('./mouseDevObjects/slidePancreas.json');
const slidePlacenta = require('./mouseDevObjects/slidePlacenta.json');


import { addEListener, addSlidePolygon } from './nanostringUtils';

// Clickability on both heatmaps 
// I don't know why I don't need to specify maskName, channel, or ROIBox.
const heatmapStrucs = {
    gutE9rect: {
        panCoord: { x: 0.25, y: 0.25 },
        zoomRatio: 1
    },
    gutE11rect: {
        panCoord: { x: 0.75, y: 0.125 },
        zoomRatio: 1
    },
    gutE13rect: {
        panCoord: { x: 0.25, y: 0.75 },
        zoomRatio: 1
    },
    gutE15rect: {
        panCoord: { x: 0.75, y: 0.75 },
        zoomRatio: 1
    },
    heartRect: {
        panCoord: { x: 0.7876, y: 0.1364 },
        zoomRatio: 4.6183
    }
}

// Clickability on both heatmaps 
// I don't know why I don't need to specify maskName, channel, or ROIBox.
const liverStrucs = {

    rectCholangiocyte: {
        panCoord: { x: 0.159, y:0.0902 },
        zoomRatio: 3.3229,
        maskName: ["PV cells"],
        channel: "PanCK"
    },
    rectKupfferCell: {
        panCoord: { x: 0.159, y:0.0902 },
        zoomRatio: 3.3229,
        maskName: ["Immune cells"],
        channel: "DNA"
    },
    rectHepaticStellateCell: {
        panCoord: { x: 0.159, y:0.0902 },
        zoomRatio: 3.3229,
        maskName: ["PV cells"],
        channel: "DNA"
    },
    rectPlasmaCell: {
        panCoord: { x: 0.159, y:0.0902 },
        zoomRatio: 3.3229,
        maskName: ["Immune cells"],
        channel: "DNA"
    },
    rectBCell: {
        panCoord: { x: 0.159, y:0.0902 },
        zoomRatio: 3.3229,
        maskName: ["Immune cells"],
        channel: "DNA"
    },
    rectTCells: {
        panCoord: { x: 0.159, y:0.0902 },
        zoomRatio: 3.3229,
        maskName: ["Immune cells"],
        channel: "DNA"
    },
    rectVascularEndothelialCell: {
        panCoord: { x: 0.159, y:0.0902 },
        zoomRatio: 3.3229,
        maskName: ["PV cells"],
        channel: "DNA"
    },
    rectNKLikeCell: {
        panCoord: { x: 0.159, y:0.0902 },
        zoomRatio: 3.3229,
        maskName: ["Immune cells"],
        channel: "DNA"
    },
    rectArterialEndothelialCell: {
        panCoord: { x: 0.159, y:0.0902 },
        zoomRatio: 3.3229,
        maskName: ["PV cells"],
        channel: "DNA"
    },
    rectHepatocyte: {
        panCoord: { x: 0.2935, y: 0.2105 },
        zoomRatio: 6.0509,
        maskName: ["Hepatocyte cell types"],
        channel: "All markers",
        ROIBox: [{overlay: {x: 0.2069, y: 0.0961, width: 0.1776, height: 0.1852}}]
    },
    rectInflammatoryMacrophage: {
        panCoord: { x: 0.159, y:0.0902 },
        zoomRatio: 3.3229,
        maskName: ["Immune cells"],
        channel: "DNA"
    },
    rectSinusoidalEndothelialCell: {
        panCoord: { x: 0.159, y:0.0902 },
        zoomRatio: 3.3229,
        maskName: ["PV cells"],
        channel: "DNA"
    },
    rectBileDuctCanaliculus: {
        panCoord: { x: 0.159, y:0.0902 },
        zoomRatio: 3.3229,
        maskName: ["FOVs"],
        channel: "All markers"
    },
    rectCentralVein: {
        panCoord: { x: 0.2935, y: 0.2105 },
        zoomRatio: 6.0509,
        maskName: ["FOVs"],
        channel: "All markers"
    },
    rectHepaticArtery: {
        panCoord: { x: 0.159, y:0.0902 },
        zoomRatio: 3.3229,
        maskName: ["FOVs"],
        channel: "All markers"
    },
    rectPortalVein: {
        panCoord: {x: 0.2107, y: 0.0853},
        zoomRatio: 7.3589,
        maskName: ["FOVs"],
        channel: "All markers"
    },
    rectBileDuct: {
        panCoord: {x: 0.1656, y: 0.0694},
        zoomRatio: 17.1726,
        maskName: ["FOVs"],
        channel: "All markers"
    },
    rectZones12: {
        panCoord: { x: 0.4696, y: 0.5131 },
        zoomRatio: 2.7691,
        maskName: ["Hepatocytes cell types"],
        channel: "CK8_18"
    },
    rectZone3: {
        panCoord: { x: 0.4696, y: 0.5131 },
        zoomRatio: 2.7681,
        maskName: ["Hepatocytes cell types"],
        channel: "CK8_18"
    }

}

// Polygon objects for adding drawings over slide image
const allSlidePolygons = {
    grossRect: {
    panCoord:{x: 0.6563, y: 0.4867},
    zoomRatio: 0.5327,
    ROIBox: [{overlay: {x: 0.0229, y: -0.0147, width: 1.282, height: 0.9414}}]
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
    const showdown_text = new showdown.Converter({ tables: true });

    if (waypointNum === 0 && storyNum === 1) {
        const svgContainer = document.createElement('object');
        svgContainer.type = 'image/svg+xml';
        svgContainer.data = 'svg/liver_gross_230111.svg';
        svgContainer.id = 'grossAnatomyCartoon'
        svgContainer.onload = function(){
            const doc = this.getSVGDocument();
            Object.entries(allSlidePolygons).forEach(([key, val]) => {
                const el = doc.querySelector(`#${key}`);
                if (el) {
                    addEListener(osd, val, el, ['panZoom'], storyNum, waypointNum);
                }
            });
            finish_waypoint('');
        }
        domElement.appendChild(svgContainer);
      }

    else if (waypointNum === 1 && storyNum === 1) {

        // first fine liver cartoon (histological substructures)
        const svgContainer = document.createElement('object');
        svgContainer.data = 'svg/liver_fine_230111_substructures.svg'
        svgContainer.type = 'image/svg+xml'
        svgContainer.id = 'detailImage'
        // Add interactivity to each column in the heatmap SVG file. Columns have ids that exactly match the object keys
        svgContainer.onload = function () {
            const doc = this.getSVGDocument();
            Object.entries(liverStrucs).forEach(([key, val]) => {
                const el = doc.querySelector(`#${key}`);
                if (el) {
                    // I don't know that 'addMaskAndChannel' is best here
                    addEListener(osd, val, el, ['addMaskAndChannel', 'panZoom'], storyNum, waypointNum)
                }
            });
            finish_waypoint('')
        }
        domElement.appendChild(svgContainer);


    }

    else if (waypointNum === 4 && storyNum === 1) {

        // second fine liver cartoon (cell types)
        const svgContainer = document.createElement('object');
        svgContainer.data = 'svg/liver_fine_230111_cells_niches.svg'
        svgContainer.type = 'image/svg+xml'
        svgContainer.id = 'detailImage'
        // Add interactivity to each column in the heatmap SVG file. Columns have ids that exactly match the object keys
        svgContainer.onload = function () {
            const doc = this.getSVGDocument();
            Object.entries(liverStrucs).forEach(([key, val]) => {
                const el = doc.querySelector(`#${key}`);
                if (el) {
                    // I don't know that 'addMaskAndChannel' is best here
                    addEListener(osd, val, el, ['addMaskAndChannel', 'panZoom'], storyNum, waypointNum)
                }
            });
            finish_waypoint('')
        }
        domElement.appendChild(svgContainer);


    }

    else if (waypointNum == 3 && storyNum == 1) {
        // svg heart heatmap
        const svgContainer = document.createElement('object');
        svgContainer.data = 'svg/gut_heatmap.svg'
        svgContainer.type = 'image/svg+xml'
        svgContainer.id = 'gutHeatmap'
        // Add interactivity to each column in the heatmap SVG file. Columns have ids that exactly match the object keys
        svgContainer.onload = function () {
            const doc = this.getSVGDocument();
            Object.entries(heatmapStrucs).forEach(([key, val]) => {
                const el = doc.querySelector(`#${key}`);
                if (el) {
                    // I don't know that 'AddMaskAndChannel' is best here
                    addEListener(osd, val, el, ['addMaskAndChannel', 'panZoom'], storyNum, waypointNum)
                }
            });
            finish_waypoint('')
        }


        domElement.appendChild(svgContainer);
    }

    else if (waypointNum == 6 && storyNum == 1) {
        // svg heart heatmap
        const svgContainer = document.createElement('object');
        svgContainer.data = 'svg/heart_MOCA_heatmap.svg'
        svgContainer.type = 'image/svg+xml'
        svgContainer.id = 'heartHeatmap'
        // Add interactivity to each column in the heatmap SVG file. Columns have ids that exactly match the object keys
        svgContainer.onload = function () {
            const doc = this.getSVGDocument();
            Object.entries(heatmapStrucs).forEach(([key, val]) => {
                const el = doc.querySelector(`#${key}`);
                if (el) {
                    // I don't know that 'addMaskAndChannel' is best here
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

    // Remove polygons and overlays when the waypoint is changed
    const overlayIds = ['#slideTrachea', '#slideMidgut', '#slideStomach', '#slideAtrium', '#slideBrain', '#slideVentricle', '#slideEsophagus', '#slideLung', '#slidePancreas', '#placentaPolygon']
    overlayIds.forEach((id) => {
        if (document.querySelector(id)) {
            document.querySelector(id).remove();
        }
    });

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

button#placentaClick { 
    background:none; 
    border:none; 
    font-weight: 400;
    color: #007bff; 
    text-decoration: none;
    outline:none;
}


button#placentaClick:hover { 
    color: #0056b3; 
    text-decoration: underline; 
}

`;

export const story = {
    'css': css
};

const styleElement = document.createElement('style');
styleElement.innerText = css;
document.head.appendChild(styleElement);