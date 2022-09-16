import { addEListener } from './nanostringUtils';

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
        svgContainer.data = 'img/GrossLiverAnatomy.svg'
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
        const arrayLinks = [
            {
                text: "Liver lobular zones",
                id: "zoneClick",
                panTo: {
                    x: 0.314,
                    y: 0.283
                },
                zoomTo: 7
            },
            {
                text: "Portal triad",
                id: "portalClick",
                panTo: {
                    x: 0.258,
                    y: 0.394
                },
                zoomTo: 18
            },
            {
                text: "Central Vein",
                id: "centralClick",
                panTo: {
                    x: 0.337,
                    y: 0.544
                },
                zoomTo: 18
            },
            {
                text: "Kupffer cells",
                id: "kupfferClick",
                panTo: {
                    x: 0.215,
                    y: 0.382
                },
                zoomTo: 18
            },
            {
                text: "Sinusoids and Steller cells",
                id: "sinusoidClick",
                panTo: {
                    x: 0.251,
                    y: 0.284
                },
                zoomTo: 18
            },
        ]
        let desc_html = document.querySelector('.minerva-viewer-waypoint').innerHTML;
        arrayLinks.forEach(function(attrs) {
            const reg = new RegExp('<li>'+attrs.text, "g")
            desc_html = desc_html.replace(reg,`<li><button id="${attrs.id}">${attrs.text}</button>`);
        })
        document.querySelector('.minerva-viewer-waypoint').innerHTML = desc_html;
        arrayLinks.forEach(function(attrs) {
            const button = document.querySelector('#'+attrs.id);
            button.addEventListener("click", () => {
                osd.viewer.viewport.panTo({x: attrs.panTo.x, y: attrs.panTo.y});
                osd.viewer.viewport.zoomTo(attrs.zoomTo);
                // addSlidePolygon("placentaPolygon", slidePlacenta, osd);
            });
        })

        const svgContainer = document.createElement('object');
        svgContainer.data = 'img/DetailedLiverAnatomy.svg'
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