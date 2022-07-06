function doGet() {
    const htmlService = HtmlService.createTemplateFromFile('main').evaluate().addMetaTag('viewport', 'width=device-width, initial-scale=1.0')

    return htmlService
}

