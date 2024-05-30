document.addEventListener('DOMContentLoaded', () => {
    const transferForm = document.getElementById('transfer-form');
    const conversionResult = document.getElementById('conversion-result');
    const sendAmountInput = document.getElementById('send-amount');
    const sendCurrencySelect = document.getElementById('send-currency');
    const receiveAmountInput = document.getElementById('receive-amount');
    const receiveCurrencySelect = document.getElementById('receive-currency');

    const updateReceivedAmount = () => {
        const sendAmount = parseFloat(sendAmountInput.value);
        const sendCurrency = sendCurrencySelect.value;
        const receiveCurrency = receiveCurrencySelect.value;

        if (isNaN(sendAmount) || sendAmount <= 0) {
            receiveAmountInput.value = '';
            return;
        }

        fetch(`https://api.exchangerate-api.com/v4/latest/${sendCurrency}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[receiveCurrency];
                const receiveAmount = sendAmount * rate;
                receiveAmountInput.value = receiveAmount.toFixed(2);
                displayConversionResult(receiveAmount, receiveCurrency, rate);
            })
            .catch(error => console.error('Erreur:', error));
    };

    const displayConversionResult = (receiveAmount, receiveCurrency, rate) => {
        conversionResult.innerHTML = `
            <p>Montant Converti: ${receiveAmount.toFixed(2)} ${receiveCurrency}</p>
            <p>Taux de Conversion: ${rate}</p>
        `;
    };

    if (transferForm) {
        transferForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const recipientName = document.getElementById('recipient-name').value;
            const recipientAccount = document.getElementById('recipient-account').value;
            const sendAmount = parseFloat(sendAmountInput.value);
            const sendCurrency = sendCurrencySelect.value;
            const receiveAmount = parseFloat(receiveAmountInput.value);
            const receiveCurrency = receiveCurrencySelect.value;

            displayTransferResult(recipientName, recipientAccount, sendAmount, sendCurrency, receiveAmount, receiveCurrency);
        });
    }

    const displayTransferResult = (recipientName, recipientAccount, sendAmount, sendCurrency, receiveAmount, receiveCurrency) => {
        conversionResult.innerHTML = `
            <p>Transfert de ${sendAmount} ${sendCurrency} à ${recipientName} (compte ${recipientAccount}) complété.</p>
            <p>Montant reçu : ${receiveAmount} ${receiveCurrency}</p>
        `;
    };

    sendAmountInput.addEventListener('input', updateReceivedAmount);
    sendCurrencySelect.addEventListener('change', updateReceivedAmount);
    receiveCurrencySelect.addEventListener('change', updateReceivedAmount);
});
