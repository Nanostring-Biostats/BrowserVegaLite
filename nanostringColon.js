import { addEListener } from './nanostringUtils';

const allROIs = {
    r001Epi: {
        panCoord: {x: 0.4542, y: 0.1700},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.4417, y: 0.1575, width: 0.025, height: 0.025}}],
        maskName: ["Epithelium"],
        channel: "All markers"
    },
    r001LamProp: {
        panCoord: {x: 0.4542, y: 0.1700},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.4417, y: 0.1575, width: 0.025, height: 0.025}}],
        maskName: ["Lamina propria"],
        channel: "All markers"
    },
    r002Epi: {
        panCoord: {x: 0.6168, y: 0.0225},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.6077, y: 0.0135, width: 0.018, height: 0.018}}],
        maskName: ["Epithelium"],
        channel: "All markers"
    },
    r002LamProp: {
        panCoord: {x: 0.6168, y: 0.0225},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.6077, y: 0.0135, width: 0.018, height: 0.018}}],
        maskName: ["Lamina propria"],
        channel: "All markers"
    },
    r003Epi: {
        panCoord: {x: 0.3240, y: 0.6125},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.3145, y: 0.6030, width: 0.0191, height: 0.0191}}],
        maskName: ["Epithelium"],
        channel: "All markers"
    },
    r003LamProp: {
        panCoord: {x: 0.3240, y: 0.6125},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.3145, y: 0.6030, width: 0.0191, height: 0.0191}}],
        maskName: ["Lamina propria"],
        channel: "All markers"
    },
    r004Epi: {
        panCoord: {x: 0.5522, y: 0.5821},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.5418, y: 0.5717, width: 0.0208, height: 0.0208}}],
        maskName: ["Epithelium"],
        channel: "All markers"
    },
    r004LamProp: {
        panCoord: {x: 0.5522, y: 0.5821},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.5418, y: 0.5717, width: 0.0208, height: 0.0208}}],
        maskName: ["Lamina propria"],
        channel: "All markers"
    },
    // best-in-class epithelium
    r005Epi: {
        panCoord: {x: 0.5496, y: 0.6362},
        zoomRatio: 3.4445,
        ROIBox: [{overlay: {x: 0.5362, y: 0.6228, width: 0.0268, height: 0.0268}}],
        maskName: ["Epithelium"],
        channel: "All markers"
    },
    // best-in-class lamina propria
    r005LamProp: {
        panCoord: {x: 0.5496, y: 0.6362},
        zoomRatio: 3.4445,
        ROIBox: [{overlay: {x: 0.5362, y: 0.6228, width: 0.0268, height: 0.0268}}],
        maskName: ["Lamina propria"],
        channel: "All markers"
    },
    r006Epi: {
        panCoord: {x: 0.6817, y: 0.7158},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.668, y: 0.702, width: 0.0275, height: 0.0275}}],
        maskName: ["Epithelium"],
        channel: "All markers"
    },
    r006LamProp: {
        panCoord: {x: 0.6817, y: 0.7158},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.668, y: 0.702, width: 0.0275, height: 0.0275}}],
        maskName: ["Lamina propria"],
        channel: "All markers"
    },
    // best-in-class colonic patch
    r007: {
        panCoord: {x: 0.367727, y: 0.531525},
        zoomRatio: 3.8488,
        ROIBox: [{overlay: {x: 0.3604, y: 0.5242, width: 0.01467, height: 0.01467}}],
        maskName: ["Colonic patch"],
        channel: "All markers"
    },
    r008: {
        panCoord: {x: 0.4572, y: 0.5984},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.4507, y: 0.5919, width: 0.013, height: 0.013}}],
        maskName: ["Colonic patch"],
        channel: "All markers"
    },
    r009: {
        panCoord: {x: 0.4122, y: 0.7005},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.4067, y: 0.695, width: 0.011, height: 0.011}}],
        maskName: ["Colonic patch"],
        channel: "All markers"
    },
    r010: {
        panCoord: {x: 0.3849, y: 0.2522},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.375, y: 0.244, width: 0.0199, height: 0.0164}}],
        maskName: ["Colonic patch"],
        channel: "All markers"
    },
    r011: {
        panCoord: {x: 0.175, y: 0.7424},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.1695, y: 0.7368, width: 0.0111, height: 0.0111}}],
        maskName: ["Colonic patch"],
        channel: "All markers"
    },
    r012: {
        panCoord: {x: 0.3671, y: 0.6205},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.3617, y: 0.6152, width: 0.0107, height: 0.0107}}],
        maskName: ["Colonic patch"],
        channel: "All markers"
    },
    // best-in-class circular muscle layer
    r013: {
        panCoord: {x: 0.234, y: 0.3677},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.2238, y: 0.3576, width: 0.0204, height: 0.0204}}],
        maskName: ["Circular muscle layer"],
        channel: "All markers"
    },
    r014: {
        panCoord: {x: 0.3209, y: 0.3336},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.3107, y: 0.3234, width: 0.0204, height: 0.0204}}],
        maskName: ["Circular muscle layer"],
        channel: "All markers"
    },
    r015: {
        panCoord: {x: 0.3949, y: 0.3135},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.3847, y: 0.3033, width: 0.0204, height: 0.0204}}],
        maskName: ["Circular muscle layer"],
        channel: "All markers"
    },
    r016: {
        panCoord: {x: 0.4622, y: 0.2822},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.4521, y: 0.2720, width: 0.0204, height: 0.0204}}],
        maskName: ["Circular muscle layer"],
        channel: "All markers"
    },
    // best-in-class longitudinal muscle layer
    r017: {
        panCoord: {x: 0.2469, y: 0.3944},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.2367, y: 0.3842, width: 0.0204, height: 0.0204}}],
        maskName: ["Longitudinal muscle layer"],
        channel: "All markers"
    },
    r018: {
        panCoord: {x: 0.3828, y: 0.3453},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.3727, y: 0.3351, width: 0.0204, height: 0.0204}}],
        maskName: ["Longitudinal muscle layer"],
        channel: "All markers"
    },
    r019: {
        panCoord: {x: 0.4536, y: 0.3221},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.4434, y: 0.3119, width: 0.0204, height: 0.0204}}],
        maskName: ["Longitudinal muscle layer"],
        channel: "All markers"
    },
    r020: {
        panCoord: {x: 0.5093, y: 0.3088},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.4991, y: 0.2986, width: 0.0204, height: 0.0204}}],
        maskName: ["Longitudinal muscle layer"],
        channel: "All markers"
    },
    r021: {
        panCoord: {x: 0.4631, y: 0.1957},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.4509, y: 0.1839, width: 0.0243, height: 0.0235}}],
        maskName: ["Muscularis mucosae"],
        channel: "All markers"
    },
    r022: {
        panCoord: {x: 0.3427, y: 0.1975},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.3335, y: 0.1777, width: 0.0183, height: 0.0396}}],
        maskName: ["Muscularis mucosae"],
        channel: "All markers"
    },
    r023: {
        panCoord: {x: 0.5973, y: 0.0902},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.5855, y: 0.0779, width: 0.0237, height: 0.0248}}],
        maskName: ["Muscularis mucosae"],
        channel: "All markers"
    },
    // best-in-class muscularis mucosae
    r024: {
        panCoord: {x: 0.5476, y: 0.5971},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.529, y: 0.5935, width: 0.0335, height: 0.0072}}],
        maskName: ["Muscularis mucosae"],
        channel: "All markers"
    },
    r025: {
        panCoord: {x: 0.3552, y: 0.6417},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.3465, y: 0.6266, width: 0.0174, height: 0.0301}}],
        maskName: ["Muscularis mucosae"],
        channel: "All markers"
    },
    r026: {
        panCoord: {x: 0.5231, y: 0.5277},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.5064, y: 0.5223, width: 0.0333, height: 0.0109}}],
        maskName: ["Muscularis mucosae"],
        channel: "All markers"
    },
    r027: {
        panCoord: {x: 0.5977, y: 0.6386},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.581, y: 0.6328, width: 0.0335, height: 0.0117}}],
        maskName: ["Enteroendocrine cells"],
        channel: "Nuclei"
    },
    r028: {
        panCoord: {x: 0.256, y: 0.7937},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.2393, y: 0.7822, width: 0.0335, height: 0.0229}}],
        maskName: ["Enteroendocrine cells"],
        channel: "Nuclei"
    },
    r029: {
        panCoord: {x: 0.6902, y: 0.7904},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.6785, y: 0.7728, width: 0.0234, height: 0.0353}}],
        maskName: ["Enteroendocrine cells"],
        channel: "Nuclei"
    },
    r030: {
        panCoord: {x: 0.2616, y: 0.6599},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.2451, y: 0.6488, width: 0.0329, height: 0.0222}}],
        maskName: ["Enteroendocrine cells"],
        channel: "Nuclei"
    },
    r031: {
        panCoord: {x: 0.3126, y: 0.8433},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.2958, y: 0.8320, width: 0.0335, height: 0.0225}}],
        maskName: ["Enteroendocrine cells"],
        channel: "Nuclei"
    },
    // best-in-class enteroendocrine cells
    r032: {
        panCoord: {x: 0.2631, y: 0.2217},
        zoomRatio: 5.7556,
        ROIBox: [{overlay: {x: 0.24733, y: 0.2077, width: 0.038, height: 0.0329}}],
        maskName: ["Enteroendocrine cells"],
        channel: "Nuclei"
    },
    // best-in-class vessels
    r033: {
        panCoord: {x: 0.3386, y: 0.2590},
        zoomRatio: 4.7963,
        ROIBox: [{overlay: {x: 0.3295, y: 0.2519, width: 0.0182, height: 0.0143}}],
        maskName: ["Vessels"],
        channel: "All markers"
    },
    r034: {
        panCoord: {x: 0.3143, y: 0.2603},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.3046, y: 0.2526, width: 0.0195, height: 0.0154}}],
        maskName: ["Vessels"],
        channel: "All markers"
    },
    r035: {
        panCoord: {x: 0.6233, y: 0.164},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.6107, y: 0.1566, width: 0.0252, height: 0.015}}],
        maskName: ["Vessels"],
        channel: "All markers"
    },
    r036: {
        panCoord: {x: 0.2237, y: 0.7041},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.2103, y: 0.6939, width: 0.0268, height: 0.0204}}],
        maskName: ["Vessels"],
        channel: "All markers"
    },
    // best-in-class connective tissue
    r037: {
        panCoord: {x: 0.3282, y: 0.286},
        zoomRatio: 4.7963,
        ROIBox: [{overlay: {x: 0.318, y: 0.276, width: 0.0204, height: 0.0204}}],
        maskName: ["Submucosa connective tissues"],
        channel: "All markers"
    },
    r038: {
        panCoord: {x: 0.565, y: 0.1814},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.5548, y: 0.1712, width: 0.0204, height: 0.0204}}],
        maskName: ["Submucosa connective tissues"],
        channel: "All markers"
    },
    r039: {
        panCoord: {x: 0.292, y: 0.5537},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.2818, y: 0.5435, width: 0.0204, height: 0.0204}}],
        maskName: ["Submucosa connective tissues"],
        channel: "All markers"
    },
    r040: {
        panCoord: {x: 0.2793, y: 0.7091},
        zoomRatio: 4.6183,
        ROIBox: [{overlay: {x: 0.2691, y: 0.6989, width: 0.0204, height: 0.0204}}],
        maskName: ["Submucosa connective tissues"],
        channel: "All markers"
    }
}

