import axios from 'axios';

// let postcodes = [
//     { postcode: "M1", council: "Manchester" },
//     { postcode: "M2", council: "Manchester" },
//     { postcode: "M3", council: "Manchester" },
//     { postcode: "M4", council: "Manchester" },
//     { postcode: "M5", council: "Salford" },
//     { postcode: "M6", council: "Salford" },
//     { postcode: "M7", council: "Salford" },
//     { postcode: "M8", council: "Manchester" },
//     { postcode: "M9", council: "Manchester" },
//     { postcode: "M11", council: "Manchester" },
//     { postcode: "M12", council: "Manchester" },
//     { postcode: "M13", council: "Manchester" },
//     { postcode: "M14", council: "Manchester" },
//     { postcode: "M15", council: "Manchester" },
//     { postcode: "M16", council: "Trafford" },
//     { postcode: "M17", council: "Trafford" },
//     { postcode: "M18", council: "Manchester" },
//     { postcode: "M19", council: "Stockport" },
//     { postcode: "M20", council: "Manchester" },
//     { postcode: "M21", council: "Manchester" },
//     { postcode: "M22", council: "Manchester" },
//     { postcode: "M23", council: "Manchester" },
//     { postcode: "M24", council: "Oldham" },
//     { postcode: "M25", council: "Bury" },
//     { postcode: "M26", council: "Bolton" },
//     { postcode: "M27", council: "Salford" },
//     { postcode: "M28", council: "Wigan" },
//     { postcode: "M29", council: "Wigan" },
//     { postcode: "M30", council: "Salford" },
//     { postcode: "M31", council: "Trafford" },
//     { postcode: "M32", council: "Trafford" },
//     { postcode: "M33", council: "Trafford" },
//     { postcode: "M34", council: "Tameside" },
//     { postcode: "M35", council: "Oldham" },
//     { postcode: "M38", council: "Salford" },
//     { postcode: "M40", council: "Manchester" },
//     { postcode: "M41", council: "Trafford" },
//     { postcode: "M43", council: "Tameside" },
//     { postcode: "M44", council: "Salford" },
//     { postcode: "M45", council: "Bury" },
//     { postcode: "M46", council: "Wigan" },
//     { postcode: "M50", council: "Salford" },
//     { postcode: "M60", council: "Manchester" },
//     { postcode: "M61", council: "Manchester" },
//     { postcode: "M90", council: "Manchester" },
//     { postcode: "M99", council: "Manchester" }
// ];

function postcodeToCouncil (str) {

    if (str.length > 7 || str.length < 5) return 'Invalid postcode';
    let code;
    // if theres space in the input
    if (str.match(/\s/)) {
        code = str.match(/^\S*/)[0].toUpperCase();
    } else {
    // if theres no space in the input
        code = str.length > 5 ? str.slice(0, 3).toUpperCase() : str.slice(0, 2).toUpperCase();
    }

    axios
    .get('https://vast-eyrie-43528.herokuapp.com/api/postcodes')
    .then(function (res) {
        return res.data.postcode.find(key => key.postcode === code).council;
    })
    .catch(function (err) {
        console.log(err);
    });
    
    
}

module.exports = {
    postcodeToCouncil: postcodeToCouncil
};
