module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                  @import "@/assets/scss/theme.scss";
                  @import "@/assets/scss/spacing.scss";
                `
            }
        }
    },
    pluginOptions: {
        apollo: {
            lintGQL: true
        }
    }
};
