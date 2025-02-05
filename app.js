// Инициализация TON Connect
const connector = new TonConnectSDK.TonConnect({
    manifestUrl: 'https://my-telegram-bot1.vercel.app/tonconnect-manifest.json'
});

// Проверка подключения кошелька
async function checkWalletConnection() {
    try {
        const wallet = await connector.getWallet();
        if (wallet) {
            document.getElementById('wallet-status').textContent = `Кошелёк подключён: ${wallet.account.address}`;
            document.getElementById('referral-section').classList.remove('hidden');
            generateReferralLink(wallet.account.address);
        } else {
            document.getElementById('wallet-status').textContent = 'Кошелёк не подключён';
        }
    } catch (error) {
        console.error('Ошибка при проверке подключения кошелька:', error);
        alert('Произошла ошибка при проверке подключения кошелька. Проверьте консоль для подробностей.');
    }
}

// Генерация реферальной ссылки
function generateReferralLink(walletAddress) {
    const referralLink = `https://t.me/ton_mini_app_bot?start=${walletAddress}`;
    document.getElementById('referral-link').textContent = referralLink;
}

// Подключение кошелька
document.getElementById('connect-wallet').addEventListener('click', async () => {
    try {
        const walletsList = await connector.getWallets();
        if (walletsList.length === 0) {
            alert('Не удалось загрузить список кошельков. Проверьте подключение к интернету.');
            return;
        }

        const wallet = walletsList[0]; // Выбираем первый кошелёк из списка
        await connector.connect(wallet);
        checkWalletConnection();
    } catch (error) {
        console.error('Ошибка при подключении кошелька:', error);
        alert('Произошла ошибка при подключении кошелька. Проверьте консоль для подробностей.');
    }
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