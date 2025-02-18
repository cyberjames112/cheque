// 建案對應的銀行戶名
const projectData = {
  "Quill": "Andarama SDN BHD",
  "Pavilion Square": "Armani Hartajaya SDN BHD",
  "Bon Kiara": "Land Marker Sdn Bhd",
  "Skylon": "GBD DEVELOPMENT SDN BHD",
  "Conlay": "PATSAWAN PROPERTIES SDN BHD",
  "裝修公司": "XINHAUS ENTERPRISE"
};

function numberToWords(num) {
  if (num < 0) {
    return "Negative numbers are not supported.";
  }

  const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const teens = ["", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const thousands = ["", "Thousand", "Million"];

  function convertChunk(num) {
    let str = "";

    if (num >= 100) {
      const hundreds = Math.floor(num / 100);
      str += units[hundreds] + " Hundred ";
      num %= 100;
    }

    if (num >= 11 && num <= 19) {
      str += teens[num - 10] + " ";
    } else {
      const tensPlace = Math.floor(num / 10);
      const unitsPlace = num % 10;
      if (tensPlace > 0) {
        str += tens[tensPlace] + " ";
      }
      if (unitsPlace > 0) {
        str += units[unitsPlace] + " ";
      }
    }

    return str.trim();
  }

  function convertIntegerPart(num) {
    let str = "";
    let chunkIndex = 0;

    while (num > 0) {
      const chunk = num % 1000;
      if (chunk > 0) {
        const chunkWords = convertChunk(chunk);
        str = chunkWords + " " + thousands[chunkIndex] + " " + str;
      }
      num = Math.floor(num / 1000);
      chunkIndex++;
    }

    return str.trim();
  }

  function convertDecimalPart(num) {
    const decimalWords = convertChunk(num);
    return "Cents " + decimalWords;
  }

  const integerPart = Math.floor(num);
  const decimalPart = Math.round((num - integerPart) * 100);

  let result = "";
  if (integerPart > 0) {
    result += convertIntegerPart(integerPart);
  }

  if (decimalPart > 0) {
    const centsPart = convertDecimalPart(decimalPart);
    result += " And " + centsPart;
  }

  result += " Only";

  return result.trim();
}

// 取得HTML元素
const projectSelect = document.getElementById('project');
const developerAccountInput = document.getElementById('developerAccount');
const amountInput = document.getElementById('amount');
const amountWordsInput = document.getElementById('amountWords');
const cashDateInput = document.getElementById('cashDate');
const formattedDateInput = document.getElementById('formattedDate');
const checkAccountName = document.getElementById('checkAccountName');
const checkAmountWords = document.getElementById('checkAmountWords');
const checkDate = document.getElementById('checkDate');
const checkAmountNumber = document.getElementById('checkAmountNumber');

// 當下拉選單變更時，顯示對應的銀行戶名
projectSelect.addEventListener('change', () => {
  const selectedValue = projectSelect.value;
  const developerName = projectData[selectedValue] || '';
  developerAccountInput.value = developerName;
  // 更新支票上的建案名稱
  checkAccountName.textContent = developerName;
});

// 當輸入金額時，轉換成英文大寫
amountInput.addEventListener('input', () => {
  const amount = Number(amountInput.value);
  if (isNaN(amount)) {
    amountWordsInput.value = '';
    checkAmountWords.textContent = '';
    checkAmountNumber.textContent = '';
  } else {
    const words = numberToWords(amount);
    amountWordsInput.value = words;
    checkAmountWords.textContent = words;
    checkAmountNumber.textContent = amount.toFixed(2);
  }
});

// 當選擇日期時，格式化為 ddmmyy
cashDateInput.addEventListener('change', () => {
  const dateValue = cashDateInput.value;
  if (dateValue) {
    const [year, month, day] = dateValue.split('-');
    const shortYear = year.substring(2); // 獲取年份的最後兩位
    formattedDateInput.value = `${day}${month}${shortYear}`;
    // 更新支票上的日期
    checkDate.textContent = `${day}/${month}/${shortYear}`;
  } else {
    formattedDateInput.value = '';
    checkDate.textContent = '';
  }
});