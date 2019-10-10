var dataService = require('./data.service');
var helperService = require('./helper.service');
var eventBusService = require('./event-bus.service');
const css = require('css');
const axios = require('axios');


module.exports = cssService = {

    startup: async function () {
        // eventBusService.on('getRenderedPagePostDataFetch', async function (options) {
        //     if (options) {
        //         await mediaService.processHeroImage(options.page);
        //     }
        // });
    },

    getGeneratedCss: async function () {

        var cssString = 'body {background:lightblue;}';
        cssString = await this.processSections(cssString)
        var ast = css.parse(cssString);

        let cssFile = css.stringify(ast);
        return cssFile;
    },

    processSections: async function (cssString) {

        let sections = await dataService.getContentByContentType('section')
        sections.forEach(section => {
            if (section.data.background) {
                if (section.data.background.type === 'color') {
                    let color = section.data.background.color;
                    cssString += ` section[data-id="${section.id}"]{background-color:${color}}`
                }
            }
        });

        return cssString;
    }



}