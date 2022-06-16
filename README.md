# Easiest way to run for development

```cd source```

```npm i```

This test step also compiles the code for node. Not the exe. Read below for exe instructions.

```npm test```

```node ./index.js```

# Run v1.0

Go to this folder

```cd ./anagram/compile-v1```

And run the appropriate exe depending on your system. There are executables for windows, linux and mac.

```./anagram-win.exe```

# Run v2.0

```cd ./anagram/compile-v2/```

```./anagram-win.exe```

# How to compile with pkg to make a cross platform exe

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

# Time Taken

1 hour to setup the project for typescript, jest and es6 modules. Did it manually. Could have used yeoman or scaffolding like Rails provides.