const grossDetailMuscleLayers = {
    name: 'grossDetailML',
    panCoord: {x: 0.5, y: 0.3407},
    zoomRatio: 0.5962,
    ROIBox: [{overlay: {x: 0.3735, y: 0.0011, width: 0.451, height: 0.3561}}],
}

const grossDetailColonicPatch = {
    name: 'grossDetailCP',
    panCoord: {x: 0.5, y: 0.5},
    zoomRatio: 0.6216,
    ROIBox: [{overlay: {x: 0.4398, y: 0.5893, width: 0.033, height: 0.02}}, {overlay: {x: 0.3505, y: 0.52, width: 0.033, height: 0.026}}, {overlay: {x: 0.3679, y: 0.239, width: 0.035, height: 0.024}}],
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
        svgContainer.data = 'svgs/colonGross.svg'
        svgContainer.type = 'image/svg+xml'
        svgContainer.id = 'grossImage'
        // Add interactivity to the clickable regions in the cartoon image SVG
        svgContainer.onload = function (){
            const doc = this.getSVGDocument();
            const colonicPatch = doc.querySelector('#colonicPatch');
            addEListener(osd, grossDetailColonicPatch, colonicPatch, ['panZoom'], storyNum, waypointNum)
            const muscleLayers = doc.querySelector('#muscleLayers');
            addEListener(osd, grossDetailMuscleLayers, muscleLayers, ['panZoom'], storyNum, waypointNum);
            finish_waypoint('')
        }
        domElement.appendChild(svgContainer);
    }

    else if (waypointNum === 1 && storyNum === 1) {
        const svgContainer = document.createElement('object');
        svgContainer.data = 'svgs/colonDetail.svg'
        svgContainer.type = 'image/svg+xml'
        svgContainer.id = 'detailImage'
        // Add interactivity to the clickable regions in the cartoon image SVG
        svgContainer.onload = function (){
            const doc = this.getSVGDocument();
            const cirMus = doc.querySelector('#circularMuscle');
            addEListener(osd, allROIs.r013, cirMus, ['addMaskAndChannel', 'panZoom'], storyNum, waypointNum);
            const longMus = doc.querySelector('#longitudinalMuscle');
            addEListener(osd, allROIs.r017, longMus, ['addMaskAndChannel', 'panZoom'], storyNum, waypointNum);
            const connTiss = doc.querySelector('#connectiveTissue');
            addEListener(osd, allROIs.r037, connTiss, ['addMaskAndChannel', 'panZoom'], storyNum, waypointNum);
            const epithelium = doc.querySelector('#epithelium');
            addEListener(osd, allROIs.r005Epi, epithelium, ['addMaskAndChannel', 'panZoom'], storyNum, waypointNum);
            const musMuc = doc.querySelector('#muscularisMucosae');
            addEListener(osd, allROIs.r024, musMuc, ['addMaskAndChannel', 'panZoom'], storyNum, waypointNum);
            const enteroCells = doc.querySelector('#enteroCells');
            addEListener(osd, allROIs.r032, enteroCells, ['addMaskAndChannel', 'panZoom'], storyNum, waypointNum);
            const colPatch = doc.querySelector('#colonicPatch');
            addEListener(osd, allROIs.r007, colPatch, ['addMaskAndChannel', 'panZoom'], storyNum, waypointNum);
            const vessels = doc.querySelector('#vessels');
            addEListener(osd, allROIs.r033, vessels, ['addMaskAndChannel', 'panZoom'], storyNum, waypointNum);
            const lamProp = doc.querySelector('#laminaPropria');
            addEListener(osd, allROIs.r005LamProp, lamProp, ['addMaskAndChannel', 'panZoom'], storyNum, waypointNum);
            finish_waypoint('')
        }
        domElement.appendChild(svgContainer);
    }

    else if (waypointNum === 4 && storyNum === 1){
        const svgContainer = document.createElement('object');
        svgContainer.data = 'svgs/Wpt6-Heatmap.svg';
        svgContainer.type = 'image/svg+xml';
        svgContainer.id = 'heatmap';
        // Add interactivity to each column in the heatmap SVG file. Columns have ids that exactly match the object keys
        svgContainer.onload = function (){
            const doc = this.getSVGDocument();
            Object.entries(allROIs).forEach(([key, val]) => {
                const el = doc.querySelector(`#${key}`);
                if (el) {
                    addEListener(osd, val, el, ['addMaskAndChannel', 'panZoom'], storyNum, waypointNum)
                }
            });
            finish_waypoint('')
        }
        domElement.appendChild(svgContainer);

        //insert table that matches the heatmap pathways to their abbreviation below the heatmap in the waypoint.
        const tableDiv = document.createElement('div');
        tableDiv.id = 'pathwayTable'
        const table_showdown = new showdown.Converter({tables: true});
        const pathways = "| Abbr. | Full Gene Set Name |\n|-----|---------|\n| CMC | Cardiac muscle contraction |\n| TMS | Tropomyosin |\n| VSM | Vascular smooth muscle contraction |\n| LTM | Leukocyte transendothelial migration |\n| PID | Primary immunodeficiency |\n| INI | Intestinal immune network for IgA production |\n| EPE | Exosomal proteins of epithelial cells |\n| ESC | Epithelial sodium channel (SCNN)";
        const table_html = table_showdown.makeHtml(pathways)
        tableDiv.innerHTML = table_html
        domElement.appendChild(tableDiv)
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
    if (document.querySelector('[id^=ROIBox]')){
        const ROIBoxes = document.querySelectorAll('[id^=ROIBox]')
        for (let box of ROIBoxes){
            osd.viewer.removeOverlay(box.id)  
            document.querySelector(`#${box.id}`).remove()
        }
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
    'css': css,
    // other story config
};

const styleElement = document.createElement('style');
styleElement.innerText = css;
document.head.appendChild(styleElement);