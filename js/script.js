window.addEventListener("load", function () {
    const loader = document.querySelector(".loader");
    loader.className += " hidden"; // class "loader hidden"
});

const getCountries = () => {
    "use strict";

    fetch('https://restcountries.eu/rest/v2/all?fields=name;currencies;languages;population;area;flag')
        .then(res => res.json())
        .then(data => {

            const tableBody = document.querySelector('.countries__table-body');

            for (let i = 0; i < data.length; i++) {
                const row = `<tr>
                                <td>${data[i].name}</td>
                                <td>${data[i].currencies[0].code}</td>
                                <td>${data[i].languages[0].name}</td>
                                <td>${data[i].population}</td>
                                <td>${data[i].area} km<sup>2</sup>
                                </td>
                                <td class="countries__table-flag">
                                <img src="${data[i].flag}" alt="country's flag" class="countries__table-flag-img">
                                </td>
                            </tr>`

                tableBody.innerHTML += row;
            }

            const rows = Array.from(tableBody.querySelectorAll('tr'));

            rows.forEach((row) => {
                row.className = 'order';
            });
            // CHECK POPULATION IN A GIVEN RANGE

            const order = document.querySelectorAll('.order');
            const thead = document.querySelector('thead');
            const th = thead.querySelectorAll('.sortable');

            const populationRange = () => {
                const minPopulation = document.querySelector('#search__box-range-min');
                const maxPopulation = document.querySelector('#search__box-range-max');
                const btnCheck = document.querySelector('.search__box-range-btn');

                const checkValue = () => {
                    const warnText = document.querySelector('.search__box-warn')
                    if (minPopulation.value === '' || maxPopulation.value === '') {
                        alert('Wszystkie pola muszą być uzupełnione!')
                    } else {
                        checkPopulation();
                    }

                    if (maxPopulation.value < minPopulation.value) {
                        alert('Podaj poprawny przedział');
                    } else {
                        checkPopulation();
                    }
                }

                const checkPopulation = () => {
                    let minValue = Number(minPopulation.value);
                    let maxValue = Number(maxPopulation.value);
                    let j = 0;

                    order.forEach((element) => {
                        thead.style.opacity = '1'
                        if (element.children[3].innerHTML > minValue && element.children[3].innerHTML < maxValue) {
                            element.style.display = '';
                        } else {
                            element.style.display = 'none';
                            j++;
                            if (j === order.length) {
                                thead.style.opacity = '0.2'
                            }
                        }
                    });
                }

                btnCheck.addEventListener('click', () => {
                    checkValue();
                })
            }
            populationRange();


            // SEARCHBOX

            const searchValue = () => {
                const searchInput = document.querySelector('#search__box-main-input');

                const startSearch = () => {
                    const inputValue = searchInput.value.toUpperCase().trim();
                    let j = 0;

                    order.forEach((element) => {
                        thead.style.opacity = '1'
                        if (element.innerText.toUpperCase().indexOf(inputValue) > -1) {
                            element.style.display = '';
                        } else {
                            element.style.display = 'none';
                            j++;
                            if (j === order.length) {
                                thead.style.opacity = '0.2'
                            }
                        }
                    });
                }

                searchInput.addEventListener('keyup', () => {
                    startSearch();
                });
            }
            searchValue();


            //SORT TABLE

            function sortTableByColumn(table, column, asc = true) {
                const direction = asc ? 1 : -1;

                // Sort each row
                const sortedRows = rows.sort((a, b) => {
                    let aColText = a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
                    let bColText = b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();

                    if (!isNaN(parseFloat(aColText)) && !isNaN(parseFloat(bColText))) {
                        aColText = parseFloat(aColText)
                        bColText = parseFloat(bColText)
                    }

                    return aColText > bColText ? (1 * direction) : (-1 * direction);
                });

                // Remove all existing TRs from the table
                while (tableBody.firstChild) {
                    tableBody.removeChild(tableBody.firstChild);
                }

                // Re-add the newly sorted rows
                tableBody.append(...sortedRows);

                // Remember how the column is currently sorted
                th.forEach(el => el.classList.remove("th-sort-asc", "th-sort-desc"));
                table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-asc", asc);
                table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-desc", !asc);
            }

            th.forEach((headerCell, index) => {
                headerCell.addEventListener("click", () => {
                    const tableElement = headerCell.closest('table');
                    const headerIndex = index;
                    const currentIsAscending = headerCell.classList.contains("th-sort-asc");

                    sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
                });
            });

        })

}
getCountries();