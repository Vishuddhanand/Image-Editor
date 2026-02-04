let filters = {
    brightness: { value: 100, min: 0, max: 200, unit: "%" },
    contrast: { value: 100, min: 0, max: 200, unit: "%" },
    saturation: { value: 100, min: 0, max: 200, unit: "%" },

    hueRotation: { value: 0, min: 0, max: 360, unit: "deg" },
    blur: { value: 0, min: 0, max: 20, unit: "px" },
    grayscale: { value: 0, min: 0, max: 100, unit: "%" },
    invert: { value: 0, min: 0, max: 100, unit: "%" },

    opacity: { value: 100, min: 0, max: 100, unit: "%" }
};


const imageCanvas = document.querySelector('#image-canvas')
const filtersContainer = document.querySelector('.filters')
const imgInput = document.querySelector('#image-input')
const canvasCtx = imageCanvas.getContext("2d")
let file = null;
let image = null;

const resetBtn = document.querySelector('#reset-btn');
const downloadBtn = document.querySelector('#download-btn');
const presetsContainer = document.querySelector('.presets');

function createFilterElement(name, value, min, max, unit) {
    const div = document.createElement("div");
    div.classList.add("filter");

    const p = document.createElement("p");
    p.innerText = name;

    const input = document.createElement("input");
    input.type = "range";
    input.min = min;
    input.max = max;
    input.value = value;

    input.addEventListener("input", () => {
        filters[name].value = input.value;
        applyFilters();
    });

    div.appendChild(p);
    div.appendChild(input);
    return div;
}

function createFilters() {
    Object.keys(filters).forEach(key => {
        const { value, min, max, unit } = filters[key];

        const filterElement = createFilterElement(
            key,
            value,
            min,
            max,
            unit
        );

        filtersContainer.appendChild(filterElement);
    });
}

createFilters();


imgInput.addEventListener('change', (event) => {
    file = event.target.files[0];

    const imagePlaceholder = document.querySelector('.placeholder');
    imageCanvas.style.display = 'block';
    imagePlaceholder.style.display = 'none';

    const img = new Image();
    image = img;

    img.src = URL.createObjectURL(file);

    img.onload = () => {
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        applyFilters();
    };
});


function applyFilters() {

    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    canvasCtx.filter = `
        brightness(${filters.brightness.value}${filters.brightness.unit})
        contrast(${filters.contrast.value}${filters.contrast.unit})
        saturate(${filters.saturation.value}${filters.saturation.unit})
        hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
        blur(${filters.blur.value}${filters.blur.unit})
        grayscale(${filters.grayscale.value}${filters.grayscale.unit})
        opacity(${filters.opacity.value}${filters.opacity.unit})
        invert(${filters.invert.value}${filters.invert.unit})
    `.trim()

    canvasCtx.drawImage(image, 0, 0);
}

resetBtn.addEventListener('click', () => {
    filters = {
        brightness: { value: 100, min: 0, max: 200, unit: "%" },
        contrast: { value: 100, min: 0, max: 200, unit: "%" },
        saturation: { value: 100, min: 0, max: 200, unit: "%" },

        hueRotation: { value: 0, min: 0, max: 360, unit: "deg" },
        blur: { value: 0, min: 0, max: 20, unit: "px" },
        grayscale: { value: 0, min: 0, max: 100, unit: "%" },
        invert: { value: 0, min: 0, max: 100, unit: "%" },

        opacity: { value: 100, min: 0, max: 100, unit: "%" }
    };

    applyFilters();
    filtersContainer.innerHTML = "";
    createFilters();
})

downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = imageCanvas.toDataURL();
    link.click();
});

const presets = {
    "Vintage": {
        brightness: 120,
        contrast: 90,
        saturation: 80,
        hueRotation: 30,
        blur: 2,
        grayscale: 20,
        invert: 0,
        opacity: 100
    },
    "Cool Tone": {
        brightness: 90,
        contrast: 110,
        saturation: 120,
        hueRotation: 200,
        blur: 0,
        grayscale: 0,
        invert: 0,
        opacity: 100
    },
     "Old School Warm": {
        brightness: 110,
        contrast: 90,
        saturation: 85,
        hueRotation: 25,
        blur: 0,
        grayscale: 15,
        invert: 0,
        opacity: 100
    },
    "Black & White": {
        brightness: 100,
        contrast: 150,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        grayscale: 100,
        invert: 0,
        opacity: 100
    },
    "Soft Focus": {
        brightness: 110,
        contrast: 100,
        saturation: 100,
        hueRotation: 0,
        blur: 5,
        grayscale: 0,
        invert: 0,
        opacity: 100
    },
    "High Contrast": {
        brightness: 100,
        contrast: 200,
        saturation: 100,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        invert: 0,
        opacity: 100
    },
    
    "Cyber Punk": {
        brightness: 110,
        contrast: 160,
        saturation: 140,
        hueRotation: 290,
        blur: 0,
        grayscale: 0,
        invert: 0,
        opacity: 100
    },

     "Retro Pop": {
        brightness: 120,
        contrast: 140,
        saturation: 150,
        hueRotation: 60,
        blur: 0,
        grayscale: 0,
        invert: 0,
        opacity: 100
    },

    "Cold Night": {
        brightness: 85,
        contrast: 120,
        saturation: 90,
        hueRotation: 220,
        blur: 1,
        grayscale: 0,
        invert: 0,
        opacity: 100
    },
    "Brown Sepia": {
        brightness: 115,
        contrast: 95,
        saturation: 80,
        hueRotation: 30,
        blur: 0,
        grayscale: 35,
        invert: 0,
        opacity: 100
    }


};


Object.keys(presets).forEach(presetName => {
    const presetButton = document.createElement('button');
    presetButton.classList.add('btn');
    presetButton.innerText = presetName;
    presetsContainer.appendChild(presetButton);

    presetButton.addEventListener('click', () => {
        const preset = presets[presetName];
        Object.keys(preset).forEach(filterName => {
            filters[filterName].value = preset[filterName];
        });
        applyFilters();
        filtersContainer.innerHTML = "";
        createFilters();
    });

});
