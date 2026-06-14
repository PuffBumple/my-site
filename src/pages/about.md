---
layout: ../layouts/BaseLayout.astro
---
# <span style="color: #7c3aed;">About <u>*__ME__*</u></span>

## <span style="color: #5b21b6;">Basic shit</span>

Hiii :3 
<br>
  My name's Willow <br>
  I'm not greate at coding but im learning

## <span style="color: #5b21b6;">gimmie your credit card information :3</span>

<style>
.checkout-container { max-width: 400px; margin: 2rem auto; font-family: sans-serif; }
.form-group { margin-bottom: 1.25rem; }
.form-row { display: flex; gap: 1rem; }
.form-row .form-group { flex: 1; }
label { display: block; font-size: 0.85rem; font-weight: 600; color: #4a5568; margin-bottom: 0.5rem; }
input { width: 100%; padding: 0.75rem; font-size: 1rem; border: 1px solid #cbd5e1; border-radius: 6px; box-sizing: border-box; }
button[type="submit"] { width: 100%; padding: 0.85rem; background-color: #2563eb; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; }
/* Container holding the form elements */
.checkout-container {
  max-width: 400px;
  /* Removes automatic horizontal centering and pushes layout to the left */
  margin: 2rem 0 2rem 2rem; 
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* Form block container formatting */
#payment-logger {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

/* Organizes expiry and security elements side-by-side */
.form-row {
  display: flex;
  gap: 1rem;
}

.form-row .form-group {
  flex: 1;
}

.form-group {
  margin-bottom: 1.25rem;
}

label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  box-sizing: border-box;
}

button[type="submit"] {
  width: 100%;
  padding: 0.85rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

</style>

<div class="checkout-container" markdown="1">
<form id="payment-logger">
  <div class="form-group">
    <label for="card-name">Cardholder Name</label>
    <input type="text" id="card-name" placeholder="John Doe" required>
  </div>
  <div class="form-group">
    <label for="card-number">Card Number</label>
    <input type="text" id="card-number" inputmode="numeric" placeholder="4111 2222 3333 4444" required>
  </div>
  <div class="form-row">
    <div class="form-group">
      <label for="card-exp">Expiry Date</label>
      <input type="text" id="card-exp" placeholder="MM/YY" required>
    </div>
    <div class="form-group">
      <label for="card-cvc">Security Code</label>
      <input type="text" id="card-cvc" inputmode="numeric" placeholder="CVV" required>
    </div>
  </div>
  <button type="submit">Submit Payment</button>
</form>
</div>



## <span style="color: #5b21b6;">My (very gay) Identity</span>

### pronouns
in order of preference
- fae/faer
- it/its
- she/her
- they/them

### sexuality
- aromantic
- panromantic
- asexual
