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

// Polygon objects for adding drawings over slide image
const allSlidePolygons = {
    trachea: { // id from the SVG object
        polygonID: 'slideTrachea', // 'object' we're importing after lasso tool
        file: slideTrachea // same as above
    },

    midgut: { 
        polygonID: 'slideMidgut',
        file: slideMidgut
    },

    stomach: {
        polygonID: 'slideStomach',
        file: slideStomach
    },

    atrium: {
        polygonID: 'slideAtrium',
        file: slideAtrium
    },
    
    brain: {
        polygonID: 'slideBrain',
        file: slideBrain
    },

    ventricle: {
        polygonID: 'slideVentricle',
        file: slideVentricle
    },
    esophagus: {
        polygonID: 'slideEsophagus',
        file: slideEsophagus
    },
    lung: {
        polygonID: 'slideLung',
        file: slideLung
    },

    pancreas: {
        polygonID: 'slidePancreas',
        file: slidePancreas
    }
}

// Clickability on both heatmaps 
// I don't know why I don't need to specify maskName, channel, or ROIBox.
const heatmapStrucs = {
    gutE9rect: {
        panCoord: {x: 0.25, y: 0.25},
        zoomRatio: 1
    },
    gutE11rect: {
        panCoord: {x: 0.75, y: 0.125},
        zoomRatio: 1
    },
    gutE13rect: {
        panCoord: {x: 0.25, y: 0.75},
        zoomRatio: 1
    },
    gutE15rect: {
        panCoord: {x: 0.75, y: 0.75},
        zoomRatio: 1
    },
    heartRect: {
        panCoord: {x: 0.7876, y: 0.1364},
        zoomRatio: 4.6183
    }
}

function buildWaypoint(waypointNum, storyNum, domElement, osd, finish_waypoint) {
    const showdown_text = new showdown.Converter({tables: true});

    if (waypointNum === 0 && storyNum === 1) {
        // This must go before the svg, if applicable, or it will break the functionality
        const desc_html = document.querySelector('.minerva-viewer-waypoint').innerHTML;
        // With the /g tag, it will replace all instances of the word 'key'
        const new_html = desc_html.replace(/placenta and yolk sac/g,'<button id="placentaClick">'+'placenta and yolk sac'+'</button>');
        document.querySelector('.minerva-viewer-waypoint').innerHTML = new_html;


        const placentaButton = document.querySelector('#placentaClick');
        placentaButton.addEventListener("click", () => {
            osd.viewer.viewport.panTo({x: 0.32, y: 0.25});
            osd.viewer.viewport.zoomTo('5.6315');
            addSlidePolygon("placentaPolygon", slidePlacenta, osd);
        });

        // svg mouse dev cartoon
        const svgContainer = document.createElement('object');
        svgContainer.data = 'svg/MouseEmbryo_edit.svg'
        svgContainer.type = 'image/svg+xml'
        svgContainer.id = 'detailImage'
        // Add interactivity to the clickable regions in the cartoon image SVG
        svgContainer.onload = function (){
            const doc = this.getSVGDocument();
            Object.entries(allSlidePolygons).forEach(([key, val]) => {
                const el = doc.querySelector(`#${key}`);
                if (el) {
                    addEListener(osd, val, el, ['addPolygon'], storyNum, waypointNum);
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
        svgContainer.onload = function (){
            const doc = this.getSVGDocument();
            Object.entries(heatmapStrucs).forEach(([key, val]) => {
                const el = doc.querySelector(`#${key}`);
                if (el) {
                    // I don't know that 'addmaskandChannel' is best here
                    addEListener(osd, val, el, ['addMaskandChannel', 'panZoom'], storyNum, waypointNum)
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
        svgContainer.onload = function (){
            const doc = this.getSVGDocument();
            Object.entries(heatmapStrucs).forEach(([key, val]) => {
                const el = doc.querySelector(`#${key}`);
                if (el) {
                    // I don't know that 'addmaskandChannel' is best here
                    addEListener(osd, val, el, ['addMaskandChannel', 'panZoom'], storyNum, waypointNum)
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
    const overlayIds = ['#slideTrachea','#slideMidgut','#slideStomach', '#slideAtrium', '#slideBrain','#slideVentricle','#slideEsophagus','#slideLung','#slidePancreas', '#placentaPolygon']
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