document.getElementById('add-expense').addEventListener('click', function() {
    const expenseName = document.getElementById('expense-name').value;
    const expenseAmount = document.getElementById('expense-amount').value;
    const expenseDate = document.getElementById('expense-date').value;
    const expenseCategory = document.getElementById('expense-category').value;
  
    if (expenseName && expenseAmount && expenseDate && expenseCategory) {
      // إنشاء العنصر الجديد للقائمة
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${expenseName} (${expenseCategory})</span>
        <span>${expenseAmount} ريال</span>
        <span>${expenseDate}</span>
        <button class="delete-btn">حذف</button>
      `;
  
      // إضافة العنصر إلى القائمة
      document.getElementById('expense-list').appendChild(li);
  
      // تحديث المجموع الإجمالي
      updateTotalAmount(expenseAmount);
  
      // مسح المدخلات
      document.getElementById('expense-name').value = '';
      document.getElementById('expense-amount').value = '';
      document.getElementById('expense-date').value = '';
      document.getElementById('expense-category').value = '';
    } else {
      alert('يرجى ملء جميع الحقول.');
    }
  });
  
  // دالة لحساب المجموع الإجمالي
  function updateTotalAmount(amount) {
    const currentTotal = parseFloat(document.getElementById('total-amount').textContent);
    const newTotal = currentTotal + parseFloat(amount);
    document.getElementById('total-amount').textContent = newTotal.toFixed(2);
  }
  
  // حذف العنصر عند الضغط على زر الحذف
  document.getElementById('expense-list').addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('delete-btn')) {
      const amountToSubtract = e.target.parentElement.innerText.split(' ')[1];
      updateTotalAmount(-amountToSubtract);
      e.target.parentElement.remove();
    }
  });
  