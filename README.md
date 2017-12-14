# CrowdCurio Time Series Annotator Library

The CrowdCurio Time Series Annotation Library implements classification tasks for time series. 

![A screenshot of the Time Series Annotator.](https://s3.amazonaws.com/curio-media/github-media/time-series-annotator.png)

## Features
- Support for feature annotation tasks.
- Support for interactive practice tasks.
- Support for multivariate time series.
- Support for medical time series in EDF format.
- Integrated support for CrowdCurio.

## Build Process
We use Browserify, Wachify and Uglify in our build processes. All three tools can be installed with NPM.

>npm install -g browserify

>npm install -g watchify

>npm install -g uglify-js

To build the script bundle *without* minification, run:
>browserify lib/main.js -o bundle.js

To build *with* minification, run:
>browserify lib/main.js | uglifyjs bundle.js

To watch for file changes and automatically bundle *without* minification, run:
>watchify lib/main.js -o bundle.js

## Contact
Mike Schaekermann, University of Waterloo