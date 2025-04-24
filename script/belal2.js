let btnopen=document.getElementById('open');
let btnclos=document.getElementById('clos');
let cont=document.querySelector('#cont');

btnclos.onclick=function(){
    cont.classList.add('hide');
    btnopen.classList.remove('hide');
    btnclos.setAttribute('class','hide');
       cont.setAttribute('class','hide');

}
btnopen.onclick=function(){
    cont.classList.remove('hide');
    // btnopen.classList.add('hide');
    btnopen.setAttribute("class","hide");
    btnclos.setAttribute('class','d');
    // cont.setAttribute('class','d');

}



const currencyFlags = {
    USD: "us",
    EUR: "eu",
    GBP: "gb",
    SAR: "sa",
    AED: "ae",
    JPY: "jp",
    CNY: "cn",
    INR: "in",
    EGP: "eg",
    YER: "ye",
    TRY: "tr",
    KWD: "kw",
    QAR: "qa",
    BHD: "bh",
    OMR: "om"
};

// تحميل العملات في القائمة
async function loadCurrencies() {
    const response = await fetch('https://api.frankfurter.app/currencies');
    const currencies = await response.json();

    const fromSelect = document.getElementById('from-currency');
    const toSelect = document.getElementById('to-currency');

    for (const [code, name] of Object.entries(currencies)) {
        const emojiFlag = getFlagEmoji(code); // رموز أعلام افتراضية (ليست دقيقة دائماً)

        const optionFrom = document.createElement('option');
        optionFrom.value = code;
        optionFrom.textContent = `${emojiFlag} ${code} - ${name}`;
        fromSelect.appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = code;
        optionTo.textContent = `${emojiFlag} ${code} - ${name}`;
        toSelect.appendChild(optionTo);
    }

    fromSelect.value = 'USD';
    toSelect.value = 'SAR';
}


loadCurrencies();

document.getElementById('convert-btn').addEventListener('click', async () => {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;

    if (amount === '' || isNaN(amount)) {
        alert('يرجى إدخال مبلغ صالح');
        return;
    }

    if (fromCurrency === toCurrency) {
        alert('يرجى اختيار عملتين مختلفتين');
        return;
    }

    const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        const rate = data.rates[toCurrency];

        document.getElementById('converted-amount').textContent = rate.toFixed(2);
        document.getElementById('currency-symbol').textContent = toCurrency;
        document.getElementById('exchange-rate').textContent = `سعر الصرف: 1 ${fromCurrency} = ${(rate / amount).toFixed(4)} ${toCurrency}`;

        // حفظ في localStorage
        saveToHistory({
            from: fromCurrency,
            to: toCurrency,
            amount,
            result: rate.toFixed(2),
            date: new Date().toLocaleString()
        });

    } catch (error) {
        alert('حدث خطأ أثناء التحويل. تأكد من اتصالك بالإنترنت.');
    }
});

// حفظ التحويل في localStorage
function saveToHistory(entry) {
    let history = JSON.parse(localStorage.getItem("conversionHistory")) || [];
    history.unshift(entry); // أضف إلى البداية
    history = history.slice(0, 5); // نحتفظ بـ 5 عمليات فقط
    localStorage.setItem("conversionHistory", JSON.stringify(history));
    showHistory();
}

// عرض السجل
function showHistory() {
    const resultDiv = document.getElementById('result');
    const history = JSON.parse(localStorage.getItem("conversionHistory")) || [];

    if (history.length > 0) {
        const historyHTML = history.map(entry => `
            <p style="font-size: 14px; margin: 5px 0;">
                ${entry.date}: ${entry.amount} ${entry.from} ⟶ ${entry.result} ${entry.to}
            </p>
        `).join("");
        resultDiv.innerHTML += `<div style="margin-top:10px; border-top:1px solid #ddd; padding-top:10px;">
            <strong>آخر التحويلات:</strong>${historyHTML}
        </div>`;
    }
}

// عرض السجل عند التحميل
showHistory();




// زر مسح السجل
document.getElementById('clear-history').addEventListener('click', () => {
    localStorage.removeItem("conversionHistory");
    document.getElementById('result').innerHTML = `
        <p>المبلغ المحول: <span id="converted-amount">0</span> <span id="currency-symbol"></span></p>
        <p id="exchange-rate"></p>
        <div id="history-actions" style="margin-top: 15px;">
            <button id="clear-history" style="background-color: #ef4444;">مسح السجل</button>
            <button id="export-history" style="background-color: #10b981;">تصدير السجل</button>
        </div>
    `;
});

