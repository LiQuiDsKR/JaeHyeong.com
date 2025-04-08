const fameProbability = [
    { fame: 1, probability: 8.22 }, { fame: 2, probability: 8.33 },
    { fame: 3, probability: 8.33 }, { fame: 4, probability: 8.33 },
    { fame: 5, probability: 8.33 }, { fame: 6, probability: 8.33 },
    { fame: 7, probability: 8.33 }, { fame: 8, probability: 8.33 },
    { fame: 9, probability: 1.44 }, { fame: 10, probability: 1.11 },
    { fame: 11, probability: 1.11 }, { fame: 12, probability: 1.22 },
    { fame: 13, probability: 1.00 }, { fame: 14, probability: 1.11 },
    { fame: 15, probability: 1.11 }, { fame: 16, probability: 1.00 },
    { fame: 17, probability: 1.11 }, { fame: 18, probability: 1.00 },
    { fame: 19, probability: 1.00 }, { fame: 20, probability: 1.00 },
    { fame: 21, probability: 1.00 }, { fame: 22, probability: 1.00 },
    { fame: 23, probability: 0.89 }, { fame: 24, probability: 1.00 },
    { fame: 25, probability: 0.89 }, { fame: 26, probability: 0.89 },
    { fame: 27, probability: 0.89 }, { fame: 28, probability: 0.78 },
    { fame: 29, probability: 0.89 }, { fame: 30, probability: 0.78 },
    { fame: 31, probability: 0.78 }, { fame: 32, probability: 0.78 },
    { fame: 33, probability: 0.78 }, { fame: 34, probability: 0.78 },
    { fame: 35, probability: 0.67 }, { fame: 36, probability: 0.67 },
    { fame: 37, probability: 0.67 }, { fame: 38, probability: 0.67 },
    { fame: 39, probability: 0.67 }, { fame: 40, probability: 0.56 },
    { fame: 41, probability: 0.56 }, { fame: 42, probability: 0.56 },
    { fame: 43, probability: 0.56 }, { fame: 44, probability: 0.44 },
    { fame: 45, probability: 0.44 }, { fame: 46, probability: 0.44 },
    { fame: 47, probability: 0.33 }, { fame: 48, probability: 0.33 },
    { fame: 49, probability: 0.22 }, { fame: 50, probability: 0.22 },
    { fame: 51, probability: 0.11 }
];

function getRandomFame() {
    let random = Math.random() * 100;
    let cumulative = 0;
    for (let item of fameProbability) {
        cumulative += item.probability;
        if (random <= cumulative) return item.fame;
    }
    return 1;
}
