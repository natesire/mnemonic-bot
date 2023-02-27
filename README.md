# Dependencies

This repo depends on Redis to store the dictionary and anagrams

# Easiest way to run for development

```cd source```

```npm i```

This test step also compiles the code for node. Not the exe. Read below for exe instructions.

```npm test```

```node ./index.js```

# Experimental - How to compile with pkg to make a cross platform exe

pkg is having trouble with the new es6 modules.

```npm install --global pkg```

```pkg index.js```

# Manual Setup

You will need Node JS installed on your machine to run the script.

For Ubuntu

https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04

Install node for windows

https://nodejs.org/en/download/

# Optional - Redis Setup for MicroService

https://www.npmjs.com/package/redis

# Troubleshooting

make sure the jest config file uses es modules and not module.exports = {}
