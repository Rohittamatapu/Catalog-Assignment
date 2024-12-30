const fs = require('fs');

function lagrangeInterpolation(points, k) {
    let c = 0;
    for (let i = 0; i < k; i++) {
        let [xi, yi] = points[i];
        let term = yi;
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let [xj, _] = points[j];
                term *= -xj / (xi - xj);
            }
        }
        c += term;
    }
    return Math.round(c);
}

function findConstantTerm(filename) {
    const data = JSON.parse(fs.readFileSync(filename, 'utf8'));
    const { n, k } = data.keys;

    const points = [];
    for (let key in data) {
        if (key === 'keys') continue;
        const x = parseInt(key); 
        const { base, value } = data[key];
        const y = parseInt(value, parseInt(base));
        points.push([x, y]);
    }

   
    points.sort((a, b) => a[0] - b[0]);

    const result = lagrangeInterpolation(points.slice(0, k), k);

    console.log(`Secret (c) for ${filename}: ${result}`);
    return result;
}

findConstantTerm('testcase1.json'); 
findConstantTerm('testcase2.json'); 
