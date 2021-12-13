const getInfo = () => {

    fetch('https://restcountries.com/v2/all?fields=name,languages,currencies,population,area,borders')
        .then(res => res.json())
        .then(data => {

            let countriesArr = [];
            let langArr = [];
            let currencyArr = [];
            let populationArr = [];
            let areaArr = [];
            let neighboursArr = [];

            for (let i = 0; i < data.length; i++) {
                countriesArr.push(data[i].name);
                langArr.push(data[i].languages[0].name);
                currencyArr.push(data[i].currencies[0].code);
                populationArr.push(data[i].population);
                areaArr.push(data[i].area);
                neighboursArr.push(data[i].borders);
            }

            //TOTAL NR OF COUNTRIES
            const showCountries = () => {
                const countriesInfo = document.querySelector('.countries__number');

                const totalNumber = countriesArr.length;
                countriesInfo.innerText = totalNumber;
            }
            showCountries();

            //TOP 5 LANGUAGES
            const topLanguages = (langArr) => {
                const langInfo = document.querySelector('.countries_lang');
                let counter = {};

                for (let i = 0; i < langArr.length; i++) {
                    if (counter[langArr[i]]) {
                        counter[langArr[i]] += 1
                    } else {
                        counter[langArr[i]] = 1
                    }
                }
                const showTopLang = (o, n) => {
                    let keys = Object.keys(o);
                    keys.sort(function (a, b) {
                        return o[b] - o[a];
                    })
                    return keys.slice(0, n).join(', ');
                }
                langInfo.innerText = showTopLang(counter, 5);
            }
            topLanguages(langArr);

            //TOP 5 CURRENCIES

            const topCurrencies = (currencyArr) => {
                const currencyInfo = document.querySelector('.countries__currency');
                let counter = {};

                for (let i = 0; i < currencyArr.length; i++) {
                    if (counter[currencyArr[i]]) {
                        counter[currencyArr[i]] += 1
                    } else {
                        counter[currencyArr[i]] = 1
                    }
                }
                const showTopCurrency = (o, n) => {
                    let keys = Object.keys(o);
                    keys.sort(function (a, b) {
                        return o[b] - o[a];
                    })
                    return keys.slice(0, n).join(', ');
                }
                currencyInfo.innerText = showTopCurrency(counter, 5);
            }

            topCurrencies(currencyArr);

            //AVERAGE POPULATION

            const showPopulation = () => {
                const populationInfo = document.querySelector('.countries__population');

                const populationNr = populationArr.map(Number).reduce((x, y) => x + y)
                const avgPop = populationNr / populationArr.length;
                populationInfo.innerText = `${avgPop.toFixed()} mln`
            }
            showPopulation();

            //AVERAGE AREA

            const showArea = () => {
                const areaInfo = document.querySelector('.countries__area')

                areaArr = areaArr.map(function (item) {
                    return item == undefined ? null : item
                });
                const avArea = areaArr.reduce((a, b) => a + b) / areaArr.length;
                areaInfo.innerHTML = `${avArea.toFixed()} km<sup>2</sup>`;
            }
            showArea();

            //AVERAGE NEIGHBOURS
            const showNeighbours = () => {
                const neighboursInfo = document.querySelector('.countries__neighbours');

                let sum = 0;
                for (let i = 0; i < neighboursArr.length; i++) {
                    sum += neighboursArr[i].length;
                }
                const neighboursNr = sum / neighboursArr.length;
                neighboursInfo.innerText = neighboursNr;
            }
            showNeighbours();

        }).catch((error) => {
            alert('BŁĄD:', error);
        });
}

getInfo();