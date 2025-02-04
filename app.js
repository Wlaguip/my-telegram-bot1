// Инициализация TON Connect
const connector = new TonConnectSDK.TonConnect({
    manifestUrl: 'https://your-app.com/tonconnect-manifest.json'
});

// Проверка подключения кошелька
async function checkWalletConnection() {
    const wallet = await connector.getWallet();
    if (wallet) {
        document.getElementById('wallet-status').textContent = `Кошелёк подключён: ${wallet.account.address}`;
        document.getElementById('referral-section').style.display = 'block';
        generateReferralLink(wallet.account.address);
    } else {
        document.getElementById('wallet-status').textContent = 'Кошелёк не подключён';
    }
}

// Генерация реферальной ссылки
function generateReferralLink(walletAddress) {
    const referralLink = `https://t.me/your_mini_app?start=${walletAddress}`;
    document.getElementById('referral-link').textContent = referralLink;
}

// Подключение кошелька
document.getElementById('connect-wallet').addEventListener('click', async () => {
    const walletsList = await connector.getWallets();
    const wallet = walletsList[0]; // Выбираем первый кошелёк из списка
    await connector.connect(wallet);
    checkWalletConnection();
});

// Проверка реферального кода
const urlParams = new URLSearchParams(window.location.search);
const referralCode = urlParams.get('start');
if (referralCode) {
    console.log(`Реферальный код: ${referralCode}`);
    // Здесь можно отправить реферальный код на сервер или сохранить локально
}

// Проверка подключения при загрузке страницы
checkWalletConnection();