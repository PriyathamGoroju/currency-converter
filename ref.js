
  async function fetchCurrencyRates() {
    try {
        const response = await axios.get('https://v6.exchangerate-api.com/v6/6b423b79a1aae5b668e6c644/latest/USD');
        const rates = response.data.conversion_rates;
        return rates;
    } catch (error) {
        console.error('Error fetching currency rates:', error);
        throw error;
    }
    }

    async function populateCurrencyDropdowns() {
        const rates = await fetchCurrencyRates();
        const fromCurrencyDropdown = document.getElementById('fromCurrency');
        const toCurrencyDropdown = document.getElementById('toCurrency');
        const flagContainerFrom = document.getElementById('flagContainerFrom');
        const flagContainerTo = document.getElementById('flagContainerTo');


        for (const currency in rates) {
            const option = document.createElement('option');
            option.value = currency;
            option.text = currency;

            fromCurrencyDropdown.appendChild(option);
            toCurrencyDropdown.appendChild(option.cloneNode(true));
        }
    }


    const convertButton = document.getElementById('convert');
    const resultElement = document.getElementById('result');


    convertButton.addEventListener('click', async () => {
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const amount = parseFloat(document.getElementById('amount').value);

    const rates = await fetchCurrencyRates();
    const exchangeRate = rates[toCurrency] / rates[fromCurrency];
    const convertedAmount = amount * exchangeRate;

    resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    });

    populateCurrencyDropdowns();


    const fromflag = document.getElementById('fromCurrency');
    fromflag.onclick = (event) => {
        Flag('flagContainerFrom', event.target.value);
    };   
    const toflag = document.getElementById('toCurrency');
    toflag.onclick = (event) => {
        Flag('flagContainerTo', event.target.value);
    };

    function Flag(containerId, currency) {
        const flagContainer = document.getElementById(containerId);
        const flagImg = document.createElement('img');
        flagImg.src = `https://flagsapi.com/${currencyFlagMap[currency]}/flat/64.png`;
        flagImg.alt = `${currency} Flag`;
        flagContainer.innerHTML = `<img src="${flagImg.src}" alt="${flagImg.alt}" />`;
    }
    Flag('flagContainerFrom', 'USD');
    Flag('flagContainerTo', 'USD');

        