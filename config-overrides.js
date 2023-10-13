// work around fs not found error
module.exports = function override(config, env) {
  console.log("React app rewired works!")
  config.resolve.fallback = {
    fs: false
  };
  return config;
};