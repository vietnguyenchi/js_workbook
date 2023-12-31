let selection1 = document.querySelector('#selections1');
let selection2 = document.querySelector('#selections2');
let betMoneyPlayer1 = document.querySelector('#money1');
let betMoneyPlayer2 = document.querySelector('#money2');
let money1 = document.querySelector('#totalMoney1');
let money2 = document.querySelector('#totalMoney2');
let totalBetMoney = document.querySelector('.start h2');
let dice1 = document.querySelector('#dice1');
let dice2 = document.querySelector('#dice2');
let start = document.querySelector('.start button');
let finalResult = document.querySelector('.start span');
let totalMoneyPlayer1 = 1000000;
let totalMoneyPlayer2 = 1000000;

function setTotalMoney() {
    money1.innerText = totalMoneyPlayer1.toLocaleString('vi-VN', {
        style: 'currency', 
        currency: 'VND'
    });
    
    money2.innerText = totalMoneyPlayer2.toLocaleString('vi-VN', {
        style: 'currency', 
        currency: 'VND'
    });
}

setTotalMoney();

getTotalBetMoney();

function getTotalBetMoney() {

    let result = Number(betMoneyPlayer1.value) + Number(betMoneyPlayer2.value); 

    if(!betMoneyPlayer1.value) {
        result = totalMoneyPlayer1 + Number(betMoneyPlayer2.value)
        totalBetMoney.innerText = result.toLocaleString('vi-VN', {
            style: 'currency', 
            currency: 'VND'
        });
        if(!betMoneyPlayer2.value) {
            result = totalMoneyPlayer1 + totalMoneyPlayer2
            totalBetMoney.innerText = result.toLocaleString('vi-VN', {
                style: 'currency', 
                currency: 'VND'
            });
        }
    }else if(!betMoneyPlayer2.value) {
        result = Number(betMoneyPlayer1.value) + totalMoneyPlayer2
        totalBetMoney.innerText = result.toLocaleString('vi-VN', {
            style: 'currency', 
            currency: 'VND'
        });
        if(!betMoneyPlayer1.value) {
            result = totalMoneyPlayer1 + totalMoneyPlayer2
            totalBetMoney.innerText = (totalMoneyPlayer1 + totalMoneyPlayer2).toLocaleString('vi-VN', {
                style: 'currency', 
                currency: 'VND'
            });
        }
    } else {
        totalBetMoney.innerText = result.toLocaleString('vi-VN', {
            style: 'currency', 
            currency: 'VND'
        });
    }
    return result;
}


betMoneyPlayer1.addEventListener('change', () => getTotalBetMoney());
betMoneyPlayer2.addEventListener('change', () => getTotalBetMoney());

let images = [];
for (let i = 1; i <= 6; i++) {
    images[i] = new Image();
    images[i].src = `images/dice${i}.png`;
}

start.addEventListener('click', () => {
    if (totalMoneyPlayer1 <= 0 || totalMoneyPlayer2 <= 0) {
        confirm('Nạp tiền để chơi tiếp - 0384590116 MB Bank NGUYEN CHI VIET');
    }else {
        let rand1 = Math.ceil(Math.random() * 6);
        let rand2 = Math.ceil(Math.random() * 6);

        dice1.src = images[rand1].src;
        dice2.src = images[rand2].src;

        let result = (rand1 + rand2) % 2 === 0 ? 1 : 0;

        if (result) {
            finalResult.innerText = 'Tài';
            // checkResult(result);
        } else {
            finalResult.innerText = 'Xỉu';
        }
        checkResult(result);
    }

});

function checkResult(result)  {
    if (Number(selection1.value) === result) {
        totalMoneyPlayer1 += getTotalBetMoney();
        setTotalMoney();
    } else {
        totalMoneyPlayer1 -= getTotalBetMoney();
        setTotalMoney();
    }
    if (Number(selection2.value) === result) {
        totalMoneyPlayer2 += getTotalBetMoney();
        setTotalMoney();
    } else {
        totalMoneyPlayer2 -= getTotalBetMoney();
        setTotalMoney();
    }
}