const path = require("node:path");
const sass = require("sass");

module.exports = function (eleventyConfig) {
  // Pass normal static assets straight through
  eleventyConfig.addPassthroughCopy("src/assets/docs");
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/img");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/icon.png");
  eleventyConfig.addPassthroughCopy("src/loader.png");

  // NATIVE SCSS COMPILATION PIPELINE
  eleventyConfig.addTemplateFormats("scss");
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    useLayouts: false,
    compile: async function (inputContent, inputPath) {
      let parsed = path.parse(inputPath);

      // Skip processing partial files starting with an underscore
      if (parsed.name.startsWith("_")) {
        return;
      }

      // Compile the SCSS entrypoint
      let result = sass.compileString(inputContent, {
        loadPaths: [parsed.dir || ".", this.config.dir.includes],
      });

      // Track layout dependencies for fast incremental rebuilding
      this.addDependencies(inputPath, result.loadedUrls);

      // Return a function that delivers the pure CSS output
      return async () => result.css;
    },
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
  };
};
