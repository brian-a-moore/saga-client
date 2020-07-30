const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

(() => {
    let rawFiles = fs.readdirSync(__dirname)
        .filter(file => {
            return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-4) === '.png')
        });

    let files = [];

    for(let f = 0; f < rawFiles.length; f++) {
        let file = rawFiles[f].slice(0, rawFiles[f].length - 4);
        let replacement = file.replace(/-/g, ' ').replace(/_/g, ' ');
        let split = replacement.split(' ');

        for(let x = 0; x < split.length; x++) {
            split[x] = split[x].charAt(0).toUpperCase() + split[x].slice(1);
        }

        let displayName = split.join(' ');

        files.push({
            id: file,
            title: displayName,
            raw: file
        });
    }

    console.log(files);

})();