// زر تصدير السجل كملف نصي
document.getElementById('export-history').addEventListener('click', () => {
    const history = JSON.parse(localStorage.getItem("conversionHistory")) || [];
    if (history.length === 0) {
        alert("لا يوجد سجل لتحويله!");
        return;
    }

    let content = "سجل تحويل العملات:\n\n";
    history.forEach(entry => {
        content += `${entry.date}: ${entry.amount} ${entry.from} ⟶ ${entry.result} ${entry.to}\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = "conversion_history.txt";
    a.click();

    URL.revokeObjectURL(url);
});


function getFlagEmoji(currencyCode) {
    const countryMap = {
        USD: 'US',
        EUR: 'EU',
        SAR: 'SA',
        AED: 'AE',
        GBP: 'GB',
        JPY: 'JP',
        CNY: 'CN',
        INR: 'IN',
        EGP: 'EG',
        YER: 'YE',
        TRY: 'TR',
        KWD: 'KW',
        QAR: 'QA',
        BHD: 'BH',
        OMR: 'OM'
    };

    const countryCode = countryMap[currencyCode] || 'UN'; // إذا ما وجد رمز الدولة
    return countryCode
        .toUpperCase()
        .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt()));
}























// let mark=document.getElementsByClassName('mark')[0];
// mark.innerHTML="بن سنان للأجهزه الاكترونيه"
// mark.style.padding='30px';
// // document.body.style.backgroundColor='rgb(255, 251, 217)';
// // mark.style.margin='200px';
// mark.style.maxWidth='85%';
// mark.style.minWidth='10%';
// mark.style.textAlign='center';
// mark.style.color='rgb(212, 171, 5)';
// mark.style.fontSize='40px';
// mark.letterSpace="2px";
// mark.textDecoration="Italic" ;
// mark.style.border='dashed';
// mark.style.marginRight='40px';
// mark.style.fontFamily="Bold Italic Art;color";
// mark.style.borderRadius='20px';
// mark.style.backgroundColor=' rgb(66, 16, 2)';
// let h1=document.getElementById('h1');

// mark.style.fontFamily="Bold Italic Art;color";

// let names=['sumsung','sumsungnot10','sumsung not  9','ihpon 13 pro','ihpon 11 pro','ihpon 12 pro'];
// let pric=['128000 الف','300000 الف ','230000 الف','189000 الف','189000 الف'];
// let imgse=["s7.jpg","s3.jpg","s3.jpg","s4.jpg","s8.jpg","s9.jpg"];



// let contenr=document.createElement('div');




// function element(imgse,name,prices,conts,hh){

//     document.body.appendChild(hh);

//     // h1

//     hh.style.backgroundColor="black";
// hh.style.color="white";
// hh.style.display="inline";




//     //conts

// conts.style.backgroundColor="rgb(255, 251, 217)";
// conts.style.border="solid";
// conts.style.borderRadius="20px";
// conts.style.maxWidth="100%";
// conts.style.margin="30px";
// conts.style.border="solid";
// // conts.body.appendChild(contenr);
// conts.style.textAlin="center";
//     document.body.appendChild(conts);

//     //elements
//     let card=document.createElement('div');
//     let img=document.createElement('img');
//     let title=document.createElement('h1');
//     let price=document.createElement('h2');
 

// //create content
// let head=document.createTextNode(name);
// // head=document.querySelector(h1).innerHTML=(name);
// let pricco=document.createTextNode(prices);
// img.setAttribute("src",(imgse));

// title.appendChild(head);
// price.appendChild(pricco);
// //style
// card.style.width="200px";
// card.style.background=" rgb(66, 16, 2)";
// card.style.color="white";
// card.style.textAlign='center';
// card.style.padding='10px';
// card.style.margin='20px';
// card.style.display="inline-block";
// card.style.flexDirection="row";
// card.style.flexWrap='wrap';
// img.style.width="90%";
// card.appendChild(title);
// card.appendChild(price);
// card.appendChild(img);
// conts.appendChild(card);
// }


// for(let i=0;i<names.length;i++){
//     element(imgse[i],names[i],pric[i],contenr,h1);  
// }



// let name=['sumsung','sumsungnot10','sumsung not  9','ihpon 13 pro','ihpon 11 pro','ihpon 12 pro'];
// let pri=['128000 الف','300000 الف ','230000 الف','189000 الف','189000 الف'];
// let img=["imgs/si1.jpg","imgs/si2.jpg","imgs/si3.jpg","imgs/si4.jpg","imgs/si5.jpg","imgs/si6.jpg"];

// let conte1=document.createElement('div');


// let hh=document.createElement('h1');
// hh.innerHTML="قســـم الســاعــات الرقمية";
// for(let j=0;j<name.length;j++){
//     element(img[j],name[j],pri[j],conte1,hh);  
// }




// let name1=['sumsung','sumsungnot10','sumsung','ihpon 13 pro','ihpon 11 pro','ihpon 12 pro','vdidiyk'];
// let pri1=['128000 الف','300000 الف ','230000 الف','189000 الف','189000 الف'];
// let img1=["imgs/ss5.jpg","imgs/ss2.jpg","imgs/ss2.jpg","imgs/ss3.jpg","imgs/ss4.jpg","imgs/ss6.jpg","imgs/ss1.jpg"];

// let conte2=document.createElement('div');

// let h2=document.createElement('h1');
// h2.innerHTML="قســـم السمـــا عـــات";
// for(let j=0;j<name1.length;j++){
//     element(img1[j],name1[j],pri1[j],conte2,h2);  
// }
